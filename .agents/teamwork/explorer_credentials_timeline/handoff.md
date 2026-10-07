# Handoff Report: Credentials, Timeline & Provenance Reconciliation

**Agent:** Explorer 3 (`explorer_credentials_timeline`)  
**Working Directory:** `/Users/andrewstrachan/career_portfolio/.agents/teamwork/explorer_credentials_timeline`  
**Date:** 2026-10-07  
**Recipient:** Orchestrator (`a909ae8d-af93-482c-9c57-c793f8400a88`) / Pod Beta Implementer

---

## 1. Observation

Direct observations from codebase inspection across primary files:

1. **`index.html`:**
   - Lines 153–156: Includes UAB M.S. degree with `GPA: 3.75 / 4.0 · NSF CyberAICorps SFS Scholar` and `Dates: January 2026 – Present (Expected Graduation: Dec 2027)`.
   - Lines 165–169: Montevallo degree shows `Dates: August 2024 – May 2025 · ALSDE Certified CTE Educator — Provisional Certificate in a Teaching Field (PCTF): Business, Marketing, and Finance`.
   - Lines 189–193: UMMC Medical School shows `Doctor of Medicine (M.D.) Candidate — 4 Years Coursework & Clinical Clerkships Completed (Incomplete as of 2020)` and `Dates: January 2016 – July 2020`.
   - Line 195: UMMC credentials include: `President & Founder: P.A.L.S. (Peer-Assisted Learning Society); President: Quality Improvement Student Interest Group; Chair: UMMC/MBN Opioid Crisis Council; BCLS / ACLS / First Aid Certified`.
   - Lines 248–251: UAB Summer Camp TA shows `June 2026 – August 2026 (20–40 hrs/wk)`.
   - Lines 264–275: Shades Valley HS shows `July 2024 – June 2025 (Full-Time, 40 hrs/wk)` and `2025 JEFCOED Technology Torchbearer Award for Excellence`.
   - Lines 283–288: Corner HS shows `August 2023 – June 2024 (Full-Time, 40 hrs/wk)` and `(DECA Chapter Founder & State Competition Coach)`.
   - Lines 300–301: MidSouth Extracts LLC shows `Operational Director & Laboratory Specialist` and `January 2023 – May 2023 (Full-Time, 40 hrs/wk)`.
   - Lines 317–318: Maqkrs Consulting shows `Founder & Principal Technologist` and `January 2022 – Present (15–20 hrs/wk)`.
   - Lines 333–341: SelectQuote shows `Sales Development Specialist`, `April 2021 – November 2022 (Full-Time, 40 hrs/wk)`, and `Top Sales Award (2021)`.
   - Lines 349–350: Global Health Uganda shows `OmniMed Certified Village Health Volunteer (Uganda, East Africa)` and `July 2017 – August 2017`.
   - Lines 363–364: First Presbyterian Church shows `Youth Leadership & Civic Mentorship` and `August 2011 – Present (10 hrs/wk)`.
   - **Discrepancy (Lines 843–862):** Standalone card `The Kentucky Derby Leadership Conference` is still rendered in the Professional Development section.
   - **Discrepancy (Line 876):** Canonical conference is titled `Jump$tart National Educator Conference` instead of `National Jump$tart Financial Literacy National Educator Conference (Louisville, KY)`.

2. **`data/resume.json`:**
   - Line 19: UAB dates are `"August 2024 – Expected December 2027"` instead of `"January 2026 – Present (Expected Graduation: Dec 2027)"`.
   - Line 21: Title is `"CyberCorps: Scholarship for Service (SFS) Scholar (National Science Foundation Grant)"` instead of `"NSF CyberAICorps SFS Scholar"`.
   - Line 31 & 33: Montevallo degree is abbreviated `"Provisional Certificate in a Teaching Field (PCTF)"` and dates are `"August 2024 – June 2025"` instead of `"August 2024 – May 2025"`.
   - Line 60 & 62: UMMC degree is `"Doctor of Medicine (M.D.) Coursework & Clinical Clerkships"` and dates are `"August 2016 – December 2020"`.
   - Line 64: UMMC honors omit Opioid Council chair and BCLS/ACLS/First Aid certification.
   - Lines 49–54: Mississippi College omits `Delta Epsilon Iota Academic Honor Society`.
   - Line 141: UAB Summer Camp TA dates are `"June 2026"` without end month or hours.
   - Line 154: Shades Valley dates are `"August 2024 – June 2025"` without hours; line 161 and line 240 omit `"for Excellence"` from the Torchbearer Award.
   - Line 168: Corner High School dates are `"September 2023 – June 2024"` without hours.
   - Line 178: MidSouth Extracts role is `"Operational Director"` omitting `"& Laboratory Specialist"` and hours.
   - Lines 191–199 & 340: SelectQuote role is `"Sales Development Specialist & Team Lead"`; badge is `"Top Sales Award 2022"`; STAR-13 lists 2022 and 2023 awards.
   - Lines 203 & 206: Maqkrs Consulting role is `"Founder & Lead Technologist"` and dates are `"2022 – Present"`, omitting hours.
   - **Missing Entries:** Global Health Uganda (`experience` array) and First Presbyterian Church (`experience` array) are omitted from `data/resume.json`.
   - **Integrity Finding (Line 297):** Contains forbidden term `"pre-vetting"`: `"requires extensive pre-vetting and tracking."`

3. **`data/certifications.json`:**
   - Line 65: Montevallo activeDates are `"August 2024 – June 2025"` instead of `"August 2024 – May 2025"`.
   - Omits `BCLS / ACLS / First Aid Certified`.

4. **`data/provenance.json`:**
   - Missing explicit claims for UMMC Medical School, P.A.L.S. & Opioid Council, MidSouth Extracts, SelectQuote, Maqkrs Consulting, First Presbyterian Church, UAB Summer Camp, and National Jump$tart Conference.

5. **`js/app.js:43` & `js/presenter.js:37, 42`:**
   - Contains `'conferences (ALACTE, DECA Anaheim, KY Derby, Jump$tart)'` referencing `KY Derby`.

6. **`tests/tier1-features/f07-educational-enhancement.test.js:76`:**
   - `assert(/Kentucky Derby|KY Derby/i.test(html), 'Must include Kentucky Derby conference');` mandates Derby in HTML.

---

## 2. Logic Chain

1. **Premise 1:** The user and blueprint issued an Authoritative Comparative Matrix establishing single-source-of-truth accuracy for all 15 credential, timeline, hours, and conference entries.
2. **Premise 2:** While an earlier regex patch updated some HTML strings in `index.html`, `data/resume.json`, `data/certifications.json`, `data/provenance.json`, `js/app.js`, and `js/presenter.js` were never updated to match.
3. **Premise 3:** Because `index.html` still contains the standalone `The Kentucky Derby Leadership Conference` card, conference de-duplication is incomplete.
4. **Premise 4:** If a builder removes the Derby card from `index.html` without simultaneously updating `f07-educational-enhancement.test.js:76`, test suite execution will break (since line 76 asserts Derby's presence).
5. **Premise 5:** In `data/resume.json:297`, the prohibited term `"pre-vetting"` persists, violating the strict directive to scrub misleading clearance claims.
6. **Conclusion:** A coordinated synchronization must update `index.html`, `data/resume.json`, `data/certifications.json`, `data/provenance.json`, `js/app.js`, `js/presenter.js`, and `tests/tier1-features/f07-educational-enhancement.test.js`, followed by rebuilding `dist/` via `node tools/build.js`.

---

## 3. Caveats

- **Atlas Updates:** Subdirectory `atlas_hero_update/` contains files with `CJ502 forensics study kit` and `CyberCorps SFS Fellow`. These files belong to the auxiliary Project Atlas hero branch rather than the root career portfolio, but must be sanitized before any CloudFront deployment.
- **Presenter Mode Testing:** Removing Derby from `js/app.js` and `js/presenter.js` does not affect any automated assertions in `f10-presenter-mode.test.js`.

---

## 4. Conclusion

The portfolio is 80% aligned in `index.html` but suffers from divergence in `data/resume.json` (dates, titles, hours, missing entries for Uganda and First Presbyterian Church, and forbidden word `pre-vetting`), incomplete conference de-duplication in `index.html:843-862`, and missing provenance ledger entries in `data/provenance.json`.

All required textual patches and before/after chunks have been mapped in detail in:
`/Users/andrewstrachan/career_portfolio/.agents/teamwork/explorer_credentials_timeline/analysis.md`.

---

## 5. Verification Method

To verify these observations independently:

1. **Verify Discrepancies in `data/resume.json`:**
   ```bash
   grep -n "August 2024 – Expected" data/resume.json
   grep -n "pre-vetting" data/resume.json
   grep -n "Top Sales Award 2022" data/resume.json
   grep -n "Presbyterian" data/resume.json
   ```
2. **Verify Standalone Derby Card in `index.html`:**
   ```bash
   grep -n -C 5 "The Kentucky Derby Leadership Conference" index.html
   ```
3. **Verify Outdated Assertion in Test Suite:**
   ```bash
   grep -n "Kentucky Derby" tests/tier1-features/f07-educational-enhancement.test.js
   ```
4. **Verify Current Test Suite Status:**
   ```bash
   node tests/runner.js
   ```
   (Currently passes 191/191 tests; will continue passing once test line 76 is updated in tandem with `index.html`).
