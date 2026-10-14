"use client";
import React from 'react';
import { SITE_CONFIG } from '@/config/siteConfig';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FeaturesSection() {
  return (
    <section id="services" className="py-14 md:py-24 bg-[#F8FAFC] border-b border-[#E3E5EA]" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#E6FBF2] border border-[#00C97B]/30 px-3.5 py-1 rounded-full text-xs font-bold text-[#0B9A5B] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>معايير الثقة والضمان</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            لماذا تختار منصة مشوار لتنقلاتك وتجارة سيارتك؟
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 font-semibold mt-2 leading-relaxed">
            صممنا تجربة تأجير وشراء المركبات لتضمن لك أقصى درجات الشفافية والأمان بدون مفاجآت أو إجراءات ورقية معقدة.
          </p>
        </div>

        {/* 6 Feature Cards Grid using why (1).svg to why (6).svg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_CONFIG.features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E3E5EA] shadow-2xs hover:shadow-md hover:border-[#0B9A5B]/40 transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
            >
              <div>
                {/* Feature Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-[#E6FBF2] p-2 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Feature Title & Description */}
                <h3 className="text-lg font-black text-slate-900 group-hover:text-[#0B9A5B] transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Subtle Action Accent */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0B9A5B]">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">اعرف تفاصيل الضمان</span>
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

