import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../common/Logo';
import { X, Lock, Mail, ShieldAlert, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@wartahukum.id');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(email);
    if (success) {
      onSuccess();
      onClose();
    } else {
      setError('Email atau akun tidak ditemukan atau sedang dinonaktifkan.');
    }
  };

  const handleQuickLoginAdmin = () => {
    setEmail('admin@wartahukum.id');
    setPassword('admin123');
    login('admin@wartahukum.id', 'ADMIN');
    onSuccess();
    onClose();
  };

  const handleQuickLoginGuru = () => {
    setEmail('guru@wartahukum.id');
    setPassword('guru123');
    login('guru@wartahukum.id', 'GURU');
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Rainbow Accent Top Line */}
        <div className="h-1.5 rainbow-gradient-bg w-full"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-7 space-y-5">
          <div className="text-center space-y-2">
            <Logo size="md" className="justify-center" withTagline={false} />
            <h3 className="font-headline font-bold text-xl text-slate-900">
              Sistem Autentikasi Redaksi
            </h3>
            <p className="text-xs text-slate-500">
              Masuk ke Panel Redaksi Berita &amp; Manajemen Konten
            </p>
          </div>

          {/* Quick Demo Role Selector Buttons */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Pilihan Akun Uji Coba Cepat:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={handleQuickLoginAdmin}
                className="py-2 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-all text-center flex flex-col items-center justify-center shadow-xs"
              >
                <span className="font-bold">ADMIN REDAKSI</span>
                <span className="text-[10px] text-amber-300 font-normal">Akses Penuh</span>
              </button>
              <button
                type="button"
                onClick={handleQuickLoginGuru}
                className="py-2 px-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all text-center flex flex-col items-center justify-center shadow-xs"
              >
                <span className="font-bold">GURU / KONTRIBUTOR</span>
                <span className="text-[10px] text-indigo-100 font-normal">Akses Terbatas</span>
              </button>
            </div>
          </div>

          {/* Regular Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label htmlFor="auth-email" className="block text-slate-700 font-semibold mb-1">
                Alamat Email Redaksi:
              </label>
              <div className="relative">
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="admin@wartahukum.id"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-indigo-600 text-xs"
                />
                <Mail className="absolute right-3.5 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label htmlFor="auth-pw" className="block text-slate-700 font-semibold mb-1">
                Kata Sandi:
              </label>
              <div className="relative">
                <input
                  id="auth-pw"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-indigo-600 text-xs"
                />
                <Lock className="absolute right-3.5 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {error && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl font-bold bg-gradient-to-r from-red-600 via-amber-600 to-indigo-600 hover:opacity-95 text-white text-xs shadow-md transition-all mt-2"
            >
              Masuk ke Dashboard
            </button>
          </form>

          <p className="text-[11px] text-slate-400 text-center">
            Peran &quot;Guru&quot; bertindak sebagai kontributor berita pendidikan dan daerah dengan alur peninjauan redaktur.
          </p>
        </div>
      </div>
    </div>
  );
};
