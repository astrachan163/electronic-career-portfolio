import re

with open('index.html', 'r') as f:
    content = f.read()

invasion_html = """
    <!-- 01. INVASION SCROLL HERO (VERY FIRST ELEMENT AT TOP OF PAGE) -->
    <section id="invasion-hero-section" class="portfolio-section" aria-label="Cinematic Project Atlas Introduction" style="padding: 0; margin-top: 0;">
      <div class="sticky-canvas-wrapper" id="invasion-canvas-wrapper" style="height: 400dvh; position: relative;">
        <div class="sticky-canvas-inner" style="position: sticky; top: 0; height: 100dvh; display: flex; align-items: center; justify-content: center; background: #030810; overflow: hidden; z-index: 1;">
          <canvas id="invasion-canvas" class="hero-canvas" aria-hidden="true" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;"></canvas>
          <div class="scroll-down-indicator" style="position: absolute; bottom: 3rem; color: #fff; font-size: 0.8rem; letter-spacing: 0.1em; opacity: 0.7; pointer-events: none; text-align: center; text-transform: uppercase;">
            <div style="width: 1px; height: 60px; background: rgba(255,255,255,0.5); margin: 0 auto 12px;"></div>
            Scroll To Explore
          </div>
        </div>
      </div>
    </section>
"""

# Insert right after <main id="main-content" role="main">
content = re.sub(
    r'(<main id="main-content" role="main">\s*)',
    r'\1' + invasion_html,
    content
)

# Insert the script tag
script_tag = '  <script src="js/canvas-scrub.js" defer></script>\n'
if 'canvas-scrub.js' not in content:
    content = re.sub(
        r'(<script src="js/app.js"></script>)',
        r'\1\n' + script_tag,
        content
    )

with open('index.html', 'w') as f:
    f.write(content)
