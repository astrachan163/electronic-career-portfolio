# Master Revamp Markdown & Code Specification

## 1. Systemic Architectural Flaws & Root-Cause Dissection

### A. The "Information Bloat" & Viewport Explosion
**Specification:**
- **CSS:** Add `.accordion` and `.accordion-content` styles. Use `.carousel-container` with `display: flex; overflow-x: auto; scroll-snap-type: x mandatory;`.
- **HTML:** Restructure sections into 4 Interactive Hubs:
  1. Executive Summary & Career Trajectory
  2. Verified Technical Matrix
  3. STAR Technical Case Studies
  4. Education, Civic Leadership & Publications

### B. Mobile Frame-by-Frame Scrub & 3D Game Animation Failure
**Specification:**
- **CSS:** 
  ```css
  .sticky-canvas-wrapper { height: 400dvh; }
  .sticky-canvas-inner { position: sticky; top: 0; height: 100dvh; z-index: 1; pointer-events: none; }
  .interactive-card { pointer-events: auto; }
  ```

### C. The Arrow Navigation Anomaly (Ghost Controls)
**Specification:**
- **CSS:** 
  ```css
  .nav-cues { display: none; }
  @media (hover: hover) and (pointer: fine) { .nav-cues { display: block; } }
  .mobile-swipe-cues { display: block; }
  @media (hover: hover) and (pointer: fine) { .mobile-swipe-cues { display: none; } }
  ```

### D. The Broken Video Player Modal & Unclosable 'X'
**Specification:**
- **HTML:** Add `data-type="image"` or `data-type="video"` to media triggers.
- **CSS/JS:** Update modal close button with `z-index: 9999; pointer-events: auto;`. Add click and touchend listeners.

## 2. Frame-by-Frame Fixes
1. **Medical Training:** "M.D. Candidate (4 Years Coursework & Clinical Clerkships Completed — Incomplete as of 2020)". Move to "Medical & Life Sciences Foundation" accordion.
2. **Education Stack:** "University of Montevallo — CTE Business & Finance" and "Mississippi College — B.S. ACS Biochemistry (Honors)". 4-tier accordion.
3. **Technical Matrix Header:** Convert filter pills to horizontal swipe row (`overflow-x: auto; white-space: nowrap;`).
4. **Expanded Technical Matrix:** 2-column card grid with category badges. Touch-activated repos drawers.
5. **Chronological Work History:** Interactive timeline cards, role badges, exact dates.
6. **STAR Technical Case Studies:** STAR cards with colored left-accent borders, direct repo links.
7. **Career Research Outlook Header:** Dynamic bottom padding. BLS/NICE codes in pills.
8. **Wage Percentile Table:** Mobile vertical flex card list.
9. **Federal Pay Bands:** Interactive Salary Explorer toggle.
10. **Professional Development:** Fix clip (`padding-left: 16px; width: 100%; box-sizing: border-box;`).
11. **Sun Herald Feature:** Media Feature Card.
12. **Broken Video Modal:** Polymorphic media handling. Fix z-index, backdrop click-to-close.
13. **Broken Modal Header:** `white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 48px;`.

## 3. Timeline, Credentials, and Resume Reconciliations
- **Conference:** "National Jump$tart Financial Literacy National Educator Conference (Louisville, KY)". Remove "Derby".
- **UAB Graduate Degree:** "January 2026 – Present (Expected Graduation: Dec 2027). Title: NSF CyberAICorps SFS Scholar."
- **Univ. of Montevallo:** "August 2024 – May 2025. Title: ALSDE Certified CTE Educator — Provisional Certificate in a Teaching Field (PCTF): Business, Marketing, and Finance."
- **UMMC Medical School:** "January 2016 – July 2020. Wording: Doctor of Medicine (M.D.) Candidate — 4 Years Coursework & Clinical Clerkships Completed (Incomplete as of 2020)."
- **UMMC Credentials:** Add "President & Founder: P.A.L.S. (Peer-Assisted Learning Society); President: Quality Improvement Student Interest Group; Chair: UMMC/MBN Opioid Crisis Council; BCLS / ACLS / First Aid Certified."
- **Mississippi College:** "August 2011 – May 2016 (GPA: 3.5 / 4.0). Add honor societies: Delta Epsilon Iota Academic Honor Society and Phi Mu Alpha Sinfonia."
- **Global Health: Uganda:** "July 2017 – August 2017. Title: OmniMed Certified Village Health Volunteer (Uganda, East Africa)."
- **Maqkrs Consulting:** "January 2022 – Present. Hours: 15–20 hrs/wk. Title: Founder & Principal Technologist."
- **First Presbyterian Church:** "August 2011 – Present. Youth leadership & civic mentorship (10 hrs/wk)."
- **UAB Summer Camp TA:** "June 2026 – August 2026. Hours: 20–40 hrs/wk."
- **Shades Valley High School:** "July 2024 – June 2025 (Full-Time, 40 hrs/wk). Subject: CTE Business, Marketing, and Finance. Add: 2025 JEFCOED Technology Torchbearer Award for Excellence."
- **Corner High School:** "August 2023 – June 2024 (Full-Time, 40 hrs/wk). Subject: CTE Business, Marketing, and Finance (DECA Chapter Founder & State Competition Coach)."
- **MidSouth Extracts LLC:** "January 2023 – May 2023 (Full-Time, 40 hrs/wk). Title: Operational Director & Laboratory Specialist."
- **SelectQuote Insurance:** "April 2021 – November 2022 (Full-Time, 40 hrs/wk). Title: Sales Development Specialist. Add: Top Sales Award (2021)."
