import React from 'react';

export const CategoryMarqueeTicker: React.FC = () => {
  const tickerText =
    '🔴 BREAKING NEWS • WARTA HUKUM — Aktual Beritanya, Akurat Faktanya, Berimbang Pemberitaannya. Mengawal Kebenaran, Menyuarakan Keadilan, Menyajikan Informasi untuk Indonesia.';

  // One block of text with consistent trailing gap
  const renderItem = (id: string) => (
    <div key={id} className="flex items-center shrink-0 pr-8 sm:pr-14">
      <span className="text-xs sm:text-sm font-bold tracking-wide text-white whitespace-nowrap drop-shadow-xs">
        {tickerText}
      </span>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 my-2.5 sm:my-4">
      {/* Self-contained CSS styles ensuring constant velocity, smooth infinite loop & reduced-motion compliance */}
      <style>{`
        @keyframes wartaHukumMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .warta-marquee-wrapper {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: wartaHukumMarquee 30s linear infinite;
        }

        .warta-marquee-wrapper:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .warta-marquee-wrapper {
            animation-duration: 80s;
          }
        }
      `}</style>

      {/* Outer Banner Card with Rainbow Accent Border */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 shadow-md">
        {/* Rainbow Accent Top Stripe */}
        <div className="h-1 w-full rainbow-gradient-bg"></div>

        {/* Left and Right Edge Soft Fades for Seamless Polish */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10"
        ></div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-indigo-950 via-indigo-950/80 to-transparent z-10"
        ></div>

        {/* Ticker Track with Pure CSS Linear Animation */}
        <div className="py-2.5 sm:py-3 overflow-hidden flex items-center select-none">
          <div className="warta-marquee-wrapper flex items-center">
            {/* Segment A: 2 items */}
            {renderItem('item-a-1')}
            {renderItem('item-a-2')}

            {/* Segment B: 2 identical items (exact 50% split for seamless 0-gap looping) */}
            {renderItem('item-b-1')}
            {renderItem('item-b-2')}
          </div>
        </div>

        {/* Bottom Hairline Border */}
        <div className="h-0.5 w-full bg-slate-800/80"></div>
      </div>
    </div>
  );
};
