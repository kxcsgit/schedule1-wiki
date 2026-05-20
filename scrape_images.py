#!/usr/bin/env python3
"""Scrape images from Schedule I Fandom Wiki using urllib."""

import json
import os
import re
import time
import urllib.request

WIKI_BASE = "https://schedule-1.fandom.com"
OUTPUT_DIR = "/opt/data/home/projects/schedule1-wiki/public/images"
os.makedirs(f"{OUTPUT_DIR}/drugs", exist_ok=True)
os.makedirs(f"{OUTPUT_DIR}/ingredients", exist_ok=True)
os.makedirs(f"{OUTPUT_DIR}/properties", exist_ok=True)
os.makedirs(f"{OUTPUT_DIR}/achievements", exist_ok=True)

ITEMS = {
    "drugs": [
        "OG_Kush", "Sour_Diesel", "Green_Crack", "Granddaddy_Purple",
        "Methamphetamine", "Shrooms", "Cocaine"
    ],
    "ingredients": [
        "Cuke", "Banana", "Paracetamol", "Donut", "Viagor", "Mouth_Wash",
        "Flu_Medicine", "Gasoline", "Energy_Drink", "Mega_Bean",
        "Horse_Semen", "Battery", "Iodine", "Addy", "Chili", "Motor_Oil",
        "Phosphorus", "Acid"
    ],
    "properties": [
        "Sweatshop", "Bungalow", "Barn", "Docks_Warehouse", "Storage_Unit",
        "Riverside_Dispatch", "Motel"
    ],
}

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
}

def fetch_url(url):
    """Fetch URL with custom headers."""
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"  ✗ Fetch error: {e}")
        return None

def download_binary(url, save_path):
    """Download binary file."""
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            with open(save_path, 'wb') as f:
                f.write(data)
            print(f"  ✓ Saved: {save_path} ({len(data)} bytes)")
            return True
    except Exception as e:
        print(f"  ✗ Download error: {e}")
        return False

def get_wiki_image(page_name):
    """Fetch the main image from a Fandom wiki page."""
    url = f"{WIKI_BASE}/wiki/{page_name}"
    html = fetch_url(url)
    if not html:
        return None
    
    # Try og:image first
    og_match = re.search(r'<meta property="og:image" content="([^"]+)"', html)
    if og_match:
        img_url = og_match.group(1)
        return img_url
    
    # Try article image
    img_match = re.search(r'<img[^>]*class="[^"]*pi-image-thumbnail[^"]*"[^>]*src="([^"]+)"', html)
    if img_match:
        return img_match.group(1)
    
    # Try data-src images
    img_matches = re.findall(r'<img[^>]*data-src="([^"]+)"[^>]*width="(\d+)"', html)
    if img_matches:
        img_matches.sort(key=lambda x: int(x[1]), reverse=True)
        return img_matches[0][0]
    
    print(f"  ✗ No image found for {page_name}")
    return None

def slugify(name):
    return name.lower().replace(' ', '-').replace('_', '-')

# Main
results = {}
for category, pages in ITEMS.items():
    print(f"\n=== Scraping {category} ===")
    results[category] = {}
    for page_name in pages:
        print(f"\n  Processing: {page_name}")
        img_url = get_wiki_image(page_name)
        if img_url:
            slug = slugify(page_name)
            ext = '.webp'
            if '.png' in img_url.lower():
                ext = '.png'
            elif '.jpg' in img_url.lower() or '.jpeg' in img_url.lower():
                ext = '.jpg'
            
            save_path = f"{OUTPUT_DIR}/{category}/{slug}{ext}"
            if download_binary(img_url, save_path):
                results[category][page_name] = {
                    'url': img_url,
                    'local': f"/images/{category}/{slug}{ext}",
                    'slug': slug
                }
        time.sleep(0.3)

with open(f"{OUTPUT_DIR}/image_map.json", 'w') as f:
    json.dump(results, f, indent=2)

print(f"\n=== Summary ===")
for cat, items in results.items():
    print(f"  {cat}: {len(items)} images")
