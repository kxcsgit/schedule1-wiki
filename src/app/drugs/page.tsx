import { drugs } from '@/lib/static-data';
import { Card, StatCard, SectionHeader, Breadcrumb, Tag } from '@/components/ui';
import Link from 'next/link';

export default function DrugsPage() {
  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Drugs' }
      ]} />

      <SectionHeader 
        title="Drugs" 
        description={`${drugs.length} drug types available in Schedule I`} 
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Drugs" value={drugs.length.toString()} />
        <StatCard label="Marijuana" value="4" description="Strains" />
        <StatCard label="Other Types" value="3" description="Meth, Shrooms, Coke" />
        <StatCard label="Best Profit" value="$150" description="Cocaine" />
      </div>

      {/* Drug List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drugs.map(drug => (
          <Card 
            key={drug.name} 
            title={drug.name} 
            href={`/drugs/${drug.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="hover-lift"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[#3847f5]">{drug.value}</span>
                <Tag variant="accent">{drug.effect || 'None'}</Tag>
              </div>
              
              <div className="text-sm text-gray-600">
                <p><strong>Unlock:</strong> {drug.unlockRank}</p>
              </div>

              {drug.productionProcess.length > 0 && (
                <div className="text-sm text-gray-600">
                  <p className="font-mono text-xs text-gray-500 mb-1">Production:</p>
                  <ul className="space-y-1">
                    {drug.productionProcess.map((step, i) => (
                      <li key={i} className="text-xs">• {step}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Mixing Guide */}
      <div className="mt-12">
        <SectionHeader title="Mixing Guide" description="How to mix drugs with ingredients" />
        
        <Card title="Basic Mixing Process">
          <div className="space-y-4 text-sm text-gray-600">
            <p>
              Mixing drugs with ingredients changes their effects and increases their value. 
              Each ingredient has a base effect and can replace existing effects on the drug.
            </p>
            <div className="bg-gray-50 rounded p-4">
              <p className="font-mono text-xs text-gray-500 mb-2">Example: OG Kush + Cuke</p>
              <ul className="space-y-1">
                <li>• Base effect: <span className="text-[#3847f5]">Calming</span></li>
                <li>• Cuke adds: <span className="text-[#3847f5]">Energizing</span></li>
                <li>• New value: <span className="text-[#3847f5]">$38 → $50</span></li>
              </ul>
            </div>
            <p>
              <Link href="/guides/mixing-calculator" className="text-[#3847f5] hover:underline">
                Try our Mixing Calculator →
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
