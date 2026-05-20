// Schedule I Reverse Mix Finder
// Given target effects, find all mixer combinations that produce them

import { ALL_BASES, MIXERS, EFFECTS, EFFECT_REPLACEMENTS } from './game-data';

export interface FoundRecipe {
  baseName: string;
  mixers: string[];
  effects: string[];
  matchedEffects: string[];
  matchCount: number;
  targetCount: number;
  sellPrice: number;
  totalCost: number;
  profit: number;
  profitMargin: number;
}

/**
 * Check which effects can possibly be produced through mixing.
 * An effect is producible if:
 * - It's a mixer's default effect, OR
 * - It's the target of an effect replacement rule
 * - OR it's the inherent effect of the selected base product
 */
export function getProducibleEffects(baseName?: string): Set<string> {
  const mixerEffects = new Set(Object.values(MIXERS).map((m) => m.effect));
  const replacementTargets = new Set(Object.values(EFFECT_REPLACEMENTS));
  const producible = new Set([...mixerEffects, ...replacementTargets]);

  // Add inherent effects from all bases (or just the selected one)
  if (baseName) {
    const base = ALL_BASES.find((b) => b.name === baseName);
    if (base?.inherentEffect) producible.add(base.inherentEffect);
  } else {
    for (const b of ALL_BASES) {
      if (b.inherentEffect) producible.add(b.inherentEffect);
    }
  }

  return producible;
}

/**
 * Filter target effects, returning which are achievable and which are not.
 */
export function classifyTargets(
  targetEffects: string[],
  baseName: string
): { achievable: string[]; impossible: string[] } {
  const producible = getProducibleEffects(baseName);
  const achievable: string[] = [];
  const impossible: string[] = [];

  for (const t of targetEffects) {
    if (producible.has(t)) {
      achievable.push(t);
    } else {
      impossible.push(t);
    }
  }

  return { achievable, impossible };
}

// Simulate mixing: given base + mixer list, return final effects
function simulateMix(baseName: string, mixerNames: string[]): string[] {
  const base = ALL_BASES.find((b) => b.name === baseName);
  if (!base) return [];

  const effects: string[] = [];
  if (base.inherentEffect) {
    effects.push(base.inherentEffect);
  }

  for (const mixerName of mixerNames) {
    const mixer = MIXERS[mixerName];
    if (!mixer) continue;

    let replaced = false;
    for (let i = 0; i < effects.length; i++) {
      const key = `${effects[i]}+${mixerName}`;
      if (EFFECT_REPLACEMENTS[key]) {
        effects[i] = EFFECT_REPLACEMENTS[key];
        replaced = true;
        break;
      }
    }

    if (!replaced) {
      const defaultEffect = mixer.effect;
      if (!effects.includes(defaultEffect) && effects.length < 8) {
        effects.push(defaultEffect);
      }
    }
  }

  return effects.slice(0, 8);
}

// Calculate sell price from effects
function calcSellPrice(baseName: string, effects: string[]): number {
  const base = ALL_BASES.find((b) => b.name === baseName);
  if (!base) return 0;

  const totalMultiplier = effects.reduce((sum, e) => {
    return sum + (EFFECTS[e]?.multiplier || 0);
  }, 0);

  const raw = base.baseValue * (1 + totalMultiplier);
  return raw % 1 === 0.5 ? Math.floor(raw) : Math.round(raw);
}

// Calculate mixer cost
function calcMixerCost(mixerNames: string[]): number {
  return mixerNames.reduce((sum, name) => sum + (MIXERS[name]?.cost || 0), 0);
}

/**
 * Find recipes that produce the target effects.
 * Uses DFS with pruning for efficiency.
 */
export function findRecipes(
  baseName: string,
  targetEffects: string[],
  maxDepth: number = 6,
  maxResults: number = 200,
  onProgress?: (combosTested: number, matchesFound: number) => void
): FoundRecipe[] {
  // First, filter out impossible targets
  const { achievable, impossible } = classifyTargets(targetEffects, baseName);
  if (achievable.length === 0) return [];

  const mixerNames = Object.keys(MIXERS);
  const results: FoundRecipe[] = [];
  let combosTested = 0;
  let matchesFound = 0;
  const targetSet = new Set(achievable);

  function dfs(currentMixers: string[], depth: number) {
    if (depth >= maxDepth) return;
    if (results.length >= maxResults) return;

    for (const mixerName of mixerNames) {
      const nextMixers = [...currentMixers, mixerName];
      const effects = simulateMix(baseName, nextMixers);
      const effectSet = new Set(effects);

      combosTested++;

      // Check how many ACHIEVABLE target effects are matched
      let matched = 0;
      for (const t of achievable) {
        if (effectSet.has(t)) matched++;
      }

      // If all achievable targets matched, record this recipe
      if (matched === achievable.length) {
        const sellPrice = calcSellPrice(baseName, effects);
        const totalCost = calcMixerCost(nextMixers);
        const profit = sellPrice - totalCost;

        results.push({
          baseName,
          mixers: [...nextMixers],
          effects,
          matchedEffects: achievable,
          matchCount: matched,
          targetCount: achievable.length,
          sellPrice,
          totalCost,
          profit,
          profitMargin: totalCost > 0 ? Math.round((profit / totalCost) * 1000) / 10 : 0,
        });

        matchesFound++;
        continue;
      }

      // Light pruning: only skip if we truly can't add enough effects
      const remainingSlots = maxDepth - depth - 1;
      const newEffectsAvailable = nextMixers.length < 8;
      if (!newEffectsAvailable && matched < achievable.length) {
        continue; // At max effects, can't add more
      }

      dfs(nextMixers, depth + 1);

      if (combosTested % 5000 === 0 && onProgress) {
        onProgress(combosTested, matchesFound);
      }
    }
  }

  dfs([], 0);

  // Sort by profit (highest first)
  results.sort((a, b) => b.profit - a.profit);

  if (onProgress) {
    onProgress(combosTested, matchesFound);
  }

  return results;
}

/**
 * Fast search: limit to 4 mixers for quick results
 */
export function findRecipesFast(
  baseName: string,
  targetEffects: string[],
  onProgress?: (combosTested: number, matchesFound: number) => void
): FoundRecipe[] {
  return findRecipes(baseName, targetEffects, 5, 100, onProgress);
}

/**
 * Deep search: up to 6 mixers, more results
 */
export function findRecipesDeep(
  baseName: string,
  targetEffects: string[],
  onProgress?: (combosTested: number, matchesFound: number) => void
): FoundRecipe[] {
  return findRecipes(baseName, targetEffects, 7, 500, onProgress);
}
