import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './card';
import { EntitySignature } from './entity-signature';
import { formatDate, cn } from '@/lib/utils';
import { getEntityById, getEntityCSSVars } from '@/lib/entities';

interface PostCardProps {
  id: string;
  title: string;
  excerpt: string | null;
  entityId: string;
  createdAt: Date;
  featured?: boolean;
  tags: string[];
  slug: string;
  locale: string;
  className?: string;
}

export function PostCard({
  id: _id,
  title,
  excerpt,
  entityId,
  createdAt,
  featured = false,
  tags,
  slug,
  locale,
  className
}: PostCardProps) {
  const entity = getEntityById(entityId);
  
  if (!entity) {
    return null;
  }

  const cssVars = getEntityCSSVars(entity);

  return (
    <Link href={`/${locale}/blog/${slug}` as any}>
      <Card 
        className={cn(
          'group transition-all duration-300 hover:shadow-lg',
          'border-2 hover:border-opacity-80 cursor-pointer',
          'bg-black/40 backdrop-blur-sm',
          featured && 'ring-2 ring-offset-2 ring-offset-black',
          className
        )}
        style={{
          ...cssVars,
          borderColor: `${entity.color}33`,
        } as React.CSSProperties}
      >
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <CardTitle 
              className="group-hover:text-white transition-colors line-clamp-2"
              style={{ 
                color: featured ? entity.color : undefined 
              }}
            >
              {title}
            </CardTitle>
            {featured && (
              <span 
                className="px-2 py-1 text-xs font-mono rounded"
                style={{
                  backgroundColor: `${entity.color}20`,
                  color: entity.color,
                  border: `1px solid ${entity.color}40`
                }}
              >
                FEATURED
              </span>
            )}
          </div>
          
          <EntitySignature 
            entityId={entityId} 
            variant="compact"
          />
        </CardHeader>

        {excerpt && (
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {excerpt}
            </p>
          </CardContent>
        )}

        <CardFooter className="flex items-center justify-between pt-4">
          <time 
            className="text-xs text-muted-foreground font-mono"
            dateTime={createdAt.toISOString()}
          >
            {formatDate(createdAt, locale)}
          </time>
          
          {tags.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {tags.slice(0, 3).map((tag) => (
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
              {tags.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}