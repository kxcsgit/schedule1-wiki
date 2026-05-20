#!/usr/bin/env python3
"""Download item images from Fandom Wiki API."""

import json
import os
import urllib.request
import time

WIKI_API = "https://schedule-1.fandom.com/api.php"
OUTPUT_DIR = "/opt/data/home/projects/schedule1-wiki/public/images"
os.makedirs(f"{OUTPUT_DIR}/drugs", exist_ok=True)
os.makedirs(f"{OUTPUT_DIR}/ingredients", exist_ok=True)
os.makedirs(f"{OUTPUT_DIR}/properties", exist_ok=True)

# Map of item name -> expected image filename patterns
IMAGE_MAP = {
    # Drugs
    "og-kush": ["Brick_ogkush_icon.png", "OG_Kush.png"],
    "sour-diesel": ["Brick_sourdiesel_icon.png", "Sour_Diesel.png"],
    "green-crack": ["Brick_greencrack_icon.png", "Green_Crack.png", "Afghan_Crack.png"],
    "granddaddy-purple": ["Brick_granddaddypurple_icon.png", "Granddaddy_Purple.png"],
    "methamphetamine": ["Brick_meth_icon.png", "Methamphetamine.png", "Facemeth.jpg"],
    "shrooms": ["Shrooms.png", "Shroom.png"],
    "cocaine": ["Cocaine_Icon.png", "Cocaine.png", "Cocaine-powder.webp"],
    
    # Ingredients
    "cuke": ["Cuke_Icon.png", "Cuke.png"],
    "banana": ["Banana_Icon.png", "Banana.png"],
    "paracetamol": ["Paracetamol_Icon.png", "Paracetamol.png"],
    "donut": ["Donut_Icon.png", "Donut.png"],
    "viagor": ["Viagor_Icon.png", "Viagor.png"],
    "mouth-wash": ["Mouth_Wash_Icon.png", "Mouth_Wash.png"],
    "flu-medicine": ["Flu_Medicine_Icon.png", "Flu_medicine.png"],
    "gasoline": ["Gasoline_Icon.png", "Gasoline.png"],
    "energy-drink": ["Energy_Drink_Icon.png", "Energy_drink.png"],
    "mega-bean": ["Mega_Bean_Icon.png", "Mega_Bean.png"],
    "horse-semen": ["Horse_Semen_Icon.png", "Horse_Semen.png"],
    "battery": ["Battery_Icon.png"],
    "iodine": ["Iodine_Icon.png", "Iodine.png"],
    "addy": ["Addy_Icon.png"],
    "chili": ["Chili_Icon.png", "Chili.png"],
    "motor-oil": ["Motor_Oil_Icon.png", "Motor_Oil.png"],
    "phosphorus": ["Phosphorus_Icon.png", "Phosphorus.png"],
    "acid": ["Acid_Icon.png", "Acid.png"],
    
    # Properties
    "sweatshop": ["Sweatshop.png", "Sweatshop_Exterior.png", "Behind_Sweatshop.jpg"],
    "bungalow": ["Bungalow.png", "Bungalow.jpg"],
    "barn": ["Barn.png", "Barn.jpeg", "Barn_Exterior.png"],
    "docks-warehouse": ["Docks_Warehouse.jpeg", "Docks_Warehouse_Office.png"],
    "storage-unit": ["Storage_Unit.png"],
    "riverside-dispatch": ["Riverside_Dispatch.png"],
    "motel": ["Motel.png"],
}

def fetch_all_images():
    """Fetch all images from the wiki."""
    all_images = {}
    aid = ""
    while True:
        url = f"{WIKI_API}?action=query&list=allimages&ailimit=500&aiprop=url|dimensions&format=json"
        if aid:
            url += f"&aifrom={aid}"
        
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
        
        if 'query' not in data or 'allimages' not in data['query']:
            break
        
        for img in data['query']['allimages']:
            all_images[img['name']] = img.get('url', '')
        
        if 'continue' in data and 'aicontinue' in data['continue']:
            aid = data['continue']['aicontinue']
            time.sleep(0.2)
        else:
            break
    
    return all_images

def download_image(url, save_path):
    """Download image."""
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            with open(save_path, 'wb') as f:
                f.write(data)
            print(f"  ✓ {save_path} ({len(data)} bytes)")
            return True
    except Exception as e:
        print(f"  ✗ {e}")
        return False

print("Fetching all wiki images...")
all_images = fetch_all_images()
print(f"Found {len(all_images)} total images on wiki\n")

# Save image list
with open(f"{OUTPUT_DIR}/wiki_images.json", 'w') as f:
    json.dump(all_images, f, indent=2)

results = {"drugs": {}, "ingredients": {}, "properties": {}}

for slug, candidates in IMAGE_MAP.items():
    # Determine category
    if slug in ["og-kush", "sour-diesel", "green-crack", "granddaddy-purple", 
                "methamphetamine", "shrooms", "cocaine"]:
        cat = "drugs"
    elif slug in ["sweatshop", "bungalow", "barn", "docks-warehouse", 
                  "storage-unit", "riverside-dispatch", "motel"]:
        cat = "properties"
    else:
        cat = "ingredients"
    
    # Find matching image
    found = False
    for candidate in candidates:
        if candidate in all_images:
            ext = os.path.splitext(candidate)[1]
            save_path = f"{OUTPUT_DIR}/{cat}/{slug}{ext}"
            if download_image(all_images[candidate], save_path):
                results[cat][slug] = {
                    "file": f"/images/{cat}/{slug}{ext}",
                    "source": candidate
                }
                found = True
                break
    
    if not found:
        print(f"  ⚠ No image found for {slug}")
    
    time.sleep(0.1)

# Save results
with open(f"{OUTPUT_DIR}/download_results.json", 'w') as f:
    json.dump(results, f, indent=2)

print(f"\n=== Summary ===")
for cat, items in results.items():
    print(f"  {cat}: {len(items)} images")
