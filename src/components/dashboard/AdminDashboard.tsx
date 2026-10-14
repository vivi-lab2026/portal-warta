import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { useAuth } from '../../context/AuthContext';
import { Article, ArticleStatus, Category, User } from '../../types';
import { formatShortDateIndonesian, formatDateIndonesian, handleImageError } from '../../utils/mediaFallback';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  CheckSquare,
  FolderTree,
  Tags,
  Zap,
  Sliders,
  Star,
  MapPin,
  Camera,
  Calendar,
  Users,
  FileCode,
  Globe,
  Settings,
  History,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Send,
  Save,
  RotateCcw,
  Search,
  Filter,
  ExternalLink,
  ShieldCheck,
  LogOut,
  ChevronRight
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToPortal: () => void;
  onSelectArticle: (articleId: string, slug: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToPortal,
  onSelectArticle
}) => {
  const {
    articles,
    categories,
    tags,
    breakingNews,
    heroSlides,
    gallery,
    agendas,
    settings,
    activityLogs,
    addArticle,
    updateArticle,
    deleteArticle,
    approveArticle,
    requestRevision,
    rejectArticle,
    publishArticle,
    archiveArticle,
    addCategory,
    updateCategory,
    deleteCategory,
    addTag,
    addBreakingNews,
    toggleBreakingNews,
    deleteBreakingNews,
    addHeroSlide,
    deleteHeroSlide,
    addGalleryItem,
    deleteGalleryItem,
    addAgenda,
    updateAgenda,
    deleteAgenda,
    updateSettings,
    resetToDefault
  } = useNews();

  const { currentUser, users, logout, createUser, updateUserStatus } = useAuth();

  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Filter & Search states for Articles Table
  const [articleSearch, setArticleSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Revision Modal State
  const [revisionModalArticle, setRevisionModalArticle] = useState<Article | null>(null);
  const [revisionNote, setRevisionNote] = useState<string>('');

  // Article Editor State (For adding / editing)
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCategory, setFormCategory] = useState('Hukum');
  const [formTags, setFormTags] = useState('');
  const [formProvince, setFormProvince] = useState('DKI Jakarta');
  const [formCity, setFormCity] = useState('Jakarta Pusat');
  const [formCoverImage, setFormCoverImage] = useState('');
  const [formCaption, setFormCaption] = useState('');
  const [formImageCredit, setFormImageCredit] = useState('');
  const [formCaseStatus, setFormCaseStatus] = useState('');
  const [formIsBreaking, setFormIsBreaking] = useState(false);
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formInHeroSlider, setFormInHeroSlider] = useState(false);
  const [formIsOpinion, setFormIsOpinion] = useState(false);
  const [formStatus, setFormStatus] = useState<ArticleStatus>('published');
  const [formAuthorName, setFormAuthorName] = useState(currentUser?.name || 'Redaksi WARTA HUKUM');
  const [formSuccessMessage, setFormSuccessMessage] = useState('');

  // New Category State
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatOrder, setNewCatOrder] = useState<number>(1);

  // New User State
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'ADMIN' | 'GURU'>('GURU');
  const [newUserBio, setNewUserBio] = useState('');

  // New Agenda State
  const [agendaTitle, setAgendaTitle] = useState('');
  const [agendaDate, setAgendaDate] = useState('');
  const [agendaTime, setAgendaTime] = useState('09:00 WIB');
  const [agendaLocation, setAgendaLocation] = useState('');
  const [agendaOrganizer, setAgendaOrganizer] = useState('');
  const [agendaDesc, setAgendaDesc] = useState('');

  // New Gallery State
  const [galTitle, setGalTitle] = useState('');
  const [galType, setGalType] = useState<'photo' | 'video'>('photo');
  const [galUrl, setGalUrl] = useState('');
  const [galCaption, setGalCaption] = useState('');
  const [galPhotographer, setGalPhotographer] = useState('');
  const [galCategory, setGalCategory] = useState('Penegakan Hukum');

  // New Breaking News State
  const [newBreakingTitle, setNewBreakingTitle] = useState('');
  const [newBreakingPriority, setNewBreakingPriority] = useState<number>(1);

  // Stats calculation
  const totalArticles = articles.length;
  const publishedCount = articles.filter(a => a.status === 'published').length;
  const draftCount = articles.filter(a => a.status === 'draft').length;
  const submittedCount = articles.filter(a => a.status === 'submitted' || a.status === 'in_review').length;
  const revisionCount = articles.filter(a => a.status === 'needs_revision').length;

  const handleStartEditArticle = (article: Article) => {
    setEditingArticleId(article.id);
    setFormTitle(article.title);
    setFormSummary(article.summary);
    setFormContent(article.content);
    setFormCategory(article.category);
    setFormTags(article.tags?.join(', ') || '');
    setFormProvince(article.location?.province || 'DKI Jakarta');
    setFormCity(article.location?.city || 'Jakarta Pusat');
    setFormCoverImage(article.coverImage);
    setFormCaption(article.caption || '');
    setFormImageCredit(article.imageCredit || '');
    setFormCaseStatus(article.caseStatus || '');
    setFormIsBreaking(article.isBreaking || false);
    setFormIsFeatured(article.isFeatured || false);
    setFormInHeroSlider(article.inHeroSlider || false);
    setFormIsOpinion(article.isOpinion || false);
    setFormStatus(article.status);
    setFormAuthorName(article.authorName);
    setActiveTab('add-article');
  };

  const handleResetArticleForm = () => {
    setEditingArticleId(null);
    setFormTitle('');
    setFormSummary('');
    setFormContent('');
    setFormCategory('Hukum');
    setFormTags('');
    setFormProvince('DKI Jakarta');
    setFormCity('Jakarta Pusat');
    setFormCoverImage('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1000&auto=format&fit=crop&q=80');
    setFormCaption('');
    setFormImageCredit('Dokumentasi Redaksi WARTA HUKUM');
    setFormCaseStatus('');
    setFormIsBreaking(false);
    setFormIsFeatured(false);
    setFormInHeroSlider(false);
    setFormIsOpinion(false);
    setFormStatus('published');
    setFormAuthorName(currentUser?.name || 'Redaksi WARTA HUKUM');
    setFormSuccessMessage('');
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) {
      alert('Judul dan isi artikel tidak boleh kosong.');
      return;
    }

    const tagList = formTags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const articlePayload = {
      title: formTitle.trim(),
      summary: formSummary.trim() || formTitle.trim().slice(0, 160),
      content: formContent.trim(),
      category: formCategory,
      tags: tagList,
      location: { province: formProvince, city: formCity },
      coverImage: formCoverImage.trim() || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1000&auto=format&fit=crop&q=80',
      caption: formCaption.trim(),
      imageCredit: formImageCredit.trim(),
      authorId: currentUser?.id || 'admin-1',
      authorName: formAuthorName.trim(),
      authorRole: 'Redaksi Pusat',
      status: formStatus,
      isBreaking: formIsBreaking,
      isFeatured: formIsFeatured,
      inHeroSlider: formInHeroSlider,
      isOpinion: formIsOpinion,
      readingTimeMinutes: Math.max(1, Math.ceil(formContent.split(' ').length / 200)),
      caseStatus: formCaseStatus.trim() || undefined
    };

    if (editingArticleId) {
      updateArticle(editingArticleId, articlePayload);
      setFormSuccessMessage('Perubahan artikel berhasil disimpan!');
    } else {
      addArticle(articlePayload);
      setFormSuccessMessage('Artikel baru berhasil diterbitkan/disimpan!');
    }

    setTimeout(() => {
      setFormSuccessMessage('');
      setActiveTab('articles');
      handleResetArticleForm();
    }, 1500);
  };

  const filteredArticles = articles.filter(a => {
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && a.category !== categoryFilter) return false;
    if (articleSearch.trim()) {
      const q = articleSearch.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.authorName.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Admin Navigation Header */}
      <header className="bg-slate-900 text-white px-4 sm:px-6 py-3 border-b border-slate-800 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="font-headline font-bold text-lg text-white tracking-tight">
              PANEL REDAKSI <span className="text-amber-400">WARTA HUKUM</span>
            </span>
          </div>
          <span className="text-[10px] bg-red-600/90 text-white font-bold px-2 py-0.5 rounded uppercase tracking-wider hidden sm:inline">
            Admin Akses Penuh
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={onBackToPortal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium border border-slate-700"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>Lihat Portal Publik</span>
          </button>

          <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
            <span className="hidden md:inline text-slate-300 font-medium">
              {currentUser?.name}
            </span>
            <button
              onClick={() => {
                logout();
                onBackToPortal();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
              title="Keluar dari Panel"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Admin Sidebar Menu (17 tabs) */}
        <aside className="w-64 bg-slate-950 text-slate-300 p-3 flex flex-col gap-1 overflow-y-auto shrink-0 border-r border-slate-800 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1">
            Navigasi Utama
          </span>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors font-semibold ${
              activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>1. Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors font-semibold ${
              activeTab === 'articles' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4" />
              <span>2. Semua Berita</span>
            </div>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded-md tabular-nums">
              {totalArticles}
            </span>
          </button>
          <button
            onClick={() => {
              handleResetArticleForm();
              setActiveTab('add-article');
            }}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors font-semibold ${
              activeTab === 'add-article' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>3. Tambah Berita</span>
          </button>
          <button
            onClick={() => setActiveTab('approvals')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors font-semibold ${
              activeTab === 'approvals' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <CheckSquare className="w-4 h-4 text-amber-400" />
              <span>4. Persetujuan Berita</span>
            </div>
            {submittedCount > 0 && (
              <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                {submittedCount}
              </span>
            )}
          </button>

          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1.5 mt-2">
            Struktur &amp; Kanal
          </span>
          <button
            onClick={() => setActiveTab('categories')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors font-semibold ${
              activeTab === 'categories' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>5. Kategori Berita</span>
          </button>
          <button
            onClick={() => setActiveTab('tags')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors font-semibold ${
              activeTab === 'tags' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Tags className="w-4 h-4" />
            <span>6. Tag Berita</span>
          </button>
          <button
            onClick={() => setActiveTab('breaking')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors font-semibold ${
              activeTab === 'breaking' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4 text-red-400" />
            <span>7. Breaking News</span>
          </button>
          <button
            onClick={() => setActiveTab('slider')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors font-semibold ${
              activeTab === 'slider' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>8. Slider Beranda</span>
          </button>
          <button
            onClick={() => setActiveTab('featured')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors font-semibold ${
              activeTab === 'featured' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Star className="w-4 h-4 text-amber-400" />
            <span>9. Berita Unggulan</span>
          </button>
          <button
            onClick={() => setActiveTab('regional')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors font-semibold ${
              activeTab === 'regional' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>10. Berita Daerah</span>
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors font-semibold ${
              activeTab === 'gallery' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4 text-teal-400" />
            <span>11. Galeri &amp; Video</span>
          </button>
          <button
            onClick={() => setActiveTab('agendas')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors font-semibold ${
              activeTab === 'agendas' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>12. Agenda Sidang</span>
          </button>

          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1.5 mt-2">
            Manajemen &amp; Konfigurasi
          </span>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors font-semibold ${
              activeTab === 'users' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 text-sky-400" />
            <span>13. Pengguna (Guru/Kontributor)</span>
          </button>
          <button
            onClick={() => setActiveTab('static-pages')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors font-semibold ${
              activeTab === 'static-pages' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>14. Halaman Statis</span>
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors font-semibold ${
              activeTab === 'seo' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>15. Pengaturan SEO</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors font-semibold ${
              activeTab === 'settings' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4 text-amber-400" />
            <span>16. Pengaturan Media</span>
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors font-semibold ${
              activeTab === 'logs' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <History className="w-4 h-4 text-slate-400" />
            <span>17. Log Aktivitas</span>
          </button>
        </aside>

        {/* Right Main Dashboard Workspace */}
        <main className="flex-1 p-5 sm:p-7 overflow-y-auto">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="text-xl sm:text-2xl font-headline font-bold text-slate-900">
                  Ringkasan Kinerja Redaksi
                </h2>
                <p className="text-xs text-slate-500">
                  Pantau statistik liputan berita, alur peninjauan draf, dan aktivitas jurnalis WARTA HUKUM
                </p>
              </div>

              {/* Rainbow Gradient Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rainbow-border-card p-4 bg-white rounded-xl shadow-xs border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Total Berita</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-2xl sm:text-3xl font-bold font-headline text-slate-900 tabular-nums">
                      {totalArticles}
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                      Semua Status
                    </span>
                  </div>
                </div>

                <div className="rainbow-border-card p-4 bg-white rounded-xl shadow-xs border border-slate-200">
                  <span className="text-xs text-emerald-600 font-medium">Berita Terbit</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-2xl sm:text-3xl font-bold font-headline text-emerald-700 tabular-nums">
                      {publishedCount}
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">
                      Tayang Publik
                    </span>
                  </div>
                </div>

                <div className="rainbow-border-card p-4 bg-white rounded-xl shadow-xs border border-slate-200">
                  <span className="text-xs text-amber-600 font-medium">Menunggu Peninjauan</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-2xl sm:text-3xl font-bold font-headline text-amber-700 tabular-nums">
                      {submittedCount}
                    </span>
                    <span className="text-[10px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-bold">
                      Draf Diajukan
                    </span>
                  </div>
                </div>

                <div className="rainbow-border-card p-4 bg-white rounded-xl shadow-xs border border-slate-200">
                  <span className="text-xs text-rose-600 font-medium">Perlu Revisi</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-2xl sm:text-3xl font-bold font-headline text-rose-700 tabular-nums">
                      {revisionCount}
                    </span>
                    <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded font-bold">
                      Catatan Editor
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Strip */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-sm text-slate-900">Aksi Cepat Redaktur</h4>
                  <p className="text-xs text-slate-500">Akses langsung tugas editorial yang membutuhkan tindakan segera</p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => {
                      handleResetArticleForm();
                      setActiveTab('add-article');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-indigo-600 text-white font-bold text-xs shadow-xs hover:opacity-95"
                  >
                    + Tulis Berita Baru
                  </button>
                  <button
                    onClick={() => setActiveTab('approvals')}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs"
                  >
                    Periksa Draf Guru ({submittedCount})
                  </button>
                  <button
                    onClick={() => setActiveTab('breaking')}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs"
                  >
                    Setel Breaking News
                  </button>
                </div>
              </div>

              {/* Activity Logs in Dashboard */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-indigo-600" />
                    <h3 className="font-headline font-bold text-base text-slate-900">
                      Log Aktivitas Redaksi Terkini
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('logs')}
                    className="text-xs font-semibold text-indigo-600 hover:underline"
                  >
                    Lihat Semua Log
                  </button>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  {activityLogs.slice(0, 5).map(log => (
                    <div key={log.id} className="py-2.5 flex items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{log.action}:</span>
                          <span className="text-slate-700 font-medium line-clamp-1">{log.targetTitle}</span>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          Oleh: {log.userName} ({log.role}) {log.details && `· ${log.details}`}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 tabular-nums shrink-0">
                        {formatShortDateIndonesian(log.timestamp)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SEMUA BERITA */}
          {activeTab === 'articles' && (
            <div className="space-y-5 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-headline font-bold text-slate-900">
                    Manajemen Semua Berita
                  </h2>
                  <p className="text-xs text-slate-500">
                    Daftar seluruh artikel berita, filter status, pengeditan, dan pengarsipan
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleResetArticleForm();
                    setActiveTab('add-article');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 self-start"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Tambah Berita Baru</span>
                </button>
              </div>

              {/* Filter & Search Bar */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center gap-3 text-xs">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={articleSearch}
                    onChange={e => setArticleSearch(e.target.value)}
                    placeholder="Cari judul, penulis, atau kata kunci..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="filter-status-select" className="text-slate-500 font-medium">Status:</label>
                  <select
                    id="filter-status-select"
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 text-xs font-medium outline-none"
                  >
                    <option value="all">Semua Status</option>
                    <option value="published">Terbit (Published)</option>
                    <option value="submitted">Diajukan</option>
                    <option value="needs_revision">Perlu Revisi</option>
                    <option value="draft">Draf</option>
                    <option value="approved">Disetujui</option>
                    <option value="archived">Diarsipkan</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="filter-cat-select" className="text-slate-500 font-medium">Kategori:</label>
                  <select
                    id="filter-cat-select"
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 text-xs font-medium outline-none"
                  >
                    <option value="all">Semua Kategori</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Articles Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Judul &amp; Ringkasan</th>
                        <th className="py-3 px-3">Kategori</th>
                        <th className="py-3 px-3">Penulis</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3">Pembaca</th>
                        <th className="py-3 px-3">Tanggal</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredArticles.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-8 text-slate-400">
                            Tidak ada artikel yang sesuai kriteria filter.
                          </td>
                        </tr>
                      ) : (
                        filteredArticles.map(art => (
                          <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4 max-w-xs">
                              <div className="font-bold text-slate-900 line-clamp-1">
                                {art.title}
                              </div>
                              <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                {art.summary}
                              </div>
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap">
                              <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[10px]">
                                {art.category}
                              </span>
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap text-slate-700">
                              {art.authorName}
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap">
                              {art.status === 'published' && (
                                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                  Terbit
                                </span>
                              )}
                              {art.status === 'submitted' && (
                                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">
                                  Menunggu
                                </span>
                              )}
                              {art.status === 'needs_revision' && (
                                <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                  Perlu Revisi
                                </span>
                              )}
                              {art.status === 'draft' && (
                                <span className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded">
                                  Draf
                                </span>
                              )}
                              {art.status === 'approved' && (
                                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                  Disetujui
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3 tabular-nums whitespace-nowrap">
                              {art.viewCount}
                            </td>
                            <td className="py-3 px-3 tabular-nums whitespace-nowrap text-[11px]">
                              {formatShortDateIndonesian(art.publishedAt || art.createdAt)}
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap space-x-1">
                              {art.status === 'published' && (
                                <button
                                  onClick={() => onSelectArticle(art.id, art.slug)}
                                  className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-900"
                                  title="Pratinjau Publik"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() => handleStartEditArticle(art)}
                                className="p-1 hover:bg-slate-100 rounded text-indigo-600 hover:text-indigo-800"
                                title="Edit Berita"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Yakin ingin menghapus berita "${art.title}"?`)) {
                                    deleteArticle(art.id);
                                  }
                                }}
                                className="p-1 hover:bg-slate-100 rounded text-rose-500 hover:text-rose-700"
                                title="Hapus Berita"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TAMBAH / EDIT BERITA */}
          {activeTab === 'add-article' && (
            <div className="max-w-4xl bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-xl font-headline font-bold text-slate-900">
                    {editingArticleId ? 'Edit Artikel Berita' : 'Tulis Berita Baru'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Pastikan informasi mematuhi Kode Etik Jurnalistik dan asas praduga tak bersalah
                  </p>
                </div>
                {editingArticleId && (
                  <button
                    onClick={handleResetArticleForm}
                    className="text-xs text-rose-600 hover:underline font-semibold"
                  >
                    Batal Edit (Buat Baru)
                  </button>
                )}
              </div>

              {formSuccessMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{formSuccessMessage}</span>
                </div>
              )}

              <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
                {/* Judul Berita */}
                <div>
                  <label htmlFor="article-title" className="block text-slate-800 font-bold mb-1">
                    Judul Berita (Headline) *
                  </label>
                  <input
                    id="article-title"
                    type="text"
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    required
                    placeholder="Contoh: Kejaksaan Agung Sita Aset Rp 1,2 Triliun Terkait Dugaan Tipikor..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold focus:outline-none focus:border-indigo-600 text-xs sm:text-sm"
                  />
                </div>

                {/* Ringkasan / Lead */}
                <div>
                  <label htmlFor="article-lead" className="block text-slate-800 font-bold mb-1">
                    Lead / Ringkasan Singkat (1-2 Paragraf Awal) *
                  </label>
                  <textarea
                    id="article-lead"
                    rows={2}
                    value={formSummary}
                    onChange={e => setFormSummary(e.target.value)}
                    required
                    placeholder="Ringkasan 5W+1H yang lugas dan informatif..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-indigo-600 text-xs"
                  ></textarea>
                </div>

                {/* Kategori, Penulis, Status Perkara */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="article-category" className="block text-slate-800 font-bold mb-1">Kategori *</label>
                    <select
                      id="article-category"
                      value={formCategory}
                      onChange={e => setFormCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-medium text-xs outline-none"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="article-author" className="block text-slate-800 font-bold mb-1">Nama Penulis / Jurnalis</label>
                    <input
                      id="article-author"
                      type="text"
                      value={formAuthorName}
                      onChange={e => setFormAuthorName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 text-xs"
                    />
                  </div>

                  <div>
                    <label htmlFor="article-case-status" className="block text-slate-800 font-bold mb-1">
                      Status Perkara (Opsional)
                    </label>
                    <input
                      id="article-case-status"
                      type="text"
                      value={formCaseStatus}
                      onChange={e => setFormCaseStatus(e.target.value)}
                      placeholder="e.g. Penyidikan / Sidang Tuntutan"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 text-xs"
                    />
                  </div>
                </div>

                {/* Wilayah / Lokasi Berita Daerah */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="article-province" className="block text-slate-800 font-bold mb-1">Provinsi Berita</label>
                    <input
                      id="article-province"
                      type="text"
                      value={formProvince}
                      onChange={e => setFormProvince(e.target.value)}
                      placeholder="e.g. DKI Jakarta / Jawa Barat / Jawa Timur"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 text-xs"
                    />
                  </div>

                  <div>
                    <label htmlFor="article-city" className="block text-slate-800 font-bold mb-1">Kabupaten / Kota</label>
                    <input
                      id="article-city"
                      type="text"
                      value={formCity}
                      onChange={e => setFormCity(e.target.value)}
                      placeholder="e.g. Jakarta Selatan / Bandung / Surabaya"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 text-xs"
                    />
                  </div>
                </div>

                {/* Foto Sampul & Keterangan */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="article-cover" className="block text-slate-800 font-bold mb-1">URL Foto Sampul</label>
                    <input
                      id="article-cover"
                      type="text"
                      value={formCoverImage}
                      onChange={e => setFormCoverImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 text-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor="article-credit" className="block text-slate-800 font-bold mb-1">Kredit Fotografer</label>
                    <input
                      id="article-credit"
                      type="text"
                      value={formImageCredit}
                      onChange={e => setFormImageCredit(e.target.value)}
                      placeholder="Dok. Humas Kejagung / WARTA HUKUM"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 text-xs"
                    />
                  </div>
                </div>

                {/* Isi Berita */}
                <div>
                  <label htmlFor="article-content" className="block text-slate-800 font-bold mb-1">
                    Isi Lengkap Berita (Gunakan ### untuk Subjudul) *
                  </label>
                  <textarea
                    id="article-content"
                    rows={8}
                    value={formContent}
                    onChange={e => setFormContent(e.target.value)}
                    required
                    placeholder="Tuliskan naskah berita secara lengkap, berimbang, dan sertakan sumber resmi..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-slate-900 focus:outline-none focus:border-indigo-600 text-xs font-mono leading-relaxed"
                  ></textarea>
                </div>

                {/* Tags */}
                <div>
                  <label htmlFor="article-tags" className="block text-slate-800 font-bold mb-1">
                    Tag / Topik Terkait (Pisahkan dengan koma)
                  </label>
                  <input
                    id="article-tags"
                    type="text"
                    value={formTags}
                    onChange={e => setFormTags(e.target.value)}
                    placeholder="Tipikor, Mahkamah Konstitusi, Asas Praduga Tak Bersalah"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 text-xs"
                  />
                </div>

                {/* Editorial Toggles */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsBreaking}
                      onChange={e => setFormIsBreaking(e.target.checked)}
                      className="rounded border-slate-300 text-red-600"
                    />
                    <span className="font-semibold text-slate-800">Breaking News</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsFeatured}
                      onChange={e => setFormIsFeatured(e.target.checked)}
                      className="rounded border-slate-300 text-amber-600"
                    />
                    <span className="font-semibold text-slate-800">Berita Unggulan</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formInHeroSlider}
                      onChange={e => setFormInHeroSlider(e.target.checked)}
                      className="rounded border-slate-300 text-indigo-600"
                    />
                    <span className="font-semibold text-slate-800">Slider Beranda</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsOpinion}
                      onChange={e => setFormIsOpinion(e.target.checked)}
                      className="rounded border-slate-300 text-fuchsia-600"
                    />
                    <span className="font-semibold text-slate-800">Kolom Opini</span>
                  </label>
                </div>

                {/* Status Publikasi & Tombol Submit */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <label htmlFor="publish-status-select" className="font-bold text-slate-800">Status Publikasi:</label>
                    <select
                      id="publish-status-select"
                      value={formStatus}
                      onChange={e => setFormStatus(e.target.value as ArticleStatus)}
                      className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 font-bold text-slate-900 text-xs"
                    >
                      <option value="published">Terbit Langsung (Published)</option>
                      <option value="draft">Simpan Sebagai Draf</option>
                      <option value="scheduled">Terjadwal</option>
                      <option value="archived">Arsipkan</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleResetArticleForm}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                    >
                      Reset Form
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-indigo-600 hover:opacity-95 text-white font-bold shadow-md"
                    >
                      {editingArticleId ? 'Simpan Perubahan Artikel' : 'Terbitkan Berita'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: PERSETUJUAN BERITA (EDITORIAL REVIEW DESK) */}
          {activeTab === 'approvals' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h2 className="text-xl sm:text-2xl font-headline font-bold text-slate-900">
                  Meja Redaksi: Persetujuan Berita Kontributor (Guru)
                </h2>
                <p className="text-xs text-slate-500">
                  Periksa keakuratan, sumber, dan etika hukum artikel yang diajukan sebelum diterbitkan ke publik
                </p>
              </div>

              {articles.filter(a => a.status === 'submitted' || a.status === 'in_review').length === 0 ? (
                <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 text-slate-400 text-xs space-y-2">
                  <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
                  <p className="font-bold text-slate-800 text-sm">Semua Pengajuan Telah Diperiksa!</p>
                  <p>Tidak ada draf artikel yang menunggu persetujuan saat ini.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {articles
                    .filter(a => a.status === 'submitted' || a.status === 'in_review')
                    .map(item => (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl p-5 sm:p-6 border border-amber-200/90 shadow-2xs space-y-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="bg-amber-100 text-amber-900 font-bold text-[10px] px-2.5 py-0.5 rounded uppercase tracking-wider">
                            Diajukan oleh: {item.authorName} ({item.authorRole})
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Waktu Pengajuan: {formatDateIndonesian(item.updatedAt || item.createdAt)}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-indigo-600 uppercase">
                            {item.category} · {item.location.province}
                          </span>
                          <h3 className="text-base sm:text-lg font-headline font-bold text-slate-900 mt-1">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                            {item.summary}
                          </p>
                        </div>

                        {/* Article Content Snippet */}
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 font-mono max-h-36 overflow-y-auto">
                          {item.content}
                        </div>

                        {/* Action buttons: Setujui & Terbitkan / Minta Revisi / Tolak */}
                        <div className="pt-2 flex flex-wrap items-center justify-end gap-2.5 border-t border-slate-100">
                          <button
                            onClick={() => {
                              setRevisionModalArticle(item);
                              setRevisionNote('');
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200"
                          >
                            Minta Revisi &amp; Catatan
                          </button>
                          <button
                            onClick={() => {
                              const reason = prompt('Alasan penolakan berita:');
                              if (reason) rejectArticle(item.id, reason);
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                          >
                            Tolak
                          </button>
                          <button
                            onClick={() => {
                              approveArticle(item.id);
                              publishArticle(item.id);
                            }}
                            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                          >
                            Setujui &amp; Terbitkan Sekarang
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: KATEGORI BERITA */}
          {activeTab === 'categories' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-xl sm:text-2xl font-headline font-bold text-slate-900">
                  Manajemen Kategori Berita
                </h2>
                <p className="text-xs text-slate-500">
                  Tambah, ubah nama, urutkan, dan aktifkan/nonaktifkan kanal kategori publik
                </p>
              </div>

              {/* Add Category Form */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <h4 className="font-bold text-sm text-slate-900">Tambah Kategori Baru:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <input
                    type="text"
                    value={newCatName}
                    onChange={e => setNewCatName(e.target.value)}
                    placeholder="Nama Kategori (e.g. Mahkamah Militer)"
                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                  />
                  <input
                    type="text"
                    value={newCatDesc}
                    onChange={e => setNewCatDesc(e.target.value)}
                    placeholder="Deskripsi Singkat"
                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                  />
                  <button
                    onClick={() => {
                      if (!newCatName.trim()) return;
                      addCategory({
                        name: newCatName.trim(),
                        slug: newCatName.toLowerCase().replace(/\s+/g, '-'),
                        description: newCatDesc.trim() || 'Kanal berita ' + newCatName,
                        order: categories.length + 1,
                        active: true,
                        color: 'text-indigo-600'
                      });
                      setNewCatName('');
                      setNewCatDesc('');
                    }}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                  >
                    + Simpan Kategori
                  </button>
                </div>
              </div>

              {/* Categories List */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="divide-y divide-slate-100 text-xs">
                  {categories.map((cat, idx) => (
                    <div key={cat.id} className="p-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-slate-400 font-bold w-6">{idx + 1}.</span>
                        <div>
                          <span className="font-bold text-slate-900">{cat.name}</span>
                          <span className="text-[11px] text-slate-400 block">{cat.description}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateCategory(cat.id, { active: !cat.active })}
                          className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                            cat.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {cat.active ? 'Aktif' : 'Nonaktif'}
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Hapus kategori "${cat.name}"?`)) {
                              deleteCategory(cat.id);
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: BREAKING NEWS */}
          {activeTab === 'breaking' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-xl sm:text-2xl font-headline font-bold text-slate-900">
                  Manajemen Kilas Berita (Breaking News)
                </h2>
                <p className="text-xs text-slate-500">
                  Atur teks ticker berita darurat atau prioritas tinggi di bagian atas website
                </p>
              </div>

              {/* Add breaking news item */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <h4 className="font-bold text-sm text-slate-900">Tambah Breaking News:</h4>
                <div className="flex gap-3 text-xs">
                  <input
                    type="text"
                    value={newBreakingTitle}
                    onChange={e => setNewBreakingTitle(e.target.value)}
                    placeholder="Judul kilas berita prioritas..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                  />
                  <button
                    onClick={() => {
                      if (!newBreakingTitle.trim()) return;
                      addBreakingNews({
                        title: newBreakingTitle.trim(),
                        priority: 1,
                        active: true
                      });
                      setNewBreakingTitle('');
                    }}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold"
                  >
                    + Pasang Ticker
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="divide-y divide-slate-100 text-xs">
                  {breakingNews.map(item => (
                    <div key={item.id} className="p-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-red-500 shrink-0" />
                        <span className="font-semibold text-slate-900">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={() => toggleBreakingNews(item.id)}
                          className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                            item.active ? 'bg-red-100 text-red-800' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {item.active ? 'Tayang' : 'Mati'}
                        </button>
                        <button
                          onClick={() => deleteBreakingNews(item.id)}
                          className="p-1 text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: SLIDER BERANDA */}
          {activeTab === 'slider' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-xl sm:text-2xl font-headline font-bold text-slate-900">
                  Manajemen Slider Berita Utama
                </h2>
                <p className="text-xs text-slate-500">
                  Kelola rotasi gambar besar di halaman utama untuk berita unggulan berdaya tarik tinggi
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {heroSlides.map(slide => (
                  <div key={slide.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                    <div className="aspect-16/9 bg-slate-900 relative">
                      <img
                        src={slide.coverImage}
                        alt={slide.title}
                        onError={e => handleImageError(e, slide.category)}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        Urutan: {slide.order}
                      </span>
                    </div>
                    <div className="p-3 text-xs space-y-1">
                      <h4 className="font-bold text-slate-900 line-clamp-1">{slide.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2">{slide.summary}</p>
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-indigo-600">{slide.category}</span>
                        <button
                          onClick={() => deleteHeroSlide(slide.id)}
                          className="text-rose-600 hover:underline text-[11px] font-medium"
                        >
                          Hapus dari Slider
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 12: AGENDA SIDANG */}
          {activeTab === 'agendas' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-xl sm:text-2xl font-headline font-bold text-slate-900">
                  Manajemen Agenda Sidang &amp; Kegiatan Lembaga
                </h2>
                <p className="text-xs text-slate-500">
                  Jadwalkan agenda konferensi pers, sidang terbuka, dan seminar hukum
                </p>
              </div>

              {/* Add agenda form */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 text-xs">
                <h4 className="font-bold text-sm text-slate-900">Tambah Agenda Baru:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={agendaTitle}
                    onChange={e => setAgendaTitle(e.target.value)}
                    placeholder="Judul Agenda / Sidang"
                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                  />
                  <input
                    type="date"
                    value={agendaDate}
                    onChange={e => setAgendaDate(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                  />
                  <input
                    type="text"
                    value={agendaLocation}
                    onChange={e => setAgendaLocation(e.target.value)}
                    placeholder="Lokasi (e.g. Ruang Sidang Tipikor PN Jakarta Pusat)"
                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                  />
                  <input
                    type="text"
                    value={agendaOrganizer}
                    onChange={e => setAgendaOrganizer(e.target.value)}
                    placeholder="Penyelenggara (e.g. Kejagung RI / MK)"
                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                  />
                </div>
                <textarea
                  rows={2}
                  value={agendaDesc}
                  onChange={e => setAgendaDesc(e.target.value)}
                  placeholder="Keterangan singkat agenda..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900"
                ></textarea>
                <button
                  onClick={() => {
                    if (!agendaTitle.trim() || !agendaDate) {
                      alert('Isi judul dan tanggal agenda');
                      return;
                    }
                    addAgenda({
                      title: agendaTitle.trim(),
                      date: agendaDate,
                      time: agendaTime,
                      location: agendaLocation.trim(),
                      organizer: agendaOrganizer.trim(),
                      description: agendaDesc.trim(),
                      status: 'upcoming',
                      isPublic: true,
                      submittedBy: currentUser?.id || 'admin-1',
                      authorName: currentUser?.name
                    });
                    setAgendaTitle('');
                    setAgendaDate('');
                    setAgendaLocation('');
                    setAgendaOrganizer('');
                    setAgendaDesc('');
                  }}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  + Simpan Agenda
                </button>
              </div>

              {/* Agenda List */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="divide-y divide-slate-100 text-xs">
                  {agendas.map(ag => (
                    <div key={ag.id} className="p-4 flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{ag.title}</span>
                          <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
                            {ag.date} · {ag.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {ag.location} ({ag.organizer})
                        </p>
                      </div>
                      <button
                        onClick={() => deleteAgenda(ag.id)}
                        className="p-1 text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: PENGGUNA (GURU & KONTRIBUTOR) */}
          {activeTab === 'users' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-xl sm:text-2xl font-headline font-bold text-slate-900">
                  Manajemen Akun Guru &amp; Kontributor
                </h2>
                <p className="text-xs text-slate-500">
                  Kelola izin akses jurnalis dan guru kontributor. Peran Guru memiliki hak akses terbatas untuk mengajukan draf.
                </p>
              </div>

              {/* Add User Form */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 text-xs">
                <h4 className="font-bold text-sm text-slate-900">Buat Akun Kontributor Baru:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={newUserName}
                    onChange={e => setNewUserName(e.target.value)}
                    placeholder="Nama Lengkap &amp; Gelar"
                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                  />
                  <input
                    type="email"
                    value={newUserEmail}
                    onChange={e => setNewUserEmail(e.target.value)}
                    placeholder="email@wartahukum.id"
                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                  />
                  <select
                    value={newUserRole}
                    onChange={e => setNewUserRole(e.target.value as 'ADMIN' | 'GURU')}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-bold"
                  >
                    <option value="GURU">GURU / KONTRIBUTOR</option>
                    <option value="ADMIN">ADMIN REDAKSI</option>
                  </select>
                </div>
                <input
                  type="text"
                  value={newUserBio}
                  onChange={e => setNewUserBio(e.target.value)}
                  placeholder="Bio / Penugasan (e.g. Kontributor Berita Pendidikan Nasional)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                />
                <button
                  onClick={() => {
                    if (!newUserName.trim() || !newUserEmail.trim()) return;
                    createUser({
                      name: newUserName.trim(),
                      email: newUserEmail.trim(),
                      role: newUserRole,
                      bio: newUserBio.trim(),
                      active: true
                    });
                    setNewUserName('');
                    setNewUserEmail('');
                    setNewUserBio('');
                    alert('Akun berhasil dibuat!');
                  }}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  + Tambah Pengguna
                </button>
              </div>

              {/* Users list */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="divide-y divide-slate-100 text-xs">
                  {users.map(u => (
                    <div key={u.id} className="p-4 flex items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{u.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            u.role === 'ADMIN' ? 'bg-slate-900 text-amber-400' : 'bg-indigo-50 text-indigo-700'
                          }`}>
                            {u.role === 'GURU' ? 'GURU (KONTRIBUTOR)' : u.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">{u.email} · {u.bio}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateUserStatus(u.id, !u.active)}
                          className={`px-3 py-1 rounded text-xs font-semibold ${
                            u.active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {u.active ? 'Aktif' : 'Nonaktif'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 16: PENGATURAN WEBSITE & IDENTITAS MEDIA */}
          {activeTab === 'settings' && (
            <div className="max-w-4xl bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
              <div>
                <h2 className="text-xl font-headline font-bold text-slate-900">
                  Pengaturan Identitas Media &amp; Redaksi WARTA HUKUM
                </h2>
                <p className="text-xs text-slate-500">
                  Kelola informasi penanggung jawab pers, badan hukum, kontak redaksi, dan estetika visual
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="settings-media-name" className="block text-slate-700 font-bold mb-1">Nama Media</label>
                    <input
                      id="settings-media-name"
                      type="text"
                      value={settings.mediaName}
                      onChange={e => updateSettings({ mediaName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <label htmlFor="settings-legal" className="block text-slate-700 font-bold mb-1">Badan Hukum / Perusahaan Pers</label>
                    <input
                      id="settings-legal"
                      type="text"
                      value={settings.legalEntity}
                      onChange={e => updateSettings({ legalEntity: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="settings-tagline" className="block text-slate-700 font-bold mb-1">Tagline Media</label>
                  <input
                    id="settings-tagline"
                    type="text"
                    value={settings.tagline}
                    onChange={e => updateSettings({ tagline: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="settings-chief" className="block text-slate-700 font-bold mb-1">Pemimpin Redaksi / Penanggung Jawab</label>
                    <input
                      id="settings-chief"
                      type="text"
                      value={settings.chiefEditor}
                      onChange={e => updateSettings({ chiefEditor: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="settings-deputy" className="block text-slate-700 font-bold mb-1">Wakil Pemimpin Redaksi</label>
                    <input
                      id="settings-deputy"
                      type="text"
                      value={settings.deputyEditor}
                      onChange={e => updateSettings({ deputyEditor: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="settings-email" className="block text-slate-700 font-bold mb-1">Email Redaksi</label>
                    <input
                      id="settings-email"
                      type="email"
                      value={settings.redaksiEmail}
                      onChange={e => updateSettings({ redaksiEmail: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="settings-phone" className="block text-slate-700 font-bold mb-1">Telepon Kantor</label>
                    <input
                      id="settings-phone"
                      type="text"
                      value={settings.redaksiPhone}
                      onChange={e => updateSettings({ redaksiPhone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="settings-wa" className="block text-slate-700 font-bold mb-1">WhatsApp Pengaduan</label>
                    <input
                      id="settings-wa"
                      type="text"
                      value={settings.redaksiWhatsapp}
                      onChange={e => updateSettings({ redaksiWhatsapp: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="settings-address" className="block text-slate-700 font-bold mb-1">Alamat Kantor Redaksi</label>
                  <textarea
                    id="settings-address"
                    rows={2}
                    value={settings.redaksiAddress}
                    onChange={e => updateSettings({ redaksiAddress: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900"
                  ></textarea>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Kembalikan semua data ke setelan demo awal?')) {
                        resetToDefault();
                        alert('Data berhasil di-reset.');
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold hover:bg-rose-100"
                  >
                    Reset Data ke Bawaan
                  </button>

                  <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Perubahan disimpan otomatis di penyimpanan lokal
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 14: HALAMAN STATIS */}
          {activeTab === 'static-pages' && (
            <div className="max-w-4xl bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
              <div>
                <h2 className="text-xl font-headline font-bold text-slate-900">
                  Kelola Kebijakan &amp; Halaman Statis Redaksi
                </h2>
                <p className="text-xs text-slate-500">
                  Sunting naskah Pedoman Media Siber, Hak Jawab, Ketentuan Penggunaan, dan Kebijakan Privasi
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label htmlFor="static-pedoman" className="block text-slate-800 font-bold mb-1">
                    Pedoman Pemberitaan Media Siber
                  </label>
                  <textarea
                    id="static-pedoman"
                    rows={6}
                    value={settings.pedomanMediaSiber}
                    onChange={e => updateSettings({ pedomanMediaSiber: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-mono text-slate-800"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="static-hak-jawab" className="block text-slate-800 font-bold mb-1">
                    Kebijakan Hak Jawab &amp; Koreksi Berita
                  </label>
                  <textarea
                    id="static-hak-jawab"
                    rows={4}
                    value={settings.hakJawab}
                    onChange={e => updateSettings({ hakJawab: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-mono text-slate-800"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* TAB 17: LOG AKTIVITAS */}
          {activeTab === 'logs' && (
            <div className="max-w-4xl bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h2 className="text-xl font-headline font-bold text-slate-900">
                    Log Aktivitas Redaksi (Audit Trail)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Rekaman kronologis setiap tindakan editorial dan perubahan sistem
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-600">
                  {activityLogs.length} Aktivitas
                </span>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {activityLogs.map(log => (
                  <div key={log.id} className="py-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{log.action}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                          {log.targetType}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 tabular-nums">
                        {formatDateIndonesian(log.timestamp)}
                      </span>
                    </div>
                    <p className="text-slate-700 font-medium">{log.targetTitle}</p>
                    <p className="text-[11px] text-slate-400">
                      Pengguna: {log.userName} ({log.role}) {log.details && `— ${log.details}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fallback for other tabs */}
          {['tags', 'featured', 'regional', 'gallery', 'seo'].includes(activeTab) && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 text-xs space-y-4 max-w-4xl">
              <h2 className="text-xl font-headline font-bold text-slate-900 capitalize">
                Manajemen {activeTab}
              </h2>
              <p className="text-slate-500">
                Fitur pengelolaan untuk kanal {activeTab} aktif dan tersinkronisasi langsung dengan portal publik WARTA HUKUM.
              </p>
              <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 text-slate-700">
                Data kategori, tag, dan daerah dikelola secara terpusat pada menu <strong>Semua Berita</strong> dan formulir <strong>Tulis Berita Baru</strong>.
              </div>
            </div>
          )}
        </main>
      </div>

      {/* REVISION NOTE MODAL */}
      {revisionModalArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 text-xs">
            <h3 className="font-headline font-bold text-base text-slate-900">
              Minta Revisi Naskah Berita
            </h3>
            <p className="text-slate-600 text-xs">
              Artikel: <strong>{revisionModalArticle.title}</strong>
            </p>
            <div>
              <label htmlFor="revision-note-input" className="block font-bold text-slate-700 mb-1">
                Catatan Editorial untuk Kontributor *
              </label>
              <textarea
                id="revision-note-input"
                rows={4}
                value={revisionNote}
                onChange={e => setRevisionNote(e.target.value)}
                placeholder="Jelaskan bagian fakta, kutipan pasal, atau konfirmasi pihak terkait yang perlu diperbaiki..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 text-xs focus:outline-none focus:border-rose-600"
              ></textarea>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setRevisionModalArticle(null)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (!revisionNote.trim()) {
                    alert('Harap isi catatan revisi');
                    return;
                  }
                  requestRevision(revisionModalArticle.id, revisionNote.trim());
                  setRevisionModalArticle(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-xs"
              >
                Kirim Catatan Revisi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
