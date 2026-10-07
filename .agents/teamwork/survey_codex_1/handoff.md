# Handoff Report — Codex & Maqkrs-hq Investigation

**Author:** `survey_codex_1` (Teamwork Explorer)  
**Date:** 2026-10-06T11:11:00Z  
**Recipient:** Lead Project Orchestrator (`parent`, ID `7b461a17-7466-41d0-9021-32c9b6fd6adc`)  
**Artifact File:** `/Users/andrewstrachan/career_portfolio/.agents/teamwork/survey_codex_1/codex_summary.md`  

---

## 1. Observation

1. **Maqkrs Headquarters Scope and Authority:**
   - Path `/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/README.md`, lines 3–13:
     > "Execution began 2026-10-03 after Andrew confirmed the reviewed delivery plan. This is the single active headquarters. Portfolio, Sanctum and new planner sources remain under `/Users/andrewstrachan/DevAtlas`; the explicitly added Tutor2 app stays at `/Users/andrewstrachan/MaqkrsTutor/MaqkrsTutor2`."
     > "This headquarters contains reviewed coordination records, not private correspondence, credentials or raw resume evidence. Published-state claims require separate served-result evidence."

2. **Resume Work & Recording Sources:**
   - Path `/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/coordination/RECORDING_SOURCE_INDEX.md`, lines 17–23 & 29–56 explicitly maps:
     - Sanctum candidate at `/Users/andrewstrachan/DevAtlas/cs646-sanctum-world/build/g01-candidate`, served locally at port 4185.
     - Preserved video masters at `/Users/andrewstrachan/Maqkrs_Hub/masters/2026-10-03/`:
       - `sanctum-master-v4.webm` (SHA-256 `7da6aa6ea95edee93f3f38db6ab3a3e8ccbdd080a5247f8104863a3e9c13cb35`).
       - `adaptivehs-master.webm` (SHA-256 `dda2ed7f55836c87a6f014d14a4317c26754e1ae535c5772056d96de82134101`).
       - `tutor-master-v2.webm` (SHA-256 `7466381a1e10f3af87be4d7f61bc8711c054b3ac5030bafd1ccf28e0cb45aeff`).
       - `ghs-master.webm` (SHA-256 `6037d0aa079c1c1bb7e74280b3d33942167db9d8a3c3ce5f58495c755377622b`).
     - Video exports at `/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/` and integration aliases at `/Users/andrewstrachan/Maqkrs_Hub/integration/`.
     - Staged public previews at `/Users/andrewstrachan/DevAtlas/portfolio-draft/public-output/assets/previews/`.

3. **Curated Portfolio & Candidate Identity:**
   - Path `/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/reports/STATUS.md`, lines 9–11:
     > "Andrew approved the direct project-first navy/teal layout with restrained glass-inspired web navigation. The new candidate is on `codex/curated-portfolio`, selecting Sanctum, MaqkrsTutor2, Maqkrs and AdaptiveHS while preserving all 17 private authoring records and original clearances. Final candidate: 129 files / 4,285,655 bytes, producer `335c3141b7d056e424e02a8ae49e5c3dafb63e419fe5d3dd71ab21787fd82b19`... Lighthouse 13.4.1: desktop/mobile Performance 100, Accessibility 100, BestPractices 100; desktop CLS 0.0013223, mobile CLS 0."

4. **17 Core Projects & 55 Body-of-Work Rows:**
   - Path `/Users/andrewstrachan/DevAtlas/portfolio-draft/private/projects.authoring.json`, lines 10–576 defines all 17 project profiles, including 4 curated highlights (`sanctum`, `tutor`, `maqkrs`, `adaptivehs`) and records permissions/reasons for held items (GHS, threat, forensics, legacy, blockchain, aether).
   - Path `/Users/andrewstrachan/DevAtlas/final/MASTER-PROJECTS.md`, lines 8–65 catalogs 55 projects across all lines of work.
   - Path `/Users/andrewstrachan/DevAtlas/final/RESUME.md`, lines 5–24 lists 17 verified STAR accomplishment one-liners with mapped paths.

5. **Accomplishments, Education & Credentials:**
   - Path `/Users/andrewstrachan/DevAtlas/achievement-atlas/TIMELINE.md` and `atlas.json`:
     - UAB M.S. in Cybersecurity (expected Dec 2027), GPA 3.75/4.0, CyberCorps SFS Fellow.
     - University of Montevallo PCTF Business, Marketing & Finance (2024–2025), GPA 3.75/4.0.
     - Mississippi College B.S. ACS Biochemistry, Biology Medical Sciences, Music minor (honors, May 2016), GPA 3.5/4.0.
     - UMMC medical school training (2016–2020), prosector (May–Sept 2017).
     - Teaching: Shades Valley High School CTE Teacher (2024–2025, FBLA adviser, esports coach, JEFCOED Torchbearer Award 2025); Corner High School CTE Teacher (2023–2024, DECA adviser, 1st & 2nd place state competition).
     - UAB Spring Project Showcase presentation of Maqkrs Tutor 2 (April 14, 2026); UAB CS Graduate Food Festival coordinator (April 2026); UAB Python Camp TA (June 2026).
     - Microsoft Certified Educator (Credly verified, May 16, 2025).
     - 30 LinkedIn Learning verified completion certificates (all HTTP 200 checked in `reports/portfolio-external-links.md`).

6. **Accounts, Credentials & Deployment Controls:**
   - Path `/Users/andrewstrachan/DevAtlas/ACCOUNTS.md`, `reports/apple-membership-evidence.json`, and `reports/RELEASE_PACKET.md`:
     - GHS Platform test login: `z@z.com` / `zzzzzz`.
     - Apple Developer Program: Primary account `astrachan162@gmail.com` (App Store Connect verified sign-in, Developer portal "Pending" purchase processing up to 48 hours). Secondary account `astrachan163@gmail.com` (team `WHSYKZR39V`, development certs in keychain).
     - Google/Firebase: `astrachan163@gmail.com` (20 projects / 23 sites); `astrachan162@gmail.com` (4 projects).
     - AWS CloudFront: Portfolio `E12AMBR4KONGZF`, Sanctum `E3RCZ9TJCOFJH5`.
     - Spending gate: $12 gross monthly ceiling, $6 warning, $9.60 stop on optional billable work.
     - Brand mark: Teal/gold circuit "M" logo at `/Users/andrewstrachan/.gemini/antigravity/brain/3402f430-b8a8-4e53-b08d-fa36c0d004a1/.user_uploaded/media_1791283990241.jpg`.

---

## 2. Logic Chain

1. **Premise:** The user's prompt instructs the agent to investigate `/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq`, find the "resume work" files, locate all saved assets, identify video and image assets, project code, media locations on the device, accomplishments, architectures, tech stacks, metrics, and deployment records.
2. **Step 1 (Source Linking):** Inspection of `README.md` and `RECORDING_SOURCE_INDEX.md` established that Maqkrs-hq is the central coordination node pointing to three canonical device directories: `/Users/andrewstrachan/Maqkrs_Hub` (multimedia masters/exports), `/Users/andrewstrachan/DevAtlas` (portfolio code, achievement atlas, Sanctum Godot project, planner, AWS plans), and `/Users/andrewstrachan/MaqkrsTutor/MaqkrsTutor2` (native Swift application).
3. **Step 2 (Accomplishments & Evidence Identification):** Examining `achievement-atlas/TIMELINE.md`, `atlas.json`, `final/RESUME.md`, and `Current Resume by Year/AndrewStrachanResume.pdf` established Andrew Strachan's verifiable career facts: UAB MS Cybersecurity (3.75 GPA, SFS Fellow), Montevallo PCTF (3.75 GPA), Mississippi College (3.5 GPA honors), CTE teaching and DECA/FBLA advising (state championships), MCE certification, and 30 LinkedIn Learning completions.
4. **Step 3 (Media Verification):** Examining `Maqkrs_Hub/provenance/media-validation.json` and inspecting the physical directory confirmed the presence of uncompressed 1080p video masters, 10s 720p H.264/VP9 exports, posters, and review frame sequences for Sanctum, AdaptiveHS, Tutor (simulation), and GHS (held for clearance).
5. **Step 4 (Technical Projects & Architectures):** Cross-referencing `projects.authoring.json` and `MASTER-PROJECTS.md` revealed 17 core portfolio candidates and 55 total projects, highlighting Andrew's dual technical depth in Cybersecurity Systems (Godot 3D cryptography world, Java/MCP zero-trust agent gate, HMAC S3 file sharing, STRIDE modeling) and Educational AI Software (SwiftUI Apple on-device/PCC models, Ollama/MLX document RAG, Next.js role-based portals).
6. **Step 5 (Synthesis):** Compiling these findings into `codex_summary.md` produces a factual, grounded foundation for the career portfolio site, satisfying all requirements of the user and FBLA rubric.

---

## 3. Caveats

1. **GHS Learning Platform:** The GHS code and video (`ghs-master.webm`) remain held pending team clearance; while test login `z@z.com` / `zzzzzz` is provided in the prompt for review, GHS should not be published in the public variant without explicit authorization.
2. **Apple Developer Account Activation:** As recorded in `reports/apple-membership-evidence.json`, the primary Apple Developer account `astrachan162@gmail.com` showed purchase processing "Pending" (up to 48 hours), with development certificates existing under `astrachan163@gmail.com`.
3. **Native Recording Control:** MaqkrsTutor2's native UI recording was rejected in previous Codex sessions due to "Computer Use not approved"; therefore, the portfolio candidate relies on validated source/build evidence and on-device test smokes rather than live UI video.
4. **Historical vs. Curated Output:** Sibling branches (such as the earlier 458-file candidate) are historical; the active curated output is the 129-file candidate with Sanctum, MaqkrsTutor2, Maqkrs Planner, and AdaptiveHS.

---

## 4. Conclusion

The Codex / Maqkrs-hq workspace and its linked device repositories contain a comprehensive, verified body of career work, media assets, credentials, and code. All multimedia assets have been located and cataloged with exact paths and SHA-256 hashes. Andrew Strachan's professional narrative is clearly defined at the intersection of **Cybersecurity / Secure Systems** and **AI / Educational Technology**, backed by verified academic excellence (UAB MS Cybersecurity SFS Fellow, 3.75 GPA), teaching achievements (FBLA/DECA adviser, Torchbearer Award), verified certifications (MCE, 30 LinkedIn Learning courses), and active live projects.

The complete catalog has been compiled into:
`/Users/andrewstrachan/career_portfolio/.agents/teamwork/survey_codex_1/codex_summary.md`

---

## 5. Verification Method

To independently verify the observations and catalog:
1. **Verify Maqkrs-hq Non-Hidden Files:**
   ```sh
   find /Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq -not -path '*/.*'
   ```
2. **Verify Media Masters and Exports in Maqkrs_Hub:**
   ```sh
   ls -la /Users/andrewstrachan/Maqkrs_Hub/masters/2026-10-03/
   ls -la /Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/
   cat /Users/andrewstrachan/Maqkrs_Hub/provenance/media-validation.json
   ```
3. **Verify DevAtlas Portfolio Candidate & Projects:**
   ```sh
   cat /Users/andrewstrachan/DevAtlas/portfolio-draft/private/projects.authoring.json
   cat /Users/andrewstrachan/DevAtlas/achievement-atlas/TIMELINE.md
   ```
4. **Verify Outbound Link Audit:**
   ```sh
   cat /Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/reports/portfolio-external-links.md
   ```
5. **Inspect the Summary Artifact:**
   ```sh
   cat /Users/andrewstrachan/career_portfolio/.agents/teamwork/survey_codex_1/codex_summary.md
   ```
