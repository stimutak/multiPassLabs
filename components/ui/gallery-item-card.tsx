import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './card';
import { EntitySignature } from './entity-signature';
import { formatDate, cn } from '@/lib/utils';
import { getEntityById, getEntityCSSVars } from '@/lib/entities';
import { useTranslations } from 'next-intl';

interface GalleryItemCardProps {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  videoUrl: string | null;
  type: string;
  entityId: string;
  createdAt: Date;
  featured?: boolean;
  tags: string[];
  locale: string;
  className?: string;
}

export function GalleryItemCard({
  id,
  title,
  description,
  imageUrl,
  videoUrl,
  type,
  entityId,
  createdAt,
  featured = false,
  tags,
  locale,
  className
}: GalleryItemCardProps) {
  const t = useTranslations('gallery');
  const entity = getEntityById(entityId);
  
  if (!entity) {
    return null;
  }

  const cssVars = getEntityCSSVars(entity);

  return (
    <Card 
      className={cn(
        'group transition-all duration-300 hover:shadow-lg overflow-hidden',
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
      {/* Media */}
      <div className="relative aspect-video overflow-hidden">
        {type === 'video' && videoUrl ? (
          <video
            src={videoUrl}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            muted
            loop
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => e.currentTarget.pause()}
          />
        ) : (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${entity.color}30`, border: `2px solid ${entity.color}` }}
            >
              {type === 'video' ? '▶' : '👁'}
            </div>
            <p className="text-sm font-mono" style={{ color: entity.color }}>
              {type.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Type badge */}
        <div className="absolute top-2 right-2">
          <span 
            className="px-2 py-1 text-xs font-mono rounded backdrop-blur-sm"
            style={{
              backgroundColor: `${entity.color}40`,
              color: 'white',
              border: `1px solid ${entity.color}`
            }}
          >
            {type}
          </span>
        </div>

        {featured && (
          <div className="absolute top-2 left-2">
            <span 
              className="px-2 py-1 text-xs font-mono rounded backdrop-blur-sm"
              style={{
                backgroundColor: `${entity.color}80`,
                color: 'white',
                border: `2px solid ${entity.color}`
              }}
            >
              FEATURED
            </span>
          </div>
        )}
      </div>

      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle 
            className="group-hover:text-white transition-colors line-clamp-1"
            style={{ 
              color: featured ? entity.color : undefined 
            }}
          >
            {title}
          </CardTitle>
        </div>
        
        <EntitySignature 
          entityId={entityId} 
          variant="compact"
        />
      </CardHeader>

      {description && (
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
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
            {tags.slice(0, 2).map((tag) => (
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
            {tags.length > 2 && (
              <span className="text-xs text-muted-foreground">
                +{tags.length - 2}
              </span>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}