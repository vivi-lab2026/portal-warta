import React from 'react';
import { useNews } from '../../context/NewsContext';
import { handleImageError, formatShortDateIndonesian } from '../../utils/mediaFallback';
import { Scale, ShieldAlert, BookOpen, Briefcase, ChevronRight, User, Eye } from 'lucide-react';

interface CategoryKanalSectionProps {
  onSelectArticle: (articleId: string, slug: string) => void;
  onSelectCategory: (categorySlug: string) => void;
}

export const CategoryKanalSection: React.FC<CategoryKanalSectionProps> = ({
  onSelectArticle,
  onSelectCategory
}) => {
  const { articles } = useNews();

  const published = articles.filter(a => a.status === 'published');

  // Channel 1: Peradilan & Kejaksaan
  const peradilanNews = published.filter(
    a => a.category.toLowerCase().includes('peradilan') || a.category.toLowerCase().includes('kejaksaan')
  ).slice(0, 3);

  // Channel 2: Kriminal & Kepolisian
  const kriminalNews = published.filter(
    a => a.category.toLowerCase().includes('kriminal') || a.category.toLowerCase().includes('kepolisian')
  ).slice(0, 3);

  // Channel 3: Opini & Analisis Hukum
  const opiniNews = published.filter(
    a => a.isOpinion || a.category.toLowerCase().includes('opini')
  ).slice(0, 3);

  // Channel 4: Investigasi & Kasus Khusus
  const investigasiNews = published.filter(
    a => a.category.toLowerCase().includes('investigasi') || a.category.toLowerCase().includes('korupsi')
  ).slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* KANAL 1: Peradilan & Kejaksaan (Courtroom & Prosecution) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-xl text-slate-900">
                Kanal Peradilan &amp; Kejaksaan
              </h3>
              <p className="text-xs text-slate-500">
                Liputan persidangan Tipikor, Mahkamah Konstitusi, dan penyidikan Korps Adhyaksa
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectCategory('peradilan')}
            className="flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors"
          >
            <span>Lihat Semua</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {peradilanNews.map(item => (
            <div
              key={item.id}
              onClick={() => onSelectArticle(item.id, item.slug)}
              className="cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-16/10 rounded-xl overflow-hidden bg-slate-100 mb-3 relative">
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
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1.5 font-medium">
                  <span className="font-bold text-teal-600 uppercase text-[10px]">{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{formatShortDateIndonesian(item.publishedAt || item.createdAt)}</span>
                </div>
                <h4 className="text-sm font-headline font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate max-w-[140px]">{item.authorName}</span>
                <span className="tabular-nums flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {item.viewCount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KANAL 2 & 3: GRID 2 KOLOM (Kriminal & Opini) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kriminal & Kepolisian */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <h3 className="font-headline font-bold text-lg text-slate-900">
                Kriminal &amp; Kepolisian
              </h3>
            </div>
            <button
              onClick={() => onSelectCategory('kriminal')}
              className="text-xs font-semibold text-red-600 hover:text-red-800 flex items-center"
            >
              Lihat Semua <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          <div className="space-y-4">
            {kriminalNews.map(item => (
              <div
                key={item.id}
                onClick={() => onSelectArticle(item.id, item.slug)}
                className="cursor-pointer group flex items-start gap-4 pb-3 border-b border-slate-100 last:border-b-0 last:pb-0"
              >
                <div className="w-24 sm:w-28 aspect-4/3 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    onError={e => handleImageError(e, item.category)}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mb-1">
                    <span className="font-bold text-red-600 uppercase">{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{formatShortDateIndonesian(item.publishedAt || item.createdAt)}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">
                    {item.location.city}, {item.location.province}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Opini & Analisis Hukum (Pakar & Akademisi) */}
        <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-200/80 shadow-2xs">
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-amber-200/60">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-700" />
              <div>
                <h3 className="font-headline font-bold text-lg text-slate-900">
                  Opini &amp; Analisis Hukum
                </h3>
              </div>
            </div>
            <button
              onClick={() => onSelectCategory('opini')}
              className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center"
            >
              Lihat Semua <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          <div className="space-y-4">
            {opiniNews.map(item => (
              <div
                key={item.id}
                onClick={() => onSelectArticle(item.id, item.slug)}
                className="cursor-pointer group bg-white rounded-xl p-3.5 border border-amber-100 shadow-2xs hover:shadow-xs transition-all"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    Kolom Opini
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {formatShortDateIndonesian(item.publishedAt || item.createdAt)}
                  </span>
                </div>
                <h4 className="text-sm font-headline font-bold text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                  {item.summary}
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                    <User className="w-3 h-3" />
                  </div>
                  <span className="truncate">{item.authorName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KANAL 4: Laporan Investigasi Khusus (Full-width rainbow banner card) */}
      {investigasiNews.length > 0 && (
        <div className="rainbow-border-card p-6 bg-slate-900 text-white rounded-2xl shadow-lg border border-slate-800">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-6 bg-gradient-to-b from-red-500 to-amber-500 rounded-xs"></div>
              <div>
                <h3 className="font-headline font-bold text-xl text-white">
                  Laporan Investigasi Jurnalistik
                </h3>
                <p className="text-xs text-slate-400">
                  Liputan mendalam tim redaksi mengungkap fakta di balik penegakan hukum
                </p>
              </div>
            </div>
            <button
              onClick={() => onSelectCategory('investigasi')}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center"
            >
              Lihat Seluruh Laporan <ChevronRight className="w-4 h-4 ml-0.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {investigasiNews.slice(0, 2).map(item => (
              <div
                key={item.id}
                onClick={() => onSelectArticle(item.id, item.slug)}
                className="cursor-pointer group flex flex-col sm:flex-row gap-4 items-start"
              >
                <div className="w-full sm:w-44 aspect-16/10 rounded-xl overflow-hidden bg-slate-800 shrink-0">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    onError={e => handleImageError(e, item.category)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                    {item.location.province}
                  </span>
                  <h4 className="text-sm sm:text-base font-headline font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                  <div className="text-[11px] text-slate-400 pt-1">
                    Oleh: {item.authorName} · {formatShortDateIndonesian(item.publishedAt || item.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
