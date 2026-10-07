with open('styles/main.css', 'r') as f:
    css = f.read()

if "/* Pro-Dev fix */" not in css:
    css += """
/* Pro-Dev fix */
#development { padding-left: 16px; width: 100%; box-sizing: border-box; }
"""
    with open('styles/main.css', 'w') as f:
        f.write(css)

with open('index.html', 'r') as f:
    html = f.read()

html = html.replace('id="modal-video-title" class="modal-title"', 'id="modal-video-title" class="modal-title modal-header-fix"')

# Apply sticky-canvas-wrapper to 3D game canvas area if it exists
html = html.replace('class="hero-canvas-container"', 'class="hero-canvas-container sticky-canvas-wrapper"')
html = html.replace('<canvas id="game-canvas"', '<div class="sticky-canvas-inner"><canvas id="game-canvas"')
html = html.replace('</canvas>', '</canvas></div>')

with open('index.html', 'w') as f:
    f.write(html)
