import re

with open('styles/main.css', 'r') as f:
    css = f.read()

# 1. Soften the glass border
css = css.replace('--glass-border: rgba(255, 255, 255, 0.15);', '--glass-border: rgba(255, 255, 255, 0.05);')
css = css.replace('--glass-border: rgba(255, 255, 255, 0.1);', '--glass-border: rgba(255, 255, 255, 0.05);')

# 2. Subdue the internal scrollbars
css = css.replace('background: var(--color-cyber-cyan);', 'background: rgba(255, 255, 255, 0.15);')

with open('styles/main.css', 'w') as f:
    f.write(css)

with open('styles/components.css', 'r') as f:
    components = f.read()

# 3. Soften the filter chips
components = re.sub(r'(\.filter-chip\s*\{[^}]*?)border:\s*1px solid var\(--glass-border\);', r'\1border: 1px solid transparent;', components)

with open('styles/components.css', 'w') as f:
    f.write(components)
