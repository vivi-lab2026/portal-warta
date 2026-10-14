import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NewsProvider, useNews } from './context/NewsContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { BreakingNewsTicker } from './components/home/BreakingNewsTicker';
import { HeroSlider } from './components/home/HeroSlider';
import { TopStoriesSection } from './components/home/TopStoriesSection';
import { CategoryMarqueeTicker } from './components/home/CategoryMarqueeTicker';
import { CategoryCardsMenu } from './components/home/CategoryCardsMenu';
import { CategoryKanalSection } from './components/home/CategoryKanalSection';
import { RegionalNewsSection } from './components/home/RegionalNewsSection';
import { PhotoVideoGallerySection } from './components/home/PhotoVideoGallerySection';
import { AgendaSection } from './components/home/AgendaSection';
import { NewsletterCard } from './components/home/NewsletterCard';
import { ArticleDetailPage } from './components/article/ArticleDetailPage';
import { CategoryPageView } from './components/category/CategoryPageView';
import { StaticPageView } from './components/static/StaticPageView';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { GuruDashboard } from './components/dashboard/GuruDashboard';
import { SearchModal } from './components/search/SearchModal';
import { AuthModal } from './components/auth/AuthModal';
import { Article } from './types';

function MainPortal() {
  const { articles } = useNews();
  const { currentUser, isAdmin, isGuru } = useAuth();

  const [currentView, setCurrentView] = useState<
    'home' | 'article' | 'category' | 'regional' | 'gallery' | 'agenda' | 'static' | 'admin' | 'guru'
  >('home');

  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('hukum');
  const [selectedStaticSlug, setSelectedStaticSlug] = useState<string>('pedoman-media-siber');

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  const handleSelectArticle = (articleId?: string, slug?: string) => {
    let target = articleId ? articles.find(a => a.id === articleId) : null;
    if (!target && slug) {
      target = articles.find(a => a.slug === slug) || null;
    }
    if (target) {
      setSelectedArticleId(target.id);
      setCurrentView('article');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (categorySlug: string) => {
    setSelectedCategorySlug(categorySlug);
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateStaticPage = (slug: string) => {
    setSelectedStaticSlug(slug);
    setCurrentView('static');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateDashboard = () => {
    if (isAdmin) {
      setCurrentView('admin');
    } else if (isGuru) {
      setCurrentView('guru');
    } else {
      setIsAuthOpen(true);
    }
  };

  // Active article object
  const activeArticle = articles.find(a => a.id === selectedArticleId);

  // If in admin dashboard view and user is admin
  if (currentView === 'admin') {
    if (!isAdmin) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-headline">Akses Terbatas Redaktur</h2>
            <p className="text-xs text-slate-600">
              Halaman ini memerlukan hak akses tingkat ADMIN. Silakan login menggunakan akun administrator.
            </p>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
            >
              Buka Form Login
            </button>
            <button
              onClick={() => setCurrentView('home')}
              className="text-xs text-indigo-600 hover:underline block mx-auto"
            >
              Kembali ke Portal Publik
            </button>
          </div>
          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            onSuccess={() => {
              if (isAdmin) setCurrentView('admin');
              else if (isGuru) setCurrentView('guru');
            }}
          />
        </div>
      );
    }

    return (
      <AdminDashboard
        onBackToPortal={() => setCurrentView('home')}
        onSelectArticle={(id, slug) => handleSelectArticle(id, slug)}
      />
    );
  }

  // If in guru dashboard view
  if (currentView === 'guru') {
    if (!currentUser) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-headline">Akses Kontributor Guru</h2>
            <p className="text-xs text-slate-600">
              Silakan login dengan akun Guru / Kontributor untuk mengakses meja kerja.
            </p>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
            >
              Masuk Akun Guru
            </button>
            <button
              onClick={() => setCurrentView('home')}
              className="text-xs text-indigo-600 hover:underline block mx-auto"
            >
              Kembali ke Portal Publik
            </button>
          </div>
          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            onSuccess={() => {
              if (isAdmin) setCurrentView('admin');
              else if (isGuru) setCurrentView('guru');
            }}
          />
        </div>
      );
    }

    return (
      <GuruDashboard
        onBackToPortal={() => setCurrentView('home')}
        onSelectArticle={(id, slug) => handleSelectArticle(id, slug)}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Official Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSelectCategory={handleSelectCategory}
        onNavigateHome={() => setCurrentView('home')}
        onNavigateGallery={() => setCurrentView('gallery')}
        onNavigateAgenda={() => setCurrentView('agenda')}
        onNavigateRegional={() => setCurrentView('regional')}
        onNavigateStaticPage={handleNavigateStaticPage}
        onNavigateDashboard={handleNavigateDashboard}
        currentView={currentView}
        selectedCategorySlug={currentView === 'category' ? selectedCategorySlug : undefined}
      />

      {/* Breaking News Ticker (visible on all public pages) */}
      <BreakingNewsTicker onSelectArticle={(id, slug) => handleSelectArticle(id, slug)} />

      {/* VIEW SWITCHER */}
      <main className="flex-1">
        {/* 1. Article Detail View */}
        {currentView === 'article' && activeArticle && (
          <ArticleDetailPage
            article={activeArticle}
            onBack={() => setCurrentView('home')}
            onSelectArticle={(id, slug) => handleSelectArticle(id, slug)}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {/* 2. Category Channel Archive View */}
        {currentView === 'category' && (
          <CategoryPageView
            categorySlug={selectedCategorySlug}
            onBack={() => setCurrentView('home')}
            onSelectArticle={(id, slug) => handleSelectArticle(id, slug)}
          />
        )}

        {/* 3. Static Pages View */}
        {currentView === 'static' && (
          <StaticPageView
            pageSlug={selectedStaticSlug}
            onBack={() => setCurrentView('home')}
          />
        )}

        {/* 4. Dedicated Regional View */}
        {currentView === 'regional' && (
          <div className="py-6">
            <RegionalNewsSection onSelectArticle={(id, slug) => handleSelectArticle(id, slug)} />
          </div>
        )}

        {/* 5. Dedicated Gallery View */}
        {currentView === 'gallery' && (
          <div className="py-6">
            <PhotoVideoGallerySection />
          </div>
        )}

        {/* 6. Dedicated Agenda View */}
        {currentView === 'agenda' && (
          <div className="py-6">
            <AgendaSection />
          </div>
        )}

        {/* 7. Homepage */}
        {currentView === 'home' && (
          <>
            {/* Hero Slider */}
            <HeroSlider onSelectArticle={(id, slug) => handleSelectArticle(id, slug)} />

            {/* TEKS BERJALAN (RUNNING TEXT / TICKER) TEPAT DI ATAS MENU KARTU KATEGORI BERITA */}
            <CategoryMarqueeTicker />

            {/* MENU KARTU KATEGORI BERITA */}
            <CategoryCardsMenu onSelectCategory={handleSelectCategory} />

            {/* Top Stories & Sidebar Trending */}
            <TopStoriesSection
              onSelectArticle={(id, slug) => handleSelectArticle(id, slug)}
              onSelectCategory={handleSelectCategory}
            />

            {/* Kanal Khusus Blocks (Peradilan, Kejaksaan, Kepolisian, Opini, Investigasi) */}
            <CategoryKanalSection
              onSelectArticle={(id, slug) => handleSelectArticle(id, slug)}
              onSelectCategory={handleSelectCategory}
            />

            {/* Berita Daerah Interaktif (Provinsi & Kab/Kota) */}
            <RegionalNewsSection onSelectArticle={(id, slug) => handleSelectArticle(id, slug)} />

            {/* Galeri Foto & Video Jurnalistik */}
            <PhotoVideoGallerySection />

            {/* Agenda Sidang & Peristiwa Mendatang */}
            <AgendaSection />

            {/* Buletin / Newsletter Berlangganan */}
            <NewsletterCard />
          </>
        )}
      </main>

      {/* Official Media Statutory Footer */}
      <Footer
        onNavigateCategory={handleSelectCategory}
        onNavigateStaticPage={handleNavigateStaticPage}
      />

      {/* Advanced Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={(id, slug) => handleSelectArticle(id, slug)}
      />

      {/* Redaksi Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          if (isAdmin) setCurrentView('admin');
          else if (isGuru) setCurrentView('guru');
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NewsProvider>
        <MainPortal />
      </NewsProvider>
    </AuthProvider>
  );
}
