# Information Architecture & 13 Frames Deep-Dive Analysis

**Project**: Andrew Strachan Electronic Career Portfolio  
**Working Directory**: `/Users/andrewstrachan/career_portfolio`  
**Investigator**: Explorer 2 (IA & 13 Frames Content Archetype)  
**Date**: 2026-10-07  
**Baseline Inputs**: `ORIGINAL_REQUEST.md` (§2026-10-07T06:09:53Z), `IMG_9799.pdf` (13 Mobile Viewport Frames), `MASTER_REVAMP_SPEC.md`

---

## 1. Executive Summary

This investigation provides a comprehensive audit of the portfolio codebase across all 13 mobile frames identified in `IMG_9799.pdf` and detailed in the Mobile Architecture & Portfolio Revamp Blueprint. 

### Key Findings:
1. **Widespread Frame Implementation Gaps**: While earlier patch scripts (`patch_portfolio.py`, `patch_portfolio2.py`, `fix_all.py`, `fix_remaining.py`) made targeted text replacements, the structural requirements across the 13 frames were largely **not implemented in HTML and CSS**.
2. **Accordions Missing in HTML (Frames 1 & 2)**: Despite accordion JavaScript existing in `js/app.js` (`initAccordion()`), `index.html` does not contain a single `.accordion`, `.accordion-header`, or `.accordion-content` class. The academic stack remains a static 4-card CSS grid. Furthermore, `styles/main.css` is missing the active state rule `.accordion.active .accordion-content { display: block; }`.
3. **Interactive Salary Explorer Absent (Frames 8 & 9)**: Frame 8 (BLS Table) and Frame 9 (Federal Pay Bands) are rendered as two separate static vertical sections. The requested toggle `[Industry (BLS)]` vs `[Federal (GS/DHA)]` and mobile table-to-card conversion do not exist in HTML, CSS, or JS.
4. **Technical Matrix Flat & Uncurated (Frames 3 & 4)**: Filter chips in Frame 3 still wrap onto multiple rows (`flex-wrap: wrap`) instead of swiping horizontally (`overflow-x: auto; white-space: nowrap;`). The 27 competencies in Frame 4 remain a flat pill cloud without the required 2-column card grouping, domain badges, or interactive repos drawer.
5. **STAR Accomplishments Incomplete (Frame 6)**: Only 6 of 17 STAR cards are in the markup. None of the STAR cards feature colored left-accent borders, direct repository links, or architecture badges.
6. **Modal Flexbox Truncation Hazard (Frames 12 & 13)**: While `.modal-header-fix` has `overflow: hidden; text-overflow: ellipsis;`, `.modal-title` lacks `min-width: 0; flex: 1;` within the `.modal-header` flex container, preventing CSS truncation from activating on mobile. Furthermore, project video elements lack `data-type="video"`, preventing them from triggering the modal.
7. **Residual Duplicate Conference Entry (Frame 11)**: The standalone "The Kentucky Derby Leadership Conference" remains in Section 4 (`index.html:843-862`) alongside "Jump$tart National Educator Conference", violating the explicit de-duplication mandate.

---

## 2. Frame-by-Frame Diagnostic Breakdown

| Frame # | Topic / Spec | Current Implementation Status in Codebase | Severity | Exact Line Locations |
| :--- | :--- | :--- | :--- | :--- |
| **Frame 1** | Medical Training (UMMC) Collapsible Card | **Missing**: Static glass card in grid. No collapsible/accordion markup. | High | `index.html:187-197`, `styles/main.css:735-736` |
| **Frame 2** | Education Stack (Montevallo/MC) 4-Tier Accordion | **Missing**: Rendered as a flat 4-card grid. Missing consolidated headers. | High | `index.html:148-198` |
| **Frame 3** | Technical Matrix Header & Filter Pills | **Deficient**: Container wraps (`flex-wrap: wrap`), pills wrap text; no horizontal swipe row. | High | `index.html:201-209`, `styles/components.css:52-69` |
| **Frame 4** | Expanded Technical Matrix (2-col grid, badges, repos drawer) | **Missing**: Flat cloud of 27 pill elements. No 2-col card grid, no badges, no repos drawer. | High | `index.html:211-239` |
| **Frame 5** | Chronological Work History (Interactive cards, padding, exact dates) | **Partial**: Exact dates present; cards are static (non-interactive); padding too wide on mobile (2rem). | Medium | `index.html:241-372`, `styles/components.css:130-161` |
| **Frame 6** | STAR Case Studies (Colored left accents, repo links) | **Missing**: Only 6 cards, 0 repo links, 0 architecture badges, no colored left borders. | High | `index.html:375-460`, `styles/components.css:223-231` |
| **Frame 7** | Career Outlook Header (Dynamic padding, pill codes) | **Partial**: Static `margin-bottom: 2rem`; BLS & NICE codes embedded in plain text, not pills. | Medium | `index.html:474-490` |
| **Frame 8** | Wage Percentile Table (BLS) | **Deficient**: Standard `<table>` with horizontal overflow; no mobile vertical card stack. | High | `index.html:521-564` |
| **Frame 9** | Federal Pay Bands (GS) -> Salary Explorer Toggle | **Missing**: Stacked statically beneath BLS; no toggle `[Industry (BLS)]` vs `[Federal (GS/DHA)]`. | Critical | `index.html:567-595` |
| **Frame 10** | Professional Development (Left clip, padding, box-sizing) | **Deficient**: Injected `#development { padding-left: 16px; }` creates asymmetrical padding with `.container`. | Medium | `index.html:713-715`, `styles/main.css:752`, `styles/components.css:814-819` |
| **Frame 11** | Sun Herald Feature Card & De-Duplication | **Deficient**: Misdated as 2023–2025; redundant headers/links; duplicate KY Derby card still present. | High | `index.html:725-749`, `index.html:843-862` |
| **Frame 12** | Polymorphic Media Modal (Video vs Img) | **Partial**: JS logic present, but video elements lack attributes to open modal; links bypass modal. | High | `index.html:1135,1167,1199`, `js/app.js:503-588` |
| **Frame 13** | Modal Header Truncation | **Deficient**: `.modal-header-fix` has ellipsis CSS, but `.modal-title` lacks `min-width: 0; flex: 1;`. | Medium | `index.html:1535`, `styles/components.css:785-796`, `styles/main.css:749` |

---

## 3. Deep Dive into Frame Implementations & Gaps

### Frame 1: Medical Training (UMMC) Collapsible Card
- **Blueprint Spec**: Update wording to *"Doctor of Medicine (M.D.) Candidate — 4 Years Coursework & Clinical Clerkships Completed (Incomplete as of 2020)"* and nest inside a collapsible *"Medical & Life Sciences Foundation"* card.
- **Current Code**:
  - `index.html` lines 187-197:
    ```html
    <div class="glass-card">
      <span class="badge-wage-level" style="margin-bottom: 0.75rem;">Medical Training</span>
      <h4 style="font-size: 1.125rem; margin-bottom: 0.25rem;">University of Mississippi School of Medicine</h4>
      <p style="color: var(--color-circuit-gold); font-weight: 700; margin-bottom: 0.5rem;">
        Doctor of Medicine (M.D.) Candidate — 4 Years Coursework & Clinical Clerkships Completed (Incomplete as of 2020)
      </p>
      ...
    </div>
    ```
- **Discrepancies**:
  1. The card is rendered as an uncollapsible, static `.glass-card` inside a CSS grid.
  2. The container title remains "University of Mississippi School of Medicine" rather than "Medical & Life Sciences Foundation".
  3. No `<details>/<summary>` or `.accordion` markup is used.

---

### Frame 2: Education Stack (Montevallo / MC / UAB) 4-Tier Accordion
- **Blueprint Spec**: Add clear headers: *"University of Montevallo — CTE Business & Finance"* and *"Mississippi College — B.S. ACS Biochemistry (Honors)"*. Consolidate the 4 institutions (UAB, Montevallo, MC, UMMC) into a 4-tier collapsible accordion.
- **Current Code**:
  - `index.html` lines 148-198:
    A flat 4-card CSS grid (`<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">`).
  - Montevallo (lines 165-166) has split header: `<h4>University of Montevallo</h4>` + `<p>Teaching Field (PCTF): Business & Finance · GPA: 3.75 / 4.0</p>`.
  - Mississippi College (lines 177-178) has split header: `<h4>Mississippi College</h4>` + `<p>B.S. ACS Biochemistry Honors · GPA: 3.5 / 4.0</p>`.
- **CSS Bug**:
  - In `styles/main.css` lines 735-736:
    ```css
    .accordion { border: 1px solid var(--color-circuit-gold); margin-bottom: 1rem; }
    .accordion-content { display: none; padding: 1rem; }
    ```
    The rule `.accordion.active .accordion-content { display: block; }` is **completely missing**. Even if an element receives class `active`, it will never display its content.

---

### Frame 3: Technical Matrix Header & Filter Pills
- **Blueprint Spec**: Fix severe text truncation on mobile. Convert filter pills to a horizontal swipe row (`overflow-x: auto; white-space: nowrap;`).
- **Current Code**:
  - `index.html` lines 201-209:
    `<div class="filter-chips-container" role="tablist" aria-label="Skills Category Filter">` containing 6 buttons.
  - `styles/components.css` lines 52-69:
    ```css
    .filter-chips-container {
      display: flex;
      flex-wrap: wrap;       /* WRAPS ACROSS MULTIPLE LINES */
      gap: 0.625rem;
      margin-bottom: 2rem;
    }
    .filter-chip {
      /* Missing white-space: nowrap */
      /* Missing flex-shrink: 0 */
    }
    ```
- **Discrepancies**:
  - On 375px screens, 6 long pills (e.g., "Artificial Intelligence & Local Models", "Cybersecurity & Zero-Trust") wrap into 4-5 irregular lines, consuming excessive vertical space.
  - Needed: `overflow-x: auto; flex-wrap: nowrap; -webkit-overflow-scrolling: touch; scroll-snap-type: x mandatory; padding-bottom: 0.5rem;` on the container, and `flex-shrink: 0; white-space: nowrap;` on each `.filter-chip`.

---

### Frame 4: Expanded Technical Matrix (2-Column Grid, Badges, Repos Drawer)
- **Blueprint Spec**: Group skills into a 2-column card grid with category badges (*Zero-Trust*, *Systems*, *Educational Leadership*). Add touch-activated repos drawers.
- **Current Code**:
  - `index.html` lines 211-239:
    A single `#skills-matrix-display.skills-grid` holding 27 flat `.skill-item-pill` elements.
- **Discrepancies**:
  1. No 2-column card grid exists.
  2. No category badges exist on domain cards.
  3. No interactive repos drawer or drawer trigger exists for accessing source code repositories directly from the skills matrix.

---

### Frame 5: Chronological Work History
- **Blueprint Spec**: Interactive timeline cards with clean padding, role badges, and exact dates matching the unified timeline matrix.
- **Current Code**:
  - `index.html` lines 241-372:
    Contains all 8 required timeline entries with exact dates (UAB Summer Camp TA, Shades Valley HS, Corner HS, MidSouth Extracts, Maqkrs Consulting, SelectQuote, OmniMed Uganda, First Presbyterian).
  - `styles/components.css` lines 130-161:
    `.timeline-container { padding-left: 2rem; }`
    `.timeline-marker { left: -2rem; }`
- **Discrepancies**:
  1. No mobile media query exists for `.timeline-container`. On a 375px screen with 24px container padding, 32px timeline padding leaves only 295px for card content, causing severe date tag clipping and awkward header wrapping.
  2. Timeline cards are completely static (`.glass-card`). There is no interactive collapse/expand for achievement bullets.
  3. Roles are styled as plain text spans (`.timeline-role`), lacking visual role badges (e.g. `[Full-Time]`, `[Instruction]`, `[Leadership]`).

---

### Frame 6: STAR Technical Case Studies
- **Blueprint Spec**: Format into structured STAR cards with colored left-accent borders, architecture badges, and direct repo links.
- **Current Code**:
  - `index.html` lines 375-460:
    Renders only 6 STAR cards (STAR-01 through STAR-06).
  - `styles/components.css` lines 223-231:
    ```css
    .star-card {
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: var(--border-radius-md);
      padding: 1.5rem;
      ...
    }
    ```
- **Discrepancies**:
  1. Not a single STAR card contains an external repo link (`<a>` tag) or direct link to project artifacts.
  2. `.star-card` has no colored left-accent border (`border-left: 3px solid ...`).
  3. Architecture badges (e.g., `[Godot 4 WebGL]`, `[SwiftUI Local RAG]`, `[AWS S3/Lambda]`) are absent.

---

### Frame 7: Career Research Outlook Header
- **Blueprint Spec**: Add dynamic bottom padding. Enclose BLS and NICE codes in pill containers.
- **Current Code**:
  - `index.html` lines 475-490:
    Header card has static `style="margin-bottom: 2rem;"`.
    The SOC code (`BLS SOC 15-1212.00`) is in a plain `<p>` tag: `Standard Occupational Classification: BLS SOC 15-1212.00 | CyberCorps SFS Public Service Specialization`.
    The NICE codes are embedded in inline `<strong>` tags: `<strong>PR-CD-001 (Cyber Defense Analyst)</strong>` and `<strong>SP-ARC-002 (Security Architect)</strong>`.
- **Discrepancies**:
  1. Codes lack dedicated pill badges (`<span class="badge-code-pill">`).
  2. Bottom padding is static rather than responsive (`clamp()`).

---

### Frames 8 & 9: Wage Percentile Table vs Federal Pay Bands (Interactive Salary Explorer)
- **Blueprint Spec**:
  - Frame 8: Convert BLS table on mobile to a vertical flex card list: Percentile badge, Annual Wage, Hourly Equivalent.
  - Frame 9: Merge BLS Table and Federal Pay Bands into a single **Interactive Salary Explorer** with a segmented control toggle: `[Industry (BLS)]` vs `[Federal (GS/DHA)]`.
- **Current Code**:
  - `index.html` lines 521-564: Static HTML `<table>` for BLS wage percentiles.
  - `index.html` lines 567-595: Static `.gs-pathway-grid` for GS-9 to GS-14.
  - Both sections are permanently visible and stacked vertically.
- **Discrepancies**:
  1. **Zero toggle functionality exists**: No segmented buttons `[Industry (BLS)]` vs `[Federal (GS/DHA)]`, no tab controller in `js/app.js`, and no active tab styling in CSS.
  2. **Zero mobile card conversion for BLS table**: On narrow screens, the table remains an HTML table that overflows horizontally within `.table-responsive-container`.

---

### Frame 10: Professional Development Padding & Left Clipping
- **Blueprint Spec**: Fix critical left clip by removing broken absolute positioning and negative margins (`padding-left: 16px; width: 100%; box-sizing: border-box;`).
- **Current Code**:
  - `styles/main.css` line 752:
    `#development { padding-left: 16px; width: 100%; box-sizing: border-box; }`
  - In `index.html` line 715, `<section id="development">` contains `<div class="container">`.
    `.container` has `padding-inline: 1.5rem;` (24px).
- **Discrepancies**:
  - Adding `padding-left: 16px` directly to `#development` shifts the entire container to the right, causing an asymmetrical left padding of 40px vs 24px right padding.
  - The correct fix is to ensure the container padding is responsive (`padding-inline: 1rem` on mobile) and that `.pd-grid` cards use `width: 100%; box-sizing: border-box;`.

---

### Frame 11: Sun Herald Feature & Conference De-Duplication
- **Blueprint Spec**: Replace redundant headers with a single **Media Feature Card** (headline badge, Dec 2018, link, 2-sentence impact). Permanently remove standalone "Derby" conference reference.
- **Current Code**:
  - Item 1 (`index.html:725-749`):
    - Badge: `<span class="pd-badge-date">Community Stewardship · 2023–2025</span>` (Incorrect date: Sun Herald article was published in **December 2018**).
    - Contains duplicate links and verbose headers.
  - Item 6 (`index.html:843-862`):
    - "The Kentucky Derby Leadership Conference" remains in the HTML as a standalone card immediately followed by Item 7 "Jump$tart National Educator Conference".
- **Discrepancies**:
  1. Sun Herald date must be corrected to "December 2018".
  2. Redundant titles and secondary links must be simplified into a single high-impact Media Feature Card.
  3. Item 6 (Derby conference) must be removed.

---

### Frames 12 & 13: Media Modal Handling & Header Truncation
- **Blueprint Spec**:
  - Frame 12: Polymorphic media modal supporting both images and video, with high z-index close button and backdrop click-to-close.
  - Frame 13: Modal header truncation with CSS: `white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 48px;`.
- **Current Code**:
  - `js/app.js` lines 503-588:
    - Selector: `const clickableMedia = document.querySelectorAll('.pd-card-img, .pd-preview-img, [data-type="image"], [data-type="video"]');`
    - Line 541: `if (media.closest('a.pd-image-link')) return;`
    - Close button has `z-index: 9999; pointer-events: auto;` and click/touchend listeners.
  - `index.html`:
    - Video previews in Section 6 (`preview-video-element` on lines 1135, 1167, 1199) do not match the selector and have no `data-type="video"` attribute.
    - Images in Professional Development with `a.pd-image-link` bypass the modal completely and navigate to external URLs.
  - `styles/components.css` lines 785-796 & `styles/main.css` line 749:
    - `.modal-header` is a flex container (`display: flex; justify-content: space-between; align-items: center;`).
    - `.modal-title.modal-header-fix` has `white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 48px;`.
- **Discrepancies**:
  - In CSS flexbox, flex items default to `min-width: auto;`. Without `min-width: 0; flex: 1;` on `.modal-title`, long titles will not truncate and will overflow the modal on mobile viewports.
  - Project video previews cannot be opened in the modal because they lack the required selector classes/attributes.

---

## 4. Cross-Cutting Systemic Architectural Findings

### A. Sticky Canvas 400dvh Pipeline Status
- In `fix_remaining.py`:
  `html = html.replace('class="hero-canvas-container"', 'class="hero-canvas-container sticky-canvas-wrapper"')`
  This replacement failed silently because `hero-canvas-container` does not exist in `career_portfolio/index.html`.
- In `career_portfolio`, the hero section is a clean HTML/CSS responsive grid (`#hero.hero-section`) with candidate credentials and the Circuit M diamond crest emblem.
- The 400dvh sticky canvas architecture belongs to the 3D WebGL Project Atlas subproject (`atlas_hero_update` / CloudFront deployment). In `career_portfolio`, the hero is already mobile-compliant and does not suffer from canvas collapse.

### B. Ghost Navigation Controls
- `styles/main.css` lines 743-746 define:
  ```css
  .nav-cues { display: none; }
  @media (hover: hover) and (pointer: fine) { .nav-cues { display: block; } }
  .mobile-swipe-cues { display: block; }
  @media (hover: hover) and (pointer: fine) { .mobile-swipe-cues { display: none; } }
  ```
- However, neither `.nav-cues` nor `.mobile-swipe-cues` are present in `index.html`. Mobile touch users currently do not see touch cues, and desktop users do not see keyboard navigation cues.

---

## 5. Concrete Remediation Plan for Implementation Pods

### Phase 1: CSS Style Engine Hardening (`styles/main.css` & `styles/components.css`)
1. **Accordion Active Rule**:
   Add to `styles/main.css`:
   ```css
   .accordion.active .accordion-content { display: block; }
   .accordion-header { cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; }
   .accordion-header::after { content: '▾'; font-size: 1.25rem; color: var(--color-circuit-gold); transition: transform 0.2s ease; }
   .accordion.active .accordion-header::after { transform: rotate(180deg); }
   ```
2. **Horizontal Swipe Filter Row**:
   Update `.filter-chips-container` in `styles/components.css`:
   ```css
   .filter-chips-container {
     display: flex;
     overflow-x: auto;
     flex-wrap: nowrap;
     gap: 0.625rem;
     padding-bottom: 0.75rem;
     -webkit-overflow-scrolling: touch;
     scroll-snap-type: x mandatory;
   }
   .filter-chip {
     flex-shrink: 0;
     white-space: nowrap;
     scroll-snap-align: start;
   }
   ```
3. **Salary Explorer Toggle & Mobile Flex Cards**:
   Add to `styles/components.css`:
   ```css
   .salary-toggle-bar {
     display: flex;
     background: rgba(11, 18, 32, 0.8);
     border: 1px solid var(--glass-border);
     border-radius: var(--border-radius-full);
     padding: 4px;
     width: fit-content;
     margin: 0 auto 2rem auto;
   }
   .salary-toggle-btn {
     padding: 0.5rem 1.25rem;
     border-radius: var(--border-radius-full);
     border: none;
     background: transparent;
     color: var(--color-text-secondary);
     font-weight: 600;
     font-size: 0.875rem;
     cursor: pointer;
     transition: all 0.2s ease;
   }
   .salary-toggle-btn.active {
     background: var(--color-cyber-cyan);
     color: var(--color-midnight-base);
     box-shadow: 0 0 12px rgba(0, 229, 255, 0.4);
   }
   @media (max-width: 640px) {
     .cyber-data-table thead { display: none; }
     .cyber-data-table tbody, .cyber-data-table tr, .cyber-data-table td { display: block; width: 100%; }
     .cyber-data-table tr {
       background: var(--glass-bg);
       border: 1px solid var(--glass-border);
       border-radius: var(--border-radius-md);
       margin-bottom: 1rem;
       padding: 1rem;
     }
     .cyber-data-table td { padding: 0.35rem 0; border: none; }
   }
   ```
4. **STAR Cards Accent Border**:
   Add to `styles/components.css`:
   ```css
   .star-card {
     border-left: 3px solid var(--color-cyber-cyan);
   }
   .star-card:nth-child(even) {
     border-left-color: var(--color-circuit-gold);
   }
   ```
5. **Modal Header Truncation Fix**:
   Update `.modal-title` in `styles/components.css`:
   ```css
   .modal-title {
     font-size: 1.125rem;
     color: var(--color-cyber-cyan);
     min-width: 0;
     flex: 1;
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
     margin-right: 1rem;
   }
   ```

### Phase 2: HTML Markup Refactoring (`index.html`)
1. **Academic Record to 4-Tier Accordion** (Lines 148-198):
   Replace the flat 4-card grid with 4 `.accordion` tiers:
   - Tier 1: UAB Graduate Degree (M.S. Cybersecurity · NSF CyberAICorps SFS Scholar)
   - Tier 2: University of Montevallo — CTE Business & Finance
   - Tier 3: Mississippi College — B.S. ACS Biochemistry (Honors)
   - Tier 4: Medical & Life Sciences Foundation — Doctor of Medicine (M.D.) Candidate (4 Years Coursework & Clinical Clerkships Completed — Incomplete as of 2020)
2. **Salary Explorer Integration** (Lines 520-595):
   Wrap BLS and GS into a single container with a segmented button toggle:
   ```html
   <div class="salary-toggle-bar" role="tablist">
     <button class="salary-toggle-btn active" data-salary-target="bls-table-pane" role="tab" aria-selected="true">Industry (BLS SOC 15-1212.00)</button>
     <button class="salary-toggle-btn" data-salary-target="gs-bands-pane" role="tab" aria-selected="false">Federal (GS / CyberCorps DHA)</button>
   </div>
   <div id="bls-table-pane" class="salary-pane active">...</div>
   <div id="gs-bands-pane" class="salary-pane" style="display: none;">...</div>
   ```
3. **Pill Badges for SOC & NICE Codes** (Lines 478-482):
   Wrap codes in `<span class="badge-wage-level">BLS SOC 15-1212.00</span>`, `<span class="badge-wage-level">NICE PR-CD-001</span>`, `<span class="badge-wage-level">NICE SP-ARC-002</span>`.
4. **STAR Cards Enrichment** (Lines 375-460):
   Add architecture tags and repository links (`<a href="..." class="btn-demo-link">Inspect Repository &rarr;</a>`) to each STAR card.
5. **Sun Herald & Derby Conference De-Duplication** (Lines 725-749, 843-862):
   - Correct date to `December 2018`.
   - Remove duplicate standalone Kentucky Derby card (Item 6).
6. **Polymorphic Media Attributes** (Lines 1135, 1167, 1199):
   Add `data-type="video"` and `cursor: pointer` to preview videos to enable modal interaction.

### Phase 3: JavaScript Controller Enhancements (`js/app.js`)
1. Add `initSalaryExplorer()` to wire up the `[Industry (BLS)]` vs `[Federal (GS/DHA)]` toggle buttons.
2. Ensure `initImageLightbox()` binds to project preview videos with `data-type="video"`.

---
