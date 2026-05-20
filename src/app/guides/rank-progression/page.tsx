import { Card, SectionHeader, Breadcrumb, Tag, DataTable } from '@/components/ui';

// Rank data from the game
const ranks = [
  { rank: 'Street Rat I', level: 1, unlocks: ['OG Kush Seed', 'Cuke', 'Banana', 'Paracetamol', 'Donut'] },
  { rank: 'Street Rat II', level: 2, unlocks: [] },
  { rank: 'Street Rat III', level: 3, unlocks: [] },
  { rank: 'Street Rat IV', level: 4, unlocks: ['Sour Diesel Seed'] },
  { rank: 'Hoodlum I', level: 5, unlocks: ['Acid', 'Phosphorus', 'Low-Quality Pseudo', 'Liquid Meth'] },
  { rank: 'Hoodlum II', level: 6, unlocks: ['Green Crack Seed', 'Viagor'] },
  { rank: 'Hoodlum III', level: 7, unlocks: ['Mouth Wash'] },
  { rank: 'Hoodlum IV', level: 8, unlocks: ['Granddaddy Purple Seed', 'Flu Medicine'] },
  { rank: 'Hoodlum V', level: 9, unlocks: ['Gasoline', 'Energy Drink'] },
  { rank: 'Hustler I', level: 10, unlocks: ['Spore Syringe', 'Grain Bag', 'Mushroom Substrate', 'Shroom Spawn'] },
  { rank: 'Hustler II', level: 11, unlocks: ['Mega Bean'] },
  { rank: 'Hustler III', level: 12, unlocks: ['Pseudo', 'Horse Semen'] },
  { rank: 'Hustler IV', level: 13, unlocks: ['Battery'] },
  { rank: 'Hustler V', level: 14, unlocks: [] },
  { rank: 'Bagman I', level: 15, unlocks: ['Iodine'] },
  { rank: 'Bagman II', level: 16, unlocks: ['Addy'] },
  { rank: 'Bagman III', level: 17, unlocks: ['Chili'] },
  { rank: 'Bagman IV', level: 18, unlocks: ['Motor Oil'] },
  { rank: 'Bagman V', level: 19, unlocks: ['High-Quality Pseudo'] },
  { rank: 'Enforcer I', level: 20, unlocks: ['Coca Seed', 'Coca Leaf', 'Cocaine Base', 'Warheads'] },
  { rank: 'Enforcer II', level: 21, unlocks: ['Phencyclidine'] },
  { rank: 'Enforcer III', level: 22, unlocks: ['Viagra (x2)'] },
  { rank: 'Enforcer IV', level: 23, unlocks: [] },
  { rank: 'Enforcer V', level: 24, unlocks: [] },
];

export default function RankProgressionPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Rank Progression' }
      ]} />

      <SectionHeader 
        title="Rank Progression" 
        description="All ranks and what they unlock" 
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card title="Total Ranks">
          <p className="font-mono text-3xl font-bold text-[#3847f5]">{ranks.length}</p>
        </Card>
        <Card title="Ranks with Unlocks">
          <p className="font-mono text-3xl font-bold text-[#3847f5]">
            {ranks.filter(r => r.unlocks.length > 0).length}
          </p>
        </Card>
        <Card title="Total Unlocks">
          <p className="font-mono text-3xl font-bold text-[#3847f5]">
            {ranks.reduce((sum, r) => sum + r.unlocks.length, 0)}
          </p>
        </Card>
        <Card title="Final Rank">
          <p className="font-mono text-3xl font-bold text-[#3847f5]">Enforcer V</p>
        </Card>
      </div>

      {/* Rank Table */}
      <Card title="All Ranks" className="mb-8">
        <DataTable
          headers={['Rank', 'Level', 'Unlocks']}
          rows={ranks.map(rank => [
            <Tag key={rank.rank} variant="accent">{rank.rank}</Tag>,
            rank.level.toString(),
            rank.unlocks.length > 0 ? (
              <div key={rank.unlocks.join(',')} className="flex flex-wrap gap-1">
                {rank.unlocks.map(unlock => (
                  <Tag key={unlock} variant="default" className="text-xs">{unlock}</Tag>
                ))}
              </div>
            ) : (
              <span key="none" className="text-gray-400">-</span>
            )
          ])}
        />
      </Card>

      {/* Progression Guide */}
      <Card title="Progression Guide" className="mb-8">
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            Ranks are earned by gaining XP through selling drugs, completing quests, 
            and progressing through the game. Each rank unlocks new items, ingredients, 
            or suppliers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded p-4">
              <p className="font-mono text-xs text-gray-500 mb-2">Early Game (Street Rat):</p>
              <ul className="space-y-1">
                <li>• Focus on OG Kush production</li>
                <li>• Learn basic mixing with Cuke and Banana</li>
                <li>• Save money for next rank unlocks</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded p-4">
              <p className="font-mono text-xs text-gray-500 mb-2">Mid Game (Hoodlum-Hustler):</p>
              <ul className="space-y-1">
                <li>• Unlock Meth production</li>
                <li>• Get more powerful ingredients</li>
                <li>• Start automating production</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Key Unlocks */}
      <Card title="Key Unlocks" className="mb-8">
        <div className="space-y-6">
          <div>
            <h4 className="font-mono text-sm font-bold text-gray-900 mb-2">
              <Tag variant="accent">Hoodlum I</Tag> - Meth Production
            </h4>
            <p className="text-sm text-gray-600">
              Unlocks Acid, Phosphorus, Low-Quality Pseudo, and Liquid Meth. 
              This is when you can start producing Methamphetamine.
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-sm font-bold text-gray-900 mb-2">
              <Tag variant="accent">Hustler I</Tag> - Mushroom Production
            </h4>
            <p className="text-sm text-gray-600">
              Unlocks Spore Syringe, Grain Bag, Mushroom Substrate, and Shroom Spawn. 
              This is when you can start growing mushrooms.
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-sm font-bold text-gray-900 mb-2">
              <Tag variant="accent">Enforcer I</Tag> - Cocaine Production
            </h4>
            <p className="text-sm text-gray-600">
              Unlocks Coca Seed, Coca Leaf, Cocaine Base, and Warheads. 
              This is when you can start producing cocaine, the most valuable drug.
            </p>
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card title="Tips">
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            <strong>1. Focus on sales:</strong> The fastest way to rank up is to sell 
            as much product as possible. Each sale gives XP.
          </p>
          <p>
            <strong>2. Complete quests:</strong> Quests give large amounts of XP. 
            Always have an active quest to work towards.
          </p>
          <p>
            <strong>3. Mix for value:</strong> Higher value products give more XP per sale. 
            Use the mixing calculator to find the best recipes.
          </p>
          <p>
            <strong>4. Hire dealers:</strong> Dealers make sales for you, giving you 
            passive XP and income.
          </p>
        </div>
      </Card>
    </div>
  );
}
