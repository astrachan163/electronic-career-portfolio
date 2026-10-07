# TEST_READY: Andrew Strachan Electronic Career Portfolio E2E Test Suite

**Architect:** `e2e_test_writer_1` (Opaque-Box E2E Test Suite Architect)  
**Date:** 2026-10-06  
**Status:** **READY FOR BUILDERS**  
**Working Directory:** `/Users/andrewstrachan/career_portfolio`  
**Test Runner Location:** `/Users/andrewstrachan/career_portfolio/tests/runner.js`  

---

## 1. Test Suite Overview

A comprehensive, self-contained, opaque-box end-to-end test suite has been designed, implemented, and verified for Andrew Strachan's Electronic Career Portfolio. The suite operates with standard Node.js without heavy external dependencies and evaluates compliance directly against user requirements in `ORIGINAL_REQUEST.md`, `TEST_INFRA.md`, and the official 100-point FBLA Electronic Career Portfolio Competitive Event Guidelines.

### Key Metrics:
- **Total Test Suites**: 49
- **Total Test Cases**: 187
- **Total Executed Assertions**: 226
- **Test Execution Speed**: ~0.05 seconds
- **External Dependencies**: 0 (Pure Node.js built-ins)

---

## 2. Test Execution Commands

Run the test suite from the repository root:

```bash
# Run the complete test suite across all 4 tiers:
node tests/runner.js

# Run specific test tiers:
node tests/runner.js --tier=1      # Tier 1: Feature Coverage (70 tests, 73 assertions)
node tests/runner.js --tier=2      # Tier 2: Boundary & Corner Cases (70 tests, 106 assertions)
node tests/runner.js --tier=3      # Tier 3: Cross-Feature Pairwise (14 tests, 14 assertions)
node tests/runner.js --tier=4      # Tier 4: Real-World Scenarios (33 tests, 33 assertions)

# Run with verbose output (shows each test case and timing):
node tests/runner.js --verbose
```

### Exit Code Semantics:
- `0`: All assertions pass (100% green).
- `1`: One or more assertions failed (detailed diff and error report printed to terminal).

---

## 3. Tier-by-Tier Architecture

| Tier | Focus | Directory | Test Files | Tests | Assertions | Target Requirement |
|---|---|---|:---:|:---:|:---:|:---:|
| **Tier 1** | **Feature Coverage** | `tests/tier1-features/` | 14 | 70 | 73 | ≥ 5 assertions per feature (≥ 70) |
| **Tier 2** | **Boundary & Corner Cases** | `tests/tier2-boundaries/` | 14 | 70 | 106 | ≥ 5 boundary tests per feature (≥ 70) |
| **Tier 3** | **Cross-Feature Pairwise** | `tests/tier3-pairwise/` | 14 | 14 | 14 | ≥ 14 cross-feature interaction assertions |
| **Tier 4** | **Real-World Scenarios** | `tests/tier4-scenarios/` | 7 | 33 | 33 | 7 multi-step judge & user scenarios |
| **Total** | **Comprehensive Suite** | `tests/` | **49** | **187** | **226** | **≥ 161 automated assertions** |

---

## 4. Feature Coverage Inventory (Tier 1 & Tier 2)

| # | Feature Name | Tier 1 Test File | Tier 2 Boundary File | Authoritative Source |
|---|---|---|---|---|
| **F1** | Brand Mark & Visual Theme | `tests/tier1-features/f01-brand-mark.test.js` | `tests/tier2-boundaries/b01-brand-mark-boundary.test.js` | `ORIGINAL_REQUEST.md §Source Material` |
| **F2** | Navigation & Responsive Shell | `tests/tier1-features/f02-nav-shell.test.js` | `tests/tier2-boundaries/b02-nav-shell-boundary.test.js` | `ORIGINAL_REQUEST.md §R2` |
| **F3** | Interactive Resume | `tests/tier1-features/f03-resume.test.js` | `tests/tier2-boundaries/b03-resume-boundary.test.js` | `ORIGINAL_REQUEST.md §FBLA Guidelines` |
| **F4** | Career Summary & BLS Research | `tests/tier1-features/f04-career-summary.test.js` | `tests/tier2-boundaries/b04-career-summary-boundary.test.js` | `ORIGINAL_REQUEST.md §FBLA Guidelines` |
| **F5** | Provenance Ledger & Sources | `tests/tier1-features/f05-provenance.test.js` | `tests/tier2-boundaries/b05-provenance-boundary.test.js` | `ORIGINAL_REQUEST.md §Acceptance Criteria` |
| **F6** | Career-Related Education | `tests/tier1-features/f06-career-education.test.js` | `tests/tier2-boundaries/b06-career-education-boundary.test.js` | `ORIGINAL_REQUEST.md §FBLA Guidelines` |
| **F7** | Educational Enhancement | `tests/tier1-features/f07-educational-enhancement.test.js` | `tests/tier2-boundaries/b07-educational-enhancement-boundary.test.js` | `ORIGINAL_REQUEST.md §FBLA Guidelines` |
| **F8** | Special Skills & MCE Endorsement | `tests/tier1-features/f08-special-skills.test.js` | `tests/tier2-boundaries/b08-special-skills-boundary.test.js` | `ORIGINAL_REQUEST.md §FBLA Guidelines` |
| **F9** | Media & 28+ Project Showcase | `tests/tier1-features/f09-project-showcase.test.js` | `tests/tier2-boundaries/b09-project-showcase-boundary.test.js` | `ORIGINAL_REQUEST.md §R2 & Known Links` |
| **F10**| Presenter Mode with 7-min Timer| `tests/tier1-features/f10-presenter-mode.test.js` | `tests/tier2-boundaries/b10-presenter-mode-boundary.test.js` | `ORIGINAL_REQUEST.md §R4` |
| **F11**| Printable PDF Companion | `tests/tier1-features/f11-printable-pdf.test.js` | `tests/tier2-boundaries/b11-printable-pdf-boundary.test.js` | `ORIGINAL_REQUEST.md §R4` |
| **F12**| Dual Variant Integrity | `tests/tier1-features/f12-dual-variants.test.js` | `tests/tier2-boundaries/b12-dual-variants-boundary.test.js` | `ORIGINAL_REQUEST.md §R3` |
| **F13**| Privacy & Security Redaction | `tests/tier1-features/f13-privacy-security.test.js` | `tests/tier2-boundaries/b13-privacy-security-boundary.test.js` | `ORIGINAL_REQUEST.md §Acceptance Criteria` |
| **F14**| Quality & Accessibility | `tests/tier1-features/f14-accessibility-quality.test.js` | `tests/tier2-boundaries/b14-accessibility-quality-boundary.test.js` | `ORIGINAL_REQUEST.md §Acceptance Criteria` |

---

## 5. Pairwise Combinatorial Interactions (Tier 3)

| # | Interaction | Test File | Focus |
|---|---|---|---|
| **P1** | F12 × F13 | `tests/tier3-pairwise/p01-variant-x-privacy.test.js` | Public vs Private Variant vs Redaction Gating |
| **P2** | F1 × F14 | `tests/tier3-pairwise/p02-theme-x-accessibility.test.js` | Cyber Theme Contrast (Midnight/Gold/Cyan) vs WCAG AA |
| **P3** | F10 × F2 | `tests/tier3-pairwise/p03-presenter-x-timer.test.js` | Presenter Mode vs Navigation Shell Section Sync |
| **P4** | F3 × F8 | `tests/tier3-pairwise/p04-resume-filter-x-skills.test.js` | Interactive Resume Filter vs Special Skills Taxonomy |
| **P5** | F9 × F2 | `tests/tier3-pairwise/p05-media-player-x-mobile.test.js` | Video Preview Players vs Fluid Responsive Viewport |
| **P6** | F4 × F5 | `tests/tier3-pairwise/p06-career-summary-x-provenance.test.js` | BLS Wage & Growth Data vs Provenance Citations |
| **P7** | F11 × F3 | `tests/tier3-pairwise/p07-print-mode-x-resume.test.js` | Print Companion vs Interactive Resume Uncollapsing |
| **P8** | F6 × F4 | `tests/tier3-pairwise/p08-education-x-career-impact.test.js` | Graduate Cyber Coursework vs Target Career Requirements |
| **P9** | F7 × F5 | `tests/tier3-pairwise/p09-enhancement-x-provenance.test.js` | 51-Job Federal Tracker vs Verifiable Evidence Ledger |
| **P10**| F8 × F5 | `tests/tier3-pairwise/p10-skills-x-certifications.test.js` | EdTech Special Skill vs Credly MCE Live Verification |
| **P11**| F9 × F12 | `tests/tier3-pairwise/p11-projects-x-variant.test.js` | 28 Project Directory vs Variant Clearance Gating |
| **P12**| F10 × F11| `tests/tier3-pairwise/p12-presenter-x-print.test.js` | Presenter Mode Suppression vs Print Isolation |
| **P13**| F2 × F3..F9| `tests/tier3-pairwise/p13-nav-anchors-x-sections.test.js` | Shell Navigation Anchors vs All Required Content Sections |
| **P14**| F1 × F12 | `tests/tier3-pairwise/p14-brand-mark-x-favicons.test.js` | Brand Mark Assets vs Dual Distribution Packaging |

---

## 6. Real-World Application Scenarios (Tier 4)

| # | Scenario Name | Test File | Features Exercised |
|---|---|---|---|
| **S1**| FBLA Judge Review Walkthrough | `tests/tier4-scenarios/s01-fbla-judge-walkthrough.test.js` | F1, F2, F3, F4, F5, F6, F7, F8, F9 |
| **S2**| Live Presenter 7-Minute Event | `tests/tier4-scenarios/s02-presenter-7min-event.test.js` | F2, F10, F11 |
| **S3**| Public Recruiter Deep-Dive (Sanitized)| `tests/tier4-scenarios/s03-public-recruiter-deepdive.test.js` | F1, F2, F3, F8, F9, F12, F13 |
| **S4**| Private Federal SFS Clearance Inspector | `tests/tier4-scenarios/s04-private-sfs-inspector.test.js` | F4, F5, F7, F9, F12 |
| **S5**| Offline / Printable Portfolio Audit | `tests/tier4-scenarios/s05-offline-print-audit.test.js` | F3, F4, F11 |
| **S6**| Mobile Viewport Stress Test (375px) | `tests/tier4-scenarios/s06-mobile-viewport-stress.test.js` | F1, F2, F3, F9, F10 |
| **S7**| Automated Outbound Link & Media Verification | `tests/tier4-scenarios/s07-link-media-verification.test.js` | F1, F5, F9, F14 |

---

## 7. Progressive Milestone Verification Guide

Builders implementing Milestones M1 through M5 can verify their progress incrementally:

- **Milestone 1 (Asset Pipeline & Foundation Layout)**:
  `node tests/runner.js --feature=F1` and `node tests/runner.js --feature=F2`
- **Milestone 2 (Core Content: Resume, Career Summary, Provenance)**:
  `node tests/runner.js --feature=F3`, `--feature=F4`, and `--feature=F5`
- **Milestone 3 (Sample Materials & Media Showcase)**:
  `node tests/runner.js --feature=F6`, `--feature=F7`, `--feature=F8`, and `--feature=F9`
- **Milestone 4 (Presentation Companions)**:
  `node tests/runner.js --feature=F10` and `node tests/runner.js --feature=F11`
- **Milestone 5 (Dual Variant Packaging & Verification)**:
  `node tests/runner.js --feature=F12`, `--feature=F13`, and `--feature=F14`
- **Full E2E Pass (All Milestones Complete)**:
  `node tests/runner.js` (Must achieve 187/187 passing test cases).
