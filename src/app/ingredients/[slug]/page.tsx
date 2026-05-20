import { ingredients, getIngredient } from '@/lib/static-data';
import { Card, StatCard, SectionHeader, Breadcrumb, Tag, DataTable } from '@/components/ui';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface IngredientPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ingredients.map(ingredient => ({
    slug: ingredient.slug
  }));
}

export default async function IngredientPage({ params }: IngredientPageProps) {
  const { slug } = await params;
  const ingredient = getIngredient(slug);

  if (!ingredient) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Ingredients', href: '/ingredients' },
        { label: ingredient.name }
      ]} />

      <SectionHeader title={ingredient.name} description={`Ingredient for mixing`} />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Price" value={ingredient.price} />
        <StatCard label="Base Effect" value={ingredient.baseEffect} />
        <StatCard label="Reputation" value={ingredient.reputationRequirement} />
        <StatCard label="Replacements" value={ingredient.effectReplacements.length.toString()} />
      </div>

      {/* Description */}
      <Card title="Description" className="mb-8">
        <p className="text-sm text-gray-600">{ingredient.description}</p>
      </Card>

      {/* Base Effect */}
      <Card title="Base Effect" className="mb-8">
        <div className="flex items-center gap-3">
          <Tag variant="accent" className="text-lg px-4 py-2">
            {ingredient.baseEffect}
          </Tag>
          <p className="text-sm text-gray-600">
            This effect is added to any drug when mixed with {ingredient.name}.
          </p>
        </div>
      </Card>

      {/* Effect Replacements */}
      {ingredient.effectReplacements.length > 0 && (
        <Card title="Effect Replacements" className="mb-8">
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              When {ingredient.name} is mixed with a drug that already has these effects, 
              they will be replaced:
            </p>
          </div>
          <DataTable
            headers={['Original Effect', 'Becomes']}
            rows={ingredient.effectReplacements.map(r => [
              <Tag key={r.from} variant="warning">{r.from}</Tag>,
              <Tag key={r.to} variant="success">{r.to}</Tag>
            ])}
          />
        </Card>
      )}

      {/* Usage Tips */}
      <Card title="Usage Tips" className="mb-8">
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            <strong>{ingredient.name}</strong> costs <span className="text-[#3847f5]">{ingredient.price}</span> and 
            requires <span className="text-[#3847f5]">{ingredient.reputationRequirement}</span> reputation to purchase.
          </p>
          <p>
            It is best used when you want to add the <span className="text-[#3847f5]">{ingredient.baseEffect}</span> effect 
            to your drugs, or when you need to replace specific effects in your current mix.
          </p>
          <div className="bg-gray-50 rounded p-4">
            <p className="font-mono text-xs text-gray-500 mb-2">Pro Tip:</p>
            <p>
              Check the effect replacements carefully. Sometimes replacing an effect can 
              increase the drug&apos;s value more than adding a new effect.
            </p>
          </div>
        </div>
      </Card>

      {/* Related Links */}
      <Card title="Related Pages">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/drugs" className="text-sm text-[#3847f5] hover:underline">
            View all drugs →
          </Link>
          <Link href="/guides/mixing-calculator" className="text-sm text-[#3847f5] hover:underline">
            Try mixing calculator →
          </Link>
        </div>
      </Card>
    </div>
  );
}
