import { achievements, getAchievement } from '@/lib/static-data';
import { Card, StatCard, SectionHeader, Breadcrumb, Tag } from '@/components/ui';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface AchievementPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return achievements.map(achievement => ({
    slug: achievement.slug
  }));
}

export default async function AchievementPage({ params }: AchievementPageProps) {
  const { slug } = await params;
  const achievement = getAchievement(slug);

  if (!achievement) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Achievements', href: '/achievements' },
        { label: achievement.name }
      ]} />

      <SectionHeader title={achievement.name} description={`Achievement in Schedule I`} />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Achievement" value={achievement.name} />
        <StatCard label="Description" value={achievement.description} />
        <StatCard label="Difficulty" value={
          achievement.name === 'Finishing the Job' ? 'Hard' :
          achievement.name === 'Magnate' ? 'Medium' : 'Easy'
        } />
        <StatCard label="Type" value={
          ['Left in the Dust', 'Welcome to Hyland Point', 'The Long Arm of the Law', 'Finishing the Job'].includes(achievement.name) 
            ? 'Story' : 'Optional'
        } />
      </div>

      {/* Description */}
      <Card title="Description" className="mb-8">
        <p className="text-sm text-gray-600">{achievement.description}</p>
      </Card>

      {/* How to Complete */}
      <Card title="How to Complete" className="mb-8">
        <div className="space-y-4 text-sm text-gray-600">
          <p>{achievement.howToComplete}</p>
          
          {achievement.name === 'Finishing the Job' && (
            <div className="bg-yellow-50 rounded p-4">
              <p className="font-mono text-xs text-yellow-700 mb-2">⚠️ Spoiler Warning</p>
              <p className="text-yellow-700">
                This achievement contains major story spoilers. Complete the game first if you 
                want to experience the story naturally.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Tips */}
      <Card title="Tips" className="mb-8">
        <div className="space-y-4 text-sm text-gray-600">
          {achievement.name === 'Master Chef' && (
            <p>
              To manufacture a product worth at least $100, mix OG Kush with Mouth Wash. 
              This increases the value from $38 to $64. For even higher values, add more ingredients.
            </p>
          )}
          
          {achievement.name === 'Dodgy Dealing' && (
            <p>
              Keep selling products until Uncle Nelson calls about hiring Benji. 
              Find Benji in Motel Room 2 and pay $500 to hire him.
            </p>
          )}
          
          {achievement.name === 'Rolling in Style' && (
            <p>
              Visit Shred Shack near the Hardware store to purchase the Golden Skateboard for $1,500.
            </p>
          )}
          
          {achievement.name === 'Businessman' && (
            <p>
              Focus on mixing high-value drugs and selling to customers with high spending limits. 
              Keep reinvesting profits into better ingredients and properties.
            </p>
          )}
          
          {achievement.name === 'Upstanding Citizen' && (
            <p>
              Throw away trash at any Cash for Trash machine. You need 500 pieces total. 
              This can be done gradually while playing normally.
            </p>
          )}
          
          {achievement.name === 'Urban Artist' && (
            <p>
              Buy 25 graffiti cans from the gas mart for $250 total, then spray graffiti 
              on 25 different surfaces in a single save.
            </p>
          )}
          
          {achievement.name === 'Finishing the Job' && (
            <div className="space-y-4">
              <p>Follow these steps carefully:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Choose to go hostile with the cartel</li>
                <li>Unlock the Uptown region</li>
                <li>Talk to Uncle Nelson at a payphone</li>
                <li>Get RDX from Billy Kramer (20x Moderate quality cocaine)</li>
                <li>Pay Sam Thompson $10,000 to dig a tunnel</li>
                <li>Talk to Stan Carney about the bomb</li>
                <li>Kill the &quot;Stranger&quot; in Docks at night</li>
                <li>Get the bomb from Stan</li>
                <li>Rig the bomb in the tunnel</li>
                <li>Blow up the manor</li>
              </ol>
            </div>
          )}
        </div>
      </Card>

      {/* Related Links */}
      <Card title="Related Pages">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/achievements" className="text-sm text-[#3847f5] hover:underline">
            View all achievements →
          </Link>
          <Link href="/drugs" className="text-sm text-[#3847f5] hover:underline">
            View all drugs →
          </Link>
        </div>
      </Card>
    </div>
  );
}
