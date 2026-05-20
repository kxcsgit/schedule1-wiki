import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-mono text-lg font-bold text-gray-900">Schedule</span>
            <span className="font-mono text-lg font-bold text-[#3847f5]">I</span>
            <span className="font-mono text-xs text-gray-500 ml-1">Wiki</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/drugs" className="font-mono text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Drugs
            </Link>
            <Link href="/ingredients" className="font-mono text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Ingredients
            </Link>
            <Link href="/properties" className="font-mono text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Properties
            </Link>
            <Link href="/achievements" className="font-mono text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Achievements
            </Link>
            <Link href="/guides" className="font-mono text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Guides
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-gray-600 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
