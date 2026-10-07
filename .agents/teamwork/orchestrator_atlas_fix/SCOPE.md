# Scope: Project Atlas Hero Viewport & Overlay Fix

## Architecture & Problem Overview
The Project Atlas site at https://d3jeotfnsm148g.cloudfront.net/ has a broken layout at the top of the page.
- `#invasion-hero` renders as a small squished video element.
- The 3 chapter narrative overlays are not pinned or positioned over the canvas/video; instead, they are rendered in normal flow sequentially down the page on a black background.
- GSAP ScrollTrigger / CSS positioning (sticky stage, absolute centering, backdrop blur, opacity fades) must be fixed so the hero fills the viewport, pins properly during scrub, transitions between narrative chapters cleanly, and transitions to the rover map section without collision or overlap.

## Milestones
| # | Milestone | Scope | Dependencies | Status |
|---|-----------|-------|--------------|--------|
| M1 | Exploration & Diagnosis | Inspect S3 vs atlas_hero_update/ directory, inspect style.css, index.html, invasion-hero.js, and identify missing CSS rules or GSAP pinning failures | none | DONE |
| M2 | Implementation | Implement full-viewport sticky stage, styled and centered chapter overlays with cyber typography/glassmorphism, active chapter fade logic, and clean rover integration | M1 | DONE |
| M3 | Browser Verification & Visual QA | Launch local server on :8080, run headless Chrome inspections (console errors, computed styles, bounding rects), capture screenshots | M2 | DONE |
| M4 | S3 Deployment & Invalidation | Sync fixed assets to s3://portfolio-021448122133-us-east-2/ (excluding test/reports), invalidate CloudFront E12AMBR4KONGZF | M3 | DONE |
| M5 | Live Verification & Audit | Inspect live site https://d3jeotfnsm148g.cloudfront.net/ via headless Chrome, verify zero console errors, capture live screenshots, and generate before/after report | M4 | DONE |

## Code Layout
- Local working source: `/Users/andrewstrachan/career_portfolio/atlas_hero_update/`
  - `index.html`
  - `style.css`
  - `scrub/invasion-hero.js`
  - `scrub/index.html` (if applicable)
- Deployment target: S3 bucket `s3://portfolio-021448122133-us-east-2/`
- CloudFront distribution: `E12AMBR4KONGZF`
- Live domain: `https://d3jeotfnsm148g.cloudfront.net/`
