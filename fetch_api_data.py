#!/usr/bin/env python3
"""Fetch accurate data from Fandom Wiki API."""

import json
import urllib.request
import re
import time

WIKI_API = "https://schedule-1.fandom.com/api.php"
HEADERS = {'User-Agent': 'Mozilla/5.0'}

def fetch_wikitext(page_name):
    """Fetch wikitext for a page."""
    url = f"{WIKI_API}?action=parse&page={page_name}&prop=wikitext&format=json"
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
            if 'parse' in data:
                return data['parse'].get('wikitext', {}).get('*', '')
    except Exception as e:
        print(f"  Error fetching {page_name}: {e}")
    return None

def extract_drug_data(wikitext, name):
    """Extract drug data from wikitext."""
    data = {'name': name}
    
    # Price
    price_match = re.search(r'market_price\s*=\s*\$?([\d,]+)', wikitext)
    if price_match:
        data['price'] = f"${price_match.group(1)}"
    
    # Ingredients
    ingredients_match = re.search(r'ingredients\s*=\s*([^\n]+)', wikitext)
    if ingredients_match:
        data['ingredients_raw'] = ingredients_match.group(1).strip()
    
    # Yield
    yield_match = re.search(r'yield\s*=\s*([^\n]+)', wikitext)
    if yield_match:
        data['yield'] = re.sub(r'<[^>]+>', '', yield_match.group(1)).strip()
    
    # Production time
    time_match = re.search(r'production-time\s*=\s*([^\n]+)', wikitext)
    if time_match:
        data['production_time'] = re.sub(r'<[^>]+>', '', time_match.group(1)).strip()
    
    # Supplier
    supplier_match = re.search(r'supplier\s*=\s*([^\n]+)', wikitext)
    if supplier_match:
        data['supplier'] = supplier_match.group(1).strip()
    
    # Equipment
    equipment_match = re.search(r'equipment\s*=\s*([^\n]+)', wikitext)
    if equipment_match:
        data['equipment'] = re.sub(r'<[^>]+>', '', equipment_match.group(1)).strip()
    
    # Extract mixing recipes
    recipes = []
    recipe_pattern = r'\|\s*(\w+)_result\s*=\s*([^\n]+)\n\|\s*\1_price\s*=\s*(\d+)\n\|\s*\1_effects\s*=\s*([^\n]+)\n\|\s*\1_addictiveness\s*=\s*(\d+)'
    for match in re.finditer(recipe_pattern, wikitext):
        ingredient = match.group(1)
        result_name = match.group(2).strip()
        price = match.group(3)
        effects = re.sub(r'<[^>]+>', '', match.group(4)).strip()
        addictiveness = match.group(5)
        recipes.append({
            'ingredient': ingredient,
            'result': result_name,
            'price': f"${price}",
            'effects': effects,
            'addictiveness': f"{addictiveness}%"
        })
    data['recipes'] = recipes
    
    return data

def extract_ingredient_data(wikitext, name):
    """Extract ingredient data from wikitext."""
    data = {'name': name}
    
    # Price
    price_match = re.search(r'price\s*=\s*\$?([\d,]+)', wikitext)
    if price_match:
        data['price'] = f"${price_match.group(1)}"
    
    # Effect
    effect_match = re.search(r'effect\s*=\s*([^\n]+)', wikitext)
    if effect_match:
        data['effect'] = effect_match.group(1).strip()
    
    # Source
    source_match = re.search(r'(source|sold_by|purchased_from)\s*=\s*([^\n]+)', wikitext)
    if source_match:
        data['source'] = re.sub(r'\[\[|\]\]', '', source_match.group(2)).strip()
    
    return data

# Drug pages
DRUG_PAGES = {
    'OG Kush': 'OG_Kush_(Marijuana)',
    'Sour Diesel': 'Sour_Diesel_(Marijuana)',
    'Green Crack': 'Green_Crack_(Marijuana)',
    'Granddaddy Purple': 'Granddaddy_purple_(Marijuana)',
    'Methamphetamine': 'Methamphetamine',
    'Shrooms': 'Shrooms',
    'Cocaine': 'Cocaine'
}

# Ingredient pages
INGREDIENT_PAGES = [
    'Cuke', 'Banana', 'Paracetamol', 'Donut', 'Viagra',
    'Mouth_Wash', 'Flu_Medicine', 'Gasoline', 'Energy_Drink',
    'Mega_Bean', 'Horse_Semen', 'Battery', 'Iodine', 'Addy',
    'Chili', 'Motor_Oil', 'Phosphorus', 'Acid'
]

print("=== Fetching Drug Data ===")
drugs_data = {}
for name, page in DRUG_PAGES.items():
    print(f"\nFetching: {name}")
    wikitext = fetch_wikitext(page)
    if wikitext:
        data = extract_drug_data(wikitext, name)
        drugs_data[name] = data
        print(f"  Price: {data.get('price', 'N/A')}")
        print(f"  Recipes: {len(data.get('recipes', []))}")
    time.sleep(0.3)

print("\n=== Fetching Ingredient Data ===")
ingredients_data = {}
for page in INGREDIENT_PAGES:
    print(f"\nFetching: {page}")
    wikitext = fetch_wikitext(page)
    if wikitext:
        data = extract_ingredient_data(wikitext, page)
        ingredients_data[page] = data
        print(f"  Price: {data.get('price', 'N/A')}")
        print(f"  Effect: {data.get('effect', 'N/A')}")
    time.sleep(0.3)

# Save results
output = {
    'drugs': drugs_data,
    'ingredients': ingredients_data,
    'fetch_time': time.strftime('%Y-%m-%d %H:%M:%S')
}

with open('data/fandom/api_data.json', 'w') as f:
    json.dump(output, f, indent=2)

print(f"\n=== Summary ===")
print(f"Drugs fetched: {len(drugs_data)}")
print(f"Ingredients fetched: {len(ingredients_data)}")
print(f"Data saved to: data/fandom/api_data.json")
