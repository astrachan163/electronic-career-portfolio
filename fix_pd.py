import re

with open('index.html', 'r') as f:
    html = f.read()

# ALSDE
html = html.replace(
    'Engaged in the Alabama State Department of Education (ALSDE) statewide CTE leadership summit, focusing on Alabama Plan 2026 educational milestones, workforce credentialing governance, and high-school-to-career technical pathways.',
    'Statewide CTE leadership summit focusing on workforce credentialing governance and high-school-to-career technical pathways.'
)

# JumpStart
html = html.replace(
    'Completed intensive professional learning at the premier Jump$tart National Financial Education Conference in Louisville, KY (Kentucky Derby region), mastering interactive classroom financial simulation tools, FinTech curriculum design, and adaptive executive leadership.',
    'Intensive professional learning on interactive classroom financial simulation tools and FinTech curriculum design.'
)

# UMMC ASB
html = html.replace(
    'Appointed as Quality Improvement Chair for Education by the Associated Student Body (ASB) Executive Council at the University of Mississippi Medical Center. Directed student-faculty academic feedback loops, clinical curriculum quality audits, and institutional continuous improvement initiatives.',
    'Appointed as Quality Improvement Chair for Education by the UMMC Associated Student Body (ASB) Executive Council. Directed student-faculty academic feedback loops and clinical curriculum quality audits.'
)

# NonArtificial
html = html.replace(
    'Architecting decentralized intelligence infrastructure and sovereign AI systems at NonArtificial Superintelligence, integrating high-assurance cryptography, Web3 domain registry protocols, and autonomous agent verification models.',
    'Architecting decentralized intelligence infrastructure and sovereign AI systems at NonArtificial Superintelligence.'
)

with open('index.html', 'w') as f:
    f.write(html)
