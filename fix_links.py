import re

with open('index.html', 'r') as f:
    html = f.read()

# Replace the GitHub and Credly cards with GHS Learning Platform
ghs_card = """
          <div class="glass-card" style="padding: 1.25rem;">
            <h4 style="font-size: 1rem; margin-bottom: 0.25rem;"><a href="https://ghs-lp-dev-astrachan163.firebaseapp.com/" target="_blank" rel="noopener noreferrer">GHS Learning Platform</a></h4>
            <p style="font-size: 0.8125rem; color: var(--color-circuit-gold); margin-bottom: 0.5rem;">Firebase · Google Cloud Prototype</p>
            <p style="font-size: 0.8125rem; color: var(--color-text-muted); margin-bottom: 0;">Functional testing prototype for student portal and course delivery.</p>
          </div>
"""

# The pattern to match the last two cards:
# <div class="glass-card" style="padding: 1.25rem;">\s*<h4[^>]*><a href="https://github.com/astrachan163"[\s\S]*?</div>\s*</div>
pattern = r'<div class="glass-card" style="padding: 1\.25rem;">\s*<h4[^>]*><a href="https://github\.com/astrachan163"[\s\S]*?<div class="glass-card" style="padding: 1\.25rem;">\s*<h4[^>]*><a href="https://www\.credly\.com/badges/d4e5c326-c255-405c-b50e-0a369d6fc3a0/public_url"[\s\S]*?</div>'

html = re.sub(pattern, ghs_card.strip(), html)

with open('index.html', 'w') as f:
    f.write(html)
