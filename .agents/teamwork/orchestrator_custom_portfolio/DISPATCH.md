# Orchestrator Dispatch — Career Portfolio Customization & Deployment

Target: Andrew Strachan Electronic Career Portfolio Customization & Production Deployment
Working directory: /Users/andrewstrachan/career_portfolio/.agents/teamwork/orchestrator_custom_portfolio
Project root: /Users/andrewstrachan/career_portfolio
Authoritative user request: /Users/andrewstrachan/career_portfolio/.agents/teamwork/ORIGINAL_REQUEST.md

## Scope & Deliverables
1. Remove all FBLA references, FBLA rubric score tables, and printable PDF download button.
2. Update SQ Team Lead Award year to 2021.
3. Replace sample materials with a new/updated "Professional Development (2023–2025)" section:
   - Identify and import the 8 images from `/Users/andrewstrachan/Downloads` into `assets/images/professional-development/`.
   - Add entries for:
     * GiveGab volunteering with link: https://www.sunherald.com/news/local/counties/harrison-county/article97803862.html
     * Opioid Crisis Council at UMMC with link: https://www.wlox.com/2018/12/12/south-mississippi-strong-harrison-countys-emergency-youth-shelter-gives-safe-space-children-need/
     * ALACTE Conference for Career and Technical Education
     * The KY Derby conference
     * Jump$tart National Educator Conference in Louisville
     * Alabama State Department of Education ALACTE Conference
     * DECA International Career Development Conference in Anaheim
4. Responsive & Mobile-friendly: Ensure flawless viewing on both phone (375px) and computer (1440px).
5. Build & Verification:
   - Rebuild both public/private distributions.
   - Run tests (`npm test` / `node tests/runner.js`), updating test assertions that checked for FBLA rubric/PDF downloads.
   - Verify 0 console errors in headless Chrome.
6. Deploy to GitHub Pages (repository `astrachan163/electronic-career-portfolio`, branch `gh-pages`) so user can access it live from anywhere.
7. Token Efficiency: Execute using focused, serialized subagents (`flash` or `inherit`), avoiding massive parallel swarms.


## 2026-10-06T17:46:52Z
Received system dispatch message from parent:
Customize and deploy Andrew Strachan's personal electronic career portfolio:
1. Remove all FBLA-specific branding, rubric score tables, and printable PDF download button.
2. Change SQ Team Lead Award year to 2021.
3. Replace sample materials with a rich, interactive 'Professional Development (2023–2025)' section:
   - Scan and copy the 8 images in /Users/andrewstrachan/Downloads into assets/images/professional-development/.
   - Include GiveGab volunteering (link: https://www.sunherald.com/news/local/counties/harrison-county/article97803862.html)
   - Include Opioid Crisis Council at UMMC (link: https://www.wlox.com/2018/12/12/south-mississippi-strong-harrison-countys-emergency-youth-shelter-gives-safe-space-children-need/)
   - Include ALACTE Conference for Career and Technical Education
   - Include The KY Derby conference
   - Include Jump$tart National Educator Conference in Louisville
   - Include Alabama State Department of Education ALACTE Conference
   - Include DECA International Career Development Conference in Anaheim
4. Ensure flawless responsive design across viewports (mobile 375px and desktop 1440px) so user can use it from phone or computer anywhere.
5. Update the test suites so all tests pass with the new content, rebuild dist/public and dist/private, and verify 0 browser console errors.
6. Deploy the updated production build to GitHub Pages (astrachan163/electronic-career-portfolio), confirm HTTP 200 at https://astrachan163.github.io/electronic-career-portfolio/, and take responsive screenshots.
7. TOKEN EFFICIENCY: The user specifically emphasized: 'dont use up lots of tokens... You are low on tokens overall'. Use focused, serialized workers using flash or inherit, keep milestones lean, avoid sprawling redundant swarms, and deliver a clean, fast result.
