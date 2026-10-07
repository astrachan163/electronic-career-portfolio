import re

with open('styles/components.css', 'r') as f:
    css = f.read()

# Update .skill-item-pill flexbox
pill_pattern = r'(\.skill-item-pill\s*\{[^\}]*?align-items:\s*)center(;)'
# Actually, I'll just append it to the end to override cleanly.

override = """
/* Deslopification UI Overrides */
.skill-item-pill {
  justify-content: space-between;
  align-items: flex-start;
}
.skill-item-pill > span:first-of-type {
  flex: 1;
  padding-right: 0.5rem;
  line-height: 1.3;
}
.skill-category-badge {
  white-space: nowrap;
  flex-shrink: 0;
  margin-top: 0.1rem;
}
details > summary::-webkit-details-marker {
  display: none;
}
details[open] summary span:last-child {
  transform: rotate(180deg);
}
"""

with open('styles/components.css', 'a') as f:
    f.write(override)
