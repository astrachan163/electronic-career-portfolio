# Handoff Report: Conversation History & Portfolio Specification Mining

**Agent:** `survey_history_1` (teamwork_preview_spec_miner)  
**Date:** 2026-10-06T11:20:00Z  
**Target File:** `/Users/andrewstrachan/career_portfolio/.agents/teamwork/survey_history_1/history_summary.md`  

---

## 1. Observation

1. **Authoritative Conversation History File:**
   - Path: `/Users/andrewstrachan/Downloads/Resumeprofundus-atlasportfolio.md`
   - File statistics: 12,738 lines, 923,408 bytes (approx. 902 KB).
   - Character formatting: Text contains backslash-escaped Markdown elements (`\#`, `\>`, `\<details\>`, `\[...\]`).
   - Line 1: ` \# Resume profundus-atlas portfolio`
   - Line 12: `> The Follow-up with Liz at NSF" Use the [$openai-templates:artifact-template-system-design](~/.codex/plugins/cache/openai-curated-remote/openai-templates/0.1.1/skills/artifact-template-system-design/SKILL.md) template.`
   - Lines 855–865: "The first showcase highlights are **Sanctum, Local AI Tutor, GHS Secure SDLC, and AdaptiveHS**."
   - Lines 7350–7400: Records the creation of `PrivacyInfo.xcprivacy` manifests and deterministic vector icon renderers (`script/render_beta_icons.swift`) for Maqkrs Planner and MaqkrsTutor2.
   - Line 12724: `**Resume from this file:** [RESUME_HERE.md](~/Maqkrs_Local_Backups/2026-10-03_090504/RESUME_HERE.md)`

2. **Resume Documents:**
   - `/Users/andrewstrachan/Downloads/AndrewStrachanResume_Fall_2026.docx` (11,938 characters XML text extracted):
     - Contact: "Andrew Strachan | Birmingham, AL | 228-224-7445 | strachan@uab.edu"
     - Education:
       - "Mississippi College, Clinton, MS | B.S. ACS Biochemistry | Biology Medical Sciences | Music (minor) | Graduated with Honors: May 2016"
       - "University of Mississippi School of Medicine, Jackson, MS | Doctor of Medicine (incomplete) | 2016 to 2020"
       - "University of Montevallo, Montevallo, AL | Provisional Certificate in a Teaching Field - Business, Marketing, and Finance | 2024 to 2025"
       - "University of Alabama Birmingham, Birmingham, AL | Masters of Cybersecurity | Expected Graduation: Dec 2027"
     - Experience:
       - UAB Python Coding Summer Camp Teaching Assistant (June 2026)
       - Shades Valley High School, CTE Teacher: Business, Marketing, and Finance (Aug 2024 – June 2025) — National Academy of Finance; Adviser for the state's largest FBLA chapter; Esports Coach; TAPE compliance.
       - Corner High School, CTE Teacher: Business, Marketing, and Finance (Sept 2023 – June 2024) — DECA Adviser; 1st and 2nd place winners at 2024 Alabama DECA CDC; TAPE compliance.
       - MidSouth Extracts LLC, Operational Director (Jan 2023 – May 2023) — cGMP medical extraction facility, SOP library authoring.
       - SelectQuote Insurance Services, Sales Development Specialist (Apr 2021 – Nov 2022).
       - Maqkrs Consulting, Founder & Technologist (2022 – Present).
   - `/Users/andrewstrachan/DevAtlas/portfolio-draft/public-output/resume/index.html`:
     - Line 46: `CyberCorps Scholarship for Service (SFS) Fellow and M.S. Cybersecurity student at the University of Alabama at Birmingham.`
     - Line 52: `University of Alabama at Birmingham — M.S. Cybersecurity | Expected December 2027 · GPA 3.75/4.0 · CyberCorps SFS Fellow`
     - Line 56: `Mississippi College — B.S. ACS Biochemistry, Biology Medical Sciences, Music (minor) | Graduated with Honors, May 2016 · GPA 3.5/4.0`
     - Line 60: `University of Montevallo — Provisional Certificate in a Teaching Field, Business, Marketing, and Finance | 2024 to 2025 · coursework GPA 3.75/4.0`

3. **Curated Atlas & Project Registers:**
   - `/Users/andrewstrachan/DevAtlas/achievement-atlas/atlas.json`:
     - Contains 54 structured achievement records, 5 skills taxonomy definitions, 8 primary source declarations, and 4 portfolio lenses (`federal_cybersecurity`, `ai_education`, `leadership_service`, `research_future`).
   - `/Users/andrewstrachan/DevAtlas/portfolio-draft/private/projects.authoring.json`:
     - Contains 17 cataloged project records: `sanctum`, `how-built`, `tutor`, `ghs`, `adaptivehs`, `adaptiveprep`, `blockchain`, `citadel`, `cockpit`, `aws`, `network`, `threat`, `forensics`, `maqkrs`, `legacy`, `jefcoed`, `aether`.
   - `/Users/andrewstrachan/DevAtlas/portfolio-draft/public-output/data/projects.json`:
     - Cleared public highlight projects: `sanctum`, `tutor`, `maqkrs`, `adaptivehs`.

4. **Certifications & Digital Credentials:**
   - Microsoft Certified Educator (MCE): Issued May 16, 2025. Credly badge verification URL: `https://www.credly.com/badges/d4e5c326-c255-405c-b50e-0a369d6fc3a0/public_url`.
   - 30 LinkedIn Learning Certifications: Curated in `/Users/andrewstrachan/DevAtlas/portfolio-draft/public-output/data/linkedin-learning.json` spanning Generative AI, LangChain multi-agent systems, AI governance, cloud infrastructure, and accounting foundations.
   - Alabama Teaching Licensure: Provisional Certificate in a Teaching Field (PCTF) in Business, Marketing, and Finance (2024–2025).

5. **Federal Internship & Job Fair Evidence:**
   - `/Users/andrewstrachan/Downloads/Afterwards/my-journey-2026 CyberAICorps- Scholarship for Service (SFS) Virtual Job Fair-1790979083883.xlsx`:
     - Verifies 14 federal application actions submitted on September 18, 2026: Space Force (Space Systems Command), IRS, TSA, MARFORCYBER, Department of Justice (CCIPS Cyber Crime Lab), CISA, DOJ EOIR, Space Dynamics Lab, IDA, CBP Cyber Threat Intelligence Team, NSF Pathways, Air Force Civilian Service, Sandia National Laboratories (Center for Cyber Defenders), and US DOT Volpe Center.
   - `/Users/andrewstrachan/Downloads/Afterwards/accurateinternshiptracker.xlsx`:
     - 51 tracked federal opportunities categorized into Dream Tier (D1–D6: OSTP, ONCD, White House, USDS, US Tech Force, PIF), Priority 1–18 (USASMDC, NASA OSTEM, LANL, LLNL, Army SDDC, ORNL, Sandia, JHU APL, AFCS), and rolling vacancy trackers.

6. **Media Assets on Disk:**
   - Directory: `/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/`:
     - `sanctum-v1-10s-720p.mp4` (177 KB) & `sanctum-v1-10s-720p.webm` (415 KB) & `sanctum-v1-poster.png` (429 KB)
     - `tutor-v1-10s-720p.mp4` (121 KB) & `tutor-v1-10s-720p.webm` (239 KB) & `tutor-v1-poster.png` (233 KB)
     - `adaptivehs-v1-10s-720p.mp4` (139 KB) & `adaptivehs-v1-10s-720p.webm` (267 KB) & `adaptivehs-v1-poster.png` (220 KB)
   - Directory: `/Users/andrewstrachan/Maqkrs_Hub/held-for-clearance/exports/2026-10-03/`:
     - `ghs-v1-10s-720p.mp4` (256 KB) & `ghs-v1-10s-720p.webm` (333 KB) & `ghs-v1-poster.png` (219 KB)
   - Brand Mark Emblem: `/Users/andrewstrachan/.gemini/antigravity/brain/3402f430-b8a8-4e53-b08d-fa36c0d004a1/.user_uploaded/media_1791283990241.jpg` (103 KB).

7. **Official FBLA Competitive Event Specification:**
   - `/Users/andrewstrachan/UAB_Timeline_Meeting/Electronic Portfolio/Electronic Career Portfolio.pdf`:
     - 7-page official guidelines and rating sheet (High School division, updated August 2024).
     - Rating Sheet: 100 points total. "Exceeds Expectations" criteria defined across Resume (10 pts), Career Research (10 pts), Career-Related Education (15 pts), Special Skills linked to certification/endorsement (15 pts), Professionally Legitimate Sources (10 pts), Use of Portfolio in Presentation (10 pts), and Presentation Delivery (30 pts).

---

## 2. Logic Chain

1. **Deriving the Career Recommendation:**
   - *Premise A:* Andrew is currently funded as a CyberCorps Scholarship for Service (SFS) Fellow under the National Science Foundation (NSF) while enrolled in the UAB M.S. Cybersecurity program (GPA 3.75, Dec 2027). SFS recipients make a binding commitment to complete qualified cybersecurity service within the federal government upon graduation (Observation 1, Line 12; Observation 2, Resume; Observation 5, SFS Job Fair).
   - *Premise B:* Andrew's active job application portfolio consists of 14 federal agency submissions at the CyberCorps SFS Virtual Job Fair and 51 tracked federal positions spanning the Executive Office of the President, national laboratories, defense commands, and civil agencies (Observation 5).
   - *Premise C:* His major software architectures (Sanctum cryptographic world, Citadel zero-trust MCP gatekeeper, CS532 secure expiring file sharing, CS636 STRIDE threat modeling, and CJ502 digital forensics) demonstrate core competency in cyber defense, zero-trust, and secure systems (Observation 1, Lines 855–865; Observation 3).
   - *Conclusion:* The definitive career focus for Andrew Strachan's FBLA Electronic Career Portfolio must be **Information Security Analyst & Cybersecurity Systems Engineer (Federal Public Service / CyberCorps SFS Track)**. His secondary strengths in on-device AI engineering (MaqkrsTutor2) and instructional leadership (CTE teacher, DECA/FBLA adviser, Microsoft Certified Educator) provide the specialized technical and communication edge needed to attain the top rating ("Exceeds Expectations") in all rubric categories.

2. **Reconciling Project Highlight Selections:**
   - *Premise:* The Codex conversation established four highlight projects (`sanctum`, `tutor`, `ghs`, `adaptivehs`) but classified `ghs` as `held-for-team-clearance` pending team authorization, while promoting `sanctum`, `tutor`, and `adaptivehs` alongside `maqkrs` to public candidate status (Observation 1, Lines 855–865; Observation 3; Observation 6).
   - *Conclusion:* The public portfolio should prominently feature `sanctum`, `tutor`, `adaptivehs`, and `maqkrs` with video previews, while maintaining `ghs` in the private variant / case study archive until team clearances are formalized.

3. **Satisfying the FBLA "Special Skills" Exceeds Expectations Row:**
   - *Premise:* The FBLA rating sheet specifies that to reach "Exceeds Expectations" (13–15 pts), the competitor must: "Share and correlate at least one special skill or proficiency related to desired career skill that is linked to a certification or endorsement" (Observation 7).
   - *Premise:* Andrew possesses an active, Credly-verified **Microsoft Certified Educator (MCE)** credential (issued May 16, 2025) and an Alabama State Teaching Certificate (PCTF in Business, Marketing, and Finance), alongside 30 LinkedIn Learning professional certifications in AI, Agents, and Cloud Security (Observation 4).
   - *Conclusion:* Correlating his Educational Technology & Training proficiency to the verified Microsoft Certified Educator credential directly satisfies the highest rating sheet requirement, proving his ability to lead organizational security training and workforce development.

---

## 3. Caveats

1. **Pre-Graduation Degree Completion:** Andrew is an active graduate student at UAB with an expected graduation date of December 2027. All resume and summary representations must designate this degree as "Candidate / Expected Graduation: Dec 2027", rather than an earned credential.
2. **Medical School Status:** Coursework at UMMC (2016–2020) was completed in good standing for four years, but the degree was not conferred. The resume and portfolio accurately state "Doctor of Medicine (incomplete)", framing this experience around biomedical science mastery, clinical decision-support systems, and gross anatomy instruction.
3. **Privacy Boundary Compliance:** In compliance with R3 and R5 of `ORIGINAL_REQUEST.md`, personal telephone numbers (`228-224-7445`), personal email addresses (`astrachan161@gmail.com`, etc.), test credentials (`z@z.com` / `zzzzzz`), and unlisted course repository keys must never appear in the public GitHub Pages build.
4. **Third-Party Client IP:** Customer-specific data from Maqkrs Consulting clients (e.g., Victorious Herbal Elements e-commerce customer data, Legacy Meadows legal documents) must remain synthetic or sanitized.

---

## 4. Conclusion

The specification mining of `Resumeprofundus-atlasportfolio.md` and related disk repositories is complete. The findings have been synthesized into `/Users/andrewstrachan/career_portfolio/.agents/teamwork/survey_history_1/history_summary.md`. 

Key deliverables established:
- **Definitive Career Focus:** Information Security Analyst & Cybersecurity Systems Engineer (Federal CyberCorps SFS Specialization).
- **Comprehensive Resume Fact Base:** Verbatim education (UAB M.S. Cyber GPA 3.75; Mississippi College B.S. ACS Biochemistry Honors GPA 3.5; Univ. of Montevallo PCTF GPA 3.75; UMMC Medicine), work experience, teaching/coaching leadership, 17 software projects, and consulting.
- **FBLA Career Summary Data:** BLS 15-1212.00 metrics (32% growth, $120,360 median salary, $182,370+ top decile, federal GS-9 to GS-14 pathways, cybersecurity workforce gap).
- **Full Sample Materials Mapping:** Career-related education (STRIDE threat models, micro:bit drone camp, DECA state winners), educational enhancement (51-opportunity federal tracker, SFS Job Fair, international medical work in Uganda/Nepal, products developed), and top 5 special skills.
- **Credential Linkage:** Direct correlation to the Credly-verified Microsoft Certified Educator badge, Alabama teaching licensure, and 30 LinkedIn Learning certificates.
- **Asset Directory:** Local paths to 10-second web-optimized video clips (MP4/WebM/posters in `/Users/andrewstrachan/Maqkrs_Hub/`), high-resolution screenshots in DevAtlas, brand mark image, and 23 active live project links.

---

## 5. Verification Method

To independently verify the facts, paths, and data documented in this report:

1. **Verify Local Video & Media Assets:**
   ```bash
   ls -la /Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/
   ls -la /Users/andrewstrachan/Maqkrs_Hub/masters/2026-10-03/
   ls -lh /Users/andrewstrachan/.gemini/antigravity/brain/3402f430-b8a8-4e53-b08d-fa36c0d004a1/.user_uploaded/media_1791283990241.jpg
   ```

2. **Verify Resume and Education Credentials:**
   ```bash
   # Inspect verified resume HTML in DevAtlas
   cat /Users/andrewstrachan/DevAtlas/portfolio-draft/public-output/resume/index.html
   # Inspect 54-item achievement atlas
   python3 -c "import json; d=json.load(open('/Users/andrewstrachan/DevAtlas/achievement-atlas/atlas.json')); print('Entries:', len(d['entries']))"
   ```

3. **Verify Federal Job Fair Applications & Tracker:**
   ```bash
   # Inspect sheet names in SFS job fair tracking sheet
   python3 -c "import zipfile; z=zipfile.ZipFile('/Users/andrewstrachan/Downloads/Afterwards/accurateinternshiptracker.xlsx'); print(z.namelist())"
   ```

4. **Verify Official FBLA Rubric:**
   ```bash
   pdftotext "/Users/andrewstrachan/UAB_Timeline_Meeting/Electronic Portfolio/Electronic Career Portfolio.pdf" - | grep -A 20 "Electronic Career Portfolio Presentation Rating Sheet"
   ```

5. **Verify Comprehensive Summary Document:**
   ```bash
   ls -lh /Users/andrewstrachan/career_portfolio/.agents/teamwork/survey_history_1/history_summary.md
   wc -l /Users/andrewstrachan/career_portfolio/.agents/teamwork/survey_history_1/history_summary.md
   ```
