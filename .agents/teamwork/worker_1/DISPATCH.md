# Dispatch Instructions for Worker 1: Removal & Evidence Enhancement

## Identity
- Archetype: teamwork_preview_worker
- Working directory: /Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_1
- Project root: /Users/andrewstrachan/career_portfolio
- Authoritative user request: /Users/andrewstrachan/career_portfolio/.agents/teamwork/ORIGINAL_REQUEST.md
- Orchestrator conversation ID: 85d0ef6b-76b7-4f3a-902f-4a796a5a971e

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Objective
Execute Step 2 of the Execution Plan:
1. **Completely Remove ProctorU**:
   - The user stated: "The agent added informational assumptions on screenshots from troubleshooting after a midterm and all references to ProctorU need to be removed with the resulting additions being bolstered with evidence, cropped for the relevent or purposeful inclusion (like play button over video/article thumbnail to bring the eye to the linked content)"
   - Delete Item 10 ("ProctorU High-Assurance Remote Examination Verification Audits") and all `.pd-proctor-strip` markup, styles, and text from `index.html`.
   - Remove all ProctorU references in `js/app.js`, `js/presenter.js`, `README.md`, `tests/` suites (e.g. `tests/f07-educational-enhancement.test.js` or any others), and tools/scripts.
   - Remove or clean up unused troubleshooting screenshots (`proctoru-session-audit-*.png` or similar) in `assets/` and `dist/public/assets/`.
2. **Bolster Authentic Professional Development Evidence**:
   - For authentic Professional Development entries (GiveGab volunteering with Sun Herald link, Opioid Crisis Council at UMMC / Harrison County Emergency Youth Shelter with WLOX link, DECA Anaheim, UMMC ASB, ALACTE, ALSDE, KY Derby, Jump$tart):
     * Purposefully crop thumbnails as needed to highlight relevant document/article/presentation content.
     * Add purposeful visual indicators over thumbnails (e.g. a high-visibility video play button icon or news article badge/overlay) to immediately draw the eye to the linked external content.
     * Ensure the cards look clean, compelling, and clearly convey authentic achievements and evidence.
3. **Tests, Privacy & Build**:
   - Run `node tests/runner.js` and ensure all tests pass (100% passing).
   - Run `node tools/check-privacy.js` and ensure 0 privacy leaks.
   - Rebuild `dist/` (e.g. `node tools/build.js` or whatever build script the project uses).
   - Document all changes and verification outputs in `/Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_1/handoff.md`.


## 2026-10-06T22:27:01Z
You are Worker 1 (Removal & Evidence Enhancement Worker).
Your working directory is: /Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_1
Project root is: /Users/andrewstrachan/career_portfolio
Read your dispatch instructions at: /Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_1/DISPATCH.md
Read the authoritative user request at: /Users/andrewstrachan/career_portfolio/.agents/teamwork/ORIGINAL_REQUEST.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your objective:
1. Completely remove all ProctorU references, Item 10, .pd-proctor-strip markup, styles, scripts, tests, assets, and documentation across the codebase (index.html, styles/, js/, README.md, tests/, tools/).
2. Bolster authentic Professional Development evidence entries (GiveGab volunteering with Sun Herald link, Opioid Crisis Council at UMMC / Harrison County Emergency Youth Shelter with WLOX link, DECA Anaheim, UMMC ASB, ALACTE, ALSDE, KY Derby, Jump$tart):
   - Crop thumbnails purposefully for relevant inclusion.
   - Add purposeful visual indicators over thumbnails (e.g. video play button icon or article badge overlay) to draw the eye directly to the linked external content.
3. Run tests (`node tests/runner.js`), verify 100% pass rate.
4. Run privacy check (`node tools/check-privacy.js`), verify 0 leaks.
5. Rebuild dist/ via the project's build script.
6. Write your detailed report in /Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_1/handoff.md and send a completion message to parent (ID: 85d0ef6b-76b7-4f3a-902f-4a796a5a971e).
