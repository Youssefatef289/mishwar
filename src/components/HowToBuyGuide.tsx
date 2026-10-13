"use client";
import React from 'react';
import Link from 'next/link';
import { CalendarCheck, ShieldCheck, CreditCard } from 'lucide-react';

export default function HowToBuyGuide() {
  const steps = [
    {
      title: 'اختر السيارة المناسبة من أسطول مشوار المعتمد',
      desc: 'تصفح آلاف السيارات المفحوصة بدقة مع تقرير فني شامل لأكثر من 150 نقطة يوضح كافة تفاصيل المحرك والهيكل.',
    },
    {
      title: 'حدد خطة الدفع أو باقة الحجز المناسبة لك',
      desc: 'ادفع كاش أو بالتقسيط الميسر عبر شركائنا المعتمدين، أو اختر باقة إيجار مرنة بأسعار شفافة وبدون مصاريف خفية.',
    },
    {
      title: 'استلم سيارتك فوراً بعقد رقمي موثق',
      desc: 'استلم سيارتك من أقرب فرع أو اطلب توصيلها مباشرة لباب بيتك مع توثيق فوري للعقد وضمان شامل ودعم 24/7.',
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-white border-t border-[#E3E5EA]" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Centered */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B9A5B] mb-2 tracking-tight">
            كيف تستأجر أو تشتري سيارتك من مشوار؟
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] font-semibold">
            خطوات بسيطة وسريعة لتجربة تنقل وشراء مضمونة 100%
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Steps Timeline (Right Column in Desktop RTL, Below in Mobile) */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-center">
            <div className="relative pr-2 space-y-8">
              {steps.map((step, idx) => {
                const isLast = idx === steps.length - 1;

                return (
                  <div key={idx} className="relative flex items-start gap-4 sm:gap-5">
                    
                    {/* Circle & Vertical Line */}
                    <div className="relative flex flex-col items-center shrink-0">
                      {/* Step Circle: 32px with green dot */}
                      <div className="w-8 h-8 rounded-full bg-[#E6FBF2] border-2 border-[#00C97B] flex items-center justify-center z-10 shadow-xs">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#0B9A5B]" />
                      </div>

                      {/* Connecting vertical line */}
                      {!isLast && (
                        <div 
                          className="w-0.5 bg-slate-200 absolute top-8 bottom-[-32px] right-[15px]" 
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    {/* Step Text */}
                    <div className="pt-0.5">
                      <h3 className="text-base sm:text-lg font-black text-[#0A2A5E] mb-1">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6B7280] font-normal leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* "ابدأ مشوارك الآن" CTA Button */}
            <div className="mt-10 mr-1 sm:mr-3">
              <Link
                href="/used-cars"
                className="w-full sm:w-[220px] h-[48px] bg-[#0B9A5B] hover:bg-[#09814c] text-white font-bold text-base rounded-[6px] flex items-center justify-center transition-colors shadow-xs active:scale-[0.98]"
              >
                تصفح السيارات الآن
              </Link>
            </div>
          </div>

          {/* Left Column: Clean Showcase (NO background box on image) */}
          <div className="order-1 lg:order-2 lg:col-span-5 w-full flex flex-col items-center justify-center">
            
            {/* Feature Pills at Top */}
            <div className="flex items-center justify-around w-full max-w-[380px] mb-6 px-2">
              <div className="flex flex-col items-center gap-1">
                <div className="w-11 h-11 rounded-2xl bg-[#E6FBF2] flex items-center justify-center text-[#0B9A5B]">
                  <CalendarCheck className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-[11px] font-bold text-slate-800">حجز فوري</span>
                <span className="text-[9px] text-slate-400 font-sans">Book</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="w-11 h-11 rounded-2xl bg-[#E6FBF2] flex items-center justify-center text-[#0B9A5B]">
                  <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-[11px] font-bold text-slate-800">فحص معتمد</span>
                <span className="text-[9px] text-slate-400 font-sans">Test</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="w-11 h-11 rounded-2xl bg-[#E6FBF2] flex items-center justify-center text-[#0B9A5B]">
                  <CreditCard className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-[11px] font-bold text-slate-800">تمويل وتقسيط</span>
                <span className="text-[9px] text-slate-400 font-sans">Finance</span>
              </div>
            </div>

            {/* Clean Car Silhouette Image (NO colored box background) */}
            <div className="relative w-full max-w-[460px] flex items-center justify-center">
              <img
                src="/images/how-it-works-corolla.webp"
                alt="سيارة مشوار المعتمدة"
                className="w-full h-auto object-contain drop-shadow-lg select-none hover:scale-[1.02] transition-transform duration-300"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
