import React from 'react';

interface BrandLogoProps {
  inverted?: boolean;
  compact?: boolean;
}

export function BrandLogo({ inverted = false, compact = false }: BrandLogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0">
      <svg
        width={compact ? 30 : 34}
        height={compact ? 30 : 34}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          width="64"
          height="64"
          rx="14"
          fill={inverted ? '#15966A' : '#102A43'}
        />
        <path
          d="M32 51.5C32 51.5 14 40.2 14 25.8C14 19.6 18.9 14.8 25 14.8C28.4 14.8 31.3 16.4 32 18.7C32.7 16.4 35.6 14.8 39 14.8C45.1 14.8 50 19.6 50 25.8C50 40.2 32 51.5 32 51.5Z"
          fill={inverted ? '#102A43' : '#15966A'}
        />
        <rect x="29.2" y="22.5" width="5.6" height="16.5" rx="1.6" fill="#FFFFFF" />
        <rect x="23.8" y="28" width="16.4" height="5.6" rx="1.6" fill="#FFFFFF" />
      </svg>
      <span
        className={`font-bold tracking-tight text-lg leading-none ${
          inverted ? 'text-white' : 'text-[#102A43]'
        }`}
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Ved&apos;s <span className={inverted ? 'text-[#5FE3B4]' : 'text-[#15966A]'}>Medcare</span>
      </span>
    </span>
  );
}
