import React from 'react';
import { useNews } from '../../context/NewsContext';
import {
  Scale,
  ShieldAlert,
  Landmark,
  Building2,
  FileCheck2,
  AlertOctagon,
  TrendingUp,
  MapPin,
  BookOpen,
  Search,
  GraduationCap,
  Globe,
  ChevronRight
} from 'lucide-react';

interface CategoryCardsMenuProps {
  onSelectCategory: (categorySlug: string) => void;
}

export const CategoryCardsMenu: React.FC<CategoryCardsMenuProps> = ({ onSelectCategory }) => {
  const { categories, articles } = useNews();

  // Primary categories to display as cards
  const activeCategories = categories.filter(c => c.active);

  // Helper icon selector based on category name
  const getCategoryIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('hukum')) return <Scale className="w-5 h-5 text-rose-600" />;
    if (n.includes('kriminal')) return <ShieldAlert className="w-5 h-5 text-red-600" />;
    if (n.includes('peradilan')) return <Landmark className="w-5 h-5 text-purple-600" />;
    if (n.includes('kejaksaan')) return <FileCheck2 className="w-5 h-5 text-teal-600" />;
    if (n.includes('kepolisian')) return <ShieldAlert className="w-5 h-5 text-indigo-600" />;
    if (n.includes('korupsi')) return <AlertOctagon className="w-5 h-5 text-orange-600" />;
    if (n.includes('politik')) return <Building2 className="w-5 h-5 text-amber-600" />;
    if (n.includes('daerah')) return <MapPin className="w-5 h-5 text-emerald-600" />;
    if (n.includes('opini')) return <BookOpen className="w-5 h-5 text-fuchsia-600" />;
    if (n.includes('investigasi')) return <Search className="w-5 h-5 text-rose-700" />;
    if (n.includes('pendidikan')) return <GraduationCap className="w-5 h-5 text-sky-600" />;
    return <Globe className="w-5 h-5 text-blue-600" />;
  };

  return (
    <section aria-label="Menu Kartu Kategori Berita" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-gradient-to-b from-red-600 via-amber-500 to-indigo-600 rounded-xs"></div>
          <h2 className="font-headline font-bold text-lg sm:text-xl text-slate-900 tracking-tight">
            Menu Kanal &amp; Kartu Kategori Berita
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Pilih kanal berita sesuai topik perkara
        </span>
      </div>

      {/* Grid of Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {activeCategories.slice(0, 12).map(cat => {
          const count = articles.filter(
            a => a.status === 'published' && a.category.toLowerCase() === cat.name.toLowerCase()
          ).length;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="group text-left p-3.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-slate-100 transition-colors">
                  {getCategoryIcon(cat.name)}
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all mt-1" />
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">
                  {count > 0 ? `${count} liputan` : 'Liputan aktual'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
