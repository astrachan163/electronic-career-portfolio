import re
import json

HTML_FILE = 'index.html'

with open(HTML_FILE, 'r') as f:
    html = f.read()

# Fix the dangling closing div for showcase-canvas-wrapper
# It occurs right before "<!-- Directory of 28+ Verified Live Project Deployments -->"
fix_div_pattern = r'(</div>\s*</div>\s*)(<!-- Directory of 28\+ Verified Live Project Deployments -->)'
# Wait, let's just replace `</div>\s*</div>` with `</div>` in that specific spot.
html = re.sub(r'(\s*</div>\s*)(</div>\s*<!-- Directory of 28\+ Verified Live Project Deployments -->)', r'\1<!-- Directory of 28+ Verified Live Project Deployments -->', html)

# Replace Job Insights
new_jobs_html = """
          <!-- NEW TARGETED JOB POSTINGS (Federal & Industry) -->
          <div class="insight-card">
            <h4 class="insight-title">NSA Cooperative Education Program - Hawaii</h4>
            <span class="badge-wage-level" style="margin-bottom: 0.75rem;">DEPARTMENT OF DEFENSE</span>
            <p class="insight-metric">National Security Agency/Central Security Service</p>
            <a href="https://www.usajobs.gov/job/883735600" target="_blank" rel="noopener noreferrer" style="font-size: 0.8125rem; color: var(--color-cyber-cyan);">View Posting</a>
          </div>
          
          <div class="insight-card">
            <h4 class="insight-title">Principal AI Software Engineer</h4>
            <span class="badge-wage-level" style="margin-bottom: 0.75rem;">GENERAL SERVICES ADMINISTRATION</span>
            <p class="insight-metric">Technology Transformation Service</p>
            <a href="https://www.usajobs.gov/job/883695200" target="_blank" rel="noopener noreferrer" style="font-size: 0.8125rem; color: var(--color-cyber-cyan);">View Posting</a>
          </div>

          <div class="insight-card">
            <h4 class="insight-title">Summer Student Internship</h4>
            <span class="badge-wage-level" style="margin-bottom: 0.75rem;">Nuclear Regulatory Commission</span>
            <p class="insight-metric">Federal Internship</p>
            <a href="https://www.usajobs.gov/job/887103900" target="_blank" rel="noopener noreferrer" style="font-size: 0.8125rem; color: var(--color-cyber-cyan);">View Posting</a>
          </div>

          <div class="insight-card">
            <h4 class="insight-title">COMPUTER SCIENCE INTERN</h4>
            <span class="badge-wage-level" style="margin-bottom: 0.75rem;">DEPARTMENT OF DEFENSE</span>
            <p class="insight-metric">Defense Finance and Accounting Service</p>
            <a href="https://www.usajobs.gov/job/886887400" target="_blank" rel="noopener noreferrer" style="font-size: 0.8125rem; color: var(--color-cyber-cyan);">View Posting</a>
          </div>

          <div class="insight-card">
            <h4 class="insight-title">AI Machine Learning Engineering Staff</h4>
            <span class="badge-wage-level" style="margin-bottom: 0.75rem;">$135,700 - $251,900</span>
            <p class="insight-metric">Fort Worth, TX (Remote) · Experienced Professional</p>
          </div>

          <div class="insight-card">
            <h4 class="insight-title">Software Productization & Tech Commercialization Architect</h4>
            <span class="badge-wage-level" style="margin-bottom: 0.75rem;">$120,600 - $224,000</span>
            <p class="insight-metric">Virtual Three, CO (Remote) · Experienced Professional</p>
          </div>

          <div class="insight-card">
            <h4 class="insight-title">Software Engineer Asc - Early Career</h4>
            <span class="badge-wage-level" style="margin-bottom: 0.75rem;">$67,000 - $124,400</span>
            <p class="insight-metric">Orlando, FL (Hybrid)</p>
          </div>

          <div class="insight-card">
            <h4 class="insight-title">Software Architect</h4>
            <span class="badge-wage-level" style="margin-bottom: 0.75rem;">$135,700 - $251,900</span>
            <p class="insight-metric">Littleton, CO (Onsite)</p>
          </div>

          <div class="insight-card">
            <h4 class="insight-title">Systems Engineering Intern</h4>
            <span class="badge-wage-level" style="margin-bottom: 0.75rem;">$33.51 - $38.71 / hr</span>
            <p class="insight-metric">Sunnyvale, CA (Onsite)</p>
          </div>
"""

old_jobs_pattern = r'(<div class="job-insights-grid">\s*<div class="insight-card">\s*<h4 class="insight-title">AI/ML Software Engineer.*?</p>\s*</div>)'
# Actually, the user wants us to REPLACE the jobs. Let's just find `<div class="job-insights-grid">` and replace its contents.
# Wait, I already removed "14 Federal Drops" and "51 Tracked Opportunities".
# Let's replace the whole grid.
grid_pattern = r'<div class="job-insights-grid">[\s\S]*?(</div>\s*<!-- 10\. Interactive Salary Explorer -->)'
# Wait, if I replace, I want to preserve the `job-insights-grid` div and the closing div.
# But I also need to wrap it in `.scrolling-internal-container`.

# Wrapping skills grid
html = re.sub(r'(<div id="skills-matrix-display" class="skills-grid" style="margin-bottom: 2rem;">)', r'<div class="scrolling-internal-container">\n          \1', html)
# find the closing div of skills-matrix-display
# We know it ends before `<div class="skills-repos-drawer-container">`
html = re.sub(r'(<div class="skills-repos-drawer-container">)', r'</div>\n        \1', html)

# Wrapping timeline container
html = re.sub(r'(<div class="timeline-container">)', r'<div class="scrolling-internal-container">\n          \1', html)
html = re.sub(r'(</section>\s*<!-- ==========================================================================\s*Section 4: FBLA-Targeted Project Architecture & Delivery Showcase)', r'</div>\n      \1', html)

# Let's do the Job Insights grid replacement manually.

with open(HTML_FILE, 'w') as f:
    f.write(html)
