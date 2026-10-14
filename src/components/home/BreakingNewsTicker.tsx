import React, { useState, useEffect } from 'react';
import { useNews } from '../../context/NewsContext';
import { Zap, Pause, Play, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface BreakingNewsTickerProps {
  onSelectArticle: (articleId?: string, slug?: string) => void;
}

export const BreakingNewsTicker: React.FC<BreakingNewsTickerProps> = ({ onSelectArticle }) => {
  const { breakingNews, articles } = useNews();
  const activeItems = breakingNews.filter(b => b.active);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [staticView, setStaticView] = useState<boolean>(false);

  useEffect(() => {
    if (!isPlaying || activeItems.length <= 1 || staticView) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % activeItems.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPlaying, activeItems.length, staticView]);

  if (activeItems.length === 0) return null;

  const currentItem = activeItems[currentIndex] || activeItems[0];
  const linkedArticle = currentItem.articleId
    ? articles.find(a => a.id === currentItem.articleId)
    : null;

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % activeItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + activeItems.length) % activeItems.length);
  };

  const handleClick = () => {
    if (linkedArticle) {
      onSelectArticle(linkedArticle.id, linkedArticle.slug);
    }
  };

  return (
    <div className="w-full bg-white border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-red-50 via-amber-50 to-indigo-50 border border-red-200/60 rounded-xl px-3 py-1.5">
          {/* Breaking News Label */}
          <div className="flex items-center gap-1.5 shrink-0 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-xs">
            <Zap className="w-3.5 h-3.5 animate-pulse text-amber-300" />
            <span>Kilas Berita</span>
          </div>

          {/* Headline Content */}
          <div className="flex-1 overflow-hidden">
            <div
              onClick={handleClick}
              className="cursor-pointer group flex items-center gap-2"
            >
              <span className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-red-700 transition-colors line-clamp-1">
                {currentItem.title}
              </span>
              {linkedArticle?.caseStatus && (
                <span className="hidden md:inline-flex text-[10px] font-medium text-slate-500 bg-white/80 px-2 py-0.5 rounded border border-slate-200 shrink-0">
                  {linkedArticle.caseStatus}
                </span>
              )}
            </div>
          </div>

          {/* Controls: Prev/Next, Play/Pause, Static toggle */}
          <div className="flex items-center gap-1 shrink-0 text-slate-600">
            <button
              onClick={handlePrev}
              className="p-1 hover:bg-white rounded transition-colors text-slate-600 hover:text-slate-900"
              title="Berita Sebelumnya"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 hover:bg-white rounded transition-colors text-slate-600 hover:text-slate-900"
              title={isPlaying ? 'Jeda Otomatis' : 'Jalankan Otomatis'}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
            <button
              onClick={handleNext}
              className="p-1 hover:bg-white rounded transition-colors text-slate-600 hover:text-slate-900"
              title="Berita Berikutnya"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Static mode button */}
            <button
              onClick={() => setStaticView(!staticView)}
              className={`hidden sm:flex text-[10px] font-medium px-2 py-0.5 rounded transition-colors ml-1 ${
                staticView ? 'bg-slate-800 text-white' : 'bg-white/80 text-slate-600 hover:bg-white'
              }`}
              title="Tampilan Statis (Minim Animasi)"
            >
              {staticView ? 'Statis On' : 'Statis'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
