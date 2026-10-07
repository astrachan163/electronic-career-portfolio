## 2026-10-07T06:48:07Z
You are Worker Pod Beta (Professional Resume & Credentials Curation Engine).
Your working directory is: /Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_pod_beta/
Project root: /Users/andrewstrachan/career_portfolio

You own the following files:
- data/resume.json
- data/certifications.json
- data/provenance.json
- data/career.json
- js/presenter.js
- reports/rubric-scorecard.md

Read the authoritative specifications:
1. /Users/andrewstrachan/career_portfolio/.agents/teamwork/ORIGINAL_REQUEST.md (specifically §3 Comparative Matrix of Corrections)
2. /Users/andrewstrachan/career_portfolio/.agents/teamwork/orchestrator_mobile_revamp/PROJECT.md
3. Your detailed task brief: /Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_pod_beta/brief.md
4. Explorer 3 findings and patch specifications:
   - /Users/andrewstrachan/career_portfolio/.agents/teamwork/explorer_credentials_timeline/analysis.md
   - /Users/andrewstrachan/career_portfolio/.agents/teamwork/explorer_credentials_timeline/handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your assignments:
1. Reconcile data/resume.json per Explorer 3 exact patch specifications:
   - UAB degree: dates "January 2026 – Present (Expected Graduation: Dec 2027)", title/honors "NSF CyberAICorps SFS Scholar".
   - Montevallo: degree "ALSDE Certified CTE Educator — Provisional Certificate in a Teaching Field (PCTF): Business, Marketing, and Finance", dates "August 2024 – May 2025".
   - UMMC Medical School: degree "Doctor of Medicine (M.D.) Candidate — 4 Years Coursework & Clinical Clerkships Completed (Incomplete as of 2020)", dates "January 2016 – July 2020".
   - UMMC Credentials: add President & Founder: P.A.L.S., President: Quality Improvement SIG, Chair: UMMC/MBN Opioid Crisis Council, BCLS / ACLS / First Aid Certified.
   - Mississippi College: add Delta Epsilon Iota Academic Honor Society and Phi Mu Alpha Sinfonia.
   - Global Health Uganda: add entry to experience array ("OmniMed Certified Village Health Volunteer (Uganda, East Africa)", July 2017 – August 2017).
   - First Presbyterian Church: add entry to experience array ("Youth Leadership & Civic Mentorship", August 2011 – Present (10 hrs/wk)).
   - Maqkrs Consulting: role "Founder & Principal Technologist", dates "January 2022 – Present (15–20 hrs/wk)".
   - UAB Summer Camp TA: dates "June 2026 – August 2026 (20–40 hrs/wk)".
   - Shades Valley HS: dates "July 2024 – June 2025 (Full-Time, 40 hrs/wk)", award "2025 JEFCOED Technology Torchbearer Award for Excellence".
   - Corner High School: dates "August 2023 – June 2024 (Full-Time, 40 hrs/wk)", role includes "(DECA Chapter Founder & State Competition Coach)".
   - MidSouth Extracts LLC: role "Operational Director & Laboratory Specialist", dates "January 2023 – May 2023 (Full-Time, 40 hrs/wk)".
   - SelectQuote Insurance: role "Sales Development Specialist", dates "April 2021 – November 2022 (Full-Time, 40 hrs/wk)", badge "Top Sales Award (2021)", update STAR-13 to 2021.
   - Security Clearance: Remove forbidden term "pre-vetting" in line 297. Standardize clearance statement to: "CyberCorps: Scholarship for Service (SFS) Scholar | Clearable. Maintained eligibility requirements for federal civilian employment; fully prepared to undergo federal security background investigations upon agency sponsorship."
2. Reconcile data/certifications.json:
   - Montevallo activeDates: "August 2024 – May 2025".
   - Add BCLS / ACLS / First Aid Certified.
3. Reconcile data/provenance.json:
   - Update claims CLM-001 through CLM-005.
   - Append new claims CLM-015 through CLM-022 per Explorer 3 analysis §3.
4. Clean up any remaining "Fellow" references in reports/rubric-scorecard.md and any lingering "KY Derby" references in js/presenter.js.
5. Rebuild & Verify:
   - Run: node tools/build.js
   - Run: node tests/runner.js
   - Ensure all tests pass.

Write your handoff report to:
/Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_pod_beta/handoff.md
and send a completion message to your parent via send_message.
