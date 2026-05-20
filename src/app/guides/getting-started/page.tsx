import { Card, SectionHeader, Breadcrumb, Tag } from '@/components/ui';
import Link from 'next/link';

export default function GettingStartedPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Getting Started' }
      ]} />

      <SectionHeader 
        title="Getting Started" 
        description="New to Schedule I? This guide will help you get started" 
      />

      {/* Overview */}
      <Card title="What is Schedule I?" className="mb-8">
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            Schedule I is a drug dealer simulator game where you produce and sell drugs 
            in the fictional city of Hyland Point. You start with nothing and work your 
            way up to becoming a drug empire.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="font-mono text-xs text-gray-500">Developer</p>
              <p className="font-bold">TVGS</p>
            </div>
            <div>
              <p className="font-mono text-xs text-gray-500">Release</p>
              <p className="font-bold">March 24, 2025</p>
            </div>
            <div>
              <p className="font-mono text-xs text-gray-500">Engine</p>
              <p className="font-bold">Unity 2022</p>
            </div>
            <div>
              <p className="font-mono text-xs text-gray-500">Players</p>
              <p className="font-bold">1-4 Co-op</p>
            </div>
          </div>
        </div>
      </Card>

      {/* First Steps */}
      <Card title="Your First Steps" className="mb-8">
        <div className="space-y-6">
          <div>
            <h4 className="font-mono text-sm font-bold text-gray-900 mb-2">
              <Tag variant="accent">1</Tag> Complete the Prologue
            </h4>
            <p className="text-sm text-gray-600">
              The game starts with a tutorial that teaches you the basics. 
              Follow the instructions to learn how to move, interact with objects, 
              and make your first sale. This unlocks the <span className="text-[#3847f5]">Left in the Dust</span> achievement.
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-sm font-bold text-gray-900 mb-2">
              <Tag variant="accent">2</Tag> Get Your First Seeds
            </h4>
            <p className="text-sm text-gray-600">
              Text <span className="text-[#3847f5]">Albert Hoover</span> to order OG Kush seeds. 
              He's located behind Dan's Hardware in Northtown. 
              Deposit money into his stash to pay for the seeds.
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-sm font-bold text-gray-900 mb-2">
              <Tag variant="accent">3</Tag> Grow Your First Plant
            </h4>
            <p className="text-sm text-gray-600">
              Plant the seeds in a pot and wait for them to grow. 
              Make sure to water them regularly. 
              Once grown, harvest the marijuana.
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-sm font-bold text-gray-900 mb-2">
              <Tag variant="accent">4</Tag> Make Your First Sale
            </h4>
            <p className="text-sm text-gray-600">
              Find a customer and sell your product. 
              Be careful not to sell to undercover cops! 
              This unlocks the <span className="text-[#3847f5]">Welcome to Hyland Point</span> achievement.
            </p>
          </div>
        </div>
      </Card>

      {/* Basic Mechanics */}
      <Card title="Basic Mechanics" className="mb-8">
        <div className="space-y-6">
          <div>
            <h4 className="font-mono text-sm font-bold text-gray-900 mb-2">Drug Production</h4>
            <p className="text-sm text-gray-600">
              There are 4 types of drugs you can produce:
            </p>
            <ul className="text-sm text-gray-600 space-y-2 mt-2">
              <li>• <strong>Marijuana:</strong> Easiest to produce. Seeds → Plant → Harvest</li>
              <li>• <strong>Methamphetamine:</strong> Requires chemicals and equipment</li>
              <li>• <strong>Shrooms:</strong> Requires mushroom supplies and cold environment</li>
              <li>• <strong>Cocaine:</strong> Most valuable but longest production time</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono text-sm font-bold text-gray-900 mb-2">Mixing</h4>
            <p className="text-sm text-gray-600">
              You can mix drugs with ingredients to change their effects and increase their value. 
              Each ingredient has a base effect and can replace existing effects.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <Link href="/guides/mixing-calculator" className="text-[#3847f5] hover:underline">
                Try the Mixing Calculator →
              </Link>
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-sm font-bold text-gray-900 mb-2">Selling</h4>
            <p className="text-sm text-gray-600">
              Sell drugs to customers for cash. Be careful of:
            </p>
            <ul className="text-sm text-gray-600 space-y-2 mt-2">
              <li>• <strong>Undercover cops:</strong> They'll arrest you if you sell to them</li>
              <li>• <strong>Rival dealers:</strong> They might try to steal your customers</li>
              <li>• <strong>Daily limits:</strong> Each customer has a spending limit</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Avoiding Police */}
      <Card title="Avoiding the Police" className="mb-8">
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            The police are a constant threat in Schedule I. Here's how to avoid them:
          </p>
          <div className="bg-gray-50 rounded p-4">
            <p className="font-mono text-xs text-gray-500 mb-2">Tips:</p>
            <ul className="space-y-2">
              <li>• <strong>Don't sell to cops:</strong> They'll arrest you immediately</li>
              <li>• <strong>Be discreet:</strong> Don't sell in public areas</li>
              <li>• <strong>Use alleys:</strong> Sell in secluded locations</li>
              <li>• <strong>Watch for sirens:</strong> If you hear sirens, run!</li>
              <li>• <strong>Use the skateboard:</strong> It's faster than running</li>
            </ul>
          </div>
          <p>
            Getting arrested unlocks <span className="text-[#3847f5]">The Long Arm of the Law</span> achievement, 
            so it's not all bad!
          </p>
        </div>
      </Card>

      {/* Money Management */}
      <Card title="Money Management" className="mb-8">
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            Managing your money is crucial for success:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded p-4">
              <p className="font-mono text-xs text-gray-500 mb-2">Income:</p>
              <ul className="space-y-1">
                <li>• Selling drugs to customers</li>
                <li>• Hiring dealers to sell for you</li>
                <li>• Completing quests</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded p-4">
              <p className="font-mono text-xs text-gray-500 mb-2">Expenses:</p>
              <ul className="space-y-1">
                <li>• Seeds and ingredients</li>
                <li>• Properties</li>
                <li>• Equipment</li>
                <li>• Laundering fees</li>
              </ul>
            </div>
          </div>
          <p>
            <strong>Tip:</strong> Keep a balance between investing in your business 
            and saving for emergencies.
          </p>
        </div>
      </Card>

      {/* Next Steps */}
      <Card title="Next Steps" className="mb-8">
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            Once you've mastered the basics, here's what to do next:
          </p>
          <ul className="space-y-2">
            <li>• <strong>Unlock new ranks:</strong> Sell more product to gain XP and unlock new items</li>
            <li>• <strong>Buy better properties:</strong> Larger properties allow for more production</li>
            <li>• <strong>Hire dealers:</strong> They sell product for you, giving passive income</li>
            <li>• <strong>Experiment with mixing:</strong> Create high-value drug mixes</li>
            <li>• <strong>Complete achievements:</strong> Challenge yourself to unlock all achievements</li>
          </ul>
          <p>
            <Link href="/guides/rank-progression" className="text-[#3847f5] hover:underline">
              View Rank Progression Guide →
            </Link>
          </p>
        </div>
      </Card>

      {/* Useful Links */}
      <Card title="Useful Links">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-mono text-sm font-bold text-gray-900 mb-2">Game Resources</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <Link href="/drugs" className="text-[#3847f5] hover:underline">
                  All Drugs
                </Link>
              </li>
              <li>
                <Link href="/ingredients" className="text-[#3847f5] hover:underline">
                  All Ingredients
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-[#3847f5] hover:underline">
                  All Properties
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="text-[#3847f5] hover:underline">
                  All Achievements
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-sm font-bold text-gray-900 mb-2">Guides</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <Link href="/guides/mixing-calculator" className="text-[#3847f5] hover:underline">
                  Mixing Calculator
                </Link>
              </li>
              <li>
                <Link href="/guides/best-mixes" className="text-[#3847f5] hover:underline">
                  Best Mixing Recipes
                </Link>
              </li>
              <li>
                <Link href="/guides/effect-reference" className="text-[#3847f5] hover:underline">
                  Effect Reference
                </Link>
              </li>
              <li>
                <Link href="/guides/rank-progression" className="text-[#3847f5] hover:underline">
                  Rank Progression
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
