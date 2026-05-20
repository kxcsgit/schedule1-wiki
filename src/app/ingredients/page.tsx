import { ingredients } from '@/lib/static-data';
import { Card, StatCard, SectionHeader, Breadcrumb, Tag } from '@/components/ui';
import Link from 'next/link';

export default function IngredientsPage() {
  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Ingredients' }
      ]} />

      <SectionHeader 
        title="Ingredients" 
        description={`${ingredients.length} ingredients available for mixing`} 
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Ingredients" value={ingredients.length.toString()} />
        <StatCard label="Price Range" value="$2 - $30" />
        <StatCard label="Effects" value="34" description="Unique effects" />
        <StatCard label="Replacements" value="100+" description="Effect rules" />
      </div>

      {/* Ingredient List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ingredients.map(ingredient => (
          <Card 
            key={ingredient.name} 
            title={ingredient.name} 
            href={`/ingredients/${ingredient.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="hover-lift"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[#3847f5]">{ingredient.price}</span>
                <Tag variant="accent">{ingredient.baseEffect}</Tag>
              </div>
              
              <div className="text-sm text-gray-600">
                <p><strong>Requires:</strong> {ingredient.reputationRequirement}</p>
              </div>

              <div className="text-sm text-gray-600">
                <p className="font-mono text-xs text-gray-500 mb-1">Description:</p>
                <p className="text-xs">{ingredient.description}</p>
              </div>

              {ingredient.effectReplacements.length > 0 && (
                <div className="text-sm text-gray-600">
                  <p className="font-mono text-xs text-gray-500 mb-1">
                    Effect Replacements ({ingredient.effectReplacements.length}):
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {ingredient.effectReplacements.slice(0, 3).map((replacement, i) => (
                      <span key={i} className="font-mono text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {replacement.from} → {replacement.to}
                      </span>
                    ))}
                    {ingredient.effectReplacements.length > 3 && (
                      <span className="font-mono text-xs text-gray-500">
                        +{ingredient.effectReplacements.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Effect Reference */}
      <div className="mt-12">
        <SectionHeader title="Effect Reference" description="Understanding drug effects" />
        
        <Card title="How Effects Work">
          <div className="space-y-4 text-sm text-gray-600">
            <p>
              Each ingredient has a <strong>base effect</strong> that it adds to a drug. 
              Additionally, each ingredient has <strong>effect replacements</strong> that 
              transform existing effects on the drug.
            </p>
            <div className="bg-gray-50 rounded p-4">
              <p className="font-mono text-xs text-gray-500 mb-2">Example: Cuke</p>
              <ul className="space-y-1">
                <li>• Base effect: <span className="text-[#3847f5]">Energizing</span></li>
                <li>• Replaces: <span className="text-[#3847f5]">Euphoric → Laxative</span></li>
                <li>• Replaces: <span className="text-[#3847f5]">Foggy → Cyclopean</span></li>
              </ul>
            </div>
            <p>
              <Link href="/guides/effect-reference" className="text-[#3847f5] hover:underline">
                View complete effect reference →
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
