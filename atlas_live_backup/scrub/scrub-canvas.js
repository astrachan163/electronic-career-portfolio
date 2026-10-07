/* ScrubCanvas — frame-sequence scrubber with LRU decoded-bitmap cache.
   IIFE; no deps. Frames are 0-based; files are 1-based (f_0001.webp). */
(function (global) {
  'use strict';

  var DEFAULT_CACHE = 40;
  var LOWMEM_CACHE = 24;
  var MAX_CONCURRENT = 5;
  var PREFETCH_AHEAD = 8;
  var DPR_CAP = 2;

  var state = null;

  function clamp(n, lo, hi) {
    return Math.max(lo, Math.min(hi, n));
  }

  function sprintfFrame(pattern, oneBased) {
    return pattern.replace('%04d', String(oneBased).padStart(4, '0'));
  }

  function resolveUrl(manifestUrl, relative) {
    try {
      return new URL(relative, manifestUrl).href;
    } catch (e) {
      var base = String(manifestUrl || '');
      var cut = base.lastIndexOf('/');
      var dir = cut >= 0 ? base.slice(0, cut + 1) : '';
      return dir + relative;
    }
  }

  function detectLowRes(optsLowMemory) {
    if (optsLowMemory) return true;
    var mem = global.navigator && global.navigator.deviceMemory;
    var conn = global.navigator && global.navigator.connection;
    var saveData = !!(conn && conn.saveData);
    if (!saveData && typeof mem === 'number' && mem < 4) return true;
    return false;
  }

  function nearestCached(cache, target, frames) {
    if (cache.has(target)) return target;
    var best = -1;
    var bestDist = Infinity;
    cache.forEach(function (_bmp, idx) {
      var d = Math.abs(idx - target);
      if (d < bestDist) {
        bestDist = d;
        best = idx;
      }
    });
    if (best >= 0) return best;
    return -1;
  }

  function coverFit(ctx, bmp, cssW, cssH) {
    var iw = bmp.width || 1;
    var ih = bmp.height || 1;
    var scale = Math.max(cssW / iw, cssH / ih);
    var dw = iw * scale;
    var dh = ih * scale;
    var dx = (cssW - dw) / 2;
    var dy = (cssH - dh) / 2;
    ctx.clearRect(0, 0, cssW, cssH);
    ctx.drawImage(bmp, dx, dy, dw, dh);
  }

  function closeBitmap(bmp) {
    if (bmp && typeof bmp.close === 'function') {
      try { bmp.close(); } catch (e) { /* ignore */ }
    }
  }

  function decodeBlob(blob) {
    if (typeof global.createImageBitmap === 'function') {
      return global.createImageBitmap(blob);
    }
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(blob);
      var img = new Image();
      img.onload = function () {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = function () {
        URL.revokeObjectURL(url);
        reject(new Error('image decode failed'));
      };
      img.src = url;
    });
  }

  function lruTouch(order, idx) {
    var i = order.indexOf(idx);
    if (i >= 0) order.splice(i, 1);
    order.push(idx);
  }

  function lruEvict(st) {
    while (st.cache.size > st.cacheLimit && st.lru.length) {
      var victim = st.lru.shift();
      if (victim === st.lastDrawn) {
        st.lru.push(victim);
        if (st.lru.length === 1) break;
        continue;
      }
      var bmp = st.cache.get(victim);
      if (bmp) {
        st.cache.delete(victim);
        closeBitmap(bmp);
      }
    }
  }

  function pump(st) {
    while (st.inFlight < MAX_CONCURRENT && st.queue.length && !st.destroyed) {
      var idx = st.queue.shift();
      if (st.cache.has(idx) || st.inflight.has(idx)) continue;
      fetchOne(st, idx);
    }
  }

  function enqueue(st, idx, front) {
    if (st.destroyed) return;
    if (idx < 0 || idx >= st.frames) return;
    if (st.cache.has(idx) || st.inflight.has(idx)) return;
    if (st.queue.indexOf(idx) >= 0) {
      if (front) {
        st.queue.splice(st.queue.indexOf(idx), 1);
        st.queue.unshift(idx);
      }
      return;
    }
    if (front) st.queue.unshift(idx);
    else st.queue.push(idx);
    pump(st);
  }

  function fetchOne(st, idx) {
    st.inFlight += 1;
    st.inflight.add(idx);
    var oneBased = idx + 1;
    var rel = sprintfFrame(st.framePattern, oneBased);
    var url = resolveUrl(st.manifestUrl, rel);
    var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    if (ctrl) st.abortControllers.set(idx, ctrl);

    var fetchOpts = ctrl ? { signal: ctrl.signal } : {};
    Promise.resolve()
      .then(function () { return fetch(url, fetchOpts); })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.blob();
      })
      .then(function (blob) { return decodeBlob(blob); })
      .then(function (bmp) {
        if (st.destroyed) {
          closeBitmap(bmp);
          return;
        }
        st.cache.set(idx, bmp);
        lruTouch(st.lru, idx);
        lruEvict(st);
        if (st.wantExact === idx || st.lastDrawn < 0) {
          paint(st, idx);
        } else if (st.wantExact >= 0 && !st.cache.has(st.wantExact)) {
          var near = nearestCached(st.cache, st.wantExact, st.frames);
          if (near >= 0) paint(st, near);
        }
      })
      .catch(function () {
        /* swallow — never throw to callers */
      })
      .then(function () {
        st.inflight.delete(idx);
        st.abortControllers.delete(idx);
        st.inFlight -= 1;
        if (!st.destroyed) pump(st);
      });
  }

  function paint(st, idx) {
    var bmp = st.cache.get(idx);
    if (!bmp || !st.canvas || !st.ctx) return;
    lruTouch(st.lru, idx);
    var dpr = st.dpr;
    var cssW = st.cssW;
    var cssH = st.cssH;
    if (cssW <= 0 || cssH <= 0) return;
    st.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    coverFit(st.ctx, bmp, cssW, cssH);
    st.lastDrawn = idx;
  }

  function resize(st) {
    if (!st.canvas) return;
    var rect = st.canvas.getBoundingClientRect();
    var cssW = Math.max(1, Math.round(rect.width));
    var cssH = Math.max(1, Math.round(rect.height));
    var dpr = Math.min(DPR_CAP, global.devicePixelRatio || 1);
    st.cssW = cssW;
    st.cssH = cssH;
    st.dpr = dpr;
    var bw = Math.round(cssW * dpr);
    var bh = Math.round(cssH * dpr);
    if (st.canvas.width !== bw || st.canvas.height !== bh) {
      st.canvas.width = bw;
      st.canvas.height = bh;
    }
    if (st.lastDrawn >= 0 && st.cache.has(st.lastDrawn)) {
      paint(st, st.lastDrawn);
    } else if (st.wantExact >= 0) {
      var near = nearestCached(st.cache, st.wantExact, st.frames);
      if (near >= 0) paint(st, near);
    }
  }

  function prefetchAround(st, idx, dir) {
    var d = dir === -1 ? -1 : 1;
    var i;
    enqueue(st, idx, true);
    for (i = 1; i <= PREFETCH_AHEAD; i += 1) {
      enqueue(st, idx + d * i, false);
    }
    for (i = 1; i <= 2; i += 1) {
      enqueue(st, idx - d * i, false);
    }
  }

  /* init returns synchronously; manifest fetch is async. Early draw() uses
     default fps/frames/pattern until manifest arrives (then pattern may switch). */
  function init(opts) {
    opts = opts || {};
    if (state) destroy();

    var canvas = opts.canvas;
    if (typeof canvas === 'string') {
      canvas = global.document && global.document.querySelector(canvas);
    }
    if (!canvas || !canvas.getContext) {
      return { ok: false, reason: 'no-canvas' };
    }

    var lowMemory = !!opts.lowMemory;
    var use960 = detectLowRes(lowMemory);
    var cacheLimit = lowMemory || use960 ? LOWMEM_CACHE : DEFAULT_CACHE;

    state = {
      canvas: canvas,
      ctx: canvas.getContext('2d', { alpha: false }),
      manifestUrl: opts.manifestUrl || 'assets/scrub/manifest.json',
      lowMemory: lowMemory,
      use960: use960,
      cacheLimit: cacheLimit,
      cache: new Map(),
      lru: [],
      inflight: new Set(),
      queue: [],
      inFlight: 0,
      abortControllers: new Map(),
      frames: 134,
      fps: 24,
      framePattern: 'frames/f_%04d.webp',
      lastDrawn: -1,
      wantExact: -1,
      direction: 1,
      prevWant: -1,
      destroyed: false,
      cssW: 0,
      cssH: 0,
      dpr: 1,
      ro: null,
      manifest: null
    };

    var st = state;
    resize(st);

    if (typeof ResizeObserver !== 'undefined') {
      st.ro = new ResizeObserver(function () {
        if (!st.destroyed) resize(st);
      });
      st.ro.observe(canvas);
    } else if (global.addEventListener) {
      st._onResize = function () { if (!st.destroyed) resize(st); };
      global.addEventListener('resize', st._onResize);
    }

    fetch(st.manifestUrl)
      .then(function (r) { return r.json(); })
      .then(function (m) {
        if (st.destroyed) return;
        st.manifest = m;
        st.frames = m.frames || 134;
        st.fps = m.fps || 24;
        if (use960 && m.framePattern960) st.framePattern = m.framePattern960;
        else if (m.framePattern) st.framePattern = m.framePattern;
        if (st.wantExact >= 0) {
          prefetchAround(st, st.wantExact, st.direction);
        } else {
          enqueue(st, 0, true);
        }
      })
      .catch(function () {
        /* keep defaults */
        if (!st.destroyed && use960) {
          st.framePattern = 'frames-960/f_%04d.webp';
        }
      });

    return { ok: true, lowRes: use960, cacheLimit: cacheLimit };
  }

  function draw(frameIndex) {
    var st = state;
    if (!st || st.destroyed) return;
    var idx = clamp(Math.round(Number(frameIndex) || 0), 0, st.frames - 1);
    if (st.prevWant >= 0) {
      if (idx > st.prevWant) st.direction = 1;
      else if (idx < st.prevWant) st.direction = -1;
    }
    st.prevWant = idx;
    st.wantExact = idx;

    if (st.cache.has(idx)) {
      paint(st, idx);
    } else {
      var near = nearestCached(st.cache, idx, st.frames);
      if (near >= 0) paint(st, near);
    }
    prefetchAround(st, idx, st.direction);
  }

  function destroy() {
    var st = state;
    if (!st) return;
    st.destroyed = true;
    if (st.ro) {
      try { st.ro.disconnect(); } catch (e) { /* ignore */ }
      st.ro = null;
    }
    if (st._onResize && global.removeEventListener) {
      global.removeEventListener('resize', st._onResize);
    }
    st.abortControllers.forEach(function (c) {
      try { c.abort(); } catch (e) { /* ignore */ }
    });
    st.abortControllers.clear();
    st.queue.length = 0;
    st.inflight.clear();
    st.cache.forEach(function (bmp) { closeBitmap(bmp); });
    st.cache.clear();
    st.lru.length = 0;
    state = null;
  }

  function stats() {
    var st = state;
    if (!st) return { cached: 0, inflight: 0, lastDrawn: -1 };
    return {
      cached: st.cache.size,
      inflight: st.inflight.size + st.queue.length,
      lastDrawn: st.lastDrawn
    };
  }

  global.ScrubCanvas = {
    init: init,
    draw: draw,
    destroy: destroy,
    stats: stats
  };
})(typeof window !== 'undefined' ? window : globalThis);
