import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  withTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  withTagline = true
}) => {
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 42 : 32;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon Emblem: Scales of Justice + Legal Gavel */}
      <div className="relative shrink-0 flex items-center justify-center rounded-xl p-1.5 shadow-sm bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 border border-slate-700/50">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base balance beam */}
          <path
            d="M6 14H30"
            stroke="url(#scale-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Vertical pillar */}
          <path
            d="M18 7V29"
            stroke="url(#scale-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Top finial ornament */}
          <circle cx="18" cy="6" r="2.5" fill="#f59e0b" />
          {/* Left pan */}
          <path d="M10 14L6 22H14L10 14Z" fill="url(#rainbow-accent)" opacity="0.9" />
          {/* Right pan */}
          <path d="M26 14L22 22H30L26 14Z" fill="url(#rainbow-accent)" opacity="0.9" />
          {/* Pedestal base */}
          <path
            d="M13 29H23"
            stroke="url(#scale-grad)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="scale-grad" x1="6" y1="6" x2="30" y2="29" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fef08a" />
              <stop offset="0.5" stopColor="#f59e0b" />
              <stop offset="1" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="rainbow-accent" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#ef4444" />
              <stop offset="0.33" stopColor="#f59e0b" />
              <stop offset="0.66" stopColor="#10b981" />
              <stop offset="1" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 ring-2 ring-white"></span>
      </div>

      {/* Brand Title */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-headline font-black tracking-tight text-slate-950 ${textSize}`}>
            WARTA
          </span>
          <span className={`font-headline font-black tracking-tight bg-gradient-to-r from-red-600 via-amber-600 to-indigo-600 bg-clip-text text-transparent ${textSize}`}>
            HUKUM
          </span>
        </div>
        {withTagline && (
          <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-500 -mt-1 hidden sm:block">
            Portal Berita Hukum &amp; Kriminal Nasional
          </span>
        )}
      </div>
    </div>
  );
};
