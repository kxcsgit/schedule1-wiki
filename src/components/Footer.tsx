export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-mono text-sm font-bold text-gray-900 mb-3">Schedule I Wiki</h3>
            <p className="text-sm text-gray-600">
              A comprehensive wiki for Schedule I, the drug dealer simulator game. 
              Find drugs, ingredients, properties, and achievements.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-mono text-sm font-bold text-gray-900 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://store.steampowered.com/app/3205720/Schedule_I/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-sm text-gray-600 hover:text-[#3847f5] transition-colors">
                  Steam Store
                </a>
              </li>
              <li>
                <a href="https://schedule-1.fandom.com/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-sm text-gray-600 hover:text-[#3847f5] transition-colors">
                  Fandom Wiki
                </a>
              </li>
              <li>
                <a href="https://www.reddit.com/r/Schedule_I/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-sm text-gray-600 hover:text-[#3847f5] transition-colors">
                  Reddit Community
                </a>
              </li>
            </ul>
          </div>

          {/* Credits */}
          <div>
            <h3 className="font-mono text-sm font-bold text-gray-900 mb-3">Credits</h3>
            <p className="text-sm text-gray-600">
              Data sourced from Fandom Wiki and Steam API. 
              All game assets belong to TVGS.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="font-mono text-xs text-gray-500 text-center">
            © 2025 Schedule I Wiki. Not affiliated with TVGS.
          </p>
        </div>
      </div>
    </footer>
  );
}
