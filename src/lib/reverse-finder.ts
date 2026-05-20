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
  const mixerNames = Object.keys(MIXERS);
  const results: FoundRecipe[] = [];
  let combosTested = 0;
  let matchesFound = 0;
  const targetSet = new Set(targetEffects);

  // DFS: try each mixer at each position
  function dfs(currentMixers: string[], depth: number) {
    if (depth >= maxDepth) return;
    if (results.length >= maxResults) return;

    for (const mixerName of mixerNames) {
      // Allow repeats (some recipes need repeated ingredients)
      const nextMixers = [...currentMixers, mixerName];
      const effects = simulateMix(baseName, nextMixers);
      const effectSet = new Set(effects);

      combosTested++;

      // Check how many target effects are matched
      let matched = 0;
      for (const t of targetEffects) {
        if (effectSet.has(t)) matched++;
      }

      // If all targets matched, record this recipe
      if (matched === targetEffects.length) {
        const sellPrice = calcSellPrice(baseName, effects);
        const totalCost = calcMixerCost(nextMixers);
        const profit = sellPrice - totalCost;

        results.push({
          baseName,
          mixers: [...nextMixers],
          effects,
          matchedEffects: targetEffects,
          matchCount: matched,
          targetCount: targetEffects.length,
          sellPrice,
          totalCost,
          profit,
          profitMargin: totalCost > 0 ? Math.round((profit / totalCost) * 1000) / 10 : 0,
        });

        matchesFound++;

        // Don't explore deeper if we already matched all targets
        // (adding more mixers would only increase cost)
        continue;
      }

      // Pruning: if remaining depth can't possibly add enough new effects, skip
      const remainingSlots = maxDepth - depth - 1;
      const unmatchedTargets = targetEffects.length - matched;
      // Each new mixer can add at most 1 new effect (optimistic)
      if (unmatchedTargets > remainingSlots + 1) {
        continue; // Can't possibly match all targets
      }

      // Continue searching deeper
      dfs(nextMixers, depth + 1);

      // Report progress every 5000 combos
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
  return findRecipes(baseName, targetEffects, 4, 100, onProgress);
}

/**
 * Deep search: up to 8 mixers, more results
 */
export function findRecipesDeep(
  baseName: string,
  targetEffects: string[],
  onProgress?: (combosTested: number, matchesFound: number) => void
): FoundRecipe[] {
  return findRecipes(baseName, targetEffects, 6, 500, onProgress);
}
