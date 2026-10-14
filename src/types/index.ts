export type UserRole = 'ADMIN' | 'GURU';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  active: boolean;
  createdAt: string;
}

export type ArticleStatus =
  | 'draft'
  | 'submitted'
  | 'in_review'
  | 'needs_revision'
  | 'approved'
  | 'scheduled'
  | 'published'
  | 'archived';

export interface RevisionHistory {
  timestamp: string;
  updatedBy: string;
  note: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  location: {
    province: string;
    city: string;
  };
  coverImage: string;
  caption?: string;
  imageCredit?: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  editorName?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  scheduledAt?: string;
  status: ArticleStatus;
  isBreaking?: boolean;
  isFeatured?: boolean;
  inHeroSlider?: boolean;
  viewCount: number;
  readingTimeMinutes: number;
  seoTitle?: string;
  seoDescription?: string;
  editorNotes?: string;
  isOpinion?: boolean;
  caseStatus?: string; // Status Perkara (e.g., 'Dalam Penyidikan', 'Tahap II Kejaksaan', 'Kasasi MA', 'Putusan Inkrah')
  revisionHistory?: RevisionHistory[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
  active: boolean;
  color: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface BreakingNewsItem {
  id: string;
  title: string;
  articleId?: string;
  url?: string;
  priority: number;
  active: boolean;
  publishedAt: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  summary: string;
  category: string;
  coverImage: string;
  articleId?: string;
  order: number;
  active: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  type: 'photo' | 'video';
  mediaUrl: string;
  thumbnail: string;
  caption: string;
  photographer: string;
  date: string;
  category: string;
  tags: string[];
}

export interface AgendaItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  isPublic: boolean;
  submittedBy: string;
  authorName?: string;
}

export interface MediaSettings {
  mediaName: string;
  tagline: string;
  logoUrl: string;
  legalEntity: string;
  chiefEditor: string;
  deputyEditor: string;
  responsiblePerson: string;
  redaksiAddress: string;
  redaksiEmail: string;
  redaksiPhone: string;
  redaksiWhatsapp: string;
  pengaduanEmail: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    tiktok: string;
  };
  pedomanMediaSiber: string;
  kebijakanKoreksi: string;
  hakJawab: string;
  kebijakanPrivasi: string;
  ketentuanPenggunaan: string;
  tentangKami: string;
  copyrightText: string;
  gradientIntensity: 'soft' | 'medium' | 'vibrant';
  enableAnimations: boolean;
  seoTitleDefault: string;
  seoMetaDefault: string;
  googleVerificationTag?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  role: UserRole;
  action: string;
  targetType: 'article' | 'category' | 'setting' | 'user' | 'agenda' | 'gallery' | 'breaking';
  targetTitle: string;
  details?: string;
}

export interface ArticleComment {
  id: string;
  articleId: string;
  name: string;
  email: string;
  content: string;
  createdAt: string;
  approved: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  active: boolean;
}
