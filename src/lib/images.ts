// Image mapping for wiki items
export const imageMap: Record<string, string> = {
  // Drugs
  'og-kush': '/images/drugs/og-kush.png',
  'sour-diesel': '/images/drugs/sour-diesel.png',
  'green-crack': '/images/drugs/green-crack.png',
  'granddaddy-purple': '/images/drugs/granddaddy-purple.png',
  'methamphetamine': '/images/drugs/methamphetamine.png',
  'shrooms': '/images/drugs/shrooms.png',
  'cocaine': '/images/drugs/cocaine.png',
  
  // Ingredients
  'cuke': '/images/ingredients/cuke.png',
  'banana': '/images/ingredients/banana.png',
  'paracetamol': '/images/ingredients/paracetamol.png',
  'donut': '/images/ingredients/donut.png',
  'viagor': '/images/ingredients/viagor.png',
  'viagra': '/images/ingredients/viagor.png',
  'mouth-wash': '/images/ingredients/mouth-wash.png',
  'flu-medicine': '/images/ingredients/flu-medicine.png',
  'gasoline': '/images/ingredients/gasoline.png',
  'energy-drink': '/images/ingredients/energy-drink.png',
  'mega-bean': '/images/ingredients/mega-bean.png',
  'horse-semen': '/images/ingredients/horse-semen.png',
  'battery': '/images/ingredients/battery.png',
  'iodine': '/images/ingredients/iodine.png',
  'addy': '/images/ingredients/addy.png',
  'chili': '/images/ingredients/chili.png',
  'motor-oil': '/images/ingredients/motor-oil.png',
  'phosphorus': '/images/ingredients/phosphorus.png',
  'acid': '/images/ingredients/acid.png',
  
  // Properties
  'sweatshop': '/images/properties/sweatshop.jpg',
  'bungalow': '/images/properties/bungalow.png',
  'barn': '/images/properties/barn.png',
  'docks-warehouse': '/images/properties/docks-warehouse.jpeg',
  'storage-unit': '/images/properties/storage-unit.png',
  'motel': '/images/properties/motel.jpg',
};

export function getImage(slug: string): string | undefined {
  return imageMap[slug];
}
