# Progress — atlas_explorer_1

Last visited: 2026-10-06T11:42:30Z

## Completed Investigations:
1. **Deep-Search Across Project Atlas / profundus_atlas Versions**:
   - Analyzed `/Users/andrewstrachan/DevAtlas/portfolio-draft` (commit `763bd5f` vs working tree branch `codex/curated-portfolio` vs `private/retired-source/2026-10-03/`).
   - Analyzed `/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq` (`reports/STATUS.md`, `reports/source-checkpoint.json`, `reports/RELEASE_PACKET.md`).
   - Analyzed `/Users/andrewstrachan/Downloads/Maqkrs_ChatGPT_Work_Handoff_v2.zip` (`trees/S5/project-atlas-portfolio.md`, `reports/S5_atlas_projects.md`).
   - Analyzed `survey_codex_1/codex_summary.md` and user directives in `ORIGINAL_REQUEST.md`.
2. **CloudFront Deployment Inspection (`https://d3jeotfnsm148g.cloudfront.net/`)**:
   - Curled live headers, index.html, app.js, style.css, and scrub video assets.
   - Proved definitively that live CloudFront is a 100% byte-for-byte match to git commit `763bd5f` of `DevAtlas/portfolio-draft` (deployed Sep 29, 2026, 00:28 UTC via `apply-portfolio.log`).
   - Detailed exact diffs between live CloudFront, `retired-source`, and the latest `codex/curated-portfolio` branch (which stripped the car game and scrub video).
3. **Inspection of `maqkrs_invasion.mp4`**:
   - Exact resolution: 1280x720, progressive, yuv420p.
   - Duration: 8.000000s, 24 fps, exactly 192 frames (`nb_frames: 192`).
   - Bitrate: 3,051,748 bps (file size: 3,054,904 bytes).
   - Codec: H.264 / AVC High Profile, level 31, 2 B-frames.
4. **Existing Scroll Video Implementation Analysis**:
   - Deconstructed GSAP ScrollTrigger pinning and dual-mode scrub engine (`scrub-controller.js` + `scrub-canvas.js`).
   - Analyzed intra-frame video playback vs WebP frame sequence / ImageBitmap LRU canvas fallback.
   - Analyzed interactive map rover / car game in `#map-stage`.
5. **Hero Implementation & Safety Plan Formulated**:
   - Copy candidate to `/Users/andrewstrachan/career_portfolio/atlas_hero_update/` to prevent external repo mutations.
   - Wire `maqkrs_invasion.mp4` scroll scrub as the first element at the top.
   - Preserve existing car game and rover exploration lower down as secondary features.
   - Plan local preview server on `python3 -m http.server 8080`.
   - Identified critical AWS IAM safety gate: default credentials are ROOT account (`arn:aws:iam::021448122133:root`); must gate all deployments behind non-root IAM credentials and explicit Andrew confirmation.

## Current Step:
- Authoring comprehensive report: `atlas_diff_report.md`.
- Authoring 5-component handoff report: `handoff.md`.
- Updating BRIEFING.md.
- Messaging parent agent.
