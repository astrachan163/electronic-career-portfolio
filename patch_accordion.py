import re

with open('js/app.js', 'r') as f:
    js = f.read()

accordion_js = """
  initAccordion() {
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const accordion = header.closest('.accordion');
        if (accordion) {
          accordion.classList.toggle('active');
        }
      });
    });
  }
"""

if "initAccordion()" not in js:
    # Add to init()
    js = js.replace('this.initImageLightbox();', 'this.initImageLightbox();\n      this.initAccordion();')
    # Add method
    js = js.replace('  initImageLightbox() {', accordion_js + '\n  initImageLightbox() {')

with open('js/app.js', 'w') as f:
    f.write(js)

print("Accordion JS added")
