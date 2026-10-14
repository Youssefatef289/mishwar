"use client";
import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/config/siteConfig';

export default function VideoTourSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section id="video-tour" className="py-14 md:py-24 bg-[#0A1628] text-white relative overflow-hidden" dir="rtl">
      
      {/* Decorative ambient background blur */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00C97B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#2B3990]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-[#00C97B] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>جولة حية بالفيديو</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            شاهد كيف نضمن جودة كل سيارة في مشوار
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-medium mt-2 leading-relaxed">
            تعرف على رحلة فحص واعتماد السيارات بأحدث أجهزة التشخيص والمسح الرقمي لضمان راحة بالك الكاملة.
          </p>
        </div>

        {/* Video Player Card */}
        <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/15 bg-black/80 shadow-2xl group">
          <video
            ref={videoRef}
            src="/videos/about-us.mp4"
            poster="/images/carDesktopView.webp"
            className="w-full h-auto max-h-[500px] object-cover cursor-pointer"
            onClick={togglePlay}
            onEnded={() => setIsPlaying(false)}
            playsInline
          />

          {/* Central Big Play Button when paused */}
          {!isPlaying && (
            <div 
              onClick={togglePlay}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-opacity"
            >
              <button
                type="button"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0B9A5B] hover:bg-[#00C97B] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer"
                aria-label="تشغيل الفيديو"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white translate-x-[-2px]" />
              </button>
            </div>
          )}

          {/* Bottom Video Controls Overlay */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between text-white text-xs font-bold opacity-90 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                title={isPlaying ? 'إيقاف' : 'تشغيل'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                title={isMuted ? 'كتم الصوت' : 'تشغيل الصوت'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="hidden sm:inline text-slate-300">مقطع تعريفي: جودة وفحص أسطول مشوار</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                title="ملء الشاشة"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Video Key Highlights Underneath */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8 text-center text-xs sm:text-sm font-bold text-slate-300">
          <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00C97B]" />
            <span>فحص ميكانيكي وكهربائي معتمد</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00C97B]" />
            <span>تعقيم وتجهيز قبل التسليم</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00C97B]" />
            <span>عقد إلكتروني موحد فوري</span>
          </div>
        </div>

      </div>
    </section>
  );
}

