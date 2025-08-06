export function SimpleHeader() {
  return (
    <header className="fixed top-0 w-full z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/en" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
          MultiPass Labs
        </a>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="/en/shop" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Shop
          </a>
          <a href="/en/gallery" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Gallery
          </a>
          <a href="/en/music" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Music
          </a>
        </div>
      </nav>
    </header>
  );
}