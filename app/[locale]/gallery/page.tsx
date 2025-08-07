'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

import { LAB_ENTITIES } from '@/lib/entities';
import { GalleryItemCard } from '@/components/ui/gallery-item-card';

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  videoUrl: string | null;
  type: string;
  entityId: string;
  tags: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function GalleryPage() {
  const t = useTranslations('gallery');
  const locale = useLocale();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const queryParams = new URLSearchParams({
          limit: '50',
          ...(selectedEntity && { entityId: selectedEntity }),
          ...(selectedType && { type: selectedType })
        });
        
        const response = await fetch(`/api/gallery?${queryParams}`);
        if (response.ok) {
          const data = await response.json();
          setItems(data.map((item: any) => ({
            ...item,
            createdAt: new Date(item.createdAt).toISOString(),
            updatedAt: new Date(item.updatedAt).toISOString()
          })));
        }
      } catch (error) {
        console.error('Error fetching gallery items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [selectedEntity, selectedType]);

  const featuredItems = items.filter(item => item.featured);
  const regularItems = items.filter(item => !item.featured);
  const itemTypes = [...new Set(items.map(item => item.type))];

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 font-mono">
            {t('title')}
          </h1>
          <p className="text-muted-foreground mb-6">
            {t('subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-6">
          {/* Entity Filter */}
          <div>
            <h3 className="text-lg font-mono mb-4">{t('filterByEntity')}</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedEntity(null)}
                className={`px-4 py-2 rounded-full font-mono text-sm transition-colors ${
                  !selectedEntity
                    ? 'bg-white text-black'
                    : 'bg-black/40 text-white border border-white/20 hover:bg-white/10'
                }`}
              >
                {t('allEntities')}
              </button>
              {LAB_ENTITIES.map((entity) => (
                <button
                  key={entity.id}
                  onClick={() => setSelectedEntity(entity.id)}
                  className={`px-4 py-2 rounded-full font-mono text-sm transition-colors border ${
                    selectedEntity === entity.id
                      ? 'text-black'
                      : 'text-white hover:bg-white/10'
                  }`}
                  style={{
                    backgroundColor: selectedEntity === entity.id ? entity.color : 'transparent',
                    borderColor: entity.color
                  }}
                >
                  {entity.signature}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          {itemTypes.length > 0 && (
            <div>
              <h3 className="text-lg font-mono mb-4">{t('filterByType')}</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedType(null)}
                  className={`px-4 py-2 rounded-full font-mono text-sm transition-colors ${
                    !selectedType
                      ? 'bg-white text-black'
                      : 'bg-black/40 text-white border border-white/20 hover:bg-white/10'
                  }`}
                >
                  {t('allTypes')}
                </button>
                {itemTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-full font-mono text-sm transition-colors border border-white/20 ${
                      selectedType === type
                        ? 'bg-white text-black'
                        : 'bg-black/40 text-white hover:bg-white/10'
                    }`}
                  >
                    {type.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-muted-foreground">{t('loading')}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">
              {selectedEntity || selectedType ? t('noItemsForFilter') : t('noItems')}
            </p>
            {(selectedEntity || selectedType) && (
              <div className="space-x-4">
                {selectedEntity && (
                  <button
                    onClick={() => setSelectedEntity(null)}
                    className="px-4 py-2 bg-white text-black rounded-full font-mono text-sm hover:bg-white/90 transition-colors"
                  >
                    {t('clearEntityFilter')}
                  </button>
                )}
                {selectedType && (
                  <button
                    onClick={() => setSelectedType(null)}
                    className="px-4 py-2 bg-white text-black rounded-full font-mono text-sm hover:bg-white/90 transition-colors"
                  >
                    {t('clearTypeFilter')}
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Featured Items */}
            {featuredItems.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-mono mb-6">{t('featured')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredItems.map((item) => (
                    <GalleryItemCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      description={item.description}
                      imageUrl={item.imageUrl}
                      videoUrl={item.videoUrl}
                      type={item.type}
                      entityId={item.entityId}
                      createdAt={new Date(item.createdAt)}
                      featured={item.featured}
                      tags={item.tags}
                      locale={locale}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Regular Items */}
            {regularItems.length > 0 && (
              <section>
                <h2 className="text-2xl font-mono mb-6">
                  {featuredItems.length > 0 ? t('latest') : t('allItems')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularItems.map((item) => (
                    <GalleryItemCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      description={item.description}
                      imageUrl={item.imageUrl}
                      videoUrl={item.videoUrl}
                      type={item.type}
                      entityId={item.entityId}
                      createdAt={new Date(item.createdAt)}
                      featured={item.featured}
                      tags={item.tags}
                      locale={locale}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}