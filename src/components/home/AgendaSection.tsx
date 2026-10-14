import React from 'react';
import { useNews } from '../../context/NewsContext';
import { Calendar, Clock, MapPin, Building, ChevronRight, CheckCircle2 } from 'lucide-react';

export const AgendaSection: React.FC = () => {
  const { agendas } = useNews();

  // Show only public agendas
  const publicAgendas = agendas
    .filter(a => a.isPublic)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (publicAgendas.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-xl text-slate-900">
                Agenda Sidang &amp; Peristiwa Mendatang
              </h3>
              <p className="text-xs text-slate-500">
                Jadwal persidangan terbuka, konferensi pers kejaksaan/kepolisian, dan seminar hukum
              </p>
            </div>
          </div>
          <span className="text-xs text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            Terverifikasi Redaksi WARTA HUKUM
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publicAgendas.map(agenda => (
            <div
              key={agenda.id}
              className="bg-slate-50/70 hover:bg-white rounded-xl p-4 border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Date & Time pill */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-700" />
                    <span>{agenda.date}</span>
                  </span>
                  <span className="text-slate-500 font-medium flex items-center gap-1 tabular-nums">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{agenda.time}</span>
                  </span>
                </div>

                <h4 className="text-sm font-headline font-bold text-slate-900 leading-snug line-clamp-2">
                  {agenda.title}
                </h4>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {agenda.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 space-y-1.5 text-xs text-slate-500">
                <div className="flex items-start gap-1.5 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{agenda.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{agenda.organizer}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
