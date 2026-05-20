import Link from 'next/link';
import { Card, StatCard, SectionHeader } from '@/components/ui';
import { drugs, ingredients, properties, achievements } from '@/lib/static-data';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="font-mono text-4xl font-bold text-gray-900 mb-4">
          Schedule I <span className="text-[#3847f5]">Wiki</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A comprehensive guide to Schedule I. Find all drugs, ingredients, mixing recipes, 
          properties, and achievements in one place.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <StatCard label="Drugs" value={drugs.length.toString()} description="Types available" />
        <StatCard label="Ingredients" value={ingredients.length.toString()} description="For mixing" />
        <StatCard label="Properties" value={properties.length.toString()} description="To purchase" />
        <StatCard label="Achievements" value={achievements.length.toString()} description="To unlock" />
      </div>

      {/* Quick Links */}
      <SectionHeader title="Quick Navigation" description="Jump to what you need" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <Card title="Drugs" href="/drugs" className="hover-lift">
          <p className="text-sm text-gray-600">
            {drugs.length} drug types including Marijuana, Meth, Shrooms, and Cocaine.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {drugs.slice(0, 3).map(drug => (
              <span key={drug.name} className="font-mono text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {drug.name}
              </span>
            ))}
          </div>
        </Card>

        <Card title="Ingredients" href="/ingredients" className="hover-lift">
          <p className="text-sm text-gray-600">
            {ingredients.length} ingredients for mixing with detailed effect replacements.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {ingredients.slice(0, 3).map(ingredient => (
              <span key={ingredient.name} className="font-mono text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {ingredient.name}
              </span>
            ))}
          </div>
        </Card>

        <Card title="Properties" href="/properties" className="hover-lift">
          <p className="text-sm text-gray-600">
            {properties.length} properties to purchase for your operations.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {properties.slice(0, 3).map(property => (
              <span key={property.name} className="font-mono text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {property.name}
              </span>
            ))}
          </div>
        </Card>

        <Card title="Achievements" href="/achievements" className="hover-lift">
          <p className="text-sm text-gray-600">
            {achievements.length} achievements with detailed completion guides.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {achievements.slice(0, 3).map(achievement => (
              <span key={achievement.name} className="font-mono text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {achievement.name}
              </span>
            ))}
          </div>
        </Card>
      </div>

      {/* Featured Content */}
      <SectionHeader title="Featured Content" description="Popular guides and resources" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <Card title="Best Mixing Recipes" href="/guides/best-mixes" className="hover-lift">
          <p className="text-sm text-gray-600 mb-3">
            Discover the most profitable mixing recipes for each drug type.
          </p>
          <div className="bg-gray-50 rounded p-3">
            <p className="font-mono text-xs text-gray-500 mb-1">Example: OG Kush + Mouth Wash</p>
            <p className="font-mono text-sm text-[#3847f5]">Cost: $4 → Sell: $64 = Profit: $60</p>
          </div>
        </Card>

        <Card title="Effect Reference" href="/guides/effect-reference" className="hover-lift">
          <p className="text-sm text-gray-600 mb-3">
            Complete list of all 34 effects and their replacements.
          </p>
          <div className="bg-gray-50 rounded p-3">
            <p className="font-mono text-xs text-gray-500 mb-1">Example: Cuke</p>
            <p className="font-mono text-sm text-[#3847f5]">Energizing → Euphoric → Laxative</p>
          </div>
        </Card>
      </div>

      {/* Recent Updates */}
      <SectionHeader title="Game Info" description="About Schedule I" />
      
      <Card title="Schedule I" className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-mono text-sm font-bold text-gray-900 mb-2">Overview</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• <strong>Developer:</strong> TVGS</li>
              <li>• <strong>Release:</strong> March 24, 2025 (Early Access)</li>
              <li>• <strong>Engine:</strong> Unity 2022</li>
              <li>• <strong>Price:</strong> $19.99</li>
              <li>• <strong>Players:</strong> 1-4 Co-op</li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-sm font-bold text-gray-900 mb-2">Links</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <a href="https://store.steampowered.com/app/3205720/Schedule_I/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-[#3847f5] hover:underline">
                  Steam Store
                </a>
              </li>
              <li>
                <a href="https://store.steampowered.com/app/3205720/Schedule_I_Free_Sample/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-[#3847f5] hover:underline">
                  Free Demo
                </a>
              </li>
              <li>
                <a href="https://schedule-1.fandom.com/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-[#3847f5] hover:underline">
                  Fandom Wiki
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
