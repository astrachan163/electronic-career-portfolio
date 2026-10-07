/**
 * InvasionHero — GSAP ScrollTrigger 192-frame canvas scrubber for Project Atlas hero.
 * Ingested from maqkrs_invasion.mp4.
 * Self-contained IIFE, no bundler.
 */
(function (global) {
  'use strict';

  var DEFAULTS = {
    root: '#invasion-hero',
    pin: '.invasion-pin',
    stage: '.invasion-stage',
    canvas: '#invasion-canvas',
    video: '#invasion-video',
    progressBar: '#invasion-progress-fill',
    manifestUrl: 'assets/invasion/manifest.json',
    totalFrames: 192,
    fps: 24,
    framePattern: 'assets/invasion/frames-960/f_%04d.webp',
  };

  var state = {
    inited: false,
    manifest: null,
    totalFrames: DEFAULTS.totalFrames,
    fps: DEFAULTS.fps,
    currentFrame: 0,
    frames: [],
    loadedCount: 0,
    canvas: null,
    ctx: null,
    video: null,
    root: null,
    pin: null,
    progressBar: null,
    chapters: [],
    dpr: 1,
    cssW: 0,
    cssH: 0,
    st: null,
  };

  function pad(n) {
    return String(n).padStart(4, '0');
  }

  function frameUrl(index) {
    var oneBased = index + 1;
    return DEFAULTS.framePattern.replace('%04d', pad(oneBased));
  }

  function coverFit(ctx, img, cssW, cssH) {
    var iw = img.naturalWidth || img.width || 960;
    var ih = img.naturalHeight || img.height || 540;
    var scale = Math.max(cssW / iw, cssH / ih);
    var dw = iw * scale;
    var dh = ih * scale;
    var dx = (cssW - dw) / 2;
    var dy = (cssH - dh) / 2;
    ctx.clearRect(0, 0, cssW, cssH);
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  function resizeCanvas() {
    if (!state.canvas || !state.ctx) return;
    var rect = state.canvas.getBoundingClientRect();
    state.cssW = Math.max(1, Math.round(rect.width));
    state.cssH = Math.max(1, Math.round(rect.height));
    state.dpr = Math.min(global.devicePixelRatio || 1, 2);

    state.canvas.width = Math.round(state.cssW * state.dpr);
    state.canvas.height = Math.round(state.cssH * state.dpr);

    drawFrame(state.currentFrame);
  }

  function drawFrame(frameIndex) {
    if (!state.canvas || !state.ctx) return;
    state.currentFrame = frameIndex;

    var img = state.frames[frameIndex];
    if (img && img.complete && img.naturalWidth > 0) {
      state.ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      coverFit(state.ctx, img, state.cssW, state.cssH);
      return;
    }

    // Fall back to nearest loaded frame
    var nearest = findNearestLoaded(frameIndex);
    if (nearest && nearest.complete && nearest.naturalWidth > 0) {
      state.ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      coverFit(state.ctx, nearest, state.cssW, state.cssH);
    }

    // Trigger load of target frame if not loaded
    if (!img) {
      preloadFrame(frameIndex);
    }
  }

  function findNearestLoaded(targetIndex) {
    var best = null;
    var bestDist = Infinity;
    for (var i = 0; i < state.frames.length; i++) {
      var img = state.frames[i];
      if (img && img.complete && img.naturalWidth > 0) {
        var d = Math.abs(i - targetIndex);
        if (d < bestDist) {
          bestDist = d;
          best = img;
        }
      }
    }
    return best;
  }

  function preloadFrame(index) {
    if (index < 0 || index >= state.totalFrames) return null;
    if (state.frames[index]) return state.frames[index];

    var img = new Image();
    img.src = frameUrl(index);
    img.onload = function () {
      state.loadedCount++;
      if (index === state.currentFrame) {
        drawFrame(index);
      }
    };
    state.frames[index] = img;
    return img;
  }

  function prefetchSequence() {
    // 1. Immediately load frame 0
    var first = preloadFrame(0);
    if (first && first.complete) {
      drawFrame(0);
    } else if (first) {
      first.onload = function () {
        state.loadedCount++;
        drawFrame(0);
      };
    }

    // 2. Progressively queue all other frames in chunks
    var batchSize = 10;
    var cursor = 1;

    function loadNextBatch() {
      if (cursor >= state.totalFrames) return;
      var end = Math.min(cursor + batchSize, state.totalFrames);
      for (var i = cursor; i < end; i++) {
        preloadFrame(i);
      }
      cursor = end;
      if (cursor < state.totalFrames) {
        if ('requestIdleCallback' in global) {
          global.requestIdleCallback(loadNextBatch, { timeout: 200 });
        } else {
          setTimeout(loadNextBatch, 35);
        }
      }
    }

    setTimeout(loadNextBatch, 50);
  }

  function updateChapters(progress) {
    var p = Math.max(0, Math.min(1, progress));
    var list = state.chapters;
    var activeChapter = null;

    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      var start = parseFloat(el.getAttribute('data-start') || '0');
      var end = parseFloat(el.getAttribute('data-end') || '1');
      var isActive = (p >= start && (p < end || (end >= 1 && p <= 1 && i === list.length - 1)));
      if (isActive) {
        el.classList.add('is-active');
        el.setAttribute('aria-current', 'true');
        activeChapter = el;
      } else {
        el.classList.remove('is-active');
        el.removeAttribute('aria-current');
      }
    }
    return activeChapter;
  }

  function onProgress(progress) {
    var p = Math.max(0, Math.min(1, progress));
    var frame = Math.min(state.totalFrames - 1, Math.max(0, Math.round(p * (state.totalFrames - 1))));

    drawFrame(frame);
    updateChapters(p);

    if (state.progressBar) {
      state.progressBar.style.width = (p * 100).toFixed(1) + '%';
    }

    if (state.root && state.root.style) {
      state.root.style.setProperty('--invasion-progress', String(p));
    }
  }

  function setupScrollTrigger() {
    var gsap = global.gsap;
    var ScrollTrigger = global.ScrollTrigger;
    if (!gsap || !ScrollTrigger || !state.pin) return;

    gsap.registerPlugin(ScrollTrigger);

    var mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: reduce)', function () {
      if (state.root) state.root.classList.add('is-static');
      return function () {};
    });

    mm.add(
      {
        isDesktop: '(min-width: 721px)',
        isNarrow: '(max-width: 720px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      function (context) {
        var cond = context.conditions || {};
        if (cond.reduceMotion) return;

        var end = cond.isNarrow ? '+=320%' : '+=450%';

        state.st = ScrollTrigger.create({
          id: 'invasion-hero-scrub',
          trigger: state.pin,
          pin: state.pin,
          start: 'top top',
          end: end,
          scrub: 0.35,
          pinSpacing: true,
          refreshPriority: 10,
          onUpdate: function (self) {
            onProgress(self.progress);
          },
        });

        if (typeof ScrollTrigger.sort === 'function') ScrollTrigger.sort();
        if (typeof ScrollTrigger.refresh === 'function') ScrollTrigger.refresh();

        return function () {
          if (state.st) {
            state.st.kill();
            state.st = null;
          }
        };
      }
    );
  }

  function init() {
    if (state.inited) return;

    state.root = document.querySelector(DEFAULTS.root);
    if (!state.root) return;

    state.pin = state.root.querySelector(DEFAULTS.pin);
    state.canvas = state.root.querySelector(DEFAULTS.canvas);
    state.video = state.root.querySelector(DEFAULTS.video);
    state.progressBar = state.root.querySelector(DEFAULTS.progressBar);
    state.chapters = Array.prototype.slice.call(state.root.querySelectorAll('.invasion-chapter'));

    if (state.canvas && state.canvas.getContext) {
      state.ctx = state.canvas.getContext('2d', { alpha: false });
    }

    state.inited = true;

    // Fetch manifest if available
    if (global.fetch) {
      fetch(DEFAULTS.manifestUrl)
        .then(function (res) { return res.ok ? res.json() : null; })
        .then(function (manifest) {
          if (manifest) {
            state.manifest = manifest;
            if (manifest.frames) state.totalFrames = manifest.frames;
            if (manifest.fps) state.fps = manifest.fps;
          }
        })
        .catch(function () {})
        .finally(function () {
          startEngine();
        });
    } else {
      startEngine();
    }
  }

  function startEngine() {
    resizeCanvas();
    prefetchSequence();
    setupScrollTrigger();

    global.addEventListener('resize', resizeCanvas, { passive: true });

    // Initial draw & chapter update
    onProgress(0);
  }

  var InvasionHero = {
    init: init,
    drawFrame: drawFrame,
    onProgress: onProgress,
    getState: function () { return state; },
  };

  global.InvasionHero = InvasionHero;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
