# Dispatch for Worker M2

Target: Fix hero section layout and styling, verify locally, deploy to S3/CloudFront, and verify live site.
Role: teamwork_preview_worker
Working directory: /Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_m2_1
Project root: /Users/andrewstrachan/career_portfolio
Authoritative user request: /Users/andrewstrachan/career_portfolio/.agents/teamwork/ORIGINAL_REQUEST.md
Scope document: /Users/andrewstrachan/career_portfolio/.agents/teamwork/orchestrator_atlas_fix/SCOPE.md
Explorer handoff report: /Users/andrewstrachan/career_portfolio/.agents/teamwork/explorer_m1_1/handoff.md
User screenshot reference: /Users/andrewstrachan/.gemini/antigravity/brain/34a9d5a0-66f8-43eb-b92f-d3470de23102/.user_uploaded/media_1791307051863.png

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

URGENT USER INSTRUCTION:
"once verified the horizontal widthe and vertical width dont match and you fix it, dont use up lots of tokens, just get it fixed, take a screenshot and be done and launch it. You are low on tokens overall, so just fix and deploy. And only fix that top part."

TASK SPECIFICATION:
1. File Write Ownership:
   - You exclusively own: `/Users/andrewstrachan/career_portfolio/atlas_hero_update/index.html`, `/Users/andrewstrachan/career_portfolio/atlas_hero_update/style.css`, and (if needed) `/Users/andrewstrachan/career_portfolio/atlas_hero_update/scrub/invasion-hero.js`.
   - Do NOT touch downstream sections (like rover `#map-stage` or career portfolio files).

2. Implement the Fix:
   - In `/Users/andrewstrachan/career_portfolio/atlas_hero_update/index.html`:
     a. Inject critical inline defensive layout CSS in `<head>` (see section 4.A in explorer's handoff report) so that even if a browser caches an older stylesheet, `#invasion-hero`, `.invasion-pin`, `.invasion-stage`, `.invasion-canvas`, `.invasion-chapters`, and `.invasion-chapter` have full viewport dimensions (`width: 100%`, `height: 100vh` / `100svh`), the canvas covers the stage (`position: absolute; inset: 0; width: 100% !important; height: 100% !important; object-fit: cover`), and `.invasion-chapter` is absolutely positioned, centered, with glassmorphism and opacity 0 unless `.is-active` (opacity 1).
     b. Add cache-busting version parameter to asset links:
        - `<link rel="stylesheet" href="style.css?v=20261006_v2">`
        - `<script src="app.js?v=20261006_v2" defer></script>`
        - `<script src="scrub/invasion-hero.js?v=20261006_v2" defer></script>`
   - In `/Users/andrewstrachan/career_portfolio/atlas_hero_update/style.css`:
     - Verify horizontal and vertical widths match properly across desktop and mobile, ensuring `.invasion-canvas` has `width: 100%`, `height: 100%`, `object-fit: cover`, and `.invasion-chapter` cards are cleanly centered with cyber typography, backdrop glassmorphism, and smooth transitions.

3. Local Verification:
   - Test locally on `http://localhost:8080/` (start python3 -m http.server 8080 if not already running in `atlas_hero_update/`).
   - Use Chrome DevTools MCP or headless browser commands to verify:
     - Computed bounding rect of `#invasion-hero` and `#invasion-canvas`.
     - Active chapter visibility and inactive chapter hidden state.
     - 0 console errors.
   - Save local verification screenshot to `/Users/andrewstrachan/career_portfolio/local_hero_fixed.png`.

4. Deployment to AWS S3 & CloudFront:
   - Sync `atlas_hero_update/` to S3:
     `aws s3 sync /Users/andrewstrachan/career_portfolio/atlas_hero_update/ s3://portfolio-021448122133-us-east-2/ --region us-east-2 --exclude "reports/*" --exclude "tests/*" --exclude "*.spec.*" --exclude "*.test.*" --exclude ".DS_Store" --exclude "*/.DS_Store" --cache-control "public, max-age=300, must-revalidate"`
   - Upload `index.html` with no-cache header:
     `aws s3 cp /Users/andrewstrachan/career_portfolio/atlas_hero_update/index.html s3://portfolio-021448122133-us-east-2/index.html --region us-east-2 --content-type "text/html" --cache-control "max-age=0, no-cache, no-store, must-revalidate"`
   - Invalidate CloudFront:
     `aws cloudfront create-invalidation --distribution-id E12AMBR4KONGZF --paths "/*"`

5. Live Verification:
   - Navigate to `https://d3jeotfnsm148g.cloudfront.net/` in browser/headless Chrome.
   - Verify 0 console errors.
   - Capture live screenshot and save to `/Users/andrewstrachan/career_portfolio/live_hero_fixed.png`.

6. Reporting:
   - Write full details, commands run, and verification results in `/Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_m2_1/handoff.md`.
