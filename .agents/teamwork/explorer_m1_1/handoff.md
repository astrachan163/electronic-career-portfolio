# Handoff Report — explorer_m1_1 (Root Cause Diagnosis & Fix Plan)

## 1. Observation

1. **S3 vs Local Directory Comparison**:
   - Deployed files in S3 `s3://portfolio-021448122133-us-east-2/` match `/Users/andrewstrachan/career_portfolio/atlas_hero_update/` byte-for-byte:
     - `index.html`: 26,562 bytes
     - `style.css`: 36,762 bytes
     - `app.js`: 24,186 bytes
     - `scrub/invasion-hero.js`: 8,818 bytes
   - In the pre-deployment baseline (`/Users/andrewstrachan/career_portfolio/atlas_live_backup/style.css`):
     - `style.css` was 32,530 bytes (lines 1–64) and contained **ZERO** rules for `#invasion-hero` or `.invasion-*`.
   - In `atlas_hero_update/style.css`:
     - Lines 66–103 added the 20 `.invasion-*` CSS rules (`#invasion-hero`, `.invasion-pin`, `.invasion-stage`, `.invasion-canvas`, `.invasion-chapters`, `.invasion-chapter`, `.invasion-badge`, `.invasion-hud`, etc.).

2. **Index.html Linking & Caching Configuration**:
   - `atlas_hero_update/index.html` line 14:
     ```html
     <link rel="stylesheet" href="style.css">
     ```
     There is **no cache-busting query parameter or content hash** (`href="style.css"`).
   - In S3, `style.css` was uploaded with default metadata (no explicit `Cache-Control` header).
   - Under RFC 7234 section 4.2.2, browsers apply heuristic freshness based on `(Date - Last-Modified) * 10%`, caching `style.css` in client disk cache for ~19 hours.

3. **User Screenshot Forensic Analysis (`media_1791307051863.png`)**:
   - Pixel measurement of the squished video element in the user's screenshot: `x=[35, 381] (width ~347px)`, `y=[65, 199] (height ~135px)`.
   - This exactly matches the default intrinsic rendering of an unstyled `<canvas>` element (default 300x150 aspect ratio).
   - The 3 chapter narrative text blocks are rendered in static document flow directly below the canvas with `display: block; position: static; opacity: 1`:
     - Chapter 1: `DEFENDING THE FRONTIER / MAQKRS // PROJECT ATLAS`
     - Chapter 2: `ZERO-TRUST SYSTEMS / Autonomous Agent Defense`
     - Chapter 3: `UAB SFS FELLOWSHIP / Software for Learning. Systems You Can Inspect.`
     - Followed by HUD text `SCROLL TO ADVANCE` and skip link `Skip intro to interactive atlas ↓`.
   - Crucially: in the user's screenshot, **none** of the chapters have glassmorphism (`backdrop-filter: blur(14px)`), box styling (`background: rgba(7,16,29,.78); border: 1px solid ...`), or teal badge styling (`.invasion-badge`). All 3 render simultaneously as raw unstyled text.

4. **Live Chrome CDP Emulation Test**:
   - When tested in Google Chrome via Chrome DevTools Protocol on `https://d3jeotfnsm148g.cloudfront.net/`:
     - When the 20 `.invasion-*` rules are removed from the stylesheet (simulating the user's cached pre-deploy stylesheet), computed styles for `.invasion-chapter` become `position: static`, `display: block`, `opacity: 1`, and the layout breaks into the exact vertical stack seen in the screenshot.
     - When a clean network request is made (`ignoreCache: true`), the new `style.css` applies: the hero expands to full viewport (`width: 1495px, height: 812px`), the active chapter renders as a centered frosted-glass card, inactive chapters have `opacity: 0`, and the canvas covers the full viewport.

---

## 2. Logic Chain

1. **Premise 1**: The user had visited `https://d3jeotfnsm148g.cloudfront.net/` earlier in their active Chrome browser session prior to the 16:32 UTC deployment.
2. **Premise 2**: When `index.html` was updated on S3, the stylesheet link remained `<link rel="stylesheet" href="style.css">` without a version token.
3. **Premise 3**: When the user re-navigated to the page at 17:18 UTC, Chrome fetched the new `index.html` (standard for top-level navigations), but served `style.css` directly from disk cache.
4. **Premise 4**: The cached `style.css` was the previous version (`atlas_live_backup/style.css`), which contained zero rules for `.invasion-*`.
5. **Deduction**: Because no CSS rules existed for `#invasion-hero`, `.invasion-stage`, `#invasion-canvas`, `.invasion-chapters`, or `.invasion-chapter`:
   - `<canvas>` rendered at default inline dimensions (~347x135 px).
   - `.invasion-chapters` rendered in normal block flow below the canvas.
   - `.invasion-chapter` rendered with default static positioning and opacity 1, causing all 3 chapters to stack vertically on the black background.
6. **Defensive Architecture Gap**: `index.html` relied 100% on external `style.css` for structural layout. If `style.css` is stale or fails to load, the markup has no critical inline fallback styling to prevent layout blowout.

---

## 3. Caveats

- Investigation was strictly read-only; no project source files were modified.
- CloudFront invalidation `I3CF9ONHJ4RKJH26D4O4ZR1QXN` had completed on the AWS edge; the stale cache was isolated to client browsers that visited prior to 16:32 UTC.
- When fixing, we must also ensure anchor navigation (such as `#honors` in the user's URL) correctly offsets below the pinned hero.

---

## 4. Conclusion & Actionable Fix Plan for Worker (M2)

To permanently fix the layout, eliminate the stale cache, and make the top section bulletproof:

### A. Code Changes in `atlas_hero_update/index.html`
1. **Add Critical Defensive Layout CSS directly into `<head>`** inside a `<style id="critical-hero-css">` tag:
   ```html
   <style id="critical-hero-css">
     #invasion-hero {
       position: relative;
       width: 100%;
       min-height: 100vh;
       min-height: 100svh;
       background: #030810;
       overflow: hidden;
       color: #f4f6f4;
     }
     .invasion-pin {
       position: relative;
       width: 100%;
       height: 100vh;
       height: 100svh;
       min-height: 100vh;
     }
     .invasion-stage {
       position: relative;
       width: 100%;
       height: 100vh;
       height: 100svh;
       overflow: hidden;
       background: #030810;
       display: flex;
       align-items: center;
       justify-content: center;
     }
     .invasion-canvas, .invasion-video {
       position: absolute;
       inset: 0;
       width: 100% !important;
       height: 100% !important;
       object-fit: cover;
       display: block;
       z-index: 1;
     }
     .invasion-chapters {
       position: absolute;
       inset: 0;
       z-index: 3;
       pointer-events: none;
       display: flex;
       align-items: center;
       justify-content: center;
       padding: 0 clamp(20px, 5vw, 80px);
     }
     .invasion-chapter {
       position: absolute;
       max-width: min(840px, 90vw);
       text-align: center;
       opacity: 0;
       pointer-events: none;
       padding: 26px 34px;
       background: rgba(7, 16, 29, 0.85);
       border: 1px solid rgba(137, 223, 208, 0.25);
       backdrop-filter: blur(14px);
       -webkit-backdrop-filter: blur(14px);
       box-shadow: 0 24px 60px rgba(2, 6, 12, 0.75);
       transition: opacity 0.45s ease, transform 0.45s ease;
     }
     .invasion-chapter.is-active {
       opacity: 1 !important;
       pointer-events: auto;
     }
     .invasion-hud {
       position: absolute;
       bottom: clamp(20px, 4vh, 40px);
       left: 50%;
       transform: translateX(-50%);
       z-index: 4;
       pointer-events: none;
     }
     .invasion-skip {
       position: absolute;
       top: clamp(16px, 3vh, 32px);
       right: clamp(16px, 4vw, 50px);
       z-index: 5;
     }
   </style>
   ```
2. **Add Cache-Busting Version Query Parameter** to all asset tags in `index.html`:
   ```html
   <link rel="stylesheet" href="style.css?v=20261006_v2">
   <script src="app.js?v=20261006_v2" defer></script>
   <script src="scrub/invasion-hero.js?v=20261006_v2" defer></script>
   ```

### B. Deployment & Cache-Control Enforcement (M4)
Deploy to S3 with explicit HTTP caching directives:
```bash
# 1. Sync static assets with standard caching:
aws s3 sync /Users/andrewstrachan/career_portfolio/atlas_hero_update/ s3://portfolio-021448122133-us-east-2/ \
  --region us-east-2 \
  --exclude "reports/*" \
  --exclude "tests/*" \
  --exclude "*.spec.*" \
  --exclude "*.test.*" \
  --exclude ".DS_Store" \
  --exclude "*/.DS_Store" \
  --cache-control "public, max-age=300, must-revalidate"

# 2. Upload index.html with NO-CACHE headers so browsers immediately see updates:
aws s3 cp /Users/andrewstrachan/career_portfolio/atlas_hero_update/index.html s3://portfolio-021448122133-us-east-2/index.html \
  --region us-east-2 \
  --content-type "text/html" \
  --cache-control "max-age=0, no-cache, no-store, must-revalidate"

# 3. Invalidate CloudFront:
aws cloudfront create-invalidation --distribution-id E12AMBR4KONGZF --paths "/*"
```

---

## 5. Verification Method

1. **Local Browser Verification**:
   - Run python HTTP server on port 8080.
   - Load `http://localhost:8080/index.html` in Chrome DevTools.
   - Verify:
     - `#invasion-hero` computed height is `4467px` (or 450% pinned scrub height).
     - `#invasion-canvas` computed width equals window innerWidth (e.g., 1440px / 1495px) and height equals innerHeight.
     - `.invasion-chapter.is-active` is the only visible chapter; inactive chapters have `opacity: 0`.
     - 0 uncaught exceptions or console errors.
2. **Live Site Verification**:
   - Reload `https://d3jeotfnsm148g.cloudfront.net/` with standard reload (simulating normal user visit).
   - Verify network panel shows `style.css?v=20261006_v2` loaded with HTTP 200.
   - Take full viewport screenshot and verify `#invasion-hero` fills screen with centered frosted-glass MQ narrative card.
