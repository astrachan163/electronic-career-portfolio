import re

with open('index.html', 'r') as f:
    html = f.read()

# 1. Simplify the Career Section intro
old_intro = "Rigorous labor market investigation for the chosen career pathway: Information Security Analyst & Cybersecurity Systems Engineer, substantiated by official U.S. Bureau of Labor Statistics (BLS) data, federal compensation scales, and industry challenge analysis."
new_intro = "Labor market data and federal classification for Information Security Analyst & Cybersecurity Systems Engineer."
html = html.replace(old_intro, new_intro)

# 2. Wrap the BLS Stats in a Details/Summary to reduce visual bulk
# The stats overview starts with: <h3 style="color: var(--color-circuit-gold); margin-bottom: 1.25rem;">Official BLS Economic Research & Job Outlook (SOC 15-1212.00)</h3>
# And ends with: </div>\n\n        <!-- 10. Interactive Salary Explorer -->

# Let's find the BLS header and the Interactive Salary Explorer and wrap everything in between (including the header) in <details>
pattern = r'(<h3 style="color: var\(--color-circuit-gold\); margin-bottom: 1\.25rem;">Official BLS Economic Research & Job Outlook \(SOC 15-1212\.00\)</h3>[\s\S]*?</div>\s*)(<!-- 10\. Interactive Salary Explorer -->)'

def replacer(match):
    content = match.group(1)
    # Extract the h3 text
    h3_match = re.search(r'<h3[^>]*>(.*?)</h3>', content)
    h3_text = h3_match.group(1) if h3_match else "Official BLS Economic Research & Job Outlook"
    
    # Remove the h3 from the content so we can use it as the summary
    inner_content = re.sub(r'<h3[^>]*>.*?</h3>\s*', '', content)
    
    wrapped = f"""
        <details class="interactive-card" style="margin-bottom: 2rem; border: 1px solid var(--glass-border); border-radius: var(--border-radius-md); background: var(--glass-bg);">
          <summary style="padding: 1rem; cursor: pointer; color: var(--color-circuit-gold); font-weight: 600; font-size: 1.1rem; list-style: none; display: flex; justify-content: space-between; align-items: center;">
            <span>{h3_text}</span>
            <span style="color: var(--color-cyber-cyan);">▼</span>
          </summary>
          <div style="padding: 0 1rem 1rem 1rem;">
            {inner_content}
          </div>
        </details>
"""
    return wrapped + match.group(2)

html = re.sub(pattern, replacer, html)

# Do the same for the Interactive Salary Explorer
pattern_salary = r'(<!-- 10\. Interactive Salary Explorer -->\s*<div class="salary-explorer-container"[\s\S]*?</div>\s*</div>\s*)(<!-- ==========================================================================)'

def replacer_salary(match):
    content = match.group(1)
    wrapped = f"""
        <details class="interactive-card" style="margin-bottom: 2rem; border: 1px solid var(--glass-border); border-radius: var(--border-radius-md); background: var(--glass-bg);">
          <summary style="padding: 1rem; cursor: pointer; color: var(--color-circuit-gold); font-weight: 600; font-size: 1.1rem; list-style: none; display: flex; justify-content: space-between; align-items: center;">
            <span>Interactive Salary Explorer (Federal vs Industry)</span>
            <span style="color: var(--color-cyber-cyan);">▼</span>
          </summary>
          <div style="padding: 0 1rem 1rem 1rem;">
            {content}
          </div>
        </details>
"""
    return wrapped + match.group(2)

html = re.sub(pattern_salary, replacer_salary, html)


# 3. Remove "This aligns..." and other slop from the Timeline and Skills
html = html.replace('Provides indispensable executive communication, financial modeling, and instructional leadership skills. ', '')
html = html.replace('Demonstrates structured, long-term career execution fulfilling the CyberCorps SFS public service service requirement across GS-9 through GS-12 bands.', '')
html = html.replace('Rigorous analytical methodology, empirical research design, and high-stakes problem decomposition.', 'Analytical methodology and problem decomposition.')

with open('index.html', 'w') as f:
    f.write(html)
