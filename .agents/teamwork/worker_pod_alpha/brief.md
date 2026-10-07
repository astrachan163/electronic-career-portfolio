# Worker Pod Alpha Brief: UI/UX & Responsive Animation Overhaul

## Mission
Implement the full UI/UX and responsive architecture overhaul on Andrew Strachan's Career Portfolio (`/Users/andrewstrachan/career_portfolio`).

## Inputs to Read
1. `/Users/andrewstrachan/career_portfolio/.agents/teamwork/ORIGINAL_REQUEST.md` (Blueprint §1 & §2)
2. `/Users/andrewstrachan/career_portfolio/.agents/teamwork/orchestrator_mobile_revamp/PROJECT.md`
3. Explorer 1 findings: `/Users/andrewstrachan/career_portfolio/.agents/teamwork/explorer_ui_canvas/analysis.md` and `handoff.md`
4. Explorer 2 findings: `/Users/andrewstrachan/career_portfolio/.agents/teamwork/explorer_ia_frames/analysis.md` and `handoff.md`

## Required Implementations
1. **Sticky Window Canvas Pipeline**:
   - In `styles/main.css` and `index.html`, ensure the hero canvas/interactive pipeline uses:
     ```css
     .sticky-canvas-wrapper { height: 400dvh; position: relative; }
     .sticky-canvas-inner { position: sticky; top: 0; height: 100dvh; z-index: 1; pointer-events: none; }
     .interactive-card { pointer-events: auto; position: relative; z-index: 2; }
     ```
   - Bind these classes to the DOM elements in `index.html` so that mobile browsers scrubbing see the pinned canvas behavior without layout jumping. Use `100dvh` dynamic viewport units.

2. **Polymorphic Media Modal Player**:
   - In `index.html`, add explicit `data-type="image"` to all `.pd-card-img` elements and `data-type="video"` to all `.preview-video-element` video preview triggers.
   - Update `clickableMedia` query in `js/app.js` to ensure `.preview-video-element` and all `[data-type="video"]` are clickable and launch `#video-modal`.
   - Update close button in `index.html` (id `btn-modal-close`) to include `.modal-close-btn`. In `styles/main.css`, ensure `.modal-close-btn { z-index: 9999; pointer-events: auto; }`.
   - In `js/app.js`, add `'touchend'` listener alongside `'click'` for backdrop tap-to-close.
   - When closing/dismissing modal (via close button, backdrop click, or ESC key), ensure any playing `<video>` element is paused (`video.pause()`) and reset to avoid background audio leakage.
   - Fix modal header ellipsis truncation: In `styles/components.css` / `styles/main.css`, add `min-width: 0; flex: 1;` to `.modal-title` / `.modal-header-fix` inside flex container `.modal-header`.

3. **Touch Navigation & Keyboard Cues**:
   - Wrap keyboard shortcuts (`.presenter-keyboard-shortcuts` in `index.html` lines 1520–1526) in `.nav-cues`.
   - In `styles/main.css` / `styles/components.css`, enforce:
     ```css
     .nav-cues { display: none; }
     @media (hover: hover) and (pointer: fine) {
       .nav-cues { display: flex; }
     }
     ```
   - On touch devices, replace or complement with touch gesture / swipe indicators (`.mobile-swipe-cues`).

4. **Information Architecture & Collapsible Accordion Cards (Frames 1 & 2)**:
   - Convert the 4 academic cards (UMMC, Montevallo, MC, UAB) into a 4-tier interactive accordion:
     `.accordion` with `.accordion-header` and `.accordion-content`.
   - Add `.accordion.active .accordion-content { display: block; }` to CSS.
   - In `js/app.js`, wire accordion toggle event listeners (accessible with keyboard `Enter`/`Space` and touch/click).
   - Card 1: Collapsible "Medical & Life Sciences Foundation" (`Doctor of Medicine (M.D.) Candidate — 4 Years Coursework & Clinical Clerkships Completed (Incomplete as of 2020)`).
   - Card 2: "University of Montevallo — CTE Business & Finance" (`ALSDE Certified CTE Educator — Provisional Certificate in a Teaching Field (PCTF): Business, Marketing, and Finance`).
   - Card 3: "Mississippi College — B.S. ACS Biochemistry (Honors)".
   - Card 4: "University of Alabama at Birmingham — M.S. Cybersecurity" (`NSF CyberAICorps SFS Scholar`).

5. **Swipeable Skills Matrix & Filter Chips (Frames 3 & 4)**:
   - Update `.filter-chips-container` to horizontal swipe row:
     `overflow-x: auto; flex-wrap: nowrap; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; padding-bottom: 0.5rem;`
   - `.filter-chip { white-space: nowrap; flex-shrink: 0; scroll-snap-align: start; }`
   - Group skills into 2-column responsive grid on mobile with category badges and touch repos drawer.

6. **Interactive Salary Explorer Toggle (Frames 8 & 9)**:
   - Implement segmented control toggle: `[Industry (BLS)]` vs `[Federal (GS/DHA)]`.
   - Add click/touch listener in `js/app.js` to switch visibility between BLS Wage Table and Federal GS Pay Bands.
   - Convert BLS table on mobile (`@media (max-width: 640px)`) to vertical flex cards: Percentile badge, Annual Wage, Hourly Equivalent.

7. **Visual & Layout Fixes (Frames 5, 7, 10, 11)**:
   - Frame 5: Adjust `.timeline-container` padding on mobile (e.g. `padding-left: 1rem;` on screens <= 640px).
   - Frame 7: BLS SOC code (`15-1212.00`) and NICE codes in pill containers.
   - Frame 10: Fix left clipping on `#development` by ensuring proper padding and `box-sizing: border-box`.
   - Frame 11: Single Media Feature Card for Sun Herald (December 2018).

## Verification
- Run `node tests/runner.js` to ensure no test regressions.
- Document all changes, files modified, test results, and evidence in `handoff.md`.
