"use client";
import React, { useState } from 'react';
import { SITE_CONFIG } from '@/config/siteConfig';
import { Eye, Play, X, ChevronRight, ChevronLeft, Sparkles, Maximize2 } from 'lucide-react';

export default function MediaGallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'كافة المعروضات' },
    { id: 'سيدان وعائلية', name: 'سيدان وعائلية' },
    { id: 'فارهة', name: 'سيارات فارهة VIP' },
    { id: 'دفع رباعي', name: 'دفع رباعي SUV' },
    { id: 'فيديو حصري', name: 'جولات الفيديو' },
  ];

  const filteredItems = activeCategory === 'all'
    ? SITE_CONFIG.mediaGallery
    : SITE_CONFIG.mediaGallery.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-14 md:py-24 bg-white border-b border-[#E3E5EA]" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#E6FBF2] border border-[#00C97B]/30 px-3.5 py-1 rounded-full text-xs font-bold text-[#0B9A5B] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>معرض وسائط الأسطول</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            استكشف أسطول سيارات مشوار بدقة عالية
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 font-semibold mt-2 leading-relaxed">
            تصفح صور وفيديوهات السيارات المفحوصة والمتاحة للتسليم الفوري مع إمكانية المعاينة المكبرة.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#0B9A5B] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative bg-[#F9FAFB] rounded-2xl overflow-hidden border border-[#E3E5EA] shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-[280px]"
            >
              {/* Media Image / Thumbnail */}
              <div className="relative w-full h-[210px] overflow-hidden flex items-center justify-center bg-slate-100 p-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Video Play Badge or Zoom Badge */}
                {item.type === 'video' ? (
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center group-hover:bg-black/20 transition-all">
                    <div className="w-12 h-12 rounded-full bg-[#0B9A5B] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white translate-x-[-1px]" />
                    </div>
                  </div>
                ) : (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs p-2 rounded-xl text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                )}

                {/* Category Tag */}
                <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {item.category}
                </div>
              </div>

              {/* Caption Footer */}
              <div className="p-3.5 bg-white border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#0B9A5B] transition-colors truncate">
                  {item.title}
                </span>
                <span className="text-[11px] font-bold text-[#0B9A5B] flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>معاينة</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-white/20 shadow-2xl p-4 sm:p-6 text-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 text-white">
              <div>
                <h3 className="text-base sm:text-lg font-black">{filteredItems[lightboxIndex].title}</h3>
                <span className="text-xs text-[#00C97B] font-bold">{filteredItems[lightboxIndex].category}</span>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                title="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Content */}
            <div className="relative my-4 flex items-center justify-center max-h-[60vh] overflow-hidden rounded-2xl bg-black">
              {filteredItems[lightboxIndex].type === 'video' && filteredItems[lightboxIndex].video ? (
                <video
                  controls
                  autoPlay
                  src={filteredItems[lightboxIndex].video}
                  poster={filteredItems[lightboxIndex].image}
                  className="w-full max-h-[55vh] object-contain rounded-2xl"
                />
              ) : (
                <img
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  className="w-full max-h-[55vh] object-contain rounded-2xl"
                />
              )}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-between pt-2 text-white">
              <button
                type="button"
                onClick={prevLightbox}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
                <span>السابق</span>
              </button>
              <span className="text-xs text-slate-400">
                {lightboxIndex + 1} من {filteredItems.length}
              </span>
              <button
                type="button"
                onClick={nextLightbox}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors cursor-pointer"
              >
                <span>التالي</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

