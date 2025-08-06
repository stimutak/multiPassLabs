import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const t = useTranslations('common');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold gradient-text">
          MultiPass Labs
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Immersive international art platform with real-time visuals and audio-reactive content
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button size="lg" className="w-full sm:w-auto">
              {t('navigation.shop')}
            </Button>
          </Link>
          
          <Link href="/gallery">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {t('navigation.gallery')}
            </Button>
          </Link>
          
          <Link href="/music">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {t('navigation.music')}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="glass p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">
              {t('navigation.shop')}
            </h3>
            <p className="text-muted-foreground">
              Discover unique artwork and exclusive pieces
            </p>
          </div>
          
          <div className="glass p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">
              {t('navigation.gallery')}
            </h3>
            <p className="text-muted-foreground">
              Explore immersive visual experiences
            </p>
          </div>
          
          <div className="glass p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">
              {t('navigation.music')}
            </h3>
            <p className="text-muted-foreground">
              Experience audio-reactive visuals
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}