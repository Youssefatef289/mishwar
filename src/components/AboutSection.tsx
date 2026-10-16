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
            // تشغيل الفيديو تلقائياً عند ظهور 40% منه في الشاشة
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
        threshold: 0.4,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="about" className="py-12 md:py-20 bg-white" dir="rtl">
      {/* 1. الحاوية الخارجية (Container): max-w-7xl مع إطار خارجي رمادي وحشوة داخلية */}
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
                
                {/* الجزء العلوي: الرأس والفقرة الوصفية باللون الأسود الواضح */}
                <div>
                  {/* نص فرعي صغير وواضح باللون الأسود */}
                  <span className="block text-black text-sm font-bold mb-2">
                    نبذة عنا
                  </span>

                  {/* عنوان رئيسي كبير باللون العنابي الداكن الفخم */}
                  <h2 className="text-[#6b0f12] text-3xl md:text-4xl font-black mb-4 leading-tight">
                    الخيار الأمثل لتأجير السيارات في مصر
                  </h2>

                  {/* خط فاصل مقسم لجزئين: خط رمادي فاتح ممتد مع جزء عنابي داكن */}
                  <div className="relative w-full h-[2px] bg-gray-300 mb-6">
                    <div className="absolute right-0 top-0 h-[2px] w-20 bg-[#6b0f12]" />
                  </div>

                  {/* الفقرة الوصفية باللون الأسود الصريح والخط الواضح */}
                  <p className="text-black font-semibold leading-relaxed text-sm md:text-base my-6 text-justify">
                    تأسست رنتكس / مشوار عام 2015، ومنذ ذلك الوقت نعمل على تقديم خدمات تأجير سيارات في مصر تلبي احتياجات الأفراد والشركات، مع الاهتمام بجودة السيارات وسهولة الإجراءات وراحة العملاء. وبفضل خبرتنا في مجال تأجير السيارات، نوفر خيارات متنوعة تناسب الإيجار اليومي والقصير والطويل الأجل، مع خدمة تساعدك على اختيار السيارة المناسبة لاحتياجاتك.
                  </p>

                  {/* قائمة المميزات (3 عناصر مع الأيقونات الأصلية والنص الأسود البارز) */}
                  <div className="space-y-6 mt-6">
                    
                    {/* العنصر 1: توصيل السيارة للمنزل */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 mt-0.5 shadow-xs">
                        <img 
                          src="/images/about-icon-delivery.webp" 
                          alt="توصيل السيارة للمنزل" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-black font-black text-base md:text-lg mb-1">
                          توصيل السيارة للمنزل
                        </h3>
                        <p className="text-black font-medium text-xs md:text-sm leading-relaxed">
                          لجعل تجربة إيجار سيارات أكثر سهولة وراحة، نوفر خدمة توصيل السيارة إلى موقع العميل، بدلاً من تحمل عناء الذهاب إلى الفرع لاستلامها.
                        </p>
                      </div>
                    </div>

                    {/* العنصر 2: عروض خاصة للعقود طويلة الأجل */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 mt-0.5 shadow-xs">
                        <img 
                          src="/images/about-icon-contracts.webp" 
                          alt="عروض خاصة للعقود طويلة الأجل" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-black font-black text-base md:text-lg mb-1">
                          عروض خاصة للعقود طويلة الأجل
                        </h3>
                        <p className="text-black font-medium text-xs md:text-sm leading-relaxed">
                          استفد من عروض مشوار الخاصة بالشركات، مع أسعار مميزة للعقود قصيرة وطويلة الأجل وخدمة احترافية من فريق العمل وسائقين محترفين.
                        </p>
                      </div>
                    </div>

                    {/* العنصر 3: سيارات حديثة وآمنة */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 mt-0.5 shadow-xs">
                        <img 
                          src="/images/about-icon-safety.webp" 
                          alt="سيارات حديثة وآمنة" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-black font-black text-base md:text-lg mb-1">
                          سيارات حديثة وآمنة
                        </h3>
                        <p className="text-black font-medium text-xs md:text-sm leading-relaxed">
                          نوفر لك أحدث السيارات والموديلات بتشكيلة متنوعة تناسب احتياجاتك المختلفة، مع الحرص على أن تكون السيارات بحالة جيدة وجاهزة لتمنحك تجربة قيادة مريحة وآمنة.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* الجزء السفلي: خط فاصل مع الزر وسنوات الخبرة باللون الأسود */}
                <div className="border-t border-gray-200 pt-6 mt-8 flex items-center justify-between flex-wrap gap-4">
                  
                  {/* اليمين: الصورتان الدائريتان المتداخلتان مع نص +10 سنوات خبرة باللون الأسود العريض */}
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
                    <span className="font-black text-black text-sm md:text-base">
                      +10 سنوات خبرة
                    </span>
                  </div>

                  {/* اليسار: زر "اعرف أكثر »" بتصميم مستطيل ذو حواف ناعمة */}
                  <Link
                    href="/fleet"
                    className="bg-[#6b0f12] hover:bg-[#520b0d] text-white px-7 py-3 rounded-md font-bold text-sm transition-all duration-200 shadow-xs hover:shadow-sm inline-flex items-center gap-1.5 cursor-pointer active:scale-98"
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
