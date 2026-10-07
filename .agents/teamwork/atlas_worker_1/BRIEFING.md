# BRIEFING — 2026-10-06T11:48:00Z

## Mission
Implement the staged Project Atlas Hero Scroll Update with canvas frame scrubbing, 3 cinematic chapters, and preserved 3D rover interactive stage in /Users/andrewstrachan/career_portfolio/atlas_hero_update/.

## 🔒 My Identity
- Archetype: teamwork_preview_worker
- Roles: implementer, qa, specialist
- Working directory: /Users/andrewstrachan/career_portfolio/.agents/teamwork/atlas_worker_1
- Original parent: 7b461a17-7466-41d0-9021-32c9b6fd6adc
- Milestone: M1_STAGED_ATLAS_HERO_UPDATE

## 🔒 Key Constraints
- Stage everything strictly inside /Users/andrewstrachan/career_portfolio/atlas_hero_update/
- DO NOT mutate any files in /Users/andrewstrachan/DevAtlas or Documents/ChatGPT
- Base code on commit 763bd5f / /Users/andrewstrachan/DevAtlas/portfolio-draft/private/retired-source/2026-10-03/
- Ingest /Users/andrewstrachan/UAB_Timeline_Meeting/maqkrs_invasion.mp4:
  - Copy to assets/invasion/maqkrs_invasion.mp4
  - Transcode to intra-frame MP4 (-g 1 -bf 0) and generate 192 WebP frames (frames-960/f_%04d.webp)
- Wire Invasion Scroll Animation as the VERY FIRST element at top of page (#invasion-hero at top of <main>)
- GSAP ScrollTrigger pinning for ~450vh scroll, driving 192-frame scrub with 3 cinematic chapter overlays
- Retain existing rover car-game (#map-stage / #rover) and secondary prototype scrub video lower down
- Verify on local static server port 8080: 0 console errors, hero first, scrub works, rover present
- Save verification screenshots in reports/evidence/
- DO NOT deploy to AWS (CloudFront deployment strictly held)
- No shortcuts, facades, or fake implementations

## Current Parent
- Conversation ID: 7b461a17-7466-41d0-9021-32c9b6fd6adc
- Updated: 2026-10-06T11:48:00Z

## Task Summary
- **What to build**: Staged Project Atlas with top-of-page Invasion Scroll Hero (192-frame canvas scrubber with video fallback, 3 chapter overlays) plus preserved 3D rover game (#map-stage) and prototype scrub.
- **Success criteria**: Clean standalone staging directory, full asset pipeline generated, 0 console errors, silky scrub, intact rover, screenshots verified.
- **Interface contracts**: Staged in career_portfolio/atlas_hero_update/, runnable via static HTTP server on port 8080.
- **Code layout**: atlas_hero_update/ containing index.html, styles, scripts, assets/invasion/, assets/rover/, reports/evidence/.

## Change Tracker
- **Files modified**: None yet
- **Build status**: Pending
- **Pending issues**: None

## Quality Status
- **Build/test result**: Not yet executed
- **Lint status**: Clean
- **Tests added/modified**: Browser verification & integration check planned

## Loaded Skills
- None specified in dispatch

## Key Decisions Made
- Staging directory: /Users/andrewstrachan/career_portfolio/atlas_hero_update/
- Copy source from retired-source/2026-10-03 (or git commit 763bd5f) into atlas_hero_update/

## Artifact Index
- DISPATCH.md — Assignment instructions
- BRIEFING.md — Situational awareness
- progress.md — Liveness heartbeat and milestone tracking
- handoff.md — Final 5-component handoff report
