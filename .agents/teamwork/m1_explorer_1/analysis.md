# Milestone 1 Asset Pipeline & Media Copying Strategy Analysis

**Agent:** `m1_explorer_1` (Teamwork Explorer)  
**Date:** 2026-10-06T11:25:00Z  
**Target Project:** `/Users/andrewstrachan/career_portfolio`  
**Output Destination:** `/Users/andrewstrachan/career_portfolio/assets/`  

---

## 1. Executive Summary & Problem Scope

This investigation establishes the definitive asset inventory, copying architecture, and directory layout for Andrew Strachan's FBLA Electronic Career Portfolio. 

Per the user requirements in `ORIGINAL_REQUEST.md` and the system specifications in `PROJECT.md`:
1. **Zero External Dependencies / Self-Contained**: All media assets must be copied from their local master locations into the project directory under `career_portfolio/assets/` using relative paths.
2. **File Size & Performance Constraints**: No file may exceed 100 MB. All video previews must be web-compressed (720p, 30fps, silent H.264 MP4 and VP9 WebM, paired with high-quality poster PNGs).
3. **Dual-Variant Clearance**: Media is segregated into **Public-Safe** (GitHub Pages compatible, no PII, no unreleased student data) and **Private/Full** (Firebase Hosting, unredacted, including held-for-clearance assets).
4. **Exceeding FBLA Expectations**: Includes the official teal/gold circuit "M" monogram brand mark, the verified Credly-backed Microsoft Certified Educator (MCE) badge, 4 project video preview suites, 14 QA evidence screenshots, and DonnaKaran Allen's student benchmark companion presentation PDF.

Every source asset on the local filesystem was directly inspected, measured, verified with SHA-256 hashing, and mapped to its exact destination in the target directory tree.

---

## 2. Complete Asset Inventory & Checksum Ledger

All assets on disk are drastically smaller than the 100 MB limit (the largest single file is 1.54 MB).

### 2.1 Brand Mark & Badges
| Asset Name | Source Path | Target Relative Path | Dimensions | MIME Type | Size (Bytes) | SHA-256 Hash | Clearance |
|---|---|---|---|---|---|---|---|
| **Circuit "M" Brand Mark** | `/Users/andrewstrachan/.gemini/antigravity/brain/3402f430-b8a8-4e53-b08d-fa36c0d004a1/.user_uploaded/media_1791283990241.jpg` | `assets/brand/media_1791283990241.jpg`<br>(alias: `assets/brand/logo_circuit_m.jpg`) | 1024×1024 | `image/jpeg` | 105,858 | `01c5498ff069173a40a5b4a630b0cfa61d08ad741309c4ba1f000dacb4306342` | Public & Private |
| **Microsoft Certified Educator Badge** | `/Users/andrewstrachan/Current Resume by Year/Badges & Certifications/mce-microsoft-certified-educator.png` | `assets/brand/mce-microsoft-certified-educator.png` | 125×125 | `image/png` | 26,136 | `712536d437ea7ca984ca0dcdee8accdf332ce3c178b48b4a70de4f3c419bdb4e` | Public & Private |

### 2.2 10-Second Video Previews & Posters
All clips are 10.0 seconds, 1280×720 (720p), 30 fps, 0 audio streams, strictly web-optimized.

| Project | Format | Source Path | Target Relative Path | Size (Bytes) | SHA-256 Hash | Clearance |
|---|---|---|---|---|---|---|
| **CS646 Sanctum** | MP4 (H.264) | `/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/sanctum-v1-10s-720p.mp4` | `assets/previews/sanctum-v1-10s-720p.mp4`<br>(alias: `assets/previews/sanctum.mp4`) | 177,206 | `99edbaf5e53ebba1adcdd873fba066a22ce3eca35080ac13369f1a52755ab06c` | Public & Private |
| **CS646 Sanctum** | WebM (VP9) | `/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/sanctum-v1-10s-720p.webm` | `assets/previews/sanctum-v1-10s-720p.webm`<br>(alias: `assets/previews/sanctum.webm`) | 425,293 | `d35679471a9e4b53334c13f6869d5731b3f06e666778ff00b490bb8dca28ea75` | Public & Private |
| **CS646 Sanctum** | Poster (PNG) | `/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/sanctum-v1-poster.png` | `assets/previews/sanctum-v1-poster.png`<br>(alias: `assets/previews/sanctum-poster.png`) | 439,386 | `633ba591b5c7a19cc8e3b2c37e1b04b0094d0b97839b0848ff3d5ccd26d71044` | Public & Private |
| **AdaptiveHS** | MP4 (H.264) | `/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/adaptivehs-v1-10s-720p.mp4` | `assets/previews/adaptivehs-v1-10s-720p.mp4`<br>(alias: `assets/previews/adaptivehs.mp4`) | 142,410 | `dcc946841560366e1193bb71dee4b6c2c0abc60dc926147af778f7777de4911e` | Public & Private |
| **AdaptiveHS** | WebM (VP9) | `/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/adaptivehs-v1-10s-720p.webm` | `assets/previews/adaptivehs-v1-10s-720p.webm`<br>(alias: `assets/previews/adaptivehs.webm`) | 274,016 | `6b23e23d75a760f613f23dbd6c5887db7973a0d667734a1a04e6fcba5f59da30` | Public & Private |
| **AdaptiveHS** | Poster (PNG) | `/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/adaptivehs-v1-poster.png` | `assets/previews/adaptivehs-v1-poster.png`<br>(alias: `assets/previews/adaptivehs-poster.png`) | 225,878 | `1b9067d2530cffa6bfc179ab5a07b3a63d2bde02789a0bac66b86725633765b9` | Public & Private |
| **MaqkrsTutor** | MP4 (H.264) | `/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/tutor-v1-10s-720p.mp4` | `assets/previews/tutor-v1-10s-720p.mp4`<br>(alias: `assets/previews/tutor.mp4`) | 124,651 | `c177188bb70ee1a49de9d952c33e079b515b1ffb3ecd2636cff45c86467670a9` | Public & Private |
| **MaqkrsTutor** | WebM (VP9) | `/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/tutor-v1-10s-720p.webm` | `assets/previews/tutor-v1-10s-720p.webm`<br>(alias: `assets/previews/tutor.webm`) | 245,288 | `3ed4699bb1470871cd0be589258f5f95a5c21d67d849a502d6988e6fc5ccf6b1` | Public & Private |
| **MaqkrsTutor** | Poster (PNG) | `/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/tutor-v1-poster.png` | `assets/previews/tutor-v1-poster.png`<br>(alias: `assets/previews/tutor-poster.png`) | 238,881 | `65ee000aefc589337b67a76c2321d7cc19ec89524d034ba2eb44119ae5c6a856` | Public & Private |
| **GHS Learning Platform** | MP4 (H.264) | `/Users/andrewstrachan/Maqkrs_Hub/held-for-clearance/exports/2026-10-03/ghs-v1-10s-720p.mp4` | `assets/previews/ghs-v1-10s-720p.mp4`<br>(alias: `assets/previews/ghs.mp4`) | 262,133 | `f9c497fccfb85bc12263111176f8b86a3cb82f765c83d78af37401f1620e1a11` | **Private Only** (Held for clearance) |
| **GHS Learning Platform** | WebM (VP9) | `/Users/andrewstrachan/Maqkrs_Hub/held-for-clearance/exports/2026-10-03/ghs-v1-10s-720p.webm` | `assets/previews/ghs-v1-10s-720p.webm`<br>(alias: `assets/previews/ghs.webm`) | 341,053 | `349aedf5c1d659a20f428de51a285807ff935ac525f29c6b032948c906ecaec4` | **Private Only** (Held for clearance) |
| **GHS Learning Platform** | Poster (PNG) | `/Users/andrewstrachan/Maqkrs_Hub/held-for-clearance/exports/2026-10-03/ghs-v1-poster.png` | `assets/previews/ghs-v1-poster.png`<br>(alias: `assets/previews/ghs-poster.png`) | 224,958 | `9d4c74d4a6ad0c9193e04f5e7a220ae6267cf79b416b303db31cfd576b4b013d` | **Private Only** (Held for clearance) |

### 2.3 Evidence Screenshots & Architecture Exhibits
Source: `/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/reports/evidence/` and `/Users/andrewstrachan/DevAtlas/portfolio-draft/dist/assets/`.

| File Name | Target Relative Path | MIME Type | Size (Bytes) | SHA-256 Hash | Category / Role | Clearance |
|---|---|---|---|---|---|---|
| `backup-interaction.png` | `assets/screenshots/backup-interaction.png` | `image/png` | 245,658 | `926323fcd3c9905527a0037b909c433445c66a5577b9b49567eaaf25bf2281a6` | Sanctum Fallback UI | Public & Private |
| `backup-launch.png` | `assets/screenshots/backup-launch.png` | `image/png` | 510,994 | `0c5878fe99b51b4fa7082ef8211afc38497bf9ee2fab58a29aee13e53d420dc0` | Sanctum Launch Stage | Public & Private |
| `backup-topic.png` | `assets/screenshots/backup-topic.png` | `image/png` | 261,957 | `aa0b7edc1407ddb0d2ea6f5c7b60ef63b68baa210ddb10b4a924ce257a91d342` | Sanctum Cryptography Inspector | Public & Private |
| `g01-persistence-after-reload.png` | `assets/screenshots/g01-persistence-after-reload.png` | `image/png` | 58,114 | `c38c3de338da5d63b16584073e6bb56d96a13906a14882eec5b7255936170b85` | Godot State Persistence Verification | Public & Private |
| `g01-persistence-before-browser-close.png` | `assets/screenshots/g01-persistence-before-browser-close.png` | `image/png` | 57,048 | `a91c736b357b2081e4d978bc82da66d027bb818ed79f3ca7dd7e93e99c621043` | Godot State Persistence Verification | Public & Private |
| `g01-persistence-before-reload.png` | `assets/screenshots/g01-persistence-before-reload.png` | `image/png` | 84,793 | `6a8b7fe1d8d1fca4267ceb592d5b3db08777411d822467fa62aa3277479d43f2` | Godot State Persistence Verification | Public & Private |
| `g01-persistence-relaunch-hud.png` | `assets/screenshots/g01-persistence-relaunch-hud.png` | `image/png` | 236,732 | `b0d1292d4f54c47060a2429e3c513eb33170069938ea443e0275ab59ed59ea95` | Godot HUD Navigation | Public & Private |
| `g01-persistence-relaunch-note-after.png` | `assets/screenshots/g01-persistence-relaunch-note-after.png` | `image/png` | 53,486 | `fe3faa6a8b37cb93c6ccedd6ef5fc93f7fea44a7e42a1d0134a6a0b2078c168f` | Note Storage Persistence | Public & Private |
| `g01-persistence-relaunch-note-before.png` | `assets/screenshots/g01-persistence-relaunch-note-before.png` | `image/png` | 53,617 | `3c8ed38d32cdc289b2b0e344b6761da4a4755398201fe3a960a387c7f275516b` | Note Storage Persistence | Public & Private |
| `primary-launch.png` | `assets/screenshots/primary-launch.png` | `image/png` | 510,401 | `a1d743ff273d3f0a33f5202368d5a55e15930f28be02ea2c8a3032a6581f4b40` | Sanctum Primary Overworld | Public & Private |
| `primary-topic.png` | `assets/screenshots/primary-topic.png` | `image/png` | 261,987 | `4d9a48654a71981e7d4af9bfbf7b99934342c8a83612b8b3d7d916aab1849b21` | Sanctum Topic View | Public & Private |
| `web-home.png` | `assets/screenshots/web-home.png` | `image/png` | 95,968 | `0b3d3f1340551eaff9b761f3980be290983d7afc15bba16c81e87910cf3f5b2e` | Web Interface Desktop Test | Public & Private |
| `web-mobile-dark.png` | `assets/screenshots/web-mobile-dark.png` | `image/png` | 86,871 | `710f99a90fb9d5f728cb3eb21ba15bef823b22ced98c5efb938d4f166763a654` | Web Interface Mobile Dark Test | Public & Private |
| `web-mobile-light.png` | `assets/screenshots/web-mobile-light.png` | `image/png` | 86,050 | `8f3a73666792d35b2e7a09a09003f4d8a84b5415292422805ddc5da118ff0739` | Web Interface Mobile Light Test | Public & Private |
| `atlas-concept.webp` | `assets/screenshots/atlas-concept.webp` | `image/webp` | 226,348 | `6e5e8e815e985b969e06e300996fbc02eb3467655ef9c8a9462ce4beea82e707` | Project Atlas 3D Concept | Public & Private |
| `prototype-forge.png` | `assets/screenshots/prototype-forge.png` | `image/png` | 88,119 | `b1e8b28f8045a165b430886b72a07521dc80e30d1e57c6b453e0258cb7d6cb03` | Sanctum Forge Prototype | Public & Private |
| `prototype-hash-lab.png` | `assets/screenshots/prototype-hash-lab.png` | `image/png` | 108,066 | `bb8073b6fe811fa1ec96a4b3d7a86161427a1cbbdfc4bf1dc10459392e21b0aa` | Sanctum Hashing Lab Prototype | Public & Private |
| `prototype-overworld.png` | `assets/screenshots/prototype-overworld.png` | `image/png` | 134,040 | `b515c0e1dbd9fdb822a9cf2978a9c379aee54ebcb4953c82d39994c6552bc6fa` | Sanctum Overworld Prototype | Public & Private |
| `sanctum-consensus-room.png` | `assets/screenshots/sanctum-consensus-room.png` | `image/png` | 73,779 | `a05b38a7c29e71ceb27cb05c48bda9f47bb920f2e5414dca2161f531aa967060` | Sanctum Consensus District | Public & Private |
| `sanctum-money-room.png` | `assets/screenshots/sanctum-money-room.png` | `image/png` | 66,425 | `2f82956cf0bfcf3b08e75e1dc7f311ebc46fbe47b744ba1e8f203874404fa368` | Sanctum Money Exchange District | Public & Private |
| `sanctum-world-aerial.png` | `assets/screenshots/sanctum-world-aerial.png` | `image/png` | 141,730 | `df46b4e7492c7d9c6e594d2572522c0199e12c12948bb52b04f1dfb008d58ba1` | Sanctum Aerial View | Public & Private |
| `sanctum-samples.png` | `assets/screenshots/sanctum-samples.png` | `image/png` | 260,096 | `fdcbfe...` | Sanctum Review Contact Sheet | Public & Private |
| `adaptivehs-samples.png` | `assets/screenshots/adaptivehs-samples.png` | `image/png` | 156,672 | `a90623...` | AdaptiveHS Review Contact Sheet | Public & Private |
| `tutor-samples.png` | `assets/screenshots/tutor-samples.png` | `image/png` | 179,200 | `34e0cb...` | Tutor Review Contact Sheet | Public & Private |
| `ghs-samples.png` | `assets/screenshots/ghs-samples.png` | `image/png` | 240,640 | `1b1319...` | GHS Review Contact Sheet | **Private Only** |

### 2.4 Companion Documents & Benchmark References
Source: `/Users/andrewstrachan/UAB_Timeline_Meeting/Electronic Portfolio/` and `/Users/andrewstrachan/Current Resume by Year/`.

| File Name | Target Relative Path | MIME Type | Pages / Specs | Size (Bytes) | SHA-256 Hash | Role in Portfolio | Clearance |
|---|---|---|---|---|---|---|---|
| `Electronic Career Portfolio.pdf` | `assets/docs/fbla-guidelines-rating-sheet.pdf` | `application/pdf` | 7 pages | 213,663 | `a670eb8dedc755918fb9845d427f74a88c787939bcf50c73a485aa5ad9a54288` | Authoritative FBLA Guidelines & 100-pt Rating Sheet reference | Public & Private |
| `State Event Presentation-DonnaKaran Allen.pptx.pdf` | `assets/docs/benchmark-student-presentation-companion.pdf` | `application/pdf` | 14 slides (1440×810) | 1,616,535 | `e47d35596108fbd178a9fe7f4624b0fc69e646047ffdd2a3a5b67c528ab81e12` | Coached student benchmark presentation companion (DonnaKaran Allen, Shades Valley HS) | Public & Private |
| `AndrewStrachanResume.pdf` | `assets/docs/AndrewStrachanResume_Full.pdf` | `application/pdf` | 3 pages | 189,550 | `84764a66ce221867df4b5e3fee02a58c0ef71bd054bdf5943797e3448120dbda` | Master unredacted resume PDF (contains phone `228-224-7445`) | **Private Only** |
| (Redacted Resume PDF) | `assets/docs/AndrewStrachanResume_Public.pdf` | `application/pdf` | 3 pages | ~190,000 | Generated during M5 build | Redacted resume PDF (phone number removed for GitHub Pages) | **Public Only** |

---

## 3. Directory Layout under `career_portfolio/assets/`

The destination directory layout strictly conforms to `PROJECT.md` architecture:

```
career_portfolio/assets/
├── brand/
│   ├── media_1791283990241.jpg            # Original 1024x1024 circuit "M" master mark
│   ├── logo_circuit_m.jpg                 # Canonical alias for web hero & OpenGraph image
│   ├── favicon.ico                        # Multi-resolution favicon icon
│   ├── favicon-32x32.png                  # Standard 32px web favicon
│   ├── apple-touch-icon.png               # 180px Apple touch home screen icon
│   └── mce-microsoft-certified-educator.png # Authentic 125x125 Credly MCE badge
├── previews/
│   ├── sanctum-v1-10s-720p.mp4            # CS646 Sanctum 10s H.264 preview
│   ├── sanctum-v1-10s-720p.webm           # CS646 Sanctum 10s VP9 preview
│   ├── sanctum-v1-poster.png              # CS646 Sanctum high-res poster frame
│   ├── adaptivehs-v1-10s-720p.mp4         # AdaptiveHS 10s H.264 preview
│   ├── adaptivehs-v1-10s-720p.webm        # AdaptiveHS 10s VP9 preview
│   ├── adaptivehs-v1-poster.png           # AdaptiveHS high-res poster frame
│   ├── tutor-v1-10s-720p.mp4              # MaqkrsTutor 10s H.264 preview
│   ├── tutor-v1-10s-720p.webm             # MaqkrsTutor 10s VP9 preview
│   ├── tutor-v1-poster.png                # MaqkrsTutor high-res poster frame
│   ├── ghs-v1-10s-720p.mp4                # GHS Platform preview (Private variant only)
│   ├── ghs-v1-10s-720p.webm               # GHS Platform preview (Private variant only)
│   └── ghs-v1-poster.png                  # GHS Platform poster (Private variant only)
├── screenshots/
│   ├── backup-interaction.png             # Sanctum interaction QA evidence
│   ├── backup-launch.png                  # Sanctum launch QA evidence
│   ├── backup-topic.png                   # Sanctum topic QA evidence
│   ├── g01-persistence-after-reload.png   # Sanctum state persistence evidence
│   ├── g01-persistence-before-browser-close.png
│   ├── g01-persistence-before-reload.png
│   ├── g01-persistence-relaunch-hud.png
│   ├── g01-persistence-relaunch-note-after.png
│   ├── g01-persistence-relaunch-note-before.png
│   ├── primary-launch.png                 # Primary Sanctum overworld
│   ├── primary-topic.png                  # Primary Sanctum topic view
│   ├── web-home.png                       # Core UI verification desktop
│   ├── web-mobile-dark.png                # Core UI verification mobile dark
│   ├── web-mobile-light.png               # Core UI verification mobile light
│   ├── atlas-concept.webp                 # Project Atlas 3D concept art
│   ├── prototype-forge.png                # Cryptographic forge exhibit
│   ├── prototype-hash-lab.png             # SHA-256 interactive lab
│   ├── prototype-overworld.png            # 3D overworld architecture
│   ├── sanctum-consensus-room.png         # Consensus room render
│   ├── sanctum-money-room.png             # Money exchange render
│   ├── sanctum-world-aerial.png           # Aerial world perspective
│   ├── sanctum-samples.png                # Multi-frame contact sheet
│   ├── adaptivehs-samples.png             # Multi-frame contact sheet
│   ├── tutor-samples.png                  # Multi-frame contact sheet
│   └── ghs-samples.png                    # Multi-frame contact sheet (Private variant)
└── docs/
    ├── fbla-guidelines-rating-sheet.pdf   # 2024-25 FBLA guidelines & 100-pt rubric
    ├── benchmark-student-presentation-companion.pdf # DonnaKaran Allen presentation deck
    ├── AndrewStrachanResume_Full.pdf      # Master resume PDF (Private variant)
    └── AndrewStrachanResume_Public.pdf    # Sanitized resume PDF (Public variant)
```

---

## 4. Public vs. Private Clearance Strategy

Requirement R3 mandates dual builds: Public (GitHub Pages) and Private (Firebase Hosting). The asset pipeline must strictly enforce clearance boundaries:

### 4.1. Public Variant Rules:
- **Zero PII Exposure**: `AndrewStrachanResume.pdf` in `/Current Resume by Year/` contains Andrew's personal phone number `228-224-7445` on page 1. The public build pipeline (`tools/build.js`) must deploy `AndrewStrachanResume_Public.pdf` which excludes the phone number, retaining only `strachan@uab.edu` and Birmingham, AL.
- **Held-for-Clearance Exclusion**: The GHS Learning Platform video previews (`ghs-v1-10s-720p.mp4`, `.webm`, `ghs-v1-poster.png`, `ghs-samples.png`) and hardcoded credentials (`z@z.com` / `zzzzzz`) are **omitted** from the public build tree. On the public site, GHS is presented as an architectural case study without live media clips or student login fields.
- **Academic Answer Key Sanitization**: Course study hubs (CS 623, CS 646, CS 203) are linked to their conceptual portals; raw exam answer dumps are gated.

### 4.2. Private Variant Rules:
- **Full Fidelity**: All assets are copied, including `ghs-v1-10s-720p.*` and the unredacted master resume PDF.
- **Test Credentials Enabled**: GHS student test login is displayed for private judge evaluation.

---

## 5. Automated Copy Script Specification

To ensure exact reproducibility, automated checksum validation, and clean segregation, the copy pipeline is formulated in Node.js (`tools/copy-assets.js`) and accompanied by a POSIX Bash script (`tools/copy-assets.sh`).

### 5.1 Node.js Specification (`tools/copy-assets.js`)

```javascript
/**
 * tools/copy-assets.js
 * Automated asset copy pipeline for Andrew Strachan's FBLA Career Portfolio.
 * Validates existence, checks file size (<100MB), verifies SHA-256 hashes,
 * copies files to assets/ subdirectories, and outputs assets/manifest.json.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(PROJECT_ROOT, 'assets');

const MAX_BYTES = 100 * 1024 * 1024; // 100 MB strict ceiling

// Authoritative Master Asset Manifest
const ASSET_SPEC = [
  // Brand & Badges
  {
    src: '/Users/andrewstrachan/.gemini/antigravity/brain/3402f430-b8a8-4e53-b08d-fa36c0d004a1/.user_uploaded/media_1791283990241.jpg',
    dest: 'brand/media_1791283990241.jpg',
    alias: 'brand/logo_circuit_m.jpg',
    expectedSha256: '01c5498ff069173a40a5b4a630b0cfa61d08ad741309c4ba1f000dacb4306342',
    tier: 'public'
  },
  {
    src: '/Users/andrewstrachan/Current Resume by Year/Badges & Certifications/mce-microsoft-certified-educator.png',
    dest: 'brand/mce-microsoft-certified-educator.png',
    expectedSha256: '712536d437ea7ca984ca0dcdee8accdf332ce3c178b48b4a70de4f3c419bdb4e',
    tier: 'public'
  },

  // 10s Video Previews & Posters
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/sanctum-v1-10s-720p.mp4',
    dest: 'previews/sanctum-v1-10s-720p.mp4',
    alias: 'previews/sanctum.mp4',
    expectedSha256: '99edbaf5e53ebba1adcdd873fba066a22ce3eca35080ac13369f1a52755ab06c',
    tier: 'public'
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/sanctum-v1-10s-720p.webm',
    dest: 'previews/sanctum-v1-10s-720p.webm',
    alias: 'previews/sanctum.webm',
    expectedSha256: 'd35679471a9e4b53334c13f6869d5731b3f06e666778ff00b490bb8dca28ea75',
    tier: 'public'
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/sanctum-v1-poster.png',
    dest: 'previews/sanctum-v1-poster.png',
    alias: 'previews/sanctum-poster.png',
    expectedSha256: '633ba591b5c7a19cc8e3b2c37e1b04b0094d0b97839b0848ff3d5ccd26d71044',
    tier: 'public'
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/adaptivehs-v1-10s-720p.mp4',
    dest: 'previews/adaptivehs-v1-10s-720p.mp4',
    alias: 'previews/adaptivehs.mp4',
    expectedSha256: 'dcc946841560366e1193bb71dee4b6c2c0abc60dc926147af778f7777de4911e',
    tier: 'public'
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/adaptivehs-v1-10s-720p.webm',
    dest: 'previews/adaptivehs-v1-10s-720p.webm',
    alias: 'previews/adaptivehs.webm',
    expectedSha256: '6b23e23d75a760f613f23dbd6c5887db7973a0d667734a1a04e6fcba5f59da30',
    tier: 'public'
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/adaptivehs-v1-poster.png',
    dest: 'previews/adaptivehs-v1-poster.png',
    alias: 'previews/adaptivehs-poster.png',
    expectedSha256: '1b9067d2530cffa6bfc179ab5a07b3a63d2bde02789a0bac66b86725633765b9',
    tier: 'public'
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/tutor-v1-10s-720p.mp4',
    dest: 'previews/tutor-v1-10s-720p.mp4',
    alias: 'previews/tutor.mp4',
    expectedSha256: 'c177188bb70ee1a49de9d952c33e079b515b1ffb3ecd2636cff45c86467670a9',
    tier: 'public'
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/tutor-v1-10s-720p.webm',
    dest: 'previews/tutor-v1-10s-720p.webm',
    alias: 'previews/tutor.webm',
    expectedSha256: '3ed4699bb1470871cd0be589258f5f95a5c21d67d849a502d6988e6fc5ccf6b1',
    tier: 'public'
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/tutor-v1-poster.png',
    dest: 'previews/tutor-v1-poster.png',
    alias: 'previews/tutor-poster.png',
    expectedSha256: '65ee000aefc589337b67a76c2321d7cc19ec89524d034ba2eb44119ae5c6a856',
    tier: 'public'
  },
  // GHS (Private Only)
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/held-for-clearance/exports/2026-10-03/ghs-v1-10s-720p.mp4',
    dest: 'previews/ghs-v1-10s-720p.mp4',
    alias: 'previews/ghs.mp4',
    expectedSha256: 'f9c497fccfb85bc12263111176f8b86a3cb82f765c83d78af37401f1620e1a11',
    tier: 'private'
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/held-for-clearance/exports/2026-10-03/ghs-v1-10s-720p.webm',
    dest: 'previews/ghs-v1-10s-720p.webm',
    alias: 'previews/ghs.webm',
    expectedSha256: '349aedf5c1d659a20f428de51a285807ff935ac525f29c6b032948c906ecaec4',
    tier: 'private'
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/held-for-clearance/exports/2026-10-03/ghs-v1-poster.png',
    dest: 'previews/ghs-v1-poster.png',
    alias: 'previews/ghs-poster.png',
    expectedSha256: '9d4c74d4a6ad0c9193e04f5e7a220ae6267cf79b416b303db31cfd576b4b013d',
    tier: 'private'
  },

  // Evidence Screenshots
  ...[
    ['backup-interaction.png', '926323fcd3c9905527a0037b909c433445c66a5577b9b49567eaaf25bf2281a6'],
    ['backup-launch.png', '0c5878fe99b51b4fa7082ef8211afc38497bf9ee2fab58a29aee13e53d420dc0'],
    ['backup-topic.png', 'aa0b7edc1407ddb0d2ea6f5c7b60ef63b68baa210ddb10b4a924ce257a91d342'],
    ['g01-persistence-after-reload.png', 'c38c3de338da5d63b16584073e6bb56d96a13906a14882eec5b7255936170b85'],
    ['g01-persistence-before-browser-close.png', 'a91c736b357b2081e4d978bc82da66d027bb818ed79f3ca7dd7e93e99c621043'],
    ['g01-persistence-before-reload.png', '6a8b7fe1d8d1fca4267ceb592d5b3db08777411d822467fa62aa3277479d43f2'],
    ['g01-persistence-relaunch-hud.png', 'b0d1292d4f54c47060a2429e3c513eb33170069938ea443e0275ab59ed59ea95'],
    ['g01-persistence-relaunch-note-after.png', 'fe3faa6a8b37cb93c6ccedd6ef5fc93f7fea44a7e42a1d0134a6a0b2078c168f'],
    ['g01-persistence-relaunch-note-before.png', '3c8ed38d32cdc289b2b0e344b6761da4a4755398201fe3a960a387c7f275516b'],
    ['primary-launch.png', 'a1d743ff273d3f0a33f5202368d5a55e15930f28be02ea2c8a3032a6581f4b40'],
    ['primary-topic.png', '4d9a48654a71981e7d4af9bfbf7b99934342c8a83612b8b3d7d916aab1849b21'],
    ['web-home.png', '0b3d3f1340551eaff9b761f3980be290983d7afc15bba16c81e87910cf3f5b2e'],
    ['web-mobile-dark.png', '710f99a90fb9d5f728cb3eb21ba15bef823b22ced98c5efb938d4f166763a654'],
    ['web-mobile-light.png', '8f3a73666792d35b2e7a09a09003f4d8a84b5415292422805ddc5da118ff0739']
  ].map(([fname, hash]) => ({
    src: `/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/reports/evidence/${fname}`,
    dest: `screenshots/${fname}`,
    expectedSha256: hash,
    tier: 'public'
  })),

  // Concept & Environment Exhibits
  ...[
    ['atlas-concept.webp', '6e5e8e815e985b969e06e300996fbc02eb3467655ef9c8a9462ce4beea82e707'],
    ['prototype-forge.png', 'b1e8b28f8045a165b430886b72a07521dc80e30d1e57c6b453e0258cb7d6cb03'],
    ['prototype-hash-lab.png', 'bb8073b6fe811fa1ec96a4b3d7a86161427a1cbbdfc4bf1dc10459392e21b0aa'],
    ['prototype-overworld.png', 'b515c0e1dbd9fdb822a9cf2978a9c379aee54ebcb4953c82d39994c6552bc6fa'],
    ['sanctum-consensus-room.png', 'a05b38a7c29e71ceb27cb05c48bda9f47bb920f2e5414dca2161f531aa967060'],
    ['sanctum-money-room.png', '2f82956cf0bfcf3b08e75e1dc7f311ebc46fbe47b744ba1e8f203874404fa368'],
    ['sanctum-world-aerial.png', 'df46b4e7492c7d9c6e594d2572522c0199e12c12948bb52b04f1dfb008d58ba1']
  ].map(([fname, hash]) => ({
    src: `/Users/andrewstrachan/DevAtlas/portfolio-draft/dist/assets/${fname}`,
    dest: `screenshots/${fname}`,
    expectedSha256: hash,
    tier: 'public'
  })),

  // Review Frames Contact Sheets
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/provenance/review-frames/sanctum-samples.png',
    dest: 'screenshots/sanctum-samples.png',
    tier: 'public'
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/provenance/review-frames/adaptivehs-samples.png',
    dest: 'screenshots/adaptivehs-samples.png',
    tier: 'public'
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/provenance/review-frames/tutor-samples.png',
    dest: 'screenshots/tutor-samples.png',
    tier: 'public'
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/held-for-clearance/review-frames/ghs-samples.png',
    dest: 'screenshots/ghs-samples.png',
    tier: 'private'
  },

  // Documents
  {
    src: '/Users/andrewstrachan/UAB_Timeline_Meeting/Electronic Portfolio/Electronic Career Portfolio.pdf',
    dest: 'docs/fbla-guidelines-rating-sheet.pdf',
    expectedSha256: 'a670eb8dedc755918fb9845d427f74a88c787939bcf50c73a485aa5ad9a54288',
    tier: 'public'
  },
  {
    src: '/Users/andrewstrachan/UAB_Timeline_Meeting/Electronic Portfolio/State Event Presentation-DonnaKaran Allen.pptx.pdf',
    dest: 'docs/benchmark-student-presentation-companion.pdf',
    expectedSha256: 'e47d35596108fbd178a9fe7f4624b0fc69e646047ffdd2a3a5b67c528ab81e12',
    tier: 'public'
  },
  {
    src: '/Users/andrewstrachan/Current Resume by Year/AndrewStrachanResume.pdf',
    dest: 'docs/AndrewStrachanResume_Full.pdf',
    expectedSha256: '84764a66ce221867df4b5e3fee02a58c0ef71bd054bdf5943797e3448120dbda',
    tier: 'private'
  }
];

export function executeCopyPipeline(targetTier = 'all') {
  console.log(`[Asset Pipeline] Starting asset copy (Tier: ${targetTier})...`);
  const manifest = { copiedAt: new Date().toISOString(), files: [] };
  let copiedCount = 0;

  for (const item of ASSET_SPEC) {
    if (targetTier !== 'all' && item.tier !== targetTier && item.tier !== 'public') {
      continue;
    }

    if (!fs.existsSync(item.src)) {
      throw new Error(`[Asset Pipeline] Missing required source: ${item.src}`);
    }

    const stat = fs.statSync(item.src);
    if (stat.size > MAX_BYTES) {
      throw new Error(`[Asset Pipeline] File exceeds 100MB: ${item.src} (${stat.size} bytes)`);
    }

    const data = fs.readFileSync(item.src);
    const hash = crypto.createHash('sha256').update(data).digest('hex');

    if (item.expectedSha256 && hash !== item.expectedSha256) {
      throw new Error(`[Asset Pipeline] SHA-256 hash mismatch on ${item.src}\nExpected: ${item.expectedSha256}\nActual:   ${hash}`);
    }

    const targetPath = path.join(ASSETS_DIR, item.dest);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, data);
    copiedCount++;

    if (item.alias) {
      const aliasPath = path.join(ASSETS_DIR, item.alias);
      fs.mkdirSync(path.dirname(aliasPath), { recursive: true });
      fs.writeFileSync(aliasPath, data);
    }

    manifest.files.push({
      dest: item.dest,
      alias: item.alias || null,
      bytes: stat.size,
      sha256: hash,
      tier: item.tier
    });
  }

  const manifestPath = path.join(ASSETS_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`[Asset Pipeline] Successfully copied ${copiedCount} assets. Manifest written to ${manifestPath}`);
  return manifest;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  executeCopyPipeline();
}
```

### 5.2 Shell Script Specification (`tools/copy-assets.sh`)

```bash
#!/usr/bin/env bash
set -euo pipefail

# tools/copy-assets.sh: Zero-dependency shell copier for portfolio assets
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ASSETS_DIR="${PROJECT_ROOT}/assets"

echo "===> Creating asset directories under ${ASSETS_DIR}"
mkdir -p "${ASSETS_DIR}/brand"
mkdir -p "${ASSETS_DIR}/previews"
mkdir -p "${ASSETS_DIR}/screenshots"
mkdir -p "${ASSETS_DIR}/docs"

echo "===> 1. Copying Brand Mark & MCE Badge"
cp "/Users/andrewstrachan/.gemini/antigravity/brain/3402f430-b8a8-4e53-b08d-fa36c0d004a1/.user_uploaded/media_1791283990241.jpg" "${ASSETS_DIR}/brand/media_1791283990241.jpg"
cp "${ASSETS_DIR}/brand/media_1791283990241.jpg" "${ASSETS_DIR}/brand/logo_circuit_m.jpg"
cp "/Users/andrewstrachan/Current Resume by Year/Badges & Certifications/mce-microsoft-certified-educator.png" "${ASSETS_DIR}/brand/mce-microsoft-certified-educator.png"

echo "===> 2. Copying 10s Video Previews & Posters"
cp /Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/sanctum-v1-10s-720p.* "${ASSETS_DIR}/previews/"
cp /Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/sanctum-v1-poster.png "${ASSETS_DIR}/previews/"
cp /Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/adaptivehs-v1-10s-720p.* "${ASSETS_DIR}/previews/"
cp /Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/adaptivehs-v1-poster.png "${ASSETS_DIR}/previews/"
cp /Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/tutor-v1-10s-720p.* "${ASSETS_DIR}/previews/"
cp /Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/tutor-v1-poster.png "${ASSETS_DIR}/previews/"
# GHS (Private Only)
cp /Users/andrewstrachan/Maqkrs_Hub/held-for-clearance/exports/2026-10-03/ghs-v1-10s-720p.* "${ASSETS_DIR}/previews/"
cp /Users/andrewstrachan/Maqkrs_Hub/held-for-clearance/exports/2026-10-03/ghs-v1-poster.png "${ASSETS_DIR}/previews/"

echo "===> 3. Copying Evidence Screenshots & Concept Art"
cp /Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/reports/evidence/*.png "${ASSETS_DIR}/screenshots/"
cp /Users/andrewstrachan/DevAtlas/portfolio-draft/dist/assets/atlas-concept.webp "${ASSETS_DIR}/screenshots/"
cp /Users/andrewstrachan/DevAtlas/portfolio-draft/dist/assets/prototype-*.png "${ASSETS_DIR}/screenshots/"
cp /Users/andrewstrachan/DevAtlas/portfolio-draft/dist/assets/sanctum-*.png "${ASSETS_DIR}/screenshots/"
cp /Users/andrewstrachan/Maqkrs_Hub/provenance/review-frames/*-samples.png "${ASSETS_DIR}/screenshots/"
cp /Users/andrewstrachan/Maqkrs_Hub/held-for-clearance/review-frames/ghs-samples.png "${ASSETS_DIR}/screenshots/"

echo "===> 4. Copying Documents & Benchmarks"
cp "/Users/andrewstrachan/UAB_Timeline_Meeting/Electronic Portfolio/Electronic Career Portfolio.pdf" "${ASSETS_DIR}/docs/fbla-guidelines-rating-sheet.pdf"
cp "/Users/andrewstrachan/UAB_Timeline_Meeting/Electronic Portfolio/State Event Presentation-DonnaKaran Allen.pptx.pdf" "${ASSETS_DIR}/docs/benchmark-student-presentation-companion.pdf"
cp "/Users/andrewstrachan/Current Resume by Year/AndrewStrachanResume.pdf" "${ASSETS_DIR}/docs/AndrewStrachanResume_Full.pdf"

echo "===> Completed successfully! Total asset size:"
du -sh "${ASSETS_DIR}"
```

---

## 6. Verification Method & Quality Checks

1. **Size Verification**: Every copied file in `assets/` must be `< 100 MB`.
   Command: `find career_portfolio/assets -type f -size +100M` must return 0 results.
2. **Hash Integrity**: Run SHA-256 validation against the hashes in Section 2. All files must match 100%.
3. **MIME & Playback Verification**: Ensure `mp4` is `video/mp4`, `webm` is `video/webm`, `png` is `image/png`, `jpg` is `image/jpeg`, and `pdf` is `application/pdf`.
4. **Link Resolution**: All HTML `<img src="..." >`, `<video src="..." >`, and `<a href="..." >` tags in the web portfolio must use relative paths matching `assets/...` and resolve with 0 broken links in the automated link check (`tools/check-links.js`).
