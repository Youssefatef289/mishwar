"use client";
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { 
  Heart, ArrowLeftRight, Eye, Check, ChevronRight, ChevronLeft 
} from 'lucide-react';

interface NewCarItem {
  id: string;
  name: string;
  year: number;
  image: string;
  tags: string[];
  price?: number;
  officialPrice: number;
  views: number;
  isBookingOnly?: boolean;
}

const NEW_CARS_DATA: NewCarItem[] = [
  {
    id: 'hyundai-venue-2027',
    name: 'هيونداي فينيو',
    year: 2027,
    image: '/images/carDesktopView.webp',
    tags: ['أوتوماتيك', 'بنزين', 'SUV'],
    officialPrice: 869000,
    views: 10337,
    isBookingOnly: true,
  },
  {
    id: 'nissan-magnite-2027',
    name: 'نيسان ماجنيت',
    year: 2027,
    image: '/images/fiat-tipo-featured.webp',
    tags: ['CVT', 'بنزين', 'SUV'],
    price: 850000,
    officialPrice: 820000,
    views: 5663,
  },
  {
    id: 'suzuki-alto-2026',
    name: 'سوزوكي ألتو',
    year: 2026,
    image: '/images/car.webp',
    tags: ['أوتوماتيك', 'بنزين', 'هاتشباك'],
    price: 540000,
    officialPrice: 535000,
    views: 5104,
  },
  {
    id: 'toyota-corolla-2027',
    name: 'تويوتا كورولا',
    year: 2027,
    image: '/images/how-it-works-car.webp',
    tags: ['CVT', 'بنزين', 'سيدان'],
    price: 1380000,
    officialPrice: 1280000,
    views: 3225,
  },
  {
    id: 'nissan-sunny-2027',
    name: 'نيسان صني',
    year: 2027,
    image: '/images/car.webp',
    tags: ['أوتوماتيك', 'بنزين', 'سيدان'],
    price: 720000,
    officialPrice: 695000,
    views: 2925,
  },
];

export default function NewCarsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compared, setCompared] = useState<string[]>([]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleCompare = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setCompared(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="new-cars" className="bg-[#F8FAFC] py-12 md:py-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header: Title on Right, Subtitle below, "عرض الكل" on Left */}
        <div className="flex flex-row items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              سيارات جديدة
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] font-medium mt-1">
              اشتري العربية اللي نفسك فيها من الليثي كاش أو قسط
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Carousel navigation controls */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button 
                onClick={() => scroll('right')}
                className="w-8 h-8 rounded-[6px] border border-[#E3E5EA] bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-colors shadow-xs"
                aria-label="السابق"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scroll('left')}
                className="w-8 h-8 rounded-[6px] border border-[#E3E5EA] bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-colors shadow-xs"
                aria-label="التالي"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            <Link
              href="/fleet"
              className="text-sm sm:text-base font-bold text-[#0A2A5E] hover:underline whitespace-nowrap"
            >
              عرض الكل
            </Link>
          </div>
        </div>

        {/* Carousel Container: Scroll-snap showing 4 full cards and 5th cut on left */}
        <div
          ref={carouselRef}
          className="flex gap-4 md:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-1 px-1 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {NEW_CARS_DATA.map((car) => {
            const isFav = favorites.includes(car.id);
            const isComp = compared.includes(car.id);

            return (
              <div
                key={car.id}
                className="w-[280px] shrink-0 snap-start bg-white rounded-[8px] border border-[#E3E5EA] shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group"
              >
                {/* Image Showcase with Overlays */}
                <div className="relative h-[145px] w-full bg-[#F9FAFB] flex items-center justify-center overflow-hidden p-3 border-b border-[#F0F2F5]">
                  
                  {/* Top Right: Compare & Heart Buttons (in RTL) */}
                  <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
                    {/* Compare Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleCompare(car.id, e)}
                      title="مقارنة"
                      className={`w-7 h-7 rounded-[4px] flex items-center justify-center text-white transition-colors shadow-xs ${
                        isComp ? 'bg-[#0B9A5B]' : 'bg-[#2B3990] hover:bg-[#202b6e]'
                      }`}
                    >
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Heart Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleFavorite(car.id, e)}
                      title="المفضلة"
                      className="w-7 h-7 rounded-[4px] bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 shadow-xs border border-[#E3E5EA]/70 transition-colors"
                    >
                      <Heart 
                        className={`w-3.5 h-3.5 transition-colors ${
                          isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-500'
                        }`} 
                      />
                    </button>
                  </div>

                  {/* Top Left: Views Counter */}
                  <div className="absolute top-2.5 left-2.5 z-10 bg-white/95 backdrop-blur-xs border border-[#E3E5EA]/80 px-2 py-0.5 rounded-[4px] text-[11px] font-bold text-slate-700 flex items-center gap-1 shadow-xs">
                    <Eye className="w-3 h-3 text-slate-400" />
                    <span>{car.views.toLocaleString()}</span>
                  </div>

                  {/* Car Image */}
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Card Content Body */}
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Name & "معتمدة" Badge */}
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#0B9A5B] transition-colors truncate">
                        {car.name}
                      </h3>
                      <span className="bg-[#DDF5E3] text-[#0B9A5B] text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shrink-0">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                        <span>معتمدة</span>
                      </span>
                    </div>

                    {/* Model Year */}
                    <p className="text-[11px] text-[#6B7280] font-medium mb-3">
                      {car.year}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                      {car.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-[#EEF0FF] text-[#2B3990] text-[10px] font-semibold px-2 py-0.5 rounded-[4px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer: Divider & Price */}
                  <div className="pt-2 border-t border-[#E3E5EA]">
                    {car.isBookingOnly ? (
                      <div>
                        <div className="inline-block bg-[#E9EAFE] text-[#2B3990] text-xs font-bold px-3 py-1 rounded-[6px] mb-1">
                          حجز واستلام من المعرض
                        </div>
                        <p className="text-[11px] text-[#6B7280]">
                          السعر الرسمي {car.officialPrice.toLocaleString()} ج.م
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-base font-extrabold text-[#2B3990]">
                            {car.price?.toLocaleString()}
                          </span>
                          <span className="text-xs font-bold text-[#2B3990]">ج.م</span>
                        </div>
                        <p className="text-[11px] text-[#6B7280]">
                          السعر الرسمي {car.officialPrice.toLocaleString()} ج.م
                        </p>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Navy Bottom Bar with top radius representing the transition to the next section */}
        <div className="w-full h-3 bg-[#0A2A5E] rounded-t-[10px] mt-6 opacity-95" aria-hidden="true" />

      </div>
    </section>
  );
}

