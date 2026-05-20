import { ingredients } from '@/lib/static-data';
import { Card, SectionHeader, Breadcrumb, Tag, DataTable } from '@/components/ui';

export default function EffectReferencePage() {
  // Collect all unique effects
  const allEffects = new Set<string>();
  ingredients.forEach(ingredient => {
    if (ingredient.baseEffect) allEffects.add(ingredient.baseEffect);
    ingredient.effectReplacements.forEach(r => {
      allEffects.add(r.from);
      allEffects.add(r.to);
    });
  });
  
  const sortedEffects = Array.from(allEffects).sort();

  // Get all replacements
  const allReplacements = ingredients.flatMap(ingredient =>
    ingredient.effectReplacements.map(r => ({
      ...r,
      ingredient: ingredient.name
    }))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Effect Reference' }
      ]} />

      <SectionHeader 
        title="Effect Reference" 
        description={`Complete list of all ${sortedEffects.length} effects`} 
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card title="Total Effects">
          <p className="font-mono text-3xl font-bold text-[#3847f5]">{sortedEffects.length}</p>
        </Card>
        <Card title="Ingredients">
          <p className="font-mono text-3xl font-bold text-[#3847f5]">{ingredients.length}</p>
        </Card>
        <Card title="Replacements">
          <p className="font-mono text-3xl font-bold text-[#3847f5]">{allReplacements.length}</p>
        </Card>
        <Card title="Base Effects">
          <p className="font-mono text-3xl font-bold text-[#3847f5]">
            {new Set(ingredients.map(i => i.baseEffect)).size}
          </p>
        </Card>
      </div>

      {/* All Effects */}
      <Card title="All Effects" className="mb-8">
        <div className="flex flex-wrap gap-2">
          {sortedEffects.map(effect => (
            <Tag key={effect} variant="accent">{effect}</Tag>
          ))}
        </div>
      </Card>

      {/* Effect Replacements */}
      <Card title="Effect Replacements" className="mb-8">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            When mixing drugs with ingredients, existing effects can be replaced. 
            Here's a complete list of all effect replacements:
          </p>
        </div>
        
        <DataTable
          headers={['Original Effect', 'Becomes', 'Ingredient']}
          rows={allReplacements.map(r => [
            <Tag key={r.from} variant="warning">{r.from}</Tag>,
            <Tag key={r.to} variant="success">{r.to}</Tag>,
            r.ingredient
          ])}
        />
      </Card>

      {/* Ingredients by Base Effect */}
      <Card title="Ingredients by Base Effect" className="mb-8">
        <div className="space-y-6">
          {Array.from(new Set(ingredients.map(i => i.baseEffect))).sort().map(effect => (
            <div key={effect}>
              <h4 className="font-mono text-sm font-bold text-gray-900 mb-2">
                <Tag variant="accent">{effect}</Tag>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {ingredients.filter(i => i.baseEffect === effect).map(ingredient => (
                  <div key={ingredient.name} className="bg-gray-50 rounded p-2">
                    <p className="font-mono text-xs font-bold">{ingredient.name}</p>
                    <p className="text-xs text-gray-500">{ingredient.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Effect Chains */}
      <Card title="Effect Chains" className="mb-8">
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            Some effects can be chained together through multiple ingredients. 
            For example:
          </p>
          <div className="bg-gray-50 rounded p-4">
            <p className="font-mono text-xs text-gray-500 mb-2">Example Chain:</p>
            <div className="flex items-center gap-2">
              <Tag variant="warning">Euphoric</Tag>
              <span>→</span>
              <Tag variant="success">Laxative</Tag>
              <span className="text-xs text-gray-500">(via Cuke)</span>
            </div>
          </div>
          <p>
            Understanding these chains is key to creating the most valuable drug mixes.
          </p>
        </div>
      </Card>

      {/* Tips */}
      <Card title="Mixing Tips">
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            <strong>1. Plan your mix:</strong> Before adding ingredients, check what effects 
            you want and which ingredients can help you achieve them.
          </p>
          <p>
            <strong>2. Watch for replacements:</strong> Adding an ingredient might replace 
            an effect you want to keep. Check the replacement list first.
          </p>
          <p>
            <strong>3. Order matters:</strong> The order you add ingredients can affect 
            the final result due to effect replacements.
          </p>
          <p>
            <strong>4. Experiment:</strong> Don't be afraid to try new combinations. 
            The mixing calculator can help you plan without wasting ingredients.
          </p>
        </div>
      </Card>
    </div>
  );
}
