import React, { useState, useMemo } from 'react';
import { useNews } from '../../context/NewsContext';
import { handleImageError, formatShortDateIndonesian } from '../../utils/mediaFallback';
import { ChevronLeft, Filter, ArrowRight, Eye, Clock, User, Calendar } from 'lucide-react';

interface CategoryPageViewProps {
  categorySlug: string;
  onBack: () => void;
  onSelectArticle: (articleId: string, slug: string) => void;
}

export const CategoryPageView: React.FC<CategoryPageViewProps> = ({
  categorySlug,
  onBack,
  onSelectArticle
}) => {
  const { categories, articles } = useNews();
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const currentCategory = categories.find(
    c => c.slug.toLowerCase() === categorySlug.toLowerCase() || c.name.toLowerCase() === categorySlug.toLowerCase()
  );

  const categoryName = currentCategory?.name || categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);

  const categoryArticles = useMemo(() => {
    const list = articles.filter(
      a => a.status === 'published' && a.category.toLowerCase() === categoryName.toLowerCase()
    );

    if (sortBy === 'popular') {
      return [...list].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    }
    return [...list].sort(
      (a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()
    );
  }, [articles, categoryName, sortBy]);

  const totalPages = Math.ceil(categoryArticles.length / itemsPerPage) || 1;
  const paginatedArticles = categoryArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-red-700 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span onClick={onBack} className="cursor-pointer hover:underline">Beranda</span>
          <span aria-hidden="true">/</span>
          <span className="text-slate-900 font-bold">Kanal {categoryName}</span>
        </div>
      </div>

      {/* Kanal Hero Banner */}
      <div className="rainbow-border-card p-6 sm:p-8 bg-white rounded-2xl shadow-xs border border-slate-200 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 block mb-1">
              Kanal Berita WARTA HUKUM
            </span>
            <h1 className="text-2xl sm:text-3xl font-headline font-bold text-slate-900">
              {categoryName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {currentCategory?.description || `Kumpulan berita, analisis, dan liputan penegakan hukum terkini seputar ${categoryName}.`}
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs bg-slate-50 p-2 rounded-xl border border-slate-200 self-start sm:self-auto">
            <span className="text-slate-500 font-medium">Urutkan:</span>
            <button
              onClick={() => {
                setSortBy('newest');
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                sortBy === 'newest' ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              Terbaru
            </button>
            <button
              onClick={() => {
                setSortBy('popular');
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                sortBy === 'popular' ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              Terpopuler
            </button>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {paginatedArticles.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400 text-xs">
          Belum ada artikel yang diterbitkan dalam kanal ini.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedArticles.map(item => (
            <div
              key={item.id}
              onClick={() => onSelectArticle(item.id, item.slug)}
              className="bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-16/10 bg-slate-100 overflow-hidden relative">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    onError={e => handleImageError(e, item.category)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    loading="lazy"
                  />
                  {item.caseStatus && (
                    <span className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded">
                      {item.caseStatus}
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <span className="font-bold text-red-600 uppercase text-[10px]">{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{formatShortDateIndonesian(item.publishedAt || item.createdAt)}</span>
                  </div>

                  <h3 className="text-base font-headline font-bold text-slate-900 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate max-w-[130px]">{item.authorName}</span>
                <span className="tabular-nums flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {item.viewCount} dibaca
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2 text-xs">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 disabled:opacity-40 hover:bg-slate-50"
          >
            Sebelumnya
          </button>
          <span className="px-3 py-1.5 font-bold text-slate-800">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 disabled:opacity-40 hover:bg-slate-50"
          >
            Berikutnya
          </button>
        </div>
      )}
    </div>
  );
};
