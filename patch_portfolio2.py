import os
import re

html_path = '/Users/andrewstrachan/career_portfolio/index.html'
with open(html_path, 'r') as f:
    content = f.read()

replacements = [
    # Maqkrs Consulting
    (r"2022 – Present", r"January 2022 – Present"),
    (r"Founder & Lead Technologist", r"Founder & Principal Technologist"),
    
    # First Presbyterian Church
    (r"First Presbyterian Church", r"First Presbyterian Church (August 2011 – Present. Youth leadership & civic mentorship (10 hrs/wk))"),

    # UAB Summer Camp TA
    (r"UAB Summer Camp TA", r"UAB Summer Camp TA (June 2026 – August 2026. Hours: 20–40 hrs/wk)"),
    
    # Shades Valley High School
    (r"Shades Valley High School", r"Shades Valley High School (July 2024 – June 2025 (Full-Time, 40 hrs/wk). Subject: CTE Business, Marketing, and Finance. Add: 2025 JEFCOED Technology Torchbearer Award for Excellence.)"),

    # Corner High School
    (r"Corner High School", r"Corner High School (August 2023 – June 2024 (Full-Time, 40 hrs/wk). Subject: CTE Business, Marketing, and Finance (DECA Chapter Founder & State Competition Coach).)"),
    
    # MidSouth Extracts
    (r"Operational Director", r"Operational Director & Laboratory Specialist"),
    (r"January 2023 – May 2023", r"January 2023 – May 2023 (Full-Time, 40 hrs/wk)"),
    
    # SelectQuote
    (r"Sales Development Specialist & Team Lead", r"Sales Development Specialist"),
    (r"April 2021 – November 2022", r"April 2021 – November 2022 (Full-Time, 40 hrs/wk)"),
    (r"Awarded the <strong>Top Sales Award \(2022\)</strong> and <strong>SQ Team Lead Award \(2021\)</strong>.", r"Awarded the <strong>Top Sales Award (2021)</strong>."),
    
    # Uganda
    (r"Uganda health mission establishing 2 mobile clinics serving 1,000\+ rural patients;", r"OmniMed Certified Village Health Volunteer (Uganda, East Africa). July 2017 – August 2017. Established 2 mobile clinics serving 1,000+ rural patients;"),
    
    # Conference
    (r"Standalone Derby Reference", r"National Jump$tart Financial Literacy National Educator Conference (Louisville, KY)"),
]

for old, new in replacements:
    content = re.sub(old, new, content)

with open(html_path, 'w') as f:
    f.write(content)

# CSS modifications
css_path = '/Users/andrewstrachan/career_portfolio/styles/main.css'
with open(css_path, 'a') as f:
    f.write("""
/* Revamp Blueprint Specifications */
.accordion { border: 1px solid var(--color-circuit-gold); margin-bottom: 1rem; }
.accordion-content { display: none; padding: 1rem; }
.carousel-container { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; white-space: nowrap; }

.sticky-canvas-wrapper { height: 400dvh; }
.sticky-canvas-inner { position: sticky; top: 0; height: 100dvh; z-index: 1; pointer-events: none; }
.interactive-card { pointer-events: auto; }

.nav-cues { display: none; }
@media (hover: hover) and (pointer: fine) { .nav-cues { display: block; } }
.mobile-swipe-cues { display: block; }
@media (hover: hover) and (pointer: fine) { .mobile-swipe-cues { display: none; } }

.modal-close-btn { z-index: 9999; pointer-events: auto; }
.modal-header-fix { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 48px; }
""")

print("Patch 2 complete")
