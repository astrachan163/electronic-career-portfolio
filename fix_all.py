import re
import os

with open('index.html', 'r') as f:
    html = f.read()

with open('styles/main.css', 'r') as f:
    css = f.read()

# 1. Content Replacements
replacements = [
    # UAB Graduate Degree
    (r"Dates: Aug 2024 – Expected Dec 2027", r"Dates: January 2026 – Present (Expected Graduation: Dec 2027)"),
    (r"M.S. in Cybersecurity · GPA: 3.75 / 4.0", r"M.S. in Cybersecurity · GPA: 3.75 / 4.0 · Title: NSF CyberAICorps SFS Scholar"),
    # Univ. of Montevallo
    (r"Dates: Aug 2024 – June 2025 · ALSDE Certified CTE Educator.", r"Dates: August 2024 – May 2025 · Title: ALSDE Certified CTE Educator — Provisional Certificate in a Teaching Field (PCTF): Business, Marketing, and Finance."),
    # UMMC Medical School
    (r"M.D. Coursework & Clerkships \(4 Years Completed\)", r"Doctor of Medicine (M.D.) Candidate — 4 Years Coursework & Clinical Clerkships Completed (Incomplete as of 2020)"),
    (r"Dates: Aug 2016 – Dec 2020 · Completed in Good Standing.", r"Dates: January 2016 – July 2020 · Completed in Good Standing."),
    (r"Honors: Human Anatomy Prosector, P.A.L.S. President, Virginia Covington Award; HIPAA security protocols.", r"Honors: Human Anatomy Prosector, President & Founder: P.A.L.S. (Peer-Assisted Learning Society); President: Quality Improvement Student Interest Group; Chair: UMMC/MBN Opioid Crisis Council; BCLS / ACLS / First Aid Certified; Virginia Covington Award."),
    # Mississippi College
    (r"Honors: Senior Class Senator, Symphonic Band Principal Horn, Phi Mu Alpha co-founder, pre-medical rigor.", r"Honors: Senior Class Senator, Symphonic Band Principal Horn, Phi Mu Alpha Sinfonia co-founder, Delta Epsilon Iota Academic Honor Society, pre-medical rigor."),
    # Global Health
    (r"Uganda health mission establishing 2 mobile clinics serving 1,000\+ rural patients;", r"OmniMed Certified Village Health Volunteer (Uganda, East Africa). July 2017 – August 2017. Established 2 mobile clinics serving 1,000+ rural patients;"),
    # Maqkrs Consulting
    (r"2022 – Present", r"January 2022 – Present"),
    (r"Founder & Lead Technologist", r"Founder & Principal Technologist"),
    # First Presbyterian
    (r"First Presbyterian Church", r"First Presbyterian Church (August 2011 – Present. Youth leadership & civic mentorship (10 hrs/wk))"),
    # UAB Summer Camp
    (r"UAB Summer Camp TA", r"UAB Summer Camp TA (June 2026 – August 2026. Hours: 20–40 hrs/wk)"),
    # High Schools
    (r"Shades Valley High School", r"Shades Valley High School (July 2024 – June 2025 (Full-Time, 40 hrs/wk). Subject: CTE Business, Marketing, and Finance. Add: 2025 JEFCOED Technology Torchbearer Award for Excellence.)"),
    (r"Corner High School", r"Corner High School (August 2023 – June 2024 (Full-Time, 40 hrs/wk). Subject: CTE Business, Marketing, and Finance (DECA Chapter Founder & State Competition Coach).)"),
    # MidSouth
    (r"Operational Director", r"Operational Director & Laboratory Specialist"),
    (r"January 2023 – May 2023", r"January 2023 – May 2023 (Full-Time, 40 hrs/wk)"),
    # SelectQuote
    (r"Sales Development Specialist & Team Lead", r"Sales Development Specialist"),
    (r"April 2021 – November 2022", r"April 2021 – November 2022 (Full-Time, 40 hrs/wk)"),
    (r"Awarded the <strong>Top Sales Award \(2022\)</strong> and <strong>SQ Team Lead Award \(2021\)</strong>.", r"Awarded the <strong>Top Sales Award (2021)</strong>."),
    # Conference
    (r"Standalone Derby Reference", r"National Jump$tart Financial Literacy National Educator Conference (Louisville, KY)"),
]

for old, new in replacements:
    html = re.sub(old, new, html)

# 2. Add classes to html for layout fixes
html = html.replace('class="filters-container"', 'class="filters-container carousel-container"')
html = html.replace('class="projects-grid"', 'class="projects-grid carousel-container"')

# Accordion classes for Medical and Education
html = re.sub(r'(<div class="timeline-item.*?>)', r'\1\n<div class="accordion">', html)
html = html.replace('<div class="timeline-org">', '<div class="accordion-header"><div class="timeline-org">')
html = html.replace('</div>\n              <ul class="timeline-bullets">', '</div></div>\n<div class="accordion-content">\n              <ul class="timeline-bullets">')
# Close accordion content. Find closing </ul> and insert </div></div>
html = re.sub(r'(</ul>\n            </div>)', r'\1\n</div></div>', html)

# 3. Add CSS
if "/* Revamp Blueprint Specifications */" not in css:
    css += """
/* Revamp Blueprint Specifications */
.accordion { border: 1px solid var(--color-circuit-gold); margin-bottom: 1rem; border-radius: 8px; overflow: hidden; }
.accordion-header { cursor: pointer; padding: 10px; background: rgba(0,0,0,0.2); }
.accordion-content { display: none; padding: 10px; }
.accordion.active .accordion-content { display: block; }

.carousel-container { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; white-space: nowrap; gap: 1rem; padding-bottom: 1rem; }
.carousel-container > * { scroll-snap-align: start; flex: 0 0 auto; white-space: normal; }

.sticky-canvas-wrapper { height: 400dvh; position: relative; }
.sticky-canvas-inner { position: sticky; top: 0; height: 100dvh; z-index: 1; pointer-events: none; }
.interactive-card { pointer-events: auto; }

.nav-cues { display: none; }
@media (hover: hover) and (pointer: fine) { .nav-cues { display: block; } }
.mobile-swipe-cues { display: block; }
@media (hover: hover) and (pointer: fine) { .mobile-swipe-cues { display: none; } }

.modal-header-fix { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 48px; }
"""

with open('index.html', 'w') as f:
    f.write(html)

with open('styles/main.css', 'w') as f:
    f.write(css)

print("HTML/CSS patched")
