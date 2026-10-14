import React, { useState, useEffect } from 'react';
import { useNews } from '../../context/NewsContext';
import { handleImageError, formatDateIndonesian } from '../../utils/mediaFallback';
import { ChevronLeft, ChevronRight, ArrowRight, User, Calendar, Pause, Play } from 'lucide-react';

interface HeroSliderProps {
  onSelectArticle: (articleId?: string, slug?: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onSelectArticle }) => {
  const { heroSlides, articles } = useNews();
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Filter only active slides that have published articles or are published directly
  const activeSlides = heroSlides
    .filter(s => s.active)
    .sort((a, b) => a.order - b.order);

  useEffect(() => {
    if (isPaused || activeSlides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % activeSlides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, activeSlides.length]);

  if (activeSlides.length === 0) return null;

  const currentSlide = activeSlides[currentSlideIndex] || activeSlides[0];
  const linkedArticle = currentSlide.articleId
    ? articles.find(a => a.id === currentSlide.articleId && a.status === 'published')
    : null;

  const title = linkedArticle?.title || currentSlide.title;
  const summary = linkedArticle?.summary || currentSlide.summary;
  const category = linkedArticle?.category || currentSlide.category;
  const coverImage = linkedArticle?.coverImage || currentSlide.coverImage;
  const authorName = linkedArticle?.authorName || 'Redaksi WARTA HUKUM';
  const publishedAt = linkedArticle?.publishedAt || new Date().toISOString();

  const handleNext = () => {
    setCurrentSlideIndex(prev => (prev + 1) % activeSlides.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex(prev => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleOpen = () => {
    if (linkedArticle) {
      onSelectArticle(linkedArticle.id, linkedArticle.slug);
    }
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-4 pb-4 sm:pb-6">
      {/* Outer Rainbow Border Wrap */}
      <div
        className="rainbow-border-card overflow-hidden shadow-lg border border-slate-200/80 group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative min-h-[380px] xs:min-h-[420px] sm:min-h-[440px] md:min-h-[460px] lg:aspect-21/9 lg:min-h-[480px] w-full bg-slate-900 overflow-hidden flex flex-col justify-end">
          {/* Main Photo with smooth zoom on hover */}
          <img
            src={coverImage}
            alt={title}
            onError={e => handleImageError(e, category)}
            className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-102"
            loading="eager"
            referrerPolicy="no-referrer"
          />

          {/* Measured Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/20"></div>

          {/* Rainbow Accent Top Stripe */}
          <div className="absolute top-0 inset-x-0 h-1 rainbow-gradient-bg z-20"></div>

          {/* Content Overlay */}
          <div className="relative z-10 p-4 sm:p-6 md:p-8 flex flex-col justify-end">
            <div className="max-w-3xl space-y-2 sm:space-y-2.5">
              {/* Category & Metadata */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-300 font-medium">
                <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] sm:text-[11px]">
                  {category}
                </span>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <User className="w-3 h-3 text-slate-400" />
                  <span className="truncate max-w-[120px] sm:max-w-none">{authorName}</span>
                </span>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{formatDateIndonesian(publishedAt)}</span>
                </span>
              </div>

              {/* Title */}
              <h2
                onClick={handleOpen}
                className="text-base sm:text-xl md:text-2xl lg:text-3xl font-headline font-bold text-white hover:text-amber-300 transition-colors cursor-pointer leading-snug line-clamp-2 sm:line-clamp-3"
              >
                {title}
              </h2>

              {/* Summary lead */}
              <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 font-normal leading-relaxed">
                {summary}
              </p>

              {/* Action Buttons & Slide Status */}
              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  onClick={handleOpen}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-indigo-600 hover:opacity-95 text-white font-semibold text-xs sm:text-sm shadow-md transition-all shrink-0"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                {/* Slider Navigation Dots & Controls */}
                <div className="flex items-center gap-1 sm:gap-2 bg-black/50 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-white/10 shrink-0">
                  <button
                    onClick={handlePrev}
                    className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                    aria-label="Slide Sebelumnya"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>

                  <div className="flex items-center gap-1 sm:gap-1.5 px-1 sm:px-2">
                    {activeSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === currentSlideIndex
                            ? 'w-4 sm:w-6 bg-gradient-to-r from-red-400 to-amber-400'
                            : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/70'
                        }`}
                        aria-label={`Ke slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                    aria-label="Slide Berikutnya"
                  >
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>

                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="p-1 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors border-l border-white/20 pl-1.5 ml-0.5 sm:pl-2 sm:ml-1"
                    title={isPaused ? 'Mulai Otomatis' : 'Jeda'}
                  >
                    {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
