(function() {
  function initScrubCanvas(canvasId, wrapperId, frameCount, framePattern, options) {
    const canvas = document.getElementById(canvasId);
    const wrapper = document.getElementById(wrapperId);
    if (!canvas || !wrapper) return;

    const settings = options || {};
    const lookahead = settings.lookahead == null ? 4 : settings.lookahead;
    const lookbehind = settings.lookbehind == null ? 2 : settings.lookbehind;
    const loadFirstFrameNow = settings.loadFirstFrameNow !== false;

    const ctx = canvas.getContext('2d', { alpha: false });
    const frames = new Array(frameCount);
    const requested = new Array(frameCount);
    let currentFrame = -1;
    let sequenceArmed = false;

    function pad(n) { return String(n).padStart(4, '0'); }

    function requestFrame(index) {
      if (index < 0 || index >= frameCount || requested[index]) return;
      requested[index] = true;
      const img = new Image();
      img.decoding = 'async';
      img.src = framePattern.replace('%04d', pad(index + 1));
      img.onload = () => {
        frames[index] = img;
        if (currentFrame < 0 && index === 0) drawFrame(0);
        else if (index === currentFrame) drawFrame(currentFrame);
      };
    }

    function requestWindow(index) {
      requestFrame(index);
      for (let step = 1; step <= lookahead; step++) requestFrame(index + step);
      for (let step = 1; step <= lookbehind; step++) requestFrame(index - step);
    }

    function drawFrame(index) {
      if (index < 0) index = 0;
      if (index >= frameCount) index = frameCount - 1;

      let img = frames[index];

      if (!img || !img.complete) {
        let bestDist = Infinity;
        for (let i = 0; i < frames.length; i++) {
          if (frames[i] && frames[i].complete) {
            const dist = Math.abs(i - index);
            if (dist < bestDist) {
              bestDist = dist;
              img = frames[i];
            }
          }
        }
      }

      if (img && img.complete && img.naturalWidth > 0) {
        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        const scale = Math.max(cw / iw, ch / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        const dx = (cw - dw) / 2;
        const dy = (ch - dh) / 2;

        ctx.fillStyle = '#030810';
        ctx.fillRect(0, 0, cw, ch);
        ctx.drawImage(img, dx, dy, dw, dh);
        currentFrame = index;
      }
    }

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      if (currentFrame >= 0) drawFrame(currentFrame);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    function sectionIsNear() {
      const rect = wrapper.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      return rect.top < windowHeight && rect.bottom > 0;
    }

    function updateScroll() {
      if (!sectionIsNear()) return;
      if (!sequenceArmed) {
        if (loadFirstFrameNow) requestFrame(0);
        drawFrame(0);
        return;
      }

      const rect = wrapper.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      let progress = 0;
      if (rect.top <= 0) {
        const scrollDistance = -rect.top;
        const totalScrollable = rect.height - windowHeight;
        if (totalScrollable > 0) {
          progress = scrollDistance / totalScrollable;
        }
      }
      progress = Math.max(0, Math.min(1, progress));
      const targetFrame = Math.floor(progress * (frameCount - 1));
      requestWindow(targetFrame);
      drawFrame(targetFrame);
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScroll();
          ticking = false;
        });
        ticking = true;
      }
    }

    function armSequence() {
      if (sequenceArmed) return;
      sequenceArmed = true;
      window.removeEventListener('scroll', armSequence);
      window.removeEventListener('wheel', armSequence);
      window.removeEventListener('touchstart', armSequence);
      window.removeEventListener('keydown', armSequence);
      updateScroll();
    }

    window.addEventListener('scroll', armSequence, { passive: true });
    window.addEventListener('wheel', armSequence, { passive: true });
    window.addEventListener('touchstart', armSequence, { passive: true });
    window.addEventListener('keydown', armSequence);

    window.addEventListener('scroll', onScroll, { passive: true });

    if (loadFirstFrameNow && sectionIsNear()) {
      requestFrame(0);
      drawFrame(0);
    } else if (!loadFirstFrameNow) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        requestFrame(0);
        drawFrame(0);
        observer.disconnect();
      }, { rootMargin: '200px 0px' });
      observer.observe(wrapper);
    }

    updateScroll();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initScrubCanvas('invasion-canvas', 'invasion-canvas-wrapper', 192, 'assets/invasion/frames-960/f_%04d.webp', {
      loadFirstFrameNow: true
    });
    initScrubCanvas('game-canvas', 'showcase-canvas-wrapper', 134, 'assets/scrub/frames-960/f_%04d.webp', {
      loadFirstFrameNow: false
    });
  });
})();
