#!/usr/bin/env python3
import urllib.request
import re
import json
import os
from html.parser import HTMLParser

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def fetch(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read().decode('utf-8', errors='ignore')

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.texts = []
    def handle_data(self, data):
        d = data.strip()
        if d:
            self.texts.append(d)

def parse_puppy(slug):
    url = f"https://puppy.instabizweb.com/puppies/{slug}"
    try:
        html = fetch(url)
    except Exception as e:
        print(f"Failed {slug}: {e}")
        return None

    # Meta description
    meta_desc_match = re.search(r'<meta\s+name=[\"\']description[\"\']\s+content=[\"\']([^\"\']+)[\"\']', html)
    meta_desc = meta_desc_match.group(1) if meta_desc_match else ""

    # OG Image
    og_img_match = re.search(r'<meta\s+property=[\"\']og:image[\"\']\s+content=[\"\']([^\"\']+)[\"\']', html)
    og_image = og_img_match.group(1) if og_img_match else ""

    # Extract all media images
    media_imgs = re.findall(r'(/media/[a-zA-Z0-9_\-]+/[a-zA-Z0-9_\-]+/[a-zA-Z0-9_\-]+\.(?:webp|jpg|jpeg|png|avif))', html)
    # Filter and format
    seen = set()
    images = []
    if og_image:
        images.append(og_image)
        seen.add(og_image)
    for m in media_imgs:
        full = f"https://puppy.instabizweb.com{m}"
        if full not in seen:
            seen.add(full)
            images.append(full)

    # Parse text tokens
    parser = TextExtractor()
    parser.feed(html)
    tokens = parser.texts

    # Defaults
    name = slug.replace("-", " ").title()
    breed = "Puppy"
    gender = "Boy"
    age = "2-3 months"
    status = "Available"
    location = "Imported for you"

    # Search in tokens
    for i, t in enumerate(tokens):
        if t == "Breed" and i + 1 < len(tokens):
            breed = tokens[i+1]
        elif t in ("Boy or girl", "Gender") and i + 1 < len(tokens):
            gender = tokens[i+1]
        elif t == "Age" and i + 1 < len(tokens):
            age = tokens[i+1]
        elif t == "Where" and i + 1 < len(tokens):
            location = tokens[i+1]
        elif t in ("Available", "Reserved", "Gone Home", "Gone home"):
            status = t.capitalize()

    # Extract name from title or headings
    title_match = re.search(r'<title>([^,<\-]+)', html)
    if title_match:
        cand = title_match.group(1).strip()
        if cand and len(cand) < 30 and not cand.startswith("Teddy"):
            name = cand

    return {
        "id": slug,
        "slug": slug,
        "name": name,
        "breed": breed,
        "gender": gender,
        "age": age,
        "location": location,
        "status": status,
        "description": meta_desc or f"Meet {name}, a beautiful {breed} looking for a loving home.",
        "images": images if images else ["/images/puppy-placeholder.jpg"],
        "price": "AED 12,500",
        "vaccinated": True,
        "dewormed": True,
        "microchipped": True,
        "healthCertificate": True,
        "passport": True
    }

def main():
    with open("data/slugs.json") as f:
        slugs = json.load(f)

    print(f"Scraping {len(slugs)} puppies...")
    puppies = []
    for s in slugs:
        print(f"Scraping {s}...")
        p = parse_puppy(s)
        if p:
            puppies.append(p)

    os.makedirs("data", exist_ok=True)
    with open("data/puppies.json", "w") as f:
        json.dump(puppies, f, indent=2)

    print(f"Successfully scraped {len(puppies)} puppies to data/puppies.json!")

if __name__ == '__main__':
    main()
