import { useTranslations } from 'next-intl';

export default function ShopPage() {
  const t = useTranslations('shop');

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-muted-foreground mb-8">{t('description')}</p>
        
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            Shop functionality coming soon...
          </p>
        </div>
      </div>
    </main>
  );
}