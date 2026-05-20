import { drugs } from '@/lib/static-data';
import { Card, SectionHeader, Breadcrumb, Tag, DataTable } from '@/components/ui';

export default function BestMixesPage() {
  // Get all best mixes from all drugs
  const allMixes = drugs.flatMap(drug => 
    drug.bestMixes.map(mix => ({
      ...mix,
      drugName: drug.name
    }))
  );

  // Sort by profit
  const sortedMixes = allMixes.sort((a, b) => {
    const profitA = parseInt(a.profit.replace('$', ''));
    const profitB = parseInt(b.profit.replace('$', ''));
    return profitB - profitA;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Best Mixing Recipes' }
      ]} />

      <SectionHeader 
        title="Best Mixing Recipes" 
        description="The most profitable mixing recipes for each drug type" 
      />

      {/* OG Kush Best Mixes */}
      <Card title="OG Kush Best Mixes" className="mb-8">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            OG Kush currently holds the titles for all known best mixes from 1 to 8 steps. 
            These recipes are optimized for maximum profit.
          </p>
        </div>
        
        {drugs.find(d => d.name === 'OG Kush')?.bestMixes ? (
          <DataTable
            headers={['Steps', 'Ingredients', 'Cost', 'Sell Price', 'Profit', 'Multiplier', 'Effects']}
            rows={drugs.find(d => d.name === 'OG Kush')!.bestMixes.map(mix => [
              mix.ingredients.length.toString(),
              mix.ingredients.join(' + '),
              mix.ingredientCost,
              mix.askingPrice,
              <span key={mix.profit} className="font-bold text-green-600">{mix.profit}</span>,
              mix.multiplier,
              <div key={mix.effects.join(',')} className="flex flex-wrap gap-1">
                {mix.effects.slice(0, 3).map((effect, i) => (
                  <Tag key={i} variant="accent" className="text-xs">{effect}</Tag>
                ))}
                {mix.effects.length > 3 && (
                  <span className="text-xs text-gray-500">+{mix.effects.length - 3}</span>
                )}
              </div>
            ])}
          />
        ) : (
          <p className="text-sm text-gray-500">No mixing recipes available</p>
        )}
      </Card>

      {/* General Mixing Rules */}
      <Card title="Mixing Rules of Thumb" className="mb-8">
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            When choosing a mix, consider these generally accepted rules:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded p-4">
              <p className="font-mono text-xs text-gray-500 mb-2">Manual Mixing:</p>
              <ul className="space-y-1">
                <li>• Stick with 2- or 3-step mixes</li>
                <li>• Less effort and time required</li>
                <li>• Good for beginners</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded p-4">
              <p className="font-mono text-xs text-gray-500 mb-2">Automated Mixing:</p>
              <ul className="space-y-1">
                <li>• 4-step mix with 1 Chemist</li>
                <li>• 8-step mix with 2 Chemists</li>
                <li>• Maximum profit potential</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Profit vs Cost */}
      <Card title="Profit vs Cost" className="mb-8">
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            When comparing mixes, consider both profit and cost:
          </p>
          <div className="bg-gray-50 rounded p-4">
            <p className="font-mono text-xs text-gray-500 mb-2">Priority Order:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong>Profit first:</strong> Higher profit = better mix</li>
              <li><strong>Cost second:</strong> If two mixes have the same profit, choose the lower cost</li>
              <li><strong>Reason:</strong> Less money removed from bank balance = less laundering needed</li>
            </ol>
          </div>
          <p>
            This means prioritizing cost second means less laundering, and less of your 
            Weekly Deposit Limit being used.
          </p>
        </div>
      </Card>

      {/* Drug-Specific Tips */}
      <Card title="Drug-Specific Tips" className="mb-8">
        <div className="space-y-6">
          <div>
            <h4 className="font-mono text-sm font-bold text-gray-900 mb-2">Marijuana</h4>
            <p className="text-sm text-gray-600">
              OG Kush currently holds the titles for all known best mixes from 1 to 8 steps, 
              with the exception of 5 Steps, where it is lower than the 5-Mix Green Crack 
              by $0.166 Profit per Bud with seed costs considered.
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-sm font-bold text-gray-900 mb-2">Methamphetamine</h4>
            <p className="text-sm text-gray-600">
              Meth production takes longer than marijuana but has higher base value. 
              Focus on mixing with ingredients that add high-value effects.
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-sm font-bold text-gray-900 mb-2">Cocaine</h4>
            <p className="text-sm text-gray-600">
              Cocaine has the longest production process but the highest reward. 
              Mix with premium ingredients for maximum profit.
            </p>
          </div>
        </div>
      </Card>

      {/* All Mixes */}
      <Card title="All Mixing Recipes">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Complete list of all known mixing recipes, sorted by profit.
          </p>
        </div>
        
        <DataTable
          headers={['Drug', 'Ingredients', 'Cost', 'Sell Price', 'Profit', 'Multiplier']}
          rows={sortedMixes.slice(0, 20).map(mix => [
            mix.drugName,
            mix.ingredients.join(' + '),
            mix.ingredientCost,
            mix.askingPrice,
            <span key={mix.profit} className="font-bold text-green-600">{mix.profit}</span>,
            mix.multiplier
          ])}
        />
        
        {sortedMixes.length > 20 && (
          <p className="text-sm text-gray-500 mt-4">
            Showing top 20 recipes. There are {sortedMixes.length} total recipes available.
          </p>
        )}
      </Card>
    </div>
  );
}
