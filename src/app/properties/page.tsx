import { properties } from '@/lib/static-data';
import { Card, StatCard, SectionHeader, Breadcrumb, Tag } from '@/components/ui';
import Link from 'next/link';

export default function PropertiesPage() {
  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Properties' }
      ]} />

      <SectionHeader 
        title="Properties" 
        description={`${properties.length} properties available for purchase`} 
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Properties" value={properties.length.toString()} />
        <StatCard label="Free Properties" value="2" description="RV & Sewer" />
        <StatCard label="Most Expensive" value="$50,000" description="Manor" />
        <StatCard label="Max Employees" value="8" description="Manor" />
      </div>

      {/* Property List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map(property => (
          <Card 
            key={property.name} 
            title={property.name} 
            href={`/properties/${property.name.toLowerCase().replace(/[\s,]+/g, '-')}`}
            className="hover-lift"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[#3847f5]">
                  {property.price === 'Free' ? 'Free' : property.price}
                </span>
                <Tag variant={property.price === 'Free' ? 'success' : 'default'}>
                  {property.location}
                </Tag>
              </div>
              
              <div className="text-sm text-gray-600">
                <p><strong>Size:</strong> {property.size}</p>
                <p><strong>Loading Bays:</strong> {property.loadingBays}</p>
                <p><strong>Employee Limit:</strong> {property.employeeLimit}</p>
              </div>

              {property.note && (
                <div className="text-sm text-gray-600">
                  <p className="font-mono text-xs text-gray-500 mb-1">Note:</p>
                  <p className="text-xs">{property.note}</p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Property Guide */}
      <div className="mt-12">
        <SectionHeader title="Property Guide" description="Choosing the right property" />
        
        <Card title="Property Progression">
          <div className="space-y-4 text-sm text-gray-600">
            <p>
              Properties in Schedule I serve as your base of operations. As you progress, 
              you'll need larger properties with more employee capacity to scale your business.
            </p>
            <div className="bg-gray-50 rounded p-4">
              <p className="font-mono text-xs text-gray-500 mb-2">Recommended Progression:</p>
              <ul className="space-y-1">
                <li>1. <span className="text-[#3847f5]">RV</span> (Free) - Starting point</li>
                <li>2. <span className="text-[#3847f5]">Sweatshop</span> ($600) - First real base</li>
                <li>3. <span className="text-[#3847f5]">Barn</span> ($3,000) - More space</li>
                <li>4. <span className="text-[#3847f5]">Bungalow</span> ($6,000) - Residential area</li>
                <li>5. <span className="text-[#3847f5]">Docks Warehouse</span> ($15,000) - Employees</li>
                <li>6. <span className="text-[#3847f5]">Manor</span> ($50,000) - End game</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
