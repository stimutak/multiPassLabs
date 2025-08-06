import { SimpleHeader } from '@/components/ui/simple-header';

export default function HomePage() {
  return (
    <>
      <SimpleHeader />
      
      <main className="relative min-h-screen">
        {/* Hero Section with Gradient Background */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-violet-800 to-pink-900 opacity-90" />
          
          {/* Animated Orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-4000" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
              MultiPass
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-violet-300">
                Labs
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              An immersive platform where art meets technology. 
              Experience interactive visuals, discover unique artwork, and explore audio-reactive experiences.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="/en/gallery" 
                className="group relative px-8 py-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <span className="relative z-10">Explore Gallery</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity" />
              </a>
              
              <a href="/en/shop" 
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-xl hover:shadow-2xl">
                Visit Shop
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-20 px-4 bg-black text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Experience Art Differently
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Shop Card */}
              <a href="/en/shop" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/50 to-purple-700/30 p-8 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
                <div className="relative z-10">
                  <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5 7m2 6l1.5 8M12 13l1.5 8m4.5-8l1.5 8M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Shop</h3>
                  <p className="text-gray-300">Discover and collect unique digital and physical artworks</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

              {/* Gallery Card */}
              <a href="/en/gallery" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-900/50 to-violet-700/30 p-8 backdrop-blur-sm border border-violet-500/20 hover:border-violet-400/40 transition-all duration-300 hover:scale-105">
                <div className="relative z-10">
                  <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Gallery</h3>
                  <p className="text-gray-300">Immerse yourself in interactive visual experiences</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

              {/* Music Card */}
              <a href="/en/music" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-900/50 to-pink-700/30 p-8 backdrop-blur-sm border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300 hover:scale-105">
                <div className="relative z-10">
                  <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Music</h3>
                  <p className="text-gray-300">Experience audio-reactive visuals and soundscapes</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600/0 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}