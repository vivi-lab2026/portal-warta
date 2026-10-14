import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Article,
  Category,
  Tag,
  BreakingNewsItem,
  HeroSlide,
  GalleryItem,
  AgendaItem,
  MediaSettings,
  ActivityLog,
  ArticleComment,
  ArticleStatus
} from '../types';
import {
  INITIAL_ARTICLES,
  INITIAL_CATEGORIES,
  INITIAL_TAGS,
  INITIAL_BREAKING_NEWS,
  INITIAL_HERO_SLIDES,
  INITIAL_GALLERY,
  INITIAL_AGENDAS,
  INITIAL_MEDIA_SETTINGS,
  INITIAL_ACTIVITY_LOGS
} from '../data/initialData';
import { useAuth } from './AuthContext';

export interface PushNotification {
  id: string;
  title: string;
  time: string;
  read: boolean;
  url: string;
}

interface NewsContextType {
  articles: Article[];
  categories: Category[];
  tags: Tag[];
  breakingNews: BreakingNewsItem[];
  heroSlides: HeroSlide[];
  gallery: GalleryItem[];
  agendas: AgendaItem[];
  settings: MediaSettings;
  activityLogs: ActivityLog[];
  comments: ArticleComment[];
  notifications: PushNotification[];
  pushEnabled: boolean;
  togglePushNotifications: () => void;
  markNotificationRead: (id: string) => void;
  // Article Actions
  addArticle: (article: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'slug'>) => string;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  approveArticle: (id: string) => void;
  requestRevision: (id: string, notes: string) => void;
  rejectArticle: (id: string, reason: string) => void;
  publishArticle: (id: string) => void;
  archiveArticle: (id: string) => void;
  incrementViewCount: (id: string) => void;
  // Category Actions
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  // Tag Actions
  addTag: (name: string) => void;
  // Breaking News Actions
  addBreakingNews: (item: Omit<BreakingNewsItem, 'id' | 'publishedAt'>) => void;
  toggleBreakingNews: (id: string) => void;
  deleteBreakingNews: (id: string) => void;
  // Hero Slide Actions
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  updateHeroSlide: (id: string, updates: Partial<HeroSlide>) => void;
  deleteHeroSlide: (id: string) => void;
  // Gallery Actions
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  // Agenda Actions
  addAgenda: (agenda: Omit<AgendaItem, 'id'>) => void;
  updateAgenda: (id: string, updates: Partial<AgendaItem>) => void;
  deleteAgenda: (id: string) => void;
  // Comment Actions
  addComment: (articleId: string, name: string, email: string, content: string) => void;
  // Settings Actions
  updateSettings: (newSettings: Partial<MediaSettings>) => void;
  // Reset Action
  resetToDefault: () => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

const PREFIX = 'wartahukum_';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();

  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem(`${PREFIX}articles`);
      return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
    } catch {
      return INITIAL_ARTICLES;
    }
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(`${PREFIX}categories`);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [tags, setTags] = useState<Tag[]>(() => {
    try {
      const saved = localStorage.getItem(`${PREFIX}tags`);
      return saved ? JSON.parse(saved) : INITIAL_TAGS;
    } catch {
      return INITIAL_TAGS;
    }
  });

  const [breakingNews, setBreakingNews] = useState<BreakingNewsItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${PREFIX}breaking`);
      return saved ? JSON.parse(saved) : INITIAL_BREAKING_NEWS;
    } catch {
      return INITIAL_BREAKING_NEWS;
    }
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    try {
      const saved = localStorage.getItem(`${PREFIX}slides`);
      return saved ? JSON.parse(saved) : INITIAL_HERO_SLIDES;
    } catch {
      return INITIAL_HERO_SLIDES;
    }
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${PREFIX}gallery`);
      return saved ? JSON.parse(saved) : INITIAL_GALLERY;
    } catch {
      return INITIAL_GALLERY;
    }
  });

  const [agendas, setAgendas] = useState<AgendaItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${PREFIX}agendas`);
      return saved ? JSON.parse(saved) : INITIAL_AGENDAS;
    } catch {
      return INITIAL_AGENDAS;
    }
  });

  const [settings, setSettings] = useState<MediaSettings>(() => {
    try {
      const saved = localStorage.getItem(`${PREFIX}settings`);
      return saved ? JSON.parse(saved) : INITIAL_MEDIA_SETTINGS;
    } catch {
      return INITIAL_MEDIA_SETTINGS;
    }
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem(`${PREFIX}logs`);
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOGS;
    } catch {
      return INITIAL_ACTIVITY_LOGS;
    }
  });

  const [comments, setComments] = useState<ArticleComment[]>(() => {
    try {
      const saved = localStorage.getItem(`${PREFIX}comments`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [pushEnabled, setPushEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem(`${PREFIX}push_enabled`) === 'true';
    } catch {
      return true;
    }
  });

  const [notifications, setNotifications] = useState<PushNotification[]>([
    {
      id: 'notif-1',
      title: 'Breaking: Kejagung Sita Aset Rp 1,2 T Perkara Komoditas',
      time: '10 menit lalu',
      read: false,
      url: '/berita/kejagung-sita-aset-senilai-rp-12-triliun-terkait-perkara-korupsi-komoditas'
    },
    {
      id: 'notif-2',
      title: 'Sidang MK: Uji Materiil Norma Perlindungan Guru & Pendidik',
      time: '1 jam lalu',
      read: false,
      url: '/berita/sidang-perdana-gugatan-uu-kesejahteraan-guru-di-mahkamah-konstitusi'
    }
  ]);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${PREFIX}articles`, JSON.stringify(articles));
      localStorage.setItem(`${PREFIX}categories`, JSON.stringify(categories));
      localStorage.setItem(`${PREFIX}tags`, JSON.stringify(tags));
      localStorage.setItem(`${PREFIX}breaking`, JSON.stringify(breakingNews));
      localStorage.setItem(`${PREFIX}slides`, JSON.stringify(heroSlides));
      localStorage.setItem(`${PREFIX}gallery`, JSON.stringify(gallery));
      localStorage.setItem(`${PREFIX}agendas`, JSON.stringify(agendas));
      localStorage.setItem(`${PREFIX}settings`, JSON.stringify(settings));
      localStorage.setItem(`${PREFIX}logs`, JSON.stringify(activityLogs));
      localStorage.setItem(`${PREFIX}comments`, JSON.stringify(comments));
      localStorage.setItem(`${PREFIX}push_enabled`, String(pushEnabled));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [articles, categories, tags, breakingNews, heroSlides, gallery, agendas, settings, activityLogs, comments, pushEnabled]);

  const addLog = (
    action: string,
    targetType: ActivityLog['targetType'],
    targetTitle: string,
    details?: string
  ) => {
    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: currentUser?.id || 'system',
      userName: currentUser?.name || 'Sistem / Anonim',
      role: currentUser?.role || 'ADMIN',
      action,
      targetType,
      targetTitle,
      details
    };
    setActivityLogs(prev => [newLog, ...prev.slice(0, 99)]);
  };

  // Article Actions
  const addArticle = (data: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'slug'>): string => {
    const id = `art-${Date.now()}`;
    const slug = slugify(data.title);
    const now = new Date().toISOString();

    const newArticle: Article = {
      ...data,
      id,
      slug,
      createdAt: now,
      updatedAt: now,
      viewCount: 0,
      publishedAt: data.status === 'published' ? now : data.publishedAt
    };

    setArticles(prev => [newArticle, ...prev]);
    addLog(
      data.status === 'published' ? 'Menerbitkan Berita Baru' : 'Menyimpan Berita',
      'article',
      data.title,
      `Status: ${data.status}`
    );

    // If marked as breaking, add to breaking ticker automatically
    if (data.isBreaking && data.status === 'published') {
      addBreakingNews({
        title: data.title,
        articleId: id,
        url: `/berita/${slug}`,
        priority: 1,
        active: true
      });
    }

    return id;
  };

  const updateArticle = (id: string, updates: Partial<Article>) => {
    const now = new Date().toISOString();
    setArticles(prev =>
      prev.map(a => {
        if (a.id === id) {
          const updated: Article = {
            ...a,
            ...updates,
            slug: updates.title ? slugify(updates.title) : a.slug,
            updatedAt: now
          };
          return updated;
        }
        return a;
      })
    );
    const target = articles.find(a => a.id === id);
    if (target) {
      addLog('Memperbarui Berita', 'article', updates.title || target.title);
    }
  };

  const deleteArticle = (id: string) => {
    const target = articles.find(a => a.id === id);
    setArticles(prev => prev.filter(a => a.id !== id));
    if (target) {
      addLog('Menghapus Berita', 'article', target.title);
    }
  };

  const approveArticle = (id: string) => {
    const now = new Date().toISOString();
    setArticles(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'approved', editorName: currentUser?.name || 'Redaktur Pelaksana', updatedAt: now } : a))
    );
    const target = articles.find(a => a.id === id);
    if (target) {
      addLog('Menyetujui Berita', 'article', target.title, 'Artikel telah disetujui untuk penjadwalan / publikasi.');
    }
  };

  const requestRevision = (id: string, notes: string) => {
    const now = new Date().toISOString();
    setArticles(prev =>
      prev.map(a =>
        a.id === id
          ? {
              ...a,
              status: 'needs_revision',
              editorNotes: notes,
              updatedAt: now,
              revisionHistory: [
                ...(a.revisionHistory || []),
                { timestamp: now, updatedBy: currentUser?.name || 'Redaktur', note: notes }
              ]
            }
          : a
      )
    );
    const target = articles.find(a => a.id === id);
    if (target) {
      addLog('Meminta Revisi Berita', 'article', target.title, `Catatan: ${notes}`);
    }
  };

  const rejectArticle = (id: string, reason: string) => {
    const now = new Date().toISOString();
    setArticles(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'draft', editorNotes: `Ditolak Redaksi: ${reason}`, updatedAt: now } : a))
    );
    const target = articles.find(a => a.id === id);
    if (target) {
      addLog('Menolak Pengajuan Berita', 'article', target.title, `Alasan: ${reason}`);
    }
  };

  const publishArticle = (id: string) => {
    const now = new Date().toISOString();
    setArticles(prev =>
      prev.map(a =>
        a.id === id
          ? {
              ...a,
              status: 'published',
              publishedAt: now,
              editorName: currentUser?.name || a.editorName || 'Dewan Redaksi',
              updatedAt: now
            }
          : a
      )
    );
    const target = articles.find(a => a.id === id);
    if (target) {
      addLog('Menerbitkan Berita', 'article', target.title, 'Berita tayang di publik.');
      // Push notification
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          title: `Berita Baru: ${target.title.slice(0, 60)}...`,
          time: 'Baru saja',
          read: false,
          url: `/berita/${target.slug}`
        },
        ...prev
      ]);
    }
  };

  const archiveArticle = (id: string) => {
    const now = new Date().toISOString();
    setArticles(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'archived', updatedAt: now } : a))
    );
    const target = articles.find(a => a.id === id);
    if (target) {
      addLog('Mengarsipkan Berita', 'article', target.title);
    }
  };

  const incrementViewCount = (id: string) => {
    setArticles(prev =>
      prev.map(a => (a.id === id ? { ...a, viewCount: (a.viewCount || 0) + 1 } : a))
    );
  };

  // Category Actions
  const addCategory = (catData: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...catData,
      id: `cat-${Date.now()}`,
      slug: slugify(catData.name)
    };
    setCategories(prev => [...prev, newCat]);
    addLog('Menambah Kategori', 'category', catData.name);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updates, slug: updates.name ? slugify(updates.name) : c.slug } : c))
    );
    addLog('Mengedit Kategori', 'category', updates.name || id);
  };

  const deleteCategory = (id: string) => {
    const cat = categories.find(c => c.id === id);
    setCategories(prev => prev.filter(c => c.id !== id));
    if (cat) addLog('Menghapus Kategori', 'category', cat.name);
  };

  // Tag Actions
  const addTag = (name: string) => {
    const slug = slugify(name);
    if (!tags.some(t => t.slug === slug)) {
      setTags(prev => [...prev, { id: `tag-${Date.now()}`, name, slug, count: 1 }]);
    }
  };

  // Breaking News Actions
  const addBreakingNews = (item: Omit<BreakingNewsItem, 'id' | 'publishedAt'>) => {
    const newItem: BreakingNewsItem = {
      ...item,
      id: `bn-${Date.now()}`,
      publishedAt: new Date().toISOString()
    };
    setBreakingNews(prev => [newItem, ...prev]);
    addLog('Menambah Breaking News', 'breaking', item.title);
  };

  const toggleBreakingNews = (id: string) => {
    setBreakingNews(prev =>
      prev.map(b => (b.id === id ? { ...b, active: !b.active } : b))
    );
  };

  const deleteBreakingNews = (id: string) => {
    setBreakingNews(prev => prev.filter(b => b.id !== id));
  };

  // Hero Slides
  const addHeroSlide = (slide: Omit<HeroSlide, 'id'>) => {
    const newSlide: HeroSlide = {
      ...slide,
      id: `hs-${Date.now()}`
    };
    setHeroSlides(prev => [...prev, newSlide]);
    addLog('Menambah Slider Beranda', 'setting', slide.title);
  };

  const updateHeroSlide = (id: string, updates: Partial<HeroSlide>) => {
    setHeroSlides(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteHeroSlide = (id: string) => {
    setHeroSlides(prev => prev.filter(s => s.id !== id));
  };

  // Gallery
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newGal: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    setGallery(prev => [newGal, ...prev]);
    addLog('Menambah Dokumentasi Galeri', 'gallery', item.title);
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  // Agendas
  const addAgenda = (agenda: Omit<AgendaItem, 'id'>) => {
    const newAg: AgendaItem = {
      ...agenda,
      id: `ag-${Date.now()}`
    };
    setAgendas(prev => [newAg, ...prev]);
    addLog('Menambah Agenda Sidang / Acara', 'agenda', agenda.title);
  };

  const updateAgenda = (id: string, updates: Partial<AgendaItem>) => {
    setAgendas(prev => prev.map(a => (a.id === id ? { ...a, ...updates } : a)));
  };

  const deleteAgenda = (id: string) => {
    setAgendas(prev => prev.filter(a => a.id !== id));
  };

  // Comments
  const addComment = (articleId: string, name: string, email: string, content: string) => {
    const newCom: ArticleComment = {
      id: `com-${Date.now()}`,
      articleId,
      name,
      email,
      content,
      createdAt: new Date().toISOString(),
      approved: true
    };
    setComments(prev => [newCom, ...prev]);
  };

  // Settings
  const updateSettings = (newSettings: Partial<MediaSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    addLog('Memperbarui Pengaturan Media', 'setting', 'Identitas Media & Sistem');
  };

  const togglePushNotifications = () => {
    setPushEnabled(prev => !prev);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const resetToDefault = () => {
    setArticles(INITIAL_ARTICLES);
    setCategories(INITIAL_CATEGORIES);
    setTags(INITIAL_TAGS);
    setBreakingNews(INITIAL_BREAKING_NEWS);
    setHeroSlides(INITIAL_HERO_SLIDES);
    setGallery(INITIAL_GALLERY);
    setAgendas(INITIAL_AGENDAS);
    setSettings(INITIAL_MEDIA_SETTINGS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    setComments([]);
    localStorage.clear();
  };

  return (
    <NewsContext.Provider
      value={{
        articles,
        categories,
        tags,
        breakingNews,
        heroSlides,
        gallery,
        agendas,
        settings,
        activityLogs,
        comments,
        notifications,
        pushEnabled,
        togglePushNotifications,
        markNotificationRead,
        addArticle,
        updateArticle,
        deleteArticle,
        approveArticle,
        requestRevision,
        rejectArticle,
        publishArticle,
        archiveArticle,
        incrementViewCount,
        addCategory,
        updateCategory,
        deleteCategory,
        addTag,
        addBreakingNews,
        toggleBreakingNews,
        deleteBreakingNews,
        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
        addGalleryItem,
        deleteGalleryItem,
        addAgenda,
        updateAgenda,
        deleteAgenda,
        addComment,
        updateSettings,
        resetToDefault
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};
