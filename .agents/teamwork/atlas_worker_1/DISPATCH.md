## 2026-10-06T11:47:51Z
You are atlas_worker_1, a teamwork_preview_worker implementing the staged Project Atlas Hero Scroll Update.
Your working directory is:
/Users/andrewstrachan/career_portfolio/.agents/teamwork/atlas_worker_1

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. A teamwork_preview_auditor will independently verify your work.

MANDATORY INSTRUCTIONS:
1. First read the authoritative user request at:
/Users/andrewstrachan/career_portfolio/.agents/teamwork/ORIGINAL_REQUEST.md
2. Read the comprehensive investigation findings from atlas_explorer_1:
- /Users/andrewstrachan/career_portfolio/.agents/teamwork/atlas_explorer_1/atlas_diff_report.md
- /Users/andrewstrachan/career_portfolio/.agents/teamwork/atlas_explorer_1/handoff.md

YOUR IMPLEMENTATION TASKS:
1. Stage everything strictly inside:
/Users/andrewstrachan/career_portfolio/atlas_hero_update/
(DO NOT mutate any files in /Users/andrewstrachan/DevAtlas or Documents/ChatGPT).
2. Base the code on commit 763bd5f / /Users/andrewstrachan/DevAtlas/portfolio-draft/private/retired-source/2026-10-03/ so that the full 3D interactive rover car-game (#map-stage) and scrub engine are present.
3. Ingest /Users/andrewstrachan/UAB_Timeline_Meeting/maqkrs_invasion.mp4:
   - Copy to `assets/invasion/maqkrs_invasion.mp4`.
   - Transcode to intra-frame MP4 (`-g 1 -bf 0`) and generate 192 WebP frames (`frames-960/f_%04d.webp`) for silky 60fps canvas scroll scrubbing.
4. Wire the Invasion Scroll Animation as the VERY FIRST element at the top of the page:
   - Section 1 (`#invasion-hero`) at the very top of `<main>`.
   - GSAP ScrollTrigger pinning for ~450vh scroll, driving the 192-frame scrub with 3 cinematic chapter overlays.
5. Retain the existing rover car-game (`#map-stage` / `#rover`) and secondary prototype scrub video lower down as secondary features.
6. Verify and Test:
   - Run a local static server on port 8080 serving `/Users/andrewstrachan/career_portfolio/atlas_hero_update/`.
   - Test in a real browser / Node environment: 0 console errors, hero is first, scrub works, rover is present.
   - Save verification screenshots in `/Users/andrewstrachan/career_portfolio/atlas_hero_update/reports/evidence/`.
7. DO NOT deploy to AWS (CloudFront deployment remains strictly held for non-root IAM and user confirmation).
8. Write your handoff report to:
/Users/andrewstrachan/career_portfolio/.agents/teamwork/atlas_worker_1/handoff.md
And report back via send_message when complete with exact verified directory path and serving command.

## 2026-10-06T11:48:16Z
**Context**: Project Atlas Staged Deployment Directive Update
**Content**: The user has authorized root credentials for this single deploy (S3 sync to the bucket behind https://d3jeotfnsm148g.cloudfront.net/ + CloudFront invalidation for E12AMBR4KONGZF).
CRITICAL CONSTRAINTS:
1. RESTRICTED SCOPE: Do not modify any other AWS resources or settings.
2. BLOCKING GATE: You must complete the staged build in `career_portfolio/atlas_hero_update/`, verify in real browser (0 console errors, hero top, scrub works, rover present), save verification screenshots, serve locally on port 8080, and prepare a local rollback backup of the live CloudFront files. DO NOT execute the S3 sync or CloudFront invalidation yet. Report verification and local server status first. Deployment will only proceed upon final confirmation from Sentinel.
**Action**: Proceed with staging, transcoding, integration, browser testing, and serving.

