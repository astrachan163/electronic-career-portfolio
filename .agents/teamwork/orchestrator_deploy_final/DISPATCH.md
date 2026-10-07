# Orchestrator Dispatch — Final GitHub Pages Deployment & Live Verification

Target: Deploy updated Career Portfolio (ProctorU removed, authentic evidence bolstered with visual overlays) to GitHub Pages.
Working directory: /Users/andrewstrachan/career_portfolio/.agents/teamwork/orchestrator_deploy_final
Project root: /Users/andrewstrachan/career_portfolio
Authoritative user request: /Users/andrewstrachan/career_portfolio/.agents/teamwork/ORIGINAL_REQUEST.md

## High Priority Tasks
1. Build `dist/public` via `node tools/build.js` to ensure the latest changes with ProctorU removed and visual badges are bundled.
2. Verify `dist/public/.nojekyll` exists.
3. Deploy `dist/public` to GitHub Pages:
   - Git remote: `https://github.com/astrachan163/electronic-career-portfolio.git`
   - Branch: `gh-pages`
   - Push to `gh-pages` and `main`.
4. Verify live site:
   - URL: `https://astrachan163.github.io/electronic-career-portfolio/`
   - Confirm HTTP 200 via `curl -sI https://astrachan163.github.io/electronic-career-portfolio/`
   - Verify 0 occurrences of ProctorU in live HTML.
   - Verify 0 console errors via `node tools/verify-console.js`.
5. Capture responsive screenshots:
   - Run `node tools/capture-responsive-screenshots.js`.
   - Confirm screenshots exist at `dist/screenshots/` and `screenshots/`.
6. Report completion with before/after summary and evidence paths.


## 2026-10-07T02:03:48Z
You are the Lead Project Orchestrator to deploy Andrew Strachan's updated career portfolio to GitHub Pages and verify it live.

Working directory: /Users/andrewstrachan/career_portfolio/.agents/teamwork/orchestrator_deploy_final
Project root: /Users/andrewstrachan/career_portfolio
Authoritative user request: /Users/andrewstrachan/career_portfolio/.agents/teamwork/ORIGINAL_REQUEST.md
Dispatch instructions: /Users/andrewstrachan/career_portfolio/.agents/teamwork/orchestrator_deploy_final/DISPATCH.md

CONSTRAINTS:
1. Always use Model: "flash" for all workers/subagents.
2. Run exactly 1 worker to execute the deployment, run screenshot capture, and verify live URL.

TASKS:
1. Build dist/ via `node tools/build.js`.
2. Push dist/public to `gh-pages` and `main` branches of `https://github.com/astrachan163/electronic-career-portfolio.git`.
3. Verify live URL `https://astrachan163.github.io/electronic-career-portfolio/` returns HTTP 200 and has 0 references to ProctorU.
4. Run `node tools/capture-responsive-screenshots.js` and verify responsive mobile (375px) and desktop (1440px) screenshots.
5. Report completion to parent.
