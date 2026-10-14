import React from 'react';
import { Logo } from './Logo';
import { useNews } from '../../context/NewsContext';
import {
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Scale,
  FileText,
  AlertTriangle,
  ArrowUp
} from 'lucide-react';

interface FooterProps {
  onNavigateCategory: (slug: string) => void;
  onNavigateStaticPage: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateCategory,
  onNavigateStaticPage
}) => {
  const { settings, categories } = useNews();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const primaryCategories = categories.filter(c => c.active).slice(0, 10);

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-16 text-xs">
      {/* Rainbow highlight top bar line */}
      <div className="w-full h-1 rainbow-gradient-bg -mt-12 mb-12"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          {/* Column 1: Media Identity & Legal Description */}
          <div className="space-y-4">
            <Logo size="md" withTagline={false} />
            <p className="text-slate-400 text-xs leading-relaxed">
              {settings.tagline}
            </p>
            <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Badan Hukum &amp; Penerbit</span>
              </div>
              <p className="text-slate-300 font-medium">{settings.legalEntity}</p>
              <p className="text-[10px] text-slate-500">
                Pemberitaan berpedoman pada UU No. 40 Tahun 1999 tentang Pers dan Kode Etik Jurnalistik.
              </p>
            </div>
          </div>

          {/* Column 2: Kanal Berita Utama */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-3 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-indigo-400" />
              <span>Kanal Berita</span>
            </h4>
            <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 text-slate-400">
              {primaryCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => onNavigateCategory(cat.slug)}
                  className="text-left hover:text-white transition-colors truncate py-0.5"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Pedoman, Kebijakan & Hak Jawab */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-3 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Kebijakan Redaksi</span>
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateStaticPage('pedoman-media-siber')}
                  className="hover:text-white transition-colors text-left"
                >
                  Pedoman Pemberitaan Media Siber
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateStaticPage('hak-jawab')}
                  className="hover:text-white transition-colors text-left"
                >
                  Hak Jawab &amp; Hak Koreksi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateStaticPage('redaksi')}
                  className="hover:text-white transition-colors text-left"
                >
                  Susunan Dewan Redaksi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateStaticPage('tentang-kami')}
                  className="hover:text-white transition-colors text-left"
                >
                  Tentang WARTA HUKUM
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateStaticPage('privasi')}
                  className="hover:text-white transition-colors text-left"
                >
                  Kebijakan Privasi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateStaticPage('ketentuan')}
                  className="hover:text-white transition-colors text-left"
                >
                  Ketentuan Penggunaan Konten
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Kontak Redaksi & Pengaduan */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-3 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Kontak &amp; Pengaduan</span>
            </h4>
            <div className="space-y-2.5 text-slate-400 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{settings.redaksiAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <a href={`mailto:${settings.redaksiEmail}`} className="hover:text-white">
                  {settings.redaksiEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{settings.redaksiPhone}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                <p className="font-semibold text-slate-300">Pengaduan Pemberitaan &amp; Hak Jawab:</p>
                <a href={`mailto:${settings.pengaduanEmail}`} className="text-amber-400 hover:underline">
                  {settings.pengaduanEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            <p>{settings.copyrightText}</p>
            <p className="text-[10px] text-slate-600 mt-0.5">
              Pemimpin Redaksi / Penanggung Jawab: {settings.chiefEditor}
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-800"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Kembali ke Atas</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
