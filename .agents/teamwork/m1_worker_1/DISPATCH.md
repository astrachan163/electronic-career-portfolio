## 2026-10-06T11:28:11Z
You are m1_worker_1, a teamwork_preview_worker implementing Milestone 1: Asset Pipeline & Foundation Layout for Andrew Strachan's Electronic Career Portfolio.

Your working directory is:
/Users/andrewstrachan/career_portfolio/.agents/teamwork/m1_worker_1

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

MANDATORY INSTRUCTIONS:
1. First read the authoritative user request at:
/Users/andrewstrachan/career_portfolio/.agents/teamwork/ORIGINAL_REQUEST.md
2. Read the global project specification at:
/Users/andrewstrachan/career_portfolio/.agents/teamwork/orchestrator_main/PROJECT.md
3. Read the reports from the 3 Milestone 1 Explorers:
- /Users/andrewstrachan/career_portfolio/.agents/teamwork/m1_explorer_1/analysis.md & handoff.md (Asset pipeline & copy script)
- /Users/andrewstrachan/career_portfolio/.agents/teamwork/m1_explorer_2/analysis.md & handoff.md (Semantic HTML5 DOM hierarchy & accessibility)
- /Users/andrewstrachan/career_portfolio/.agents/teamwork/m1_explorer_3/analysis.md & handoff.md (Cyber design system CSS tokens & responsive rules)
4. Read the survey fact sheets for authoritative content:
- /Users/andrewstrachan/career_portfolio/.agents/teamwork/survey_history_1/history_summary.md
- /Users/andrewstrachan/career_portfolio/.agents/teamwork/survey_codex_1/codex_summary.md
- /Users/andrewstrachan/career_portfolio/.agents/teamwork/survey_links_assets_1/links_assets_summary.md

WRITE OWNERSHIP (You own exclusively, do NOT touch tests/):
- `assets/` (brand/, previews/, screenshots/, docs/)
- `styles/main.css`, `styles/components.css`, `styles/print.css`
- `data/config.js`, `data/resume.json`, `data/career.json`, `data/projects.json`, `data/certifications.json`, `data/provenance.json`
- `index.html`
- `js/app.js`
- `tools/copy-assets.js`
- `package.json`

YOUR IMPLEMENTATION TASKS:
1. Implement and execute `tools/copy-assets.js` to copy all verified media assets into `/Users/andrewstrachan/career_portfolio/assets/`:
   - Brand mark: circuit "M" logo from brain uploaded media to `assets/brand/circuit-m-logo.jpg` and create a matching SVG/PNG favicon.
   - MCE badge: `Current Resume by Year/Badges & Certifications/mce-microsoft-certified-educator.png` to `assets/brand/mce-badge.png`.
   - 10s video previews & posters for Sanctum, AdaptiveHS, Tutor (and GHS for private) to `assets/previews/`.
   - Evidence screenshots to `assets/screenshots/`.
   - Presentation companion PDF to `assets/docs/`.
   Verify all file sizes < 100MB and relative paths are preserved.
2. Build data JSONs under `data/`:
   - `data/resume.json`: Andrew's education (UAB M.S. Cyber GPA 3.75 Dec 2027, Montevallo PCTF GPA 3.75, Mississippi College B.S. ACS Biochem Honors GPA 3.5, UMMC medicine), work history (CTE teacher Shades Valley with Torchbearer Award, Corner DECA state winners, MidSouth Extracts cGMP SOPs, SelectQuote, Maqkrs Consulting, UAB Python camp TA), and 17 STAR accomplishments.
   - `data/career.json`: BLS SOC 15-1212.00 data ($120,360 median, $182,370+ top decile, 32% growth, +53,200 jobs), federal CyberCorps SFS GS-9 to GS-14 trajectory, and 3 key industry obstacles (Post-Quantum crypto, agentic AI defense, infrastructure security).
   - `data/certifications.json`: MCE Credly badge URL (`https://www.credly.com/badges/d4e5c326-c255-405c-b50e-0a369d6fc3a0/public_url`) + 30 verified HTTP 200 LinkedIn Learning certificates.
   - `data/projects.json`: 4 curated highlight video projects (Sanctum, Tutor, AdaptiveHS, Maqkrs) + all 28+ verified live project links.
   - `data/provenance.json`: Audit mapping connecting every claim to its source file or verification URL.
   - `data/config.js`: Configuration module supporting public and private mode toggle.
3. Build CSS styles:
   - `styles/main.css`: Cyber theme tokens (Midnight `#060b13`, Gold `#d4af37`, Cyan `#00e5ff`, Teal `#0a9396`), typography, fluid responsive layout (375px, 768px, 1440px), glassmorphism, circuit border accents, WCAG AAA contrast, zero-CLS rules.
   - `styles/components.css`: Component styling for timeline, cards, video player container, filter chips, Presenter drawer, modals.
   - `styles/print.css`: Printable stylesheet formatted for clean PDF generation.
4. Build `index.html`:
   - High-impact semantic HTML5 structure with sticky header, circuit "M" logo, 7 FBLA section anchors, hero section, interactive resume, career research, sample materials (education, enhancement, special skills), media showcase (video players + live links), sources & provenance ledger, Presenter HUD drawer (with 7-minute timer, notes, shortcuts), and video dialog modal.
   - Full accessibility: semantic landmarks, skip link, ARIA live region (`#sr-announcer`), modal keyboard focus traps.
5. Build `js/app.js`:
   - Interactive behaviors: navigation scrolling, skills matrix filtering, video modal / inline playback, Presenter drawer open/close and 7-minute countdown timer with 1-minute alert, keyboard shortcuts (`Space`, `←`/`→`, `1-7`).
6. Run build / verification commands:
   - Verify assets copied and non-empty.
   - Verify zero syntax errors in JS/CSS/HTML.
   - Verify local node server or file loading works cleanly.
7. Write your handoff report to:
/Users/andrewstrachan/career_portfolio/.agents/teamwork/m1_worker_1/handoff.md
And report back via send_message when complete. Do NOT touch any files in `tests/`.
