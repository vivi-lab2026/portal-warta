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
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
      {/* Outer Rainbow Border Wrap */}
      <div
        className="rainbow-border-card overflow-hidden shadow-lg border border-slate-200/80 group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative aspect-16/10 sm:aspect-16/9 md:aspect-21/9 w-full bg-slate-900 overflow-hidden">
          {/* Main Photo with smooth zoom on hover */}
          <img
            src={coverImage}
            alt={title}
            onError={e => handleImageError(e, category)}
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-102"
            loading="eager"
            referrerPolicy="no-referrer"
          />

          {/* Measured Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

          {/* Rainbow Accent Top Stripe */}
          <div className="absolute top-0 inset-x-0 h-1 rainbow-gradient-bg"></div>

          {/* Glassmorphic Rainbow Card Overlay Content */}
          <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 md:p-9 flex flex-col justify-end">
            <div className="max-w-3xl space-y-2.5">
              {/* Category & Metadata (Anti-Pill discipline: unboxed text with · separators) */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 font-medium">
                <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
                  {category}
                </span>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <User className="w-3 h-3 text-slate-400" />
                  <span>{authorName}</span>
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
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-headline font-bold text-white hover:text-amber-300 transition-colors cursor-pointer leading-tight line-clamp-2 sm:line-clamp-3"
              >
                {title}
              </h2>

              {/* Summary lead */}
              <p className="text-xs sm:text-sm md:text-base text-slate-200 line-clamp-2 max-w-2xl font-normal leading-relaxed">
                {summary}
              </p>

              {/* Action Buttons & Slide Status */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={handleOpen}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-indigo-600 hover:opacity-95 text-white font-semibold text-xs sm:text-sm shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Slider Navigation Dots & Controls */}
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                  <button
                    onClick={handlePrev}
                    className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                    aria-label="Slide Sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1.5 px-2">
                    {activeSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === currentSlideIndex
                            ? 'w-6 bg-gradient-to-r from-red-400 to-amber-400'
                            : 'w-2 bg-white/40 hover:bg-white/70'
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
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="p-1 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors border-l border-white/20 pl-2 ml-1"
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
