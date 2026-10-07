/**
 * ScrubEngine — GSAP/ScrollTrigger scroll → video/canvas timeline.
 * IIFE, no bundler. Depends on global gsap + ScrollTrigger (vendor/).
 * Optional peer: window.ScrubCanvas.
 */
(function (global) {
  "use strict";

  var DEFAULTS = {
    root: "#scrub",
    video: "#scrub-video",
    canvas: "#scrub-canvas",
    live: "#scrub-live",
    pin: ".scrub-pin",
    stage: ".scrub-stage",
    chapters: "[data-chapter]",
    chaptersWrap: ".scrub-chapters",
    manifestUrl: "assets/scrub/manifest.json",
    // 0px: scrub sits just below the hero fold; a large rootMargin would
    // attach video on first paint. Attach only once #scrub enters the viewport.
    lazyRootMargin: "0px",
    seekSampleSize: 30,
    seekLatencyThresholdMs: 40,
    dropRatioThreshold: 0.2,
    defaultFrames: 134,
    defaultFps: 24,
  };

  var registered = false;
  var state = null;

  function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }

  /** progress ∈ [0,1] → 0-based frame index for `frames` total frames. */
  function frameFromProgress(progress, frames) {
    var f = Math.max(1, Number(frames) || 1);
    return Math.round(clamp(Number(progress) || 0, 0, 1) * (f - 1));
  }

  /**
   * Pick chapter whose [data-start, data-end) contains progress.
   * Last chapter may include end===1.
   */
  function chapterForProgress(chapters, progress) {
    var p = clamp(Number(progress) || 0, 0, 1);
    var list = chapters || [];
    var i;
    var el;
    var start;
    var end;
    for (i = 0; i < list.length; i++) {
      el = list[i];
      start = Number(el.getAttribute("data-start"));
      end = Number(el.getAttribute("data-end"));
      if (Number.isNaN(start)) start = 0;
      if (Number.isNaN(end)) end = 1;
      if (p >= start && (p < end || (end >= 1 && p <= 1 && i === list.length - 1))) {
        return el;
      }
    }
    return list.length ? list[list.length - 1] : null;
  }

  function q(root, sel) {
    if (!sel) return null;
    try {
      if (root && root.querySelector) return root.querySelector(sel);
      if (global.document && global.document.querySelector) {
        return global.document.querySelector(sel);
      }
    } catch (_e) {
      /* ignore */
    }
    return null;
  }

  function qa(root, sel) {
    try {
      if (root && root.querySelectorAll) {
        return Array.prototype.slice.call(root.querySelectorAll(sel));
      }
      if (global.document && global.document.querySelectorAll) {
        return Array.prototype.slice.call(global.document.querySelectorAll(sel));
      }
    } catch (_e) {
      /* ignore */
    }
    return [];
  }

  function ensureStats(mode) {
    var s = global.__scrubStats;
    if (!s || typeof s !== "object") {
      s = {
        presentedFrames: 0,
        droppedFrames: 0,
        longTasks: 0,
        mode: mode || "video",
        seekLatencyMs: [],
      };
      global.__scrubStats = s;
    }
    if (!Array.isArray(s.seekLatencyMs)) s.seekLatencyMs = [];
    if (typeof s.presentedFrames !== "number") s.presentedFrames = 0;
    if (typeof s.droppedFrames !== "number") s.droppedFrames = 0;
    if (typeof s.longTasks !== "number") s.longTasks = 0;
    if (mode) s.mode = mode;
    return s;
  }

  function pushSeekLatency(ms) {
    var s = ensureStats();
    s.seekLatencyMs.push(ms);
    if (s.seekLatencyMs.length > 60) {
      s.seekLatencyMs.splice(0, s.seekLatencyMs.length - 60);
    }
  }

  function median(arr) {
    if (!arr || !arr.length) return 0;
    var a = arr.slice().sort(function (x, y) {
      return x - y;
    });
    var mid = Math.floor(a.length / 2);
    return a.length % 2 ? a[mid] : (a[mid - 1] + a[mid]) / 2;
  }

  function parseQueryFlag() {
    try {
      var sp = new URLSearchParams(global.location && global.location.search);
      var v = sp.get("scrub");
      if (v === "canvas" || v === "video") return v;
    } catch (_e) {
      /* ignore */
    }
    return null;
  }

  function isSafariOrIOS() {
    try {
      var ua = (global.navigator && global.navigator.userAgent) || "";
      var platform = (global.navigator && global.navigator.platform) || "";
      var maxTouch = global.navigator && global.navigator.maxTouchPoints;
      var iOS =
        /iPad|iPhone|iPod/.test(ua) ||
        (platform === "MacIntel" && maxTouch > 1);
      var safari =
        /Safari/i.test(ua) &&
        !/Chrome|CriOS|Chromium|Edg|OPR|Firefox|FxiOS/i.test(ua);
      return !!(iOS || safari);
    } catch (_e) {
      return false;
    }
  }

  function prefersLowPower() {
    try {
      var nav = global.navigator || {};
      if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) return true;
      if (
        typeof nav.hardwareConcurrency === "number" &&
        nav.hardwareConcurrency <= 4
      ) {
        return true;
      }
    } catch (_e) {
      /* ignore */
    }
    return false;
  }

  function connectionSaveData() {
    try {
      var c = global.navigator && global.navigator.connection;
      return !!(c && c.saveData);
    } catch (_e) {
      return false;
    }
  }

  function prefersReducedMotion() {
    try {
      return !!(
        global.matchMedia &&
        global.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    } catch (_e) {
      return false;
    }
  }

  function chooseInitialMode() {
    var flag = parseQueryFlag();
    if (flag === "video") return "video";
    if (flag === "canvas") return "canvas";
    if (isSafariOrIOS() || prefersLowPower()) return "canvas";
    return "video";
  }

  function registerPluginOnce() {
    if (registered) return;
    var gsap = global.gsap;
    var ScrollTrigger = global.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;
    try {
      gsap.registerPlugin(ScrollTrigger);
      if (gsap.ticker && typeof gsap.ticker.lagSmoothing === "function") {
        gsap.ticker.lagSmoothing(0);
      }
      if (typeof ScrollTrigger.config === "function") {
        ScrollTrigger.config({ ignoreMobileResize: true });
      }
      registered = true;
    } catch (_e) {
      /* ignore */
    }
  }

  function detachSources(video) {
    if (!video) return;
    var sources = video.querySelectorAll("source");
    var i;
    for (i = 0; i < sources.length; i++) {
      var src = sources[i];
      if (src.getAttribute("src")) {
        src.setAttribute("data-src", src.getAttribute("src"));
        src.removeAttribute("src");
      }
    }
    try {
      video.removeAttribute("src");
      video.load();
    } catch (_e) {
      /* ignore */
    }
  }

  function attachSources(video) {
    if (!video) return;
    var sources = video.querySelectorAll("source");
    var i;
    var restored = false;
    // Safari often ignores <source media>; pick one mp4 via matchMedia when restoring.
    var narrow = false;
    try {
      narrow = !!(
        global.matchMedia &&
        global.matchMedia("(max-width: 1280px)").matches
      );
    } catch (_e0) {
      narrow = false;
    }
    var chosenMp4 = null;
    for (i = 0; i < sources.length; i++) {
      var probe = sources[i];
      var lazySrc0 = probe.getAttribute("data-src") || probe.getAttribute("src");
      var type0 = (probe.getAttribute("type") || "").toLowerCase();
      var media0 = probe.getAttribute("media") || "";
      if (type0.indexOf("mp4") === -1 || !lazySrc0) continue;
      if (media0.indexOf("1280") !== -1) {
        if (narrow) chosenMp4 = probe;
      } else if (!chosenMp4 || !narrow) {
        if (!media0 || media0.indexOf("1280") === -1) {
          if (!narrow) chosenMp4 = probe;
          else if (!chosenMp4) chosenMp4 = probe;
        }
      }
    }
    for (i = 0; i < sources.length; i++) {
      var src = sources[i];
      var lazySrc = src.getAttribute("data-src");
      var type = (src.getAttribute("type") || "").toLowerCase();
      if (!lazySrc) continue;
      if (type.indexOf("mp4") !== -1 && chosenMp4 && src !== chosenMp4) {
        // Leave non-chosen mp4 detached (Safari media quirk).
        continue;
      }
      if (!src.getAttribute("src")) {
        src.setAttribute("src", lazySrc);
        restored = true;
      }
    }
    if (restored) {
      try {
        video.load();
      } catch (_e) {
        /* ignore */
      }
    }
  }

  function chapterLabel(el) {
    if (!el) return "";
    return (el.textContent || "").replace(/\s+/g, " ").trim();
  }

  function applyChapter(ctx, progress) {
    var el = chapterForProgress(ctx.chapterEls, progress);
    if (!el || el === ctx.activeChapter) return;
    var i;
    for (i = 0; i < ctx.chapterEls.length; i++) {
      var c = ctx.chapterEls[i];
      c.classList.remove("is-active");
      c.removeAttribute("aria-current");
    }
    el.classList.add("is-active");
    el.setAttribute("aria-current", "true");
    ctx.activeChapter = el;
    if (ctx.live) {
      ctx.live.textContent = chapterLabel(el);
    }
  }

  function dispatchProgress(progress, frame, mode) {
    try {
      global.dispatchEvent(
        new CustomEvent("scrub:progress", {
          detail: { progress: progress, frame: frame, mode: mode },
        })
      );
    } catch (_e) {
      /* ignore */
    }
  }

  function dispatchMode(mode) {
    try {
      global.dispatchEvent(
        new CustomEvent("scrub:mode", { detail: { mode: mode } })
      );
    } catch (_e) {
      /* ignore */
    }
  }

  function resolveMeta(ctx, manifest) {
    var video = ctx.video;
    var frames = null;
    var fps = null;
    if (video) {
      var df = Number(video.getAttribute("data-frames"));
      var dps = Number(video.getAttribute("data-fps"));
      if (df > 0) frames = df;
      if (dps > 0) fps = dps;
    }
    if (manifest) {
      if (frames == null && manifest.frames > 0) frames = manifest.frames;
      if (fps == null && manifest.fps > 0) fps = manifest.fps;
    }
    ctx.frames = frames > 0 ? frames : DEFAULTS.defaultFrames;
    ctx.fps = fps > 0 ? fps : DEFAULTS.defaultFps;
  }

  function fetchManifest(url) {
    if (!global.fetch || !url) {
      return Promise.resolve(null);
    }
    return global
      .fetch(url)
      .then(function (r) {
        if (!r || !r.ok) return null;
        return r.json();
      })
      .catch(function () {
        return null;
      });
  }

  function seekVideo(ctx, frame) {
    var video = ctx.video;
    if (!video || ctx.mode !== "video") return;
    var t = frame / ctx.fps;
    ctx.wantedFrame = frame;

    if (video.seeking) {
      ctx.queuedFrame = frame;
      return;
    }

    try {
      video.pause();
    } catch (_e) {
      /* ignore */
    }

    var start = global.performance && performance.now ? performance.now() : 0;

    function onSeeked() {
      video.removeEventListener("seeked", onSeeked);
      var end = global.performance && performance.now ? performance.now() : start;
      if (start) {
        pushSeekLatency(end - start);
        ctx.seekSamples.push(end - start);
        maybeDegrade(ctx);
      }
      if (ctx.queuedFrame != null && ctx.queuedFrame !== ctx.lastSeekFrame) {
        var next = ctx.queuedFrame;
        ctx.queuedFrame = null;
        seekVideo(ctx, next);
      }
    }

    video.addEventListener("seeked", onSeeked);
    ctx.lastSeekFrame = frame;

    try {
      if (typeof video.fastSeek === "function") {
        video.fastSeek(t);
      } else {
        video.currentTime = t;
      }
    } catch (_e2) {
      try {
        video.currentTime = t;
      } catch (_e3) {
        video.removeEventListener("seeked", onSeeked);
      }
    }
  }

  function maybeDegrade(ctx) {
    if (ctx.mode !== "video" || ctx.degraded || ctx.staticMode) return;
    if (parseQueryFlag() === "video") return;
    var stats = ensureStats(ctx.mode);
    var samples = ctx.seekSamples;
    var dropRatio =
      stats.presentedFrames + stats.droppedFrames > 0
        ? stats.droppedFrames / (stats.presentedFrames + stats.droppedFrames)
        : 0;
    var latencyFail =
      samples.length >= ctx.opts.seekSampleSize &&
      median(samples.slice(0, ctx.opts.seekSampleSize)) >
        ctx.opts.seekLatencyThresholdMs;
    var dropFail =
      stats.presentedFrames + stats.droppedFrames >= 15 &&
      dropRatio > ctx.opts.dropRatioThreshold;
    if (latencyFail || dropFail) {
      switchToCanvas(ctx);
    }
  }

  function switchToCanvas(ctx) {
    if (ctx.mode === "canvas" || ctx.degraded) return;
    ctx.degraded = true;
    ctx.mode = "canvas";
    ensureStats("canvas");
    if (ctx.video) {
      try {
        ctx.video.pause();
        ctx.video.setAttribute("hidden", "");
        ctx.video.hidden = true;
      } catch (_e) {
        /* ignore */
      }
    }
    if (ctx.canvas) {
      ctx.canvas.removeAttribute("hidden");
      ctx.canvas.hidden = false;
    }
    initCanvasLazy(ctx).then(function () {
      if (ctx.lastFrame != null && global.ScrubCanvas && ScrubCanvas.draw) {
        try {
          ScrubCanvas.draw(ctx.lastFrame);
        } catch (_e2) {
          /* ignore */
        }
      }
    });
    dispatchMode("canvas");
  }

  function initCanvasLazy(ctx) {
    if (ctx.canvasInited) return Promise.resolve();
    if (!global.ScrubCanvas || typeof ScrubCanvas.init !== "function") {
      return Promise.resolve();
    }
    ctx.canvasInited = true;
    try {
      var ret = ScrubCanvas.init({
        canvas: ctx.canvas,
        manifestUrl: ctx.opts.manifestUrl,
      });
      return Promise.resolve(ret).catch(function () {
        /* ignore */
      });
    } catch (_e) {
      return Promise.resolve();
    }
  }

  function onProgress(ctx, progress) {
    var frame = frameFromProgress(progress, ctx.frames);
    if (ctx.root && ctx.root.style && typeof ctx.root.style.setProperty === "function") {
      try {
        ctx.root.style.setProperty("--scrub-progress", String(progress));
      } catch (_e0) {
        /* ignore */
      }
    }
    dispatchProgress(progress, frame, ctx.mode);
    applyChapter(ctx, progress);
    if (frame === ctx.lastFrame) return;
    ctx.lastFrame = frame;
    if (ctx.staticMode || !ctx.mediaReady) return;
    if (ctx.mode === "video") {
      seekVideo(ctx, frame);
    } else if (global.ScrubCanvas && typeof ScrubCanvas.draw === "function") {
      try {
        ScrubCanvas.draw(frame);
      } catch (_e) {
        /* ignore */
      }
    }
  }

  function setupRvfc(ctx) {
    var video = ctx.video;
    if (!video || typeof video.requestVideoFrameCallback !== "function") return;
    var lastMediaTime = -1;
    function tick(_now, meta) {
      if (!state || state !== ctx || ctx.mode !== "video") return;
      var stats = ensureStats("video");
      stats.presentedFrames += 1;
      if (meta && typeof meta.mediaTime === "number" && lastMediaTime >= 0) {
        var expected = 1 / ctx.fps;
        var delta = meta.mediaTime - lastMediaTime;
        if (delta > expected * 1.75) {
          stats.droppedFrames += Math.max(
            0,
            Math.round(delta / expected) - 1
          );
          maybeDegrade(ctx);
        }
      }
      if (meta && typeof meta.mediaTime === "number") {
        lastMediaTime = meta.mediaTime;
      }
      ctx.rvfcHandle = video.requestVideoFrameCallback(tick);
    }
    try {
      ctx.rvfcHandle = video.requestVideoFrameCallback(tick);
    } catch (_e) {
      /* ignore */
    }
  }

  function setupLongTaskObserver(ctx) {
    if (typeof global.PerformanceObserver !== "function") return;
    try {
      var po = new PerformanceObserver(function (list) {
        var entries = list.getEntries();
        ensureStats().longTasks += entries.length;
      });
      po.observe({ type: "longtask", buffered: true });
      ctx.longTaskObserver = po;
    } catch (_e) {
      /* longtask unsupported */
    }
  }

  function refreshWhenReady(ctx) {
    var ScrollTrigger = global.ScrollTrigger;
    if (!ScrollTrigger || typeof ScrollTrigger.refresh !== "function") return;
    var refresh = function () {
      try {
        ScrollTrigger.refresh();
      } catch (_e) {
        /* ignore */
      }
    };
    if (ctx.video) {
      if (ctx.video.readyState >= 1) {
        refresh();
      } else {
        ctx.video.addEventListener("loadedmetadata", refresh, { once: true });
      }
    }
    if (global.document && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh).catch(function () {});
    }
    if (global.document) {
      var imgs = qa(ctx.root || document, "img");
      var remaining = 0;
      imgs.forEach(function (img) {
        if (img.complete) return;
        remaining += 1;
        var done = function () {
          remaining -= 1;
          if (remaining <= 0) refresh();
        };
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      });
    }
    if (global.addEventListener) {
      global.addEventListener("load", refresh, { once: true });
    }
  }

  function enterStaticMode(ctx) {
    ctx.staticMode = true;
    ctx.mode = ctx.mode || "video";
    ensureStats(ctx.mode);
    if (ctx.root && ctx.root.classList) {
      ctx.root.classList.add("is-static");
    }
    if (ctx.video) {
      try {
        ctx.video.pause();
      } catch (_e) {
        /* ignore */
      }
      detachSources(ctx.video);
    }
    var wrap = q(ctx.root, ctx.opts.chaptersWrap) || q(ctx.root, ".scrub-chapters");
    if (wrap) {
      wrap.removeAttribute("aria-hidden");
      var kids = qa(wrap, "[data-chapter]");
      var i;
      for (i = 0; i < kids.length; i++) {
        kids[i].classList.add("is-static");
        kids[i].classList.remove("is-active");
        kids[i].removeAttribute("aria-current");
      }
    } else {
      ctx.chapterEls.forEach(function (el) {
        el.classList.add("is-static");
      });
    }
    if (ctx.live) ctx.live.textContent = "";
  }

  function enableMedia(ctx) {
    if (ctx.mediaReady || ctx.staticMode) return;
    ctx.mediaReady = true;
    if (ctx.mode === "video") {
      attachSources(ctx.video);
      setupRvfc(ctx);
      if (ctx.lastFrame != null) seekVideo(ctx, ctx.lastFrame);
    } else {
      if (ctx.canvas) {
        ctx.canvas.removeAttribute("hidden");
        ctx.canvas.hidden = false;
      }
      if (ctx.video) {
        ctx.video.setAttribute("hidden", "");
        ctx.video.hidden = true;
        detachSources(ctx.video);
      }
      initCanvasLazy(ctx).then(function () {
        if (ctx.lastFrame != null && global.ScrubCanvas && ScrubCanvas.draw) {
          try {
            ScrubCanvas.draw(ctx.lastFrame);
          } catch (_e) {
            /* ignore */
          }
        }
      });
    }
  }

  function setupLazy(ctx) {
    if (ctx.staticMode) return;
    if (typeof global.IntersectionObserver !== "function" || !ctx.root) {
      enableMedia(ctx);
      return;
    }
    // Poster stays; sources detached until near viewport.
    if (ctx.mode === "video" && ctx.video) {
      detachSources(ctx.video);
    }
    ctx.io = new IntersectionObserver(
      function (entries) {
        var i;
        for (i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            enableMedia(ctx);
            if (ctx.io) {
              ctx.io.disconnect();
              ctx.io = null;
            }
            break;
          }
        }
      },
      { root: null, rootMargin: ctx.opts.lazyRootMargin, threshold: 0 }
    );
    try {
      ctx.io.observe(ctx.root);
    } catch (_e) {
      enableMedia(ctx);
    }
  }

  function createPinTriggers(ctx) {
    var gsap = global.gsap;
    var ScrollTrigger = global.ScrollTrigger;
    if (!gsap || !ScrollTrigger || !ctx.pin) return;

    ctx.mm = gsap.matchMedia();

    ctx.mm.add("(prefers-reduced-motion: reduce)", function () {
      enterStaticMode(ctx);
      return function () {
        /* leaving reduce — full re-init via destroy/init not required mid-session */
      };
    });

    if (ctx.staticMode) return;

    ctx.mm.add(
      {
        isDesktop: "(min-width: 721px)",
        isNarrow: "(max-width: 720px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      function (mqCtx) {
        var cond = mqCtx.conditions || {};
        if (cond.reduceMotion) return;
        // GSAP ScrollTrigger parses "+=500vh" as 500px (unit ignored). Use % of
        // viewport (100% === 1vh of scroller) so desktop≈500vh and narrow≈350vh.
        var end = cond.isNarrow ? "+=350%" : "+=500%";
        var st = ScrollTrigger.create({
          id: "scrub-main",
          trigger: ctx.pin,
          pin: ctx.pin,
          start: "top top",
          end: end,
          scrub: 0.35,
          pinSpacing: true,
          onUpdate: function (self) {
            onProgress(ctx, self.progress);
          },
        });
        ctx.triggers.push(st);
        return function () {
          try {
            st.kill();
          } catch (_e) {
            /* ignore */
          }
          var idx = ctx.triggers.indexOf(st);
          if (idx >= 0) ctx.triggers.splice(idx, 1);
        };
      }
    );
  }

  function restoreDom(ctx) {
    if (!ctx) return;
    var i;
    if (ctx.root && ctx.root.classList) {
      ctx.root.classList.remove("is-static");
      if (ctx.root.style && typeof ctx.root.style.removeProperty === "function") {
        try {
          ctx.root.style.removeProperty("--scrub-progress");
        } catch (_e0) {
          /* ignore */
        }
      }
    }
    for (i = 0; i < ctx.chapterEls.length; i++) {
      var el = ctx.chapterEls[i];
      el.classList.remove("is-active", "is-static");
      el.removeAttribute("aria-current");
    }
    var wrap = q(ctx.root, ".scrub-chapters");
    if (wrap && !wrap.getAttribute("aria-hidden")) {
      wrap.setAttribute("aria-hidden", "true");
    }
    if (ctx.live) ctx.live.textContent = "";
    if (ctx.video) {
      ctx.video.hidden = false;
      ctx.video.removeAttribute("hidden");
      attachSources(ctx.video);
    }
    if (ctx.canvas) {
      ctx.canvas.hidden = true;
      ctx.canvas.setAttribute("hidden", "");
    }
  }

  function destroy() {
    var ctx = state;
    if (!ctx) return;
    state = null;

    if (ctx.io) {
      try {
        ctx.io.disconnect();
      } catch (_e) {
        /* ignore */
      }
      ctx.io = null;
    }

    if (ctx.longTaskObserver) {
      try {
        ctx.longTaskObserver.disconnect();
      } catch (_e2) {
        /* ignore */
      }
      ctx.longTaskObserver = null;
    }

    if (ctx.video && ctx.rvfcHandle != null && ctx.video.cancelVideoFrameCallback) {
      try {
        ctx.video.cancelVideoFrameCallback(ctx.rvfcHandle);
      } catch (_e3) {
        /* ignore */
      }
    }

    if (ctx.mm && typeof ctx.mm.revert === "function") {
      try {
        ctx.mm.revert();
      } catch (_e4) {
        /* ignore */
      }
    }

    var i;
    for (i = 0; i < ctx.triggers.length; i++) {
      try {
        ctx.triggers[i].kill();
      } catch (_e5) {
        /* ignore */
      }
    }
    ctx.triggers = [];

    try {
      var st = global.ScrollTrigger && ScrollTrigger.getById("scrub-main");
      if (st) st.kill();
    } catch (_e6) {
      /* ignore */
    }

    if (global.ScrubCanvas && typeof ScrubCanvas.destroy === "function") {
      try {
        ScrubCanvas.destroy();
      } catch (_e7) {
        /* ignore */
      }
    }

    restoreDom(ctx);
  }

  function init(opts) {
    destroy();
    registerPluginOnce();

    var o = {};
    var key;
    for (key in DEFAULTS) {
      if (Object.prototype.hasOwnProperty.call(DEFAULTS, key)) o[key] = DEFAULTS[key];
    }
    opts = opts || {};
    for (key in opts) {
      if (Object.prototype.hasOwnProperty.call(opts, key) && opts[key] != null) {
        o[key] = opts[key];
      }
    }

    var doc = global.document;
    if (!doc) {
      return ScrubEngine;
    }

    var root = typeof o.root === "string" ? q(doc, o.root) : o.root;
    if (!root) {
      return ScrubEngine;
    }

    var video =
      typeof o.video === "string" ? q(root, o.video) || q(doc, o.video) : o.video;
    var canvas =
      typeof o.canvas === "string"
        ? q(root, o.canvas) || q(doc, o.canvas)
        : o.canvas;
    var live =
      typeof o.live === "string" ? q(root, o.live) || q(doc, o.live) : o.live;
    var pin =
      typeof o.pin === "string" ? q(root, o.pin) || q(doc, o.pin) : o.pin;
    var stage =
      typeof o.stage === "string" ? q(root, o.stage) || q(doc, o.stage) : o.stage;

    var ctx = {
      opts: o,
      root: root,
      video: video || null,
      canvas: canvas || null,
      live: live || null,
      pin: pin || null,
      stage: stage || null,
      chapterEls: qa(root, o.chapters),
      mode: chooseInitialMode(),
      frames: o.defaultFrames,
      fps: o.defaultFps,
      lastFrame: null,
      wantedFrame: null,
      queuedFrame: null,
      lastSeekFrame: null,
      mediaReady: false,
      staticMode: false,
      degraded: false,
      canvasInited: false,
      activeChapter: null,
      triggers: [],
      mm: null,
      io: null,
      longTaskObserver: null,
      rvfcHandle: null,
      seekSamples: [],
    };

    state = ctx;
    ensureStats(ctx.mode);

    var staticPath = prefersReducedMotion() || connectionSaveData();
    if (staticPath) {
      enterStaticMode(ctx);
      setupLongTaskObserver(ctx);
      return ScrubEngine;
    }

    // Hide canvas until needed in video mode
    if (ctx.mode === "video" && ctx.canvas) {
      ctx.canvas.hidden = true;
      ctx.canvas.setAttribute("hidden", "");
    }
    if (ctx.mode === "canvas" && ctx.video) {
      ctx.video.hidden = true;
      ctx.video.setAttribute("hidden", "");
    }

    // Detach media sources ASAP (poster attribute stays); re-attach on lazy enter.
    if (ctx.video) detachSources(ctx.video);

    setupLongTaskObserver(ctx);
    setupLazy(ctx);

    fetchManifest(o.manifestUrl).then(function (manifest) {
      if (state !== ctx) return;
      resolveMeta(ctx, manifest);
      if (ctx.lastFrame == null) {
        onProgress(ctx, 0);
      }
    });
    resolveMeta(ctx, null);

    if (!global.gsap || !global.ScrollTrigger || !ctx.pin) {
      // No GSAP: still expose chapter mapping on scroll via rAF no-op guard
      return ScrubEngine;
    }

    createPinTriggers(ctx);
    refreshWhenReady(ctx);
    dispatchMode(ctx.mode);
    onProgress(ctx, 0);

    return ScrubEngine;
  }

  var ScrubEngine = {
    init: init,
    destroy: destroy,
    frameFromProgress: frameFromProgress,
    chapterForProgress: chapterForProgress,
    get mode() {
      return state ? state.mode : chooseInitialMode();
    },
  };

  global.ScrubEngine = ScrubEngine;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = ScrubEngine;
  }

  function autoInit() {
    try {
      if (!global.document || !document.querySelector("#scrub")) return;
      if (!global.gsap || !global.ScrollTrigger) return;
      ScrubEngine.init();
    } catch (_e) {
      /* never throw */
    }
  }

  if (global.document) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", autoInit);
    } else {
      autoInit();
    }
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
