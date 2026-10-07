# Worker Iteration 2 Brief: Audio Teardown & Tabstop Fixes

## Mission
Implement the targeted remediations required by Challenger 1 and Reviewer 2 in Andrew Strachan's Career Portfolio (`/Users/andrewstrachan/career_portfolio`).

## Required Fixes
1. **Critical Video Audio Leak on Escape Key (`js/app.js`)**:
   - In `js/app.js` (around line 572 in `initImageLightbox`), add a listener for the native `'close'` event on `modal`:
     ```javascript
     modal.addEventListener('close', () => {
       if (videoEl) {
         videoEl.pause();
         videoEl.removeAttribute('src');
         videoEl.load();
       }
     });
     ```
   - In `js/app.js:323-327` (`initKeyboardNavigation`), ensure that pressing Escape triggers proper modal video pause and teardown.

2. **Redundant Accordion Tabstops (`index.html`)**:
   - In `index.html` (lines 152, 175, 198, 221), remove `tabindex="0"` from the outer `<div class="accordion glass-card">` containers. Only the inner interactive `<div class="accordion-header" role="button" ... tabindex="0">` should be keyboard-focusable.

3. **Fallback Speaker Notes Cleanup (`js/app.js`)**:
   - In `js/app.js:43`, replace `'KY Derby, Jump$tart'` with `'National Jump$tart Financial Literacy Conference (Louisville, KY)'`.

4. **Tier 2 Boundary Test Property Names (`tests/tier2-boundaries/b05-provenance-boundary.test.js`)**:
   - Update `provData.claims` to `provData.provenanceEntries` (line 25).
   - Update `provData.scorecard` to `provData.rubricScorecard` (line 45).

5. **Rebuild & Verify**:
   - Run `node tools/build.js`
   - Run `node tests/runner.js`
   - Run `node tests/verify-mobile-interactions.js` (must pass 17/17 tests with 0 failures!)
   - Run `node tools/check-links.js`
   - Run `node tools/check-privacy.js`

Write your handoff report to:
`/Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_iteration_2/handoff.md`
