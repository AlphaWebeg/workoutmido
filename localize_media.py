import os
import re
import urllib.request
import urllib.parse
import json
import ssl
import sys

# Set standard output to UTF-8 to prevent encoding crashes on Windows
if sys.platform.startswith('win'):
    sys.stdout.reconfigure(encoding='utf-8')

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

html_path = "fitness-tracker.html"
assets_dir = "assets"

if not os.path.exists(assets_dir):
    os.makedirs(assets_dir)
    print(f"Created directory: {assets_dir}")

# Read HTML content
with open(html_path, "r", encoding="utf-8") as f:
    html_content = f.read()

# Find all gif URLs in the EXERCISE_MEDIA block
gif_pattern = re.compile(r'gif:\s*"(https://upload\.wikimedia\.org/wikipedia/commons/[^"]+)"')
matches = gif_pattern.findall(html_content)

print(f"Found {len(matches)} GIF URLs in HTML.")

def get_canonical_url(filename):
    """Query Wikimedia API to get the correct URL of a file."""
    quoted_name = urllib.parse.quote(filename)
    api_url = f"https://commons.wikimedia.org/w/api.php?action=query&titles=File:{quoted_name}&prop=imageinfo&iiprop=url&format=json"
    headers = {
        'User-Agent': 'FitnessTrackerApp/1.0 (amazi@example.com)'
    }
    req = urllib.request.Request(api_url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ssl_ctx) as response:
            data = json.loads(response.read().decode('utf-8'))
            pages = data.get("query", {}).get("pages", {})
            for page_id, page_info in pages.items():
                if "imageinfo" in page_info:
                    return page_info["imageinfo"][0]["url"]
    except Exception as e:
        print(f"API Error for {filename}: {e}")
    return None

def search_wikimedia_gif(query_str):
    """Search Wikimedia Commons for a GIF matching the query."""
    # We look for files matching the search query that are GIFs
    search_query = f"{query_str} filetype:gif"
    quoted_query = urllib.parse.quote(search_query)
    api_url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={quoted_query}&srnamespace=6&format=json"
    headers = {
        'User-Agent': 'FitnessTrackerApp/1.0 (amazi@example.com)'
    }
    req = urllib.request.Request(api_url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ssl_ctx) as response:
            data = json.loads(response.read().decode('utf-8'))
            results = data.get("query", {}).get("search", [])
            for res in results:
                title = res.get("title", "")
                if title.lower().endswith(".gif"):
                    filename = title.replace("File:", "")
                    print(f"Search found alternative GIF: {filename}")
                    url = get_canonical_url(filename)
                    if url:
                        return url
    except Exception as e:
        print(f"Search API Error for {query_str}: {e}")
    return None

def download_file(url, dest_path):
    """Download a file with custom headers."""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ssl_ctx) as response:
            with open(dest_path, 'wb') as out_file:
                out_file.write(response.read())
        return True
    except Exception as e:
        print(f"Download failed for {url}: {e}")
        return False

replacements = {}

for original_url in matches:
    # Extract filename from URL
    filename_encoded = original_url.split('/')[-1]
    filename = urllib.parse.unquote(filename_encoded)
    
    # Target path
    dest_filename = filename.replace(" ", "_") # sanitize space to underscore
    dest_path = os.path.join(assets_dir, dest_filename)
    
    print(f"\nProcessing: {filename}")
    
    # 1. Try to download directly
    success = False
    if not os.path.exists(dest_path):
        print(f"Attempting direct download...")
        success = download_file(original_url, dest_path)
        
        # 2. If direct fails, try API to find canonical URL
        if not success:
            print("Direct download failed. Querying Wikimedia API by filename...")
            canonical_url = get_canonical_url(filename)
            if not canonical_url and filename != filename.capitalize():
                # Try capitalizing first letter
                canonical_url = get_canonical_url(filename.capitalize())
            
            if canonical_url:
                print(f"Found canonical URL: {canonical_url}")
                new_filename = urllib.parse.unquote(canonical_url.split('/')[-1]).replace(" ", "_")
                dest_path = os.path.join(assets_dir, new_filename)
                dest_filename = new_filename
                success = download_file(canonical_url, dest_path)
            else:
                # 3. If that fails, try searching for the exercise name
                # Clean name: remove extensions, underscores, dashes
                clean_name = filename.replace(".gif", "").replace("_", " ").replace("-", " ")
                print(f"API lookup failed. Searching Wikimedia Commons for alternative GIF: '{clean_name}'...")
                alt_url = search_wikimedia_gif(clean_name)
                if alt_url:
                    print(f"Found alternative URL from search: {alt_url}")
                    new_filename = urllib.parse.unquote(alt_url.split('/')[-1]).replace(" ", "_")
                    dest_path = os.path.join(assets_dir, new_filename)
                    dest_filename = new_filename
                    success = download_file(alt_url, dest_path)
                else:
                    # Let's try searching with just the first word
                    first_word = clean_name.split()[0]
                    if len(first_word) > 3:
                        print(f"Still failed. Searching for keyword: '{first_word}'...")
                        alt_url = search_wikimedia_gif(first_word)
                        if alt_url:
                            print(f"Found alternative URL for keyword search: {alt_url}")
                            new_filename = urllib.parse.unquote(alt_url.split('/')[-1]).replace(" ", "_")
                            dest_path = os.path.join(assets_dir, new_filename)
                            dest_filename = new_filename
                            success = download_file(alt_url, dest_path)
    else:
        print(f"File already exists: {dest_path}")
        success = True
        
    if success:
        print(f"[SUCCESS] Localized to: {dest_path}")
        replacements[original_url] = f"assets/{dest_filename}"
    else:
        print(f"[FAILED] Could not localize: {original_url}")

# Perform replacement in HTML content
updated_content = html_content
replaced_count = 0
for original, relative in replacements.items():
    if original in updated_content:
        updated_content = updated_content.replace(original, relative)
        replaced_count += 1

# Save updated HTML
if replaced_count > 0:
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(updated_content)
    print(f"\nUpdated {html_path} with {replaced_count} local asset paths.")
else:
    print("\nNo paths were updated in the HTML.")
