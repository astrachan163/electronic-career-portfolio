# Handoff Report: Information Architecture & 13 Frames Content

**Agent**: Explorer 2 (Information Architecture & 13 Frames Content)  
**Recipient**: Parent / Builder Agents (Pod Alpha & Pod Beta)  
**Working Directory**: `/Users/andrewstrachan/career_portfolio/.agents/teamwork/explorer_ia_frames`  
**Status**: Completed (Hard Handoff)  
**Date**: 2026-10-07  

---

## 1. Observation

Direct code observations across the repository `/Users/andrewstrachan/career_portfolio`:

1. **Frame 1 & 2 (Medical & Education Stack)**:
   - `index.html:148-198`: Academic records are rendered inside `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">`. There are zero occurrences of `.accordion`, `.accordion-header`, `.accordion-content`, or `<details>/<summary>` in `index.html`.
   - `styles/main.css:735-736`: `.accordion { border: 1px solid var(--color-circuit-gold); margin-bottom: 1rem; }` and `.accordion-content { display: none; padding: 1rem; }` are declared, but `.accordion.active .accordion-content { display: block; }` is **completely missing**.
   - `index.html:165-166`: Montevallo heading is split (`<h4>University of Montevallo</h4>` + `<p>Teaching Field (PCTF)...</p>`), lacking the unified header "University of Montevallo — CTE Business & Finance".
   - `index.html:177-178`: Mississippi College heading is split (`<h4>Mississippi College</h4>` + `<p>B.S. ACS Biochemistry Honors...</p>`), lacking "Mississippi College — B.S. ACS Biochemistry (Honors)".
   - `index.html:189-190`: UMMC card heading is `<h4>University of Mississippi School of Medicine</h4>`, not collapsible "Medical & Life Sciences Foundation".

2. **Frame 3 & 4 (Technical Matrix & Repos Drawer)**:
   - `styles/components.css:52-57`: `.filter-chips-container` has `display: flex; flex-wrap: wrap; gap: 0.625rem; margin-bottom: 2rem;`. It does NOT have `overflow-x: auto; white-space: nowrap;` or horizontal scroll snap.
   - `index.html:211-239`: `#skills-matrix-display.skills-grid` is a flat cloud of 27 `.skill-item-pill` elements. There is no 2-column card grid, no domain category badges, and no touch-activated repos drawer.

3. **Frame 5 (Chronological Work History)**:
   - `index.html:241-372`: All 8 timeline milestones contain exact reconciled dates.
   - `styles/components.css:130-134`: `.timeline-container { padding-left: 2rem; }` has no mobile media queries, consuming 32px of narrow 375px viewports. Cards are static `.glass-card` elements without interactive expand/collapse or visual role badges.

4. **Frame 6 (STAR Accomplishments)**:
   - `index.html:375-460`: Contains only 6 STAR cards (STAR-01 to STAR-06). None contain repository links (`<a>` tags) or architecture badges.
   - `styles/components.css:223-231`: `.star-card` has `border: 1px solid var(--glass-border);`, with no colored left-accent border (`border-left: 3px solid ...`).

5. **Frame 7 (Career Research Outlook Header)**:
   - `index.html:475-490`: Static `margin-bottom: 2rem;`. BLS SOC code (`15-1212.00`) and NICE codes (`PR-CD-001`, `SP-ARC-002`) are embedded in plain text `<p>` and `<strong>` tags, not pill badges.

6. **Frames 8 & 9 (BLS Wage Table vs Federal Pay Bands / Salary Explorer)**:
   - `index.html:521-564` (BLS Table) and `index.html:567-595` (GS Bands) are rendered as two separate static vertical blocks stacked one after the other.
   - There is NO toggle button (`[Industry (BLS)]` vs `[Federal (GS/DHA)]`), no hiding/showing mechanism, and no tab handler in `js/app.js`.
   - The BLS table remains a standard HTML table in `.table-responsive-container` and does not convert to vertical flex cards on mobile.

7. **Frame 10 (Professional Development Padding & Left Clipping)**:
   - `styles/main.css:752`: `#development { padding-left: 16px; width: 100%; box-sizing: border-box; }` was appended. Because `#development .container` has `padding-inline: 1.5rem;` (24px), this creates asymmetrical padding (40px left vs 24px right) on desktop.

8. **Frame 11 (Sun Herald Feature & De-Duplication)**:
   - `index.html:738`: GiveGab/Sun Herald card displays `<span class="pd-badge-date">Community Stewardship · 2023–2025</span>` instead of **December 2018**.
   - `index.html:843-862`: "The Kentucky Derby Leadership Conference" remains as a standalone card immediately followed by "Jump$tart National Educator Conference" (lines 864-883), violating the de-duplication mandate.

9. **Frames 12 & 13 (Media Modal Handling & Header Truncation)**:
   - `index.html:1135,1167,1199`: Curated project videos (`preview-video-element`) lack `data-type="video"` and do not trigger `video-modal`.
   - `js/app.js:541`: `if (media.closest('a.pd-image-link')) return;` causes image cards in Section 4 to bypass the modal.
   - `styles/components.css:785-796`: `.modal-header` is flex with space-between. `.modal-title` does not have `min-width: 0; flex: 1;`. On mobile, long titles will not truncate properly despite `overflow: hidden; text-overflow: ellipsis;` in `.modal-header-fix`.

---

## 2. Logic Chain

1. **Premise**: The blueprint identified "Information Bloat & Viewport Explosion" (15 screens instead of 3 on mobile) and specified collapsible accordions, a swipeable skills row, and an interactive BLS vs GS salary toggle.
2. **Analysis of Current State**:
   - Academic records take up 4 large cards because they are in a static CSS grid (Observation 1).
   - Filter chips wrap across 4-5 lines because `flex-wrap: wrap` is active (Observation 2).
   - BLS Table and GS Pay Bands are stacked sequentially, doubling the vertical space of the Career section (Observation 6).
   - Long modal titles risk pushing the close button off screen because flex items without `min-width: 0` cannot shrink below content size (Observation 9).
3. **Inference**: Previous patch scripts only executed string replacements on dates and titles, leaving the layout and interactive architecture unchanged.
4. **Resolution Path**:
   - Refactor `index.html` lines 148-198 into a 4-tier accordion and add `.accordion.active .accordion-content { display: block; }` to CSS.
   - Update `.filter-chips-container` to `overflow-x: auto; flex-wrap: nowrap;` and `.filter-chip` to `white-space: nowrap; flex-shrink: 0;`.
   - Implement the segmented toggle bar for `[Industry (BLS)]` vs `[Federal (GS/DHA)]` and add `@media (max-width: 640px)` CSS to turn table rows into vertical flex cards.
   - Remove the duplicate Derby conference card and correct the Sun Herald date to December 2018.
   - Add `min-width: 0; flex: 1;` to `.modal-title`.

---

## 3. Caveats

1. **400dvh Canvas Scope**: The 400dvh sticky canvas pipeline mentioned in Section 1.B of the blueprint applies to the Project Atlas 3D WebGL subproject (`d3jeotfnsm148g.cloudfront.net`). In `career_portfolio`, the hero section is standard responsive HTML/CSS with the Circuit M emblem, not a WebGL canvas.
2. **STAR Cards Count**: The blueprint mentions "17 STAR Accomplishments Spotlight", but the current `index.html` contains only 6 cards (STAR-01 to STAR-06). If all 17 are required, additional copy from `ORIGINAL_REQUEST.md` or `Resumeprofundus-atlasportfolio.md` should be injected.
3. **No Code Written**: In accordance with the explorer archetype rules, no changes have been applied to `index.html`, `styles/`, or `js/`.

---

## 4. Conclusion

The portfolio codebase requires structural HTML refactoring, CSS flex/grid updates, and minor JS wiring to achieve full compliance with the 13 frames from `IMG_9799.pdf`. The existing test suite passes because it checks for text presence rather than layout structure; thus, implementing these layout improvements will not cause test regressions as long as existing text tokens are preserved. Detailed code snippets and implementation instructions are documented in `analysis.md`.

---

## 5. Verification Method

To independently verify these findings:

1. **Accordion Absence**:
   Run: `grep -n "accordion" /Users/andrewstrachan/career_portfolio/index.html`
   Expected Result: 0 matches.
2. **Missing Accordion Active Rule**:
   Run: `grep -n "accordion.active" /Users/andrewstrachan/career_portfolio/styles/*.css`
   Expected Result: 0 matches.
3. **Missing Salary Explorer Toggle**:
   Run: `grep -n "salary-toggle" /Users/andrewstrachan/career_portfolio/index.html`
   Expected Result: 0 matches.
4. **Duplicate Derby Conference**:
   Run: `grep -n "Kentucky Derby" /Users/andrewstrachan/career_portfolio/index.html`
   Expected Result: Match at lines 846, 855.
5. **Test Suite Baseline**:
   Run: `node /Users/andrewstrachan/career_portfolio/tests/runner.js`
   Expected Result: 49 test suites, 191 test cases pass.
