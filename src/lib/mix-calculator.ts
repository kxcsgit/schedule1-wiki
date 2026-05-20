// Schedule I Mix Calculator - Core Algorithm
import {
  ALL_BASES,
  MIXERS,
  EFFECTS,
  EFFECT_REPLACEMENTS,
  MARIJUANA_STRAINS,
  BASE_ADDICTIVENESS,
  PRODUCTION_INFO,
  type EffectData,
} from './game-data';

export interface MixResult {
  effects: string[];
  baseCost: number;
  mixerCost: number;
  totalCost: number;
  sellPrice: number;
  profit: number;
  profitMargin: number;
  totalMultiplier: number;
  addictiveness: number;
  changes: { step: number; mixer: string; action: string; from?: string; to?: string }[];
}

/**
 * Calculate the effects from mixing a base product with a list of mixers.
 * This uses the game's replacement rules - order matters!
 */
export function calculateEffects(baseName: string, mixerNames: string[]): string[] {
  const base = ALL_BASES.find((b) => b.name === baseName);
  if (!base) return [];

  // Start with the inherent effect of the base product
  const effects: string[] = [];
  if (base.inherentEffect) {
    effects.push(base.inherentEffect);
  }

  // Process each mixer in order
  for (const mixerName of mixerNames) {
    const mixer = MIXERS[mixerName];
    if (!mixer) continue;

    // Check if this mixer replaces any existing effect
    let replaced = false;
    for (let i = 0; i < effects.length; i++) {
      const key = `${effects[i]}+${mixerName}`;
      if (EFFECT_REPLACEMENTS[key]) {
        effects[i] = EFFECT_REPLACEMENTS[key];
        replaced = true;
        break;
      }
    }

    // If no replacement, add the mixer's default effect
    if (!replaced) {
      const defaultEffect = mixer.effect;
      if (!effects.includes(defaultEffect) && effects.length < 8) {
        effects.push(defaultEffect);
      }
    }
  }

  return effects.slice(0, 8);
}

/**
 * Calculate the full mix result including cost, price, profit, etc.
 */
export function calculateMix(baseName: string, mixerNames: string[]): MixResult {
  const base = ALL_BASES.find((b) => b.name === baseName);
  if (!base) {
    return {
      effects: [],
      baseCost: 0,
      mixerCost: 0,
      totalCost: 0,
      sellPrice: 0,
      profit: 0,
      profitMargin: 0,
      totalMultiplier: 0,
      addictiveness: 0,
      changes: [],
    };
  }

  // Track changes step by step
  const changes: MixResult['changes'] = [];
  const effects: string[] = [];
  if (base.inherentEffect) {
    effects.push(base.inherentEffect);
  }

  for (let i = 0; i < mixerNames.length; i++) {
    const mixerName = mixerNames[i];
    const mixer = MIXERS[mixerName];
    if (!mixer) continue;

    let replaced = false;
    for (let j = 0; j < effects.length; j++) {
      const key = `${effects[j]}+${mixerName}`;
      if (EFFECT_REPLACEMENTS[key]) {
        const from = effects[j];
        const to = EFFECT_REPLACEMENTS[key];
        effects[j] = to;
        changes.push({ step: i + 1, mixer: mixerName, action: 'replaced', from, to });
        replaced = true;
        break;
      }
    }

    if (!replaced) {
      const defaultEffect = mixer.effect;
      if (!effects.includes(defaultEffect) && effects.length < 8) {
        effects.push(defaultEffect);
        changes.push({ step: i + 1, mixer: mixerName, action: 'added', to: defaultEffect });
      } else if (effects.includes(defaultEffect)) {
        changes.push({ step: i + 1, mixer: mixerName, action: 'duplicate_ignored' });
      } else {
        changes.push({ step: i + 1, mixer: mixerName, action: 'max_effects_reached' });
      }
    }
  }

  // Calculate costs
  const mixerCost = mixerNames.reduce((sum, name) => sum + (MIXERS[name]?.cost || 0), 0);

  let baseCost = 0;
  if (baseName in MARIJUANA_STRAINS) {
    const strain = MARIJUANA_STRAINS[baseName];
    const avgYield = (strain.yieldRange[0] + strain.yieldRange[1]) / 2;
    baseCost = strain.seedCost / avgYield;
  } else if (baseName in PRODUCTION_INFO) {
    const info = PRODUCTION_INFO[baseName];
    baseCost = info.ingredientsCost / info.yield;
  }

  const totalCost = Math.round(baseCost + mixerCost);

  // Calculate sell price
  const totalMultiplier = effects.reduce((sum, effect) => {
    return sum + (EFFECTS[effect]?.multiplier || 0);
  }, 0);

  const rawPrice = base.baseValue * (1 + totalMultiplier);
  const sellPrice = rawPrice % 1 === 0.5 ? Math.floor(rawPrice) : Math.round(rawPrice);

  const profit = sellPrice - totalCost;
  const profitMargin = totalCost > 0 ? (profit / totalCost) * 100 : 0;

  // Calculate addictiveness
  const baseAddict = BASE_ADDICTIVENESS[baseName] || 0;
  const effectAddict = effects.reduce((sum, effect) => {
    return sum + (EFFECTS[effect]?.addictiveness || 0);
  }, 0);
  const addictiveness = Math.min(baseAddict + effectAddict, 1.0);

  return {
    effects,
    baseCost: Math.round(baseCost * 100) / 100,
    mixerCost,
    totalCost,
    sellPrice,
    profit,
    profitMargin: Math.round(profitMargin * 10) / 10,
    totalMultiplier: Math.round(totalMultiplier * 100) / 100,
    addictiveness: Math.round(addictiveness * 100) / 100,
    changes,
  };
}

/**
 * Get effect data with color info
 */
export function getEffectInfo(effectName: string): EffectData | null {
  return EFFECTS[effectName] || null;
}
