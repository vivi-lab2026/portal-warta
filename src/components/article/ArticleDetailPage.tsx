import React, { useState, useEffect } from 'react';
import { Article } from '../../types';
import { useNews } from '../../context/NewsContext';
import { handleImageError, formatDateIndonesian } from '../../utils/mediaFallback';
import {
  ChevronLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Type,
  Scale,
  MessageSquare,
  ShieldAlert,
  Send,
  Eye,
  Bookmark,
  Building
} from 'lucide-react';

interface ArticleDetailPageProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (articleId: string, slug: string) => void;
  onSelectCategory: (categorySlug: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  onBack,
  onSelectArticle,
  onSelectCategory
}) => {
  const { articles, comments, addComment, incrementViewCount } = useNews();

  // Increment view count on mount
  useEffect(() => {
    incrementViewCount(article.id);
  }, [article.id]);

  // Typography font size scale (normal, large, x-large)
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Audio Speech Reader State
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Comment Form State
  const [commentName, setCommentName] = useState<string>('');
  const [commentEmail, setCommentEmail] = useState<string>('');
  const [commentContent, setCommentContent] = useState<string>('');
  const [commentSuccess, setCommentSuccess] = useState<boolean>(false);

  // Article comments
  const articleComments = comments.filter(c => c.articleId === article.id && c.approved);

  // Related articles (same category, different id)
  const relatedArticles = articles
    .filter(a => a.status === 'published' && a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  // Latest articles for sidebar
  const latestArticles = articles
    .filter(a => a.status === 'published' && a.id !== article.id)
    .slice(0, 4);

  // Text-To-Speech SpeechSynthesis
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Fitur pembaca audio teks tidak didukung di browser ini.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel(); // Stop any pending
      const fullText = `${article.title}. ${article.summary}. ${article.content.replace(/###/g, '')}`;
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    });
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`*${article.title}*\n\nBaca selengkapnya di WARTA HUKUM:\n${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentContent.trim()) return;

    addComment(article.id, commentName.trim(), commentEmail.trim(), commentContent.trim());
    setCommentName('');
    setCommentEmail('');
    setCommentContent('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 4000);
  };

  const getFontSizeClass = () => {
    if (fontSize === 'large') return 'text-base sm:text-lg leading-relaxed';
    if (fontSize === 'xlarge') return 'text-lg sm:text-xl leading-loose';
    return 'text-sm sm:text-base leading-relaxed';
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back and Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-red-700 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>

          {/* Breadcrumb path */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span onClick={onBack} className="cursor-pointer hover:underline">Beranda</span>
            <span aria-hidden="true">/</span>
            <span
              onClick={() => onSelectCategory(article.category.toLowerCase())}
              className="cursor-pointer text-indigo-600 font-bold hover:underline"
            >
              {article.category}
            </span>
            <span aria-hidden="true">/</span>
            <span className="text-slate-400 truncate max-w-xs">{article.title}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* MAIN ARTICLE BODY (8 cols on lg) */}
          <article className="lg:col-span-8 bg-white rounded-2xl p-5 sm:p-8 border border-slate-200/90 shadow-2xs">
            {/* Category badge & Case Status */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="bg-gradient-to-r from-red-600 to-indigo-600 text-white text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-2xs">
                {article.category}
              </span>
              {article.caseStatus && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  <Scale className="w-3.5 h-3.5 text-amber-700" />
                  <span>Status Perkara: {article.caseStatus}</span>
                </div>
              )}
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-slate-950 leading-tight mb-4 tracking-tight">
              {article.title}
            </h1>

            {/* Lead Summary */}
            <p className="text-sm sm:text-base font-medium text-slate-600 pb-4 mb-4 border-b border-slate-100 leading-relaxed italic">
              {article.summary}
            </p>

            {/* Byline & Publication Timestamp */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-3 mb-6 bg-slate-50/80 rounded-xl px-4 border border-slate-200/60 text-xs text-slate-600">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <User className="w-4 h-4 text-slate-500" />
                  <span>Penulis: {article.authorName}</span>
                  {article.authorRole && (
                    <span className="text-[11px] font-normal text-slate-500">
                      ({article.authorRole})
                    </span>
                  )}
                </div>
                {article.editorName && (
                  <div className="text-[11px] text-slate-500 pl-6">
                    Editor: <strong>{article.editorName}</strong>
                  </div>
                )}
              </div>

              <div className="space-y-1 text-[11px] text-slate-500 text-right">
                <div className="flex items-center gap-1 justify-end">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{formatDateIndonesian(article.publishedAt || article.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span className="tabular-nums flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {article.readingTimeMinutes} menit baca
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums flex items-center gap-1">
                    <Eye className="w-3 h-3 text-slate-400" />
                    {article.viewCount} pembaca
                  </span>
                </div>
              </div>
            </div>

            {/* Reading Utilities Toolbar: Font Sizing & Audio Reader */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/80 mb-6">
              {/* Audio Listen Button */}
              <button
                onClick={toggleSpeech}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isPlayingAudio
                    ? 'bg-rose-600 text-white shadow-xs animate-pulse'
                    : 'bg-white text-indigo-950 hover:bg-indigo-100 border border-indigo-200'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>Hentikan Audio Berita</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-indigo-600" />
                    <span>Dengarkan Berita Ini (Audio)</span>
                  </>
                )}
              </button>

              {/* Font Size Adjuster */}
              <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
                <Type className="w-4 h-4 text-slate-400" />
                <span>Ukuran Teks:</span>
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-0.5 rounded text-xs transition-colors ${
                    fontSize === 'normal' ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-slate-100'
                  }`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-0.5 rounded text-xs transition-colors ${
                    fontSize === 'large' ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-slate-100'
                  }`}
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2 py-0.5 rounded text-xs transition-colors ${
                    fontSize === 'xlarge' ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-slate-100'
                  }`}
                >
                  A++
                </button>
              </div>
            </div>

            {/* Main Featured Photo */}
            <div className="mb-6 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
              <div className="aspect-16/10 relative">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  onError={e => handleImageError(e, article.category)}
                  className="w-full h-full object-cover"
                />
              </div>
              {(article.caption || article.imageCredit) && (
                <div className="p-3 bg-slate-900 text-slate-300 text-xs">
                  {article.caption && <p>{article.caption}</p>}
                  {article.imageCredit && (
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Foto &amp; Dokumentasi: <strong>{article.imageCredit}</strong>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* ARTICLE CONTENT (Journalistic Body) */}
            <div className={`prose max-w-none text-slate-800 space-y-4 font-normal ${getFontSizeClass()}`}>
              {article.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('###')) {
                  return (
                    <h3
                      key={index}
                      className="text-lg sm:text-xl font-headline font-bold text-slate-900 pt-4 pb-1 border-b border-slate-100"
                    >
                      {paragraph.replace('###', '').trim()}
                    </h3>
                  );
                }
                return (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Asas Praduga Tak Bersalah & Status Perkara Disclaimer Box */}
            <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200/90 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Pemberitahuan Etika Jurnalistik &amp; Asas Praduga Tak Bersalah</span>
              </div>
              <p className="leading-relaxed text-[11px] text-slate-600">
                Setiap orang yang disangka, ditangkap, ditahan, dituntut dan/atau dihadapkan di muka sidang pengadilan wajib dianggap tidak bersalah sampai adanya putusan pengadilan yang menyatakan kesalahannya dan telah memperoleh kekuatan hukum tetap (*asas presumption of innocence* sesuai Pasal 8 ayat (1) UU No. 48 Tahun 2009 tentang Kekuasaan Kehakiman).
              </p>
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-slate-700">Topik Terkait:</span>
                {article.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Social Share Bar */}
            <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-bold text-slate-800">Bagikan Berita Ini:</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={shareWhatsApp}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={shareFacebook}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <span>Facebook</span>
                </button>
                <button
                  onClick={shareTwitter}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <span>X / Twitter</span>
                </button>
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1 border border-slate-200"
                >
                  {copySuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Salin Tautan</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* COMMENTS SECTION */}
            <div className="mt-10 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                <h3 className="font-headline font-bold text-xl text-slate-900">
                  Tanggapan &amp; Komentar Pembaca ({articleComments.length})
                </h3>
              </div>

              {/* Comment list */}
              <div className="space-y-3 mb-8">
                {articleComments.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Belum ada komentar untuk artikel ini. Jadilah yang pertama memberikan tanggapan santun.</p>
                ) : (
                  articleComments.map(c => (
                    <div key={c.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                      <div className="flex items-center justify-between font-semibold text-slate-800">
                        <span>{c.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{formatDateIndonesian(c.createdAt)}</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{c.content}</p>
                    </div>
                  ))
                )}
              </div>

              {/* New Comment Form */}
              <form onSubmit={handlePostComment} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
                <h4 className="font-bold text-slate-800">Kirim Tanggapan Anda:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="comment-name" className="block text-slate-600 font-medium mb-1">Nama Lengkap *</label>
                    <input
                      id="comment-name"
                      type="text"
                      value={commentName}
                      onChange={e => setCommentName(e.target.value)}
                      required
                      placeholder="Nama Anda"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-900 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="comment-email" className="block text-slate-600 font-medium mb-1">Alamat Email (Dirahasiakan)</label>
                    <input
                      id="comment-email"
                      type="email"
                      value={commentEmail}
                      onChange={e => setCommentEmail(e.target.value)}
                      placeholder="email@contoh.com"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-900 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="comment-text" className="block text-slate-600 font-medium mb-1">Komentar / Analisis *</label>
                  <textarea
                    id="comment-text"
                    rows={3}
                    value={commentContent}
                    onChange={e => setCommentContent(e.target.value)}
                    required
                    placeholder="Tuliskan tanggapan dengan etika dan berlandaskan fakta..."
                    className="w-full bg-white border border-slate-200 rounded-lg p-3 text-slate-900 text-xs focus:outline-none focus:border-indigo-500"
                  ></textarea>
                </div>

                {commentSuccess && (
                  <p className="text-emerald-700 font-semibold text-xs">
                    Komentar Anda telah berhasil ditayangkan!
                  </p>
                )}

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Tanggapan</span>
                </button>
              </form>
            </div>
          </article>

          {/* SIDEBAR (4 cols on lg) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Berita Terkait Kategori Sama */}
            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-200">
                  <div className="w-1.5 h-4 bg-indigo-600 rounded-xs"></div>
                  <h3 className="font-headline font-bold text-base text-slate-900">
                    Berita Terkait {article.category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {relatedArticles.map(rel => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectArticle(rel.id, rel.slug)}
                      className="cursor-pointer group flex items-start gap-3"
                    >
                      <div className="w-20 aspect-16/10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                        <img
                          src={rel.coverImage}
                          alt={rel.title}
                          onError={e => handleImageError(e, rel.category)}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                          {rel.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          {formatDateIndonesian(rel.publishedAt || rel.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Berita Terkini Lainnya */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-200">
                <div className="w-1.5 h-4 bg-red-600 rounded-xs"></div>
                <h3 className="font-headline font-bold text-base text-slate-900">
                  Kabar Hukum Terkini
                </h3>
              </div>

              <div className="divide-y divide-slate-100">
                {latestArticles.map(lat => (
                  <div
                    key={lat.id}
                    onClick={() => onSelectArticle(lat.id, lat.slug)}
                    className="py-3 first:pt-0 last:pb-0 cursor-pointer group"
                  >
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                      {lat.category}
                    </span>
                    <h4 className="text-xs font-semibold text-slate-900 group-hover:text-red-700 transition-colors line-clamp-2 mt-1 leading-snug">
                      {lat.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Pengaduan & Hak Jawab Notice Card */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-sm border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <ShieldAlert className="w-4 h-4" />
                <span>Layanan Hak Jawab &amp; Klarifikasi</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Pihak yang merasa dirugikan materi pemberitaan ini berhak menyampaikan Hak Jawab atau Hak Koreksi sesuai UU Pers No. 40 Tahun 1999 melalui email resmi redaksi kami.
              </p>
              <div className="pt-2 text-amber-300 font-mono text-[11px]">
                pengaduan.redaksi@wartahukum.id
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
