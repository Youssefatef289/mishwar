"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AboutSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // التشغيل التلقائي عند التمرير وإيقاف الفيديو عند الخروج من نطاق الرؤية (Autoplay on Scroll via IntersectionObserver)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // تشغيل الفيديو عند ظهور 40% أو أكثر منه في الشاشة
            video.play().catch(() => {
              // تجاوز قيود المتصفح إن وُجدت
            });
          } else {
            // إيقاف الفيديو مؤقتاً عند الخروج من نطاق الرؤية للحفاظ على الأداء
            video.pause();
          }
        });
      },
      {
        threshold: 0.4, // عندما يظهر 40% من الفيديو في الشاشة
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="about" className="py-12 md:py-20 bg-white" dir="rtl">
      {/* 1. الحاوية الخارجية (Container): max-w-7xl مع إطار خارجي رمادي فاتح وحشوة داخلية */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f8f9fa] border border-gray-200/80 rounded-2xl md:rounded-3xl p-4 md:p-6">
          
          {/* البطاقة الرئيسية (Main Card) البيضاء الممتدة بارتفاع متناسق */}
          <div className="bg-white rounded-xl md:rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden min-h-[650px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[650px]">
              
              {/* 2. قسم الفيديو (الجانب الأيسر في RTL - يأخذ 6 أعمدة lg:col-span-6) */}
              <div className="lg:col-span-6 relative w-full h-full min-h-[450px] lg:min-h-[650px] bg-slate-900 overflow-hidden order-2 lg:order-1">
                {/* 
                  ==============================================================
                  رابط الفيديو الخاص بك: 
                  يمكنك تعديل المسار التالي في وسم <source src="..." /> 
                  لوضع أي رابط فيديو محلي أو سحابي خاص بك.
                  المسار الافتراضي المستخدم: /videos/about-us.mp4
                  ==============================================================
                */}
                <video
                  ref={videoRef}
                  muted
                  loop
                  playsInline
                  controls={false}
                  poster="/images/about-showroom.webp"
                  className="w-full h-full min-h-[450px] lg:min-h-[650px] object-cover rounded-md lg:rounded-none"
                >
                  <source src="/videos/about-us.mp4" type="video/mp4" />
                  متصفحك لا يدعم تشغيل الفيديو.
                </video>
              </div>

              {/* 3. قسم المحتوى النصي (الجانب الأيمن في RTL - يأخذ 6 أعمدة lg:col-span-6) */}
              <div className="lg:col-span-6 p-6 sm:p-8 md:p-12 flex flex-col justify-between text-right order-1 lg:order-2">
                
                {/* الجزء العلوي: الرأس والفقرة الوصفية */}
                <div>
                  {/* نص فرعي صغير */}
                  <span className="block text-gray-600 text-sm font-medium mb-2">
                    نبذة عنا
                  </span>

                  {/* عنوان رئيسي كبير باللون العنابي الداكن */}
                  <h2 className="text-[#6b0f12] text-3xl md:text-4xl font-bold mb-4 leading-tight">
                    الخيار الأمثل لتأجير السيارات في مصر
                  </h2>

                  {/* خط فاصل مقسم لجزئين: خط رمادي فاتح ممتد مع جزء عنابي داكن */}
                  <div className="relative w-full h-[2px] bg-gray-200 mb-6">
                    <div className="absolute right-0 top-0 h-[2px] w-20 bg-[#6b0f12]" />
                  </div>

                  {/* الفقرة الوصفية */}
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base my-6 text-justify">
                    تأسست رنتكس / مشوار عام 2015، ومنذ ذلك الوقت نعمل على تقديم خدمات تأجير سيارات في مصر تلبي احتياجات الأفراد والشركات، مع الاهتمام بجودة السيارات وسهولة الإجراءات وراحة العملاء. وبفضل خبرتنا في مجال تأجير السيارات، نوفر خيارات متنوعة تناسب الإيجار اليومي والقصير والطويل الأجل، مع خدمة تساعدك على اختيار السيارة المناسبة لاحتياجاتك.
                  </p>

                  {/* قائمة المميزات (3 عناصر رأسية) */}
                  <div className="space-y-6 mt-6">
                    
                    {/* العنصر 1: توصيل السيارة للمنزل */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#6b0f12] text-white flex items-center justify-center shrink-0 shadow-xs">
                        {/* أيقونة خطية بيضاء: توصيل السيارة والمفتاح */}
                        <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h2" />
                          <circle cx="7" cy="17" r="2" />
                          <path d="M9 17h6" />
                          <circle cx="17" cy="17" r="2" />
                          <path d="M7 11h4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-gray-900 font-bold text-base md:text-lg mb-1">
                          توصيل السيارة للمنزل
                        </h3>
                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                          لجعل تجربة إيجار سيارات أكثر سهولة وراحة، نوفر خدمة توصيل السيارة إلى موقع العميل، بدلاً من تحمل عناء الذهاب إلى الفرع لاستلامها.
                        </p>
                      </div>
                    </div>

                    {/* العنصر 2: عروض خاصة للعقود طويلة الأجل */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#6b0f12] text-white flex items-center justify-center shrink-0 shadow-xs">
                        {/* أيقونة خطية بيضاء: عقود واتفاقيات رسمية موثقة */}
                        <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-gray-900 font-bold text-base md:text-lg mb-1">
                          عروض خاصة للعقود طويلة الأجل
                        </h3>
                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                          استفد من عروض رنتكس / مشوار الخاصة بالشركات، مع أسعار مميزة للعقود قصيرة وطويلة الأجل وخدمة احترافية من فريق العمل وسائقين محترفين.
                        </p>
                      </div>
                    </div>

                    {/* العنصر 3: سيارات حديثة وآمنة */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#6b0f12] text-white flex items-center justify-center shrink-0 shadow-xs">
                        {/* أيقونة خطية بيضاء: أمان وسلامة معتمدة */}
                        <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-gray-900 font-bold text-base md:text-lg mb-1">
                          سيارات حديثة وآمنة
                        </h3>
                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                          نوفر لك أحدث السيارات والموديلات بتشكيلة متنوعة تناسب احتياجاتك المختلفة، مع الحرص على أن تكون السيارات بحالة جيدة وجاهزة لتمنحك تجربة قيادة مريحة وآمنة.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* الجزء السفلي (Footer of Content): خط فاصل مع الزر وسنوات الخبرة */}
                <div className="border-t border-gray-200 pt-6 mt-8 flex items-center justify-between flex-wrap gap-4">
                  
                  {/* اليمين: الصورتان الدائريتان المتداخلتان مع نص +10 سنوات خبرة */}
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3 space-x-reverse overflow-hidden">
                      <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-2xs"
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                        alt="فريق العمل"
                      />
                      <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-2xs"
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                        alt="فريق العمل"
                      />
                    </div>
                    <span className="font-bold text-gray-800 text-sm md:text-base">
                      +10 سنوات خبرة
                    </span>
                  </div>

                  {/* اليسار: زر "اعرف أكثر »" مستطيل بحواف ناعمة */}
                  <Link
                    href="/fleet"
                    className="bg-[#6b0f12] hover:bg-[#520b0d] text-white px-7 py-3 rounded-md font-semibold text-sm transition-all duration-200 shadow-xs hover:shadow-sm inline-flex items-center gap-1.5 cursor-pointer active:scale-98"
                  >
                    <span>اعرف أكثر</span>
                    <span className="text-base font-bold">»</span>
                  </Link>

                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
