import os
import re

html_path = '/Users/andrewstrachan/career_portfolio/index.html'
with open(html_path, 'r') as f:
    content = f.read()

# Make backups
os.system('cp /Users/andrewstrachan/career_portfolio/index.html /Users/andrewstrachan/career_portfolio/index.html.bak')

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
]

for old, new in replacements:
    content = re.sub(old, new, content)

with open(html_path, 'w') as f:
    f.write(content)

print("Patch complete")
