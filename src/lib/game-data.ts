// Schedule I Game Data - Accurate values from reverse engineering
// Source: SetoKibah/Schedule-I-Calculator + community testing

export interface EffectData {
  name: string;
  multiplier: number;
  addictiveness: number;
  tier: number;
  color: string; // UI color
}

export interface MixerData {
  effect: string;
  cost: number;
  unlock: string;
  icon: string; // emoji icon
}

export interface StrainData {
  effect: string;
  seedCost: number;
  budValue: number;
  yieldRange: [number, number];
}

// Base market values for each product type
export const BASE_MARKET_VALUES: Record<string, number> = {
  Marijuana: 38,
  Methamphetamine: 70,
  Cocaine: 150,
};

// Marijuana strains
export const MARIJUANA_STRAINS: Record<string, StrainData> = {
  'OG Kush': { effect: 'Calming', seedCost: 30, budValue: 38, yieldRange: [11, 13] },
  'Sour Diesel': { effect: 'Refreshing', seedCost: 35, budValue: 40, yieldRange: [11, 13] },
  'Green Crack': { effect: 'Energizing', seedCost: 40, budValue: 43, yieldRange: [11, 13] },
  'Granddaddy Purple': { effect: 'Sedating', seedCost: 45, budValue: 44, yieldRange: [11, 13] },
};

// All mixable bases
export const ALL_BASES = [
  { name: 'OG Kush', type: 'Marijuana', baseValue: 38, inherentEffect: 'Calming' },
  { name: 'Sour Diesel', type: 'Marijuana', baseValue: 40, inherentEffect: 'Refreshing' },
  { name: 'Green Crack', type: 'Marijuana', baseValue: 43, inherentEffect: 'Energizing' },
  { name: 'Granddaddy Purple', type: 'Marijuana', baseValue: 44, inherentEffect: 'Sedating' },
  { name: 'Methamphetamine', type: 'Methamphetamine', baseValue: 70, inherentEffect: null },
  { name: 'Cocaine', type: 'Cocaine', baseValue: 150, inherentEffect: null },
];

// All mixers/ingredients
export const MIXERS: Record<string, MixerData> = {
  Cuke: { effect: 'Energizing', cost: 2, unlock: 'Immediately', icon: '🥒' },
  Banana: { effect: 'Gingeritis', cost: 2, unlock: 'Immediately', icon: '🍌' },
  Paracetamol: { effect: 'Sneaky', cost: 3, unlock: 'Immediately', icon: '💊' },
  Donut: { effect: 'Calorie-Dense', cost: 3, unlock: 'Immediately', icon: '🍩' },
  Viagra: { effect: 'Tropic Thunder', cost: 4, unlock: 'Hoodlum II', icon: '💊' },
  'Flu Medicine': { effect: 'Sedating', cost: 5, unlock: 'Hoodlum IV', icon: '💉' },
  'Mouth Wash': { effect: 'Balding', cost: 4, unlock: 'Hoodlum III', icon: '🧴' },
  Gasoline: { effect: 'Toxic', cost: 5, unlock: 'Hoodlum V', icon: '⛽' },
  'Motor Oil': { effect: 'Slippery', cost: 6, unlock: 'Peddler II', icon: '🛢️' },
  'Mega Bean': { effect: 'Foggy', cost: 7, unlock: 'Peddler II', icon: '🫘' },
  Chili: { effect: 'Spicy', cost: 7, unlock: 'Peddler IV', icon: '🌶️' },
  Battery: { effect: 'Bright-Eyed', cost: 8, unlock: 'Peddler V', icon: '🔋' },
  'Energy Drink': { effect: 'Athletic', cost: 6, unlock: 'Peddler I', icon: '⚡' },
  Iodine: { effect: 'Jennerising', cost: 8, unlock: 'Hustler I', icon: '🧪' },
  Addy: { effect: 'Thought-Provoking', cost: 9, unlock: 'Hustler II', icon: '💊' },
  'Horse Semen': { effect: 'Long Faced', cost: 9, unlock: 'Hustler III', icon: '🐴' },
};

// All effects with their data
export const EFFECTS: Record<string, EffectData> = {
  Calming: { name: 'Calming', multiplier: 0.1, addictiveness: 0.0, tier: 1, color: '#6ee7b7' },
  Paranoia: { name: 'Paranoia', multiplier: 0.12, addictiveness: 0.12, tier: 1, color: '#f87171' },
  Euphoric: { name: 'Euphoric', multiplier: 0.14, addictiveness: 0.29, tier: 1, color: '#fbbf24' },
  Munchies: { name: 'Munchies', multiplier: 0.16, addictiveness: 0.19, tier: 1, color: '#fb923c' },
  Laxative: { name: 'Laxative', multiplier: 0.18, addictiveness: 0.15, tier: 1, color: '#a78bfa' },
  Focused: { name: 'Focused', multiplier: 0.2, addictiveness: 0.31, tier: 1, color: '#60a5fa' },
  Energizing: { name: 'Energizing', multiplier: 0.22, addictiveness: 0.34, tier: 2, color: '#34d399' },
  Foggy: { name: 'Foggy', multiplier: 0.24, addictiveness: 0.27, tier: 2, color: '#94a3b8' },
  Sedating: { name: 'Sedating', multiplier: 0.26, addictiveness: 0.3, tier: 2, color: '#818cf8' },
  'Calorie-Dense': { name: 'Calorie-Dense', multiplier: 0.28, addictiveness: 0.27, tier: 2, color: '#fdba74' },
  Balding: { name: 'Balding', multiplier: 0.3, addictiveness: 0.31, tier: 2, color: '#d4d4d8' },
  'Thought-Provoking': { name: 'Thought-Provoking', multiplier: 0.32, addictiveness: 0.37, tier: 2, color: '#c084fc' },
  Slippery: { name: 'Slippery', multiplier: 0.34, addictiveness: 0.31, tier: 3, color: '#67e8f9' },
  Toxic: { name: 'Toxic', multiplier: 0.0, addictiveness: 0.38, tier: 3, color: '#84cc16' },
  Spicy: { name: 'Spicy', multiplier: 0.36, addictiveness: 0.33, tier: 3, color: '#ef4444' },
  Gingeritis: { name: 'Gingeritis', multiplier: 0.38, addictiveness: 0.44, tier: 3, color: '#f97316' },
  Sneaky: { name: 'Sneaky', multiplier: 0.4, addictiveness: 0.48, tier: 3, color: '#78716c' },
  Disorienting: { name: 'Disorienting', multiplier: 0.42, addictiveness: 0.46, tier: 3, color: '#e879f9' },
  Athletic: { name: 'Athletic', multiplier: 0.44, addictiveness: 0.49, tier: 3, color: '#22d3ee' },
  'Tropic Thunder': { name: 'Tropic Thunder', multiplier: 0.46, addictiveness: 1.0, tier: 4, color: '#facc15' },
  Glowing: { name: 'Glowing', multiplier: 0.48, addictiveness: 0.78, tier: 4, color: '#a3e635' },
  Electrifying: { name: 'Electrifying', multiplier: 0.5, addictiveness: 0.8, tier: 4, color: '#38bdf8' },
  'Long Faced': { name: 'Long Faced', multiplier: 0.52, addictiveness: 1.0, tier: 4, color: '#e2e8f0' },
  'Anti-Gravity': { name: 'Anti-Gravity', multiplier: 0.54, addictiveness: 0.86, tier: 4, color: '#c4b5fd' },
  Cyclopean: { name: 'Cyclopean', multiplier: 0.56, addictiveness: 0.88, tier: 4, color: '#f472b6' },
  Zombifying: { name: 'Zombifying', multiplier: 0.58, addictiveness: 0.99, tier: 4, color: '#86efac' },
  Shrinking: { name: 'Shrinking', multiplier: 0.6, addictiveness: 0.91, tier: 5, color: '#fde68a' },
  'Bright-Eyed': { name: 'Bright-Eyed', multiplier: 0.62, addictiveness: 0.93, tier: 5, color: '#fcd34d' },
  Explosive: { name: 'Explosive', multiplier: 0.42, addictiveness: 0.55, tier: 3, color: '#fca5a5' },
  Jennerising: { name: 'Jennerising', multiplier: 0.46, addictiveness: 0.74, tier: 4, color: '#d8b4fe' },
  Schizophrenic: { name: 'Schizophrenic', multiplier: 0.48, addictiveness: 0.8, tier: 4, color: '#fda4af' },
  'Seizure-Inducing': { name: 'Seizure-Inducing', multiplier: 0.52, addictiveness: 0.9, tier: 4, color: '#fca5a5' },
  Refreshing: { name: 'Refreshing', multiplier: 0.1, addictiveness: 0.1, tier: 1, color: '#7dd3fc' },
  Smelly: { name: 'Smelly', multiplier: 0.3, addictiveness: 0.35, tier: 2, color: '#a3a3a3' },
};

// Effect replacement rules: (existingEffect, mixer) → newEffect
export const EFFECT_REPLACEMENTS: Record<string, string> = {
  'Smelly+Banana': 'Anti-Gravity',
  'Munchies+Paracetamol': 'Anti-Gravity',
  'Calming+Banana': 'Sneaky',
  'Calming+Paracetamol': 'Slippery',
  'Paranoia+Banana': 'Zombifying',
  'Paranoia+Cuke': 'Shrinking',
  'Paranoia+Paracetamol': 'Sneaky',
  'Paranoia+Flu Medicine': 'Shrinking',
  'Paranoia+Mega Bean': 'Jennerising',
  'Paranoia+Iodine': 'Foggy',
  'Refreshing+Banana': 'Long Faced',
  'Refreshing+Flu Medicine': 'Long Faced',
  'Refreshing+Addy': 'Glowing',
  'Refreshing+Horse Semen': 'Gingeritis',
  'Energizing+Paracetamol': 'Paranoia',
  'Energizing+Banana': 'Thought-Provoking',
  'Energizing+Motor Oil': 'Slippery',
  'Energizing+Battery': 'Bright-Eyed',
  'Energizing+Addy': 'Thought-Provoking',
  'Energizing+Horse Semen': 'Long Faced',
  'Sedating+Energy Drink': 'Bright-Eyed',
  'Sedating+Flu Medicine': 'Bright-Eyed',
  'Sedating+Chili': 'Spicy',
  'Calming+Cuke': 'Energizing',
  'Calming+Energy Drink': 'Athletic',
  'Calming+Addy': 'Thought-Provoking',
  'Calming+Mouth Wash': 'Cyclopean',
  'Disorienting+Paranoia': 'Zombifying',
  'Electrifying+Athletic': 'Sneaky',
  'Electrifying+Euphoric': 'Spicy',
  'Zombifying+Battery': 'Electrifying',
  'Athletic+Energy Drink': 'Glowing',
  'Munchies+Motor Oil': 'Energizing',
  'Calorie-Dense+Donut': 'Explosive',
};

// Addictiveness for base products
export const BASE_ADDICTIVENESS: Record<string, number> = {
  'OG Kush': 0.0,
  'Sour Diesel': 0.1,
  'Green Crack': 0.34,
  'Granddaddy Purple': 0.0,
  Methamphetamine: 0.6,
  Cocaine: 0.4,
};

// Production costs
export const PRODUCTION_INFO: Record<string, { ingredientsCost: number; yield: number; unitValue: number }> = {
  Methamphetamine: { ingredientsCost: 140, yield: 10, unitValue: 70 },
  Cocaine: { ingredientsCost: 245, yield: 10, unitValue: 150 },
};
