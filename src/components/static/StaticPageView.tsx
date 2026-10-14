import React from 'react';
import { useNews } from '../../context/NewsContext';
import { ChevronLeft, ShieldCheck, Scale, FileText, Mail, Phone, MapPin } from 'lucide-react';

interface StaticPageViewProps {
  pageSlug: string;
  onBack: () => void;
}

export const StaticPageView: React.FC<StaticPageViewProps> = ({ pageSlug, onBack }) => {
  const { settings } = useNews();

  const getPageData = () => {
    switch (pageSlug) {
      case 'pedoman-media-siber':
        return {
          title: 'Pedoman Pemberitaan Media Siber',
          subtitle: 'Peraturan Dewan Pers No. 1/Peraturan-DP/III/2012 yang Ditaati WARTA HUKUM',
          icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
          content: settings.pedomanMediaSiber
        };
      case 'hak-jawab':
        return {
          title: 'Hak Jawab, Hak Koreksi, dan Ralat Berita',
          subtitle: 'Mekanisme Permohonan Keberatan terhadap Materi Pemberitaan sesuai UU Pers No. 40 Tahun 1999',
          icon: <Scale className="w-6 h-6 text-amber-600" />,
          content: `${settings.hakJawab}\n\n${settings.kebijakanKoreksi}`
        };
      case 'redaksi':
        return {
          title: 'Susunan Dewan Redaksi & Manajemen Pers',
          subtitle: 'Struktur Organisasi Redaksi dan Kontak Resmi WARTA HUKUM',
          icon: <FileText className="w-6 h-6 text-teal-600" />,
          content: `SUSUNAN REDAKSI WARTA HUKUM

Badan Hukum: ${settings.legalEntity}

Pemimpin Umum / Penanggung Jawab:
${settings.chiefEditor}

Wakil Pemimpin Redaksi:
${settings.deputyEditor}

Redaktur Hukum & Peradilan:
Bambang Trihatmojo, S.H., M.H.
Dr. Farhan Halim, S.H., M.Kn.

Redaktur Kriminal & Investigasi:
Ahmad Syafii, S.I.Kom.
Rizki Danu Pratama

Koordinator Liputan Daerah:
Siti Rahmawati, S.H. (Biro Jawa Barat)
Bambang Suprayogo (Biro Jawa Timur)

Kontributor Berita Pendidikan & Advokasi Guru:
Drs. Hendro Wibowo, M.Pd.
Forum Guru Sadar Hukum Nasional

Penasihat Hukum Media:
Kantor Advokat & Konsultan Hukum Trihatmojo & Partners

Alamat Redaksi:
${settings.redaksiAddress}

Telepon: ${settings.redaksiPhone}
WhatsApp Redaksi: ${settings.redaksiWhatsapp}
Email Redaksi: ${settings.redaksiEmail}
Email Pengaduan / Hak Jawab: ${settings.pengaduanEmail}`
        };
      case 'tentang-kami':
        return {
          title: 'Tentang Portal Berita WARTA HUKUM',
          subtitle: 'Visi, Misi, dan Integritas Jurnalistik Hukum Indonesia',
          icon: <Scale className="w-6 h-6 text-red-600" />,
          content: `${settings.tentangKami}\n\nVISI KAMI:\nMenjadi referensi utama informasi hukum dan kriminalitas yang kredibel, tajam, dan edukatif di Indonesia.\n\nMISI KAMI:\n1. Menyajikan pemberitaan peradilan dan penegakan hukum secara berimbang dan faktual.\n2. Memberikan edukasi literasi hukum bagi masyarakat luas dan tenaga kependidikan.\n3. Mengawal transparansi pengusutan perkara tindak pidana korupsi demi kepentingan publik.`
        };
      case 'privasi':
        return {
          title: 'Kebijakan Privasi Pembaca',
          subtitle: 'Perlindungan Data Pribadi Pengguna Layanan WARTA HUKUM',
          icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
          content: settings.kebijakanPrivasi
        };
      case 'ketentuan':
        return {
          title: 'Ketentuan Penggunaan Layanan',
          subtitle: 'Syarat dan Tata Cara Pengutipan Konten Media Digital',
          icon: <FileText className="w-6 h-6 text-slate-700" />,
          content: settings.ketentuanPenggunaan
        };
      default:
        return {
          title: 'Kebijakan Redaksi',
          subtitle: 'WARTA HUKUM Portal Berita Digital',
          icon: <FileText className="w-6 h-6 text-slate-600" />,
          content: settings.pedomanMediaSiber
        };
    }
  };

  const data = getPageData();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-red-700 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Kembali ke Beranda</span>
      </button>

      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-2xs space-y-6">
        <div className="flex items-start gap-4 pb-6 border-b border-slate-200">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 shrink-0">
            {data.icon}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-headline font-bold text-slate-900">
              {data.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
              {data.subtitle}
            </p>
          </div>
        </div>

        {/* Content Paragraphs */}
        <div className="prose max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed font-sans space-y-4 whitespace-pre-line">
          {data.content}
        </div>

        {/* Contact Footer Box */}
        <div className="mt-8 pt-6 border-t border-slate-200 bg-slate-50/70 p-4 rounded-xl text-xs text-slate-600 space-y-2">
          <p className="font-bold text-slate-900">Sekretariat Redaksi &amp; Layanan Pengaduan:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{settings.redaksiEmail}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{settings.redaksiPhone} / WA: {settings.redaksiWhatsapp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
