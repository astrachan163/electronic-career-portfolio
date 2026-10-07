## 2026-10-06T16:25:40Z
You are m1_worker_2, a teamwork_preview_worker tasked with resolving the remaining 17 test failures in `tests/runner.js` and addressing M1 reviewer feedback for Andrew Strachan's Electronic Career Portfolio.

Your working directory is:
/Users/andrewstrachan/career_portfolio/.agents/teamwork/m1_worker_2

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor independently verifies all work. Integrity violations WILL be detected and your work WILL be rejected.

MANDATORY INSTRUCTIONS:
1. First read the authoritative user request at:
/Users/andrewstrachan/career_portfolio/.agents/teamwork/ORIGINAL_REQUEST.md
2. Read the project specification at:
/Users/andrewstrachan/career_portfolio/.agents/teamwork/orchestrator_main/PROJECT.md
3. Read the reviewer reports:
- /Users/andrewstrachan/career_portfolio/.agents/teamwork/m1_reviewer_1/handoff.md
- /Users/andrewstrachan/career_portfolio/.agents/teamwork/m1_reviewer_2/handoff.md

YOUR 5 SPECIFIC IMPLEMENTATION TASKS:

Task 1: Presenter Contract & Config Modules
- Create `career_portfolio/js/presenter.js`:
  Must implement and export the `PresenterState` contract:
  ```javascript
  const PresenterState = {
    active: false,
    currentSection: 'hero',
    elapsedSeconds: 0,
    maxSeconds: 420,
    notes: {
      hero: "Welcome judges...",
      resume: "17 STAR accomplishments...",
      career: "BLS SOC 15-1212 $120,360...",
      education: "UAB M.S. Cyber 3.75 GPA...",
      enhancement: "51-position federal tracker...",
      skills: "Credly MCE badge, 30 certs...",
      projects: "4 highlight video cards...",
      sources: "FBLA 100-Point Rating Sheet..."
    }
  };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PresenterState };
  }
  if (typeof window !== 'undefined') {
    window.PresenterState = PresenterState;
  }
  ```
  Also provide presenter management functions (startTimer, stopTimer, toggleTimer, setSection, formatTime).
- Create `career_portfolio/js/config.js`:
  Re-export `PortfolioConfig` (compatible with `data/config.js` and expected by Tier 2 and Tier 4 tests).
- Update `index.html`:
  Load `<script src="js/presenter.js"></script>` and `<script src="js/config.js"></script>` before `js/app.js`.
  Update HUD hotkey badge in `index.html` line 1350 to indicate `1-8 Jump Section` (or match actual sections).

Task 2: Print Stylesheet Corrections
- In `career_portfolio/styles/print.css`:
  - Allow video poster frames to render on print sheets (do NOT suppress `.video-player-container video` entirely; ensure poster frames or fallback images are visible in print).
  - Add `.skill-item-pill { display: flex !important; }` so that skills hidden by interactive filtering unhide on printout.

Task 3: Dual-Variant Build Script (`tools/build.js`)
- Implement `career_portfolio/tools/build.js`:
  Must support `--variant=public` and `--variant=private` (default builds both):
  - Copies production web tree (`index.html`, `js/`, `styles/`, `assets/`, `data/`) into `dist/public/` and `dist/private/`.
  - In `dist/public/`:
    * Sanitizes personal phone numbers (`228-224-7445`), passwords/test logins (`z@z.com`, `zzzzzz`), and unwhitelisted emails.
    * Sets `isPublic: true` in config.
    * Uses public placeholder/poster for restricted demo clips (e.g. GHS).
  - In `dist/private/`:
    * Retains full credentials and private demo links for authorized evaluation.
    * Sets `isPublic: false` in config.
  - Exits with code 0 on successful build.

Task 4: Quality & Verification Scripts
- Implement `career_portfolio/tools/check-privacy.js`:
  - Scans `dist/public/` (or target directory specified via argv) for phone numbers (`\b\d{3}[-.]?\d{3}[-.]?\d{4}\b`), passwords (`zzzzzz`, `z@z.com`), or personal leaks.
  - Exits with code 0 if 0 leaks found; exits 1 with details if leaks exist.
- Implement `career_portfolio/tools/check-links.js`:
  - Scans `index.html` and `data/` for local asset links and external HTTP/HTTPS links.
  - Exits 0 on verification.
- Update `tests/tier1-features/f13-privacy-security.test.js`:
  - Ensure the privacy test only scans `dist/public` (or excludes unrelated directories like `atlas_hero_update` / `atlas_live_backup`).
- In `tests/tier2-boundaries/b06-career-education-boundary.test.js`:
  - Fix missing import: add `assertLessThanOrEqual` to the require destructuring from `../helpers/assertions`.

Task 5: Verification & Test Execution
- Run `node tools/build.js` to populate `dist/public/` and `dist/private/`.
- Run `node tools/check-privacy.js dist/public`.
- Run `node tests/runner.js`.
- Verify that tests pass cleanly (strive for 100% pass across all 4 tiers).

Output your full report with command outputs to:
`/Users/andrewstrachan/career_portfolio/.agents/teamwork/m1_worker_2/handoff.md`
And notify the orchestrator via send_message when complete.
