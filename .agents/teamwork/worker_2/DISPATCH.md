# Dispatch Instructions for Worker 2: Deploy & Verify

## Identity
- Archetype: teamwork_preview_worker
- Working directory: /Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_2
- Project root: /Users/andrewstrachan/career_portfolio
- Authoritative user request: /Users/andrewstrachan/career_portfolio/.agents/teamwork/ORIGINAL_REQUEST.md
- Orchestrator conversation ID: 85d0ef6b-76b7-4f3a-902f-4a796a5a971e

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Objective
Execute Step 3 of the Execution Plan:
1. **Deploy to GitHub Pages**:
   - Push the updated `dist/public` build to GitHub Pages on repository `astrachan163/electronic-career-portfolio`, branch `gh-pages`.
   - Check git status, remotes, and deployment scripts (e.g. check `package.json`, `tools/deploy-github-pages.sh`, git subtree, or git worktree push) to ensure a clean deployment of the public distribution.
2. **Verify Live Site**:
   - Verify the live site at `https://astrachan163.github.io/electronic-career-portfolio/`.
   - Ensure it returns HTTP 200.
   - Run headless browser verification (e.g. Chrome / Puppeteer / curl) to confirm 0 console errors, clean rendering, that ProctorU is completely absent, and that authentic Professional Development items and overlay indicators render correctly.
3. **Capture Responsive Screenshots**:
   - Capture responsive screenshots of the live deployed site at 375px (mobile), 768px (tablet), and 1440px (desktop), specifically highlighting the enhanced Professional Development section with the video play overlay and article badges.
4. **Handoff Report**:
   - Document all steps, git commit hash, live verification results, screenshot paths, and HTTP response codes in `/Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_2/handoff.md`.
   - Send completion message to parent orchestrator (ID: 85d0ef6b-76b7-4f3a-902f-4a796a5a971e).

## 2026-10-06T23:05:06Z
[Message] timestamp=2026-10-06T23:05:06Z sender=85d0ef6b-76b7-4f3a-902f-4a796a5a971e priority=MESSAGE_PRIORITY_HIGH content=You are Worker 2 (Deployment & Live Verification Worker).
Your working directory is: /Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_2
Project root is: /Users/andrewstrachan/career_portfolio
Read your dispatch instructions at: /Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_2/DISPATCH.md
Read the authoritative user request at: /Users/andrewstrachan/career_portfolio/.agents/teamwork/ORIGINAL_REQUEST.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your objective:
1. Deploy the updated dist/public to GitHub Pages (repo: astrachan163/electronic-career-portfolio, branch: gh-pages). Check deployment scripts, git configuration, and branches.
2. Verify live site at https://astrachan163.github.io/electronic-career-portfolio/ (ensure HTTP 200, 0 console errors, clean rendering, absence of ProctorU, and presence of authentic evidence with overlay badges).
3. Capture responsive screenshots of the live deployed site (mobile 375px, tablet 768px, desktop 1440px) focusing on the enhanced Professional Development section.
4. Write your detailed handoff report in /Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_2/handoff.md and send a completion message to parent orchestrator (ID: 85d0ef6b-76b7-4f3a-902f-4a796a5a971e).
