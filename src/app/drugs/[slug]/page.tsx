import { drugs, getDrug } from '@/lib/static-data';
import { getImage } from '@/lib/images';
import { Card, StatCard, SectionHeader, Breadcrumb, Tag, DataTable } from '@/components/ui';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface DrugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return drugs.map(drug => ({
    slug: drug.slug
  }));
}

export default async function DrugPage({ params }: DrugPageProps) {
  const { slug } = await params;
  const drug = getDrug(slug);

  if (!drug) {
    notFound();
  }

  const imageUrl = getImage(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Drugs', href: '/drugs' },
        { label: drug.name }
      ]} />

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Drug Image */}
        {imageUrl && (
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white/50 border border-gray-200/50">
              <img
                src={imageUrl}
                alt={drug.name}
                className="object-contain w-full h-full p-4"
              />
            </div>
          </div>
        )}
        
        <div className="flex-1">
          <SectionHeader title={drug.name} description={`Drug type in Schedule I`} />

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Base Value" value={drug.value} />
            <StatCard label="Base Effect" value={drug.effect || 'None'} />
            <StatCard label="Unlock Rank" value={drug.unlockRank} />
            <StatCard label="Ingredients" value={drug.ingredients.length.toString()} />
          </div>
        </div>
      </div>

      {/* Description */}
      {drug.description && (
        <Card title="Description" className="mb-8">
          <p className="text-sm text-gray-600">{drug.description}</p>
        </Card>
      )}

      {/* Production Process */}
      {drug.productionProcess.length > 0 && (
        <Card title="Production Process" className="mb-8">
          <div className="space-y-4">
            {drug.productionProcess.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="font-mono text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  Step {i + 1}
                </span>
                <p className="text-sm text-gray-600">{step}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Required Ingredients */}
      {drug.ingredients.length > 0 && (
        <Card title="Required Ingredients" className="mb-8">
          <DataTable
            headers={['Ingredient', 'Rank Required']}
            rows={drug.ingredients.map(ing => [ing.name, ing.rank])}
          />
        </Card>
      )}

      {/* Best Mixing Recipes */}
      {drug.bestMixes.length > 0 && (
        <Card title="Best Mixing Recipes" className="mb-8">
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              These are the most profitable mixing recipes for {drug.name}. 
              Costs and profits are per unit.
            </p>
          </div>
          <DataTable
            headers={['Ingredients', 'Cost', 'Sell Price', 'Profit', 'Multiplier', 'Effects']}
            rows={drug.bestMixes.map(mix => [
              mix.ingredients.join(' + '),
              mix.ingredientCost,
              mix.askingPrice,
              mix.profit,
              mix.multiplier,
              mix.effects.join(', ')
            ])}
          />
        </Card>
      )}

      {/* Related Links */}
      <Card title="Related Pages">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/ingredients" className="text-sm text-[#3847f5] hover:underline">
            View all ingredients →
          </Link>
          <Link href="/guides/best-mixes" className="text-sm text-[#3847f5] hover:underline">
            View best mixing recipes →
          </Link>
        </div>
      </Card>
    </div>
  );
}
