import re

with open('index.html', 'r') as f:
    html = f.read()

new_jobs = """<div class="job-insights-grid scrolling-internal-container" style="max-height: 50vh; overflow-y: auto; padding-right: 10px;">
          <!-- NEW TARGETED JOB POSTINGS -->
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
          
          <div class="insight-card">
            <h4 class="insight-title">Winter 2027 Co-op - Risk Management</h4>
            <span class="badge-wage-level" style="margin-bottom: 0.75rem;">C$25.90 - C$30.20</span>
            <p class="insight-metric">Ottawa, CAN (Hybrid)</p>
          </div>
          
          <div class="insight-card">
            <h4 class="insight-title">Information Technology Intern</h4>
            <span class="badge-wage-level" style="margin-bottom: 0.75rem;">$15.86 - $23.79</span>
            <p class="insight-metric">Fort Worth, TX (Remote)</p>
          </div>
          
          <div class="insight-card">
            <h4 class="insight-title">AI Engineer Intern</h4>
            <span class="badge-wage-level" style="margin-bottom: 0.75rem;">$24.37 - $28.15</span>
            <p class="insight-metric">Aguadilla, PR (Remote)</p>
          </div>
          
          <div class="insight-card">
            <h4 class="insight-title">A/AI Research Engineer - E2</h4>
            <span class="badge-wage-level" style="margin-bottom: 0.75rem;">$81,100 - $150,500</span>
            <p class="insight-metric">Orlando, FL (Onsite)</p>
          </div>
          
          <div class="insight-card">
            <h4 class="insight-title">Software Engineer - Early Career</h4>
            <span class="badge-wage-level" style="margin-bottom: 0.75rem;">$88,189 - $146,163</span>
            <p class="insight-metric">Uniondale, NY (Hybrid)</p>
          </div>"""

# Find `<div class="job-insights-grid">` up to `<!-- 10. Interactive Salary Explorer -->`
pattern = r'<div class="job-insights-grid">[\s\S]*?(</div>\s*<!-- 10\. Interactive Salary Explorer -->)'
html = re.sub(pattern, new_jobs + r'\n        \1', html)

with open('index.html', 'w') as f:
    f.write(html)
