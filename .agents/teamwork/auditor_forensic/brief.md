# Forensic Auditor Brief: Integrity Verification

## Mission
Perform comprehensive forensic integrity verification on Andrew Strachan's Career Portfolio (`/Users/andrewstrachan/career_portfolio`).

## Scope & Integrity Checks
Verify that the codebase implements genuine functionality and adheres to the strict anti-cheating mandate:
1. Static Analysis:
   - Check all modified files (`index.html`, `styles/main.css`, `styles/components.css`, `js/app.js`, `data/resume.json`, `data/certifications.json`, `data/provenance.json`, `js/presenter.js`) for:
     * Hardcoded test assertions or mock bypasses
     * Dummy or facade implementations (e.g. empty functions, fake handlers)
     * Fabrication of claims or evidence
2. Credentials & Clearance Forensics:
   - Verify that NO unauthorized security clearances are claimed (must be "Scholar", "Clearable", NOT "Pre-vetted", NOT "Fellow").
   - Verify that the prohibited term "pre-vetting" does not exist in any production data file.
   - Verify that all claims in `data/provenance.json` link to legitimate, real-world URLs and verifiable institutional credentials.
3. Functional Authenticity:
   - Verify that interactive features (accordions, modal video/image player, salary explorer toggle, touch navigation) are wired to real DOM elements and event handlers.
   - Verify that tests in `tests/runner.js` run genuine assertions and are not mocked or compromised.

Report verdict (CLEAN or INTEGRITY VIOLATION) in `handoff.md`.
