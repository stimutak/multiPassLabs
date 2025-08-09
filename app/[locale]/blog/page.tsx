'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { SimpleHeader } from '@/components/ui/simple-header';
import { LAB_ENTITIES, getEntityById } from '@/lib/entities';
import { PostCard } from '@/components/ui/post-card';
import { BLOG_POSTS, type BlogPost } from '@/lib/blog-data';
import { MetallicWaves } from '@/components/backgrounds/metallic-waves';
import { motion } from 'framer-motion';

export default function BlogPage() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  
  // Get the entity of the first/featured post for theming
  const featuredPost = BLOG_POSTS.find(p => p.published && p.featured) || BLOG_POSTS[0];
  const featuredEntity = featuredPost ? getEntityById(featuredPost.entityId) : LAB_ENTITIES[0];
  const [currentEntity, setCurrentEntity] = useState(featuredEntity || LAB_ENTITIES[0]);

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
  
  // Update entity when selected entity changes
  useEffect(() => {
    if (selectedEntity) {
      const entity = getEntityById(selectedEntity);
      if (entity) {
        setCurrentEntity(entity);
      }
    } else {
      // Reset to featured entity when no filter
      setCurrentEntity(featuredEntity || LAB_ENTITIES[0]!);
    }
  }, [selectedEntity, featuredEntity]);

  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <>
      <SimpleHeader currentEntity={currentEntity} />
      <MetallicWaves entityColor={currentEntity?.color} />
      
      <main className="min-h-screen bg-black pt-20 md:pt-12 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 font-mono" style={{ color: currentEntity?.color }}>
            // {t('title') || 'EXPERIMENTAL TRANSMISSIONS'}
          </h1>
          <p className="text-green-400/60 mb-6 font-mono">
            {t('subtitle') || 'Discoveries and technical insights from the lab collective'}
          </p>
        </motion.div>

        {/* Entity Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-mono mb-4 text-green-400">{t('filterByEntity') || 'FILTER BY ENTITY'}</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedEntity(null)}
              className={`px-4 py-2 rounded-full font-mono text-sm transition-colors border ${
                !selectedEntity
                  ? 'bg-green-400/20 text-green-400 border-green-400'
                  : 'bg-black/40 text-green-400/60 border-green-400/30 hover:bg-green-400/10'
              }`}
            >
              {t('allEntities') || 'ALL ENTITIES'}
            </button>
            {LAB_ENTITIES.map((entity) => (
              <button
                key={entity.id}
                onClick={() => setSelectedEntity(entity.id)}
                className={`px-4 py-2 rounded-full font-mono text-sm transition-all border ${
                  selectedEntity === entity.id
                    ? 'shadow-lg'
                    : 'hover:shadow-md'
                }`}
                style={{
                  backgroundColor: selectedEntity === entity.id ? `${entity.color}20` : 'transparent',
                  borderColor: entity.color,
                  color: entity.color,
                  textShadow: selectedEntity === entity.id ? `0 0 10px ${entity.color}66` : 'none'
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
    </>
  );
}