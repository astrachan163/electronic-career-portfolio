# E2E Test Infra: Andrew Strachan Electronic Career Portfolio

## Test Philosophy
- **Opaque-box, requirement-driven**: Tests derive strictly from user requirements in `ORIGINAL_REQUEST.md` and the FBLA Electronic Career Portfolio rubric, with zero dependence on internal implementation design.
- **Methodology**: Category-Partition + Boundary Value Analysis (BVA) + Pairwise Combinatorial Testing + Real-World Workload Testing across 4 sequential tiers.
- **Progressive Testability**: Verification mechanisms do not depend on features more complex than what they verify (e.g. exit codes and DOM element presence before interactive animations).

---

## Feature Inventory
| # | Feature | Source (requirement) | Tier 1 (Coverage ≥5) | Tier 2 (Boundary ≥5) | Tier 3 (Pairwise) | Tier 4 (Scenario) |
|---|---------|---------------------|:--------------------:|:--------------------:|:-----------------:|:-----------------:|
| 1 | Brand Mark & Visual Theme | ORIGINAL_REQUEST §Source Material | 5 | 5 | ✓ | ✓ |
| 2 | Navigation & Responsive Shell | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 3 | Interactive Resume | ORIGINAL_REQUEST §FBLA Guidelines | 5 | 5 | ✓ | ✓ |
| 4 | Career Summary & BLS Research | ORIGINAL_REQUEST §FBLA Guidelines | 5 | 5 | ✓ | ✓ |
| 5 | Provenance Ledger & Sources | ORIGINAL_REQUEST §Acceptance Criteria | 5 | 5 | ✓ | ✓ |
| 6 | Career-Related Education | ORIGINAL_REQUEST §FBLA Guidelines | 5 | 5 | ✓ | ✓ |
| 7 | Educational Enhancement | ORIGINAL_REQUEST §FBLA Guidelines | 5 | 5 | ✓ | ✓ |
| 8 | Special Skills & MCE Endorsement | ORIGINAL_REQUEST §FBLA Guidelines | 5 | 5 | ✓ | ✓ |
| 9 | Media & 28+ Project Showcase | ORIGINAL_REQUEST §R2 & Known Links | 5 | 5 | ✓ | ✓ |
| 10 | Presenter Mode with 7-min Timer | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ | ✓ |
| 11 | Printable PDF Portfolio Companion | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ | ✓ |
| 12 | Dual Variant Integrity (Public vs Private) | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 13 | Privacy & Security Redaction | ORIGINAL_REQUEST §Acceptance Criteria | 5 | 5 | ✓ | ✓ |
| 14 | Quality & Accessibility (Lighthouse) | ORIGINAL_REQUEST §Acceptance Criteria | 5 | 5 | ✓ | ✓ |

*Total Target Minimum: 14 Features × 5 = 70 Tier 1 tests, 70 Tier 2 tests, 14 Tier 3 tests, 7 Tier 4 scenarios = 161+ automated assertions.*

---

## Test Architecture
- **Test Runner Location**: `/Users/andrewstrachan/career_portfolio/tests/runner.js`
- **Invocation**: `node tests/runner.js` (or npm test script)
- **Pass/Fail Semantics**: Exit code 0 if all tests pass; non-zero exit code with detailed failure diffs if any assertion fails.
- **Test Directories**:
  - `tests/tier1-features/` (Unit & Component Feature Verification)
  - `tests/tier2-boundaries/` (Boundary, Missing State & Error Handling)
  - `tests/tier3-pairwise/` (Cross-Feature & State Interaction Tests)
  - `tests/tier4-scenarios/` (E2E User & Judge Presentation Scenarios)

---

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | FBLA Judge Review Walkthrough | F1, F2, F3, F4, F5, F6, F7, F8, F9 | High |
| 2 | Live Presenter 7-Minute Competitive Event | F2, F10, F11 | High |
| 3 | Public Recruiter Deep-Dive (Sanitized) | F1, F2, F3, F8, F9, F12, F13 | High |
| 4 | Private Federal SFS Clearance Inspector | F4, F5, F7, F9, F12 | High |
| 5 | Offline / Printable Portfolio Audit | F3, F4, F11 | Medium |
| 6 | Mobile Viewport Stress Test (375px) | F1, F2, F3, F9, F10 | Medium |
| 7 | Automated Outbound Link & Media Verification | F1, F5, F9, F14 | Medium |

---

## Coverage Thresholds
- **Tier 1**: ≥ 5 test cases per feature (70+ tests)
- **Tier 2**: ≥ 5 boundary test cases per feature (70+ tests)
- **Tier 3**: Pairwise coverage of major feature interactions (14+ tests)
- **Tier 4**: ≥ 7 realistic end-to-end judge and user application scenarios
- **Total Minimum**: ≥ 161 automated test cases.
