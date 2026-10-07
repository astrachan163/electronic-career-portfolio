# Orchestrator Dispatch — Career Portfolio Customization & Production Deployment

Target: Andrew Strachan Electronic Career Portfolio Customization & Production Deployment
Working directory: /Users/andrewstrachan/career_portfolio/.agents/teamwork/orchestrator_custom_portfolio_2
Project root: /Users/andrewstrachan/career_portfolio
Authoritative user request: /Users/andrewstrachan/career_portfolio/.agents/teamwork/ORIGINAL_REQUEST.md

## High Priority Requirements
1. **Remove FBLA Elements**:
   - Remove FBLA branding, logos, header badges, and references.
   - Remove the rubric score table (`#rubric-table`, `#rubric-scorecard`, etc.).
   - Remove the printable PDF download button and any FBLA scorecard download links.
2. **Update Award Year**:
   - Update SQ Team Lead Award year to 2021.
3. **Professional Development (2023–2025)**:
   - Replace sample materials with a rich, interactive "Professional Development (2023–2025)" section.
   - Source images from `/Users/andrewstrachan/Downloads`:
     * `/Users/andrewstrachan/Downloads/Screenshot 2026-10-05 at 6.24.03 PM.png`
     * `/Users/andrewstrachan/Downloads/Screenshot 2026-10-05 at 6.24.12 PM.png`
     * `/Users/andrewstrachan/Downloads/Screenshot 2026-10-05 at 6.24.16 PM.png`
     * `/Users/andrewstrachan/Downloads/Screenshot 2026-10-05 at 6.24.19 PM.png`
     * `/Users/andrewstrachan/Downloads/Screenshot 2026-10-05 at 6.24.22 PM.png`
     * `/Users/andrewstrachan/Downloads/Screenshot 2026-10-05 at 6.24.25 PM.png`
     * `/Users/andrewstrachan/Downloads/Screenshot 2026-10-05 at 6.24.28 PM.png`
     * `/Users/andrewstrachan/Downloads/IMG_1062.png` / `IMG_1226.png` / `IMG_3252.png`
     Resize/optimize them and copy to `assets/images/professional-development/`.
   - Incorporate the specific achievements/conferences:
     * GiveGab volunteering (link: https://www.sunherald.com/news/local/counties/harrison-county/article97803862.html)
     * Opioid Crisis Council at UMMC (link: https://www.wlox.com/2018/12/12/south-mississippi-strong-harrison-countys-emergency-youth-shelter-gives-safe-space-children-need/)
     * ALACTE Conference for Career and Technical Education
     * The KY Derby conference
     * Jump$tart National Educator Conference in Louisville
     * Alabama State Department of Education ALACTE Conference
     * DECA International Career Development Conference in Anaheim
4. **Mobile & Desktop Responsive Design**:
   - Ensure clean viewing on phone (375px) and computer (1440px).
5. **Testing & Build**:
   - Update `tests/runner.js` and test suites to reflect removed FBLA scoreboards/PDF buttons.
   - Build `dist/public` and `dist/private` packages.
   - Run tests (`node tests/runner.js`) ensuring all tests pass.
6. **Deployment to GitHub Pages**:
   - Deploy build to GitHub Pages (`astrachan163/electronic-career-portfolio`, branch `gh-pages`).
   - Verify live URL `https://astrachan163.github.io/electronic-career-portfolio/` returns HTTP 200 with 0 console errors.
   - Capture responsive screenshots of the live site.
7. **TOKEN EFFICIENCY**:
   - MANDATORY: Use `Model: "flash"` for all worker subagents.
   - Execute in serialized steps: one worker for content & asset updates + tests, one worker for build & deploy verification. Do NOT spawn large swarms.
