'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

import { LAB_ENTITIES } from '@/lib/entities';
import { PostCard } from '@/components/ui/post-card';
import { BLOG_POSTS, type BlogPost } from '@/lib/blog-data';

export default function BlogPage() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading delay for better UX
    setTimeout(() => {
      // Filter posts based on selected entity
      const filteredPosts = selectedEntity 
        ? BLOG_POSTS.filter(post => post.published && post.entityId === selectedEntity)
        : BLOG_POSTS.filter(post => post.published);
      
      setPosts(filteredPosts);
      setLoading(false);
    }, 300);
  }, [selectedEntity]);

  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

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

        {/* Entity Filter */}
        <div className="mb-8">
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

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-muted-foreground">{t('loading')}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">
              {selectedEntity ? t('noPostsForEntity') : t('noPosts')}
            </p>
            {selectedEntity && (
              <button
                onClick={() => setSelectedEntity(null)}
                className="px-4 py-2 bg-white text-black rounded-full font-mono text-sm hover:bg-white/90 transition-colors"
              >
                {t('showAllPosts')}
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-mono mb-6">{t('featured')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      excerpt={post.excerpt}
                      entityId={post.entityId}
                      createdAt={new Date(post.createdAt)}
                      featured={post.featured}
                      tags={post.tags}
                      slug={post.slug}
                      locale={locale}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Regular Posts */}
            {regularPosts.length > 0 && (
              <section>
                <h2 className="text-2xl font-mono mb-6">
                  {featuredPosts.length > 0 ? t('latest') : t('allPosts')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      excerpt={post.excerpt}
                      entityId={post.entityId}
                      createdAt={new Date(post.createdAt)}
                      featured={post.featured}
                      tags={post.tags}
                      slug={post.slug}
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