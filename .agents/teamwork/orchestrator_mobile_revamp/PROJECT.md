# Project: Andrew Strachan's Electronic Career Portfolio Revamp

## Architecture
Andrew Strachan's Electronic Career Portfolio is a high-performance, responsive web application built with vanilla HTML5, CSS3, and modern JavaScript, coupled with structured JSON data stores (`data/resume.json`, `data/certifications.json`, `data/provenance.json`). The application features interactive components including a Presenter Mode HUD, a Polymorphic Media Modal Player, Collapsible Educational Accordions, an Interactive Salary Explorer, and a Sticky Window Canvas Pipeline for intra-frame scroll scrubbing.

Build artifacts are deployed into `dist/public/` (for public GitHub Pages / `astrachan163.github.io` / `nonartificialsi.com`) and `dist/private/` (for private full-credential hosting).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Sticky Window Canvas Pipeline | `height: 400dvh` wrapper, sticky `top: 0; height: 100dvh; z-index: 1; pointer-events: none;`, interactive cards `pointer-events: auto;`, 100dvh units | M1 | Blueprint §1.B |
| 2 | Polymorphic Media Modal Player | Explicit `data-type="image"` vs `data-type="video"`, z-index 9999 close button, backdrop tap-to-close with touch & click listeners, audio pause on dismiss, flex min-width header ellipsis | M1 | Blueprint §1.D, Frames 12 & 13 |
| 3 | Touch Navigation Adjustments | Wrap keyboard navigation hints in `@media (hover: hover) and (pointer: fine)` to remove ghost arrow cues on mobile touch screens | M1 | Blueprint §1.C |
| 4 | Collapsible Educational Accordion | 4-tier interactive accordion for UAB, Montevallo, Mississippi College, and UMMC Medical Foundation (`.accordion.active .accordion-content { display: block; }`) | M2 | Blueprint §1.A, Frames 1 & 2 |
| 5 | Swipeable Skills Matrix & Filter Pills | Horizontal swipe row (`overflow-x: auto; white-space: nowrap; scroll-snap-type: x mandatory`), 2-column card grid with badges and repos drawer | M2 | Blueprint §1.A, Frames 3 & 4 |
| 6 | Mobile Timeline Card Padding | Optimize `.timeline-container` padding on narrow mobile viewports (<=640px) | M2 | Blueprint Frame 5 |
| 7 | STAR Technical Case Studies Formatting | Structured STAR cards with colored left-accent borders, architecture badges, direct repo links | M2 | Blueprint Frame 6 |
| 8 | Career Outlook Header Pill Badges | BLS SOC and NICE workforce codes in distinct pill containers with dynamic padding | M2 | Blueprint Frame 7 |
| 9 | Interactive Salary Explorer | Segmented toggle `[Industry (BLS)]` vs `[Federal (GS/DHA)]` and mobile table conversion to vertical flex cards | M2 | Blueprint Frames 8 & 9 |
| 10 | Professional Development Layout Fix | Remove asymmetrical left padding, fix box-sizing to eliminate clipping | M2 | Blueprint Frame 10 |
| 11 | Sun Herald Feature & Conference De-Duplication | Single Media Feature Card (Dec 2018), remove duplicate Kentucky Derby card, canonical Jump$tart title | M2 | Blueprint Frame 11, §3 |
| 12 | Master Resume & Timeline Reconciliation | Reconcile dates, titles, hours/week (10, 15-20, 20-40, 40 hrs/wk), UMMC MD Candidate phrasing, Montevallo PCTF, MC honors, scrub `pre-vetting` in `data/resume.json` | M3 | Blueprint §3 Matrix |
| 13 | Certifications & Provenance Synchronization | Synchronize `data/certifications.json` and append missing claims CLM-015 to CLM-022 in `data/provenance.json` | M3 | Blueprint §3 Matrix |
| 14 | Presenter Notes & Test Suite Alignment | Update `js/presenter.js`, `js/app.js`, and `tests/tier1-features/f07-educational-enhancement.test.js` to match de-duplicated conferences | M3 | Explorer 3 Audit |
| 15 | Build Distribution & Test Verification | Run `node tools/build.js` and `node tests/runner.js` across public and private targets | M3 | Build & Test Pipeline |
| 16 | Multi-Viewport & Adversarial E2E Verification | Comprehensive responsive testing at 375px, 768px, 1440px, console error audits, and forensic integrity audit | M4 | Quality Acceptance |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Pod Alpha: UI/UX & Responsive Animation Overhaul | Sticky canvas pipeline, polymorphic media modal, touch navigation fixes | None | DONE |
| M2 | Pod Beta: Information Architecture & 13 Frames Content | 4-tier education accordion, swipeable skills matrix, STAR styling, Salary Explorer toggle, Sun Herald card, conference de-duplication | M1 Interface Contracts | DONE |
| M3 | Pod Gamma: Credentials, Timeline & Data Synchronization | `data/resume.json`, `data/certifications.json`, `data/provenance.json`, `tests/tier1-features/f07-educational-enhancement.test.js`, build synchronization | M2 | DONE |
| M4 | E2E Testing, Adversarial Verification & Forensic Audit | Reviewers, Challengers, Forensic Auditor (`teamwork_preview_auditor`), responsive viewport testing (375px, 768px, 1440px), console audits | M1, M2, M3 | DONE |

## Interface Contracts
### UI Styles ↔ HTML Elements
- `.sticky-canvas-wrapper`: `height: 400dvh; position: relative;`
- `.sticky-canvas-inner`: `position: sticky; top: 0; height: 100dvh; z-index: 1; pointer-events: none;`
- `.interactive-card`: `pointer-events: auto; position: relative; z-index: 2;`
- Media Triggers: All clickable media elements must carry explicit `data-type="image"` or `data-type="video"`. `.preview-video-element` must be included in modal trigger selector.
- Modal Close Button: Must have `.modal-close-btn` class with `z-index: 9999; pointer-events: auto;`.
- Modal Title: `.modal-title` inside `.modal-header` must have `min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`.
- Keyboard Nav Cues: `.nav-cues` wrapped in `@media (hover: hover) and (pointer: fine)`.
- Accordion: `.accordion` with child `.accordion-header` and `.accordion-content`. When `.accordion.active`, `.accordion-content { display: block; }`.
- Salary Explorer: Toggle container `#salary-explorer-toggle` with `[data-mode="bls"]` and `[data-mode="gs"]`.

## Code Layout
- `index.html`: Primary single-page portfolio document
- `styles/main.css`: Core design system, CSS variables, utility classes, sticky canvas & modal rules
- `styles/components.css`: Specific component styles (accordions, timeline, cards, modals, tables)
- `js/app.js`: Interactive logic (modals, accordions, salary toggle, filtering, navigation)
- `js/presenter.js`: Presenter mode HUD, speaker notes, keyboard listener
- `data/resume.json`: Master dual-format resume data source
- `data/certifications.json`: Licensure, credentials, and honors
- `data/provenance.json`: Verifiable claims and evidence mapping
- `data/career.json`: BLS and federal wage percentiles and career research
- `tools/build.js`: Distribution packager for public and private releases
- `tests/`: Automated test suite (Tiers 1-4)
