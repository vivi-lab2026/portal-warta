import React, { useState } from 'react';
import { Mail, CheckCircle2, Shield, Bell } from 'lucide-react';

export const NewsletterCard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Masukkan alamat email yang valid.');
      return;
    }

    if (!agreed) {
      setError('Harap setujui kebijakan privasi dan ketentuan pengiriman buletin.');
      return;
    }

    try {
      const stored = localStorage.getItem('wartahukum_newsletter_subscribers');
      const list = stored ? JSON.parse(stored) : [];
      list.push({ email: email.trim(), subscribedAt: new Date().toISOString() });
      localStorage.setItem('wartahukum_newsletter_subscribers', JSON.stringify(list));
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="rainbow-border-card p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl shadow-xl border border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/10 text-amber-300 text-xs font-semibold backdrop-blur-xs">
              <Bell className="w-3.5 h-3.5" />
              <span>Buletin Mingguan WARTA HUKUM</span>
            </div>
            <h3 className="font-headline font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Dapatkan Ringkasan Fakta Hukum &amp; Putusan Penting Setiap Pagi
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              Kami menyaring perkara hukum krusial, putusan Mahkamah Agung, regulasi baru, dan isu peradilan langsung ke kotak masuk email Anda tanpa spam.
            </p>
          </div>

          <div className="lg:col-span-5 bg-white/5 backdrop-blur-md p-5 rounded-xl border border-white/10">
            {submitted ? (
              <div className="text-center py-4 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-base text-white">Terima Kasih Telah Berlangganan!</h4>
                <p className="text-xs text-slate-300">
                  Email Anda telah terdaftar. Anda dapat berhenti berlangganan kapan saja melalui tautan di setiap buletin.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label htmlFor="newsletter-email" className="block text-slate-200 font-semibold mb-1">
                    Alamat Email Aktif:
                  </label>
                  <div className="relative">
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      required
                      className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs"
                    />
                    <Mail className="absolute right-3.5 top-2.5 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    id="agree-checkbox"
                    type="checkbox"
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 text-indigo-600 focus:ring-0"
                  />
                  <label htmlFor="agree-checkbox" className="text-[11px] text-slate-300 leading-snug cursor-pointer">
                    Saya menyetujui pengiriman ringkasan berita berkala sesuai kebijakan privasi media.
                  </label>
                </div>

                {error && (
                  <p className="text-[11px] text-red-400 font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl font-bold bg-gradient-to-r from-red-600 via-amber-500 to-indigo-600 hover:opacity-95 text-white text-xs shadow-md transition-all"
                >
                  Daftar Buletin Sekarang
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
