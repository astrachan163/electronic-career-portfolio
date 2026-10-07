# Reviewer 2 Brief: Credentials, Master Resume & Data Integrity Review

## Mission
Independently review the resume, credentials, provenance, and data integrity reconciliation across Andrew Strachan's Career Portfolio (`/Users/andrewstrachan/career_portfolio`).

## Scope
Inspect `data/resume.json`, `data/certifications.json`, `data/provenance.json`, `data/career.json`, `js/presenter.js`, and `reports/` against:
1. Authoritative Comparative Matrix in `ORIGINAL_REQUEST.md` §3 (UAB dates/title, Montevallo PCTF, UMMC MD Candidate phrasing, MC honors, Uganda & First Presbyterian experience entries, hours/week, awards).
2. Elimination of forbidden terms: NO `pre-vetting`, NO unapproved `Fellow`, canonical SFS Scholar | Clearable phrasing.
3. Provenance claims CLM-001 through CLM-022.
4. Privacy and link integrity tools:
   - `node tools/check-links.js`
   - `node tools/check-privacy.js`
   - `node tests/runner.js`

Provide verdict (APPROVE or REQUEST_CHANGES) in `handoff.md`.
