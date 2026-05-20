import { properties, getProperty } from '@/lib/static-data';
import { getImage } from '@/lib/images';
import { Card, StatCard, SectionHeader, Breadcrumb, Tag } from '@/components/ui';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return properties.map(property => ({
    slug: property.slug
  }));
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = getProperty(slug);

  if (!property) {
    notFound();
  }

  const imageUrl = getImage(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Properties', href: '/properties' },
        { label: property.name }
      ]} />

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Property Image */}
        {imageUrl && (
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-white/50 border border-gray-200/50">
              <img
                src={imageUrl}
                alt={property.name}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )}
        
        <div className="flex-1">
          <SectionHeader title={property.name} description={`Property in Schedule I`} />

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Price" value={property.price === 'Free' ? 'Free' : property.price} />
            <StatCard label="Location" value={property.location} />
            <StatCard label="Size" value={property.size} />
            <StatCard label="Employee Limit" value={property.employeeLimit} />
          </div>
        </div>
      </div>

      {/* Details */}
      <Card title="Property Details" className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-mono text-sm font-bold text-gray-900 mb-3">Specifications</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><strong>Price:</strong> {property.price}</li>
              <li><strong>Location:</strong> {property.location}</li>
              <li><strong>Size:</strong> {property.size}</li>
              <li><strong>Loading Bays:</strong> {property.loadingBays}</li>
              <li><strong>Employee Limit:</strong> {property.employeeLimit}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-sm font-bold text-gray-900 mb-3">Notes</h4>
            <p className="text-sm text-gray-600">
              {property.note || 'No additional notes for this property.'}
            </p>
          </div>
        </div>
      </Card>

      {/* Features */}
      <Card title="Features" className="mb-8">
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            <strong>{property.name}</strong> is located in <span className="text-[#3847f5]">{property.location}</span> and 
            has a size of <span className="text-[#3847f5]">{property.size}</span>.
          </p>
          <p>
            It can accommodate up to <span className="text-[#3847f5]">{property.employeeLimit}</span> employees 
            and has <span className="text-[#3847f5]">{property.loadingBays}</span> loading bays.
          </p>
          {property.price === 'Free' ? (
            <div className="bg-green-50 rounded p-4">
              <p className="font-mono text-xs text-green-700 mb-2">Free Property</p>
              <p className="text-green-700">
                This property is free to obtain. It is a great starting point for new players.
              </p>
            </div>
          ) : (
            <div className="bg-blue-50 rounded p-4">
              <p className="font-mono text-xs text-blue-700 mb-2">Purchase Required</p>
              <p className="text-blue-700">
                This property requires <span className="font-bold">{property.price}</span> to purchase 
                from Ray&apos;s Realty.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Temperature */}
      <Card title="Temperature System" className="mb-8">
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            All properties have a base temperature of <span className="text-[#3847f5]">20°C (68°F)</span>, 
            except the Sewer Office which is <span className="text-[#3847f5]">10°C (50°F)</span>.
          </p>
          <p>
            This affects drug production:
          </p>
          <ul className="space-y-2">
            <li>• <strong>Marijuana and Coca:</strong> Grow slower in cold environments</li>
            <li>• <strong>Shrooms:</strong> Grow faster in cold environments</li>
          </ul>
          <p>
            Use AC Units to control temperature for optimal production.
          </p>
        </div>
      </Card>

      {/* Related Links */}
      <Card title="Related Pages">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/drugs" className="text-sm text-[#3847f5] hover:underline">
            View all drugs →
          </Link>
          <Link href="/achievements" className="text-sm text-[#3847f5] hover:underline">
            View all achievements →
          </Link>
        </div>
      </Card>
    </div>
  );
}
