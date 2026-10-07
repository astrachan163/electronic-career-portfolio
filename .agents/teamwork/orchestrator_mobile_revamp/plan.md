# Plan: Mobile Architecture & Portfolio Revamp Blueprint

## Objective
Implement and verify the Comprehensive Diagnostic & Architectural Revamp Blueprint for Andrew Strachan's Electronic Career Portfolio. Ensure the mobile experience matches desktop behavior on mobile browsers (sticky canvas scrub animation, polymorphic modal, interactive salary explorer, accordion cards, timeline reconciliation), with zero console errors and strict forensic integrity.

## Phase 0: Survey & Diagnostic Mapping (Parallel Explorers)
- **Explorer 1 (UI/UX & Sticky Canvas & Modal)**: Inspect HTML/CSS/JS for canvas pipeline, 400dvh wrapper, sticky positioning, modal player handling (video vs image), z-index, touch events, and arrow navigation cues.
- **Explorer 2 (Information Architecture & 13 Frames Content)**: Inspect all 13 frames from the blueprint in the existing code, check accordion structures, carousels, salary table vs GS pay bands, professional development left clipping.
- **Explorer 3 (Credentials & Timeline Reconciliation)**: Inspect resume/timeline data against the authoritative comparative matrix (UMMC MD Candidate wording, Montevallo PCTF, MC Honors, hours/week, awards, conference de-duplication).

## Phase 1: Implementation Pods (Workers)
- **Pod Alpha (UI/UX & Responsive Animation Overhaul)**:
  - Implement 400dvh sticky canvas pipeline with 100dvh dynamic units.
  - Implement polymorphic media modal (explicit data-type, z-index 9999 close button, backdrop tap-to-close, click/touchend listeners).
  - Implement collapsible accordion cards & horizontal scroll carousels (`scroll-snap-type: x mandatory`).
  - Restrict keyboard arrow cues to desktop fine-pointer media queries (`@media (hover: hover) and (pointer: fine)`).
- **Pod Beta (Resume, Credentials & Content Curation)**:
  - Reconcile all timeline entries per authoritative comparative matrix.
  - Update UMMC phrasing, Montevallo PCTF, Mississippi College honors, hours/week.
  - Build Interactive Salary Explorer ([Industry (BLS)] vs [Federal (GS/DHA)] toggle).
  - Format Media Feature Card (Sun Herald) and fix Professional Development left clipping.
- **Pod Gamma (Infrastructure & Layout Integration)**:
  - Coordinate asset paths, relative links, responsive styles.

## Phase 2: Review & Adversarial Verification
- Dispatch Reviewers (2) for code quality, responsiveness, and specification adherence.
- Dispatch Challengers (2) to test touch interactions, modal edge cases, scroll scrubbing, viewport sizing at 375px / 768px / 1440px.
- Dispatch Forensic Auditor (`teamwork_preview_auditor`) for strict integrity verification.

## Phase 3: Final Delivery
- Synthesize all results in `handoff.md`.
- Report completion and verification evidence to Sentinel.
