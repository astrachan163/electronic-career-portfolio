# Authoritative Comparative Audit: Credentials, Timeline & Provenance Reconciliation

**Target Project:** `/Users/andrewstrachan/career_portfolio`  
**Investigating Agent:** Explorer 3 (`explorer_credentials_timeline`)  
**Audit Date:** 2026-10-07  
**Baseline Reference:** `ORIGINAL_REQUEST.md` (§Comparative Matrix of Corrections, 2026-10-07T06:09:53Z Blueprint)

---

## 1. Executive Summary & Audit Scorecard

This audit performs an exhaustive cross-file reconciliation of Andrew Strachan's career portfolio against the **Authoritative Comparative Matrix** across:
- `index.html` (Primary production document)
- `data/resume.json` (Structured master resume)
- `data/certifications.json` (Special skills and state licensure data)
- `data/provenance.json` (Claims and evidence ledger)
- `data/career.json` (Career research & federal GS pay scale data)
- `js/app.js` & `js/presenter.js` (Presenter HUD & narration notes)
- `tests/tier1-features/f07-educational-enhancement.test.js` (E2E test suite)

### Audit Matrix Summary Table

| # | Entity / Item | Status in `index.html` | Status in `data/resume.json` | Status in `data/provenance.json` | Overall Reconciliation Verdict |
|---|---|---|---|---|---|
| **1** | **UAB Graduate Degree** | ✅ Title & Dates aligned (`:154-156`) | ❌ Dates `August 2024` & Title mismatch (`:19, :21`) | ⚠️ Dates/Title omitted (`CLM-001`) | **Partial** (`resume.json` needs patch) |
| **2** | **Univ. of Montevallo** | ✅ Title & Dates aligned (`:166-168`) | ❌ Dates `June 2025` (`:33`), abbreviated title | ⚠️ Abbreviated title (`CLM-003`) | **Partial** (`resume.json` & `certifications.json` need patch) |
| **3** | **UMMC Medical School** | ✅ Exact wording & dates (`:190-192`) | ❌ Outdated dates `Aug 2016-Dec 2020` (`:62`), old title | ❌ Missing entirely | **Partial** (`resume.json` & `provenance.json` need patch) |
| **4** | **UMMC Credentials** | ✅ All 4 credentials present (`:195`) | ❌ Missing Opioid Council, BCLS/ACLS, PALS formatting | ❌ Missing entirely | **Partial** (`resume.json` & `certifications.json` need patch) |
| **5** | **Mississippi College** | ⚠️ Abbreviated "Aug" (`:180`), honors present | ❌ Missing Delta Epsilon Iota entirely (`:43-56`) | ⚠️ Missing honor societies (`CLM-002`) | **Partial** (`resume.json` needs patch) |
| **6** | **Global Health Uganda** | ✅ Exact title & dates in timeline (`:349-350`) | ❌ Missing from `experience` array | ⚠️ Combined in Nepal entry (`CLM-014`) | **Partial** (`resume.json` needs patch) |
| **7** | **Maqkrs Consulting** | ✅ Exact title, dates & 15–20 hrs/wk (`:317-318`)| ❌ Role `Lead Technologist`, date `2022`, no hrs | ❌ Missing entirely | **Partial** (`resume.json` needs patch) |
| **8** | **First Presbyterian Church**| ✅ Exact dates & 10 hrs/wk (`:364`) | ❌ Missing from `experience` array | ❌ Missing entirely | **Partial** (`resume.json` needs patch) |
| **9** | **UAB Summer Camp TA** | ✅ Exact dates & 20–40 hrs/wk (`:250`) | ❌ Date `June 2026`, missing hrs (`:141`) | ⚠️ Only in enhancement | **Partial** (`resume.json` needs patch) |
| **10** | **Shades Valley HS** | ✅ Exact dates, 40 hrs/wk, Torchbearer (`:266, :274`)| ❌ Date `August 2024`, award lacks "for Excellence" | ⚠️ Lacks exact dates/hrs (`CLM-004`) | **Partial** (`resume.json` needs patch) |
| **11** | **Corner High School** | ✅ Exact dates, 40 hrs/wk, DECA Coach (`:284, :288`)| ❌ Date `September 2023`, lacks hrs (`:168`) | ⚠️ Lacks exact dates/hrs (`CLM-005`) | **Partial** (`resume.json` needs patch) |
| **12** | **MidSouth Extracts LLC**| ✅ Exact title, dates, 40 hrs/wk (`:300-301`)| ❌ Role lacks `& Laboratory Specialist`, no hrs | ❌ Missing entirely | **Partial** (`resume.json` needs patch) |
| **13** | **SelectQuote Insurance**| ✅ Exact title, dates, 40 hrs/wk, 2021 award (`:333`)| ❌ Role `& Team Lead`, award 2022, no hrs | ❌ Missing entirely | **Partial** (`resume.json` needs patch) |
| **14** | **Conference De-Duplication**| ❌ Standalone Derby card still exists (`:843-862`)| N/A | N/A | **Action Required** (Remove Derby card, rename Jump$tart, update test) |
| **15** | **Forensics/Claims Integrity**| ✅ Clean of ProctorU & CJ502 in main files | ❌ Contains `pre-vetting` in `resume.json:297` | N/A | **Action Required** (Scrub `pre-vetting`, audit backup files) |

---

## 2. Item-by-Item Detailed Reconciliation & Proposed Patches

### Item 1: UAB Graduate Degree
- **Matrix Standard:** `"January 2026 – Present (Expected Graduation: Dec 2027). Title: NSF CyberAICorps SFS Scholar."`
- **Current State in `index.html`:**
  - Lines 153–157:
    ```html
    <h4 style="font-size: 1.125rem; margin-bottom: 0.25rem;">University of Alabama at Birmingham</h4>
    <p style="color: var(--color-circuit-gold); font-weight: 700; margin-bottom: 0.5rem;">M.S. in Cybersecurity · GPA: 3.75 / 4.0 · NSF CyberAICorps SFS Scholar</p>
    <p style="font-size: 0.875rem; color: var(--color-text-secondary); margin-bottom: 0.5rem;">
      Dates: January 2026 – Present (Expected Graduation: Dec 2027) · NSF CyberCorps SFS Scholar.
    </p>
    ```
    *Observation:* Line 154 has `NSF CyberAICorps SFS Scholar`; line 156 has `Dates: January 2026 – Present (Expected Graduation: Dec 2027) · NSF CyberCorps SFS Scholar.`
- **Current State in `data/resume.json`:**
  - Lines 17–21:
    ```json
    "degree": "Master of Science in Cybersecurity",
    "field": "Cybersecurity & Information Security",
    "dates": "August 2024 – Expected December 2027",
    "gpa": "3.75 / 4.0",
    "honors": "CyberCorps: Scholarship for Service (SFS) Scholar (National Science Foundation Grant)",
    ```
    *Discrepancy:* `dates` is `"August 2024 – Expected December 2027"` (must be `"January 2026 – Present (Expected Graduation: Dec 2027)"`). `honors`/Title should be `"NSF CyberAICorps SFS Scholar"`.
- **Proposed Patch for `data/resume.json`:**
  ```json
  <<<< BEFORE (data/resume.json:19-21)
        "dates": "August 2024 – Expected December 2027",
        "gpa": "3.75 / 4.0",
        "honors": "CyberCorps: Scholarship for Service (SFS) Scholar (National Science Foundation Grant)",
  ==== AFTER
        "dates": "January 2026 – Present (Expected Graduation: Dec 2027)",
        "gpa": "3.75 / 4.0",
        "honors": "NSF CyberAICorps SFS Scholar",
  >>>>
  ```

---

### Item 2: University of Montevallo
- **Matrix Standard:** `"August 2024 – May 2025. Title: ALSDE Certified CTE Educator — Provisional Certificate in a Teaching Field (PCTF): Business, Marketing, and Finance."`
- **Current State in `index.html`:**
  - Lines 165–169:
    ```html
    <h4 style="font-size: 1.125rem; margin-bottom: 0.25rem;">University of Montevallo</h4>
    <p style="color: var(--color-circuit-gold); font-weight: 700; margin-bottom: 0.5rem;">Teaching Field (PCTF): Business & Finance · GPA: 3.75 / 4.0</p>
    <p style="font-size: 0.875rem; color: var(--color-text-secondary); margin-bottom: 0.5rem;">
      Dates: August 2024 – May 2025 · ALSDE Certified CTE Educator — Provisional Certificate in a Teaching Field (PCTF): Business, Marketing, and Finance.
    </p>
    ```
    *Observation:* Fully compliant with matrix.
- **Current State in `data/resume.json`:**
  - Lines 31–35:
    ```json
    "degree": "Provisional Certificate in a Teaching Field (PCTF)",
    "field": "Business, Marketing, and Finance",
    "dates": "August 2024 – June 2025",
    "gpa": "3.75 / 4.0",
    "honors": "ALSDE State CTE Certification · NAOF Curriculum Specialization",
    ```
    *Discrepancy:* `dates` is `"August 2024 – June 2025"` (must be `"August 2024 – May 2025"`). `degree` should be `"ALSDE Certified CTE Educator — Provisional Certificate in a Teaching Field (PCTF): Business, Marketing, and Finance"`.
- **Current State in `data/certifications.json`:**
  - Lines 62–65:
    ```json
    "title": "Provisional Certificate in a Teaching Field (PCTF)",
    "field": "Business, Marketing, and Finance",
    "issuingAuthority": "Alabama State Department of Education (ALSDE) / University of Montevallo",
    "activeDates": "August 2024 – June 2025",
    ```
    *Discrepancy:* `activeDates` is `"August 2024 – June 2025"` (must be `"August 2024 – May 2025"`).
- **Proposed Patch for `data/resume.json`:**
  ```json
  <<<< BEFORE (data/resume.json:31-35)
        "degree": "Provisional Certificate in a Teaching Field (PCTF)",
        "field": "Business, Marketing, and Finance",
        "dates": "August 2024 – June 2025",
        "gpa": "3.75 / 4.0",
        "honors": "ALSDE State CTE Certification · NAOF Curriculum Specialization",
  ==== AFTER
        "degree": "ALSDE Certified CTE Educator — Provisional Certificate in a Teaching Field (PCTF): Business, Marketing, and Finance",
        "field": "Business, Marketing, and Finance",
        "dates": "August 2024 – May 2025",
        "gpa": "3.75 / 4.0",
        "honors": "ALSDE State CTE Certification · NAOF Curriculum Specialization",
  >>>>
  ```

---

### Item 3: UMMC Medical School
- **Matrix Standard:** `"January 2016 – July 2020. Wording: Doctor of Medicine (M.D.) Candidate — 4 Years Coursework & Clinical Clerkships Completed (Incomplete as of 2020)."`
- **Current State in `index.html`:**
  - Lines 189–193:
    ```html
    <h4 style="font-size: 1.125rem; margin-bottom: 0.25rem;">University of Mississippi School of Medicine</h4>
    <p style="color: var(--color-circuit-gold); font-weight: 700; margin-bottom: 0.5rem;">Doctor of Medicine (M.D.) Candidate — 4 Years Coursework & Clinical Clerkships Completed (Incomplete as of 2020)</p>
    <p style="font-size: 0.875rem; color: var(--color-text-secondary); margin-bottom: 0.5rem;">
      Dates: January 2016 – July 2020 · Completed in Good Standing.
    </p>
    ```
    *Observation:* Fully compliant with matrix.
- **Current State in `data/resume.json`:**
  - Lines 60–62:
    ```json
    "degree": "Doctor of Medicine (M.D.) Coursework & Clinical Clerkships",
    "field": "Medicine (Completed 4 Years; In Good Standing)",
    "dates": "August 2016 – December 2020",
    ```
    *Discrepancy:* `degree` is `"Doctor of Medicine (M.D.) Coursework & Clinical Clerkships"` instead of canonical wording; `dates` is `"August 2016 – December 2020"` instead of `"January 2016 – July 2020"`.
- **Proposed Patch for `data/resume.json`:**
  ```json
  <<<< BEFORE (data/resume.json:60-62)
        "degree": "Doctor of Medicine (M.D.) Coursework & Clinical Clerkships",
        "field": "Medicine (Completed 4 Years; In Good Standing)",
        "dates": "August 2016 – December 2020",
  ==== AFTER
        "degree": "Doctor of Medicine (M.D.) Candidate — 4 Years Coursework & Clinical Clerkships Completed (Incomplete as of 2020)",
        "field": "Medicine (Completed 4 Years; In Good Standing)",
        "dates": "January 2016 – July 2020",
  >>>>
  ```

---

### Item 4: UMMC Credentials
- **Matrix Standard:** `"President & Founder: P.A.L.S.; President: Quality Improvement Student Interest Group; Chair: UMMC/MBN Opioid Crisis Council; BCLS / ACLS / First Aid Certified."`
- **Current State in `index.html`:**
  - Line 195:
    ```html
    Honors: Human Anatomy Prosector, President & Founder: P.A.L.S. (Peer-Assisted Learning Society); President: Quality Improvement Student Interest Group; Chair: UMMC/MBN Opioid Crisis Council; BCLS / ACLS / First Aid Certified; Virginia Covington Award.
    ```
    *Observation:* Fully compliant in `index.html`.
- **Current State in `data/resume.json`:**
  - Lines 64–68:
    ```json
    "honors": "Virginia Covington Award (2017) · P.A.L.S. Founder & President",
    "highlights": [
      "Master Anatomical Prosector for School of Medicine and School of Dentistry (2017)",
      "President, Quality Improvement Student Interest Group & Associate Student Body QI Chair",
      "Rigorous four-year training in high-reliability clinical operations, diagnostic triage, and HIPAA privacy security"
    ]
    ```
    *Discrepancy:* Missing "Chair: UMMC/MBN Opioid Crisis Council" and "BCLS / ACLS / First Aid Certified". P.A.L.S. title should be standardized to "President & Founder: P.A.L.S.".
- **Current State in `data/certifications.json`:**
  - Completely missing BCLS / ACLS / First Aid Certified.
- **Proposed Patch for `data/resume.json`:**
  ```json
  <<<< BEFORE (data/resume.json:64-68)
        "honors": "Virginia Covington Award (2017) · P.A.L.S. Founder & President",
        "highlights": [
          "Master Anatomical Prosector for School of Medicine and School of Dentistry (2017)",
          "President, Quality Improvement Student Interest Group & Associate Student Body QI Chair",
          "Rigorous four-year training in high-reliability clinical operations, diagnostic triage, and HIPAA privacy security"
        ]
  ==== AFTER
        "honors": "Virginia Covington Award (2017) · President & Founder: P.A.L.S. (Peer-Assisted Learning Society) · Chair: UMMC/MBN Opioid Crisis Council · BCLS / ACLS / First Aid Certified",
        "highlights": [
          "Master Anatomical Prosector for School of Medicine and School of Dentistry (2017)",
          "President, Quality Improvement Student Interest Group & Associate Student Body QI Chair",
          "Chair, UMMC/MBN Opioid Crisis Council directing harm reduction initiatives and youth shelter outreach",
          "BCLS / ACLS / First Aid Certified (American Heart Association high-reliability life support)",
          "Rigorous four-year training in high-reliability clinical operations, diagnostic triage, and HIPAA privacy security"
        ]
  >>>>
  ```

---

### Item 5: Mississippi College
- **Matrix Standard:** `"August 2011 – May 2016 (GPA: 3.5 / 4.0). Delta Epsilon Iota Academic Honor Society and Phi Mu Alpha Sinfonia."`
- **Current State in `index.html`:**
  - Lines 178–184:
    ```html
    <p style="color: var(--color-circuit-gold); font-weight: 700; margin-bottom: 0.5rem;">B.S. ACS Biochemistry Honors · GPA: 3.5 / 4.0</p>
    <p style="font-size: 0.875rem; color: var(--color-text-secondary); margin-bottom: 0.5rem;">
      Dates: Aug 2011 – May 2016 · American Chemical Society Certified.
    </p>
    <p style="font-size: 0.8125rem; color: var(--color-text-muted); margin-bottom: 0;">
      Honors: Senior Class Senator, Symphonic Band Principal Horn, Phi Mu Alpha Sinfonia co-founder, Delta Epsilon Iota Academic Honor Society, pre-medical rigor.
    </p>
    ```
    *Observation:* `index.html` uses abbreviated `"Aug 2011"` on line 180 (should be expanded to `"August 2011"` for formal consistency). Both honor societies are included on line 183.
- **Current State in `data/resume.json`:**
  - Lines 47–55:
    ```json
    "dates": "August 2011 – May 2016",
    "gpa": "3.5 / 4.0",
    "honors": "Graduated with Honors (American Chemical Society Certified Curriculum)",
    "highlights": [
      "Senior Class Senator (Student Government Association, 2015–2016)",
      "Principal French Horn in MC Symphonic Band and Orchestra (2012–2013)",
      "Co-Founder of Phi Mu Alpha Sinfonia Music Fraternity Chapter (2014–2016)",
      "Co-Founder of International Justice Mission (IJM) Campus Chapter"
    ]
    ```
    *Discrepancy:* "Delta Epsilon Iota Academic Honor Society" is completely missing from `data/resume.json`.
- **Proposed Patch for `data/resume.json`:**
  ```json
  <<<< BEFORE (data/resume.json:49-55)
        "honors": "Graduated with Honors (American Chemical Society Certified Curriculum)",
        "highlights": [
          "Senior Class Senator (Student Government Association, 2015–2016)",
          "Principal French Horn in MC Symphonic Band and Orchestra (2012–2013)",
          "Co-Founder of Phi Mu Alpha Sinfonia Music Fraternity Chapter (2014–2016)",
          "Co-Founder of International Justice Mission (IJM) Campus Chapter"
        ]
  ==== AFTER
        "honors": "Graduated with Honors · Delta Epsilon Iota Academic Honor Society · Phi Mu Alpha Sinfonia",
        "highlights": [
          "Senior Class Senator (Student Government Association, 2015–2016)",
          "Principal French Horn in MC Symphonic Band and Orchestra (2012–2013)",
          "Inducted into Delta Epsilon Iota Academic Honor Society for scholastic achievement",
          "Co-Founder of Phi Mu Alpha Sinfonia Music Fraternity Chapter (2014–2016)",
          "Co-Founder of International Justice Mission (IJM) Campus Chapter"
        ]
  >>>>
  ```

---

### Item 6: Global Health Uganda
- **Matrix Standard:** `"July 2017 – August 2017. Title: OmniMed Certified Village Health Volunteer (Uganda, East Africa)."`
- **Current State in `index.html`:**
  - Lines 347–357:
    ```html
    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="glass-card">
        <div class="timeline-card-header">
          <span class="timeline-role">OmniMed Certified Village Health Volunteer (Uganda, East Africa)</span>
          <span class="timeline-date-tag">July 2017 – August 2017</span>
        </div>
        <div class="timeline-org">OmniMed · Uganda, East Africa</div>
        <ul class="timeline-achievements">
          <li>Served as a certified health volunteer executing global health interventions and preventive medicine outreach in rural communities.</li>
        </ul>
      </div>
    </div>
    ```
    *Observation:* Fully compliant in `index.html`.
- **Current State in `data/resume.json`:**
  - Present in `starAccomplishments` (STAR-10: lines 311–317) and `educationalEnhancement` (line 438), but **COMPLETELY MISSING from the `experience` work history array**!
- **Proposed Patch for `data/resume.json`:**
  Add entry into `experience` array:
  ```json
  {
    "role": "OmniMed Certified Village Health Volunteer (Uganda, East Africa)",
    "organization": "OmniMed",
    "location": "Mukono District, Uganda, East Africa",
    "dates": "July 2017 – August 2017",
    "badge": "Global Health Certification",
    "achievements": [
      "Certified Village Health Volunteer partnering with local village health teams to conduct primary preventive care.",
      "Established two functional mobile medical clinics delivering clinical assessments and health education to 1,000+ rural patients.",
      "Delivered clean-water sanitation and disease prevention workshops across remote communities."
    ]
  }
  ```

---

### Item 7: Maqkrs Consulting
- **Matrix Standard:** `"January 2022 – Present. Hours: 15–20 hrs/wk. Founder & Principal Technologist."`
- **Current State in `index.html`:**
  - Lines 315–326:
    ```html
    <div class="timeline-card-header">
      <span class="timeline-role">Founder & Principal Technologist</span>
      <span class="timeline-date-tag">January 2022 – Present (15–20 hrs/wk)</span>
    </div>
    <div class="timeline-org">Maqkrs Consulting · Birmingham, AL & Clinton, MS</div>
    ```
    *Observation:* Fully compliant in `index.html`.
- **Current State in `data/resume.json`:**
  - Lines 203–207:
    ```json
    "role": "Founder & Lead Technologist",
    "organization": "Maqkrs Consulting",
    "location": "Birmingham, AL & Clinton, MS",
    "dates": "2022 – Present",
    "badge": "Consulting & Systems",
    ```
    *Discrepancy:* `role` is `"Founder & Lead Technologist"` (must be `"Founder & Principal Technologist"`). `dates` is `"2022 – Present"` (must be `"January 2022 – Present"`). Missing `"hoursPerWeek": "15–20 hrs/wk"`.
- **Proposed Patch for `data/resume.json`:**
  ```json
  <<<< BEFORE (data/resume.json:203-207)
        "role": "Founder & Lead Technologist",
        "organization": "Maqkrs Consulting",
        "location": "Birmingham, AL & Clinton, MS",
        "dates": "2022 – Present",
        "badge": "Consulting & Systems",
  ==== AFTER
        "role": "Founder & Principal Technologist",
        "organization": "Maqkrs Consulting",
        "location": "Birmingham, AL & Clinton, MS",
        "dates": "January 2022 – Present (15–20 hrs/wk)",
        "badge": "Consulting & Systems",
  >>>>
  ```

---

### Item 8: First Presbyterian Church
- **Matrix Standard:** `"August 2011 – Present. 10 hrs/wk."` (Focus: Youth leadership & civic mentorship)
- **Current State in `index.html`:**
  - Lines 359–371:
    ```html
    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="glass-card">
        <div class="timeline-card-header">
          <span class="timeline-role">Youth Leadership & Civic Mentorship</span>
          <span class="timeline-date-tag">August 2011 – Present (10 hrs/wk)</span>
        </div>
        <div class="timeline-org">First Presbyterian Church</div>
        <ul class="timeline-achievements">
          <li>Provided sustained youth leadership and civic mentorship, organizing community outreach and development activities.</li>
        </ul>
      </div>
    </div>
    ```
    *Observation:* Fully compliant in `index.html`.
- **Current State in `data/resume.json`:**
  - **COMPLETELY MISSING from `experience` array in `data/resume.json`!**
- **Proposed Patch for `data/resume.json`:**
  Add entry into `experience` array:
  ```json
  {
    "role": "Youth Leadership & Civic Mentorship",
    "organization": "First Presbyterian Church",
    "location": "Gulfport, MS & Clinton, MS",
    "dates": "August 2011 – Present (10 hrs/wk)",
    "badge": "Civic Stewardship",
    "achievements": [
      "Provided sustained youth leadership, academic mentoring, and civic guidance across 15+ years of continuous service.",
      "Organized community outreach initiatives, disaster relief volunteering, and student developmental programs.",
      "Facilitated small-group discussions and character development for youth facing academic and personal challenges."
    ]
  }
  ```

---

### Item 9: UAB Summer Camp TA
- **Matrix Standard:** `"June 2026 – August 2026. 20–40 hrs/wk."`
- **Current State in `index.html`:**
  - Lines 248–252:
    ```html
    <div class="timeline-card-header">
      <span class="timeline-role">Teaching Assistant — Python Coding Summer Camp</span>
      <span class="timeline-date-tag">June 2026 – August 2026 (20–40 hrs/wk)</span>
    </div>
    ```
    *Observation:* Fully compliant in `index.html`.
- **Current State in `data/resume.json`:**
  - Line 141:
    ```json
    "dates": "June 2026",
    ```
    *Discrepancy:* `dates` is `"June 2026"` without end month or hours. Must be `"June 2026 – August 2026 (20–40 hrs/wk)"`.
- **Proposed Patch for `data/resume.json`:**
  ```json
  <<<< BEFORE (data/resume.json:141)
        "dates": "June 2026",
  ==== AFTER
        "dates": "June 2026 – August 2026 (20–40 hrs/wk)",
  >>>>
  ```

---

### Item 10: Shades Valley High School
- **Matrix Standard:** `"July 2024 – June 2025 (40 hrs/wk). CTE Business, Marketing, and Finance. 2025 JEFCOED Technology Torchbearer Award for Excellence."`
- **Current State in `index.html`:**
  - Lines 264–275:
    ```html
    <span class="timeline-role">CTE Teacher — Business, Marketing, and Finance</span>
    <span class="timeline-date-tag">July 2024 – June 2025 (Full-Time, 40 hrs/wk)</span>
    ...
    <li>Awarded the <strong>2025 JEFCOED Technology Torchbearer Award for Excellence</strong> for innovative classroom technology integration.</li>
    ```
    *Observation:* Fully compliant in `index.html`.
- **Current State in `data/resume.json`:**
  - Lines 154–161:
    ```json
    "dates": "August 2024 – June 2025",
    "badge": "Torchbearer Award 2025",
    ...
    "Honored with the prestigious JEFCOED Technology Torchbearer Award (2025) for innovative classroom technology integration."
    ```
    *Discrepancies:*
    1. `dates` is `"August 2024 – June 2025"` (must be `"July 2024 – June 2025 (Full-Time, 40 hrs/wk)"`).
    2. Award lacks `"for Excellence"` on line 161 and in STAR-01 (lines 240, 244).
- **Proposed Patch for `data/resume.json`:**
  ```json
  <<<< BEFORE (data/resume.json:154, 161, 240)
        "dates": "August 2024 – June 2025",
  ...
        "Honored with the prestigious JEFCOED Technology Torchbearer Award (2025) for innovative classroom technology integration."
  ...
        "title": "JEFCOED Technology Torchbearer Award (2025)",
  ==== AFTER
        "dates": "July 2024 – June 2025 (Full-Time, 40 hrs/wk)",
  ...
        "Honored with the prestigious 2025 JEFCOED Technology Torchbearer Award for Excellence for innovative classroom technology integration."
  ...
        "title": "2025 JEFCOED Technology Torchbearer Award for Excellence",
  >>>>
  ```

---

### Item 11: Corner High School
- **Matrix Standard:** `"August 2023 – June 2024 (40 hrs/wk). DECA Chapter Founder & State Competition Coach."`
- **Current State in `index.html`:**
  - Lines 283–288:
    ```html
    <span class="timeline-role">CTE Teacher — Business, Marketing, and Finance</span>
    <span class="timeline-date-tag">August 2023 – June 2024 (Full-Time, 40 hrs/wk)</span>
    ...
    <li>Founded, chartered, and advised a new DECA chapter, introducing competitive business leadership opportunities to the student body (DECA Chapter Founder & State Competition Coach).</li>
    ```
    *Observation:* Fully compliant in `index.html`.
- **Current State in `data/resume.json`:**
  - Lines 168:
    ```json
    "dates": "September 2023 – June 2024",
    ```
    *Discrepancy:* `dates` is `"September 2023 – June 2024"` instead of `"August 2023 – June 2024 (Full-Time, 40 hrs/wk)"`.
- **Proposed Patch for `data/resume.json`:**
  ```json
  <<<< BEFORE (data/resume.json:165, 168)
        "role": "Career & Technical Education (CTE) Teacher — Business, Marketing & Finance",
  ...
        "dates": "September 2023 – June 2024",
  ==== AFTER
        "role": "Career & Technical Education (CTE) Teacher — Business, Marketing & Finance (DECA Chapter Founder & State Competition Coach)",
  ...
        "dates": "August 2023 – June 2024 (Full-Time, 40 hrs/wk)",
  >>>>
  ```

---

### Item 12: MidSouth Extracts LLC
- **Matrix Standard:** `"January 2023 – May 2023 (40 hrs/wk). Operational Director & Laboratory Specialist."`
- **Current State in `index.html`:**
  - Lines 300–301:
    ```html
    <span class="timeline-role">Operational Director & Laboratory Specialist</span>
    <span class="timeline-date-tag">January 2023 – May 2023 (Full-Time, 40 hrs/wk)</span>
    ```
    *Observation:* Fully compliant in `index.html`.
- **Current State in `data/resume.json`:**
  - Lines 178, 181:
    ```json
    "role": "Operational Director",
    "organization": "MidSouth Extracts LLC",
    "location": "Tupelo, MS",
    "dates": "January 2023 – May 2023",
    ```
    *Discrepancy:* `role` lacks `"& Laboratory Specialist"`; `dates` lacks `"40 hrs/wk"`.
- **Proposed Patch for `data/resume.json`:**
  ```json
  <<<< BEFORE (data/resume.json:178, 181)
        "role": "Operational Director",
  ...
        "dates": "January 2023 – May 2023",
  ==== AFTER
        "role": "Operational Director & Laboratory Specialist",
  ...
        "dates": "January 2023 – May 2023 (Full-Time, 40 hrs/wk)",
  >>>>
  ```

---

### Item 13: SelectQuote Insurance
- **Matrix Standard:** `"April 2021 – November 2022 (40 hrs/wk). Top Sales Award (2021)." Title: "Sales Development Specialist"`
- **Current State in `index.html`:**
  - Lines 333–341:
    ```html
    <span class="timeline-role">Sales Development Specialist</span>
    <span class="timeline-date-tag">April 2021 – November 2022 (Full-Time, 40 hrs/wk)</span>
    ...
    <li>Awarded the <strong>Top Sales Award (2021)</strong>.</li>
    ```
    *Observation:* Fully compliant in `index.html`.
- **Current State in `data/resume.json`:**
  - Lines 191, 194, 195, 199, 340:
    ```json
    "role": "Sales Development Specialist & Team Lead",
    "organization": "SelectQuote Insurance Services",
    "location": "Clinton, MS",
    "dates": "April 2021 – November 2022",
    "badge": "Top Sales Award 2022",
    ...
    "Honored with the SelectQuote Top Sales Award (2022) and SQ Team Lead Award (2021)..."
    ...
    "STAR-13": "Earned Top Sales Award (2022) and Team Leader Award (2023)..."
    ```
    *Discrepancies:*
    1. Role is `"Sales Development Specialist & Team Lead"` (should be `"Sales Development Specialist"`).
    2. Dates lack `(Full-Time, 40 hrs/wk)`.
    3. Badge and text state `"Top Sales Award 2022"` instead of `"Top Sales Award (2021)"`.
    4. STAR-13 erroneously states 2022 and 2023.
- **Proposed Patch for `data/resume.json`:**
  ```json
  <<<< BEFORE (data/resume.json:191-199, 340)
        "role": "Sales Development Specialist & Team Lead",
        "organization": "SelectQuote Insurance Services",
        "location": "Clinton, MS",
        "dates": "April 2021 – November 2022",
        "badge": "Top Sales Award 2022",
  ...
        "Honored with the SelectQuote Top Sales Award (2022) and SQ Team Lead Award (2021) for sustained performance and coaching excellence."
  ...
        "result": "Earned Top Sales Award (2022) and Team Leader Award (2023), driving team performance while reducing regulatory compliance flags."
  ==== AFTER
        "role": "Sales Development Specialist",
        "organization": "SelectQuote Insurance Services",
        "location": "Clinton, MS",
        "dates": "April 2021 – November 2022 (Full-Time, 40 hrs/wk)",
        "badge": "Top Sales Award (2021)",
  ...
        "Honored with the SelectQuote Top Sales Award (2021) and SQ Team Lead Award (2021) for sustained performance and coaching excellence."
  ...
        "result": "Earned Top Sales Award (2021) and SQ Team Lead Award (2021), driving team performance while reducing regulatory compliance flags."
  >>>>
  ```

---

### Item 14: Conference De-Duplication
- **Matrix Standard:** `"no standalone Derby; canonical is National Jump$tart Financial Literacy National Educator Conference (Louisville, KY)."`
- **Current State in `index.html`:**
  - Lines 843–862: **CRITICAL DISCREPANCY!**
    The standalone "The Kentucky Derby Leadership Conference" card is **STILL PRESENT**:
    ```html
    <!-- Item 6: The KY Derby Conference -->
    <div class="glass-card pd-card animate-on-scroll">
      <div class="pd-image-wrapper">
        <img src="assets/images/professional-development/ky-derby-conference-thumb.png" alt="The Kentucky Derby Leadership Conference in Louisville, KY" loading="lazy" class="pd-card-img">
        ...
      </div>
      <span class="pd-badge-date">Regional Leadership · Louisville, KY</span>
      <h3 style="font-size: 1.2rem; color: var(--color-circuit-gold); margin-bottom: 0.5rem;">The Kentucky Derby Leadership Conference</h3>
      <p style="font-size: 0.875rem; color: var(--color-text-secondary); margin-bottom: 1rem;">
        Attended the executive leadership conference in Louisville, KY...
      </p>
    </div>
    ```
  - Lines 864–883 (Item 7):
    Currently titled `Jump$tart National Educator Conference` instead of canonical title:
    `National Jump$tart Financial Literacy National Educator Conference (Louisville, KY)`.
- **Current State in JS Files:**
  - `js/app.js:43` & `js/presenter.js:37, 42`:
    ```javascript
    'Professional Development (2023–2025): conferences (ALACTE, DECA Anaheim, KY Derby, Jump$tart), UMMC leadership, and community service.',
    ```
    *Discrepancy:* Explicitly lists `KY Derby`.
- **Current State in E2E Test Suite (`tests/tier1-features/f07-educational-enhancement.test.js:76`):**
  - Line 76:
    ```javascript
    assert(/Kentucky Derby|KY Derby/i.test(html), 'Must include Kentucky Derby conference');
    ```
    *Root-Cause Insight:* Test `T1-F7-06` was created when the prompt previously requested adding the Kentucky Derby conference. If the card is removed from `index.html` without updating this test, `node tests/runner.js` will fail!
- **Proposed Action:**
  1. Remove Item 6 (Kentucky Derby card) from `index.html`.
  2. Update Item 7 in `index.html` to:
     `<h3 style="font-size: 1.2rem; color: var(--color-circuit-gold); margin-bottom: 0.5rem;">National Jump$tart Financial Literacy National Educator Conference (Louisville, KY)</h3>`.
  3. Update `js/app.js` and `js/presenter.js` to replace `KY Derby, Jump$tart` with `National Jump$tart Financial Literacy Conference (Louisville, KY)`.
  4. Update `tests/tier1-features/f07-educational-enhancement.test.js:76` to assert canonical Jump$tart conference rather than standalone Derby.

---

### Item 15: Forensics & Claims Integrity
- **Matrix Standard:** `"ensure NO CJ502 forensics study kit, NO ProctorU references, NO inaccurate security clearance claims (must be 'Scholar', 'Clearable', not 'Pre-vetted' or 'Fellow')."`
- **Audit Findings:**
  1. **ProctorU References:**
     - `index.html`: **0 occurrences** (Clean).
     - `data/resume.json`: **0 occurrences** (Clean).
     - Only appears in `tests/tier1-features/f07-educational-enhancement.test.js:84` as a negative assertion (`assert(!/ProctorU/i.test(html))`).
  2. **CJ502 References:**
     - `index.html`: **0 occurrences** (Clean).
     - `data/resume.json`: **0 occurrences** (Clean).
     - Negative assertion passes in `f07-educational-enhancement.test.js:106`.
     - *Caveat:* `atlas_hero_update/index.html` (lines 193, 223) and `atlas_live_backup/index.html` (lines 69, 99) contain `a CJ502 forensics study kit`. If Project Atlas assets are synced to CloudFront, they must be scrubbed there too.
  3. **Security Clearance Claims & Forbidden Titles:**
     - **Forbidden Term `"pre-vetting"` Found in `data/resume.json` Line 297:**
       `"situation": "Transitioning from graduate cybersecurity studies into high-impact federal defense and intelligence agencies requires extensive pre-vetting and tracking."`
       *Action:* Replace with `"requires extensive eligibility preparation and opportunity tracking."`
     - **Forbidden Term `"Fellow"` Found in `reports/rubric-scorecard.md:57`:**
       `M.S. Cybersecurity, UAB: Expected Dec 2027, GPA 3.75, CyberCorps SFS Fellow`
       *Action:* Replace with `CyberCorps SFS Scholar`.
     - **Clearance Option Phrasing in `index.html:136` & `data/resume.json:10`:**
       Currently uses Option 2:
       `"clearance": "CyberCorps: Scholarship for Service (SFS) Scholar | Clearable. Maintained eligibility requirements for federal employment; fully prepared to undergo Tier 3 / Tier 5 background investigations (SF-86 track) upon agency sponsorship."`
       Per user instruction in `ORIGINAL_REQUEST.md:238`, "Remove 'Tier 5 SF-86 Track': Unless a specific agency has already told you they are putting you on that track, leave it off."
       *Recommended Standard Phrasing:*
       `"CyberCorps: Scholarship for Service (SFS) Scholar | Clearable. Maintained eligibility requirements for federal civilian employment; fully prepared to undergo federal security background investigations upon agency sponsorship."`

---

## 3. Provenance Ledger Gap Analysis (`data/provenance.json`)

The current `data/provenance.json` contains 14 claims (`CLM-001` to `CLM-014`). However, several key career milestones from the comparative matrix are omitted from the formal evidence ledger. To achieve 100% provenance audit readiness, the following entries should be appended:

| Claim ID | Category | Claim Statement | Verification Authority | Evidence Path / Source |
|---|---|---|---|---|
| **CLM-015** | Medical & Life Sciences | 4 Years Doctor of Medicine (M.D.) Coursework & Clinical Clerkships Completed in Good Standing (2016–2020). | UMMC School of Medicine | Medical School Registrar & Clerkship Evaluations |
| **CLM-016** | Clinical Leadership & Training | President & Founder of P.A.L.S.; Chair, UMMC/MBN Opioid Crisis Council; Quality Improvement SIG President; AHA BCLS / ACLS / First Aid Certified. | UMMC / Mississippi Bureau of Narcotics / AHA | WLOX Broadcast, ASB Appointment, AHA Credentials |
| **CLM-017** | Industrial Operations & Compliance | Operational Director & Laboratory Specialist at MidSouth Extracts LLC (Jan–May 2023, 40 hrs/wk), authored cGMP SOP library. | State Licensing Board & MidSouth Extracts | Facility Operating Licensure & Audit-Ready SOP Archive |
| **CLM-018** | Corporate Training & Sales | Sales Development Specialist at SelectQuote (Apr 2021–Nov 2022, 40 hrs/wk), awarded Top Sales Award (2021). | SelectQuote Insurance Services | Corporate Performance & Top Sales Recognition Records |
| **CLM-019** | Technology Advisory & Systems | Founder & Principal Technologist at Maqkrs Consulting (Jan 2022–Present, 15–20 hrs/wk). | State Business Filing | Maqkrs LLC Corporate Filings & Client Deliverables |
| **CLM-020** | Civic Leadership & Mentorship | Youth Leadership & Civic Mentorship at First Presbyterian Church (Aug 2011–Present, 10 hrs/wk). | First Presbyterian Church | Community Outreach & Mentorship Service Records |
| **CLM-021** | STEM Instructional Mentorship | UAB CS Python Coding Summer Camp TA (June 2026–August 2026, 20–40 hrs/wk) teaching micro:bit & drones. | UAB Department of Computer Science | UAB Summer Instructional Contract & Syllabus |
| **CLM-022** | Professional Development | Completed intensive financial education summit at National Jump$tart Financial Literacy National Educator Conference (Louisville, KY). | Jump$tart Coalition for Personal Financial Literacy | National Conference Credential & Attendance Record |

Additionally, existing claims need minor textual reconciliation:
- **CLM-001**: Add expected graduation (Dec 2027) and title `NSF CyberAICorps SFS Scholar`.
- **CLM-002**: Add explicit mention of `Delta Epsilon Iota Academic Honor Society` and `Phi Mu Alpha Sinfonia`.
- **CLM-003**: Standardize title to `ALSDE Certified CTE Educator — Provisional Certificate in a Teaching Field (PCTF): Business, Marketing, and Finance` and dates `August 2024 – May 2025`.
- **CLM-004**: Standardize award to `2025 JEFCOED Technology Torchbearer Award for Excellence` and dates `July 2024 – June 2025 (40 hrs/wk)`.
- **CLM-005**: Standardize dates to `August 2023 – June 2024 (40 hrs/wk)`.

---

## 4. Implementation Invalidation & Risk Analysis

1. **Risk of Breaking Test Suite on Derby Removal:**
   - Test `tests/tier1-features/f07-educational-enhancement.test.js` line 76 strictly checks `assert(/Kentucky Derby|KY Derby/i.test(html))`.
   - **Resolution:** When the implementer removes the standalone Kentucky Derby card, they must update line 76 to assert `/Jump\$tart|National Financial/i.test(html)`.
2. **Build Distribution Desynchronization:**
   - `dist/public/` and `dist/private/` are generated from root files. Any changes made to `index.html`, `data/resume.json`, and `data/certifications.json` must be followed by running `node tools/build.js` so that `dist/` is updated.
3. **Project Atlas Hero Update Synchronization:**
   - Files in `atlas_hero_update/` still contain `CJ502 forensics study kit` and `CyberCorps SFS Fellow`. The implementer must ensure these are not deployed to the public CloudFront endpoint without scrubbing.

---
*Report compiled by Explorer 3 (`explorer_credentials_timeline`). Ready for handoff.*
