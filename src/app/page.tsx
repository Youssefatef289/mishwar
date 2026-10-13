import React from 'react';
import SylndrGuaranteedBanner from '@/components/SylndrGuaranteedBanner';
import NewCarsCarousel from '@/components/NewCarsCarousel';
import SellYourCarBanner from '@/components/SellYourCarBanner';
import TopBrands from '@/components/TopBrands';
import HowToBuyGuide from '@/components/HowToBuyGuide';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-right font-sans" dir="rtl">
      {/* 1. بانر "سيلندر مضمون!" (الصورة 4) */}
      <SylndrGuaranteedBanner />

      {/* 2. سيارات جديدة (الصورة 2) */}
      <NewCarsCarousel />

      {/* 3. بانر "بيع عربيتك" (الصورة 3 - الجزء العلوي) */}
      <SellYourCarBanner />

      {/* 4. أشهر الماركات (الصورة 3 - الجزء السفلي) */}
      <TopBrands />

      {/* 5. ازاي اشتري عربية من على سيلندر ماركت؟ (الصورة 5) */}
      <HowToBuyGuide />
    </div>
  );
}
