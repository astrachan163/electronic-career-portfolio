# Task Assignment: Deployment to GitHub Pages, Live Verification, and Responsive Screenshots

Working directory: /Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_custom_portfolio_2
Project root: /Users/andrewstrachan/career_portfolio
Original request: /Users/andrewstrachan/career_portfolio/.agents/teamwork/ORIGINAL_REQUEST.md

## OBJECTIVE
Deploy the customized portfolio (dist/public or repository build) to GitHub Pages (`astrachan163/electronic-career-portfolio`, branch `gh-pages`), verify the live site, and capture responsive screenshots at mobile (375px) and desktop (1440px) widths.

## CRITICAL INSTRUCTIONS & WARNINGS
- DO NOT CHEAT. All implementations and verifications must be genuine.
- TOKEN EFFICIENCY: Work quickly, surgically, and avoid redundant loops.
- Use git / gh CLI or git commands to push to `astrachan163/electronic-career-portfolio` branch `gh-pages`.
  Note: Check existing git remote or gh auth status in `/Users/andrewstrachan/career_portfolio`.
  Note: GitHub Pages serves from `gh-pages` branch. The public distribution is built in `dist/public` (or root if configured, verify existing setup or tools/deploy scripts in the repo).

## DETAILED REQUIREMENTS

1. **Deploy to GitHub Pages**:
   - Inspect `/Users/andrewstrachan/career_portfolio/` for existing deployment scripts or git remotes (e.g. check `package.json`, `tools/`, `git remote -v`).
   - The target repo is `astrachan163/electronic-career-portfolio`, branch `gh-pages`.
   - Deploy `dist/public` (ensuring `.nojekyll` is present) to the `gh-pages` branch.
   - Push to `origin gh-pages` (or `git push origin gh-pages` / use `gh-pages` package if available).

2. **Verify Live Deployment**:
   - Verify that `https://astrachan163.github.io/electronic-career-portfolio/` loads with HTTP 200.
   - Verify with curl or headless browser / Chrome DevTools that there are 0 console errors and the customized content is live (e.g. check for "Professional Development (2023–2025)", 2021 SQ award, no FBLA).

3. **Capture Responsive Screenshots**:
   - Capture responsive screenshots of the live site or verified distribution:
     * Mobile: 375px viewport width (e.g., `screenshots/live_mobile_375px.png` or `dist/screenshots/mobile_375.png`)
     * Desktop: 1440px viewport width (e.g., `screenshots/live_desktop_1440px.png` or `dist/screenshots/desktop_1440.png`)
   - Confirm that the layout displays cleanly and responsively on both phone and computer.

4. **Deliverable**:
   - Write a complete handoff report to `handoff.md` in `/Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_custom_portfolio_2/handoff.md`.
   - Send a message to parent summarizing the deployment status, live URL verification, and paths to the captured screenshots.

## 2026-10-06T21:28:35Z
You are the Custom Portfolio Deploy & Verification Worker.
Working directory: /Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_custom_portfolio_2
Project root: /Users/andrewstrachan/career_portfolio
Task specification: /Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_custom_portfolio_2/DISPATCH.md
Authoritative user request: /Users/andrewstrachan/career_portfolio/.agents/teamwork/ORIGINAL_REQUEST.md

TASKS:
1. Deploy the updated career portfolio to GitHub Pages:
   - Target repository: astrachan163/electronic-career-portfolio
   - Target branch: gh-pages
   - Ensure the public distribution in dist/public/ (or git working tree as configured) is pushed to the gh-pages branch. Verify .nojekyll is included.
2. Verify live deployment:
   - Query https://astrachan163.github.io/electronic-career-portfolio/
   - Ensure HTTP 200 and loads updated content (Professional Development 2023-2025, 2021 SQ award, no FBLA).
   - Verify 0 console errors.
3. Capture responsive screenshots:
   - Mobile: 375px
   - Desktop: 1440px
   - Save to dist/screenshots/ or screenshots/
4. Deliverable:
   - handoff.md
   - send_message to parent
