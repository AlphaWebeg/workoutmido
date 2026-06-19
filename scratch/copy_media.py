import re

jsx_path = "fitness-tracker.jsx"
html_path = "fitness-tracker.html"

# Read JSX content
with open(jsx_path, "r", encoding="utf-8") as f:
    jsx_content = f.read()

# Extract EXERCISE_MEDIA block from JSX
# Find content starting from const EXERCISE_MEDIA = { until };
pattern = re.compile(r'const EXERCISE_MEDIA = \{.*?\n\};', re.DOTALL)
match = pattern.search(jsx_content)

if not match:
    print("Could not find EXERCISE_MEDIA block in JSX file.")
    exit(1)

jsx_block = match.group(0)
print("Extracted EXERCISE_MEDIA block from JSX.")

# Read HTML content
with open(html_path, "r", encoding="utf-8") as f:
    html_content = f.read()

# Replace the EXERCISE_MEDIA block in HTML
# In HTML, it looks like: const EXERCISE_MEDIA = { ... };
updated_content, count = pattern.subn(jsx_block, html_content)

if count > 0:
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(updated_content)
    print(f"Successfully replaced EXERCISE_MEDIA block in HTML ({count} replacements).")
else:
    print("Could not find EXERCISE_MEDIA block in HTML file to replace.")
