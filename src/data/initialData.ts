import {
  Article,
  Category,
  Tag,
  BreakingNewsItem,
  HeroSlide,
  GalleryItem,
  AgendaItem,
  MediaSettings,
  User,
  ActivityLog
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin-1',
    name: 'Bambang Trihatmojo, S.H., M.H.',
    email: 'admin@wartahukum.id',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    bio: 'Pemimpin Redaksi WARTA HUKUM, Praktisi Hukum & Jurnalis Investigasi Senior.',
    active: true,
    createdAt: '2025-01-01T08:00:00Z'
  },
  {
    id: 'user-guru-1',
    name: 'Drs. Hendro Wibowo, M.Pd.',
    email: 'guru@wartahukum.id',
    role: 'GURU',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Guru Pendidikan Kewarganegaraan & Kontributor Berita Hukum Pendidikan Nasional.',
    active: true,
    createdAt: '2025-01-15T09:30:00Z'
  },
  {
    id: 'user-guru-2',
    name: 'Siti Rahmawati, S.H.',
    email: 'siti.kontributor@wartahukum.id',
    role: 'GURU',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    bio: 'Kontributor Daerah Jawa Barat & Pengamat Kebijakan Publik Daerah.',
    active: true,
    createdAt: '2025-02-01T10:00:00Z'
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Hukum', slug: 'hukum', description: 'Kajian regulasi, perundang-undangan, dan kepastian hukum nasional.', order: 1, active: true, color: 'text-rose-600' },
  { id: 'cat-2', name: 'Kriminal', slug: 'kriminal', description: 'Liputan peristiwa kejahatan, penangkapan, dan tindak pidana.', order: 2, active: true, color: 'text-red-600' },
  { id: 'cat-3', name: 'Politik', slug: 'politik', description: 'Dinamika politik kenegaraan, legislasi, dan kebijakan pemerintah.', order: 3, active: true, color: 'text-amber-600' },
  { id: 'cat-4', name: 'Nasional', slug: 'nasional', description: 'Berita terhangat dari berbagai penjuru tanah air.', order: 4, active: true, color: 'text-blue-600' },
  { id: 'cat-5', name: 'Daerah', slug: 'daerah', description: 'Kabar penegakan hukum dan peristiwa di tingkat provinsi dan kabupaten/kota.', order: 5, active: true, color: 'text-emerald-600' },
  { id: 'cat-6', name: 'Pemerintahan', slug: 'pemerintahan', description: 'Kebijakan birokrasi, tata kelola pemerintahan, dan pelayanan publik.', order: 6, active: true, color: 'text-cyan-600' },
  { id: 'cat-7', name: 'Peradilan', slug: 'peradilan', description: 'Jalannya persidangan di Mahkamah Agung, MK, Pengadilan Negeri, dan Tipikor.', order: 7, active: true, color: 'text-purple-600' },
  { id: 'cat-8', name: 'Kejaksaan', slug: 'kejaksaan', description: 'Pengusutan perkara pidana khusus dan kinerja Korps Adhyaksa.', order: 8, active: true, color: 'text-teal-600' },
  { id: 'cat-9', name: 'Kepolisian', slug: 'kepolisian', description: 'Pemberitaan penegakan ketertiban masyarakat oleh Korps Bhayangkara.', order: 9, active: true, color: 'text-indigo-600' },
  { id: 'cat-10', name: 'Korupsi', slug: 'korupsi', description: 'Pengawasan kejahatan kerah putih dan pengembalian aset negara.', order: 10, active: true, color: 'text-orange-600' },
  { id: 'cat-11', name: 'Ekonomi dan Bisnis', slug: 'ekonomi-bisnis', description: 'Sengketa niaga, kepailitan, perbankan, dan regulasi ekonomi.', order: 11, active: true, color: 'text-yellow-600' },
  { id: 'cat-12', name: 'Sosial', slug: 'sosial', description: 'Dinamika sosial, bantuan hukum masyarakat, dan HAM.', order: 12, active: true, color: 'text-emerald-700' },
  { id: 'cat-13', name: 'Pendidikan', slug: 'pendidikan', description: 'Hukum pendidikan, advokasi guru, dan regulasi sekolah nasional.', order: 13, active: true, color: 'text-sky-600' },
  { id: 'cat-14', name: 'Peristiwa', slug: 'peristiwa', description: 'Kejadian darurat, bencana, dan fakta lapangan aktual.', order: 14, active: true, color: 'text-violet-600' },
  { id: 'cat-15', name: 'Opini', slug: 'opini', description: 'Analisis mendalam, artikel ilmiah populer, dan pandangan pakar hukum.', order: 15, active: true, color: 'text-fuchsia-600' },
  { id: 'cat-16', name: 'Investigasi', slug: 'investigasi', description: 'Laporan mendalam hasil penelusuran jurnalistik independen.', order: 16, active: true, color: 'text-rose-700' },
  { id: 'cat-17', name: 'Nasional Update', slug: 'nasional-update', description: 'Rangkuman perkembangan kilat berita penting nasional.', order: 17, active: true, color: 'text-blue-700' }
];

export const INITIAL_TAGS: Tag[] = [
  { id: 't1', name: 'Mahkamah Konstitusi', slug: 'mahkamah-konstitusi', count: 14 },
  { id: 't2', name: 'Kejaksaan Agung', slug: 'kejaksaan-agung', count: 28 },
  { id: 't3', name: 'KPK', slug: 'kpk', count: 22 },
  { id: 't4', name: 'Bareskrim Polri', slug: 'bareskrim-polri', count: 19 },
  { id: 't5', name: 'Tipikor', slug: 'tipikor', count: 17 },
  { id: 't6', name: 'KUHP Baru', slug: 'kuhp-baru', count: 11 },
  { id: 't7', name: 'Asas Praduga Tak Bersalah', slug: 'asas-praduga-tak-bersalah', count: 8 },
  { id: 't8', name: 'Keadilan Restoratif', slug: 'keadilan-restoratif', count: 9 },
  { id: 't9', name: 'Advokasi Guru', slug: 'advokasi-guru', count: 6 },
  { id: 't10', name: 'Pemberantasan Mafia Tanah', slug: 'pemberantasan-mafia-tanah', count: 15 }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'kejagung-sita-aset-senilai-rp-12-triliun-terkait-perkara-korupsi-komoditas',
    title: 'Kejaksaan Agung Sita Aset Rp 1,2 Triliun Terkait Dugaan Tipikor Tata Niaga Komoditas',
    summary: 'Tim Penyidik Jampidsus Kejaksaan Agung kembali menyita sejumlah aset properti dan rekening bank terkait pengusutan perkara dugaan tindak pidana korupsi tata kelola komoditas nasional.',
    content: `JAKARTA — Tim Penyidik pada Direktorat Penyidikan Jaksa Agung Muda Bidang Tindak Pidana Khusus (Jampidsus) Kejaksaan Agung melakukan tindakan penggeledahan dan penyitaan aset strategis berupa bangunan kantor, tanah komersial, serta pemblokiran rekening giro korporasi dengan total perkiraan nilai mencapai Rp 1,2 triliun.

Kepala Pusat Penerangan Hukum (Kapuspenkum) Kejaksaan Agung dalam keterangan pers di Gedung Bundar menyampaikan bahwa langkah penyitaan ini merupakan bagian dari upaya pemulihan kerugian keuangan negara (*asset recovery*).

"Penyidik terus melacak aset para tersangka maupun pihak terafiliasi yang diduga kuat bersumber dari keuntungan melawan hukum dalam tata kelola komoditas. Penyitaan dilakukan berdasarkan penetapan Pengadilan Negeri setempat," jelas Kapuspenkum.

### Menjunjung Asas Praduga Tak Bersalah
Redaksi WARTA HUKUM menegaskan bahwa seluruh proses hukum yang berjalan tetap berlandaskan asas praduga tak bersalah (*presumption of innocence*) hingga adanya putusan pengadilan yang berkekuatan hukum tetap (*inkrah*). Para saksi dan tersangka memiliki hak hukum yang dijamin oleh Kitab Undang-Undang Hukum Acara Pidana (KUHAP).

Pakar hukum pidana Universitas Indonesia yang dimintai tanggapan menyatakan bahwa keberhasilan penanganan korupsi tidak hanya diukur dari penjatuhan pidana badan, melainkan seberapa optimal uang negara yang bocor dapat dikembalikan ke kas perbendaharaan negara.`,
    category: 'Kejaksaan',
    tags: ['Kejaksaan Agung', 'Tipikor', 'Asas Praduga Tak Bersalah'],
    location: { province: 'DKI Jakarta', city: 'Jakarta Selatan' },
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1000&auto=format&fit=crop&q=80',
    caption: 'Gedung Bundar Jaksa Agung Muda Tindak Pidana Khusus (Jampidsus) Kejaksaan Agung RI di Jakarta.',
    imageCredit: 'Dok. Humas Kejaksaan Agung RI / WARTA HUKUM',
    authorId: 'user-admin-1',
    authorName: 'Bambang Trihatmojo, S.H., M.H.',
    authorRole: 'Pemimpin Redaksi',
    editorName: 'Tim Redaksi Pusat',
    createdAt: '2026-10-12T08:00:00Z',
    updatedAt: '2026-10-13T09:15:00Z',
    publishedAt: '2026-10-13T09:30:00Z',
    status: 'published',
    isBreaking: true,
    isFeatured: true,
    inHeroSlider: true,
    viewCount: 4890,
    readingTimeMinutes: 4,
    seoTitle: 'Kejagung Sita Aset Rp 1,2 Triliun Terkait Dugaan Tipikor Komoditas | WARTA HUKUM',
    seoDescription: 'Penyidik Jampidsus Kejaksaan Agung menyita aset properti dan rekening bernilai triliunan rupiah dalam perkara dugaan korupsi komoditas.',
    caseStatus: 'Dalam Tahap Penyidikan Khusus'
  },
  {
    id: 'art-2',
    slug: 'sidang-perdana-gugatan-uu-kesejahteraan-guru-di-mahkamah-konstitusi',
    title: 'Mahkamah Konstitusi Gelar Sidang Uji Materiil Pasal Perlindungan Profesi Guru dan Tenaga Kependidikan',
    summary: 'Sidang panel Mahkamah Konstitusi memeriksa permohonan pengujian materiil norma perlindungan hukum bagi tenaga pendidik saat menjalankan tugas kedinasan di sekolah.',
    content: `JAKARTA — Mahkamah Konstitusi (MK) menggelar sidang pleno perdana perkara permohonan Pengujian Materiil Undang-Undang Nomor 14 Tahun 2005 tentang Guru dan Dosen terhadap Undang-Undang Dasar Negara Republik Indonesia Tahun 1945.

Pemohon yang terdiri atas forum tenaga pendidik dan advokat pendidikan memohonkan kejelasan penafsiran terhadap pasal perlindungan hukum profesi guru. Hal ini menyusul maraknya kriminalisasi terhadap guru ketika menegakkan disiplin tata tertib sekolah terhadap peserta didik.

"Kami memohon Mahkamah memberikan pemaknaan konstitusional bersyarat agar tindakan pendisiplinan yang berpedoman pada kode etik guru dan norma pendidikan tidak dapat dikualifikasikan sebagai tindak pidana penganiayaan ringan," ujar kuasa hukum pemohon di hadapan panel Hakim Konstitusi.

Hakim Konstitusi memberikan sejumlah nasihat perbaikan permohonan, khususnya terkait kedudukan hukum (*legal standing*) pemohon dan argumentasi kerugian konstitusional yang bersifat spesifik dan aktual. Sidang perbaikan dijadwalkan kembali dua pekan mendatang.`,
    category: 'Peradilan',
    tags: ['Mahkamah Konstitusi', 'Advokasi Guru', 'Hukum'],
    location: { province: 'DKI Jakarta', city: 'Jakarta Pusat' },
    coverImage: 'https://images.unsplash.com/photo-1453733197781-3082240e7de5?w=1000&auto=format&fit=crop&q=80',
    caption: 'Ruang Sidang Pleno Gedung Mahkamah Konstitusi Republik Indonesia di Jalan Medan Merdeka Barat.',
    imageCredit: 'Humas Mahkamah Konstitusi / WARTA HUKUM',
    authorId: 'user-guru-1',
    authorName: 'Drs. Hendro Wibowo, M.Pd.',
    authorRole: 'Kontributor Berita (Guru PKn)',
    editorName: 'Bambang Trihatmojo, S.H., M.H.',
    createdAt: '2026-10-11T11:00:00Z',
    updatedAt: '2026-10-12T14:20:00Z',
    publishedAt: '2026-10-12T15:00:00Z',
    status: 'published',
    isBreaking: false,
    isFeatured: true,
    inHeroSlider: true,
    viewCount: 3120,
    readingTimeMinutes: 5,
    seoTitle: 'Sidang MK Uji Materiil Perlindungan Hukum Guru dan Dosen | WARTA HUKUM',
    seoDescription: 'Mahkamah Konstitusi memeriksa gugatan uji materiil aturan perlindungan hukum profesi pendidik dari potensi kriminalisasi.',
    caseStatus: 'Pemeriksaan Pendahuluan Panel'
  },
  {
    id: 'art-3',
    slug: 'satgas-mafia-tanah-bareskrim-polri-bongkar-sindikat-pemalsuan-warkah-shm',
    title: 'Satgas Anti-Mafia Tanah Bareskrim Polri Ungkap Sindikat Pemalsuan Girik dan Sertifikat di Jawa Barat',
    summary: 'Penyidik Direktorat Tindak Pidana Umum Bareskrim Polri meringkus lima orang yang diduga tergabung dalam sindikat mafia tanah berskala lintas kabupaten.',
    content: `BANDUNG — Tim Satuan Tugas Pemberantasan Mafia Tanah Bareskrim Polri berkoordinasi dengan Polda Jawa Barat berhasil membongkar dugaan jaringan pemalsu dokumen kepemilikan tanah seluas 48 hektare bernilai ratusan miliar rupiah di wilayah Bogor dan Bekasi.

Direktur Tindak Pidana Umum Bareskrim Polri dalam konferensi pers menerangkan modus operandi para tersangka yakni dengan memalsukan warkah letter C tanah adat serta memanfaatkan celah administrasi desa untuk menerbitkan sertifikat tumpang tindih.

"Barang bukti yang diamankan meliputi puluhan stempel palsu instansi agraria, blangko girik lawas, komputer pencetak dokumen kuno tiruan, serta 12 sertifikat hak milik aspal (asli tapi palsu)," tutur Direktur Tipidum.

Saat ini kelima tersangka ditahan di Rutan Bareskrim untuk menjalani pemeriksaan intensif. Polisi juga mendalami potensi keterlibatan oknum aparatur sipil daerah maupun notaris nakal dalam penerbitan akta jual beli palsu.`,
    category: 'Kepolisian',
    tags: ['Bareskrim Polri', 'Pemberantasan Mafia Tanah', 'Kriminal'],
    location: { province: 'Jawa Barat', city: 'Bandung' },
    coverImage: 'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=1000&auto=format&fit=crop&q=80',
    caption: 'Penyidik memperlihatkan barang bukti dokumen tanah dan cap instansi palsu di hadapan awak media.',
    imageCredit: 'WARTA HUKUM Biro Jawa Barat',
    authorId: 'user-guru-2',
    authorName: 'Siti Rahmawati, S.H.',
    authorRole: 'Kontributor Daerah Jabar',
    editorName: 'Bambang Trihatmojo, S.H., M.H.',
    createdAt: '2026-10-10T14:00:00Z',
    updatedAt: '2026-10-11T16:00:00Z',
    publishedAt: '2026-10-11T16:30:00Z',
    status: 'published',
    isBreaking: false,
    isFeatured: true,
    inHeroSlider: true,
    viewCount: 2780,
    readingTimeMinutes: 4,
    seoTitle: 'Bareskrim Bongkar Mafia Tanah di Jabar, 5 Orang Diamankan | WARTA HUKUM',
    seoDescription: 'Sindikat pemalsuan sertifikat tanah 48 hektare di Jawa Barat diungkap oleh Satgas Mafia Tanah Bareskrim Polri.',
    caseStatus: 'Penyidikan & Penahanan Rutan'
  },
  {
    id: 'art-4',
    slug: 'analisis-hukum-penerapan-keadilan-restoratif-dalam-delik-aduan',
    title: 'Opini: Menguji Batas Moral dan Hukum Restorative Justice dalam Tindak Pidana Ringan',
    summary: 'Restorative justice bukan sekadar jalan damai transaksi uang, melainkan instrumen pemulihan keadilan substantif yang membutuhkan pengawasan ketat aparat penegak hukum.',
    content: `Oleh: Prof. Dr. Ismail Marzuki, S.H., M.Hum. (Guru Besar Hukum Pidana Universitas Andalas)

Konsep keadilan restoratif (*restorative justice*) kini kian populer di lingkungan Kepolisian Negara Republik Indonesia dan Kejaksaan RI melalui Peraturan Kapolri No. 8 Tahun 2021 dan Peraturan Kejaksaan No. 15 Tahun 2020. Pendekatan ini menawarkan penyelesaian perkara tanpa melalui jalur pemidanaan penjara, dengan menitikberatkan pada pemulihan kembali keadaan semula antara korban dan pelaku.

Namun, di tengah gelombang antusiasme publik, muncul tantangan serius: bagaimana menjaga agar keadilan restoratif tidak tergelincir menjadi instrumen "transaksi perkara" atau kompromi uang damai yang menekan pihak korban miskin?

### Syarat Substantif yang Wajib Dipenuhi
1. **Sukarela Tanpa Intimidasi**: Perdamaian harus lahir dari kesadaran pelaku dan kerelaan tulus korban, bukan karena tekanan aparat atau kuasa ekonomi pelaku.
2. **Kategori Delik**: Tidak boleh diterapkan pada tindak pidana korupsi, narkotika sindikat, kekerasan seksual berat, maupun tindak pidana terhadap keamanan negara.
3. **Akuntabilitas Publik**: Setiap penghentian penuntutan atau penyidikan wajib tercatat dalam register perkara terbuka untuk mencegah penyalahgunaan wewenang.

Keadilan restoratif sejatinya mengembalikan martabat hukum sebagai penjaga harmoni sosial, bukan sekadar mesin penjatuh derita kurungan.`,
    category: 'Opini',
    tags: ['Keadilan Restoratif', 'Hukum', 'KUHP Baru'],
    location: { province: 'Sumatera Barat', city: 'Padang' },
    coverImage: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1000&auto=format&fit=crop&q=80',
    caption: 'Buku-buku rujukan hukum pidana dan timbangan keadilan di perpustakaan fakultas hukum.',
    imageCredit: 'WARTA HUKUM Kolom Opini',
    authorId: 'user-admin-1',
    authorName: 'Prof. Dr. Ismail Marzuki, S.H., M.Hum.',
    authorRole: 'Pakar Hukum Tamu',
    editorName: 'Bambang Trihatmojo, S.H., M.H.',
    createdAt: '2026-10-09T09:00:00Z',
    updatedAt: '2026-10-10T10:00:00Z',
    publishedAt: '2026-10-10T10:30:00Z',
    status: 'published',
    isBreaking: false,
    isFeatured: false,
    inHeroSlider: false,
    isOpinion: true,
    viewCount: 1940,
    readingTimeMinutes: 6,
    seoTitle: 'Opini: Menguji Batas Moral Keadilan Restoratif | WARTA HUKUM',
    seoDescription: 'Analisis mendalam mengenai penerapan restorative justice di Indonesia agar tidak disalahgunakan sebagai kompromi perkara.'
  },
  {
    id: 'art-5',
    slug: 'sidang-tipikor-pn-surabaya-vonis-kasus-dana-hibah',
    title: 'Pengadilan Tipikor Surabaya Bacakan Putusan Perkara Dugaan Penyimpangan Dana Hibah Pemprov',
    summary: 'Majelis hakim Pengadilan Tipikor pada Pengadilan Negeri Surabaya menjatuhkan vonis pidana penjara serta uang pengganti terhadap terdakwa perkara korupsi hibah pokir.',
    content: `SURABAYA — Majelis Hakim Pengadilan Tindak Pidana Korupsi (Tipikor) Surabaya menyatakan terdakwa terbukti secara sah dan meyakinkan bersalah melakukan tindak pidana korupsi secara bersama-sama sebagaimana dakwaan subsidair penuntut umum Pasal 3 UU Tipikor.

Dalam amar putusannya, ketua majelis hakim menjatuhkan pidana penjara selama 4 tahun dan 6 bulan, denda sejumlah Rp 250 juta subsidair 3 bulan kurungan, serta kewajiban membayar uang pengganti kerugian negara sebesar Rp 1,8 miliar.

Kuasa hukum terdakwa menyatakan pikir-pikir selama 7 hari kalender sebelum menentukan sikap hukum apakah akan mengajukan upaya banding ke Pengadilan Tinggi atau menerima putusan tersebut.

Sementara itu Jaksa Penuntut Umum Kejari Surabaya juga menyatakan sikap pikir-pikir untuk mempelajari pertimbangan hukum majelis terkait besaran uang pengganti yang diputus lebih rendah dari tuntutan jaksa.`,
    category: 'Daerah',
    tags: ['Tipikor', 'Peradilan', 'Kejaksaan'],
    location: { province: 'Jawa Timur', city: 'Surabaya' },
    coverImage: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=1000&auto=format&fit=crop&q=80',
    caption: 'Majelis hakim membacakan berkas putusan dalam persidangan tindak pidana korupsi di Pengadilan Negeri.',
    imageCredit: 'WARTA HUKUM Biro Jawa Timur',
    authorId: 'user-admin-1',
    authorName: 'Bambang Trihatmojo, S.H., M.H.',
    authorRole: 'Pemimpin Redaksi',
    editorName: 'Tim Redaksi Pusat',
    createdAt: '2026-10-08T13:00:00Z',
    updatedAt: '2026-10-09T08:00:00Z',
    publishedAt: '2026-10-09T08:30:00Z',
    status: 'published',
    isBreaking: false,
    isFeatured: false,
    inHeroSlider: false,
    viewCount: 1620,
    readingTimeMinutes: 3,
    seoTitle: 'Vonis Perkara Korupsi Hibah di Pengadilan Tipikor Surabaya | WARTA HUKUM',
    seoDescription: 'Majelis Hakim Pengadilan Tipikor Surabaya menjatuhkan vonis penjara dan uang pengganti kepada terdakwa perkara hibah daerah.',
    caseStatus: 'Putusan Tingkat Pertama (Tenggang Banding)'
  },
  {
    id: 'art-6',
    slug: 'investigasi-dugaan-pelanggaran-izin-lingkungan-tambang-ilegal-di-kalimantan',
    title: 'Investigasi: Menelusuri Jalur Gelap Tambang Tanpa Izin di Kawasan Konservasi Hulu Sungai',
    summary: 'Laporan penelusuran lapangan WARTA HUKUM mengungkap indikasi keterlibatan sindikat perizinan fiktif dan pembiaran pembabatan hutan lindung demi pengerukan mineral ilegal.',
    content: `BANJARMASIN — Selama hampir tiga bulan, tim investigasi WARTA HUKUM menyusuri aliran sungai dan kawasan lindung di pedalaman Kalimantan Selatan. Di balik lebatnya vegetasi tropis, suara deru ekskavator berat beroperasi siang dan malam merobek tanah purba demi mengekstraksi batubara dan mineral galian C.

Pemeriksaan silang terhadap dokumen Rencana Tata Ruang Wilayah (RTRW) serta peta konsesi resmi Kementerian Lingkungan Hidup dan Kehutanan (KLHK) membuktikan bahwa lokasi tambang tersebut berstatus Hutan Lindung Mutlak yang diharamkan untuk segala aktivitas eksploitasi terbuka.

"Kami menemukan truk-truk pengangkut menggunakan plat nomor palsu dan dokumen surat jalan yang menggunakan nama badan usaha yang telah dicabut status hukumnya oleh Kemenkumham sejak tahun 2022," ungkap salah seorang anggota tim penelusuran.

Dampak ekologis telah merusak sumber air baku bagi 14 desa adat di hilir sungai. Redaksi WARTA HUKUM telah menyerahkan berkas temuan awal ini kepada aparat penegak hukum dan Komisi Pemberantasan Korupsi (KPK) untuk ditindaklanjuti secara objektif dan transparan.`,
    category: 'Investigasi',
    tags: ['Hukum', 'Korupsi', 'Nasional'],
    location: { province: 'Kalimantan Selatan', city: 'Banjarmasin' },
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1000&auto=format&fit=crop&q=80',
    caption: 'Foto udara kawasan hutan lindung yang terkikis akibat aktivitas penambangan tanpa izin di Kalimantan.',
    imageCredit: 'Tim Investigasi Jurnalistik WARTA HUKUM',
    authorId: 'user-admin-1',
    authorName: 'Bambang Trihatmojo, S.H., M.H.',
    authorRole: 'Pemimpin Redaksi / Koordinator Investigasi',
    editorName: 'Dewan Redaksi',
    createdAt: '2026-10-07T10:00:00Z',
    updatedAt: '2026-10-08T11:00:00Z',
    publishedAt: '2026-10-08T11:30:00Z',
    status: 'published',
    isBreaking: false,
    isFeatured: true,
    inHeroSlider: true,
    viewCount: 5120,
    readingTimeMinutes: 7,
    seoTitle: 'Investigasi Tambang Ilegal di Kawasan Konservasi Kalimantan | WARTA HUKUM',
    seoDescription: 'Laporan investigasi mendalam WARTA HUKUM mengenai perusakan hutan lindung oleh aktivitas penambangan liar.',
    caseStatus: 'Laporan Penyelidikan Investigatif'
  },
  {
    id: 'art-7',
    slug: 'sosialisasi-edukasi-hukum-cyber-bullying-di-lingkungan-pelajar',
    title: 'Pentingnya Literasi Hukum UU ITE dan Pencegahan Perundungan Siber bagi Remaja',
    summary: 'Edukasi hukum preventif di sekolah dinilai efektif mencegah siswa terjerat kasus pencemaran nama baik dan penyebaran konten bermasalah di media sosial.',
    content: `SEMARANG — Dalam rangka mencegah maraknya sengketa hukum di era digital, penyuluhan hukum bertajuk "Jaksa Sahabat Pelajar dan Perlindungan Guru" diselenggarakan serentak di hadapan ratusan siswa dan tenaga pendidik tingkat menengah di Semarang.

Materi penyuluhan menitikberatkan pada pemahaman batasan hukum dalam Undang-Undang Informasi dan Transaksi Elektronik (UU ITE), khususnya terkait larangan menyebarkan ujaran kebencian, pencemaran nama baik, serta perundungan siber (*cyber bullying*).

Guru Pendidikan Kewarganegaraan yang menjadi fasilitator kegiatan menegaskan bahwa pemahaman hukum sejak dini menanamkan kesadaran etika bermedia, sehingga ruang digital tidak menjadi sarana pelanggaran hukum antar-rekan sebaya.`,
    category: 'Pendidikan',
    tags: ['Hukum', 'Advokasi Guru', 'Sosial'],
    location: { province: 'Jawa Tengah', city: 'Semarang' },
    coverImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1000&auto=format&fit=crop&q=80',
    caption: 'Suasana dialog interaktif penyuluhan kesadaran hukum bagi pelajar dan guru di aula sekolah.',
    imageCredit: 'WARTA HUKUM Biro Jateng',
    authorId: 'user-guru-1',
    authorName: 'Drs. Hendro Wibowo, M.Pd.',
    authorRole: 'Kontributor Berita (Guru PKn)',
    editorName: 'Bambang Trihatmojo, S.H., M.H.',
    createdAt: '2026-10-06T08:30:00Z',
    updatedAt: '2026-10-06T12:00:00Z',
    publishedAt: '2026-10-06T14:00:00Z',
    status: 'published',
    isBreaking: false,
    isFeatured: false,
    inHeroSlider: false,
    viewCount: 1210,
    readingTimeMinutes: 3,
    seoTitle: 'Literasi Hukum UU ITE dan Pencegahan Perundungan Siber Pelajar | WARTA HUKUM',
    seoDescription: 'Sosialisasi kesadaran hukum UU ITE dan bahaya perundungan siber bagi siswa dan tenaga pendidik.'
  },
  // Item submitted by Guru waiting for review
  {
    id: 'art-8',
    slug: 'analisis-kebijakan-tata-kelola-bantuan-hukum-cuma-cuma-di-daerah',
    title: 'Analisis: Optimalisasi Anggaran Bantuan Hukum bagi Masyarakat Kurang Mampu di Tingkat Pemda',
    summary: 'Bagaimana peran Peraturan Daerah dalam menjamin hak konstitusional warga miskin memperoleh pendampingan advokat secara cuma-cuma tanpa birokrasi berbelit.',
    content: `Hak atas perlakuan yang sama di hadapan hukum (*equality before the law*) merupakan amanat tegas Pasal 27 ayat (1) UUD 1945. Namun pada tataran empiris di daerah, masyarakat miskin kerap menghadapi tembok tebal saat berhadapan dengan proses hukum karena keterbatasan finansial menyewa penasihat hukum.

Pemerintah Daerah seyogianya mengalokasikan pos anggaran bantuan hukum secara transparan dan bekerja sama dengan Organisasi Bantuan Hukum (OBH) yang telah terakreditasi oleh Kementerian Hukum dan HAM.

Diperlukan simplifikasi syarat administratif Surat Keterangan Tidak Mampu (SKTM) agar pencari keadilan tidak terhambat oleh proses birokrasi kelurahan saat menghadapi perkara yang membutuhkan pendampingan mendesak seperti penahanan kepolisian.`,
    category: 'Sosial',
    tags: ['Hukum', 'Keadilan Restoratif'],
    location: { province: 'Jawa Barat', city: 'Cirebon' },
    coverImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1000&auto=format&fit=crop&q=80',
    caption: 'Konsultasi bantuan hukum cuma-cuma bersama paralegal dan warga pencari keadilan.',
    imageCredit: 'Kontributor Daerah Jabar',
    authorId: 'user-guru-2',
    authorName: 'Siti Rahmawati, S.H.',
    authorRole: 'Kontributor Daerah Jabar',
    createdAt: '2026-10-13T10:00:00Z',
    updatedAt: '2026-10-13T14:00:00Z',
    status: 'submitted',
    isBreaking: false,
    isFeatured: false,
    inHeroSlider: false,
    viewCount: 0,
    readingTimeMinutes: 4,
    editorNotes: 'Menunggu peninjauan redaktur pelaksana terkait validitas kutipan perda.'
  },
  // Item needing revision
  {
    id: 'art-9',
    slug: 'draf-pembahasan-regulasi-disiplin-sekolah-dan-hak-anak',
    title: 'Keseimbangan Hak Anak dan Wewenang Guru dalam Penerapan Sanksi Edukatif di Lingkungan Sekolah',
    summary: 'Catatan kritis mengenai batasan hukuman fisik dan pendisiplinan mental agar sejalan dengan Undang-Undang Perlindungan Anak.',
    content: `Guru memiliki peran sentral dalam membimbing karakter generasi penerus. Namun dalam praktiknya, sering timbul friksi antara orang tua murid dan pihak sekolah ketika anak mendapatkan sanksi disiplin seperti berdiri saat upacara atau membersihkan kelas.

Dibutuhkan kesepakatan tertulis berupa Pakta Integritas Pendidikan yang disetujui bersama oleh orang tua saat pertama kali mendaftarkan anak di sekolah.`,
    category: 'Pendidikan',
    tags: ['Advokasi Guru', 'Hukum'],
    location: { province: 'DKI Jakarta', city: 'Jakarta Timur' },
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&auto=format&fit=crop&q=80',
    caption: 'Aktivitas belajar mengajar dan pembinaan karakter di ruang kelas.',
    imageCredit: 'Dokumentasi Guru PKn',
    authorId: 'user-guru-1',
    authorName: 'Drs. Hendro Wibowo, M.Pd.',
    authorRole: 'Kontributor Berita (Guru PKn)',
    createdAt: '2026-10-12T09:00:00Z',
    updatedAt: '2026-10-13T08:00:00Z',
    status: 'needs_revision',
    isBreaking: false,
    isFeatured: false,
    inHeroSlider: false,
    viewCount: 0,
    readingTimeMinutes: 3,
    editorNotes: 'Mohon tambahkan rujukan pasal dalam UU Perlindungan Anak dan Permendikbudristek tentang Pencegahan Kekerasan di Satuan Pendidikan sebelum diterbitkan.'
  }
];

export const INITIAL_BREAKING_NEWS: BreakingNewsItem[] = [
  {
    id: 'bn-1',
    title: 'Kejaksaan Agung Sita Aset Rp 1,2 Triliun Terkait Dugaan Tipikor Komoditas Nasional',
    articleId: 'art-1',
    url: '/berita/kejagung-sita-aset-senilai-rp-12-triliun-terkait-perkara-korupsi-komoditas',
    priority: 1,
    active: true,
    publishedAt: '2026-10-13T09:30:00Z'
  },
  {
    id: 'bn-2',
    title: 'Mahkamah Konstitusi Gelar Sidang Pengujian Pasal Perlindungan Profesi Guru',
    articleId: 'art-2',
    url: '/berita/sidang-perdana-gugatan-uu-kesejahteraan-guru-di-mahkamah-konstitusi',
    priority: 2,
    active: true,
    publishedAt: '2026-10-12T15:00:00Z'
  },
  {
    id: 'bn-3',
    title: 'Satgas Anti-Mafia Tanah Bareskrim Polri Meringkus 5 Tersangka Pemalsu Sertifikat di Jabar',
    articleId: 'art-3',
    url: '/berita/satgas-mafia-tanah-bareskrim-polri-bongkar-sindikat-pemalsuan-warkah-shm',
    priority: 3,
    active: true,
    publishedAt: '2026-10-11T16:30:00Z'
  }
];

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hs-1',
    title: 'Kejaksaan Agung Sita Aset Rp 1,2 Triliun Terkait Dugaan Tipikor Komoditas',
    summary: 'Penyidik Jampidsus Kejaksaan Agung bergerak cepat menyita tanah komersial, gedung perkantoran, dan rekening korporasi dalam rangka asset recovery kerugian keuangan negara.',
    category: 'Kejaksaan',
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=80',
    articleId: 'art-1',
    order: 1,
    active: true
  },
  {
    id: 'hs-2',
    title: 'Mahkamah Konstitusi Uji Norma Perlindungan Hukum bagi Profesi Guru di Indonesia',
    summary: 'Sidang pleno perdana permohonan pengujian materiil UU Guru dan Dosen demi mencegah potensi kriminalisasi pendidik saat menjalankan tugas kedinasan di sekolah.',
    category: 'Peradilan',
    coverImage: 'https://images.unsplash.com/photo-1453733197781-3082240e7de5?w=1200&auto=format&fit=crop&q=80',
    articleId: 'art-2',
    order: 2,
    active: true
  },
  {
    id: 'hs-3',
    title: 'Investigasi: Menelusuri Jejak Tambang Ilegal di Kawasan Konservasi Kalimantan',
    summary: 'Penelusuran jurnalistik mendalam WARTA HUKUM mengungkap indikasi mafia izin dan perusakan lingkungan hidup di area hutan lindung hulu sungai.',
    category: 'Investigasi',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80',
    articleId: 'art-6',
    order: 3,
    active: true
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Konferensi Pers Pengungkapan Aset Sitaan Tipikor Kejaksaan Agung',
    type: 'photo',
    mediaUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&auto=format&fit=crop&q=80',
    caption: 'Kapuspenkum Kejagung memberikan penjelasan resmi mengenai penyitaan aset miliaran rupiah kepada awak media.',
    photographer: 'Ahmad Fauzi (WARTA HUKUM)',
    date: '2026-10-13',
    category: 'Penegakan Hukum',
    tags: ['Kejaksaan', 'Korupsi']
  },
  {
    id: 'gal-2',
    title: 'Suasana Ruang Sidang Utama Mahkamah Konstitusi RI',
    type: 'photo',
    mediaUrl: 'https://images.unsplash.com/photo-1453733197781-3082240e7de5?w=1200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1453733197781-3082240e7de5?w=500&auto=format&fit=crop&q=80',
    caption: 'Majelis sembilan Hakim Konstitusi memimpin jalannya sidang perkara perselisihan pengujian undang-undang.',
    photographer: 'Rizki Pratama (WARTA HUKUM)',
    date: '2026-10-12',
    category: 'Peradilan',
    tags: ['Mahkamah Konstitusi', 'Peradilan']
  },
  {
    id: 'gal-3',
    title: 'Gelar Barang Bukti Pengungkapan Sindikat Pemalsuan Sertifikat Tanah',
    type: 'photo',
    mediaUrl: 'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=1200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=500&auto=format&fit=crop&q=80',
    caption: 'Jajaran Bareskrim Polri memperlihatkan bundel girik dan cap instansi palsu yang disita dari para tersangka.',
    photographer: 'Danu Kusuma (WARTA HUKUM)',
    date: '2026-10-11',
    category: 'Kepolisian',
    tags: ['Bareskrim', 'Kriminal']
  },
  {
    id: 'gal-4',
    title: 'Video Edukasi: Mengenal Asas Praduga Tak Bersalah dalam Liputan Kriminal',
    type: 'video',
    mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=500&auto=format&fit=crop&q=80',
    caption: 'Diskusi hukum redaksi WARTA HUKUM bersama dewan pers mengenai batasan kode etik jurnalistik dalam peliputan perkara pidana.',
    photographer: 'Tim Multimedia WARTA HUKUM',
    date: '2026-10-10',
    category: 'Edukasi Hukum',
    tags: ['Kode Etik', 'Jurnalistik']
  }
];

export const INITIAL_AGENDAS: AgendaItem[] = [
  {
    id: 'ag-1',
    title: 'Sidang Pembacaan Putusan Perkara Uji Materiil Norma Hukum Pendidikan',
    date: '2026-10-20',
    time: '09:30 WIB',
    location: 'Ruang Sidang Pleno Mahkamah Konstitusi, Jl. Medan Merdeka Barat No. 6, Jakarta',
    organizer: 'Kepaniteraan dan Sekretariat Jenderal Mahkamah Konstitusi RI',
    description: 'Sidang terbuka untuk umum dengan agenda pengucapan putusan/ketetapan hakim konstitusi.',
    status: 'upcoming',
    isPublic: true,
    submittedBy: 'user-admin-1',
    authorName: 'Redaksi WARTA HUKUM'
  },
  {
    id: 'ag-2',
    title: 'Konferensi Pers Capaian Kinerja Pemulihan Aset Kerugian Negara Triwulan III',
    date: '2026-10-22',
    time: '14:00 WIB',
    location: 'Press Room Pusat Penerangan Hukum Gedung Utama Kejaksaan Agung RI',
    organizer: 'Pusat Penerangan Hukum Kejaksaan Agung RI',
    description: 'Pemaparan komprehensif penanganan perkara tipikor kakap dan penyelamatan aset negara.',
    status: 'upcoming',
    isPublic: true,
    submittedBy: 'user-admin-1',
    authorName: 'Redaksi WARTA HUKUM'
  },
  {
    id: 'ag-3',
    title: 'Seminar Nasional: Perlindungan Profesi Guru dalam Bingkai Hukum Positif',
    date: '2026-10-25',
    time: '08:30 WIB',
    location: 'Auditorium Lembaga Penjaminan Mutu Pendidikan (LPMP) & Virtual Zoom',
    organizer: 'Asosiasi Guru PKn Indonesia & Lembaga Bantuan Hukum Pendidikan',
    description: 'Bedah kasus kriminalisasi guru dan penyusunan rekomendasi pedoman teknis perlindungan sekolah.',
    status: 'upcoming',
    isPublic: true,
    submittedBy: 'user-guru-1',
    authorName: 'Drs. Hendro Wibowo, M.Pd.'
  }
];

export const INITIAL_MEDIA_SETTINGS: MediaSettings = {
  mediaName: 'WARTA HUKUM',
  tagline: 'Portal Berita Hukum & Kriminal Indonesia Terpercaya, Faktual, dan Independen',
  logoUrl: '',
  legalEntity: 'PT WARTA HUKUM NUSANTARA PERS (Badan Hukum Dalam Verifikasi)',
  chiefEditor: 'Bambang Trihatmojo, S.H., M.H.',
  deputyEditor: 'Achmad Syafii, S.I.Kom.',
  responsiblePerson: 'Bambang Trihatmojo, S.H., M.H.',
  redaksiAddress: 'Gedung Pers Warta Hukum Lt. 4, Jl. Hayam Wuruk No. 88, Gambir, Jakarta Pusat 10120',
  redaksiEmail: 'redaksi@wartahukum.id',
  redaksiPhone: '(021) 3456-7890',
  redaksiWhatsapp: '+62 812-3456-7890',
  pengaduanEmail: 'pengaduan.redaksi@wartahukum.id',
  socialLinks: {
    facebook: 'https://facebook.com/wartahukum.official',
    twitter: 'https://x.com/wartahukum_id',
    instagram: 'https://instagram.com/wartahukum.official',
    youtube: 'https://youtube.com/@wartahukum-channel',
    tiktok: 'https://tiktok.com/@wartahukum.id'
  },
  pedomanMediaSiber: `PEDOMAN PEMBERITAAN MEDIA SIBER WARTA HUKUM

Kemerdekaan berpendapat, kemerdekaan berekspresi, dan kemerdekaan pers adalah hak asasi manusia yang dilindungi Pancasila, Undang-Undang Dasar 1945, dan Deklarasi Universal Hak Asasi Manusia PBB.

WARTA HUKUM berpegang teguh pada prinsip-prinsip:
1. Ruang Lingkup: Seluruh media digital WARTA HUKUM tunduk pada UU No. 40 Tahun 1999 tentang Pers dan Kode Etik Jurnalistik.
2. Verifikasi dan Keberimbangan Berita: Setiap berita wajib melalui proses konfirmasi berimbang, tidak memuat fitnah, dan tidak memvonis pihak yang belum terbukti bersalah.
3. Asas Praduga Tak Bersalah: Dalam memberitakan perkara pidana, identitas anak berhadapan dengan hukum serta korban kekerasan seksual dirahasiakan, dan tersangka dihormati hak hukumnya.
4. Koreksi dan Hak Jawab: WARTA HUKUM wajib melayani Hak Jawab dan Hak Koreksi secara proporsional dan segera.`,
  kebijakanKoreksi: `KEBIJAKAN KOREKSI DAN PEMBARUAN ARTIKEL

Redaksi WARTA HUKUM berkomitmen menyajikan informasi yang akurat dan dapat dipertanggungjawabkan. Apabila terjadi kekeliruan data, kutipan, nama, atau fakta:
1. Pembaca dapat mengirimkan laporan ralat melalui email pengaduan.redaksi@wartahukum.id disertai rujukan bukti yang sah.
2. Redaksi akan meneliti dan menautkan catatan revisi pada artikel bersangkutan dengan mencantumkan keterangan: "[RALAT/KLARIFIKASI - Waktu Pembaruan]".
3. Redaksi tidak menghapus jejak sejarah perkara secara sewenang-wenang tanpa persetujuan Pemimpin Redaksi dan dasar hukum yang sah.`,
  hakJawab: `TATA CARA PENGAJUAN HAK JAWAB

Berdasarkan Pasal 1 ayat (11) dan Pasal 5 ayat (2) Undang-Undang Pers No. 40 Tahun 1999:
1. Hak Jawab adalah hak seseorang atau sekelompok orang untuk memberikan tanggapan atau sanggahan terhadap pemberitaan berupa fakta yang merugikan nama baiknya.
2. Pengajuan disampaikan secara tertulis ditujukan kepada Pemimpin Redaksi WARTA HUKUM dengan melampirkan identitas diri yang sah dan materi sanggahan.
3. Hak Jawab akan dipublikasikan pada kesempatan pertama dengan penempatan yang layak dan proporsional.`,
  kebijakanPrivasi: `KEBIJAKAN PRIVASI PENGUNJUNG

WARTA HUKUM menghargai kerahasiaan data pembaca:
1. Informasi yang dikumpulkan melalui formulir pengaduan, langganan newsletter, atau komentar dijaga keamanannya dan tidak diperjualbelikan kepada pihak ketiga.
2. Website menggunakan cookie teknis semata-mata untuk mengoptimalkan kinerja penjelajahan dan menyimpan preferensi tampilan pembaca (seperti ukuran huruf dan preferensi notifikasi).`,
  ketentuanPenggunaan: `KETENTUAN PENGGUNAAN KONTEN

1. Seluruh karya jurnalistik (teks, foto, grafik, dan video) yang dimuat di WARTA HUKUM dilindungi oleh Undang-Undang Hak Cipta.
2. Pengutipan berita untuk kepentingan akademis, kajian, dan pemberitaan lain diperkenankan dengan menyebutkan sumber rujukan jelas: "WARTA HUKUM" disertai tautan aktif (*hyperlink*) menuju artikel asli.
3. Penggandaan konten secara masif (*scraping* otomatis) tanpa izin tertulis dari manajemen pers dilarang keras.`,
  tentangKami: `TENTANG WARTA HUKUM

WARTA HUKUM lahir dari kesadaran akan pentingnya keterbukaan informasi publik dan edukasi hukum yang independen, kritis, dan berintegritas bagi seluruh lapisan masyarakat Indonesia.

Didukung oleh jurnalis hukum berpengalaman, akademisi, dan kontributor tenaga pendidik di berbagai daerah, WARTA HUKUM hadir sebagai jembatan antara dunia peradilan, penegakan hukum, dan aspirasi keadilan masyarakat.`,
  copyrightText: '© 2026 WARTA HUKUM. Hak Cipta Dilindungi Undang-Undang. Portal Berita Hukum & Kriminal Indonesia Terpercaya.',
  gradientIntensity: 'vibrant',
  enableAnimations: true,
  seoTitleDefault: 'WARTA HUKUM - Portal Berita Hukum & Kriminal Indonesia Terpercaya',
  seoMetaDefault: 'Portal berita hukum independen menyajikan liputan peradilan, kejaksaan, kepolisian, tipikor, politik, dan peristiwa terkini di Indonesia.'
};

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    timestamp: '2026-10-13T09:30:00Z',
    userId: 'user-admin-1',
    userName: 'Bambang Trihatmojo, S.H., M.H.',
    role: 'ADMIN',
    action: 'Menerbitkan Berita',
    targetType: 'article',
    targetTitle: 'Kejaksaan Agung Sita Aset Rp 1,2 Triliun Terkait Dugaan Tipikor Komoditas',
    details: 'Berita telah diterbitkan dan dipromosikan ke Breaking News.'
  },
  {
    id: 'act-2',
    timestamp: '2026-10-13T10:00:00Z',
    userId: 'user-guru-2',
    userName: 'Siti Rahmawati, S.H.',
    role: 'GURU',
    action: 'Mengajukan Berita',
    targetType: 'article',
    targetTitle: 'Analisis: Optimalisasi Anggaran Bantuan Hukum bagi Masyarakat Kurang Mampu di Tingkat Pemda',
    details: 'Artikel diajukan untuk peninjauan redaktur.'
  },
  {
    id: 'act-3',
    timestamp: '2026-10-13T14:10:00Z',
    userId: 'user-admin-1',
    userName: 'Bambang Trihatmojo, S.H., M.H.',
    role: 'ADMIN',
    action: 'Meminta Revisi Artikel',
    targetType: 'article',
    targetTitle: 'Keseimbangan Hak Anak dan Wewenang Guru dalam Penerapan Sanksi Edukatif',
    details: 'Catatan revisi: penambahan dasar hukum perlindungan anak.'
  }
];
