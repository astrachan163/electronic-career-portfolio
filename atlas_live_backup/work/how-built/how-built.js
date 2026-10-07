/**
 * How-built demo: scroll-scrub math.
 * frame = round(progress * (frames - 1)); time = frame / fps
 * Chapters: [start, end) progress windows from the page markup.
 */
(function () {
  "use strict";

  var FRAMES = 134;
  var FPS = 24;
  var CHAPTERS = [
    { id: "build", label: "Build", start: 0, end: 0.2 },
    { id: "explain", label: "Explain", start: 0.2, end: 0.4 },
    { id: "protect", label: "Protect", start: 0.4, end: 0.6 },
    { id: "ai", label: "AI", start: 0.6, end: 0.8 },
    { id: "cloud", label: "Cloud", start: 0.8, end: 1 },
  ];

  function clamp(n, lo, hi) {
    return Math.min(hi, Math.max(lo, n));
  }

  function frameFromProgress(progress, frames) {
    var f = Math.max(1, Number(frames) || 1);
    return Math.round(clamp(Number(progress) || 0, 0, 1) * (f - 1));
  }

  function chapterForProgress(progress) {
    var p = clamp(Number(progress) || 0, 0, 1);
    var i;
    var c;
    for (i = 0; i < CHAPTERS.length; i++) {
      c = CHAPTERS[i];
      if (p >= c.start && (p < c.end || (c.end >= 1 && p <= 1 && i === CHAPTERS.length - 1))) {
        return c;
      }
    }
    return CHAPTERS[CHAPTERS.length - 1];
  }

  function formatTime(seconds) {
    return Number(seconds).toFixed(3) + " s";
  }

  function update(progress) {
    var p = clamp(progress, 0, 1);
    var frame = frameFromProgress(p, FRAMES);
    var t = frame / FPS;
    var chapter = chapterForProgress(p);

    var elProg = document.getElementById("out-progress");
    var elFrame = document.getElementById("out-frame");
    var elTime = document.getElementById("out-time");
    var elChapter = document.getElementById("out-chapter");
    var live = document.getElementById("math-live");
    var slider = document.getElementById("progress-slider");

    if (elProg) elProg.textContent = p.toFixed(3);
    if (elFrame) elFrame.textContent = String(frame) + " / " + String(FRAMES - 1);
    if (elTime) elTime.textContent = formatTime(t);
    if (elChapter) {
      elChapter.textContent = chapter.label;
      elChapter.dataset.chapter = chapter.id;
    }
    if (live) {
      live.textContent =
        "Progress " +
        p.toFixed(2) +
        ", frame " +
        frame +
        ", time " +
        formatTime(t) +
        ", chapter " +
        chapter.label;
    }
    if (slider && Number(slider.value) !== Math.round(p * 1000)) {
      /* keep slider in sync only when driven elsewhere */
    }
  }

  function init() {
    var slider = document.getElementById("progress-slider");
    if (!slider) return;

    var reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function onInput() {
      var p = Number(slider.value) / 1000;
      update(p);
    }

    slider.addEventListener("input", onInput);
    slider.addEventListener("change", onInput);

    if (!reduce) {
      /* initial only; no auto-animation */
    }
    update(Number(slider.value) / 1000);

    /* Expose for node/unit checks */
    window.__howBuiltMath = {
      frameFromProgress: frameFromProgress,
      chapterForProgress: chapterForProgress,
      FRAMES: FRAMES,
      FPS: FPS,
      CHAPTERS: CHAPTERS,
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
