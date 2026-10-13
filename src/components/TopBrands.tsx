"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface BrandItem {
  name: string;
  en: string;
  logo: string;
}

const PRIMARY_BRANDS: BrandItem[] = [
  { name: 'مرسيدس', en: 'Mercedes', logo: '/images/Mercedes-Benz.webp' },
  { name: 'رينو', en: 'Renault', logo: '/images/Renault.webp' },
  { name: 'ب م دبليو', en: 'BMW', logo: '/images/BMW.webp' },
  { name: 'أوبل', en: 'Opel', logo: '/images/Opel.webp' },
  { name: 'بيجو', en: 'Peugeot', logo: '/images/Peugeot.webp' },
  { name: 'نيسان', en: 'Nissan', logo: '/images/Nissan.webp' },
];

const EXTRA_BRANDS: BrandItem[] = [
  { name: 'هيونداي', en: 'Hyundai', logo: '/images/Hyundai.webp' },
  { name: 'كيا', en: 'Kia', logo: '/images/Kia.webp' },
  { name: 'فولكس فاجن', en: 'Volkswagen', logo: '/images/Volkswagen.webp' },
  { name: 'جيب', en: 'Jeep', logo: '/images/Jeep.webp' },
  { name: 'إم جي', en: 'MG', logo: '/images/MG.webp' },
  { name: 'ستروين', en: 'Citroen', logo: '/images/Citroen.webp' },
];

export default function TopBrands() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="py-10 md:py-16 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title: Centered, Bold, Green #0B9A5B */}
        <h2 className="text-2xl sm:text-3xl font-black text-[#0B9A5B] text-center mb-8 sm:mb-10">
          أشهر الماركات
        </h2>

        {/* Primary Row: 6 Cards in one row on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 md:gap-5 justify-items-center">
          {PRIMARY_BRANDS.map((brand, idx) => (
            <Link
              key={idx}
              href={`/used-cars?brand=${encodeURIComponent(brand.name)}`}
              className="w-full max-w-[200px] h-[160px] bg-white rounded-[12px] border border-[#E3E5EA] hover:border-[#0B9A5B] hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center p-3 text-center group cursor-pointer"
            >
              <div className="h-[80px] w-full flex items-center justify-center p-2 mb-1">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-[64px] max-w-[85px] object-contain group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#0B9A5B] transition-colors truncate">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Expanded Brands Row */}
        {expanded && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 md:gap-5 justify-items-center mt-4 sm:mt-5 animate-in fade-in duration-300">
            {EXTRA_BRANDS.map((brand, idx) => (
              <Link
                key={idx}
                href={`/used-cars?brand=${encodeURIComponent(brand.name)}`}
                className="w-full max-w-[200px] h-[160px] bg-white rounded-[12px] border border-[#E3E5EA] hover:border-[#0B9A5B] hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center p-3 text-center group cursor-pointer"
              >
                <div className="h-[80px] w-full flex items-center justify-center p-2 mb-1">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-[64px] max-w-[85px] object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#0B9A5B] transition-colors truncate">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* "شاهد المزيد" Link / Button in Center */}
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#0B9A5B] hover:text-[#09814c] transition-colors py-2 px-4 rounded-full hover:bg-[#E6FBF2] cursor-pointer"
          >
            <span>{expanded ? 'عرض أقل' : 'شاهد المزيد'}</span>
            {expanded ? (
              <ChevronUp className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <ChevronDown className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>
        </div>

      </div>
    </section>
  );
}

