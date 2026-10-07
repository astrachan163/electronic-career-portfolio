# Task Assignment: Portfolio Customization, Assets, and Test Updates

Working directory: /Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_custom_portfolio_1
Project root: /Users/andrewstrachan/career_portfolio
Original request: /Users/andrewstrachan/career_portfolio/.agents/teamwork/ORIGINAL_REQUEST.md

## OBJECTIVE
Implement all portfolio customization requirements, import & optimize professional development assets, update tests, and verify tests & build.

## CRITICAL INSTRUCTIONS & WARNINGS
- DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task.
- TOKEN EFFICIENCY: Be direct, surgical, and concise. Avoid unnecessary exploratory loops or redundant operations.

## DETAILED REQUIREMENTS

1. **Remove FBLA Elements**:
   - In `index.html` (and any related templates/data files like `data/` or `js/`):
     * Remove all FBLA branding, headers, tags, badges, and textual references (e.g., FBLA Electronic Career Portfolio references, rating sheet references).
     * Remove the rubric score table/card (`#rubric-table`, `#rubric-scorecard`, or any section displaying FBLA rubric scoring/grades).
     * Remove the printable PDF download button and any FBLA scorecard/rubric download links.

2. **Update Award Year**:
   - Update the "SQ Team Lead Award" year to **2021** wherever it appears (e.g., in `index.html`, `data/`, etc.).

3. **Professional Development (2023–2025) Section**:
   - Replace sample materials with a dedicated "Professional Development (2023–2025)" section.
   - Assets to import:
     Find the 8 images in `/Users/andrewstrachan/Downloads/`:
       * `Screenshot 2026-10-05 at 6.24.03 PM.png`
       * `Screenshot 2026-10-05 at 6.24.12 PM.png`
       * `Screenshot 2026-10-05 at 6.24.16 PM.png`
       * `Screenshot 2026-10-05 at 6.24.19 PM.png`
       * `Screenshot 2026-10-05 at 6.24.22 PM.png`
       * `Screenshot 2026-10-05 at 6.24.25 PM.png`
       * `Screenshot 2026-10-05 at 6.24.28 PM.png`
       * `IMG_1062.png` / `IMG_1226.png` / `IMG_3252.png` (or check Downloads for matching images mentioned in user prompt).
     Copy them into `assets/images/professional-development/` with clean filenames (and web-optimize/resize if necessary).
   - In the "Professional Development (2023–2025)" section, incorporate the following 8 items with cards/modal previews and links:
     1. GiveGab volunteering (Link: https://www.sunherald.com/news/local/counties/harrison-county/article97803862.html)
     2. Opioid Crisis Council at UMMC (Link: https://www.wlox.com/2018/12/12/south-mississippi-strong-harrison-countys-emergency-youth-shelter-gives-safe-space-children-need/)
     3. ALACTE Career & Technical Education
     4. The KY Derby conference
     5. Jump$tart National Educator Conference in Louisville
     6. Alabama State Department of Education ALACTE Conference
     7. DECA International Career Development Conference in Anaheim
     8. Additional achievements/volunteering matching the downloaded images.
   - Ensure the layout is responsive, interactive, and visually fits the design system (clean, modern styling).

4. **Testing and Build Verification**:
   - Check `tests/` (e.g. `tests/runner.js` and test suites).
   - Update tests so they reflect the removed FBLA scoreboards, PDF button, and newly added Professional Development section.
   - Run `node tests/runner.js` to ensure 100% tests pass.
   - Run the build script (e.g., `npm run build` or build tool in `package.json` / `tools/`) to generate/update `dist/` (`dist/public` and `dist/private`).
   - Check that there are 0 console errors in local testing.

5. **Deliverable**:
   - Write a complete handoff report to `handoff.md` in your working directory `/Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_custom_portfolio_1/handoff.md`.
   - Send a message to parent summarizing what was changed, test output, and readiness for deploy worker.


## 2026-10-06T21:04:46Z
Received dispatch from parent orchestrator:
- Remove FBLA branding, rubric tables, PDF download button.
- Update SQ Team Lead Award to 2021.
- Replace sample materials with Professional Development (2023-2025) with 8 images from Downloads + links.
- Update tests and build dist/ (dist/public, dist/private).
- Write handoff.md and send message.

## 2026-10-06T21:20:00Z
User directive:
- Absolutely do NOT add ProctorU to portfolio (hallucination from exam monitoring screenshots).
- Remove all ProctorU references, styles, and image assets.
- Accurately state CyberCorps SFS status: replace "Fellow" with "Scholar", replace "Pre-Vetted" / "Tier 5 SF-86 Track" with "Eligible for Federal Employment (Clearable)" and agency-sponsored clearance pathways.
