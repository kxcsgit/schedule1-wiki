import { Card, SectionHeader, Breadcrumb } from '@/components/ui';
import Link from 'next/link';

export default function GuidesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Guides' }
      ]} />

      <SectionHeader 
        title="Guides" 
        description="Comprehensive guides and tools for Schedule I" 
      />

      {/* Guide List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Mixing Calculator" href="/guides/mixing-calculator" className="hover-lift">
          <p className="text-sm text-gray-600 mb-3">
            Calculate the effects and value of drug mixes before you make them.
          </p>
          <div className="bg-gray-50 rounded p-3">
            <p className="font-mono text-xs text-gray-500 mb-1">Features:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Select base drug and ingredients</li>
              <li>• See resulting effects</li>
              <li>• Calculate final value and profit</li>
            </ul>
          </div>
        </Card>

        <Card title="Best Mixing Recipes" href="/guides/best-mixes" className="hover-lift">
          <p className="text-sm text-gray-600 mb-3">
            The most profitable mixing recipes for each drug type.
          </p>
          <div className="bg-gray-50 rounded p-3">
            <p className="font-mono text-xs text-gray-500 mb-1">Includes:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• OG Kush best mixes (1-8 steps)</li>
              <li>• Meth and Cocaine recipes</li>
              <li>• Cost vs profit analysis</li>
            </ul>
          </div>
        </Card>

        <Card title="Effect Reference" href="/guides/effect-reference" className="hover-lift">
          <p className="text-sm text-gray-600 mb-3">
            Complete list of all 34 effects and their replacements.
          </p>
          <div className="bg-gray-50 rounded p-3">
            <p className="font-mono text-xs text-gray-500 mb-1">Contains:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• All effect descriptions</li>
              <li>• Effect replacement chains</li>
              <li>• Value multipliers</li>
            </ul>
          </div>
        </Card>

        <Card title="Rank Progression" href="/guides/rank-progression" className="hover-lift">
          <p className="text-sm text-gray-600 mb-3">
            All ranks and what they unlock.
          </p>
          <div className="bg-gray-50 rounded p-3">
            <p className="font-mono text-xs text-gray-500 mb-1">Unlocks:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• New ingredients</li>
              <li>• New suppliers</li>
              <li>• New properties</li>
            </ul>
          </div>
        </Card>

        <Card title="Supplier Guide" href="/guides/supplier-guide" className="hover-lift">
          <p className="text-sm text-gray-600 mb-3">
            All suppliers, their locations, and what they sell.
          </p>
          <div className="bg-gray-50 rounded p-3">
            <p className="font-mono text-xs text-gray-500 mb-1">Suppliers:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Albert Hoover (Seeds)</li>
              <li>• Shirley Watts (Pseudo)</li>
              <li>• Oscar (Chemicals)</li>
              <li>• Fungal Phil (Mushroom supplies)</li>
              <li>• Salvador Moreno (Coca seeds)</li>
            </ul>
          </div>
        </Card>

        <Card title="Getting Started" href="/guides/getting-started" className="hover-lift">
          <p className="text-sm text-gray-600 mb-3">
            New to Schedule I? This guide will help you get started.
          </p>
          <div className="bg-gray-50 rounded p-3">
            <p className="font-mono text-xs text-gray-500 mb-1">Topics:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Basic gameplay mechanics</li>
              <li>• Your first drug production</li>
              <li>• Making your first sale</li>
              <li>• Avoiding the police</li>
            </ul>
          </div>
        </Card>
      </div>

      {/* Community Resources */}
      <div className="mt-12">
        <SectionHeader title="Community Resources" description="External guides and communities" />
        
        <Card title="External Links">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-mono text-sm font-bold text-gray-900 mb-2">Official</h4>
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
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-sm font-bold text-gray-900 mb-2">Community</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>
                  <a href="https://schedule-1.fandom.com/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-[#3847f5] hover:underline">
                    Fandom Wiki
                  </a>
                </li>
                <li>
                  <a href="https://www.reddit.com/r/Schedule_I/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-[#3847f5] hover:underline">
                    Reddit Community
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
