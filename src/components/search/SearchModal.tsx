import React, { useState, useMemo } from 'react';
import { useNews } from '../../context/NewsContext';
import { handleImageError, formatShortDateIndonesian } from '../../utils/mediaFallback';
import { Search, X, Filter, MapPin, Calendar, ArrowRight, Eye } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (articleId: string, slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle
}) => {
  const { articles, categories } = useNews();
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedProvince, setSelectedProvince] = useState('Semua');

  // Available provinces
  const provinces = useMemo(() => {
    const set = new Set<string>();
    articles.forEach(a => {
      if (a.location?.province) set.add(a.location.province);
    });
    return Array.from(set).sort();
  }, [articles]);

  const filtered = useMemo(() => {
    return articles.filter(a => {
      // Must be published for public search
      if (a.status !== 'published') return false;

      // Category filter
      if (selectedCategory !== 'Semua' && a.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Province filter
      if (selectedProvince !== 'Semua' && a.location?.province !== selectedProvince) {
        return false;
      }

      // Keyword filter
      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        const inTitle = a.title.toLowerCase().includes(q);
        const inSummary = a.summary.toLowerCase().includes(q);
        const inContent = a.content.toLowerCase().includes(q);
        const inTags = a.tags?.some(t => t.toLowerCase().includes(q));
        if (!inTitle && !inSummary && !inContent && !inTags) {
          return false;
        }
      }

      return true;
    });
  }, [articles, keyword, selectedCategory, selectedProvince]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 sm:pt-20 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="Cari berita perkara, putusan hakim, regulasi, korupsi..."
              autoFocus
              className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-2xs"
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="px-5 py-2.5 bg-slate-100/70 border-b border-slate-200 flex flex-wrap items-center gap-3 text-xs">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="search-cat" className="text-slate-500 font-medium">Kategori:</label>
            <select
              id="search-cat"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 font-medium text-xs outline-none"
            >
              <option value="Semua">Semua Kategori</option>
              {categories.map(c => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Province Filter */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="search-prov" className="text-slate-500 font-medium">Wilayah:</label>
            <select
              id="search-prov"
              value={selectedProvince}
              onChange={e => setSelectedProvince(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 font-medium text-xs outline-none"
            >
              <option value="Semua">Semua Wilayah</option>
              {provinces.map(p => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <span className="text-[11px] text-slate-400 ml-auto">
            Ditemukan <strong>{filtered.length}</strong> berita
          </span>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-slate-100 space-y-2">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              Tidak ada berita yang cocok dengan kriteria pencarian.
            </div>
          ) : (
            filtered.map(item => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectArticle(item.id, item.slug);
                  onClose();
                }}
                className="pt-3 pb-2 cursor-pointer group flex items-start gap-4 hover:bg-slate-50 p-2 rounded-xl transition-colors"
              >
                <div className="w-20 sm:w-28 aspect-16/10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    onError={e => handleImageError(e, item.category)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-1">
                    <span className="font-bold text-red-600 uppercase">{item.category}</span>
                    <span>·</span>
                    <span>{formatShortDateIndonesian(item.publishedAt || item.createdAt)}</span>
                    <span>·</span>
                    <span className="text-slate-400">{item.location.province}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                    {item.summary}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all shrink-0 mt-2" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
