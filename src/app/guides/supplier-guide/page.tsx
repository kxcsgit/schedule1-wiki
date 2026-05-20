import { Card, SectionHeader, Breadcrumb, Tag, DataTable } from '@/components/ui';

// Supplier data
const suppliers = [
  {
    name: 'Albert Hoover',
    location: 'Behind Dan\'s Hardware in Northtown',
    sells: ['OG Kush Seed', 'Sour Diesel Seed', 'Green Crack Seed', 'Granddaddy Purple Seed'],
    rankRequired: 'Street Rat I',
    paymentMethod: 'Deposit money into his stash',
    notes: 'First supplier you encounter. Text him to order seeds.'
  },
  {
    name: 'Shirley Watts',
    location: 'Unknown (introduced by contacts)',
    sells: ['Low-Quality Pseudo', 'Pseudo', 'High-Quality Pseudo'],
    rankRequired: 'Hoodlum I',
    paymentMethod: 'Cash',
    notes: 'Introduced by Jerry Montero or Meg Cooley after gaining friendly relationship.'
  },
  {
    name: 'Oscar',
    location: 'The Warehouse',
    sells: ['Acid', 'Phosphorus'],
    rankRequired: 'Hoodlum I',
    paymentMethod: 'Cash',
    notes: 'Sells chemicals needed for meth production.'
  },
  {
    name: 'Fungal Phil',
    location: 'Downtown',
    sells: ['Spore Syringe', 'Grain Bag', 'Mushroom Substrate'],
    rankRequired: 'Hustler I',
    paymentMethod: 'Cash',
    notes: 'Unlocked after progressing to Downtown region.'
  },
  {
    name: 'Salvador Moreno',
    location: 'The Docks',
    sells: ['Coca Seed'],
    rankRequired: 'Enforcer I',
    paymentMethod: 'Cash',
    notes: 'Introduced by Mac Cooper, Javier Perez, or Kelly Reynolds after gaining friendly relationship.'
  },
  {
    name: 'Gas-Mart',
    location: 'Multiple locations',
    sells: ['Cuke', 'Banana', 'Paracetamol', 'Donut', 'Viagor', 'Mouth Wash', 'Flu Medicine', 'Gasoline', 'Energy Drink', 'Mega Bean', 'Horse Semen', 'Battery', 'Iodine', 'Addy', 'Chili', 'Motor Oil', 'Warheads', 'Phencyclidine', 'Viagra'],
    rankRequired: 'Street Rat I',
    paymentMethod: 'Cash',
    notes: 'Two locations: one in Northtown, one in Westville. Sells all mixing ingredients.'
  },
  {
    name: 'Shred Shack',
    location: 'Near Hardware store',
    sells: ['Golden Skateboard'],
    rankRequired: 'None',
    paymentMethod: 'Cash',
    notes: 'Sells the Golden Skateboard for $1,500 (Rolling in Style achievement).'
  },
];

export default function SupplierGuidePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Supplier Guide' }
      ]} />

      <SectionHeader 
        title="Supplier Guide" 
        description="All suppliers, their locations, and what they sell" 
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card title="Total Suppliers">
          <p className="font-mono text-3xl font-bold text-[#3847f5]">{suppliers.length}</p>
        </Card>
        <Card title="Seed Suppliers">
          <p className="font-mono text-3xl font-bold text-[#3847f5]">2</p>
        </Card>
        <Card title="Chemical Suppliers">
          <p className="font-mono text-3xl font-bold text-[#3847f5]">2</p>
        </Card>
        <Card title="Ingredient Shops">
          <p className="font-mono text-3xl font-bold text-[#3847f5]">1</p>
        </Card>
      </div>

      {/* Supplier List */}
      <div className="space-y-6">
        {suppliers.map(supplier => (
          <Card key={supplier.name} title={supplier.name} className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-mono text-sm font-bold text-gray-900 mb-3">Details</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><strong>Location:</strong> {supplier.location}</li>
                  <li><strong>Rank Required:</strong> <Tag variant="accent">{supplier.rankRequired}</Tag></li>
                  <li><strong>Payment:</strong> {supplier.paymentMethod}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-sm font-bold text-gray-900 mb-3">Sells</h4>
                <div className="flex flex-wrap gap-2">
                  {supplier.sells.map(item => (
                    <Tag key={item} variant="default">{item}</Tag>
                  ))}
                </div>
              </div>
            </div>
            {supplier.notes && (
              <div className="mt-4 bg-gray-50 rounded p-3">
                <p className="font-mono text-xs text-gray-500 mb-1">Notes:</p>
                <p className="text-sm text-gray-600">{supplier.notes}</p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Supplier Progression */}
      <Card title="Supplier Progression" className="mt-8">
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            Suppliers are unlocked as you progress through the game and increase your rank. 
            Here's the recommended order to unlock them:
          </p>
          <div className="bg-gray-50 rounded p-4">
            <p className="font-mono text-xs text-gray-500 mb-2">Unlock Order:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong>Albert Hoover</strong> (Street Rat I) - Seeds for marijuana</li>
              <li><strong>Gas-Mart</strong> (Street Rat I) - Mixing ingredients</li>
              <li><strong>Oscar</strong> (Hoodlum I) - Chemicals for meth</li>
              <li><strong>Shirley Watts</strong> (Hoodlum I) - Pseudo for meth</li>
              <li><strong>Fungal Phil</strong> (Hustler I) - Mushroom supplies</li>
              <li><strong>Salvador Moreno</strong> (Enforcer I) - Coca seeds</li>
            </ol>
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card title="Tips" className="mt-8">
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            <strong>1. Build relationships:</strong> Some suppliers require you to build 
            relationships with their contacts first. Talk to NPCs and complete their tasks.
          </p>
          <p>
            <strong>2. Stock up:</strong> Buy ingredients in bulk when you can. 
            This saves time and ensures you always have supplies.
          </p>
          <p>
            <strong>3. Use stashes:</strong> Some suppliers use stashes for payment. 
            Make sure you know where each stash is located.
          </p>
          <p>
            <strong>4. Check Gas-Mart regularly:</strong> Gas-Mart has all mixing ingredients. 
            Visit regularly to stock up on what you need.
          </p>
        </div>
      </Card>
    </div>
  );
}
