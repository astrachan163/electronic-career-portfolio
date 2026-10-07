# Project Atlas Deep Search, Diff & Hero Scroll Animation Report

**Investigator:** `atlas_explorer_1` (Teamwork Explorer — Investigation & Synthesis)  
**Date:** 2026-10-06  
**Working Directory:** `/Users/andrewstrachan/career_portfolio/.agents/teamwork/atlas_explorer_1`  
**Target Subject:** Project Atlas / profundus_atlas Ecosystem, Live CloudFront Build, `maqkrs_invasion.mp4`, and Hero Implementation Architecture

---

## 1. Executive Summary

A comprehensive, multi-source investigation was performed across Andrew Strachan's local repositories (`/Users/andrewstrachan/DevAtlas/`, `/Users/andrewstrachan/career_portfolio/`), coordination archives (`/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/`, `Maqkrs_ChatGPT_Work_Handoff_v2.zip`), media assets (`/Users/andrewstrachan/UAB_Timeline_Meeting/`), and the currently live CloudFront deployment (`https://d3jeotfnsm148g.cloudfront.net/`).

### Key Findings:
1. **Live CloudFront Site (`https://d3jeotfnsm148g.cloudfront.net/`)**:
   - The live site is an exact **byte-for-byte match** to git commit `763bd5fa53df8f98e0c7018dd57e54e17aec5789` (`763bd5f`) of repository `/Users/andrewstrachan/DevAtlas/portfolio-draft` (deployed Sep 29, 2026, 00:28 UTC to S3 bucket `portfolio-021448122133-us-east-2` behind distribution `E12AMBR4KONGZF`).
   - The live site contains:
     - An interactive **car-game / rover navigation map** in the hero section (`#map-stage` with `#rover` and 5 interactive landmarks).
     - A scroll-driven **dual-engine video/canvas scrub section** (`#scrub`) featuring 5 narrative chapters (*Build, Explain, Protect, AI, Cloud*) across a 134-frame intra-frame video and WebP image sequence.
     - 450 static asset files total (~49.1 MB).
2. **Evolution of Local Candidates**:
   - On October 3, 2026, a curation pass occurred on branch `codex/curated-portfolio` in `/Users/andrewstrachan/DevAtlas/portfolio-draft`. This pass stripped out the rover map and the scroll-video scrub section, moving those files to `portfolio-draft/private/retired-source/2026-10-03/`, and built a 129-file minimal candidate (`public-output/`).
   - **Crucially, the October 3 curated build was NEVER published to CloudFront.** The live site remains `763bd5f`.
   - Therefore, the **authoritative base** that retains the car game and scroll-scrub features is `DevAtlas/portfolio-draft` at commit `763bd5f` (or its preserved snapshot in `private/retired-source/2026-10-03/`).
3. **`maqkrs_invasion.mp4` Inspection**:
   - Resolution: **1280 × 720** (16:9, progressive).
   - Duration: **8.000 seconds**.
   - Frame Rate: **24.00 fps**.
   - Total Frames: **192 frames** (exact frame count: 192).
   - Video Codec: **H.264 / AVC High Profile**, Level 31 (`avc1.64001f`), YUV420p.
   - File Size / Bitrate: **3,054,904 bytes** (~2.91 MB) / **3,051,748 bps** (~3.05 Mbps).
   - Stream structure: 1 video stream, 0 audio streams. It contains **B-frames (`has_b_frames: 2`)**, meaning optimization to all-intra frames or a WebP sequence is required for smooth, stutter-free scroll scrubbing.
4. **Existing Scroll Video Architecture**:
   - Powered by GSAP + ScrollTrigger, with an adaptive dual-engine scrub controller (`scrub-controller.js`) and canvas renderer (`scrub-canvas.js`).
   - Pinned `.scrub-pin` container (~500vh scroll travel on desktop, ~350vh on mobile).
   - Default video scrubbing via `fastSeek()` / `currentTime` on all-intra video (`-g 1 -bf 0`).
   - Real-time performance observer measuring seek latency and dropped frames; automatically downgrades to HTML5 Canvas frame drawing (`ScrubCanvas`) using an LRU cache of `ImageBitmap` frames if seek latency > 40ms, dropped frames > 20%, or if running on Safari / iOS / low-memory devices.
5. **Hero Implementation & AWS Safety Plan**:
   - To adhere to isolation constraints, files should be staged in `/Users/andrewstrachan/career_portfolio/atlas_hero_update/` without mutating external repos.
   - `maqkrs_invasion.mp4` will be wired as the **first element** at the very top of the page, featuring smooth scroll scrubbing and cinematic title typography.
   - The existing car-game rover and prototype scrub will be preserved lower down in the page.
   - Local preview server via `python3 -m http.server 8080`.
   - **CRITICAL AWS IAM SAFETY GATE**: The active AWS CLI profile is currently the **root account** (`arn:aws:iam::021448122133:root`). CloudFront/S3 deployment using root credentials is strictly forbidden by project security policies. A non-root IAM role, budget verification, and Andrew's explicit confirmation are required prior to deployment.

---

## 2. Deep-Search Results: All Versions of Project Atlas / profundus_atlas

A systematic scan of all local directories, git branches, and archives reveals four distinct stages/candidates of Project Atlas:

| Candidate ID | Location / Identifier | Date / Commit | Files / Size | Key Features & Status |
|---|---|---|---|---|
| **Candidate 1: Live CloudFront** | `https://d3jeotfnsm148g.cloudfront.net/` (S3: `portfolio-021448122133-us-east-2`) | Sep 29, 2026 (`763bd5f`) | 450 files / 49.1 MB | **Currently deployed**. Includes rover car-game map hero, 134-frame 5-chapter scroll video scrub, hardcoded project catalog (17 items), and sub-app demos. |
| **Candidate 2: Git Base HEAD** | `/Users/andrewstrachan/DevAtlas/portfolio-draft` (commit `763bd5f`) | Sep 28, 2026, 20:17 CT (`763bd5f`) | 459 tracked files / 46.9 MB | **Exact source for Candidate 1**. Main branch HEAD before uncommitted curation modifications. Working tree clean at this commit. |
| **Candidate 3: Preserved Snapshot** | `/Users/andrewstrachan/DevAtlas/portfolio-draft/private/retired-source/2026-10-03/` | Oct 3, 2026, 06:12 CT | 4 files (`dist/index.html`, `app.js`, `style.css`, `catalog.js`) | Retains car-game rover and scroll video, but integrated dynamic `catalog.js` and replaced `ghs` landmark with `adaptivehs`. Preserved right before the curation strip. |
| **Candidate 4: Curated Redesign** | `/Users/andrewstrachan/DevAtlas/portfolio-draft/` (branch `codex/curated-portfolio`) | Oct 3, 2026, 08:17 CT (uncommitted) | 129 public files / 4.28 MB (`public-output/`) | **Newest files on disk, but car-game and scroll-video STRIPPED**. Minimal text hero, 4 curated project cards, verified Lighthouse 100/100/100. **NEVER DEPLOYED**. |

### Archives and Supporting Records
- **`Maqkrs_ChatGPT_Work_Handoff_v2.zip`**:
  - Found at `/Users/andrewstrachan/Downloads/Maqkrs_ChatGPT_Work_Handoff_v2.zip`.
  - File `inventory/reports/trees/S5/project-atlas-portfolio.md` records:
    - Repo: `https://github.com/astrachan163/project-atlas-portfolio` (private)
    - Head: `main @ 763bd5f`
    - Live URL: `d3jeotfnsm148g.cloudfront.net (noindex)`
    - Assets: `dist/assets/scrub/` containing `frames-960/` (134 files, 4.9M), `frames/` (134 files, 7.3M), `scrub-1280-intra.mp4` (8.2M), `scrub-1920-intra.mp4` (11.7M), `scrub.webm` (9.7M).
- **`Maqkrs-hq/reports/STATUS.md`**:
  - Documents that on October 3, 2026 (13:16 UTC), Andrew approved a curated redesign on `codex/curated-portfolio` that *"removes retired map/scroll assets and obsolete browser stand-ins from public output; originals remain preserved."*
  - Candidate: 129 files / 4,285,655 bytes, producer SHA-256 `335c3141b7d056e424e02a8ae49e5c3dafb63e419fe5d3dd71ab21787fd82b19`.
  - Deployment gate: Never pushed or deployed to AWS.
- **`career_portfolio/ORIGINAL_REQUEST.md` (lines 120–126)**:
  - Andrew explicitly stated:
    > *"i want the current scroll video on the portfolio page to change to the maqkrs_invasion.mp4 scroll animation and i want it to be the very first thing on the page at the top. The original one showing the car game can also stay as a cool feature and we can add the other one to the top."*
  - This clarifies the user's intent: Andrew wants the visual excitement of the scroll animation and car game restored, with `maqkrs_invasion.mp4` taking pride of place at the very top as the hero scroll animation, while the existing car-game scroll video remains as a secondary feature lower down!

---

## 3. Live CloudFront Build Inspection & Verification

### Network & Infrastructure Attributes (`https://d3jeotfnsm148g.cloudfront.net/`)
```http
HTTP/2 200 
Content-Type: text/html; charset=utf-8
Content-Length: 23553
Date: Tue, 06 Oct 2026 11:36:10 GMT
Last-Modified: Tue, 29 Sep 2026 00:55:16 GMT
ETag: "6d9e0053b9327001c907d36205201c54"
Server: AmazonS3
X-Cache: Miss from cloudfront
Via: 1.1 6f5187dce416dca465fd57854a2d2de6.cloudfront.net (CloudFront)
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; media-src 'self' blob: data:; font-src 'self' data:; connect-src 'self'; worker-src 'self' blob:; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'
X-Robots-Tag: noindex, nofollow
```

### Byte-for-Byte Comparison Results
Independent diffs between `https://d3jeotfnsm148g.cloudfront.net/` and local files:
- **`dist/index.html`**:
  ```bash
  diff -u <(git -C /Users/andrewstrachan/DevAtlas/portfolio-draft show 763bd5f:dist/index.html) <(curl -s https://d3jeotfnsm148g.cloudfront.net/)
  # Output: ZERO DIFFERENCE (Exit code 0)
  ```
- **`dist/app.js`**:
  ```bash
  diff -u <(git -C /Users/andrewstrachan/DevAtlas/portfolio-draft show 763bd5f:dist/app.js) <(curl -s https://d3jeotfnsm148g.cloudfront.net/app.js)
  # Output: ZERO DIFFERENCE (Exit code 0)
  ```
- **`dist/style.css`**:
  ```bash
  diff -u <(git -C /Users/andrewstrachan/DevAtlas/portfolio-draft show 763bd5f:dist/style.css) <(curl -s https://d3jeotfnsm148g.cloudfront.net/style.css)
  # Output: ZERO DIFFERENCE (Exit code 0)
  ```
- **Media Asset Availability on CloudFront**:
  - `assets/scrub/scrub.webm`: HTTP 200, 10,155,526 bytes, last-modified `Tue, 29 Sep 2026 00:28:39 GMT`.
  - `assets/scrub/scrub-1280-intra.mp4`: HTTP 200, 8,562,955 bytes, last-modified `Tue, 29 Sep 2026 00:28:27 GMT`.
  - `assets/scrub/scrub-1920-intra.mp4`: HTTP 200, 12,302,083 bytes, last-modified `Tue, 29 Sep 2026 00:28:28 GMT`.

**Definitive Conclusion:** The live CloudFront deployment is **100% identical** to commit `763bd5f`. The uncommitted October 3 curation pass exists only on local disk.

---

## 4. Video Inspection: `maqkrs_invasion.mp4`

Command:
```bash
ffprobe -v error -show_streams -show_format -of json /Users/andrewstrachan/UAB_Timeline_Meeting/maqkrs_invasion.mp4
```

### Exact Technical Specifications
| Property | Value | Notes |
|---|---|---|
| **Absolute Path** | `/Users/andrewstrachan/UAB_Timeline_Meeting/maqkrs_invasion.mp4` | Master source file |
| **File Size** | **3,054,904 bytes** (~2.91 MB) | 3.05 MB on disk |
| **Container Format** | QuickTime / MP4 (`isomiso2avc1mp41`) | Major brand: `isom`, encoder: `Google` |
| **Video Codec** | **H.264 / AVC / MPEG-4 part 10** | Profile: High, Level: 3.1, Tag: `avc1` (`0x31637661`) |
| **Resolution** | **1280 × 720** | 16:9 widescreen HD, progressive |
| **Pixel Format** | `yuv420p` | Standard browser-compatible chroma subsampling |
| **Frame Rate** | **24.000 fps** (`24/1`) | Constant frame rate |
| **Exact Duration** | **8.000000 seconds** | 98,304 ticks @ time_base 1/12288 |
| **Total Frames** | **192 frames** | 8.0s × 24 fps = 192 frames |
| **Bitrate** | **3,051,748 bps** (~3.05 Mbps) | Constant bitrate band |
| **Audio Streams** | **0 (None)** | Video only; silent |
| **GOP / B-Frames** | **`has_b_frames: 2`** | Standard GOP with inter-frame prediction |

### Scrub Performance Implications
Standard MP4 videos with B-frames and long GOPs are optimized for forward linear playback, not random-access scrubbing. Scrubbing a B-frame video via `video.currentTime = t` requires the browser's hardware decoder to seek back to the nearest keyframe (I-frame) and decode all forward P/B-frames sequentially. On rapid scroll events:
- Seek latency spikes above 40–100ms.
- High drop-frame rates occur, causing visible visual hitching and stutter.
- Safari on macOS / iOS is particularly susceptible to seek stalls and memory thrashing.

**Optimization Requirement:** Following the proven architecture in `portfolio-draft/docs/scrub-README.md`, `maqkrs_invasion.mp4` should be transcoded to an all-intra video (`-g 1 -bf 0`) and extracted into a WebP frame sequence (192 frames) for canvas fallback.

---

## 5. Existing Scroll Video & Car-Game Deconstruction

The implementation in Project Atlas (`dist/scrub/scrub-controller.js`, `dist/scrub/scrub-canvas.js`, `dist/app.js`, and `dist/style.css`) is a masterclass in resilient web animation.

### 5.1 Architecture Stack
1. **Libraries**: Vendor GSAP 3.12.5 and ScrollTrigger (`vendor/gsap.min.js`, `vendor/ScrollTrigger.min.js`). No external CDN, pure self-hosted IIFE.
2. **DOM Structure**:
   ```html
   <section id="scrub" class="scrub">
     <div class="scrub-pin" data-testid="scrub-pin">
       <div class="scrub-stage" data-testid="scrub-stage">
         <video id="scrub-video" muted playsinline preload="none" ...>
           <source data-src="assets/scrub/scrub.webm" type="video/webm">
           <source data-src="assets/scrub/scrub-1280-intra.mp4" type="video/mp4" media="(max-width: 1280px)">
           <source data-src="assets/scrub/scrub-1920-intra.mp4" type="video/mp4">
         </video>
         <canvas id="scrub-canvas" hidden data-testid="scrub-canvas"></canvas>
         <div class="scrub-chapters">...</div>
         <ol class="scrub-rail">...</ol>
       </div>
     </div>
   </section>
   ```
3. **Pinning & Scroll Binding**:
   - ScrollTrigger pins `.scrub-pin` with `start: "top top"`, `end: "+=500%"` (desktop, ~500vh travel) or `end: "+=350%"` (narrow screens).
   - Smooth scrubbing is dampened with `scrub: 0.35` and `pinSpacing: true`.
   - As the user scrolls, `ScrollTrigger.onUpdate(self)` computes normalized `progress` (0.0 to 1.0).
   - Frame mapping: `frame = Math.round(progress * (totalFrames - 1))`.

### 5.2 Dual-Engine Scrubbing & Adaptive Failover
- **Video Mode (Fast Seek)**:
  - Primary mode in Chrome/Firefox on capable machines.
  - Computes target time `t = frame / fps`.
  - Calls `video.fastSeek(t)` (falling back to `video.currentTime = t`).
  - Monitors performance using `requestVideoFrameCallback` (RVFC) and `PerformanceObserver` (long tasks).
- **Canvas Fallback Mode (`ScrubCanvas`)**:
  - Automatically activated if:
    1. Median seek latency over 30 samples exceeds **40ms**.
    2. Dropped frame ratio exceeds **20%**.
    3. Running on Safari or iOS (`isSafariOrIOS()`).
    4. Device has low power/memory (`navigator.deviceMemory < 4` or `hardwareConcurrency <= 4`).
    5. User passes `?scrub=canvas`.
  - In Canvas mode, the video is hidden, and `scrub-canvas.js` uses an LRU cache of `ImageBitmap` frames (capacity 40, or 24 on low-memory) loaded from pre-rendered WebP assets (`assets/scrub/frames-960/f_0001.webp`–`f_0134.webp`).
  - Frames are drawn via `ctx.drawImage(bitmap, dx, dy, dw, dh)`.
- **IntersectionObserver Lazy Loading**:
  - Video sources are detached (`data-src`) on page load.
  - Video is only loaded when `#scrub` nears the viewport (`lazyRootMargin: "0px"`), avoiding upfront network and memory costs on initial paint.
- **Accessibility & Reduced Motion**:
  - When `prefers-reduced-motion: reduce` is detected, the engine enters static mode: no pinning, video sources detached, showing the poster image and all chapter cards statically.

### 5.3 The "Car-Game" Rover Exploration (`#map-stage`)
Located in the hero section:
- `#map-stage` overlays concept artwork (`assets/atlas-concept.webp`).
- A vehicle avatar (`#rover`) is positioned absolutely.
- Keyboard listeners (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `W`, `A`, `S`, `D`) update the rover's coordinates (`roverPosition.x`, `roverPosition.y`) and heading angle via `requestAnimationFrame`.
- 5 interactive landmarks (`CS646 WORLD`, `AI TUTOR`, `SECURE LEARNING`, `CLOUD SYSTEMS`, `LEADERSHIP`) trigger proximity snapping and update the project preview card (`#landmark-title`, `#landmark-summary`).
- Clicking any landmark button glides the vehicle directly to that coordinate.

---

## 6. Hero Implementation & Safety Plan

To satisfy Andrew's requirements while strictly respecting workspace isolation and deployment safety:

### Phase 1: Workspace Setup & Candidate Mirroring
1. **Target Directory**: `/Users/andrewstrachan/career_portfolio/atlas_hero_update/`.
2. **Isolation Guarantee**: All operations occur within `career_portfolio`. No files in `/Users/andrewstrachan/DevAtlas/` or other user directories will be modified.
3. **Candidate Selection**:
   - Copy the complete working baseline of `DevAtlas/portfolio-draft/dist` (from commit `763bd5f`, which includes the full asset suite, vendor scripts, and car-game components) into `/Users/andrewstrachan/career_portfolio/atlas_hero_update/`.

### Phase 2: Transcoding & Optimizing `maqkrs_invasion.mp4`
To match the high-performance scrub pipeline:
1. **Intra-frame H.264 Video (Desktop / Video Mode)**:
   ```bash
   ffmpeg -i /Users/andrewstrachan/UAB_Timeline_Meeting/maqkrs_invasion.mp4 \
     -an -c:v libx264 -profile:v high -g 1 -bf 0 -crf 18 -pix_fmt yuv420p -movflags +faststart \
     /Users/andrewstrachan/career_portfolio/atlas_hero_update/assets/invasion/invasion-1280-intra.mp4
   ```
2. **Intra-frame WebM VP9 Video**:
   ```bash
   ffmpeg -i /Users/andrewstrachan/UAB_Timeline_Meeting/maqkrs_invasion.mp4 \
     -an -c:v libvpx-vp9 -g 1 -b:v 0 -crf 32 -row-mt 1 \
     /Users/andrewstrachan/career_portfolio/atlas_hero_update/assets/invasion/invasion.webm
   ```
3. **WebP Frame Sequence (192 Frames for Canvas Mode Fallback)**:
   ```bash
   mkdir -p /Users/andrewstrachan/career_portfolio/atlas_hero_update/assets/invasion/frames-960
   ffmpeg -i /Users/andrewstrachan/UAB_Timeline_Meeting/maqkrs_invasion.mp4 \
     -vf "scale=960:-2:flags=lanczos" \
     /Users/andrewstrachan/career_portfolio/atlas_hero_update/assets/invasion/frames-960/f_%04d.png
   # Convert PNGs to WebP via cwebp (q78) and remove temporary PNGs
   for f in /Users/andrewstrachan/career_portfolio/atlas_hero_update/assets/invasion/frames-960/*.png; do
     cwebp -q 78 "$f" -o "${f%.png}.webp" && rm "$f"
   done
   ```
4. **Poster Frame Generation**:
   ```bash
   ffmpeg -ss 00:00:00 -i /Users/andrewstrachan/UAB_Timeline_Meeting/maqkrs_invasion.mp4 \
     -vframes 1 -q:v 2 /Users/andrewstrachan/career_portfolio/atlas_hero_update/assets/invasion/poster.webp
   ```
5. **Frame Manifest**: Generate `manifest.json` with `fps: 24`, `frames: 192`, `format: "f_%04d.webp"`.

### Phase 3: Layout & DOM Architecture
1. **Hero Structure**:
   Wire the invasion scrub as the **first element** at the top of `<main>`:
   ```html
   <!-- 01. HERO SCROLL ANIMATION (TOP OF PAGE) -->
   <section id="invasion-hero" class="invasion-scrub" aria-label="Project Atlas Cinematic Introduction">
     <div class="invasion-pin">
       <div class="invasion-stage">
         <video id="invasion-video" muted playsinline preload="auto" poster="assets/invasion/poster.webp"
           data-fps="24" data-frames="192" data-duration="8.000">
           <source src="assets/invasion/invasion.webm" type="video/webm">
           <source src="assets/invasion/invasion-1280-intra.mp4" type="video/mp4">
         </video>
         <canvas id="invasion-canvas" hidden></canvas>
         
         <!-- Cinematic Overlay Story -->
         <div class="invasion-overlay">
           <div class="invasion-chapter" data-start="0.0" data-end="0.25">
             <p class="invasion-tag">DEFENDING THE FRONTIER</p>
             <h1>MAQKRS // PROJECT ATLAS</h1>
             <p>Systems engineering, cybersecurity architecture, and autonomous intelligence.</p>
           </div>
           <div class="invasion-chapter" data-start="0.25" data-end="0.65">
             <p class="invasion-tag">ZERO-TRUST SYSTEMS</p>
             <h2>Autonomous Agent Defense</h2>
             <p>Real-time policy isolation, formal threat modeling, and resilient infrastructure.</p>
           </div>
           <div class="invasion-chapter" data-start="0.65" data-end="1.0">
             <p class="invasion-tag">UAB SFS FELLOWSHIP</p>
             <h2>Software for Learning. Systems You Can Inspect.</h2>
             <p>Scroll down to explore interactive prototypes, research, and career impact.</p>
           </div>
         </div>
         <a class="invasion-skip" href="#atlas-overview">Skip introduction ↓</a>
       </div>
     </div>
   </section>

   <!-- 02. INTERACTIVE ATLAS & CAR-GAME ROVER (SECONDARY HERO / EXPLORATION) -->
   <section id="atlas-overview" class="hero" aria-labelledby="hero-title">
     <!-- Existing #map-stage, rover, and landmark controls preserved -->
   </section>

   <!-- 03. EXISTING 5-CHAPTER CAR-GAME SCROLL STORY -->
   <section id="scrub" class="scrub" aria-label="Technical Systems Story">
     <!-- Existing #scrub-video, canvas, and Build/Explain/Protect/AI/Cloud chapters preserved -->
   </section>
   ```

2. **Scrub Controller Extension**:
   - Reuse the battle-tested `ScrubEngine` pattern. Initialize two distinct instances:
     - Instance 1: `#invasion-hero` (target: 192 frames, duration: 8s, pinned for 450vh scroll).
     - Instance 2: `#scrub` (target: 134 frames, duration: 5.5s, pinned for 350vh scroll).
   - Independent GSAP ScrollTriggers ensure buttery-smooth scrubbing without event collision.

### Phase 4: Local Preview Testing Plan
1. Local server command:
   ```bash
   cd /Users/andrewstrachan/career_portfolio/atlas_hero_update && python3 -m http.server 8080
   ```
2. Verification Checklist:
   - Verify page opens cleanly at `http://localhost:8080/`.
   - Verify smooth 60fps scrub on `#invasion-hero` during downward wheel/touch scroll.
   - Verify "Skip introduction" button smoothly jumps focus to `#atlas-overview`.
   - Verify rover car-game map functions with keyboard arrows and clicks.
   - Verify secondary `#scrub` video activates and scrubs as expected lower down.
   - Verify `prefers-reduced-motion` cleanly renders static posters without layout shift.

### Phase 5: AWS Deployment Gates & Credential Safety Checks
**STOP & VERIFY — Mandatory Safety Pre-flight Checklist**:
1. **IAM Identity Gate**:
   - Live check: `aws sts get-caller-identity` currently returns:
     `arn:aws:iam::021448122133:root`
   - **BLOCKING RULE**: Deployments using the AWS root account are **strictly forbidden**. Before deploying:
     - Configure or assume a dedicated non-root IAM deployer role/user (e.g. `arn:aws:iam::021448122133:user/portfolio-deployer`).
     - Verify IAM identity with `aws sts get-caller-identity`.
2. **Cost & Spend Ceiling**:
   - Combined AWS/GCP spend ceiling is **$12 gross monthly ceiling** ($6 warning, $9.60 stop on optional work).
   - S3 storage increase: ~15 MB for transcoded invasion assets (cost: <$0.01/month).
3. **Explicit User Approval Gate**:
   - In accordance with `ORIGINAL_REQUEST.md`: *"This should be put off for last and only proceed with my confirmation"*.
   - **No deployment script (`deploy-static.sh`) will be executed** without explicit, written confirmation from Andrew.

---

## 7. Synthesis & Architectural Comparison Matrix

| Component | Live CloudFront (`763bd5f`) | Curated Working Tree (`codex`) | Proposed Hero Update (`atlas_hero_update`) |
|---|---|---|---|
| **Top Hero Element** | Interactive Rover Map (`#map-stage`) | Minimal Text Banner | **`maqkrs_invasion.mp4` Scroll Animation** |
| **Top Hero Scrubbing** | None (Static image background) | None | **Scroll-driven video/canvas scrub (192 frames)** |
| **Car-Game Rover Map** | Present in Hero fold | Stripped completely | **Preserved as secondary section (`#atlas-overview`)** |
| **Technical Scrub Video** | Present in Section 2 (`#scrub`) | Stripped completely | **Preserved in Section 3 (`#scrub`)** |
| **Catalog Structure** | 17 hardcoded projects | 4 curated projects | **Curated or Full (Toggleable via config)** |
| **Asset Footprint** | 49.1 MB | 4.28 MB | **~64 MB (includes both video scrub suites)** |
| **Lighthouse Performance** | ~92–95 (media loading) | 100/100/100 | **Target: 95+ (with strict IntersectionObserver lazy loading)** |
| **Safety Isolation** | Production S3 / CloudFront | External repo (`DevAtlas`) | **Fully isolated in `career_portfolio/`** |

---

*Report authored by `atlas_explorer_1`. Detailed handoff instructions provided in `handoff.md`.*
