import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './card';
import { EntitySignature } from './entity-signature';
import { formatPrice, cn } from '@/lib/utils';
import { getEntityById, getEntityCSSVars } from '@/lib/entities';

interface ProductCardProps {
  id: string;
  title: string;
  description: string | null;
  price: number; // in cents
  images: string[];
  categoryId: string;
  entityId: string | null;
  featured?: boolean;
  available?: boolean;
  locale: string;
  className?: string;
}

export function ProductCard({
  id,
  title,
  description,
  price,
  images,
  categoryId: _categoryId,
  entityId,
  featured = false,
  available = true,
  locale,
  className
}: ProductCardProps) {
  const entity = entityId ? getEntityById(entityId) : null;
  
  const cssVars = entity ? getEntityCSSVars(entity) : {};
  const entityColor = entity?.color || '#666666';

  return (
    <Link href={`/${locale}/shop/product/${id}`}>
      <Card 
        className={cn(
          'group transition-all duration-300 hover:shadow-lg overflow-hidden',
          'border-2 hover:border-opacity-80 cursor-pointer',
          'bg-black/40 backdrop-blur-sm',
          !available && 'opacity-60',
          featured && 'ring-2 ring-offset-2 ring-offset-black',
          className
        )}
        style={{
          ...cssVars,
          borderColor: `${entityColor}33`,
        } as React.CSSProperties}
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          {images.length > 0 ? (
            <Image
              src={images[0]}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div 
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: `${entityColor}20` }}
            >
              <span className="text-6xl opacity-30">🛍</span>
            </div>
          )}
          
          {/* Overlay for out of stock */}
          {!available && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-mono text-lg">
                {t('outOfStock')}
              </span>
            </div>
          )}

          {/* Featured badge */}
          {featured && (
            <div className="absolute top-2 left-2">
              <span 
                className="px-2 py-1 text-xs font-mono rounded backdrop-blur-sm"
                style={{
                  backgroundColor: `${entityColor}80`,
                  color: 'white',
                  border: `2px solid ${entityColor}`
                }}
              >
                FEATURED
              </span>
            </div>
          )}

          {/* Price overlay */}
          <div className="absolute bottom-2 right-2">
            <span 
              className="px-3 py-1 font-mono font-bold rounded backdrop-blur-sm"
              style={{
                backgroundColor: `${entityColor}90`,
                color: 'white',
                border: `1px solid ${entityColor}`
              }}
            >
              {formatPrice(price, locale)}
            </span>
          </div>
        </div>

        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <CardTitle 
              className="group-hover:text-white transition-colors line-clamp-2"
              style={{ 
                color: featured ? entityColor : undefined 
              }}
            >
              {title}
            </CardTitle>
          </div>
          
          {/* Entity Signature */}
          {entity && entityId && (
            <EntitySignature 
              entityId={entityId} 
              variant="compact"
            />
          )}
        </CardHeader>

        {description && (
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </CardContent>
        )}

        <CardFooter className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">
            {available ? (
              <span className="text-xs text-green-400 font-mono">
                ● {t('available')}
              </span>
            ) : (
              <span className="text-xs text-red-400 font-mono">
                ● {t('unavailable')}
              </span>
            )}
          </div>
          
          <button
            className="px-4 py-2 rounded-full font-mono text-sm transition-colors disabled:opacity-50"
            disabled={!available}
            style={{
              backgroundColor: available ? entityColor : '#444',
              color: 'white',
              border: `1px solid ${available ? entityColor : '#666'}`
            }}
            onClick={(e) => {
              e.preventDefault();
              // Add to cart logic would go here
            }}
          >
            {available ? t('addToCart') : t('unavailable')}
          </button>
        </CardFooter>
      </Card>
    </Link>
  );
}