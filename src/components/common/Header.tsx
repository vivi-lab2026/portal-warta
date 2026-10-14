import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { useNews } from '../../context/NewsContext';
import { useAuth } from '../../context/AuthContext';
import {
  Search,
  Bell,
  User as UserIcon,
  Menu,
  X,
  Volume2,
  Calendar,
  Share2,
  Lock,
  ChevronDown,
  Layers,
  MapPin,
  Camera,
  CheckCircle2
} from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onSelectCategory: (categorySlug: string) => void;
  onNavigateHome: () => void;
  onNavigateGallery: () => void;
  onNavigateAgenda: () => void;
  onNavigateRegional: () => void;
  onNavigateStaticPage: (slug: string) => void;
  onNavigateDashboard: () => void;
  currentView: string;
  selectedCategorySlug?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenAuth,
  onSelectCategory,
  onNavigateHome,
  onNavigateGallery,
  onNavigateAgenda,
  onNavigateRegional,
  onNavigateStaticPage,
  onNavigateDashboard,
  currentView,
  selectedCategorySlug
}) => {
  const { categories, breakingNews, settings, notifications, pushEnabled, togglePushNotifications, markNotificationRead } = useNews();
  const { currentUser, logout, isAdmin, isGuru } = useAuth();

  const [currentTimeWIB, setCurrentTimeWIB] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [notifOpen, setNotifOpen] = useState<boolean>(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState<boolean>(false);

  // Live Clock Asia/Jakarta
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Jakarta'
      }).format(now);
      setCurrentTimeWIB(`${formatted} WIB`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeCategories = categories.filter(c => c.active);
  const primaryCategories = activeCategories.slice(0, 9);
  const moreCategories = activeCategories.slice(9);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs border-b border-slate-200">
      {/* 1. TOP BAR */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Date & Clock WIB */}
          <div className="flex items-center gap-2 whitespace-nowrap text-slate-400 font-medium">
            <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="tabular-nums">{currentTimeWIB || 'Memuat waktu...'}</span>
          </div>

          {/* Center: Live Ticker summary or tagline snippet on desktop */}
          <div className="hidden lg:flex items-center gap-3 text-slate-300 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-gradient-to-r from-red-500 to-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
              Aktual
            </span>
            <span className="truncate max-w-md">
              {breakingNews.find(b => b.active)?.title || settings.tagline}
            </span>
          </div>

          {/* Right: Quick actions (Push Notify, Socials, Redaksi Access) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Push Notification Toggle */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-1 text-slate-400 hover:text-white transition-colors"
                title="Pembaruan Berita Terkini"
                aria-label="Pembaruan Berita Terkini"
              >
                <Bell className="w-3.5 h-3.5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-slate-900 animate-pulse"></span>
                )}
              </button>

              {/* Notification Popover */}
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 text-slate-800">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <Bell className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Notifikasi Berita</span>
                    </div>
                    <button
                      onClick={togglePushNotifications}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium"
                    >
                      {pushEnabled ? 'Aktif' : 'Nonaktif'}
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto mt-2">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 py-3 text-center">Tidak ada notifikasi baru.</p>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationRead(n.id);
                            setNotifOpen(false);
                          }}
                          className={`py-2 px-1 text-xs cursor-pointer hover:bg-slate-50 transition-colors ${
                            !n.read ? 'font-semibold text-slate-900' : 'text-slate-600'
                          }`}
                        >
                          <p className="line-clamp-2">{n.title}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Social links */}
            <div className="hidden sm:flex items-center gap-2 border-l border-slate-700 pl-3">
              <a
                href={settings.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Facebook Warta Hukum"
              >
                FB
              </a>
              <span className="text-slate-600">·</span>
              <a
                href={settings.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Twitter X Warta Hukum"
              >
                X
              </a>
              <span className="text-slate-600">·</span>
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Instagram Warta Hukum"
              >
                IG
              </a>
            </div>

            {/* User Session / Login Button */}
            <div className="border-l border-slate-700 pl-3">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={onNavigateDashboard}
                    className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-semibold"
                  >
                    <UserIcon className="w-3 h-3" />
                    <span>{currentUser.role === 'ADMIN' ? 'Admin Panel' : 'Panel Guru'}</span>
                  </button>
                  <button
                    onClick={logout}
                    className="text-[10px] text-slate-400 hover:text-red-300 ml-1"
                  >
                    (Keluar)
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-1 text-xs text-slate-300 hover:text-white font-medium"
                >
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>Login Redaksi</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRAND HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Identity */}
          <div
            onClick={onNavigateHome}
            className="cursor-pointer group select-none"
          >
            <Logo size="lg" withTagline={true} />
          </div>

          {/* Quick Header Utility: Search Trigger + Mobile Menu Button */}
          <div className="flex items-center gap-2.5">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors border border-slate-200/80 shadow-2xs"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Cari Berita Hukum...</span>
            </button>

            {/* Daerah Shortcut */}
            <button
              onClick={onNavigateRegional}
              className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors border ${
                currentView === 'regional'
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Berita Daerah</span>
            </button>

            {/* Galeri Shortcut */}
            <button
              onClick={onNavigateGallery}
              className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors border ${
                currentView === 'gallery'
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-indigo-500" />
              <span>Galeri &amp; Video</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. CATEGORY NAVIGATION BAR */}
      <nav className="hidden lg:block bg-slate-50/80 backdrop-blur-md border-t border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-1 py-1">
            {/* Beranda link */}
            <button
              onClick={onNavigateHome}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                currentView === 'home' && !selectedCategorySlug
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Beranda
            </button>

            {/* Primary Category Links */}
            {primaryCategories.map(cat => {
              const isActive = selectedCategorySlug === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.slug)}
                  className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 via-amber-600 to-indigo-600 text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}

            {/* More Categories Dropdown */}
            {moreCategories.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 whitespace-nowrap"
                >
                  <span>Kanal Lainnya</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </button>

                {categoryDropdownOpen && (
                  <div
                    onMouseLeave={() => setCategoryDropdownOpen(false)}
                    className="absolute left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1"
                  >
                    {moreCategories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onSelectCategory(cat.slug);
                          setCategoryDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-1.5 text-xs font-medium hover:bg-slate-50 flex items-center justify-between ${
                          selectedCategorySlug === cat.slug ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'
                        }`}
                      >
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Agenda Shortcut */}
          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateAgenda}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'agenda'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Calendar className="w-3 h-3 text-amber-600" />
              <span>Agenda Sidang</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 4. MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => {
                onNavigateHome();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg text-xs font-bold bg-slate-900 text-white"
            >
              Beranda
            </button>
            <button
              onClick={() => {
                onNavigateRegional();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800"
            >
              Berita Daerah
            </button>
            <button
              onClick={() => {
                onNavigateGallery();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800"
            >
              Galeri Foto &amp; Video
            </button>
            <button
              onClick={() => {
                onNavigateAgenda();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800"
            >
              Agenda Sidang
            </button>
          </div>

          {/* All Categories list */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Kanal Berita
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {activeCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.slug);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-2.5 py-1.5 rounded-md text-xs font-medium truncate ${
                    selectedCategorySlug === cat.slug
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Static Pages & Redaksi */}
          <div className="pt-3 border-t border-slate-100 space-y-1 text-xs">
            <button
              onClick={() => {
                onNavigateStaticPage('pedoman-media-siber');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-slate-600 hover:text-slate-900 py-1"
            >
              Pedoman Media Siber
            </button>
            <button
              onClick={() => {
                onNavigateStaticPage('hak-jawab');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-slate-600 hover:text-slate-900 py-1"
            >
              Hak Jawab &amp; Koreksi
            </button>
            <button
              onClick={() => {
                onNavigateStaticPage('redaksi');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-slate-600 hover:text-slate-900 py-1"
            >
              Susunan Redaksi &amp; Kontak
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
