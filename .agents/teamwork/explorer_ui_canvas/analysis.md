# UI Canvas, Modal Architecture & Touch Navigation Diagnostic Analysis

**Agent**: Explorer 1 (UI Canvas & Modal Architecture)  
**Investigation Date**: 2026-10-07T06:20:00Z  
**Target Codebase**: `/Users/andrewstrachan/career_portfolio`  
**Referenced Specs**: `ORIGINAL_REQUEST.md` (§2026-10-07T06:09:53Z), `MASTER_REVAMP_SPEC.md`, `brief.md`

---

## 1. Executive Summary

A comprehensive diagnostic investigation was performed across all HTML, CSS, and JavaScript assets within `/Users/andrewstrachan/career_portfolio`. 

While previous automated patch scripts (`fix_all.py`, `patch_portfolio2.py`, `fix_remaining.py`) appended several CSS rule blocks to `styles/main.css` and added utility functions to `js/app.js`, **critical disconnects exist between the stylesheet rules, JavaScript event listeners, and the underlying DOM elements in `index.html`**:

1. **Sticky Window Canvas Pipeline**: 
   - CSS rules `.sticky-canvas-wrapper` (`height: 400dvh`), `.sticky-canvas-inner` (`position: sticky; top: 0; height: 100dvh; z-index: 1; pointer-events: none;`), and `.interactive-card` (`pointer-events: auto;`) exist in `styles/main.css` (lines 739–741).
   - However, **none of these classes are present in `index.html`**. A previous string replacement script (`fix_remaining.py`) searched for `hero-canvas-container` and `<canvas id="game-canvas"`, which did not exist in `index.html`, resulting in 0 applied changes.
   - In the companion Project Atlas site (`atlas_hero_update`), pinning is handled via GSAP ScrollTrigger JavaScript pinning and uses `100svh` / `100vh` rather than native CSS sticky `100dvh`.

2. **Media Modal Player Architecture**:
   - `js/app.js` (lines 503–590) includes polymorphic logic to render either an `<img>` or `<video>` inside the modal.
   - However, **zero media elements in `index.html` or `dist/` are marked with `data-type="image"` or `data-type="video"`**.
   - Video elements (`.preview-video-element` on lines 1135, 1167, 1199) are excluded from the `querySelectorAll` trigger query (`.pd-card-img, .pd-preview-img, [data-type="image"], [data-type="video"]`) and cannot be clicked to open in the modal.
   - The close button (`#btn-modal-close`) has `z-index: 9999; pointer-events: auto;` assigned via inline JavaScript, but in static CSS (`styles/components.css` line 650) it lacks these properties because the class `.modal-close-btn` defined in `styles/main.css` line 748 is not attached to the HTML button.
   - Backdrop click dismiss exists in JS via `modal.getBoundingClientRect()`, but only listens to `'click'` (not `'touchend'`). Closing the modal via backdrop or close button **fails to pause the video element**, leaking audio in the background.
   - Modal header ellipsis truncation (`.modal-header-fix`) is attached to `<h3>`, but `.modal-header` is a Flexbox container lacking `min-width: 0` on the title, causing long text to violate truncation and overflow on narrow viewports.

3. **Touch Navigation & Ghost Arrow Controls**:
   - Keyboard shortcuts (`←` / `→` Prev/Next Section, `Space`, `1-8`, `Esc`) in `index.html` lines 1520–1526 are unconditionally styled as visible flex items (`styles/components.css` lines 745–753).
   - Although `.nav-cues` and `.mobile-swipe-cues` CSS rules exist in `styles/main.css` lines 743–746 wrapped in `@media (hover: hover) and (pointer: fine)`, **neither class is applied to `.presenter-keyboard-shortcuts` or any DOM element**. Consequently, keyboard cues remain visible on mobile touch devices.
   - In `atlas_hero_update`, `.map-controls` (`<span>↑ ↓ ← →</span> move <span>ENTER</span> open`) is explicitly forced visible on screens `<= 720px` (`atlas_hero_update/style.css` line 46).

---

## 2. Inventory of Portfolio Implementation Files

| Category | File Path | Lines | Bytes | Architectural Role |
| :--- | :--- | :--- | :--- | :--- |
| **HTML** | `/index.html` | 1,609 | 118,931 | Single-Page Application: Header, Hero, Resume, Career, Education, Pro-Dev, Skills, Projects, Sources, Presenter Drawer, and `<dialog id="video-modal">`. |
| **HTML** | `/dist/public/index.html` | 1,577 | 116,500 | Production-built public sanitized variant. |
| **HTML** | `/dist/private/index.html` | 1,577 | 116,500 | Production-built private unredacted variant. |
| **CSS** | `/styles/main.css` | 753 | 17,858 | Design tokens, typography, CSS reset, layout utilities, animations, revamp specs (`.sticky-canvas-wrapper`, `.nav-cues`, `.modal-close-btn`). |
| **CSS** | `/styles/components.css` | 991 | 22,716 | Modular component styles: cards, skills matrix, timelines, tables, presenter drawer HUD, video modal dialog, pro-dev gallery. |
| **CSS** | `/styles/print.css` | 172 | 4,374 | Print stylesheet for presentation / PDF generation. |
| **JS** | `/js/app.js` | 603 | 22,424 | Bootstrap, skills filter, presenter HUD timer, keyboard nav, video previews, intersection observers, polymorphic lightbox modal (`initImageLightbox`), accordion toggle (`initAccordion`). |
| **JS** | `/js/config.js` | 54 | 1,792 | Contact info, repository links, feature flags. |
| **JS** | `/js/presenter.js` | 143 | 5,550 | Standalone presenter state module. |
| **JS Data** | `/data/config.js` | 102 | 3,450 | Central portfolio constant data. |
| **Atlas HTML** | `/atlas_hero_update/index.html` | 315 | 28,581 | Project Atlas site with `#invasion-hero`, rover map stage (`#map-stage`), and scroll scrub (`#scrub`). |
| **Atlas CSS** | `/atlas_hero_update/style.css` | 1,245 | ~35,000 | Project Atlas styling including mobile breakpoint rules. |
| **Atlas JS** | `/atlas_hero_update/scrub/invasion-hero.js` | 323 | 8,818 | 192-frame canvas scrubber with ScrollTrigger. |
| **Atlas JS** | `/atlas_hero_update/scrub/scrub-canvas.js` | 356 | 9,800 | LRU canvas frame caching fallback engine. |
| **Atlas JS** | `/atlas_hero_update/scrub/scrub-controller.js` | 935 | 26,000 | Video / canvas scrub controller. |

---

## 3. Deep-Dive: Sticky Window Canvas Pipeline

### 3.1 CSS Specification Status
In `/Users/andrewstrachan/career_portfolio/styles/main.css`, lines 739–741:
```css
.sticky-canvas-wrapper { height: 400dvh; }
.sticky-canvas-inner { position: sticky; top: 0; height: 100dvh; z-index: 1; pointer-events: none; }
.interactive-card { pointer-events: auto; }
```
- **Finding**: The CSS classes are syntactically present in `styles/main.css`.
- **Defects in CSS**:
  1. `.sticky-canvas-wrapper` is missing `position: relative;`. Without relative positioning on the scroll track wrapper, sticky children can behave unpredictably across various mobile browsers if overflow ancestors are present.
  2. The interactive card selector `.interactive-card` is defined in isolation, but no existing card classes in the codebase inherit from or map to it.

### 3.2 HTML DOM Binding Status
- **Grep Verification**:
  - `sticky-canvas-wrapper` in `index.html`: **0 occurrences**.
  - `sticky-canvas-inner` in `index.html`: **0 occurrences**.
  - `interactive-card` in `index.html`: **0 occurrences**.
- **Root-Cause Analysis**:
  - `fix_remaining.py` attempted:
    ```python
    html = html.replace('class="hero-canvas-container"', 'class="hero-canvas-container sticky-canvas-wrapper"')
    html = html.replace('<canvas id="game-canvas"', '<div class="sticky-canvas-inner"><canvas id="game-canvas"')
    html = html.replace('</canvas>', '</canvas></div>')
    ```
  - In `index.html`, neither `hero-canvas-container` nor `<canvas id="game-canvas"` existed. The Python string replacement returned the original string unaltered.
  - In the main career portfolio (`index.html`), the hero section uses a static brand visual emblem card (`<div class="hero-crest-frame"><img src="assets/brand/circuit-m-logo.jpg" ...></div>` lines 105–109) rather than an embedded canvas.
  - If a 400dvh sticky canvas pipeline is intended for the career portfolio hero or project showcase, the DOM structure `<div class="sticky-canvas-wrapper"><div class="sticky-canvas-inner"><canvas ...></canvas></div></div>` must be explicitly inserted.
  - In `atlas_hero_update/index.html`, `#invasion-hero` uses `.invasion-pin` and `.invasion-stage` animated by GSAP ScrollTrigger rather than CSS sticky window.

### 3.3 Dynamic Viewport Units (`100dvh` vs `100vh`)
- **Main Portfolio**:
  - `styles/main.css` lines 76–77: `min-height: 100vh; min-height: 100dvh;` is used on `body`.
  - `styles/components.css` lines 620–621: `.presenter-drawer` uses `height: 100vh; height: 100dvh;`.
  - `js/app.js` line 556: `lightboxImg.style.maxHeight = '80vh';` uses `80vh` instead of `80dvh`.
- **Atlas Project (`atlas_hero_update`)**:
  - `atlas_hero_update/index.html` lines 18–36 uses `min-height: 100vh; min-height: 100svh;` and `height: 100vh; height: 100svh;`.
  - `atlas_hero_update/style.css` lines 16, 68–70 also uses `100svh` and `100vh`, **never `100dvh`**.
  - On mobile devices when the address bar expands or collapses during scrolling, `100svh` locks to the smallest height, while `100dvh` dynamically tracks the actual available viewport, preventing jumpy reflows.

---

## 4. Deep-Dive: Media Modal Player

### 4.1 Polymorphic Rendering Architecture
In `js/app.js` lines 503–590 (`initImageLightbox`):
```javascript
clickableMedia.forEach(media => {
  if (media.closest('a.pd-image-link')) return;

  media.addEventListener('click', () => {
    const type = media.getAttribute('data-type') || (media.tagName === 'VIDEO' ? 'video' : 'image');
    const src = media.getAttribute('src') || media.getAttribute('data-src');
    const alt = media.getAttribute('alt') || 'Asset Preview';

    if (modalTitle) modalTitle.textContent = alt;

    if (modalBody) {
      let lightboxImg = document.getElementById('lightbox-img-element');
      if (!lightboxImg) {
        lightboxImg = document.createElement('img');
        lightboxImg.id = 'lightbox-img-element';
        lightboxImg.style.maxWidth = '100%';
        lightboxImg.style.maxHeight = '80vh';
        lightboxImg.style.objectFit = 'contain';
        lightboxImg.style.borderRadius = '8px';
        modalBody.appendChild(lightboxImg);
      }

      if (type === 'video') {
        if (lightboxImg) lightboxImg.style.display = 'none';
        if (videoEl) {
          videoEl.style.display = 'block';
          videoEl.src = src;
          videoEl.play();
        }
      } else {
        if (videoEl) {
          videoEl.style.display = 'none';
          videoEl.pause();
        }
        if (lightboxImg) {
          lightboxImg.src = src;
          lightboxImg.alt = alt;
          lightboxImg.style.display = 'block';
        }
      }
    }
...
```
**Diagnostic Findings**:
1. Polymorphic switching exists in JS between `img#lightbox-img-element` and `video#modal-video-element`.
2. **Defect in Media Wrapper Container**: `index.html` line 1539 contains `.modal-video-wrapper`. In `styles/components.css` line 802:
   ```css
   .modal-video-wrapper {
     aspect-ratio: 16 / 9;
     width: 100%;
     background: #000;
     border-radius: var(--border-radius-sm);
     overflow: hidden;
   }
   ```
   Enforcing `aspect-ratio: 16 / 9` severely distorts or letterboxes portrait images (such as certificates or vertical mobile screenshots). For a truly polymorphic player, the wrapper should adapt dynamically (`aspect-ratio: auto` for images, or allow full height with `max-height: 80dvh`).

### 4.2 Explicit `data-type="image"` and `data-type="video"` Tagging
- **DOM Audit**:
  - `data-type="image"` occurrences in `index.html`: **0**.
  - `data-type="video"` occurrences in `index.html`: **0**.
  - `data-type` occurrences in `dist/public/index.html` and `dist/private/index.html`: **0**.
- **Impact**:
  - The JS selector is:
    ```javascript
    const clickableMedia = document.querySelectorAll(
      '.pd-card-img, .pd-preview-img, [data-type="image"], [data-type="video"]'
    );
    ```
  - In `index.html`, only `.pd-card-img` elements match.
  - Video elements (`.preview-video-element` on lines 1135, 1167, 1199) have neither `.pd-card-img`, `.pd-preview-img`, nor `data-type="video"`. Consequently, **clicking a video thumbnail or preview card never opens the modal player**.

### 4.3 Close Button Styling and Event Handlers
- **CSS Status**:
  - `styles/main.css` line 748: `.modal-close-btn { z-index: 9999; pointer-events: auto; }`.
  - `index.html` line 1536:
    `<button type="button" class="btn-close-drawer" id="btn-modal-close" aria-label="Close Video Preview Modal">&times;</button>`.
  - The button does **not** have the class `.modal-close-btn`. In static CSS, it only has `.btn-close-drawer` (`styles/components.css` line 650), which lacks `z-index: 9999` and `pointer-events: auto`.
- **JavaScript Status**:
  - `js/app.js` lines 528–538:
    ```javascript
    if (closeBtn) {
      closeBtn.style.zIndex = '9999';
      closeBtn.style.pointerEvents = 'auto';
      const closeModal = (e) => {
        if (e) e.preventDefault();
        if (typeof modal.close === 'function') modal.close();
        else modal.removeAttribute('open');
      };
      closeBtn.addEventListener('click', closeModal);
      closeBtn.addEventListener('touchend', closeModal);
    }
    ```
  - Inline JS sets `style.zIndex = '9999'` and `style.pointerEvents = 'auto'`, and binds both `click` and `touchend`.
  - **Defect**: The class `.modal-close-btn` should be applied directly in HTML (`class="btn-close-drawer modal-close-btn"`) and `#btn-modal-close` should be explicitly styled in `styles/components.css` to prevent any CSS race condition or dependency on JS execution.

### 4.4 Backdrop Tap/Click Dismiss & Background Audio Leak
- **Backdrop Dismiss**:
  - `js/app.js` lines 514–525:
    ```javascript
    modal.addEventListener('click', (e) => {
      const dialogDimensions = modal.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        if (typeof modal.close === 'function') modal.close();
        else modal.removeAttribute('open');
      }
    });
    ```
  - **Defect 1**: The backdrop handler only listens to `'click'`. On iOS Safari mobile touch screens, tapping on a `<dialog>` backdrop often fails to trigger synthetic click events outside the element box. A `touchend` handler is required.
  - **Defect 2 (Critical Bug)**: Neither the backdrop click listener nor the `closeModal` function calls `videoEl.pause()`. If a user opens a video and then taps the backdrop, the modal closes visually while the video continues to play and stream audio in the background!
  - **Fix**: Centralize modal closing into a single function that pauses the video, clears its `src`, and closes the dialog.

### 4.5 Modal Header Ellipsis Truncation
- **CSS Status**:
  - `styles/main.css` line 749:
    ```css
    .modal-header-fix { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 48px; }
    ```
  - `index.html` line 1535:
    `<h3 id="modal-video-title" class="modal-title modal-header-fix">System Video Preview</h3>`.
- **Flexbox Conflict**:
  - `styles/components.css` lines 785–791:
    ```css
    .modal-header {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--glass-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    ```
  - In CSS Flexbox, `.modal-header-fix` defaults to `min-width: auto`. Even with `overflow: hidden` and `text-overflow: ellipsis`, a flex item cannot shrink below its text content unless `min-width: 0;` (or `flex: 1; min-width: 0;`) is declared!
  - Without `min-width: 0;`, long titles on mobile screens push the close button off screen or force horizontal modal overflow.

---

## 5. Deep-Dive: Touch Navigation & Ghost Controls

### 5.1 Keyboard Shortcuts Visibility on Mobile
- **DOM Location**:
  - `index.html` lines 1520–1526:
    ```html
    <div class="presenter-keyboard-shortcuts">
      <span>Hotkeys:</span>
      <span><span class="kbd-badge">Space</span> Timer Play/Pause</span>
      <span><span class="kbd-badge">←</span> / <span class="kbd-badge">→</span> Prev/Next Section</span>
      <span><span class="kbd-badge">1-8</span> Jump Section</span>
      <span><span class="kbd-badge">Esc</span> Close HUD</span>
    </div>
    ```
- **CSS Location**:
  - `styles/components.css` lines 745–753:
    ```css
    .presenter-keyboard-shortcuts {
      padding: 1rem 1.5rem;
      border-top: 1px solid var(--glass-border);
      background: rgba(6, 11, 19, 0.9);
      font-size: 0.75rem;
      color: var(--color-text-muted);
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    ```
  - `.presenter-keyboard-shortcuts` is displayed unconditionally whenever the Presenter Drawer is opened on mobile devices.
  - Mobile touch users are presented with physical keyboard instructions (`Space`, `←`, `→`, `1-8`, `Esc`).

### 5.2 Hover / Pointer Media Query Implementation
- **CSS Status**:
  - `styles/main.css` lines 743–746:
    ```css
    .nav-cues { display: none; }
    @media (hover: hover) and (pointer: fine) { .nav-cues { display: block; } }
    .mobile-swipe-cues { display: block; }
    @media (hover: hover) and (pointer: fine) { .mobile-swipe-cues { display: none; } }
    ```
  - **Diagnostic Gap**: `.nav-cues` is **NOT applied to `.presenter-keyboard-shortcuts`** in `index.html`.
  - Neither `.presenter-keyboard-shortcuts` nor its children have class `nav-cues`.
  - Furthermore, `.mobile-swipe-cues` (intended to show "Swipe left/right to navigate sections" on touch screens) does not exist in the DOM.

### 5.3 Rover Atlas Map Controls in Project Atlas
- In `atlas_hero_update/index.html` line 169:
  `<div class="map-controls" aria-hidden="true"><span>↑ ↓ ← →</span> move <span>ENTER</span> open</div>`.
- In `atlas_hero_update/style.css` line 46:
  ```css
  @media(max-width:720px){
    .map-controls{right:12px;bottom:8px}
  }
  ```
  On mobile devices (`<= 720px`), `map-controls` is explicitly displayed in the bottom right corner of the rover map, showing arrow keys and Enter key prompts on touchscreens.

---

## 6. Proposed Code Changes & Implementation Blueprint

Below are the exact, concrete code changes required across HTML, CSS, and JS to resolve all identified issues.

### 6.1 HTML Markup Updates (`index.html`)

#### Fix A: Mark All Assets with Explicit `data-type`
Add `data-type="image"` to all `.pd-card-img` elements (lines 729, 755, 783, 804, 825, 846, 867, 888, 910):
```html
<!-- Before -->
<img src="assets/images/professional-development/sunherald-volunteer-thumb.png" alt="Sun Herald Feature Coverage" loading="lazy" class="pd-card-img">

<!-- After -->
<img src="assets/images/professional-development/sunherald-volunteer-thumb.png" alt="Sun Herald Feature Coverage" loading="lazy" class="pd-card-img" data-type="image">
```

Add `data-type="video"` and `data-src` to all `.preview-video-element` elements (lines 1135, 1167, 1199):
```html
<!-- Before -->
<video class="preview-video-element" poster="assets/previews/sanctum-v1-poster.png" preload="metadata" muted playsinline loop aria-label="CS646 Sanctum 3D World Video Preview">

<!-- After -->
<video class="preview-video-element" data-type="video" data-src="assets/previews/sanctum-v1-10s-720p.mp4" poster="assets/previews/sanctum-v1-poster.png" preload="metadata" muted playsinline loop aria-label="CS646 Sanctum 3D World Video Preview">
```

#### Fix B: Update Modal Header and Close Button
In `index.html` lines 1534–1537:
```html
<!-- Before -->
<div class="modal-header">
  <h3 id="modal-video-title" class="modal-title modal-header-fix">System Video Preview</h3>
  <button type="button" class="btn-close-drawer" id="btn-modal-close" aria-label="Close Video Preview Modal">&times;</button>
</div>

<!-- After -->
<div class="modal-header">
  <h3 id="modal-video-title" class="modal-title modal-header-fix">System Video Preview</h3>
  <button type="button" class="btn-close-drawer modal-close-btn" id="btn-modal-close" aria-label="Close Video Preview Modal">&times;</button>
</div>
```

#### Fix C: Wrap Presenter Keyboard Shortcuts with `.nav-cues` and Add `.mobile-swipe-cues`
In `index.html` lines 1520–1527:
```html
<!-- Before -->
<div class="presenter-keyboard-shortcuts">
  <span>Hotkeys:</span>
  <span><span class="kbd-badge">Space</span> Timer Play/Pause</span>
  <span><span class="kbd-badge">←</span> / <span class="kbd-badge">→</span> Prev/Next Section</span>
  <span><span class="kbd-badge">1-8</span> Jump Section</span>
  <span><span class="kbd-badge">Esc</span> Close HUD</span>
</div>

<!-- After -->
<div class="presenter-keyboard-shortcuts nav-cues">
  <span>Hotkeys:</span>
  <span><span class="kbd-badge">Space</span> Timer Play/Pause</span>
  <span><span class="kbd-badge">←</span> / <span class="kbd-badge">→</span> Prev/Next Section</span>
  <span><span class="kbd-badge">1-8</span> Jump Section</span>
  <span><span class="kbd-badge">Esc</span> Close HUD</span>
</div>
<div class="mobile-swipe-cues" style="padding: 0.75rem 1.5rem; font-size: 0.75rem; color: var(--color-text-muted); border-top: 1px solid var(--glass-border); background: rgba(6, 11, 19, 0.9);">
  <span>Touch Navigation: Swipe left/right or use section tabs to navigate</span>
</div>
```

---

### 6.2 CSS Updates (`styles/main.css` & `styles/components.css`)

#### In `styles/main.css`:
```css
/* Revamp Blueprint Specifications */
.accordion { border: 1px solid var(--color-circuit-gold); margin-bottom: 1rem; border-radius: 8px; overflow: hidden; }
.accordion-header { cursor: pointer; padding: 10px; background: rgba(0,0,0,0.2); }
.accordion-content { display: none; padding: 10px; }
.accordion.active .accordion-content { display: block; }

.carousel-container { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; white-space: nowrap; gap: 1rem; padding-bottom: 1rem; }
.carousel-container > * { scroll-snap-align: start; flex: 0 0 auto; white-space: normal; }

/* Sticky Window Canvas Pipeline */
.sticky-canvas-wrapper { height: 400dvh; position: relative; }
.sticky-canvas-inner { position: sticky; top: 0; height: 100dvh; z-index: 1; pointer-events: none; }
.interactive-card { pointer-events: auto; }

/* Touch Navigation vs Desktop Arrow Cues */
.nav-cues { display: none !important; }
@media (hover: hover) and (pointer: fine) { 
  .nav-cues { display: flex !important; } 
}
.mobile-swipe-cues { display: block !important; }
@media (hover: hover) and (pointer: fine) { 
  .mobile-swipe-cues { display: none !important; } 
}

/* Modal Close Button & Ellipsis Truncation */
.modal-close-btn, #btn-modal-close { 
  z-index: 9999 !important; 
  pointer-events: auto !important; 
  position: relative; 
}
.modal-header-fix { 
  flex: 1; 
  min-width: 0; 
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  padding-right: 16px; 
}
```

#### In `styles/components.css`:
Update `.modal-video-wrapper` to support dynamic image and video heights:
```css
.modal-video-wrapper {
  width: 100%;
  max-height: 80dvh;
  background: #000;
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-video-wrapper:has(#modal-video-element:not([style*="display: none"])) {
  aspect-ratio: 16 / 9;
}
```

---

### 6.3 JavaScript Updates (`js/app.js`)

In `initImageLightbox()`:
1. Update selector to include `.preview-video-element`.
2. Add both `click` and `touchend` handlers for backdrop.
3. Pause video upon closing.
4. Use `80dvh` for lightbox max-height.

```javascript
  initImageLightbox() {
    const clickableMedia = document.querySelectorAll(
      '.pd-card-img, .pd-preview-img, .preview-video-element, [data-type="image"], [data-type="video"]'
    );
    const modal = document.getElementById('video-modal');
    const modalTitle = document.getElementById('modal-video-title');
    const modalBody = document.querySelector('.modal-video-wrapper');
    const videoEl = document.getElementById('modal-video-element');
    const closeBtn = document.getElementById('btn-modal-close');

    if (!clickableMedia.length || !modal) return;

    const closeModal = (e) => {
      if (e) e.preventDefault();
      if (videoEl) {
        videoEl.pause();
        videoEl.removeAttribute('src');
        videoEl.load();
      }
      if (typeof modal.close === 'function') modal.close();
      else modal.removeAttribute('open');
    };

    // Backdrop click and touch dismiss
    const handleBackdropDismiss = (e) => {
      const dialogDimensions = modal.getBoundingClientRect();
      const clientX = e.clientX || (e.changedTouches && e.changedTouches[0] && e.changedTouches[0].clientX);
      const clientY = e.clientY || (e.changedTouches && e.changedTouches[0] && e.changedTouches[0].clientY);
      if (clientX === undefined || clientY === undefined) return;

      if (
        clientX < dialogDimensions.left ||
        clientX > dialogDimensions.right ||
        clientY < dialogDimensions.top ||
        clientY > dialogDimensions.bottom
      ) {
        closeModal(e);
      }
    };

    modal.addEventListener('click', handleBackdropDismiss);
    modal.addEventListener('touchend', handleBackdropDismiss);

    if (closeBtn) {
      closeBtn.style.zIndex = '9999';
      closeBtn.style.pointerEvents = 'auto';
      closeBtn.addEventListener('click', closeModal);
      closeBtn.addEventListener('touchend', closeModal);
    }

    clickableMedia.forEach(media => {
      if (media.closest('a.pd-image-link')) return;

      const triggerHandler = (e) => {
        e.preventDefault();
        const type = media.getAttribute('data-type') || (media.tagName === 'VIDEO' ? 'video' : 'image');
        let src = media.getAttribute('data-src') || media.getAttribute('src');
        if (!src && media.tagName === 'VIDEO') {
          const firstSource = media.querySelector('source');
          if (firstSource) src = firstSource.getAttribute('src') || firstSource.getAttribute('data-src');
        }
        const alt = media.getAttribute('alt') || media.getAttribute('aria-label') || 'Asset Preview';

        if (modalTitle) modalTitle.textContent = alt;

        if (modalBody) {
          let lightboxImg = document.getElementById('lightbox-img-element');
          if (!lightboxImg) {
            lightboxImg = document.createElement('img');
            lightboxImg.id = 'lightbox-img-element';
            lightboxImg.style.maxWidth = '100%';
            lightboxImg.style.maxHeight = '80dvh';
            lightboxImg.style.objectFit = 'contain';
            lightboxImg.style.borderRadius = '8px';
            modalBody.appendChild(lightboxImg);
          }

          if (type === 'video') {
            if (lightboxImg) lightboxImg.style.display = 'none';
            if (videoEl) {
              videoEl.style.display = 'block';
              videoEl.src = src || '';
              videoEl.play().catch(() => {});
            }
          } else {
            if (videoEl) {
              videoEl.style.display = 'none';
              videoEl.pause();
            }
            if (lightboxImg) {
              lightboxImg.src = src || '';
              lightboxImg.alt = alt;
              lightboxImg.style.display = 'block';
            }
          }
        }

        if (typeof modal.showModal === 'function') {
          modal.showModal();
        } else {
          modal.setAttribute('open', 'true');
        }
      };

      media.addEventListener('click', triggerHandler);
    });
  }
```

---

## 7. Synchronization with Production Build Pipeline

After applying the changes to `/index.html`, `/styles/main.css`, `/styles/components.css`, and `/js/app.js`, the production builder MUST be executed:
```bash
node tools/build.js
```
This updates `/dist/public/` and `/dist/private/`, ensuring full parity across local and deployed environments.
