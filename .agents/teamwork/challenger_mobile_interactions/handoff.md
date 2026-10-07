# Challenger 1 Handoff Report: Mobile Interactions & Stress Testing

**Verdict:** `REQUEST_CHANGES`

---

## 1. Observation

### Empirical Test Execution & Results
1. **Automated Verification Harness Execution**:
   - Command: `node tests/verify-mobile-interactions.js`
   - Output:
     ```text
     TOTAL TESTS: 17 | PASSED: 16 | FAILED: 1
     CRITICAL DEFECTS IDENTIFIED:
       - 1.7 [VULNERABILITY CHECK] Video audio termination on modal close via Escape / window.keydown:
         CRITICAL LEAK: Modal does NOT listen to "close" event. In initKeyboardNavigation(),
         Escape calls modal.close() directly, which does NOT fire "cancel".
         Video audio continues playing in background when closed via window Escape key!
     SECONDARY FINDINGS:
       - [A11Y_REDUNDANT_TABSTOP] Found 4 outer .accordion divs with tabindex="0".
         Keyboard users encounter duplicate tabstops where Enter/Space does not activate toggle.
     ```

2. **Live Browser Runtime Reproduction in Google Chrome (Mobile Emulation: 375x667x2, touch)**:
   - Evaluated video modal opening followed by Escape key dispatch on `window`:
     ```javascript
     // js/app.js:323-327
     if (e.code === 'Escape' || e.key === 'Escape') {
       this.togglePresenterDrawer(false);
       const modal = document.getElementById('video-modal');
       if (modal && typeof modal.close === 'function') modal.close();
     }
     ```
   - Chrome evaluation result:
     ```json
     {
       "opened": true,
       "closed": true,
       "isPaused": false,
       "srcAfterEscape": "assets/previews/sanctum-v1-10s-720p.mp4"
     }
     ```
   - `videoEl.paused` evaluated to `false`, and `videoEl.getAttribute('src')` remained `"assets/previews/sanctum-v1-10s-720p.mp4"`.

3. **Polymorphic Modal Media Type Triggering**:
   - In `index.html`, 12 media elements were audited:
     - 6 image previews (DECA Anaheim, ALACTE, ALSDE, Jump$tart, UMMC, MaQkRs Command Center) carry `data-type="image"`.
     - 3 video previews (`.preview-video-element` for Sanctum, MaqkrsTutor2, AdaptiveHS) carry `data-type="video"`.
     - 3 external media links (Sun Herald line 1024, WLOX line 1042, NonArtificial SI line 1133) are wrapped in `<a class="pd-image-link">`.
   - In `js/app.js:575`:
     ```javascript
     if (media.closest('a.pd-image-link')) return;
     ```
     Clicking external media feature cards bypasses the modal and follows the URL, which matches the media feature card specification.
   - For image previews, clicking opens `<dialog id="video-modal">`, creates/shows `<img id="lightbox-img-element">`, hides `#modal-video-element`, and sets `src` to the image thumbnail.
   - For video previews, clicking opens `#video-modal`, displays `#modal-video-element`, hides `#lightbox-img-element`, and starts playback.
   - Close button response:
     - `closeBtn.style.zIndex` computes to `9999`.
     - `closeBtn.style.pointerEvents` computes to `auto`.
     - Both `click` and `touchend` events invoke `closeModal()`, closing the modal and pausing/removing `src`.
   - Backdrop dismissal:
     - Clicks outside dialog bounds (`dialogDimensions.left/right/top/bottom`) close the modal via `closeModal()`.
     - Touches outside dialog bounds (`changedTouches[0]`) close the modal via `closeModal()`.
     - Clicks and touches inside modal content preserve the open dialog state.
   - Header truncation on narrow screens:
     - Tested with 3400-character test title under 375px viewport.
     - Title computed styles: `white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0px; flex: 1;`.
     - `modalTitle.scrollWidth` (3475px) vs `modalTitle.clientWidth` (241px): clean truncation with ellipsis.
     - Close button bounding box: width 14px, height 24px, completely visible and clickable at `x: 369.7px, y: 315.5px`.

4. **4-Tier Academic Accordion**:
   - `index.html` lines 149–243: 4 tiers exist (UAB, Montevallo, Mississippi College, Medical & Life Sciences Foundation).
   - Initial state: Tier 1 active (`.accordion.active`, `aria-expanded="true"`, `contentDisplay: "block"`), Tiers 2–4 inactive (`aria-expanded="false"`, `contentDisplay: "none"`).
   - Touch toggling: `header.click()` toggles `.active`, `aria-expanded`, and CSS `display: block / none`.
   - Keyboard interaction:
     - Enter keydown toggles accordion and calls `preventDefault()`.
     - Space keydown (' ' and 'Spacebar') toggles accordion and calls `preventDefault()`.
     - Tab and Arrow keys do not toggle accordion.
   - State synchronization: 50 multi-tier randomized cycles yielded 0 desynchronizations.
   - Accessibility tabstop defect:
     - `index.html` lines 152, 175, 198, 221 define `<div class="accordion glass-card" tabindex="0">`.
     - `index.html` lines 153, 176, 199, 222 define `<div class="accordion-header" role="button" aria-expanded="..." tabindex="0">`.
     - Tabbing focuses on the parent `<div class="accordion">` first, where pressing Enter/Space does nothing because the event listener in `js/app.js:495` is bound exclusively to `.accordion-header`.

5. **Salary Explorer**:
   - `index.html` lines 692–700: `#salary-explorer-toggle` with `role="tablist"`, containing `[data-mode="bls"]` and `[data-mode="gs"]` with `role="tab"`, `aria-selected`, and `aria-controls`.
   - Initial state: BLS `aria-selected="true"`, GS `aria-selected="false"`, `#salary-pane-bls` displayed (`block`), `#salary-pane-gs` hidden (`none`).
   - Toggling: Clicking/touchend on `[data-mode="gs"]` flips GS to `aria-selected="true"`, BLS to `aria-selected="false"`, sets `#salary-pane-bls` to `display: none`, and `#salary-pane-gs` to `display: block`.
   - Stress test: 100 alternating rapid clicks and touchend events yielded 0 desynchronizations.

6. **Touch Navigation vs Keyboard Cues**:
   - Under touch emulation (`375x667x2`, `hover: none`, `pointer: coarse`):
     - `window.matchMedia('(hover: hover)').matches === false`
     - `.nav-cues` computed style: `display: none`
     - `.mobile-swipe-cues` computed style: `display: flex`
   - Under desktop emulation (`1440x900`, `hover: hover`, `pointer: fine`):
     - `window.matchMedia('(hover: hover)').matches === true`
     - `.nav-cues` computed style: `display: flex`
     - `.mobile-swipe-cues` computed style: `display: none`

---

## 2. Logic Chain

1. **Premise**: Brief §1 requires: *"Verify that closing a playing video completely pauses audio/video and cleans up src to prevent background leaks."*
2. **Observation**: When a video is playing in `#video-modal`, closing via the close button or backdrop calls `closeModal()`, which properly calls `videoEl.pause(); videoEl.removeAttribute('src'); videoEl.load();`.
3. **Observation**: However, `js/app.js:323-327` provides a global keyboard listener:
   ```javascript
   if (e.code === 'Escape' || e.key === 'Escape') {
     this.togglePresenterDrawer(false);
     const modal = document.getElementById('video-modal');
     if (modal && typeof modal.close === 'function') modal.close();
   }
   ```
4. **Observation**: In the HTML Living Standard, programmatically invoking `dialog.close()` emits the `'close'` event on the `<dialog>` element; it does **not** emit the `'cancel'` event.
5. **Observation**: In `js/app.js:566-572`, the developer registered a listener on `'cancel'` only:
   ```javascript
   modal.addEventListener('cancel', () => {
     if (videoEl) {
       videoEl.pause();
       videoEl.removeAttribute('src');
       videoEl.load();
     }
   });
   ```
   There is no listener registered on `'close'`.
6. **Empirical Verification**: Triggering Escape while focus is on the document/window closes the modal visually via `modal.close()`, but because `'cancel'` does not fire and no `'close'` handler exists, `videoEl.paused` remains `false` and `videoEl.src` remains intact. The audio continues playing in the background while the modal is closed and invisible to the user.
7. **Conclusion**: This is a reproducible media leak bug that violates Brief §1.

---

## 3. Caveats

- Outbound media cards (Sun Herald, WLOX, NonArtificial SI) are deliberately designed as anchor links (`<a class="pd-image-link">`) navigating to external sources rather than opening the media modal. This behavior aligns with the requirements of Frame 11.
- In desktop browsers with a mouse, keyboard cues display properly; in mobile touch environments, they are reliably hidden while swipe indicators are shown.

---

## 4. Conclusion

**Verdict:** `REQUEST_CHANGES`

### Required Corrections:
1. **Fix Critical Video Audio Leak on Modal Close**:
   In `js/app.js` (around line 572), add a listener for the native `'close'` event on the modal dialog:
   ```javascript
   modal.addEventListener('close', () => {
     if (videoEl) {
       videoEl.pause();
       videoEl.removeAttribute('src');
       videoEl.load();
     }
   });
   ```
   And/or update `js/app.js:326` in `initKeyboardNavigation` to call `closeModal()` or dispatch `cancel`/`close` with media teardown.

2. **Fix Redundant Accordion Tabstops (Accessibility / UX)**:
   In `index.html` (lines 152, 175, 198, 221), remove `tabindex="0"` from the outer `<div class="accordion glass-card">` containers. Only the interactive inner `<div class="accordion-header" role="button" tabindex="0">` should be keyboard-focusable.

---

## 5. Verification Method

To independently reproduce and verify:
1. Run the empirical verification suite:
   ```bash
   node tests/verify-mobile-interactions.js
   ```
2. Verify test `1.7 [VULNERABILITY CHECK]` fails with the exact leak trace.
3. In Google Chrome DevTools / Console:
   - Click any video preview element (`.preview-video-element`).
   - Run `window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }));`.
   - Inspect `document.getElementById('modal-video-element').paused` -> returns `false`.
   - Inspect `document.getElementById('modal-video-element').getAttribute('src')` -> returns non-null video path.
