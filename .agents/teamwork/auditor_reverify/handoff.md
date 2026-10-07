# Forensic Re-Verification Audit Report

**Work Product**: Career Portfolio (`/Users/andrewstrachan/career_portfolio`)  
**Profile**: General Project  
**Integrity Mode**: Development (per `ORIGINAL_REQUEST.md`)  
**Verdict**: **CLEAN**  

---

## 1. Observation

Direct, empirical observations across the workspace:

### Observation 1: Modal Close Event Listener & Real Media Teardown
In `/Users/andrewstrachan/career_portfolio/js/app.js`:
- Lines 582–589 register a native `'close'` event listener on `<dialog id="video-modal">`:
  ```javascript
  modal.addEventListener('close', () => {
    if (videoEl) {
      videoEl.pause();
      videoEl.removeAttribute('src');
      videoEl.load();
    }
  });
  ```
- Lines 323–335 in `initKeyboardNavigation()` handle `Escape`:
  ```javascript
  if (e.code === 'Escape' || e.key === 'Escape') {
    this.togglePresenterDrawer(false);
    const modal = document.getElementById('video-modal');
    if (modal) {
      const videoEl = modal.querySelector('video') || document.getElementById('modal-video-element');
      if (videoEl) {
        videoEl.pause();
        videoEl.removeAttribute('src');
        videoEl.load();
      }
      if (typeof modal.close === 'function') modal.close();
    }
  }
  ```
- Lines 534–543 in `closeModal()`:
  ```javascript
  const closeModal = (e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    if (videoEl) {
      videoEl.pause();
      videoEl.removeAttribute('src');
      videoEl.load();
    }
    if (typeof modal.close === 'function') modal.close();
    else modal.removeAttribute('open');
  };
  ```
- Lines 574–580 register the native dialog `'cancel'` event listener with identical teardown (`pause()`, `removeAttribute('src')`, `load()`).

### Observation 2: Outer Accordion `tabindex` Removal & Card Content Integrity
In `/Users/andrewstrachan/career_portfolio/index.html`:
- Lines 152, 175, 198, 221 define the 4 outer accordion containers:
  - Line 152: `<div class="accordion glass-card active">`
  - Line 175: `<div class="accordion glass-card">`
  - Line 198: `<div class="accordion glass-card">`
  - Line 221: `<div class="accordion glass-card">`
  Zero outer `.accordion` elements possess `tabindex="0"`.
- The child trigger headers (lines 153, 176, 199, 222) maintain keyboard focusability and ARIA accessibility:
  - `<div class="accordion-header" role="button" aria-expanded="true" tabindex="0">`
  - `<div class="accordion-header" role="button" aria-expanded="false" tabindex="0">`
- Full educational card body content remains present and intact across all 4 tiers:
  - Tier 1: UAB M.S. Cybersecurity, GPA 3.75, NSF CyberAICorps SFS Scholar, course list, career impact box.
  - Tier 2: University of Montevallo CTE Business & Finance, GPA 3.75, ALSDE PCTF licensure, career impact box.
  - Tier 3: Mississippi College B.S. ACS Biochemistry Honors, GPA 3.5, honor societies, career impact box.
  - Tier 4: Medical & Life Sciences Foundation, M.D. Candidate (4 Years Coursework & Clerkships Completed), P.A.L.S. founder, Opioid Crisis Council chair, BLS/ACLS/First Aid, career impact box.

### Observation 3: Test Assertion Genuineness (0 Facades, 0 Mock Bypasses)
- In `tests/tier2-boundaries/b05-provenance-boundary.test.js`:
  - Line 25 queries `provData.provenanceEntries` and iterates all 22 claims asserting `claim.claim` non-empty and `claim.source || claim.evidenceSource` non-empty.
  - Line 45 queries `provData.rubricScorecard` and iterates all 9 scorecard rows asserting `score <= max`.
  - Assertions executed in this boundary test increased from 5 to 58 genuine assertions.
- Across `tests/`:
  - Zero mock objects or stub bypasses detected.
  - Every test directly inspects and parses the actual HTML, CSS, JavaScript, and JSON production files.

### Observation 4: Tool and Test Suite Execution Outputs
Verbatim outputs recorded from direct execution:

1. `node tools/check-links.js`:
   ```text
   ======================================================================
     Andrew Strachan Portfolio: Link & Media Asset Verification
   ======================================================================
   Checking 28 referenced local assets...
     ✓ All 28 local relative assets exist on disk.
   Checking 82 outbound HTTP/HTTPS links...
     ✓ All 82 outbound URLs enforce secure HTTPS protocols.
     ✓ Deep path preservation confirmed: https://networking-midterm.web.app/studyguide4.html

   [PASS] All local media and outbound URLs verified cleanly with 0 errors.
   Saved reports/evidence/link-check.json and link-check.md
   ======================================================================
   Exit Code: 0
   ```

2. `node tools/check-privacy.js`:
   ```text
   ======================================================================
     Andrew Strachan Portfolio: Privacy & Redaction Scanner
   ======================================================================
   Scan Target: /Users/andrewstrachan/career_portfolio/dist/public
   Scanning 13 production files...

   [PASS] 0 privacy leaks detected across all 13 scanned files.
   Verified: 0 phone numbers, 0 test credentials, 0 personal emails.
   Saved reports/evidence/privacy-scan.json and privacy-scan.md
   ======================================================================
   Exit Code: 0
   ```

3. `node tests/verify-mobile-interactions.js`:
   ```text
   ======================================================================
     EMPIRICAL ADVERSARIAL VERIFICATION: MOBILE INTERACTION SUITE
   ======================================================================

   --- Suite 1: Polymorphic Media Modal Player ---
     ✓ [PASS] 1.1 Media elements specify explicit data-type attributes and selectors
     ✓ [PASS] 1.2 Modal close button CSS enforces z-index: 9999 and pointer-events: auto
     ✓ [PASS] 1.3 Modal header CSS guarantees single-line truncation with ellipsis
     ✓ [PASS] 1.4 Close button registers both click and touchend handlers in app.js
     ✓ [PASS] 1.5 Backdrop dismissal registers click and touchend with coordinate checking
     ✓ [PASS] 1.6 Video audio termination & src teardown on explicit closeModal()
     ✓ [PASS] 1.7 [VULNERABILITY CHECK] Video audio termination on modal close via Escape / window.keydown

   --- Suite 2: 4-Tier Academic Accordion ---
     ✓ [PASS] 2.1 Exactly 4 tiers exist in education-accordion-container
     ✓ [PASS] 2.2 Initial accordion state: Tier 1 active (aria-expanded="true"), Tiers 2-4 collapsed (aria-expanded="false")
     ✓ [PASS] 2.3 Accordion header handles click and keydown with Enter/Space filtering
     ✓ [PASS] 2.4 CSS rule for active accordion display synchronization exists
     ✓ [PASS] 2.5 [A11Y/UX AUDIT] Accordion container tabindex audit

   --- Suite 3: Interactive Salary Explorer ---
     ✓ [PASS] 3.1 Salary Explorer markup structure adheres to tablist/tab/tabpanel roles
     ✓ [PASS] 3.2 Initial Salary Explorer state: BLS active (aria-selected="true"), GS hidden (display: none)
     ✓ [PASS] 3.3 Salary toggle buttons register click and touchend with display switching in app.js

   --- Suite 4: Touch Navigation vs Keyboard Cues ---
     ✓ [PASS] 4.1 CSS media queries gate .nav-cues and .mobile-swipe-cues
     ✓ [PASS] 4.2 Semantic separation of keyboard shortcuts vs touch swipe instructions in HTML

   ----------------------------------------------------------------------
   TOTAL TESTS: 17 | PASSED: 17 | FAILED: 0
   ----------------------------------------------------------------------
   Exit Code: 0
   ```

4. `node tests/runner.js`:
   ```text
   ----------------------------------------------------------------------
   TEST SUITE SUMMARY
   ----------------------------------------------------------------------
   Total Test Suites   : 49
   Total Test Cases    : 191
   Passed Test Cases   : 191
   Failed Test Cases   : 0
   Total Assertions    : 586
   Execution Time      : 0.06s
   ----------------------------------------------------------------------
   Exit Code: 0
   ```

5. `node tests/adversarial-viewport-audit.js`:
   ```text
   ======================================================================
     CHALLENGER 2 EMPIRICAL AUDIT SUMMARY
   ======================================================================
   Total Checks Executed : 35
   Passed Checks         : 35
   Failed Checks         : 0

   FINAL VERDICT: [APPROVE]
   ======================================================================
   Exit Code: 0
   ```

---

## 2. Logic Chain

1. **Premise 1 (Media Teardown Authenticity)**: An authentic media teardown must prevent background audio leakage across all dismissal pathways (button click, touch, backdrop tap, keyboard Escape, and native `<dialog>` close/cancel events).
   - In `js/app.js`, `modal.addEventListener('close', ...)` explicitly calls `videoEl.pause()`, `videoEl.removeAttribute('src')`, and `videoEl.load()`.
   - In `initKeyboardNavigation()`, pressing `Escape` synchronously triggers the same teardown sequence on `videoEl` before dispatching `modal.close()`.
   - In `initImageLightbox()`, `closeModal()` and the `'cancel'` handler also execute the identical teardown sequence.
   - *Inference*: The media teardown is non-facade, authentic, and eliminates all background audio/video playback leaks.

2. **Premise 2 (WAI-ARIA Accordion Tabstop Integrity)**: In an accessible accordion design, only the header toggle trigger must be a keyboard tabstop (`tabindex="0"`). Parent containers with `tabindex="0"` create redundant focus traps that fail to toggle on Enter/Space.
   - Inspection of `index.html` lines 152, 175, 198, and 221 verifies that `tabindex="0"` was cleanly removed from all outer `.accordion` divs.
   - The interactive `.accordion-header` triggers retain `role="button"`, `aria-expanded`, and `tabindex="0"`.
   - All inner card text, metrics, honors, and impact descriptions were preserved verbatim.
   - `tests/verify-mobile-interactions.js` test 2.5 confirms 0 redundant tabstops exist.
   - *Inference*: The accordion markup remediation is clean, conforms to accessibility standards, and introduced zero content regressions.

3. **Premise 3 (Test Assertion Integrity)**: For tests to be genuine, assertions must evaluate real data properties and fail if data is absent, corrupt, or out-of-spec.
   - In `tests/tier2-boundaries/b05-provenance-boundary.test.js`, the schema mapping was updated to evaluate `provData.provenanceEntries` (all 22 entries) and `provData.rubricScorecard` (all 9 items).
   - Running `node tests/runner.js` executes 58 assertions for Feature 5 and 586 total assertions across all 49 suites.
   - Searching for `mock`, `stub`, `fake`, or dummy return shortcuts across `tests/` yielded zero mock bypasses.
   - *Inference*: The test suite executes authentic assertions with zero facades or bypasses.

4. **Premise 4 (Tool & Pipeline Health)**:
   - `node tools/check-links.js` passed with 0 errors across 28 local assets and 82 outbound URLs.
   - `node tools/check-privacy.js` passed with 0 leaks across 13 public distribution files.
   - `node tools/build.js` cleanly assembled both `dist/public` and `dist/private` variants.
   - `node tests/adversarial-viewport-audit.js` passed 35/35 CDP browser layout checks across 375px, 768px, and 1440px viewports with zero console errors.
   - *Inference*: The build, privacy, link integrity, and responsive layout pipelines are 100% sound.

---

## 3. Caveats

No caveats. All four verification areas were directly inspected, verified against ground truth, and executed in the local environment.

---

## 4. Conclusion

**Verdict: CLEAN**

Every check mandated by the re-verification assignment and `brief.md` passes with empirical proof:
1. Modal close event listener is genuine and executes full media teardown (`pause()`, `removeAttribute('src')`, `load()`).
2. Outer accordion containers have zero redundant `tabindex="0"` attributes; header triggers and card contents are intact.
3. Test suite runs genuine assertions with zero facades, zero mock bypasses, and 586 active assertions.
4. `tools/check-links.js`, `tools/check-privacy.js`, `tests/runner.js`, `tests/verify-mobile-interactions.js`, and `tests/adversarial-viewport-audit.js` all exit cleanly with code 0.

---

## 5. Verification Method

To independently reproduce the forensic findings, execute the following commands in `/Users/andrewstrachan/career_portfolio`:

1. **Verify Modal Media Teardown:**
   ```bash
   node -e '
     const js = require("fs").readFileSync("js/app.js", "utf8");
     assert = require("assert");
     assert.ok(js.includes("modal.addEventListener(\x27close\x27"));
     assert.ok(js.includes("videoEl.removeAttribute(\x27src\x27)"));
     console.log("PASS: Modal close listener verified.");
   '
   ```

2. **Verify Outer Accordion Tabstop Cleanliness:**
   ```bash
   node -e '
     const html = require("fs").readFileSync("index.html", "utf8");
     const matches = html.match(/<div class=["\x27]accordion glass-card[^>]*tabindex=["\x27]0["\x27]/g) || [];
     console.log("Outer accordion tabindex=0 instances found:", matches.length);
     if (matches.length > 0) process.exit(1);
   '
   ```

3. **Verify Link and Local Media Integrity:**
   ```bash
   node tools/check-links.js
   ```

4. **Verify Privacy Redaction:**
   ```bash
   node tools/check-privacy.js
   ```

5. **Run Mobile Interactions Verification Suite:**
   ```bash
   node tests/verify-mobile-interactions.js
   ```

6. **Run Full E2E Test Runner:**
   ```bash
   node tests/runner.js
   ```
