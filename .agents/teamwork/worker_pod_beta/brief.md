# Worker Pod Beta Brief: Credentials, Timeline & Master Resume Curation

## Mission
Perform comprehensive data and provenance reconciliation across Andrew Strachan's Career Portfolio (`/Users/andrewstrachan/career_portfolio`) per the Authoritative Comparative Matrix in `ORIGINAL_REQUEST.md` and Explorer 3's audit findings.

## Inputs to Read
1. `/Users/andrewstrachan/career_portfolio/.agents/teamwork/ORIGINAL_REQUEST.md` (§3 Comparative Matrix of Corrections)
2. `/Users/andrewstrachan/career_portfolio/.agents/teamwork/orchestrator_mobile_revamp/PROJECT.md`
3. Explorer 3 findings:
   - `/Users/andrewstrachan/career_portfolio/.agents/teamwork/explorer_credentials_timeline/analysis.md`
   - `/Users/andrewstrachan/career_portfolio/.agents/teamwork/explorer_credentials_timeline/handoff.md`

## Files Owned
- `data/resume.json`
- `data/certifications.json`
- `data/provenance.json`
- `data/career.json`
- `js/presenter.js`
- `reports/rubric-scorecard.md` (clean up any "Fellow" references)

## Required Implementations
1. **`data/resume.json` Reconciliation**:
   - UAB: `dates: "January 2026 – Present (Expected Graduation: Dec 2027)"`, `honors: "NSF CyberAICorps SFS Scholar"`.
   - Montevallo: `degree: "ALSDE Certified CTE Educator — Provisional Certificate in a Teaching Field (PCTF): Business, Marketing, and Finance"`, `dates: "August 2024 – May 2025"`.
   - UMMC Medical School: `degree: "Doctor of Medicine (M.D.) Candidate — 4 Years Coursework & Clinical Clerkships Completed (Incomplete as of 2020)"`, `dates: "January 2016 – July 2020"`.
   - UMMC Credentials: Add `President & Founder: P.A.L.S. (Peer-Assisted Learning Society)`, `President: Quality Improvement Student Interest Group`, `Chair: UMMC/MBN Opioid Crisis Council`, `BCLS / ACLS / First Aid Certified`.
   - Mississippi College: In `honors` and `highlights`, add `Delta Epsilon Iota Academic Honor Society` and `Phi Mu Alpha Sinfonia`.
   - Global Health Uganda: Add entry to `experience` array (`role: "OmniMed Certified Village Health Volunteer (Uganda, East Africa)"`, `dates: "July 2017 – August 2017"`).
   - First Presbyterian Church: Add entry to `experience` array (`role: "Youth Leadership & Civic Mentorship"`, `dates: "August 2011 – Present (10 hrs/wk)"`).
   - Maqkrs Consulting: `role: "Founder & Principal Technologist"`, `dates: "January 2022 – Present (15–20 hrs/wk)"`.
   - UAB Summer Camp TA: `dates: "June 2026 – August 2026 (20–40 hrs/wk)"`.
   - Shades Valley HS: `dates: "July 2024 – June 2025 (Full-Time, 40 hrs/wk)"`, award: `"2025 JEFCOED Technology Torchbearer Award for Excellence"`.
   - Corner High School: `dates: "August 2023 – June 2024 (Full-Time, 40 hrs/wk)"`, add `DECA Chapter Founder & State Competition Coach`.
   - MidSouth Extracts LLC: `role: "Operational Director & Laboratory Specialist"`, `dates: "January 2023 – May 2023 (Full-Time, 40 hrs/wk)"`.
   - SelectQuote: `role: "Sales Development Specialist"`, `dates: "April 2021 – November 2022 (Full-Time, 40 hrs/wk)"`, badge: `"Top Sales Award (2021)"`, standardize STAR-13 to 2021.
   - Security Clearance & Prohibited Terms: Remove `"pre-vetting"` from line 297 (replace with `"requires extensive eligibility preparation and opportunity tracking"`). Standardize clearance statement to: `"CyberCorps: Scholarship for Service (SFS) Scholar | Clearable. Maintained eligibility requirements for federal civilian employment; fully prepared to undergo federal security background investigations upon agency sponsorship."`

2. **`data/certifications.json` Reconciliation**:
   - Montevallo PCTF: `activeDates: "August 2024 – May 2025"`.
   - Add BCLS / ACLS / First Aid Certified entry under appropriate category.

3. **`data/provenance.json` Reconciliation**:
   - Update existing claims CLM-001 through CLM-005 per Explorer 3 analysis.
   - Append new claims CLM-015 through CLM-022 per Explorer 3 analysis (§3).

4. **`js/presenter.js`**:
   - Clean up any remaining standalone `KY Derby` reference, updating to `National Jump$tart Financial Literacy Conference (Louisville, KY)`.

5. **Build & Verify**:
   - Run `node tools/build.js` to ensure public and private builds in `dist/` are fully refreshed with synchronized JSON data.
   - Run `node tests/runner.js` to verify all 191 tests pass.

Write handoff report to:
`/Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_pod_beta/handoff.md`
