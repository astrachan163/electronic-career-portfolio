# Project: Andrew Strachan's FBLA Electronic Career Portfolio

## Architecture

Andrew Strachan's Electronic Career Portfolio is a modern, high-polish, interactive responsive web application showcasing his qualifications, projects, research, and career trajectory as an Information Security Analyst and Cybersecurity Systems Engineer (Federal Public Service / CyberCorps SFS Specialization).

### System Topology & Modules
1. **Core Web Shell (`index.html`, `app.js`, `styles.css`)**:
   - Semantic HTML5 structure with responsive layouts (375px mobile, 768px tablet, 1440px desktop).
   - Cyber-themed design system: Midnight Navy (`#060b13` / `#0b1020`), Circuit Gold (`#d4af37`), Glowing Cyan (`#00e5ff`), with subtle glassmorphism and animated circuit borders.
   - Brand Mark: 1024×1024 circuit "M" diamond crest emblem (`assets/brand/media_1791283990241.jpg`).
   - Sticky navigation header with FBLA section anchors, theme status, Presenter Mode toggle, and PDF download action.
2. **Interactive Resume Module (`components/resume.js`)**:
   - Filterable skills matrix (Cybersecurity, AI/ML, Cloud/DevSecOps, Systems/Languages, Leadership/Teaching).
   - Experience timeline with STAR accomplishment cards, mapped evidence links, and verifiable credentials.
   - Academic record: UAB M.S. Cybersecurity (GPA 3.75, expected Dec 2027, SFS Fellow), Univ. of Montevallo PCTF (GPA 3.75), Mississippi College B.S. ACS Biochemistry Honors (GPA 3.5), UMMC medical training.
3. **Career Research & Summary Module (`components/career-summary.js`)**:
   - Target Career: Information Security Analyst & Cybersecurity Systems Engineer (Federal SFS Focus).
   - BLS SOC 15-1212.00 metrics: $120,360 median wage, $182,370+ top decile, 32% projected growth (+53,200 jobs), >500k cyber workforce gap.
   - Federal pay scales: GS-9 to GS-14 trajectory, security clearances, CyberCorps SFS service commitment.
   - Industry obstacles & mitigations: Post-quantum cryptography migration, agentic AI weaponization, national infrastructure defense.
4. **Sample Materials Module (`components/sample-materials.js`)**:
   - *Career-Related Education*: UAB graduate coursework, STRIDE threat modeling, Montevallo CTE finance/business, MC biochemistry, UMMC prosector training, Micro:bit middle school drone camp TA.
   - *Educational Enhancement*: 51-position federal opportunity tracker (`accurateinternshiptracker.xlsx`), 14 SFS Virtual Job Fair applications, international medical service (Uganda, Nepal Gilman Scholar), youth STEM mentoring.
   - *Special Skills*: Top 5 skills linked to verified endorsements:
     1. Secure Systems & Zero-Trust Architecture
     2. Educational Technology & Curriculum Development (linked to Credly-verified Microsoft Certified Educator badge)
     3. On-Device AI & Foundation Models (SwiftUI / Private Cloud Compute)
     4. Cloud & DevSecOps Infrastructure (AWS S3/CloudFront, Firebase)
     5. Regulatory Compliance & Quality Systems (cGMP SOP library, TAPE compliance)
     Plus 30 verified LinkedIn Learning course completion certificates.
5. **Interactive Media & Project Showcase (`components/projects.js`)**:
   - 4 Curated Showcase Cards with embedded 10s 720p H.264/VP9 video players & posters:
     1. CS646 Sanctum (Godot 3D cryptography memory palace, live on CloudFront)
     2. MaqkrsTutor2 (SwiftUI on-device Apple intelligence with PCC consent gate)
     3. AdaptiveHS (Next.js 15 homeschool platform)
     4. Maqkrs Planner (On-device assistant MVP)
   - Comprehensive directory of 28+ verified live project deployments.
6. **Presentation Companions (`components/presenter.js`, `print.css`)**:
   - Presenter Mode: 7-minute FBLA countdown timer, speaker notes drawer, slide jump hotkeys, fullscreen view.
   - Printable PDF Portfolio: High-fidelity `@media print` styling and downloadable companion matching the student benchmark standard.
7. **Sources & Provenance Ledger (`components/provenance.js`)**:
   - Every statistic and claim mapped to source files, Credly badges, BLS OOH, NIST SP 800 standards, and live URLs.
   - Rubric Scorecard with "Exceeds Expectations" ratings across all 9 FBLA categories.
8. **Variant Generator & Build Pipeline (`tools/build.js`)**:
   - Public variant: Sanitized of phone numbers, personal email, test credentials (`z@z.com`), and private repositories for GitHub Pages.
   - Private variant: Full unredacted site with case studies and test logins for Firebase Hosting.

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Asset Pipeline & Brand Mark | Copy videos, posters, brand mark "M" logo, and screenshots to `assets/` | M1 | survey |
| 2 | Semantic Web Shell & Cyber Theme | Dark midnight/gold/cyan theme, responsive layout (375/768/1440px), nav | M1 | survey |
| 3 | Interactive Resume Component | Filterable skills matrix, experience timeline, education, STAR cards | M2 | survey |
| 4 | Career Research & Summary | BLS SOC 15-1212.00 stats, salaries, 32% growth, federal SFS track, obstacles | M2 | survey |
| 5 | Provenance Ledger & Sources | Full audit trail tracing every claim to source file/link; BLS/NIST citations | M2 | survey |
| 6 | Career-Related Education | UAB MS Cyber, STRIDE models, Montevallo PCTF, MC honors, teaching impact | M3 | survey |
| 7 | Educational Enhancement | 51-job federal tracker, 14 SFS job fair apps, Uganda/Nepal service, projects | M3 | survey |
| 8 | Special Skills & MCE Credential | Top 5 skills, Credly MCE badge embed, 30 LinkedIn certificates directory | M3 | survey |
| 9 | Curated Media & Project Showcase | 4 video preview players (Sanctum, Tutor, AdaptiveHS, Maqkrs) + 28 live links | M3 | survey |
| 10 | Presenter Mode with 7-min Timer | FBLA 7-min timer, speaker notes drawer, presentation keyboard shortcuts | M4 | survey |
| 11 | Printable PDF Portfolio Companion | Print stylesheet `@media print` + printable PDF download companion | M4 | survey |
| 12 | Dual Variant Build Pipeline | Automated generator producing sanitized Public and full Private builds | M5 | survey |
| 13 | Verification, Privacy & Lighthouse | 0 broken links, 0 console errors, privacy scan, Lighthouse A11y ≥90 / Perf ≥80 | M5 | survey |
| 14 | Deployment to GitHub Pages & Firebase | Public on GitHub Pages, Private on Firebase Hosting, URLs reported | M5 | survey |
| 15 | E2E Testing & Adversarial Hardening | Pass 100% of Tiers 1-4 tests, white-box adversarial hardening Tier 5 | Final | survey |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Asset Pipeline & Foundation Layout | Copy local media, setup base HTML5 shell, cyber design tokens, responsive layout | none | DONE |
| M2 | Core FBLA Content: Resume, Career Summary & Provenance | Interactive resume, BLS career summary & research, citations & provenance ledger | M1 | DONE |
| M3 | Sample Materials & Media Showcase | Career education, educational enhancement, special skills (MCE/LinkedIn), 4 video players & 28 live links | M1, M2 | DONE |
| M4 | Presentation Companions | Presenter Mode (7-min timer, notes), printable PDF companion | M2, M3 | DONE |
| M5 | Dual Variant Packaging, Verification & Deployment | Public/Private build pipeline, privacy scrub, link check, Lighthouse audit, GitHub Pages deploy | M1-M4 | DONE |
| Final | E2E Testing Pass & Verification Suite | 100% pass of E2E suite (187/187 tests, 488 assertions, 0 failures across Tiers 1-4) | M1-M5, TEST_READY | DONE |
| Atlas | Project Atlas Hero Scroll Staging & Verification | maqkrs_invasion.mp4 scroll hero staged at top, 3D rover preserved, 0 console errors, deploy manifest verified | none | VERIFIED (DEPLOYMENT GATED) |

---

## Interface Contracts

### Public vs Private Data Config Contract (`data/config.js`)
```javascript
// Interface contract defining variant behavior
export interface PortfolioConfig {
  variant: 'public' | 'private';
  redacted: boolean;
  contact: {
    name: string;
    location: string;
    email: string; // 'strachan@uab.edu' on public, full on private
    phone?: string; // OMITTED on public, included on private
  };
  credentials: {
    showTestLogins: boolean; // false on public, true on private
    ghsLogin?: { username: string; pass: string };
  };
  projects: ProjectItem[];
}
```

### Video Player & Media Component Contract (`components/media-player.js`)
```javascript
export interface MediaPreviewProps {
  id: string;
  title: string;
  mp4Url: string;
  webmUrl: string;
  posterUrl: string;
  durationSeconds: number;
  liveUrl?: string;
  repoUrl?: string;
}
```

### Presenter Mode Interface Contract (`components/presenter.js`)
```javascript
export interface PresenterState {
  active: boolean;
  currentSection: string;
  elapsedSeconds: number;
  maxSeconds: number; // 420 (7 minutes)
  notes: Record<string, string[]>; // Section ID -> speaker note bullet points
}
```

---

## Code Layout
```
career_portfolio/
├── index.html                   # Core interactive web portfolio entry point
├── presenter.html               # Dedicated presenter mode view (or integrated via modal)
├── styles/
│   ├── main.css                 # Design system, CSS variables, cyber theme, layout
│   ├── components.css           # Modular component styling (cards, timelines, media)
│   └── print.css                # High-fidelity print styles for PDF generation
├── js/
│   ├── app.js                   # Application bootstrap, navigation, event wiring
│   ├── config.js                # Configuration contract (public/private switch)
│   ├── resume.js                # Interactive resume & skills filter logic
│   ├── media.js                 # Video preview players & live modal launcher
│   └── presenter.js             # 7-minute timer & speaker notes drawer
├── data/
│   ├── resume.json              # Structured resume facts (education, experience, STAR)
│   ├── career.json              # BLS SOC 15-1212.00 data, federal pay scales, research
│   ├── projects.json            # 17 projects + 4 video highlights + 28 live URLs
│   ├── certifications.json      # MCE Credly verification + 30 LinkedIn certificates
│   └── provenance.json          # Evidence mapping ledger connecting claims to files
├── assets/
│   ├── brand/                   # Circuit "M" logo, favicons, vector marks
│   ├── previews/                # 10s video clips (MP4/WebM) and posters
│   ├── screenshots/             # High-res UI evidence and project screenshots
│   └── docs/                    # Printable presentation companion PDF
├── tools/
│   ├── build.js                 # Dual variant builder (public vs private)
│   ├── check-links.js           # Automated broken link & media validator
│   └── check-privacy.js         # Automated redaction & privacy scanner
├── dist/
│   ├── public/                  # Sanitized production build for GitHub Pages
│   └── private/                 # Full production build for Firebase Hosting
└── tests/
    ├── e2e/                     # Dual-track E2E test suite (Tiers 1-4)
    └── runner.js                # Opaque-box test runner
```


---

## Verification Evidence Artifacts (Mandatory Acceptance Files)
The following evidence files MUST be produced, saved in the repository, and verified before declaring project completion:
1. **Chrome Console 0 Errors**: `reports/evidence/chrome-console.json` and `reports/evidence/chrome-console.md` (tested across all pages in both variants in headless Chrome).
2. **Lighthouse Audit**: `reports/evidence/lighthouse-report.json` and `reports/evidence/lighthouse-report.html` (Accessibility ≥ 90, Performance ≥ 80).
3. **Visual Layout Screenshots**: `reports/evidence/screenshots/viewport-375px.png`, `viewport-768px.png`, and `viewport-1440px.png`.
4. **Live Link & Citation HTTP Audit**: `reports/evidence/link-check.json` and `reports/evidence/link-check.md` (every project URL and citation URL tested).
5. **Printable PDF Export Verification**: `reports/evidence/pdf-verification.md` (PDF verified to open, contain all required sections, and show clear text/images).
6. **Independent Judge Rubric Scorecard**: `reports/rubric-scorecard.md` (scoring all 9 FBLA rating-sheet rows as "Exceeds Expectations" with specific DOM/content evidence citations).
7. **Public Build Privacy Scan**: `reports/evidence/privacy-scan.json` and `reports/evidence/privacy-scan.md` (confirming 0 phone numbers, 0 personal emails, 0 test credentials, 0 private links in public output).
