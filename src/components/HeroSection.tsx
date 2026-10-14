"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, ShieldCheck, FileCheck, Truck, Play, Video, Image as ImageIcon,
  ArrowLeft, CheckCircle2 
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/siteConfig';

export default function HeroSection() {
  const [mediaMode, setMediaMode] = useState<'image' | 'video'>('image');

  return (
    <section id="hero" className="relative bg-white text-slate-900 pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-[#E3E5EA]" dir="rtl">
      
      {/* Background Ambient Video (when in video mode) */}
      {mediaMode === 'video' && (
        <div className="absolute inset-0 z-0 overflow-hidden opacity-25">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/hero-cars.webp"
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-14">
          
          {/* Right Column: Hero Headline, Subtitle, CTAs */}
          <div className="w-full md:w-1/2 text-right flex flex-col justify-center items-start">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 bg-[#E6FBF2] border border-[#00C97B]/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0B9A5B] mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0B9A5B]" />
              <span>{SITE_CONFIG.tagline}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#111827] leading-tight tracking-tight mb-4">
              مشوارك مضمون! <br />
              <span className="text-[#0B9A5B]">سيارتك القادمة بفحص وأمان 100%</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base font-semibold text-slate-600 leading-relaxed mb-6 sm:mb-8 max-w-xl">
              اشتري، استأجر أو بيع سيارتك بسهولة وأمان في مصر مع تقارير فحص فني شاملة لأكثر من 150 نقطة وعقود رقمية موثقة ETA تحمي كافة حقوقك.
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-6">
              <Link
                href="/used-cars"
                className="w-full sm:w-[220px] h-[48px] bg-[#0B9A5B] hover:bg-[#09814c] text-white font-bold text-base rounded-[6px] flex items-center justify-center transition-all shadow-xs active:scale-[0.98]"
              >
                تصفح السيارات المعتمدة
              </Link>
              <Link
                href="#sell-car"
                className="w-full sm:w-[220px] h-[48px] bg-[#0A2A5E] hover:bg-[#071f45] text-white font-bold text-base rounded-[6px] flex items-center justify-center transition-all shadow-xs active:scale-[0.98]"
              >
                بيع سيارتك الآن
              </Link>
            </div>

            {/* Quick Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500 pt-1">
              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-[#0B9A5B]" />
                فحص معتمد 150+ نقطة
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-full">
                <FileCheck className="w-4 h-4 text-[#0B9A5B]" />
                عقود موثقة ETA
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-full">
                <Truck className="w-4 h-4 text-[#0B9A5B]" />
                تسليم وتوصيل لباب بيتك
              </span>
            </div>

          </div>

          {/* Left Column: Focal Image / Video with Toggle */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
            
            {/* View Mode Switcher Pill */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full text-xs font-bold text-slate-600 mb-4 self-center md:self-end">
              <button
                type="button"
                onClick={() => setMediaMode('image')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                  mediaMode === 'image' ? 'bg-white text-[#0B9A5B] shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>عرض الأسطول</span>
              </button>
              <button
                type="button"
                onClick={() => setMediaMode('video')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                  mediaMode === 'video' ? 'bg-[#0A2A5E] text-white shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>فيديو القيادة</span>
              </button>
            </div>

            {/* Media Presentation Box (Without Drop-shadow as requested) */}
            <div className="relative w-full max-w-[560px] flex items-center justify-center min-h-[250px] sm:min-h-[320px]">
              {mediaMode === 'image' ? (
                <img
                  src="/images/hero-cars.webp"
                  alt="أسطول سيارات مشوار المعتمد"
                  className="w-full h-auto max-h-[320px] object-contain select-none"
                  loading="eager"
                />
              ) : (
                <div className="w-full rounded-2xl overflow-hidden border border-slate-200 bg-black aspect-video relative flex items-center justify-center">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/images/hero-cars.webp"
                    className="w-full h-full object-cover"
                  >
                    <source src="/videos/hero.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>فيديو أسطول مشوار في مصر</span>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

