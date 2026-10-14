import React from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import NewCarsCarousel from '@/components/NewCarsCarousel';
import SellYourCarBanner from '@/components/SellYourCarBanner';
import TopBrands from '@/components/TopBrands';
import HowToBuyGuide from '@/components/HowToBuyGuide';
import VideoTourSection from '@/components/VideoTourSection';
import MediaGallerySection from '@/components/MediaGallerySection';
import TestimonialsStatsSection from '@/components/TestimonialsStatsSection';
import ContactSection from '@/components/ContactSection';
import ScrollReveal from '@/components/ScrollReveal';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-right font-sans selection:bg-[#0B9A5B] selection:text-white" dir="rtl">
      
      {/* 1. قسم البداية (Hero Section) مع خيار التبديل بين الفيديو والصورة وخلفية الفيديو */}
      <HeroSection />

      {/* 2. قسم المميزات والخدمات (Features & Services with why-1 to why-6) */}
      <ScrollReveal>
        <FeaturesSection />
      </ScrollReveal>

      {/* 3. قسم سيارات جديدة (New Cars Carousel with scroll-snap) */}
      <ScrollReveal delay={100}>
        <NewCarsCarousel />
      </ScrollReveal>

      {/* 4. بانر بيع سيارتك بأعلى سعر (Sell Your Car Banner without shadow) */}
      <ScrollReveal delay={100}>
        <SellYourCarBanner />
      </ScrollReveal>

      {/* 5. أشهر الماركات العالمية (Top Brands Grid) */}
      <ScrollReveal delay={100}>
        <TopBrands />
      </ScrollReveal>

      {/* 6. خطوات الحجز والشراء (How It Works / Steps with Clean Vehicle) */}
      <ScrollReveal delay={100}>
        <HowToBuyGuide />
      </ScrollReveal>

      {/* 7. جولة الفحص بالفيديو (Dedicated Video Tour Section with Custom Controls) */}
      <ScrollReveal delay={100}>
        <VideoTourSection />
      </ScrollReveal>

      {/* 8. معرض صور وفيديوهات الأسطول مع نافذة تكبير Lightbox (Media Gallery) */}
      <ScrollReveal delay={100}>
        <MediaGallerySection />
      </ScrollReveal>

      {/* 9. الإحصائيات وآراء العملاء المعتمدين (Testimonials & Live Stats) */}
      <ScrollReveal delay={100}>
        <TestimonialsStatsSection />
      </ScrollReveal>

      {/* 10. تواصل معنا، تحميل التطبيق، والأسئلة الشائعة (Contact & FAQ) */}
      <ScrollReveal delay={100}>
        <ContactSection />
      </ScrollReveal>

    </div>
  );
}
