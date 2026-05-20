'use client';

import { useState, useCallback } from 'react';
import { ALL_BASES, MIXERS, EFFECTS } from '@/lib/game-data';
import { calculateMix, type MixResult } from '@/lib/mix-calculator';

const MAX_ADDITIVES = 8;

export default function CalculatorPage() {
  const [baseProduct, setBaseProduct] = useState('Green Crack');
  const [additives, setAdditives] = useState<string[]>([]);
  const [result, setResult] = useState<MixResult | null>(null);
  const [activeTab, setActiveTab] = useState<'base' | 'additives' | 'result'>('base');
  const [effectFilter, setEffectFilter] = useState<'all' | 'matched'>('all');

  // Recalculate whenever base or additives change
  const recalc = useCallback(
    (base: string, mixers: string[]) => {
      if (mixers.length > 0) {
        const r = calculateMix(base, mixers);
        setResult(r);
      } else {
        const baseInfo = ALL_BASES.find((b) => b.name === base);
        setResult({
          effects: baseInfo?.inherentEffect ? [baseInfo.inherentEffect] : [],
          baseCost: 0,
          mixerCost: 0,
          totalCost: 0,
          sellPrice: baseInfo?.baseValue || 0,
          profit: 0,
          profitMargin: 0,
          totalMultiplier: 0,
          addictiveness: 0,
          changes: [],
        });
      }
    },
    []
  );

  // Initialize result on first render
  if (!result) {
    recalc(baseProduct, additives);
  }

  const handleBaseChange = (newBase: string) => {
    setBaseProduct(newBase);
    recalc(newBase, additives);
  };

  const handleAddMixer = (mixerName: string) => {
    if (additives.length >= MAX_ADDITIVES) return;
    const newAdditives = [...additives, mixerName];
    setAdditives(newAdditives);
    recalc(baseProduct, newAdditives);
  };

  const handleRemoveMixer = (index: number) => {
    const newAdditives = additives.filter((_, i) => i !== index);
    setAdditives(newAdditives);
    recalc(baseProduct, newAdditives);
  };

  const handleClearAll = () => {
    setAdditives([]);
    recalc(baseProduct, []);
  };

  const handleMoveMixer = (from: number, to: number) => {
    if (to < 0 || to >= additives.length) return;
    const newAdditives = [...additives];
    const [item] = newAdditives.splice(from, 1);
    newAdditives.splice(to, 0, item);
    setAdditives(newAdditives);
    recalc(baseProduct, newAdditives);
  };

  const base = ALL_BASES.find((b) => b.name === baseProduct);
  const availableMixers = Object.entries(MIXERS).filter(
    ([name]) => !additives.includes(name)
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0f0a1a', color: '#e2e8f0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 28 }}>🧪</span>
            <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: '#f1f5f9' }}>
              Mix Calculator
            </h1>
          </div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, maxWidth: 700 }}>
            Experiment with different combinations of base products and ingredients to discover
            the best Schedule 1 mixes. Calculate real-time markup and find the exact mix your
            customers are looking for — all without wasting valuable inventory.
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {(['base', 'additives', 'result'] as const).map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 16px',
                borderRadius: 8,
                border: activeTab === tab ? '1px solid #6366f1' : '1px solid #2d2545',
                background: activeTab === tab ? '#1e1535' : 'transparent',
                color: activeTab === tab ? '#e2e8f0' : '#64748b',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500,
                transition: 'all 0.15s',
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: activeTab === tab ? '#6366f1' : '#2d2545',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 600,
                  color: activeTab === tab ? '#fff' : '#64748b',
                }}
              >
                {i + 1}
              </span>
              {tab === 'base' ? 'Base' : tab === 'additives' ? 'Additives' : 'Result'}
              {tab === 'base' && base && (
                <span style={{ fontSize: 12, color: '#64748b', marginLeft: 4 }}>
                  {base.name}
                </span>
              )}
              {tab === 'additives' && additives.length > 0 && (
                <span
                  style={{
                    fontSize: 12,
                    background: '#2d2545',
                    padding: '2px 8px',
                    borderRadius: 10,
                    color: '#94a3b8',
                  }}
                >
                  {additives.length}
                </span>
              )}
              {tab === 'result' && result && result.profit > 0 && (
                <span style={{ fontSize: 12, color: '#4ade80', marginLeft: 4 }}>
                  +${result.profit.toFixed(0)}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ display: 'flex', gap: 20 }}>
          {/* Left Panel: Base + Additives */}
          <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Base Product */}
            <div
              style={{
                background: '#1a1127',
                borderRadius: 12,
                border: '1px solid #2d2545',
                padding: 20,
              }}
            >
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#94a3b8',
                  marginBottom: 8,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                Base Product <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select
                value={baseProduct}
                onChange={(e) => handleBaseChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: '1px solid #2d2545',
                  background: '#0f0a1a',
                  color: '#e2e8f0',
                  fontSize: 15,
                  cursor: 'pointer',
                  outline: 'none',
                  appearance: 'none' as const,
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2394a3b8'%3E%3Cpath d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                }}
              >
                {ALL_BASES.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.type === 'Marijuana' ? '🌿' : b.type === 'Methamphetamine' ? '💎' : '❄️'}{' '}
                    {b.name} (${b.baseValue})
                  </option>
                ))}
              </select>
            </div>

            {/* Additives */}
            <div
              style={{
                background: '#1a1127',
                borderRadius: 12,
                border: '1px solid #2d2545',
                padding: 20,
                flex: 1,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#94a3b8',
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    Additives
                  </span>
                  <span style={{ fontSize: 12, color: '#475569', marginLeft: 8 }}>
                    Drag to reorder
                  </span>
                </div>
                {additives.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    style={{
                      background: 'transparent',
                      border: '1px solid #7f1d1d',
                      color: '#f87171',
                      padding: '4px 12px',
                      borderRadius: 6,
                      fontSize: 12,
                      cursor: 'pointer',
                    }}
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Additive list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                {additives.map((mixerName, index) => {
                  const mixer = MIXERS[mixerName];
                  return (
                    <div
                      key={`${mixerName}-${index}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: '1px solid #2d2545',
                        background: '#130e1f',
                      }}
                    >
                      {/* Drag handle */}
                      <div style={{ color: '#475569', cursor: 'grab', fontSize: 14, lineHeight: 1 }}>
                        ⠿
                      </div>
                      {/* Up/Down buttons */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                        <button
                          onClick={() => handleMoveMixer(index, index - 1)}
                          disabled={index === 0}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: index === 0 ? '#2d2545' : '#64748b',
                            cursor: index === 0 ? 'default' : 'pointer',
                            fontSize: 10,
                            padding: 0,
                            lineHeight: 1,
                          }}
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => handleMoveMixer(index, index + 1)}
                          disabled={index === additives.length - 1}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: index === additives.length - 1 ? '#2d2545' : '#64748b',
                            cursor: index === additives.length - 1 ? 'default' : 'pointer',
                            fontSize: 10,
                            padding: 0,
                            lineHeight: 1,
                          }}
                        >
                          ▼
                        </button>
                      </div>
                      <span style={{ fontSize: 18 }}>{mixer?.icon || '📦'}</span>
                      <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{mixerName}</span>
                      <span style={{ fontSize: 12, color: '#64748b' }}>${mixer?.cost}</span>
                      <button
                        onClick={() => handleRemoveMixer(index)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#64748b',
                          cursor: 'pointer',
                          fontSize: 16,
                          padding: '0 4px',
                        }}
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Add new additive dropdown */}
              {additives.length < MAX_ADDITIVES && (
                <select
                  value=""
                  onChange={(e) => {
                    if (e.target.value) handleAddMixer(e.target.value);
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: '1px solid #2d2545',
                    background: '#0f0a1a',
                    color: '#64748b',
                    fontSize: 14,
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  <option value="">Select additive {additives.length + 1}...</option>
                  {availableMixers.map(([name, mixer]) => (
                    <option key={name} value={name}>
                      {mixer.icon} {name} — ${mixer.cost} ({mixer.effect})
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Right Panel: Results */}
          <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Resulting Effects */}
            <div
              style={{
                background: '#1a1127',
                borderRadius: 12,
                border: '1px solid #2d2545',
                padding: 20,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  Resulting Effects
                </span>
                <div style={{ display: 'flex', gap: 4 }}>
                  {(['all', 'matched'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setEffectFilter(f)}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 6,
                        border: 'none',
                        background: effectFilter === f ? '#2d2545' : 'transparent',
                        color: effectFilter === f ? '#e2e8f0' : '#64748b',
                        fontSize: 12,
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {result?.effects.map((effectName) => {
                  const effect = EFFECTS[effectName];
                  if (!effect) return null;
                  return (
                    <div
                      key={effectName}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '6px 12px',
                        borderRadius: 8,
                        border: `1px solid ${effect.color}33`,
                        background: `${effect.color}11`,
                      }}
                    >
                      <span style={{ fontSize: 14 }}>✨</span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: effect.color }}>
                        {effectName}
                      </span>
                      <span style={{ fontSize: 12, color: '#4ade80' }}>
                        +{(effect.multiplier * 100).toFixed(0)}%
                      </span>
                    </div>
                  );
                })}
                {(!result || result.effects.length === 0) && (
                  <span style={{ color: '#475569', fontSize: 13 }}>No effects yet</span>
                )}
              </div>
            </div>

            {/* Cost / Price / Profit */}
            <div style={{ display: 'flex', gap: 12 }}>
              <div
                style={{
                  flex: 1,
                  background: '#1a1127',
                  borderRadius: 12,
                  border: '1px solid #2d2545',
                  padding: 16,
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    marginBottom: 6,
                  }}
                >
                  Cost
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9' }}>
                  ${(result?.totalCost || 0).toFixed(2)}
                </div>
                <div style={{ fontSize: 11, color: '#475569' }}>per unit</div>
              </div>
              <div
                style={{
                  flex: 1,
                  background: '#1a1127',
                  borderRadius: 12,
                  border: '1px solid #2d2545',
                  padding: 16,
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    marginBottom: 6,
                  }}
                >
                  Sell Price
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#4ade80' }}>
                  ${(result?.sellPrice || 0).toFixed(2)}
                </div>
                <div style={{ fontSize: 11, color: '#475569' }}>per unit</div>
              </div>
            </div>

            {/* Profit */}
            <div
              style={{
                background: '#1a1127',
                borderRadius: 12,
                border: '1px solid #2d2545',
                padding: 20,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: 10,
                }}
              >
                <span style={{ fontSize: 13, color: '#94a3b8' }}>Profit per unit</span>
                <span style={{ fontSize: 11, color: '#475569' }}>single unit calculation</span>
              </div>
              <div
                style={{
                  background: '#064e3b22',
                  border: '1px solid #065f4644',
                  borderRadius: 10,
                  padding: '14px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 28, fontWeight: 700, color: '#4ade80' }}>
                  +${(result?.profit || 0).toFixed(2)}
                </span>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: 12, color: '#64748b' }}>Margin: </span>
                  <span style={{ fontSize: 20, fontWeight: 700, color: '#4ade80' }}>
                    {(result?.profitMargin || 0).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div style={{ marginTop: 10, fontSize: 12, color: '#64748b' }}>
                Multiplier: ×{(1 + (result?.totalMultiplier || 0)).toFixed(2)} | Addictiveness:{' '}
                {((result?.addictiveness || 0) * 100).toFixed(0)}%
              </div>
            </div>

            {/* Mix Breakdown */}
            {result && result.changes.length > 0 && (
              <div
                style={{
                  background: '#1a1127',
                  borderRadius: 12,
                  border: '1px solid #2d2545',
                  padding: 20,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#94a3b8',
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    Mix Breakdown
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: '#4ade80',
                      background: '#064e3b33',
                      border: '1px solid #065f4644',
                      padding: '2px 10px',
                      borderRadius: 10,
                    }}
                  >
                    {result.changes.filter((c) => c.action === 'replaced').length} Changes
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {result.changes.map((change, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: 13,
                        color: '#94a3b8',
                      }}
                    >
                      <span style={{ color: '#475569', width: 20, textAlign: 'right' }}>
                        {change.step}
                      </span>
                      <span style={{ color: '#64748b' }}>→</span>
                      <span style={{ fontWeight: 500, color: '#e2e8f0' }}>{change.mixer}</span>
                      {change.action === 'replaced' && (
                        <>
                          <span style={{ color: '#f87171', textDecoration: 'line-through' }}>
                            {change.from}
                          </span>
                          <span style={{ color: '#64748b' }}>→</span>
                          <span style={{ color: '#4ade80' }}>{change.to}</span>
                        </>
                      )}
                      {change.action === 'added' && (
                        <span style={{ color: '#4ade80' }}>+ {change.to}</span>
                      )}
                      {change.action === 'duplicate_ignored' && (
                        <span style={{ color: '#64748b', fontStyle: 'italic' }}>already active</span>
                      )}
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: 12,
                    paddingTop: 12,
                    borderTop: '1px solid #2d2545',
                    fontSize: 13,
                    color: '#64748b',
                  }}
                >
                  {baseProduct} + {additives.length} additives ={' '}
                  <span style={{ color: '#4ade80', fontWeight: 600 }}>
                    ${(result?.profit || 0).toFixed(2)} profit
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lab Notes */}
        <div
          style={{
            marginTop: 24,
            background: '#1a1127',
            borderRadius: 12,
            border: '1px solid #2d2545',
            padding: 16,
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
          }}
        >
          <span style={{ fontSize: 18 }}>💡</span>
          <p style={{ margin: 0, fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
            <strong style={{ color: '#e2e8f0' }}>Lab Notes:</strong> Mix order matters! The same
            ingredients in different orders can produce different effects. Effects are capped at 8
            per product. The calculator follows the game&apos;s exact replacement rules.
          </p>
        </div>
      </div>
    </div>
  );
}
