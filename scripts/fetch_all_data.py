#!/usr/bin/env python3
import urllib.request
import re
import json
import os

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
}

def fetch(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=15) as r:
        return r.read().decode('utf-8', errors='ignore')

def main():
    print("Fetching puppies catalog page...")
    html = fetch("https://puppy.instabizweb.com/puppies")
    
    # Save raw html for reference
    os.makedirs("data", exist_ok=True)
    with open("data/raw_catalog.html", "w") as f:
        f.write(html)
        
    print("Fetching sitemap...")
    sitemap = fetch("https://puppy.instabizweb.com/sitemap.xml")
    slugs = re.findall(r'<loc>https://puppy\.instabizweb\.com/puppies/([^<]+)</loc>', sitemap)
    print(f"Discovered {len(slugs)} puppy slugs in sitemap")
    
    with open("data/slugs.json", "w") as f:
        json.dump(slugs, f, indent=2)

if __name__ == '__main__':
    main()
