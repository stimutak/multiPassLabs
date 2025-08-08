import React from 'react';

export type LogoVariant = 'monogram' | 'glyph' | 'wordmark';

export interface LogoProps {
  /**
   * Choose which logo variant to render.  If not provided,
   * the monogram mark is used.
   */
  variant?: LogoVariant;
  /** Additional tailwind classes to apply to the svg element. */
  className?: string;
}

/**
 * Logo renders one of several vector marks for Multipass Labs.  The
 * marks are built purely with SVG paths so they inherit the
 * `currentColor` from their parent element.  You can control the
 * size via width/height on the parent or by using Tailwind classes.
 *
 * The `monogram` variant draws a stylised "MPL" letterform.
 * The `glyph` variant draws three overlapping rounded passes and
 * includes a small accent square.
 * The `wordmark` variant renders a single line lockup with a
 * terminal‑inspired prefix.
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'monogram',
  className = '',
}) => {
  switch (variant) {
    case 'glyph':
      return (
        <svg
          viewBox="0 0 360 160"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Three overlapping rounded rectangles */}
          <rect
            x="0"
            y="20"
            width="220"
            height="80"
            rx="12"
            stroke="currentColor"
            strokeWidth="12"
          />
          <rect
            x="24"
            y="44"
            width="220"
            height="80"
            rx="12"
            stroke="currentColor"
            strokeWidth="12"
          />
          <rect
            x="48"
            y="68"
            width="220"
            height="80"
            rx="12"
            stroke="currentColor"
            strokeWidth="12"
          />
          {/* Accent pixel */}
          <rect x="290" y="90" width="12" height="12" rx="2" fill="currentColor" />
        </svg>
      );
    case 'wordmark':
      return (
        <svg
          viewBox="0 0 700 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bracketed frame */}
          <path d="M0 16 v68 h48" stroke="currentColor" strokeWidth="8" />
          <path d="M652 84 v-68 h-48" stroke="currentColor" strokeWidth="8" />
          {/* Scan line accent */}
          <rect x="60" y="60" width="540" height="6" rx="3" fill="currentColor" />
          {/* Terminal prefix and wordmark */}
          <text
            x="60"
            y="48"
            fontSize="42"
            fill="currentColor"
            fontFamily="monospace"
            letterSpacing="2"
          >
            MPL:// MULTIPASS LABS
          </text>
        </svg>
      );
    default:
      // Monogram with MPL letterforms
      return (
        <svg
          viewBox="0 0 320 160"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* M */}
          <path
            d="M20 30 v100 M60 30 v100 M100 30 v100 M20 30 h20 l20 60 20-60 h20"
            stroke="currentColor"
            strokeWidth="16"
            strokeLinejoin="round"
          />
          {/* P */}
          <path
            d="M140 30 v100 h40 q32 0 32-32 v-36 q0-32-32-32 h-40"
            stroke="currentColor"
            strokeWidth="16"
            strokeLinejoin="round"
          />
          {/* L */}
          <path
            d="M240 30 v100 h64"
            stroke="currentColor"
            strokeWidth="16"
            strokeLinejoin="round"
          />
          {/* Tiny accent square */}
          <rect x="298" y="32" width="12" height="12" rx="2" fill="currentColor" />
        </svg>
      );
  }
};

export default Logo;
