import React from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import NewCarsCarousel from '@/components/NewCarsCarousel';
import SellYourCarBanner from '@/components/SellYourCarBanner';
import TopBrands from '@/components/TopBrands';
import HowToBuyGuide from '@/components/HowToBuyGuide';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-right font-sans" dir="rtl">
      {/* 1. HERO SECTION (مع فيديو hero.mp4 وزر الحجز الدائري وفورم الحجز) */}
      <HeroSection />

      {/* 2. ABOUT US SECTION (مع فيديو about-us.mp4 وشارة +10 سنوات خبرة) */}
      <AboutSection />

      {/* 3. NEW CARS FLEET CAROUSEL (سيارات جديدة وأسطول معتمد) */}
      <NewCarsCarousel />

      {/* 4. SELL YOUR CAR BANNER (بيع سيارتك مع مشوار) */}
      <SellYourCarBanner />

      {/* 5. TOP BRANDS (أشهر الماركات) */}
      <TopBrands />

      {/* 6. HOW TO RENT / BUY GUIDE (خطوات التأجير والشراء) */}
      <HowToBuyGuide />
    </div>
  );
}
