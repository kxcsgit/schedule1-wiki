import { achievements } from '@/lib/static-data';
import { Card, StatCard, SectionHeader, Breadcrumb, Tag } from '@/components/ui';
import Link from 'next/link';

export default function AchievementsPage() {
  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Achievements' }
      ]} />

      <SectionHeader 
        title="Achievements" 
        description={`${achievements.length} achievements to unlock`} 
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Achievements" value={achievements.length.toString()} />
        <StatCard label="Story Related" value="4" description="Required" />
        <StatCard label="Optional" value="9" description="Challenge" />
        <StatCard label="Hardest" value="Finishing the Job" description="End game" />
      </div>

      {/* Achievement List */}
      <div className="space-y-4">
        {achievements.map(achievement => (
          <Card 
            key={achievement.name} 
            title={achievement.name} 
            href={`/achievements/${achievement.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="hover-lift"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                <p className="text-xs text-gray-500">
                  Click for detailed completion guide →
                </p>
              </div>
              <Tag variant="accent" className="ml-4">
                Achievement
              </Tag>
            </div>
          </Card>
        ))}
      </div>

      {/* Achievement Guide */}
      <div className="mt-12">
        <SectionHeader title="Achievement Guide" description="Tips for completionists" />
        
        <Card title="General Tips">
          <div className="space-y-4 text-sm text-gray-600">
            <p>
              Most achievements in Schedule I can be unlocked through natural gameplay. 
              Some require specific actions or reaching certain milestones.
            </p>
            <div className="bg-gray-50 rounded p-4">
              <p className="font-mono text-xs text-gray-500 mb-2">Recommended Order:</p>
              <ul className="space-y-1">
                <li>1. Complete the prologue → <span className="text-[#3847f5]">Left in the Dust</span></li>
                <li>2. Make your first sale → <span className="text-[#3847f5]">Welcome to Hyland Point</span></li>
                <li>3. Mix a valuable product → <span className="text-[#3847f5]">Master Chef</span></li>
                <li>4. Get arrested → <span className="text-[#3847f5]">The Long Arm of the Law</span></li>
                <li>5. Hire a dealer → <span className="text-[#3847f5]">Dodgy Dealing</span></li>
              </ul>
            </div>
            <p>
              The hardest achievement is <span className="text-[#3847f5]">Finishing the Job</span>, 
              which requires completing the end-game storyline.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
