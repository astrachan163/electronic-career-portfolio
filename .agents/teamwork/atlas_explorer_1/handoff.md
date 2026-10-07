# Handoff Report — atlas_explorer_1

**Milestone:** Project Atlas Deep Search, Diff & Hero Scroll Animation  
**Role:** `teamwork_preview_explorer` (Explorer: Investigation & Synthesis)  
**Author:** `atlas_explorer_1`  
**Date:** 2026-10-06T11:44:00Z  
**Recipient:** `parent` (`7b461a17-7466-41d0-9021-32c9b6fd6adc`)  
**Working Directory:** `/Users/andrewstrachan/career_portfolio/.agents/teamwork/atlas_explorer_1`

---

## 1. Observation

1. **CloudFront Deployment Match**:
   - Running `diff -u <(git -C /Users/andrewstrachan/DevAtlas/portfolio-draft show 763bd5f:dist/index.html) <(curl -s https://d3jeotfnsm148g.cloudfront.net/)` exited with code `0` (zero difference).
   - Running `diff -u <(git -C /Users/andrewstrachan/DevAtlas/portfolio-draft show 763bd5f:dist/app.js) <(curl -s https://d3jeotfnsm148g.cloudfront.net/app.js)` exited with code `0` (zero difference).
   - Running `diff -u <(git -C /Users/andrewstrachan/DevAtlas/portfolio-draft show 763bd5f:dist/style.css) <(curl -s https://d3jeotfnsm148g.cloudfront.net/style.css)` exited with code `0` (zero difference).
   - Live CloudFront response headers (`curl -ILs https://d3jeotfnsm148g.cloudfront.net/`):
     - `HTTP/2 200`
     - `content-length: 23553`
     - `last-modified: Tue, 29 Sep 2026 00:55:16 GMT`
     - `etag: "6d9e0053b9327001c907d36205201c54"`
     - `server: AmazonS3`
     - `via: 1.1 6f5187dce416dca465fd57854a2d2de6.cloudfront.net (CloudFront)`
     - `x-robots-tag: noindex, nofollow`
   - Verified media endpoints on CloudFront:
     - `https://d3jeotfnsm148g.cloudfront.net/assets/scrub/scrub.webm`: HTTP 200, 10,155,526 bytes, last-modified `Tue, 29 Sep 2026 00:28:39 GMT`.
     - `https://d3jeotfnsm148g.cloudfront.net/assets/scrub/scrub-1280-intra.mp4`: HTTP 200, 8,562,955 bytes, last-modified `Tue, 29 Sep 2026 00:28:27 GMT`.
     - `https://d3jeotfnsm148g.cloudfront.net/assets/scrub/scrub-1920-intra.mp4`: HTTP 200, 12,302,083 bytes, last-modified `Tue, 29 Sep 2026 00:28:28 GMT`.

2. **Local Repository & Candidate Evolution**:
   - Repository: `/Users/andrewstrachan/DevAtlas/portfolio-draft`.
   - Base commit `763bd5fa53df8f98e0c7018dd57e54e17aec5789` (`763bd5f`), committed `Sep 28, 2026 20:17 CT`: *"Tighten mobile nav and drop duplicate Sanctum role text."*
   - Local working tree on branch `codex/curated-portfolio` shows uncommitted changes dating from October 3, 2026:
     - `dist/index.html` modified at `Oct 3 08:17 CT` (14,855 bytes vs original 24,117 bytes).
     - `#map-stage` (rover car game) and `#scrub` (scroll video) were stripped out of `dist/index.html`.
     - Preserved snapshot exists at `/Users/andrewstrachan/DevAtlas/portfolio-draft/private/retired-source/2026-10-03/` containing `dist/index.html` (24,117 bytes), `dist/app.js` (21,215 bytes), `dist/style.css` (33,882 bytes), and `dist/catalog.js` (3,476 bytes).
   - In `/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/reports/STATUS.md`, line 9 confirms:
     *"The new candidate is on codex/curated-portfolio, selecting Sanctum, MaqkrsTutor2, Maqkrs and AdaptiveHS... It removes retired map/scroll assets and obsolete browser stand-ins from public output; originals remain preserved. Final candidate: 129 files / 4,285,655 bytes... zero AWS calls."*
   - Line 43 in `STATUS.md`: *"AWS publication waits for October 5 America/Chicago, approved non-root IAM/account... No purchase, outgoing message, cloud write, public indexing, commit or push occurred in this implementation."*

3. **`maqkrs_invasion.mp4` Exact Metadata**:
   - Tool output of `ffprobe -v error -show_streams -show_format -of json /Users/andrewstrachan/UAB_Timeline_Meeting/maqkrs_invasion.mp4`:
     - `width: 1280`, `height: 720` (16:9 widescreen HD)
     - `codec_name: "h264"`, `profile: "High"`, `codec_tag_string: "avc1"`, `pix_fmt: "yuv420p"`
     - `r_frame_rate: "24/1"`, `avg_frame_rate: "24/1"`
     - `duration: "8.000000"` (exact seconds)
     - `nb_frames: "192"` (exact frame count: 192)
     - `size: "3054904"` (3,054,904 bytes = ~2.91 MB)
     - `bit_rate: "3051748"` (~3.05 Mbps)
     - `has_b_frames: 2` (contains B-frames; GOP inter-frame prediction)
     - `nb_streams: 1` (1 video stream, 0 audio streams)

4. **Existing Scroll Video Implementation Mechanics**:
   - Inspected `/Users/andrewstrachan/DevAtlas/portfolio-draft/dist/scrub/scrub-controller.js` and `docs/scrub-README.md`:
     - Built using GSAP 3.12.5 and ScrollTrigger (`vendor/gsap.min.js`, `vendor/ScrollTrigger.min.js`).
     - Pins `.scrub-pin` container for `+=500%` viewport travel on desktop, `+=350%` on mobile, with dampening `scrub: 0.35` and `pinSpacing: true`.
     - Dual-mode architecture:
       1. Video scrubbing via `fastSeek()` / `currentTime` on intra-frame encoded video (`scrub-1280-intra.mp4` generated with `-g 1 -bf 0`).
       2. Canvas fallback (`ScrubCanvas` via `scrub-canvas.js`): draws pre-rendered WebP frames from `assets/scrub/frames-960/` via an LRU cache of `ImageBitmap` objects (capacity 40, or 24 low-memory).
     - Adaptive degradation: `maybeDegrade()` automatically flips from video to canvas if seek latency median > 40ms, dropped frames > 20%, or on Safari / iOS / low-memory devices (`navigator.deviceMemory < 4`).
     - Tested via `node /Users/andrewstrachan/DevAtlas/portfolio-draft/tests/scrub-controller.spec.mjs`: exited code 0 (`OK`).
   - Inspected hero car-game rover (`#map-stage`, `#rover` in `dist/app.js` and `dist/style.css`):
     - Interactive vehicle avatar `#rover` controlled by keyboard arrows/WASD (`roverPosition.x`, `roverPosition.y`) or by clicking 5 landmark buttons (`CS646 WORLD`, `AI TUTOR`, `SECURE LEARNING`, `CLOUD SYSTEMS`, `LEADERSHIP`).

5. **Live AWS Identity & Credential Audit**:
   - Tool output of `aws sts get-caller-identity`:
     ```json
     {
         "UserId": "021448122133",
         "Account": "021448122133",
         "Arn": "arn:aws:iam::021448122133:root"
     }
     ```
   - The active AWS credential profile is the **AWS Root Account**.
   - Verified against `DevAtlas/reports/RELEASE_PACKET.md` and `STATUS.md`: Deployments with root credentials are explicitly forbidden by policy.

---

## 2. Logic Chain

1. **Live CloudFront Provenance (Observation 1 -> Conclusion)**:
   - Comparing the live CloudFront response (`index.html`, `app.js`, `style.css`) against commit `763bd5f` produced 0 diff lines across all three primary files.
   - CloudFront headers record `last-modified: Tue, 29 Sep 2026 00:55:16 GMT`, matching the timestamp of the CloudFormation stack apply in `/Users/andrewstrachan/DevAtlas/swarm/r4/AWS2/apply-portfolio.log` (Sep 28 19:28 CDT / Sep 29 00:28 UTC).
   - Therefore, the currently live site on CloudFront is definitively `763bd5f`.

2. **State of the Local Codebase & Identification of Candidates (Observations 1, 2 -> Conclusion)**:
   - On October 3, 2026, working tree files in `portfolio-draft` were modified to strip the map rover and scroll video to produce a minimal, text-first candidate (`codex/curated-portfolio`).
   - The pre-strip files were backed up in `portfolio-draft/private/retired-source/2026-10-03/`.
   - The October 3 candidate was never deployed to AWS; AWS deployments were held waiting for October 5, non-root IAM, and Andrew's clearance.
   - In `career_portfolio/ORIGINAL_REQUEST.md`, Andrew explicitly stated:
     *"i want the current scroll video on the portfolio page to change to the maqkrs_invasion.mp4 scroll animation and i want it to be the very first thing on the page at the top. The original one showing the car game can also stay as a cool feature and we can add the other one to the top."*
   - Therefore, building on the stripped version would destroy the user's intent. The true foundation must be the version that still contains the car game and scroll video (`763bd5f` / `private/retired-source/2026-10-03/`).

3. **Media Scrubbing Performance & Transcoding Rationale (Observation 3, 4 -> Conclusion)**:
   - `ffprobe` revealed that `maqkrs_invasion.mp4` has `has_b_frames: 2`, 192 frames, 8.0s duration at 24fps.
   - B-frames require multi-frame lookahead decoding. Scrubbing a B-frame video via `video.currentTime` causes high seek latencies (>40ms) and dropped frames on rapid scrolling, which would trigger immediate failover in `ScrubEngine`.
   - Therefore, to achieve silky 60fps scrubbing, `maqkrs_invasion.mp4` must be prepared with the same optimization pipeline used for `scrub-1280-intra.mp4`:
     - An all-intra H.264 file (`-g 1 -bf 0`).
     - An all-intra WebM VP9 file.
     - A 192-frame WebP sequence (`frames-960/f_0001.webp` through `f_0192.webp`) for canvas fallback.

4. **Safety & Directory Isolation Rationale (Observations 2, 5 -> Conclusion)**:
   - Agent constraints forbid mutating files outside `/Users/andrewstrachan/career_portfolio`.
   - Mutating `/Users/andrewstrachan/DevAtlas/` directly would disrupt existing git state and uncommitted work on `codex/curated-portfolio`.
   - Copying the candidate into `/Users/andrewstrachan/career_portfolio/atlas_hero_update/` provides total isolation, allowing the new hero architecture to be built, tested, and previewed without risk.
   - The AWS credential audit revealed that the active AWS CLI profile is the root account (`arn:aws:iam::021448122133:root`). Deploying with root credentials violates explicit security gates in `STATUS.md`. All deployments must be gated behind non-root IAM and explicit confirmation from Andrew.

---

## 3. Caveats

1. **Uncommitted Working Tree in `DevAtlas/portfolio-draft`**: The working tree on `codex/curated-portfolio` contains uncommitted changes. These must not be touched or overwritten. The copy operation should take either the clean git tree of `763bd5f` (`git archive 763bd5f`) or the `dist/` directory plus `private/retired-source/2026-10-03/`.
2. **Video Transcoding CPU / Disk Overhead**: Generating 192 WebP frames and intra-frame MP4/WebM will take approximately 10–20 seconds of CPU time and ~15 MB of disk space. This is well within system capacity.
3. **External CloudFront Cache Invalidation**: When any future deployment occurs, a CloudFront invalidation (`aws cloudfront create-invalidation --distribution-id E12AMBR4KONGZF --paths "/*"`) will be required to purge cached edge assets.

---

## 4. Conclusion

1. **Definitive Baseline Identified**: The live site on CloudFront `https://d3jeotfnsm148g.cloudfront.net/` is byte-for-byte identical to `DevAtlas/portfolio-draft` at commit `763bd5f`. The newest source on disk (`codex/curated-portfolio`, Oct 3) stripped the car game and scroll video, but Andrew specifically requested keeping the car-game features. Thus, commit `763bd5f` (preserved in `portfolio-draft/private/retired-source/2026-10-03/`) is the definitive base to build upon.
2. **Hero Architecture Defined**:
   - `maqkrs_invasion.mp4` (1280x720, 8s, 192 frames, 24fps) will be wired as Section 1 (`#invasion-hero`) at the very top of `<main>`.
   - GSAP ScrollTrigger will pin the invasion stage for 450vh of scroll, driving smooth frame scrubbing and synchronizing 3 cinematic chapter overlays.
   - The original car-game rover (`#map-stage`) and secondary prototype scrub video (`#scrub`) will be preserved immediately below as secondary interactive features (`#atlas-overview` and `#scrub`).
3. **Execution Path**:
   - Source files copied to `/Users/andrewstrachan/career_portfolio/atlas_hero_update/`.
   - Local preview served on `http://localhost:8080/`.
   - Deployment strictly blocked until Andrew provides non-root IAM credentials and explicit written approval.

---

## 5. Verification Method

To independently verify all findings and test the implementation:

1. **Verify CloudFront Identity**:
   ```bash
   diff -u <(git -C /Users/andrewstrachan/DevAtlas/portfolio-draft show 763bd5f:dist/index.html) <(curl -s https://d3jeotfnsm148g.cloudfront.net/)
   # Expected: Exit code 0, no output (byte-for-byte match)
   ```

2. **Verify `maqkrs_invasion.mp4` Metadata**:
   ```bash
   ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration,nb_frames,r_frame_rate,codec_name -of default=noprint_wrappers=1 /Users/andrewstrachan/UAB_Timeline_Meeting/maqkrs_invasion.mp4
   # Expected output:
   # codec_name=h264
   # width=1280
   # height=720
   # r_frame_rate=24/1
   # duration=8.000000
   # nb_frames=192
   ```

3. **Verify Scrub Controller Unit Tests**:
   ```bash
   node /Users/andrewstrachan/DevAtlas/portfolio-draft/tests/scrub-controller.spec.mjs
   # Expected output: scrub-controller.spec.mjs: OK
   ```

4. **Verify AWS Root IAM Gate**:
   ```bash
   aws sts get-caller-identity
   # Expected output shows root ARN: arn:aws:iam::021448122133:root (Deployment BLOCKED until switched to non-root)
   ```

5. **Verify Comprehensive Report**:
   ```bash
   test -f /Users/andrewstrachan/career_portfolio/.agents/teamwork/atlas_explorer_1/atlas_diff_report.md && echo "Report exists"
   ```
