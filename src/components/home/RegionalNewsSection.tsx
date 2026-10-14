import React, { useState, useMemo } from 'react';
import { useNews } from '../../context/NewsContext';
import { handleImageError, formatShortDateIndonesian } from '../../utils/mediaFallback';
import { MapPin, Filter, Search, Building2, Calendar, Eye } from 'lucide-react';

interface RegionalNewsSectionProps {
  onSelectArticle: (articleId: string, slug: string) => void;
}

export const RegionalNewsSection: React.FC<RegionalNewsSectionProps> = ({ onSelectArticle }) => {
  const { articles } = useNews();

  const published = articles.filter(a => a.status === 'published');

  // Extract distinct provinces and cities available in published articles
  const availableProvinces = useMemo(() => {
    const set = new Set<string>();
    published.forEach(a => {
      if (a.location?.province) set.add(a.location.province);
    });
    return Array.from(set).sort();
  }, [published]);

  const [selectedProvince, setSelectedProvince] = useState<string>('Semua');
  const [selectedCity, setSelectedCity] = useState<string>('Semua');

  // Available cities based on selected province
  const availableCities = useMemo(() => {
    const set = new Set<string>();
    published.forEach(a => {
      if (selectedProvince === 'Semua' || a.location?.province === selectedProvince) {
        if (a.location?.city) set.add(a.location.city);
      }
    });
    return Array.from(set).sort();
  }, [published, selectedProvince]);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return published.filter(a => {
      if (selectedProvince !== 'Semua' && a.location?.province !== selectedProvince) {
        return false;
      }
      if (selectedCity !== 'Semua' && a.location?.city !== selectedCity) {
        return false;
      }
      return true;
    });
  }, [published, selectedProvince, selectedCity]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs">
        {/* Header with Title and Region Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-xl text-slate-900">
                Warta Hukum Daerah
              </h3>
              <p className="text-xs text-slate-500">
                Informasi penegakan hukum, kejaksaan negeri, dan polres di seluruh pelosok Indonesia
              </p>
            </div>
          </div>

          {/* Region Filter Selectors */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            {/* Province Selector */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="prov-select" className="text-slate-500 font-medium">Provinsi:</label>
              <select
                id="prov-select"
                value={selectedProvince}
                onChange={e => {
                  setSelectedProvince(e.target.value);
                  setSelectedCity('Semua');
                }}
                className="bg-transparent font-semibold text-slate-800 outline-none cursor-pointer"
              >
                <option value="Semua">Semua Wilayah</option>
                {availableProvinces.map(prov => (
                  <option key={prov} value={prov}>
                    {prov}
                  </option>
                ))}
              </select>
            </div>

            {/* City Selector */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="city-select" className="text-slate-500 font-medium">Kab/Kota:</label>
              <select
                id="city-select"
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                disabled={availableCities.length === 0}
                className="bg-transparent font-semibold text-slate-800 outline-none cursor-pointer disabled:opacity-50"
              >
                <option value="Semua">Semua Kota</option>
                {availableCities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        {filteredArticles.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <MapPin className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-500" />
            <p className="text-sm font-medium">Belum ada liputan berita untuk wilayah ini.</p>
            <p className="text-xs text-slate-400 mt-1">
              Pilih wilayah lain atau setel filter ke &apos;Semua Wilayah&apos;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredArticles.map(article => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article.id, article.slug)}
                className="bg-slate-50/70 hover:bg-white rounded-xl p-3 border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-16/10 rounded-lg overflow-hidden bg-slate-200 mb-2.5 relative">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      onError={e => handleImageError(e, article.category)}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-sm flex items-center gap-1 shadow-xs">
                      <MapPin className="w-2.5 h-2.5 text-rose-400" />
                      <span>{article.location.city || article.location.province}</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 font-medium mb-1">
                    {formatShortDateIndonesian(article.publishedAt || article.createdAt)}
                  </div>

                  <h4 className="text-xs sm:text-sm font-headline font-bold text-slate-900 group-hover:text-rose-700 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h4>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="truncate max-w-[110px]">{article.authorName}</span>
                  <span className="tabular-nums flex items-center gap-1">
                    <Eye className="w-3 h-3 text-slate-400" />
                    {article.viewCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
