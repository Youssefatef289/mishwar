"use client";
import React from 'react';
import { SITE_CONFIG } from '@/config/siteConfig';
import { Star, ShieldCheck, Quote, Sparkles } from 'lucide-react';

export default function TestimonialsStatsSection() {
  return (
    <section id="testimonials" className="py-14 md:py-24 bg-[#F8FAFC] border-b border-[#E3E5EA]" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Statistics Bar */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E3E5EA] shadow-xs mb-16 sm:mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-slate-100">
            {SITE_CONFIG.stats.map((stat, idx) => (
              <div key={idx} className={`${idx > 0 ? 'pt-4 sm:pt-0' : ''} flex flex-col items-center justify-center`}>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B9A5B] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-sm sm:text-base font-extrabold text-slate-800 mt-2">
                  {stat.label}
                </span>
                <span className="text-xs text-slate-400 font-semibold mt-0.5">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#E6FBF2] border border-[#00C97B]/30 px-3.5 py-1 rounded-full text-xs font-bold text-[#0B9A5B] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>آراء العملاء والشركاء</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            ماذا يقول عملاؤنا عن تجربة مشوار؟
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 font-semibold mt-2 leading-relaxed">
            شهادات حقيقية من مستأجرين، مشترين، وملاك معارض وثقوا في منظومة مشوار المعتمدة.
          </p>
        </div>

        {/* Testimonials 3-Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SITE_CONFIG.testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E3E5EA] shadow-2xs hover:shadow-md hover:border-[#0B9A5B]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200" />
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-6">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900">{t.name}</h4>
                  <p className="text-[11px] text-slate-400 font-medium">{t.role}</p>
                </div>

                <span className="text-[10px] font-bold text-[#0B9A5B] bg-[#E6FBF2] px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>معتمد</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

