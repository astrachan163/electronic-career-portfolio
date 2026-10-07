import re

with open('styles/components.css', 'r') as f:
    css = f.read()

# Replace grid-template-columns: repeat(2, 1fr); with grid-template-columns: 1fr;
css = re.sub(r'(grid-template-columns:\s*)repeat\(2,\s*1fr\);', r'\1 1fr;', css)

# Also add word-break to skill-item-pill
pill_pattern = r'(\.skill-item-pill\s*\{[^\}]*?)(transition:)'
css = re.sub(pill_pattern, r'\1word-break: break-word;\n  max-width: 100%;\n  \2', css)

with open('styles/components.css', 'w') as f:
    f.write(css)
