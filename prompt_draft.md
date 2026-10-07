# Teamwork Project Prompt — Draft: Mobile Architecture & Portfolio Revamp Blueprint

> Status: Drafted
> Goal: Craft prompt → get user approval → delegate to teamwork_preview
> Requested team: Gemini 3.1 Pro (orchestrator) & Gemini 3.8 Flash (workers)

## Objective
Execute the **Comprehensive Diagnostic & Architectural Revamp Blueprint** on the deployed portfolio (`astrachan163.github.io` / `nonartificialsi.com` / `portfolio.nonartificialsi.com`). Conduct deep research and generate a complete, ready-to-execute **Master Revamp Markdown & Code Specification** for the development team.

**Working directory:** `/Users/andrewstrachan/career_portfolio`
**Source Document:** `IMG_9799.pdf` (13 Mobile Viewport Capture Frames)

---

## 1. Systemic Architectural Flaws & Root-Cause Dissection

### A. The "Information Bloat" & Viewport Explosion (Why 15 Screens Exist Instead of 3)
- **Symptom:** Over 15 full-screen mobile viewports of linear, uncontained scrolling.
- **Fix:** Implement **Collapsible Accordion Cards** and **Horizontal Scroll Carousels** (`scroll-snap-type: x mandatory`). Group content into 4 primary Interactive Hubs:
  1. *Executive Summary & Career Trajectory* (with toggleable BLS vs. GS Federal Pay Bands).
  2. *Verified Technical Matrix* (interactive domain tabs with count badges).
  3. *STAR Technical Case Studies* (swipeable 3D project cards).
  4. *Education, Civic Leadership & Publications* (expandable chronologies).

### B. Mobile Frame-by-Frame Scrub & 3D Game Animation Failure
- **Symptom:** On mobile, 3D game canvas and scrub animation disappear; text blocks dominate.
- **Fix:** Adopt the **Sticky Window Canvas Pipeline** (`height: 400dvh` wrapper, `position: sticky; top: 0; height: 100dvh; z-index: 1; pointer-events: none`). Set `pointer-events: auto` on interactive cards. Use Dynamic Viewport Units (`100dvh`) to prevent layout jumping.

### C. The Arrow Navigation Anomaly (Ghost Controls)
- **Symptom:** Keyboard arrow instructions appear on mobile touch screens; missing on desktop.
- **Fix:** Wrap navigation cues in `@media (hover: hover)` and `(pointer: fine)`. Replace with native swipe gesture indicators or dot pagination on mobile touch screens.

### D. The Broken Video Player Modal & Unclosable 'X' (Critical Bug)
- **Symptom:** Image taps open broken video player modals. Close 'X' traps user due to z-index.
- **Fix:** Implement explicit asset routing (`data-type="image"` vs `data-type="video"`). Ensure close buttons have `z-index: 9999; pointer-events: auto;` and listen to both `click` and `touchend`.

---

## 2. Frame-by-Frame Visual & Content Dissection (13–15 Images)

| Frame # | Visual & Technical Fixes Needed |
| :--- | :--- |
| **1: Medical Training (UMMC)** | Update wording to: *"M.D. Candidate (4 Years Coursework & Clinical Clerkships Completed — Incomplete as of 2020)"*. Move into a collapsible "Medical & Life Sciences Foundation" card. |
| **2: Education Stack (Montevallo/MC)** | Add clear headers: *"University of Montevallo — CTE Business & Finance"* and *"Mississippi College — B.S. ACS Biochemistry (Honors)"*. Consolidate into 4-tier accordion. |
| **3: Technical Matrix Header** | Fix severe text truncation. Convert filter pills to horizontal swipe row (`overflow-x: auto; white-space: nowrap;`). |
| **4: Expanded Technical Matrix** | Group into 2-column card grid with category badges (Zero-Trust, Systems, Educational Leadership). Add touch-activated repos drawers. |
| **5: Chronological Work History** | Implement interactive timeline cards with clean padding. Role badges, exact dates (see timeline matrix below). |
| **6: STAR Technical Case Studies** | Format into structured STAR cards with colored left-accent borders. Embed architecture badges and direct repo links. |
| **7: Career Research Outlook Header** | Add dynamic bottom padding. Enclose BLS/NICE codes in pill containers. |
| **8: Wage Percentile Table (BLS)** | Convert table on mobile to vertical flex card list: Percentile badge, Annual Wage, Hourly Equivalent. |
| **9: Federal Pay Bands (GS)** | Merge with Frame 8 into a single **Interactive Salary Explorer** toggle: [Industry (BLS)] vs [Federal (GS/DHA)]. |
| **10: Professional Development** | Fix critical left clip by removing broken absolute positioning and negative margins (`padding-left: 16px; width: 100%; box-sizing: border-box;`). |
| **11: Sun Herald Feature** | Replace redundant headers with a single **Media Feature Card** (headline badge, Dec 2018, link, 2-sentence impact). |
| **12: Broken Video Modal** | Rewrite modal script for polymorphic media handling (img vs video). Fix z-index, add backdrop click-to-close. |
| **13: Broken Modal Header** | Add CSS: `white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 48px;`. |

---

## 3. Comprehensive Dissection of Timeline, Credentials, and Resume Reconciliations

This audit establishes a single-source-of-truth accuracy for all deployment variants.

### Conference De-Duplication
- **Correction:** The standalone "Derby" reference has been permanently removed. The canonical entry is: **National Jump$tart Financial Literacy National Educator Conference (Louisville, KY)**.

### Comparative Matrix of Corrections

| Entity / Section | Final Authoritative Correction & Rationale |
| :--- | :--- |
| **UAB Graduate Degree** | **January 2026 – Present** (Expected Graduation: Dec 2027). Title: **NSF CyberAICorps SFS Scholar**. |
| **Univ. of Montevallo** | **August 2024 – May 2025**. Title: **ALSDE Certified CTE Educator — Provisional Certificate in a Teaching Field (PCTF): Business, Marketing, and Finance**. |
| **UMMC Medical School** | **January 2016 – July 2020**. Wording: **Doctor of Medicine (M.D.) Candidate — 4 Years Coursework & Clinical Clerkships Completed (Incomplete as of 2020)**. |
| **UMMC Credentials** | Explicitly add: **President & Founder: P.A.L.S. (Peer-Assisted Learning Society)**; **President: Quality Improvement Student Interest Group**; **Chair: UMMC/MBN Opioid Crisis Council**; **BCLS / ACLS / First Aid Certified**. |
| **Mississippi College** | **August 2011 – May 2016** (GPA: 3.5 / 4.0). Add honor societies: **Delta Epsilon Iota Academic Honor Society** and **Phi Mu Alpha Sinfonia**. |
| **Global Health: Uganda** | **July 2017 – August 2017**. Title: **OmniMed Certified Village Health Volunteer (Uganda, East Africa)**. |
| **Maqkrs Consulting** | **January 2022 – Present**. Hours: **15–20 hrs/wk**. Title: **Founder & Principal Technologist**. |
| **First Presbyterian Church** | **August 2011 – Present**. Youth leadership & civic mentorship (**10 hrs/wk**). |
| **UAB Summer Camp TA** | **June 2026 – August 2026**. Hours: **20–40 hrs/wk**. |
| **Shades Valley High School** | **July 2024 – June 2025** (Full-Time, 40 hrs/wk). Subject: **CTE Business, Marketing, and Finance**. Add: **2025 JEFCOED Technology Torchbearer Award for Excellence**. |
| **Corner High School** | **August 2023 – June 2024** (Full-Time, 40 hrs/wk). Subject: **CTE Business, Marketing, and Finance** (DECA Chapter Founder & State Competition Coach). |
| **MidSouth Extracts LLC** | **January 2023 – May 2023** (Full-Time, 40 hrs/wk). Title: **Operational Director & Laboratory Specialist**. |
| **SelectQuote Insurance** | **April 2021 – November 2022** (Full-Time, 40 hrs/wk). Title: **Sales Development Specialist**. Add: **Top Sales Award (2021)**. |

### Sourced Credentials to Include
- **Mississippi College:** Delta Epsilon Iota Academic Honor Society, Phi Mu Alpha Sinfonia.
- **Healthcare/Life Sciences:** OmniMed Certified Village Health Volunteer (Uganda); BCLS, ACLS, First Aid; Virginia Covington Student Leadership Award.
- **Educational/Public Recognition:** 2025 JEFCOED Technology Torchbearer Award for Excellence; DECA Competition Coach (1st/2nd place finishes at 2024 AL DECA CDC); Sun Herald Feature (December 2018).

---

## 4. Multi-Agent Fleet Execution Matrix (Token & Rate Limit Safe)

**Orchestrator:** Gemini 3.1 Pro (Supreme Architect)
**Workers:** Gemini 3.8 Flash (Targeted components)

### Delegation Pods
1. **Pod Alpha: UI/UX & Responsive Animation Overhaul**
   - Architect mobile container system, sticky canvas animation, and polymorphic media modal.
   - Refactor HTML/CSS (collapsible drawers, scroll snap, CSS resets).
2. **Pod Beta: Professional Resume & USAJOBS Curation Engine**
   - Structure master dual-format resume (Federal USAJOBS vs. Industry Web/PDF).
   - Inject verified timeline corrections, USAJOBS metrics (hours/week), and GS KSAs.
3. **Pod Gamma: Infrastructure, Domain Routing & SEO**
   - Configure AWS CloudFront/S3, Dynadot (`nonartificialsi.com`), and GitHub Pages (`portfolio.nonartificialsi.com`).

---
**Next Deliverable Request to Fleet:**
Please ingest this blueprint and generate the **Master Revamp Markdown & Code Specification** for the development team.
