'use client';

import { useState, useCallback, useRef } from 'react';
import { ALL_BASES, MIXERS, EFFECTS } from '@/lib/game-data';
import { calculateMix, type MixResult } from '@/lib/mix-calculator';
import { findRecipesFast, findRecipesDeep, type FoundRecipe } from '@/lib/reverse-finder';

const MAX_ADDITIVES = 8;
type Mode = 'ingredient' | 'effect';

export default function CalculatorPage() {
  const [mode, setMode] = useState<Mode>('ingredient');

  // Mix by Ingredient state
  const [baseProduct, setBaseProduct] = useState('Green Crack');
  const [additives, setAdditives] = useState<string[]>([]);
  const [result, setResult] = useState<MixResult | null>(null);
  const [activeTab, setActiveTab] = useState<'base' | 'additives' | 'result'>('base');

  // Find by Effect state
  const [targetEffects, setTargetEffects] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<FoundRecipe[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchStats, setSearchStats] = useState({ combos: 0, elapsed: 0, matches: 0 });
  const [searchBase, setSearchBase] = useState('OG Kush');
  const searchAbort = useRef(false);

  // ===== Mix by Ingredient logic =====
  const recalc = useCallback((base: string, mixers: string[]) => {
    if (mixers.length > 0) {
      setResult(calculateMix(base, mixers));
    } else {
      const baseInfo = ALL_BASES.find((b) => b.name === base);
      setResult({
        effects: baseInfo?.inherentEffect ? [baseInfo.inherentEffect] : [],
        baseCost: 0, mixerCost: 0, totalCost: 0,
        sellPrice: baseInfo?.baseValue || 0,
        profit: 0, profitMargin: 0, totalMultiplier: 0, addictiveness: 0,
        changes: [],
      });
    }
  }, []);

  if (!result) recalc(baseProduct, additives);

  const handleBaseChange = (b: string) => { setBaseProduct(b); recalc(b, additives); };
  const handleAddMixer = (m: string) => {
    if (additives.length >= MAX_ADDITIVES) return;
    const n = [...additives, m]; setAdditives(n); recalc(baseProduct, n);
  };
  const handleRemoveMixer = (i: number) => {
    const n = additives.filter((_, idx) => idx !== i); setAdditives(n); recalc(baseProduct, n);
  };
  const handleClearAll = () => { setAdditives([]); recalc(baseProduct, []); };
  const handleMoveMixer = (from: number, to: number) => {
    if (to < 0 || to >= additives.length) return;
    const n = [...additives]; const [item] = n.splice(from, 1); n.splice(to, 0, item);
    setAdditives(n); recalc(baseProduct, n);
  };

  // ===== Find by Effect logic =====
  const handleToggleTarget = (effect: string) => {
    setTargetEffects((prev) =>
      prev.includes(effect) ? prev.filter((e) => e !== effect) : [...prev, effect]
    );
  };

  const handleSearch = (deep: boolean) => {
    if (targetEffects.length === 0) return;
    setIsSearching(true);
    setSearchResults([]);
    setSearchStats({ combos: 0, elapsed: 0, matches: 0 });
    searchAbort.current = false;

    const startTime = performance.now();

    // Use setTimeout to avoid blocking the UI
    setTimeout(() => {
      const fn = deep ? findRecipesDeep : findRecipesFast;
      const results = fn(searchBase, targetEffects, (combos, matches) => {
        setSearchStats({ combos, matches, elapsed: Math.round((performance.now() - startTime) / 1000) });
      });

      setSearchResults(results);
      setSearchStats({
        combos: results.length > 0 ? results.reduce((s, r) => s + r.mixers.length, 0) * 1000 : 0,
        matches: results.length,
        elapsed: Math.round((performance.now() - startTime) / 1000),
      });
      setIsSearching(false);
    }, 50);
  };

  const base = ALL_BASES.find((b) => b.name === baseProduct);
  const availableMixers = Object.entries(MIXERS).filter(([name]) => !additives.includes(name));

  // All unique effect names for target selector
  const allEffectNames = Object.keys(EFFECTS).sort((a, b) => {
    const ta = EFFECTS[a].tier, tb = EFFECTS[b].tier;
    return ta !== tb ? ta - tb : a.localeCompare(b);
  });

  return (
    <div style={{ minHeight: '100vh', background: '#0f0a1a', color: '#e2e8f0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 28 }}>🧪</span>
            <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Mix Calculator</h1>
          </div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, maxWidth: 700 }}>
            Experiment with combinations to discover the best Schedule 1 mixes.
            Calculate real-time markup or find mixes by desired effects.
          </p>
        </div>

        {/* Mode Switcher */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {([
            { key: 'ingredient' as Mode, icon: '🧪', label: 'Mix by Ingredient' },
            { key: 'effect' as Mode, icon: '🔍', label: 'Find by Effect' },
          ]).map((m) => (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '12px 20px', borderRadius: 10,
                border: mode === m.key ? '1px solid #6366f1' : '1px solid #2d2545',
                background: mode === m.key ? '#1e1535' : 'transparent',
                color: mode === m.key ? '#e2e8f0' : '#64748b',
                cursor: 'pointer', fontSize: 14, fontWeight: 600,
              }}
            >
              <span>{m.icon}</span> {m.label}
            </button>
          ))}
        </div>

        {/* ===== MODE: MIX BY INGREDIENT ===== */}
        {mode === 'ingredient' && (
          <div style={{ display: 'flex', gap: 20 }}>
            {/* Left Panel */}
            <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Base Product */}
              <div style={{ background: '#1a1127', borderRadius: 12, border: '1px solid #2d2545', padding: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Base Product <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select value={baseProduct} onChange={(e) => handleBaseChange(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #2d2545', background: '#0f0a1a', color: '#e2e8f0', fontSize: 15, cursor: 'pointer', outline: 'none' }}>
                  {ALL_BASES.map((b) => (
                    <option key={b.name} value={b.name}>
                      {b.type === 'Marijuana' ? '🌿' : b.type === 'Methamphetamine' ? '💎' : '❄️'} {b.name} (${b.baseValue})
                    </option>
                  ))}
                </select>
              </div>

              {/* Additives */}
              <div style={{ background: '#1a1127', borderRadius: 12, border: '1px solid #2d2545', padding: 20, flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>Additives</span>
                    <span style={{ fontSize: 12, color: '#475569', marginLeft: 8 }}>Drag to reorder</span>
                  </div>
                  {additives.length > 0 && (
                    <button onClick={handleClearAll}
                      style={{ background: 'transparent', border: '1px solid #7f1d1d', color: '#f87171', padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>
                      Clear All
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                  {additives.map((mixerName, index) => {
                    const mixer = MIXERS[mixerName];
                    return (
                      <div key={`${mixerName}-${index}`}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, border: '1px solid #2d2545', background: '#130e1f' }}>
                        <span style={{ color: '#475569', cursor: 'grab', fontSize: 14 }}>⠿</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                          <button onClick={() => handleMoveMixer(index, index - 1)} disabled={index === 0}
                            style={{ background: 'none', border: 'none', color: index === 0 ? '#2d2545' : '#64748b', cursor: index === 0 ? 'default' : 'pointer', fontSize: 10, padding: 0, lineHeight: 1 }}>▲</button>
                          <button onClick={() => handleMoveMixer(index, index + 1)} disabled={index === additives.length - 1}
                            style={{ background: 'none', border: 'none', color: index === additives.length - 1 ? '#2d2545' : '#64748b', cursor: index === additives.length - 1 ? 'default' : 'pointer', fontSize: 10, padding: 0, lineHeight: 1 }}>▼</button>
                        </div>
                        <span style={{ fontSize: 18 }}>{mixer?.icon || '📦'}</span>
                        <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{mixerName}</span>
                        <span style={{ fontSize: 12, color: '#64748b' }}>${mixer?.cost}</span>
                        <button onClick={() => handleRemoveMixer(index)}
                          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 16, padding: '0 4px' }}>×</button>
                      </div>
                    );
                  })}
                </div>

                {additives.length < MAX_ADDITIVES && (
                  <select value="" onChange={(e) => { if (e.target.value) handleAddMixer(e.target.value); }}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #2d2545', background: '#0f0a1a', color: '#64748b', fontSize: 14, cursor: 'pointer', outline: 'none' }}>
                    <option value="">Select additive {additives.length + 1}...</option>
                    {availableMixers.map(([name, mixer]) => (
                      <option key={name} value={name}>{mixer.icon} {name} — ${mixer.cost} ({mixer.effect})</option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Right Panel: Results */}
            <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Effects */}
              <div style={{ background: '#1a1127', borderRadius: 12, border: '1px solid #2d2545', padding: 20 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 14 }}>
                  Resulting Effects
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {result?.effects.map((effectName) => {
                    const effect = EFFECTS[effectName];
                    if (!effect) return null;
                    return (
                      <div key={effectName} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, border: `1px solid ${effect.color}33`, background: `${effect.color}11` }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: effect.color }}>{effectName}</span>
                        <span style={{ fontSize: 12, color: '#4ade80' }}>+{(effect.multiplier * 100).toFixed(0)}%</span>
                      </div>
                    );
                  })}
                  {(!result || result.effects.length === 0) && <span style={{ color: '#475569', fontSize: 13 }}>No effects yet</span>}
                </div>
              </div>

              {/* Cost / Price */}
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  { label: 'Cost', value: `$${(result?.totalCost || 0).toFixed(2)}`, color: '#f1f5f9' },
                  { label: 'Sell Price', value: `$${(result?.sellPrice || 0).toFixed(2)}`, color: '#4ade80' },
                ].map((item) => (
                  <div key={item.label} style={{ flex: 1, background: '#1a1127', borderRadius: 12, border: '1px solid #2d2545', padding: 16, textAlign: 'center' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>{item.label}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: item.color }}>{item.value}</div>
                    <div style={{ fontSize: 11, color: '#475569' }}>per unit</div>
                  </div>
                ))}
              </div>

              {/* Profit */}
              <div style={{ background: '#1a1127', borderRadius: 12, border: '1px solid #2d2545', padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                  <span style={{ fontSize: 13, color: '#94a3b8' }}>Profit per unit</span>
                  <span style={{ fontSize: 11, color: '#475569' }}>single unit calculation</span>
                </div>
                <div style={{ background: '#064e3b22', border: '1px solid #065f4644', borderRadius: 10, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 28, fontWeight: 700, color: '#4ade80' }}>+${(result?.profit || 0).toFixed(2)}</span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 12, color: '#64748b' }}>Margin: </span>
                    <span style={{ fontSize: 20, fontWeight: 700, color: '#4ade80' }}>{(result?.profitMargin || 0).toFixed(1)}%</span>
                  </div>
                </div>
                <div style={{ marginTop: 10, fontSize: 12, color: '#64748b' }}>
                  Multiplier: ×{(1 + (result?.totalMultiplier || 0)).toFixed(2)} | Addictiveness: {((result?.addictiveness || 0) * 100).toFixed(0)}%
                </div>
              </div>

              {/* Breakdown */}
              {result && result.changes.length > 0 && (
                <div style={{ background: '#1a1127', borderRadius: 12, border: '1px solid #2d2545', padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>Mix Breakdown</span>
                    <span style={{ fontSize: 12, color: '#4ade80', background: '#064e3b33', border: '1px solid #065f4644', padding: '2px 10px', borderRadius: 10 }}>
                      {result.changes.filter((c) => c.action === 'replaced').length} Changes
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {result.changes.map((change, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#94a3b8' }}>
                        <span style={{ color: '#475569', width: 20, textAlign: 'right' }}>{change.step}</span>
                        <span style={{ color: '#64748b' }}>→</span>
                        <span style={{ fontWeight: 500, color: '#e2e8f0' }}>{change.mixer}</span>
                        {change.action === 'replaced' && (<><span style={{ color: '#f87171', textDecoration: 'line-through' }}>{change.from}</span><span style={{ color: '#64748b' }}>→</span><span style={{ color: '#4ade80' }}>{change.to}</span></>)}
                        {change.action === 'added' && <span style={{ color: '#4ade80' }}>+ {change.to}</span>}
                        {change.action === 'duplicate_ignored' && <span style={{ color: '#64748b', fontStyle: 'italic' }}>already active</span>}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #2d2545', fontSize: 13, color: '#64748b' }}>
                    {baseProduct} + {additives.length} additives = <span style={{ color: '#4ade80', fontWeight: 600 }}>+${(result?.profit || 0).toFixed(2)} profit</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== MODE: FIND BY EFFECT ===== */}
        {mode === 'effect' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Target Effects Selector */}
            <div style={{ background: '#1a1127', borderRadius: 12, border: '1px solid #2d2545', padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  🎯 Target Effects
                </span>
                {targetEffects.length > 0 && (
                  <button onClick={() => setTargetEffects([])}
                    style={{ background: 'transparent', border: '1px solid #7f1d1d', color: '#f87171', padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>
                    Clear All
                  </button>
                )}
              </div>

              {/* Grouped by tier */}
              {[1, 2, 3, 4, 5].map((tier) => (
                <div key={tier} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: '#475569', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Tier {tier}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {allEffectNames.filter((e) => EFFECTS[e].tier === tier).map((effectName) => {
                      const effect = EFFECTS[effectName];
                      const selected = targetEffects.includes(effectName);
                      return (
                        <button key={effectName} onClick={() => handleToggleTarget(effectName)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 8,
                            border: selected ? `1px solid ${effect.color}` : '1px solid #2d2545',
                            background: selected ? `${effect.color}22` : 'transparent',
                            color: selected ? effect.color : '#64748b',
                            cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.15s',
                          }}>
                          {selected && <span style={{ fontSize: 11 }}>✓</span>}
                          {effectName}
                          <span style={{ fontSize: 11, opacity: 0.6 }}>+{(effect.multiplier * 100).toFixed(0)}%</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Base + Search Controls */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ background: '#1a1127', borderRadius: 12, border: '1px solid #2d2545', padding: '12px 16px', flex: 1 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 6 }}>
                  Base Product
                </label>
                <select value={searchBase} onChange={(e) => setSearchBase(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #2d2545', background: '#0f0a1a', color: '#e2e8f0', fontSize: 14, cursor: 'pointer', outline: 'none' }}>
                  {ALL_BASES.map((b) => (
                    <option key={b.name} value={b.name}>
                      {b.type === 'Marijuana' ? '🌿' : b.type === 'Methamphetamine' ? '💎' : '❄️'} {b.name} (${b.baseValue})
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={() => handleSearch(false)} disabled={targetEffects.length === 0 || isSearching}
                style={{
                  padding: '14px 24px', borderRadius: 10, border: '1px solid #6366f1',
                  background: targetEffects.length === 0 ? '#2d2545' : '#6366f1',
                  color: targetEffects.length === 0 ? '#475569' : '#fff',
                  cursor: targetEffects.length === 0 ? 'default' : 'pointer',
                  fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap',
                }}>
                {isSearching ? '⏳ Searching...' : '⚡ Quick Search'}
              </button>
              <button onClick={() => handleSearch(true)} disabled={targetEffects.length === 0 || isSearching}
                style={{
                  padding: '14px 24px', borderRadius: 10,
                  border: '1px solid #4ade80',
                  background: targetEffects.length === 0 ? '#2d2545' : 'transparent',
                  color: targetEffects.length === 0 ? '#475569' : '#4ade80',
                  cursor: targetEffects.length === 0 ? 'default' : 'pointer',
                  fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap',
                }}>
                🔬 Deep Search
              </button>
            </div>

            {/* Search Progress */}
            {isSearching && (
              <div style={{ background: '#1a1127', borderRadius: 12, border: '1px solid #2d2545', padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 48, height: 48, border: '3px solid #2d2545', borderTop: '3px solid #6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>Searching combinations...</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>
                    {searchStats.combos.toLocaleString()} combos tested | {searchStats.matches} matches found | {searchStats.elapsed}s
                  </div>
                </div>
              </div>
            )}

            {/* Search Results */}
            {!isSearching && searchResults.length > 0 && (
              <div style={{ background: '#1a1127', borderRadius: 12, border: '1px solid #2d2545', padding: 20 }}>
                {/* Stats bar */}
                <div style={{ display: 'flex', gap: 20, marginBottom: 16, padding: '10px 16px', background: '#130e1f', borderRadius: 8, border: '1px solid #2d2545' }}>
                  {[
                    { label: 'MATCHES', value: searchResults.length.toLocaleString(), color: '#a78bfa' },
                    { label: 'ELAPSED', value: `${searchStats.elapsed}s`, color: '#f1f5f9' },
                  ].map((s) => (
                    <div key={s.label}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</div>
                    </div>
                  ))}
                  <div style={{ flex: 1 }} />
                  <div style={{ fontSize: 12, color: '#64748b', alignSelf: 'center' }}>
                    Targets: {targetEffects.map((t) => (
                      <span key={t} style={{ color: EFFECTS[t]?.color || '#fff', marginLeft: 6 }}>✓ {t}</span>
                    ))}
                  </div>
                </div>

                {/* Results list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 500, overflowY: 'auto' }}>
                  {searchResults.slice(0, 50).map((recipe, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 8, border: '1px solid #2d2545', background: '#130e1f' }}>
                      {/* Rank */}
                      <span style={{ fontSize: 12, fontWeight: 700, color: i < 3 ? '#fbbf24' : '#475569', width: 24, textAlign: 'center' }}>
                        #{i + 1}
                      </span>

                      {/* Mixers */}
                      <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {recipe.mixers.map((m, j) => (
                          <span key={j} style={{ fontSize: 12, padding: '3px 8px', borderRadius: 6, background: '#2d2545', color: '#e2e8f0' }}>
                            {MIXERS[m]?.icon} {m}
                          </span>
                        ))}
                      </div>

                      {/* Effects */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, maxWidth: 250 }}>
                        {recipe.effects.map((e) => (
                          <span key={e} style={{
                            fontSize: 11, padding: '2px 6px', borderRadius: 4,
                            color: targetEffects.includes(e) ? '#4ade80' : '#64748b',
                            border: targetEffects.includes(e) ? '1px solid #4ade8033' : '1px solid #2d2545',
                          }}>
                            {e}
                          </span>
                        ))}
                      </div>

                      {/* Profit */}
                      <div style={{ textAlign: 'right', minWidth: 80 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: recipe.profit > 0 ? '#4ade80' : '#f87171' }}>
                          +${recipe.profit}
                        </div>
                        <div style={{ fontSize: 11, color: '#64748b' }}>
                          ${recipe.sellPrice} - ${recipe.totalCost} cost
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {searchResults.length > 50 && (
                  <div style={{ marginTop: 12, textAlign: 'center', fontSize: 12, color: '#64748b' }}>
                    Showing top 50 of {searchResults.length} results
                  </div>
                )}
              </div>
            )}

            {/* No results */}
            {!isSearching && searchResults.length === 0 && targetEffects.length > 0 && searchStats.elapsed > 0 && (
              <div style={{ background: '#1a1127', borderRadius: 12, border: '1px solid #2d2545', padding: 40, textAlign: 'center' }}>
                <span style={{ fontSize: 28 }}>😕</span>
                <p style={{ color: '#94a3b8', fontSize: 14, marginTop: 12 }}>No recipes found for these target effects. Try fewer targets or a different base product.</p>
              </div>
            )}
          </div>
        )}

        {/* Lab Notes */}
        <div style={{ marginTop: 24, background: '#1a1127', borderRadius: 12, border: '1px solid #2d2545', padding: 16, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 18 }}>💡</span>
          <p style={{ margin: 0, fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
            <strong style={{ color: '#e2e8f0' }}>Lab Notes:</strong>{' '}
            {mode === 'ingredient'
              ? 'Mix order matters! The same ingredients in different orders can produce different effects. Effects are capped at 8 per product.'
              : 'Quick Search tests up to 4-mixer combinations. Deep Search goes up to 6 mixers and may find cheaper or more profitable recipes. Results are sorted by profit.'}
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
