'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('common');
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold gradient-text">
          MultiPass Labs
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Immersive international art platform with real-time visuals and audio-reactive content
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-center">
            {t('navigation.shop')}
          </Link>
          
          <Link href="/gallery" className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 text-center">
            {t('navigation.gallery')}
          </Link>
          
          <Link href="/music" className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 text-center">
            {t('navigation.music')}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="glass p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{t('navigation.shop')}</h3>
            <p className="text-gray-600">
              Discover unique artwork and exclusive pieces
            </p>
          </div>
          
          <div className="glass p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{t('navigation.gallery')}</h3>
            <p className="text-gray-600">
              Explore immersive visual experiences
            </p>
          </div>
          
          <div className="glass p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{t('navigation.music')}</h3>
            <p className="text-gray-600">
              Experience audio-reactive visuals
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}