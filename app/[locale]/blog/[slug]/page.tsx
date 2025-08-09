'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SimpleHeader } from '@/components/ui/simple-header';
import { getPostBySlug } from '@/lib/blog-data';
import { getEntityById, LAB_ENTITIES } from '@/lib/entities';
import { formatDate } from '@/lib/utils';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';

export default function BlogPostPage() {
  const params = useParams();
  const _router = useRouter();
  const locale = useLocale();
  const slug = params.slug as string;
  
  const post = getPostBySlug(slug);
  const entity = post ? getEntityById(post.entityId) : null;
  
  // Use the post's entity or default to a random one for theming
  const [currentEntity, setCurrentEntity] = useState(entity || LAB_ENTITIES[0]);
  
  useEffect(() => {
    if (entity) {
      setCurrentEntity(entity);
    }
  }, [entity]);

  if (!post || !entity) {
    return (
      <>
        <SimpleHeader currentEntity={currentEntity} />
        <main className="min-h-screen bg-black pt-20 md:pt-12 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-16">
              <h1 className="text-2xl font-mono mb-4" style={{ color: currentEntity?.color }}>
                404: Post Not Found
              </h1>
              <p className="text-green-400/60 mb-8">This experiment has been classified or removed.</p>
              <Link 
                href={`/${locale}/blog`}
                className="inline-block px-6 py-2 border rounded font-mono text-sm hover:bg-white/10 transition-colors"
                style={{ borderColor: currentEntity?.color, color: currentEntity?.color }}
              >
                ← Return to Blog
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Parse markdown-style content
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactElement[] = [];
    let currentIndex = 0;

    lines.forEach((line, i) => {
      // Code blocks
      if (line.startsWith('```')) {
        const endIndex = lines.findIndex((l, idx) => idx > i && l.startsWith('```'));
        if (endIndex > i) {
          const codeLines = lines.slice(i + 1, endIndex);
          const _language = line.replace('```', '').trim();
          elements.push(
            <pre 
              key={currentIndex++}
              className="bg-black/50 border rounded p-4 overflow-x-auto my-4 font-mono text-sm"
              style={{ borderColor: `${entity.color}30` }}
            >
              <code className="text-green-400">
                {codeLines.join('\n')}
              </code>
            </pre>
          );
          lines.splice(i, endIndex - i + 1);
          return;
        }
      }

      // Headers
      if (line.startsWith('### ')) {
        elements.push(
          <h4 key={currentIndex++} className="text-lg font-mono mt-6 mb-3" style={{ color: entity.color }}>
            {line.replace('### ', '')}
          </h4>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h3 key={currentIndex++} className="text-xl font-mono mt-8 mb-4" style={{ color: entity.color }}>
            {line.replace('## ', '')}
          </h3>
        );
      } else if (line.startsWith('# ')) {
        elements.push(
          <h2 key={currentIndex++} className="text-2xl font-mono mt-8 mb-4" style={{ color: entity.color }}>
            {line.replace('# ', '')}
          </h2>
        );
      }
      // Horizontal rule
      else if (line === '---') {
        elements.push(
          <hr key={currentIndex++} className="my-8 border-t" style={{ borderColor: `${entity.color}20` }} />
        );
      }
      // Blockquote
      else if (line.startsWith('>')) {
        elements.push(
          <blockquote key={currentIndex++} className="border-l-4 pl-4 my-4 italic" style={{ borderColor: entity.color, color: `${entity.color}cc` }}>
            {line.replace('> ', '')}
          </blockquote>
        );
      }
      // List items
      else if (line.startsWith('• ') || line.startsWith('- ')) {
        elements.push(
          <li key={currentIndex++} className="ml-6 mb-2 text-green-400/80">
            {line.replace(/^[•-]\s/, '')}
          </li>
        );
      }
      // Regular paragraph
      else if (line.trim()) {
        // Handle inline code
        const processedLine = line.replace(/`([^`]+)`/g, (_, code) => 
          `<code class="px-1 py-0.5 rounded bg-black/50 text-xs font-mono" style="color: ${entity.color}; border: 1px solid ${entity.color}30">${code}</code>`
        );
        
        elements.push(
          <p key={currentIndex++} className="mb-4 text-green-400/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: processedLine }} />
        );
      }
    });

    return elements;
  };

  return (
    <>
      <SimpleHeader currentEntity={currentEntity} />
      <main className="min-h-screen bg-black pt-20 md:pt-12">
        {/* Terminal-style background pattern */}
        <div className="fixed inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent animate-scan" />
        </div>

        <article className="relative max-w-4xl mx-auto p-8">
          {/* Header */}
          <motion.header 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 pb-8 border-b"
            style={{ borderColor: `${entity.color}20` }}
          >
            {/* Back button */}
            <Link 
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 mb-6 text-sm font-mono transition-colors hover:opacity-80"
              style={{ color: entity.color }}
            >
              ← Back to Blog
            </Link>

            <h1 className="text-3xl md:text-4xl font-mono mb-4 leading-tight" style={{ color: entity.color }}>
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm font-mono">
              <div className="flex items-center gap-2">
                <span style={{ color: entity.color }}>{entity.signature}</span>
                <span className="text-green-400/40">•</span>
                <span className="text-green-400/60">{entity.role}</span>
              </div>
              <span className="text-green-400/40">•</span>
              <time className="text-green-400/60" dateTime={post.createdAt}>
                {formatDate(new Date(post.createdAt), locale)}
              </time>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex gap-2 mt-4 flex-wrap">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-mono rounded"
                    style={{
                      backgroundColor: `${entity.color}15`,
                      color: `${entity.color}cc`,
                      border: `1px solid ${entity.color}30`
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.header>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert max-w-none"
          >
            {renderContent(post.content)}
          </motion.div>

          {/* Footer */}
          <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 pt-8 border-t"
            style={{ borderColor: `${entity.color}20` }}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-mono" style={{ color: `${entity.color}66` }}>
                // End of transmission from {entity.name}
              </div>
              <Link 
                href={`/${locale}/blog`}
                className="px-4 py-2 border rounded font-mono text-sm hover:bg-white/10 transition-colors"
                style={{ borderColor: entity.color, color: entity.color }}
              >
                More Experiments →
              </Link>
            </div>
          </motion.footer>
        </article>
      </main>
    </>
  );
}