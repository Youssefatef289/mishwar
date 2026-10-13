"use client";
import React from 'react';
import Link from 'next/link';
import { BadgeCheck, Banknote, ShieldAlert } from 'lucide-react';

export default function SellYourCarBanner() {
  return (
    <section id="sell-car" className="py-8 md:py-12 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card: Background #E9EAFE, Radius 12px, NO blue background shapes */}
        <div className="bg-[#E9EAFE] rounded-[12px] min-h-[250px] md:h-[260px] border border-[#d5d8fa] relative overflow-hidden flex flex-col-reverse md:flex-row items-center justify-between p-6 sm:p-8 md:px-12 md:py-6 gap-6 shadow-xs">
          
          {/* Right Side: Text Inspired by Mishwar */}
          <div className="w-full md:w-1/2 text-right z-10 flex flex-col justify-center items-start">
            <span className="text-xs font-black text-[#2B3990] bg-white/80 px-3 py-1 rounded-full mb-2 inline-block">
              خدمة بيع السيارات المعتمدة
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-[32px] font-black text-slate-900 leading-tight mb-2">
              بيع سيارتك بأعلى سعر عادل مع مشوار
            </h2>
            <p className="text-xs sm:text-sm font-bold text-[#2B3990] mb-5 leading-relaxed">
              تقييم فوري دقيق، فحص في مكانك، وبدون وسطاء أو فصال مع إنهاء فوري لإجراءات نقل الملكية.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700 mb-5">
              <span className="flex items-center gap-1">
                <Banknote className="w-3.5 h-3.5 text-[#0B9A5B]" />
                تحويل نقدي فوري
              </span>
              <span className="flex items-center gap-1">
                <BadgeCheck className="w-3.5 h-3.5 text-[#0B9A5B]" />
                فحص فني مجاني
              </span>
            </div>

            <Link
              href="/register"
              className="w-full sm:w-[220px] h-[48px] bg-[#0A2A5E] hover:bg-[#071f45] text-white font-bold text-sm sm:text-base rounded-[6px] flex items-center justify-center transition-colors shadow-xs active:scale-[0.98]"
            >
              اعرض سيارتك للبيع
            </Link>
          </div>

          {/* Left Side: User uploaded Fiat Tipo car image without shadow */}
          <div className="w-full md:w-1/2 relative flex items-center justify-center min-h-[160px] sm:min-h-[200px]">
            <div className="relative z-10 w-full max-w-[420px] flex justify-center">
              <img
                src="/images/sell-car-fiat.webp"
                alt="بيع سيارتك مع مشوار"
                className="w-full h-auto max-h-[220px] object-contain select-none"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
