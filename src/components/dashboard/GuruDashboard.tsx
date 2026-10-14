import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { useAuth } from '../../context/AuthContext';
import { Article, ArticleStatus } from '../../types';
import { formatShortDateIndonesian, formatDateIndonesian, handleImageError } from '../../utils/mediaFallback';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  Send,
  User,
  LogOut,
  Globe,
  Edit,
  Trash2,
  Eye,
  MessageSquare,
  Lock
} from 'lucide-react';

interface GuruDashboardProps {
  onBackToPortal: () => void;
  onSelectArticle: (articleId: string, slug: string) => void;
}

export const GuruDashboard: React.FC<GuruDashboardProps> = ({
  onBackToPortal,
  onSelectArticle
}) => {
  const { articles, categories, agendas, addArticle, updateArticle, deleteArticle, addAgenda } = useNews();
  const { currentUser, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'my-articles' | 'add-article' | 'my-agendas' | 'add-agenda' | 'review-status' | 'editor-notes' | 'profile'
  >('dashboard');

  // Article creation form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Pendidikan');
  const [tags, setTags] = useState('Advokasi Guru, Pendidikan');
  const [province, setProvince] = useState('DKI Jakarta');
  const [city, setCity] = useState('Jakarta Timur');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&auto=format&fit=crop&q=80');
  const [caption, setCaption] = useState('');
  const [caseStatus, setCaseStatus] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState('');

  // Agenda creation form state
  const [agendaTitle, setAgendaTitle] = useState('');
  const [agendaDate, setAgendaDate] = useState('');
  const [agendaTime, setAgendaTime] = useState('09:00 WIB');
  const [agendaLocation, setAgendaLocation] = useState('');
  const [agendaOrganizer, setAgendaOrganizer] = useState('');
  const [agendaDesc, setAgendaDesc] = useState('');

  // Filter only articles authored by current Guru
  const myArticles = articles.filter(
    a => a.authorId === currentUser?.id || a.authorName === currentUser?.name
  );

  const draftCount = myArticles.filter(a => a.status === 'draft').length;
  const submittedCount = myArticles.filter(a => a.status === 'submitted' || a.status === 'in_review').length;
  const needsRevisionCount = myArticles.filter(a => a.status === 'needs_revision').length;
  const approvedCount = myArticles.filter(a => a.status === 'approved').length;
  const publishedCount = myArticles.filter(a => a.status === 'published').length;

  const myAgendas = agendas.filter(ag => ag.submittedBy === currentUser?.id);

  const handleStartEdit = (art: Article) => {
    // Only allow editing if draft or needs_revision
    if (art.status === 'published' || art.status === 'approved') {
      alert('Artikel yang telah disetujui atau diterbitkan tidak dapat diedit secara langsung. Hubungi Redaktur Pelaksana.');
      return;
    }
    setEditingId(art.id);
    setTitle(art.title);
    setSummary(art.summary);
    setContent(art.content);
    setCategory(art.category);
    setTags(art.tags?.join(', ') || '');
    setProvince(art.location?.province || 'DKI Jakarta');
    setCity(art.location?.city || '');
    setCoverImage(art.coverImage);
    setCaption(art.caption || '');
    setCaseStatus(art.caseStatus || '');
    setActiveTab('add-article');
  };

  const handleResetForm = () => {
    setEditingId(null);
    setTitle('');
    setSummary('');
    setContent('');
    setCategory('Pendidikan');
    setTags('Advokasi Guru, Pendidikan');
    setProvince('DKI Jakarta');
    setCity('Jakarta Timur');
    setCoverImage('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&auto=format&fit=crop&q=80');
    setCaption('');
    setCaseStatus('');
    setSubmissionSuccess('');
  };

  const handleSubmitArticle = (submitToAdmin: boolean) => {
    if (!title.trim() || !content.trim()) {
      alert('Judul dan isi artikel harus diisi.');
      return;
    }

    const payload = {
      title: title.trim(),
      summary: summary.trim() || title.trim().slice(0, 160),
      content: content.trim(),
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      location: { province, city },
      coverImage: coverImage.trim(),
      caption: caption.trim(),
      imageCredit: `Kontributor: ${currentUser?.name}`,
      authorId: currentUser?.id || 'guru-1',
      authorName: currentUser?.name || 'Kontributor Guru',
      authorRole: 'Kontributor Berita (Guru)',
      status: submitToAdmin ? ('submitted' as ArticleStatus) : ('draft' as ArticleStatus),
      readingTimeMinutes: Math.max(1, Math.ceil(content.split(' ').length / 200)),
      caseStatus: caseStatus.trim() || undefined
    };

    if (editingId) {
      updateArticle(editingId, payload);
      setSubmissionSuccess(submitToAdmin ? 'Artikel berhasil diajukan ke Redaktur!' : 'Draf artikel berhasil disimpan!');
    } else {
      addArticle(payload);
      setSubmissionSuccess(submitToAdmin ? 'Artikel baru berhasil diajukan ke Dewan Redaksi!' : 'Draf baru berhasil disimpan!');
    }

    setTimeout(() => {
      setSubmissionSuccess('');
      handleResetForm();
      setActiveTab('my-articles');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="bg-slate-900 text-white px-4 sm:px-6 py-3 border-b border-slate-800 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-400"></div>
          <div>
            <span className="font-headline font-bold text-lg text-white">
              PANEL KONTRIBUTOR <span className="text-amber-400">GURU</span>
            </span>
            <span className="text-[10px] text-slate-400 block -mt-0.5">
              WARTA HUKUM · Alur Editorial Berjenjang
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={onBackToPortal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium border border-slate-700"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>Lihat Portal Berita</span>
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
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Menu */}
        <aside className="w-64 bg-slate-950 text-slate-300 p-3 flex flex-col gap-1 overflow-y-auto shrink-0 border-r border-slate-800 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1">
            Menu Kontributor
          </span>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors font-semibold ${
              activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>1. Dashboard Saya</span>
          </button>
          <button
            onClick={() => setActiveTab('my-articles')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors font-semibold ${
              activeTab === 'my-articles' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4" />
              <span>2. Berita Saya</span>
            </div>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded-md tabular-nums">
              {myArticles.length}
            </span>
          </button>
          <button
            onClick={() => {
              handleResetForm();
              setActiveTab('add-article');
            }}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors font-semibold ${
              activeTab === 'add-article' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>3. Tulis Berita Baru</span>
          </button>
          <button
            onClick={() => setActiveTab('review-status')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors font-semibold ${
              activeTab === 'review-status' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>4. Status Peninjauan</span>
            </div>
            {submittedCount > 0 && (
              <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded-full">
                {submittedCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('editor-notes')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors font-semibold ${
              activeTab === 'editor-notes' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-rose-400" />
              <span>5. Catatan Editor</span>
            </div>
            {needsRevisionCount > 0 && (
              <span className="text-[10px] bg-rose-600 text-white font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                {needsRevisionCount}
              </span>
            )}
          </button>

          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1.5 mt-2">
            Agenda &amp; Profil
          </span>
          <button
            onClick={() => setActiveTab('my-agendas')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors font-semibold ${
              activeTab === 'my-agendas' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4 text-teal-400" />
            <span>6. Agenda Saya</span>
          </button>
          <button
            onClick={() => setActiveTab('add-agenda')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors font-semibold ${
              activeTab === 'add-agenda' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-teal-400" />
            <span>7. Tambah Agenda</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors font-semibold ${
              activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4 text-sky-400" />
            <span>8. Profil Akun</span>
          </button>
        </aside>

        {/* Workspace */}
        <main className="flex-1 p-5 sm:p-7 overflow-y-auto">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h2 className="text-xl sm:text-2xl font-headline font-bold text-slate-900">
                  Selamat Datang, {currentUser?.name}
                </h2>
                <p className="text-xs text-slate-500">
                  Panel penulisan berita kontributor pendidikan dan daerah WARTA HUKUM
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="rainbow-border-card p-3.5 bg-white rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium">Draf Saya</span>
                  <div className="text-xl font-bold font-headline text-slate-900 mt-1 tabular-nums">
                    {draftCount}
                  </div>
                </div>
                <div className="rainbow-border-card p-3.5 bg-white rounded-xl border border-slate-200">
                  <span className="text-[11px] text-amber-600 font-medium">Diajukan</span>
                  <div className="text-xl font-bold font-headline text-amber-700 mt-1 tabular-nums">
                    {submittedCount}
                  </div>
                </div>
                <div className="rainbow-border-card p-3.5 bg-white rounded-xl border border-slate-200">
                  <span className="text-[11px] text-rose-600 font-medium">Perlu Revisi</span>
                  <div className="text-xl font-bold font-headline text-rose-700 mt-1 tabular-nums">
                    {needsRevisionCount}
                  </div>
                </div>
                <div className="rainbow-border-card p-3.5 bg-white rounded-xl border border-slate-200">
                  <span className="text-[11px] text-blue-600 font-medium">Disetujui</span>
                  <div className="text-xl font-bold font-headline text-blue-700 mt-1 tabular-nums">
                    {approvedCount}
                  </div>
                </div>
                <div className="rainbow-border-card p-3.5 bg-white rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
                  <span className="text-[11px] text-emerald-600 font-medium">Terbit Publik</span>
                  <div className="text-xl font-bold font-headline text-emerald-700 mt-1 tabular-nums">
                    {publishedCount}
                  </div>
                </div>
              </div>

              {/* Information Box on Guru / Contributor Role Limitations */}
              <div className="bg-indigo-50/70 p-4 rounded-xl border border-indigo-200 text-xs text-indigo-950 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                  <Lock className="w-4 h-4 text-indigo-600" />
                  <span>Kebijakan Hak Akses Kontributor (Guru)</span>
                </div>
                <p className="leading-relaxed text-[11px] text-indigo-900">
                  Sesuai Standar Operasional Prosedur (SOP) Redaksi WARTA HUKUM: Seluruh naskah berita yang Anda tulis harus diajukan kepada Redaktur Pelaksana (Admin) untuk melalui proses verifikasi fakta dan kelayakan hukum sebelum diterbitkan secara terbuka ke publik.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleResetForm();
                    setActiveTab('add-article');
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs"
                >
                  + Tulis Berita Baru Sekarang
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: BERITA SAYA */}
          {activeTab === 'my-articles' && (
            <div className="space-y-5 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-headline font-bold text-slate-900">
                    Daftar Berita Saya
                  </h2>
                  <p className="text-xs text-slate-500">
                    Pantau status penerbitan dan catatan evaluasi dari redaksi pusat
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleResetForm();
                    setActiveTab('add-article');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                >
                  + Tulis Berita Baru
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="divide-y divide-slate-100 text-xs">
                  {myArticles.length === 0 ? (
                    <div className="p-8 text-center text-slate-400">
                      Anda belum menulis berita apapun. Klik &apos;Tulis Berita Baru&apos; untuk memulai.
                    </div>
                  ) : (
                    myArticles.map(item => (
                      <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
                        <div className="space-y-1 max-w-xl">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[10px]">
                              {item.category}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {formatShortDateIndonesian(item.updatedAt || item.createdAt)}
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-900 line-clamp-1">{item.title}</h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{item.summary}</p>
                          {item.editorNotes && (
                            <p className="text-[11px] text-rose-700 bg-rose-50 px-2 py-1 rounded border border-rose-200 font-medium">
                              Catatan Editor: {item.editorNotes}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {item.status === 'published' && (
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                              Terbit ({item.viewCount} pembaca)
                            </span>
                          )}
                          {item.status === 'submitted' && (
                            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                              Menunggu Review
                            </span>
                          )}
                          {item.status === 'needs_revision' && (
                            <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">
                              Perlu Revisi
                            </span>
                          )}
                          {item.status === 'draft' && (
                            <span className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded">
                              Draf
                            </span>
                          )}

                          {/* Action button: edit if allowed */}
                          {(item.status === 'draft' || item.status === 'needs_revision') && (
                            <button
                              onClick={() => handleStartEdit(item)}
                              className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-semibold text-xs"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {item.status === 'published' && (
                            <button
                              onClick={() => onSelectArticle(item.id, item.slug)}
                              className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
                              title="Lihat Berita"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TAMBAH / EDIT BERITA */}
          {activeTab === 'add-article' && (
            <div className="max-w-3xl bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-5 text-xs">
              <div>
                <h2 className="text-xl font-headline font-bold text-slate-900">
                  {editingId ? 'Revisi / Perbaiki Berita' : 'Formulir Penulisan Berita Baru'}
                </h2>
                <p className="text-slate-500">
                  Naskah yang diajukan akan diperiksa oleh Redaktur Pelaksana sebelum dipublikasikan
                </p>
              </div>

              {submissionSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{submissionSuccess}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="guru-title" className="block text-slate-700 font-bold mb-1">Judul Berita *</label>
                  <input
                    id="guru-title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Judul lugas dan tidak provokatif..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label htmlFor="guru-summary" className="block text-slate-700 font-bold mb-1">Lead / Ringkasan Awal *</label>
                  <textarea
                    id="guru-summary"
                    rows={2}
                    value={summary}
                    onChange={e => setSummary(e.target.value)}
                    placeholder="Ringkasan fakta utama..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="guru-cat" className="block text-slate-700 font-bold mb-1">Kategori *</label>
                    <select
                      id="guru-cat"
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="guru-prov" className="block text-slate-700 font-bold mb-1">Provinsi Lokasi</label>
                    <input
                      id="guru-prov"
                      type="text"
                      value={province}
                      onChange={e => setProvince(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                    />
                  </div>
                  <div>
                    <label htmlFor="guru-city" className="block text-slate-700 font-bold mb-1">Kota / Kabupaten</label>
                    <input
                      id="guru-city"
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="guru-cover" className="block text-slate-700 font-bold mb-1">URL Foto Sampul (Dokumentasi)</label>
                  <input
                    id="guru-cover"
                    type="text"
                    value={coverImage}
                    onChange={e => setCoverImage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>

                <div>
                  <label htmlFor="guru-content" className="block text-slate-700 font-bold mb-1">
                    Isi Naskah Berita *
                  </label>
                  <textarea
                    id="guru-content"
                    rows={8}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Tuliskan naskah berita secara lengkap..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-slate-900 font-mono leading-relaxed"
                  ></textarea>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleSubmitArticle(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                  >
                    Simpan Sebagai Draf
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSubmitArticle(true)}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-indigo-600 hover:opacity-95 text-white font-bold shadow-md flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Ajukan ke Redaktur untuk Ditinjau</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STATUS PENINJAUAN */}
          {activeTab === 'review-status' && (
            <div className="max-w-4xl space-y-4">
              <div>
                <h2 className="text-xl font-headline font-bold text-slate-900">
                  Status Peninjauan Berita
                </h2>
                <p className="text-xs text-slate-500">
                  Perkembangan naskah berita yang telah diajukan ke meja redaksi
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-5 divide-y divide-slate-100 text-xs">
                {myArticles.map(art => (
                  <div key={art.id} className="py-3 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 text-sm block">{art.title}</span>
                      <p className="text-slate-500 text-xs">{art.summary}</p>
                      {art.editorNotes && (
                        <p className="text-rose-700 bg-rose-50 p-2 rounded-md font-medium mt-1">
                          Catatan Redaktur: {art.editorNotes}
                        </p>
                      )}
                    </div>
                    <span className="px-2.5 py-1 rounded text-xs font-bold shrink-0 capitalize">
                      {art.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CATATAN EDITOR */}
          {activeTab === 'editor-notes' && (
            <div className="max-w-4xl space-y-4">
              <div>
                <h2 className="text-xl font-headline font-bold text-slate-900">
                  Catatan Evaluasi Redaktur Pelaksana
                </h2>
                <p className="text-xs text-slate-500">
                  Instruksi dan masukan redaksi untuk perbaikan artikel sebelum diterbitkan
                </p>
              </div>

              {myArticles.filter(a => a.editorNotes).length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center text-slate-400 text-xs">
                  Tidak ada catatan revisi yang aktif.
                </div>
              ) : (
                myArticles.filter(a => a.editorNotes).map(item => (
                  <div key={item.id} className="bg-white rounded-2xl p-5 border border-rose-200 shadow-2xs space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-bold"
                      >
                        Perbaiki Sekarang
                      </button>
                    </div>
                    <div className="p-3 bg-rose-50 rounded-xl text-rose-800 font-medium">
                      {item.editorNotes}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 6: AGENDA SAYA */}
          {activeTab === 'my-agendas' && (
            <div className="max-w-4xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-headline font-bold text-slate-900">
                    Agenda Liputan Saya
                  </h2>
                  <p className="text-xs text-slate-500">Jadwal kegiatan atau sidang yang diajukan ke redaksi</p>
                </div>
                <button
                  onClick={() => setActiveTab('add-agenda')}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                >
                  + Tambah Agenda
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-5 divide-y divide-slate-100 text-xs">
                {myAgendas.length === 0 ? (
                  <p className="text-center text-slate-400 py-6">Belum ada agenda yang Anda daftarkan.</p>
                ) : (
                  myAgendas.map(ag => (
                    <div key={ag.id} className="py-3 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">{ag.title}</span>
                        <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-bold">
                          {ag.date} · {ag.time}
                        </span>
                      </div>
                      <p className="text-slate-500">{ag.location} ({ag.organizer})</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 7: TAMBAH AGENDA */}
          {activeTab === 'add-agenda' && (
            <div className="max-w-2xl bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4 text-xs">
              <h2 className="text-xl font-headline font-bold text-slate-900">
                Usulkan Agenda Liputan / Peristiwa
              </h2>
              <div className="space-y-3">
                <input
                  type="text"
                  value={agendaTitle}
                  onChange={e => setAgendaTitle(e.target.value)}
                  placeholder="Nama Kegiatan / Sidang"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={agendaDate}
                    onChange={e => setAgendaDate(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                  <input
                    type="text"
                    value={agendaTime}
                    onChange={e => setAgendaTime(e.target.value)}
                    placeholder="09:00 WIB"
                    className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <input
                  type="text"
                  value={agendaLocation}
                  onChange={e => setAgendaLocation(e.target.value)}
                  placeholder="Lokasi Sidang / Acara"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                />
                <input
                  type="text"
                  value={agendaOrganizer}
                  onChange={e => setAgendaOrganizer(e.target.value)}
                  placeholder="Penyelenggara"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                />
                <textarea
                  rows={3}
                  value={agendaDesc}
                  onChange={e => setAgendaDesc(e.target.value)}
                  placeholder="Deskripsi kegiatan..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900"
                ></textarea>
                <button
                  onClick={() => {
                    if (!agendaTitle.trim() || !agendaDate) return;
                    addAgenda({
                      title: agendaTitle.trim(),
                      date: agendaDate,
                      time: agendaTime,
                      location: agendaLocation.trim(),
                      organizer: agendaOrganizer.trim(),
                      description: agendaDesc.trim(),
                      status: 'upcoming',
                      isPublic: true,
                      submittedBy: currentUser?.id || 'guru-1',
                      authorName: currentUser?.name
                    });
                    alert('Agenda berhasil diusulkan!');
                    setActiveTab('my-agendas');
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold"
                >
                  Kirim Usulan Agenda
                </button>
              </div>
            </div>
          )}

          {/* TAB 8: PROFIL */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4 text-xs">
              <h2 className="text-xl font-headline font-bold text-slate-900">
                Profil Akun Kontributor
              </h2>
              <div className="space-y-2">
                <p><strong>Nama:</strong> {currentUser?.name}</p>
                <p><strong>Email:</strong> {currentUser?.email}</p>
                <p><strong>Peran Sistem:</strong> GURU (Kontributor Berita Pendidikan &amp; Daerah)</p>
                <p><strong>Bio:</strong> {currentUser?.bio}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
