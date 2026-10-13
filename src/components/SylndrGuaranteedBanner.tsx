"use client";
import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileCheck, Truck, Sparkles } from 'lucide-react';

export default function SylndrGuaranteedBanner() {
  return (
    <section className="bg-white py-12 md:py-20 overflow-hidden border-b border-[#E3E5EA]" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-14">
          
          {/* Right Column: Inspired text by Mishwar project */}
          <div className="w-full md:w-1/2 text-right flex flex-col justify-center items-start">
            
            {/* Project Trust Pill */}
            <div className="inline-flex items-center gap-2 bg-[#E6FBF2] border border-[#00C97B]/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0B9A5B] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#0B9A5B]" />
              <span>المنصة المصرية المعتمدة لتنقل وتجارة المركبات</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#111827] leading-tight tracking-tight mb-3">
              مشوار مضمون! <br />
              <span className="text-[#0B9A5B]">سيارتك القادمة بفحص وأمان 100%</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base font-semibold text-slate-600 leading-relaxed mb-6 sm:mb-8 max-w-xl">
              اشتري، استأجر أو بيع سيارتك بسهولة وأمان في مصر مع تقارير فحص فني شاملة لأكثر من 150 نقطة وعقود رقمية موثقة تحمي جميع الأطراف.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-6">
              <Link
                href="/used-cars"
                className="w-full sm:w-[220px] h-[48px] bg-[#0B9A5B] hover:bg-[#09814c] text-white font-bold text-base rounded-[6px] flex items-center justify-center transition-colors shadow-xs active:scale-[0.98]"
              >
                تصفح السيارات
              </Link>
              <Link
                href="#sell-car"
                className="w-full sm:w-[220px] h-[48px] bg-[#0A2A5E] hover:bg-[#071f45] text-white font-bold text-base rounded-[6px] flex items-center justify-center transition-colors shadow-xs active:scale-[0.98]"
              >
                بيع سيارتك الآن
              </Link>
            </div>

            {/* Quick Guarantees */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0B9A5B]" />
                فحص معتمد 150+ نقطة
              </span>
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#0B9A5B]" />
                عقود موثقة ETA
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#0B9A5B]" />
                تسليم وتوصيل لباب بيتك
              </span>
            </div>

          </div>

          {/* Left Column: User uploaded Hero cars image without shadow */}
          <div className="w-full md:w-1/2 relative flex items-center justify-center min-h-[240px] sm:min-h-[300px]">
            <div className="relative z-10 w-full max-w-[560px] flex justify-center">
              <img
                src="/images/hero-cars.webp"
                alt="أسطول سيارات مشوار المعتمد"
                className="w-full h-auto max-h-[320px] object-contain select-none"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
