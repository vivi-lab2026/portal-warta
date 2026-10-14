import React, { useState } from 'react';
import { Article } from '../../types';
import { useNews } from '../../context/NewsContext';
import { handleImageError, formatDateIndonesian, formatShortDateIndonesian } from '../../utils/mediaFallback';
import { TrendingUp, Clock, Eye, ChevronRight, User } from 'lucide-react';

interface TopStoriesSectionProps {
  onSelectArticle: (articleId: string, slug: string) => void;
  onSelectCategory: (categorySlug: string) => void;
}

export const TopStoriesSection: React.FC<TopStoriesSectionProps> = ({
  onSelectArticle,
  onSelectCategory
}) => {
  const { articles } = useNews();

  // Published articles only
  const published = articles
    .filter(a => a.status === 'published')
    .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());

  // 1 Lead story (either marked isFeatured or first published)
  const leadStory = published.find(a => a.isFeatured) || published[0];

  // Companion stories (next 3)
  const companionStories = published
    .filter(a => a.id !== leadStory?.id)
    .slice(0, 3);

  // Trending / Terpopuler sorted by viewCount (real recorded reads)
  const trendingStories = [...published]
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, 5);

  if (!leadStory) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-5 bg-gradient-to-b from-red-600 to-indigo-600 rounded-xs"></div>
          <h2 className="text-xl sm:text-2xl font-headline font-bold text-slate-900 tracking-tight">
            Berita Utama &amp; Investigasi Terkini
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Liputan Hukum &amp; Kriminalitas Indonesia
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Lead Story + Companions (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Lead Card */}
          <div
            onClick={() => onSelectArticle(leadStory.id, leadStory.slug)}
            className="rainbow-border-card p-4 sm:p-5 cursor-pointer group bg-white shadow-xs border border-slate-200"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              <div className="sm:col-span-7 overflow-hidden rounded-xl aspect-16/10 bg-slate-100">
                <img
                  src={leadStory.coverImage}
                  alt={leadStory.title}
                  onError={e => handleImageError(e, leadStory.category)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  loading="lazy"
                />
              </div>
              <div className="sm:col-span-5 space-y-2.5">
                {/* Metadata */}
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCategory(leadStory.category.toLowerCase());
                    }}
                    className="font-bold text-red-600 hover:underline uppercase text-[11px]"
                  >
                    {leadStory.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{formatShortDateIndonesian(leadStory.publishedAt || leadStory.createdAt)}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-headline font-bold text-slate-900 group-hover:text-red-700 transition-colors leading-snug line-clamp-3">
                  {leadStory.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {leadStory.summary}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                  <span className="flex items-center gap-1 font-medium truncate max-w-[150px]">
                    <User className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{leadStory.authorName}</span>
                  </span>
                  <span className="flex items-center gap-1 text-[11px] tabular-nums">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{leadStory.readingTimeMinutes} mnt baca</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Companion Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {companionStories.map(story => (
              <div
                key={story.id}
                onClick={() => onSelectArticle(story.id, story.slug)}
                className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-16/10 rounded-lg overflow-hidden bg-slate-100 mb-3">
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      onError={e => handleImageError(e, story.category)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-1.5">
                    <span className="font-bold text-indigo-600 uppercase">
                      {story.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{formatShortDateIndonesian(story.publishedAt || story.createdAt)}</span>
                  </div>
                  <h4 className="text-sm font-headline font-bold text-slate-900 group-hover:text-indigo-700 transition-colors line-clamp-2 leading-snug">
                    {story.title}
                  </h4>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate max-w-[120px]">{story.authorName}</span>
                  <span className="tabular-nums flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {story.viewCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar Berita Terpopuler (4 cols on lg) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-600" />
              <h3 className="font-headline font-bold text-base text-slate-900">
                Terpopuler &amp; Trending
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Real View
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {trendingStories.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => onSelectArticle(item.id, item.slug)}
                className="py-3 cursor-pointer group flex items-start gap-3.5 first:pt-0 last:pb-0"
              >
                {/* Ranking Number */}
                <span className="font-headline font-black text-2xl text-slate-300 group-hover:text-red-600 transition-colors tabular-nums shrink-0 w-6 text-center">
                  0{idx + 1}
                </span>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                    <span className="font-bold text-amber-600 uppercase text-[10px]">
                      {item.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums flex items-center gap-0.5 text-slate-400">
                      <Eye className="w-2.5 h-2.5" />
                      {item.viewCount} dibaca
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
