import re

with open('index.html', 'r') as f:
    html = f.read()

# Let's count the occurrences of remaining slop
slop_words = ['comprehensive', 'robust', 'seamless', 'leverage', 'synergy', 'transformative', 'paradigm', 'unparalleled']
for w in slop_words:
    count = len(re.findall(r'\b' + w + r'\b', html, re.IGNORECASE))
    if count > 0:
        print(f"Slop '{w}': {count}")
