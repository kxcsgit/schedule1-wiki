'use client';

import { useState } from 'react';
import { drugs, ingredients } from '@/lib/static-data';
import { Card, SectionHeader, Breadcrumb, Tag, DataTable } from '@/components/ui';

export default function MixingCalculatorPage() {
  const [selectedDrug, setSelectedDrug] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const drug = drugs.find(d => d.name === selectedDrug);
  const selectedIngredientDetails = ingredients.filter(i => selectedIngredients.includes(i.name));

  // Calculate effects
  const calculateEffects = () => {
    if (!drug) return [];
    
    let effects = [drug.effect];
    
    selectedIngredientDetails.forEach(ingredient => {
      // Add base effect
      if (!effects.includes(ingredient.baseEffect)) {
        effects.push(ingredient.baseEffect);
      }
      
      // Apply replacements
      ingredient.effectReplacements.forEach(replacement => {
        const index = effects.indexOf(replacement.from);
        if (index !== -1) {
          effects[index] = replacement.to;
        }
      });
    });
    
    return effects.filter(Boolean);
  };

  // Calculate value
  const calculateValue = () => {
    if (!drug) return { base: 0, added: 0, total: 0 };
    
    const baseValue = parseInt(drug.value.replace('$', ''));
    const addedValue = selectedIngredientDetails.reduce((sum, ing) => {
      return sum + parseInt(ing.price.replace('$', ''));
    }, 0);
    
    // Simple multiplier based on number of effects
    const effects = calculateEffects();
    const multiplier = 1 + (effects.length - 1) * 0.2;
    
    return {
      base: baseValue,
      added: addedValue,
      total: Math.round(baseValue * multiplier)
    };
  };

  const effects = calculateEffects();
  const value = calculateValue();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Mixing Calculator' }
      ]} />

      <SectionHeader 
        title="Mixing Calculator" 
        description="Calculate the effects and value of drug mixes" 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Drug Selection */}
          <Card title="Select Base Drug">
            <div className="space-y-4">
              <select
                value={selectedDrug}
                onChange={(e) => setSelectedDrug(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg font-mono text-sm"
              >
                <option value="">Select a drug...</option>
                {drugs.map(drug => (
                  <option key={drug.name} value={drug.name}>
                    {drug.name} ({drug.value})
                  </option>
                ))}
              </select>
              
              {drug && (
                <div className="bg-gray-50 rounded p-3">
                  <p className="font-mono text-xs text-gray-500 mb-1">Base Effect:</p>
                  <Tag variant="accent">{drug.effect || 'None'}</Tag>
                </div>
              )}
            </div>
          </Card>

          {/* Ingredient Selection */}
          <Card title="Select Ingredients">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {ingredients.map(ingredient => (
                  <label
                    key={ingredient.name}
                    className={`
                      flex items-center gap-2 p-2 rounded cursor-pointer
                      ${selectedIngredients.includes(ingredient.name) 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'bg-gray-50 border border-transparent'}
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIngredients.includes(ingredient.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIngredients([...selectedIngredients, ingredient.name]);
                        } else {
                          setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient.name));
                        }
                      }}
                      className="rounded"
                    />
                    <span className="font-mono text-xs">{ingredient.name}</span>
                    <span className="text-xs text-gray-500">{ingredient.price}</span>
                  </label>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Effects */}
          <Card title="Resulting Effects">
            {effects.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {effects.map((effect, i) => (
                  <Tag key={i} variant="accent">{effect}</Tag>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Select a drug to see effects</p>
            )}
          </Card>

          {/* Value */}
          <Card title="Value Calculation">
            {drug ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-mono text-xs text-gray-500">Base Value</p>
                    <p className="font-mono text-2xl font-bold text-gray-900">${value.base}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-gray-500">Ingredient Cost</p>
                    <p className="font-mono text-2xl font-bold text-red-600">+${value.added}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-gray-500">Final Value</p>
                    <p className="font-mono text-2xl font-bold text-[#3847f5]">${value.total}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded p-3">
                  <p className="font-mono text-xs text-gray-500 mb-1">Profit:</p>
                  <p className="font-mono text-lg font-bold text-green-600">
                    ${value.total - value.added}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Select a drug to see value</p>
            )}
          </Card>

          {/* Selected Ingredients */}
          {selectedIngredientDetails.length > 0 && (
            <Card title="Selected Ingredients">
              <DataTable
                headers={['Ingredient', 'Price', 'Base Effect']}
                rows={selectedIngredientDetails.map(ing => [
                  ing.name,
                  ing.price,
                  <Tag key={ing.name} variant="accent">{ing.baseEffect}</Tag>
                ])}
              />
            </Card>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-12">
        <Card title="Mixing Tips">
          <div className="space-y-4 text-sm text-gray-600">
            <p>
              <strong>Effect Replacements:</strong> When you add an ingredient, it may replace 
              existing effects on the drug. Check the ingredient details to see what effects 
              get replaced.
            </p>
            <p>
              <strong>Order Matters:</strong> The order you add ingredients can affect the final 
              result due to effect replacements. Experiment to find the best combinations.
            </p>
            <p>
              <strong>Profit vs Value:</strong> Higher value doesn't always mean higher profit. 
              Consider the ingredient cost when calculating your actual earnings.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
