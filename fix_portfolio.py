import re
import json

HTML_FILE = 'index.html'
RESUME_FILE = 'data/resume.json'
CSS_MAIN = 'styles/main.css'
CSS_COMPONENTS = 'styles/components.css'

with open(HTML_FILE, 'r') as f:
    html = f.read()

# 1. Text Replacements
html = html.replace('Completed in Good Standing.', 'Eligible for readmission with advanced standing.')
html = html.replace('Coursework Completed in Good Standing', 'Eligible for readmission with advanced standing')

# Remove 14 Federal Drops section
drop_pattern = r'<div class="insight-card">[\s\S]*?<span class="badge-wage-level"[^>]*>14 Federal Drops</span>[\s\S]*?</div>'
html = re.sub(drop_pattern, '', html)

# Remove 51 Tracked Opportunities section
track_pattern = r'<div class="insight-card">[\s\S]*?<span class="badge-wage-level"[^>]*>51 Tracked Opportunities</span>[\s\S]*?</div>'
html = re.sub(track_pattern, '', html)

# 2. Distinct World Canvas (Car Animation)
# Find the showcase-canvas-wrapper
showcase_pattern = r'(<div class="interactive-showcase-canvas-pipeline sticky-canvas-wrapper" id="showcase-canvas-wrapper">\s*<div class="sticky-canvas-inner">\s*<canvas id="game-canvas"[^>]*></canvas>\s*</div>)'
# We want to pull the canvas OUT of the showcase wrapper, or just end the wrapper early.
# Actually, the user wants the Car Canvas to be its own section BEFORE the showcase grid.
car_canvas_html = """
    <!-- 02. CAR SCRUB HERO -->
    <section id="car-scrub-hero" class="portfolio-section" aria-label="Project Infrastructure Visualization" style="padding: 0;">
      <div class="sticky-canvas-wrapper" id="showcase-canvas-wrapper" style="height: 400dvh; position: relative;">
        <div class="sticky-canvas-inner" style="position: sticky; top: 0; height: 100dvh; display: flex; align-items: center; justify-content: center; background: #030810; overflow: hidden; z-index: 1;">
          <canvas id="game-canvas" class="hero-canvas" aria-hidden="true" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;"></canvas>
        </div>
      </div>
    </section>
"""

# Remove the old canvas and wrapper opening from above showcase-grid
html = re.sub(showcase_pattern, '', html)

# Insert the new car_canvas_html right before the <h3>Curated Highlight Projects
html = re.sub(r'(<h3[^>]*>Curated Highlight Projects)', car_canvas_html + r'\n        \1', html)

# Now we need to remove the closing </div> of the old showcase-canvas-wrapper that was wrapping showcase-grid.
# We will just remove the last </div> before the end of the section
section_end_pattern = r'(\s*</div>\s*</section>\s*<!-- ==========================================================================)'
# Wait, this is tricky. Let's just do a string replacement for the exact DOM.

# Let's write the HTML back
with open(HTML_FILE, 'w') as f:
    f.write(html)
