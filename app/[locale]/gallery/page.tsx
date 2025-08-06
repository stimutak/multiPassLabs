import { useTranslations } from 'next-intl';

export default function GalleryPage() {
  const t = useTranslations('common');

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{t('navigation.gallery')}</h1>
        <p className="text-muted-foreground mb-8">
          Explore immersive visual experiences and artwork
        </p>
        
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            Gallery functionality coming soon...
          </p>
        </div>
      </div>
    </main>
  );
}