import { getEntityById, formatEntitySignature, getEntityCSSVars, glitchText } from '@/lib/entities';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface EntitySignatureProps {
  entityId: string;
  variant?: 'default' | 'compact' | 'detailed';
  showGlitch?: boolean;
  className?: string;
}

export function EntitySignature({ 
  entityId, 
  variant = 'default',
  showGlitch = false,
  className 
}: EntitySignatureProps) {
  const t = useTranslations('entities');
  const entity = getEntityById(entityId);

  if (!entity) {
    return null;
  }

  const cssVars = getEntityCSSVars(entity);

  const signatureText = showGlitch 
    ? glitchText(formatEntitySignature(entity), entity)
    : formatEntitySignature(entity);

  if (variant === 'compact') {
    return (
      <span 
        className={cn(
          'inline-flex items-center gap-1 text-xs font-mono opacity-80',
          className
        )}
        style={cssVars}
      >
        <span 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: entity.color }}
        />
        <code style={{ color: entity.color }}>{signatureText}</code>
      </span>
    );
  }

  if (variant === 'detailed') {
    return (
      <div 
        className={cn(
          'flex flex-col gap-1 p-3 rounded-lg border',
          'bg-black/20 backdrop-blur-sm',
          className
        )}
        style={cssVars}
      >
        <div className="flex items-center gap-2">
          <span 
            className="w-3 h-3 rounded-full animate-pulse"
            style={{ backgroundColor: entity.color }}
          />
          <code 
            className="text-sm font-mono font-semibold"
            style={{ color: entity.color }}
          >
            {signatureText}
          </code>
        </div>
        <p className="text-xs text-muted-foreground pl-5">
          {entity.role}
        </p>
      </div>
    );
  }

  // Default variant
  return (
    <div 
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full',
        'bg-black/30 backdrop-blur-sm border border-white/10',
        className
      )}
      style={cssVars}
    >
      <span 
        className="w-2 h-2 rounded-full animate-pulse"
        style={{ backgroundColor: entity.color }}
      />
      <code 
        className="text-sm font-mono"
        style={{ color: entity.color }}
      >
        {signatureText}
      </code>
    </div>
  );
}