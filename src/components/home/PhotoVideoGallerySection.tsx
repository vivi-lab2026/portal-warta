import React, { useState } from 'react';
import { GalleryItem } from '../../types';
import { useNews } from '../../context/NewsContext';
import { handleImageError } from '../../utils/mediaFallback';
import { Camera, Video, Maximize2, X, User, Calendar, ExternalLink } from 'lucide-react';

export const PhotoVideoGallerySection: React.FC = () => {
  const { gallery } = useNews();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'photo' | 'video'>('all');

  const filteredItems = gallery.filter(item => {
    if (activeTab === 'photo') return item.type === 'photo';
    if (activeTab === 'video') return item.type === 'video';
    return true;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 mb-6 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-headline font-bold text-xl text-slate-900">
              Galeri Foto &amp; Video Jurnalistik
            </h3>
            <p className="text-xs text-slate-500">
              Dokumentasi visual peristiwa hukum, konferensi pers, dan suasana persidangan
            </p>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              activeTab === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua Media
          </button>
          <button
            onClick={() => setActiveTab('photo')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              activeTab === 'photo' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Foto Peristiwa
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              activeTab === 'video' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Video Liputan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredItems.map(item => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all"
          >
            <div className="relative aspect-16/10 bg-slate-900 overflow-hidden">
              <img
                src={item.thumbnail || item.mediaUrl}
                alt={item.title}
                onError={e => handleImageError(e, item.category)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>

              {/* Type Badge */}
              <div className="absolute top-2.5 left-2.5">
                {item.type === 'video' ? (
                  <span className="bg-red-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                    <Video className="w-3 h-3" />
                    <span>Video</span>
                  </span>
                ) : (
                  <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                    <Camera className="w-3 h-3" />
                    <span>Foto</span>
                  </span>
                )}
              </div>

              {/* Expand Icon on Hover */}
              <div className="absolute top-2.5 right-2.5 p-1 rounded-md bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Caption snippet */}
              <div className="absolute bottom-2.5 inset-x-2.5 text-white">
                <h4 className="text-xs font-semibold line-clamp-1 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[10px] text-slate-300 truncate mt-0.5">
                  Foto: {item.photographer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl text-white"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-white/20 text-white transition-colors"
              aria-label="Tutup Galeri"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media Display */}
            <div className="relative aspect-16/10 bg-black flex items-center justify-center">
              {selectedItem.type === 'video' ? (
                <iframe
                  src={selectedItem.mediaUrl}
                  title={selectedItem.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <img
                  src={selectedItem.mediaUrl}
                  alt={selectedItem.title}
                  onError={e => handleImageError(e, selectedItem.category)}
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>

            {/* Lightbox Information Bar */}
            <div className="p-5 space-y-2 bg-slate-900 border-t border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-amber-400 font-semibold">
                <span className="uppercase tracking-wider">{selectedItem.category}</span>
                <span className="text-slate-400 font-normal">{selectedItem.date}</span>
              </div>
              <h3 className="text-base sm:text-lg font-headline font-bold text-white">
                {selectedItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedItem.caption}
              </p>
              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
                <span>Fotografer / Dokumentasi: <strong className="text-slate-200">{selectedItem.photographer}</strong></span>
                {selectedItem.tags && selectedItem.tags.length > 0 && (
                  <span className="text-slate-500">
                    Tag: {selectedItem.tags.join(', ')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
