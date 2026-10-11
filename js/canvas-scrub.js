(function() {
  function initScrubCanvas(canvasId, wrapperId, frameCount, framePattern) {
    const canvas = document.getElementById(canvasId);
    const wrapper = document.getElementById(wrapperId);
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    const frames = [];
    let currentFrame = -1;

    // Fast pad function
    function pad(n) { return String(n).padStart(4, '0'); }

    // Preload logic
    let loadedCount = 0;
    const preloadOrder = [0, frameCount - 1, Math.floor(frameCount / 2)];
    for (let i = 0; i < frameCount; i++) {
      if (!preloadOrder.includes(i)) preloadOrder.push(i);
    }

    function loadNext() {
        if (loadedCount >= frameCount) return;
        const i = preloadOrder[loadedCount];
        const img = new Image();
        img.src = framePattern.replace('%04d', pad(i + 1));
        img.onload = () => {
            frames[i] = img;
            if (i === 0) drawFrame(0);
        };
        loadedCount++;
        if (loadedCount < frameCount) {
             setTimeout(loadNext, 15);
        }
    }
    loadNext();

    function drawFrame(index) {
      if (index < 0) index = 0;
      if (index >= frameCount) index = frameCount - 1;
      
      let img = frames[index];
      
      if (!img || !img.complete) {
        let bestDist = Infinity;
        for (let i = 0; i < frames.length; i++) {
           if (frames[i] && frames[i].complete) {
             let d = Math.abs(i - index);
             if (d < bestDist) {
                bestDist = d;
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

    function updateScroll() {
      const rect = wrapper.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top > windowHeight || rect.bottom < 0) return;
      
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
      drawFrame(targetFrame);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScroll();
  }

  document.addEventListener('DOMContentLoaded', () => {
     initScrubCanvas('invasion-canvas', 'invasion-canvas-wrapper', 192, 'assets/invasion/frames-960/f_%04d.webp');
     initScrubCanvas('game-canvas', 'showcase-canvas-wrapper', 134, 'assets/scrub/frames-960/f_%04d.webp');
  });
})();
