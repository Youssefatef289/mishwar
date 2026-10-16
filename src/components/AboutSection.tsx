"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Play, Pause } from 'lucide-react';

export default function AboutSection() {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoToggle = () => {
    setShowVideo(!showVideo);
  };

  return (
    <section id="about" className="py-12 md:py-20 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container (مطابق للصورة المرفقة طبق الأصل) */}
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* 1. LEFT COLUMN: Showroom Photo / Video Tour (الصورة الأصلية مع إمكانية تشغيل الفيديو) */}
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-950 group">
              {!showVideo ? (
                <div className="relative w-full h-full">
                  <img
                    src="/images/about-showroom.webp"
                    alt="صالة عرض رنتكس لتأجير السيارات"
                    className="w-full h-full object-cover select-none"
                  />
                  {/* Subtle Video Play Button on Hover */}
                  <button
                    type="button"
                    onClick={handleVideoToggle}
                    className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                    aria-label="تشغيل الفيديو التعريفي"
                  >
                    <div className="w-14 h-14 rounded-full bg-white/95 text-[#7A0C16] flex items-center justify-center hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </button>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full h-full object-cover"
                  >
                    <source src="/videos/about-us.mp4" type="video/mp4" />
                  </video>
                  <button
                    type="button"
                    onClick={handleVideoToggle}
                    className="absolute top-3 left-3 bg-black/70 text-white text-[11px] font-bold px-3 py-1 rounded-full cursor-pointer hover:bg-black"
                  >
                    عرض الصورة
                  </button>
                </div>
              )}
            </div>

            {/* 2. RIGHT COLUMN: Content (مطابق للخطوط والألوان والأيقونات طبق الأصل) */}
            <div className="lg:col-span-6 text-right flex flex-col justify-between">
              
              {/* Category Subtitle */}
              <div className="text-xs sm:text-sm font-bold text-slate-400 mb-2">
                نبذة عنا
              </div>

              {/* Main Headline with Accent Line */}
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl sm:text-3xl md:text-[34px] font-black text-[#7A0C16] leading-tight">
                  الخيار الأمثل لتأجير السيارات في مصر
                </h2>
                <span className="hidden sm:inline-block w-12 h-[2px] bg-[#7A0C16] shrink-0" />
              </div>

              {/* Main Paragraph */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-medium text-justify">
                تأسست رنتكس عام 2015، ومنذ ذلك الوقت نعمل على تقديم خدمات تأجير سيارات في مصر تلبي احتياجات الأفراد والشركات، مع الاهتمام بجودة السيارات وسهولة الإجراءات وراحة العملاء. وبفضل خبرتنا في مجال تأجير السيارات، نوفر خيارات متنوعة تناسب الإيجار اليومي والقصير والطويل الأجل، مع خدمة تساعدك على اختيار السيارة المناسبة لاحتياجاتك.
              </p>

              {/* 3 Feature Rows with Exact Circular Icons */}
              <div className="space-y-4">
                
                {/* 1. توصيل السيارة للمنزل */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 mt-0.5">
                    <img 
                      src="/images/about-icon-delivery.webp" 
                      alt="توصيل السيارة للمنزل" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      توصيل السيارة للمنزل
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                      لجعل تجربة إيجار سيارات أكثر سهولة وراحة، نوفر خدمة توصيل السيارة إلى موقع العميل، بدلاً من تحمل عناء الذهاب إلى الفرع لاستلامها.
                    </p>
                  </div>
                </div>

                {/* 2. عروض خاصة للعقود طويلة الأجل */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 mt-0.5">
                    <img 
                      src="/images/about-icon-contracts.webp" 
                      alt="عروض خاصة للعقود طويلة الأجل" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      عروض خاصة للعقود طويلة الأجل
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                      استفد من عروض رنتكس الخاصة بالشركات، مع أسعار مميزة للعقود قصيرة وطويلة الأجل، وخدمة احترافية من فريق العمل وسائقين محترفين.
                    </p>
                  </div>
                </div>

                {/* 3. سيارات حديثة وآمنة */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 mt-0.5">
                    <img 
                      src="/images/about-icon-safety.webp" 
                      alt="سيارات حديثة وآمنة" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      سيارات حديثة وآمنة
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                      نوفر لك أحدث السيارات والموديلات بتشكيلة متنوعة تناسب احتياجاتك المختلفة، مع الحرص على أن تكون السيارات بحالة جيدة وجاهزة لتمنحك تجربة قيادة مريحة وآمنة.
                    </p>
                  </div>
                </div>

              </div>

              {/* Horizontal Divider Line */}
              <div className="w-full h-px bg-[#E5E7EB] my-6" />

              {/* Bottom Row: +10 Years Experience + "اعرف أكثر »" Button */}
              <div className="flex items-center justify-between">
                
                {/* Right: Exact Avatar Photos + "+10 سنوات خبرة" */}
                <div className="flex items-center gap-2.5">
                  <img
                    src="/images/about-avatars.webp"
                    alt="فريق رنتكس"
                    className="h-8 w-auto object-contain select-none"
                  />
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                    +10 سنوات خبرة
                  </span>
                </div>

                {/* Left: Button "اعرف أكثر »" */}
                <Link
                  href="/fleet"
                  className="px-6 py-2.5 bg-[#7A0C16] hover:bg-[#5E0911] text-white text-xs sm:text-sm font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>اعرف أكثر</span>
                  <span>»</span>
                </Link>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
