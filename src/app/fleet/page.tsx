"use client";

import React from 'react';
import { Search, Calendar, MapPin, SlidersHorizontal, ChevronDown, Check, Star } from 'lucide-react';
import Link from 'next/link';

const CARS = [
  { id: 1, name: 'بورش 911 كاريرا', brand: 'Porsche', year: 2023, price: 12500, type: 'رياضية', transmission: 'أوتوماتيك', seats: 2, image: 'https://images.unsplash.com/photo-1503376712341-a1aa8c878f14?q=80&w=1470&auto=format&fit=crop', rating: 4.9, reviews: 124, tag: 'الأكثر طلباً' },
  { id: 2, name: 'مرسيدس جي كلاس', brand: 'Mercedes', year: 2024, price: 18000, type: 'دفع رباعي', transmission: 'أوتوماتيك', seats: 5, image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1469&auto=format&fit=crop', rating: 5.0, reviews: 89, tag: 'فخامة' },
  { id: 3, name: 'بي إم دبليو الفئة السابعة', brand: 'BMW', year: 2023, price: 9500, type: 'سيدان', transmission: 'أوتوماتيك', seats: 5, image: 'https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=1478&auto=format&fit=crop', rating: 4.8, reviews: 210 },
  { id: 4, name: 'أودي كيو 8', brand: 'Audi', year: 2023, price: 11000, type: 'دفع رباعي', transmission: 'أوتوماتيك', seats: 5, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1470&auto=format&fit=crop', rating: 4.7, reviews: 156 }
];

export default function FleetPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] rtl">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            <Link href="/" className="text-2xl font-bold text-[#006B4D]">مشوار</Link>
            
            <div className="flex-1 max-w-3xl flex items-center bg-gray-50 border border-gray-200 rounded-full p-2 w-full shadow-sm">
              <div className="flex items-center px-4 border-l border-gray-200 text-sm text-gray-600 min-w-max cursor-pointer">
                <MapPin size={18} className="ml-2 text-[#006B4D]" />
                <span>القاهرة، مصر</span>
                <ChevronDown size={14} className="mr-2" />
              </div>
              <div className="flex items-center px-4 border-l border-gray-200 text-sm text-gray-600 min-w-max cursor-pointer">
                <Calendar size={18} className="ml-2 text-[#006B4D]" />
                <span>12 - 15 نوفمبر</span>
              </div>
              <div className="flex-1 flex items-center px-4">
                <Search size={18} className="ml-2 text-gray-400" />
                <input type="text" placeholder="ابحث عن ماركة، طراز..." className="bg-transparent border-none outline-none w-full text-sm" />
              </div>
              <button className="bg-[#006B4D] text-white p-2.5 rounded-full hover:bg-[#005a41] transition-colors">
                <Search size={20} />
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50">
                <SlidersHorizontal size={18} />
                <span>تصفية</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Quick Filters */}
        <div className="container mx-auto px-4 lg:px-8 py-3 border-t border-gray-100 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-3">
            {['الكل', 'اقتصادي', 'سيدان فارهة', 'دفع رباعي', 'رياضية', 'سيارات عائلية', 'كابريوليه'].map((badge, idx) => (
              <button key={idx} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${idx === 0 ? 'bg-[#006B4D] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#006B4D] hover:text-[#006B4D]'}`}>
                {badge}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-8 flex gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-48">
            <h3 className="font-bold text-lg text-[#111827] mb-6 flex items-center justify-between">
              <span>الفلاتر</span>
              <span className="text-sm text-[#006B4D] font-normal cursor-pointer hover:underline">مسح الكل</span>
            </h3>
            
            {/* Price Filter */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              <h4 className="font-medium text-[#111827] mb-4">الميزانية (ج.م / يوم)</h4>
              <input type="range" min="800" max="25000" className="w-full accent-[#006B4D]" />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>800 ج.م</span>
                <span>25,000 ج.م</span>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              <h4 className="font-medium text-[#111827] mb-4">العلامة التجارية</h4>
              <div className="space-y-3">
                {['Porsche', 'Mercedes', 'BMW', 'Audi', 'Range Rover'].map((brand, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center group-hover:border-[#006B4D] transition-colors">
                      {idx < 2 && <Check size={14} className="text-[#006B4D]" />}
                    </div>
                    <span className="text-sm text-gray-600">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Perks */}
            <div>
              <h4 className="font-medium text-[#111827] mb-4">مميزات إضافية</h4>
              <div className="space-y-3">
                {['توصيل مجاني', 'تأمين شامل', 'بدون سائق', 'سائق خاص متاح'].map((perk, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center group-hover:border-[#006B4D] transition-colors"></div>
                    <span className="text-sm text-gray-600">{perk}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Cars Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#111827]">أكثر من 150 سيارة متاحة</h2>
            <select className="bg-white border border-gray-200 text-sm rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#006B4D]/20">
              <option>الأكثر صلة</option>
              <option>السعر: الأقل أولاً</option>
              <option>السعر: الأعلى أولاً</option>
              <option>الأعلى تقييماً</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {CARS.map((car) => (
              <div key={car.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                <div className="relative h-48 overflow-hidden">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {car.tag && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-[#006B4D] rounded-full shadow-sm">
                      {car.tag}
                    </div>
                  )}
                  <button className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-600 hover:text-[#006B4D] shadow-sm transition-colors text-xs font-medium flex items-center gap-1">
                    <SlidersHorizontal size={14} /> قارن
                  </button>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-[#111827] text-lg">{car.name}</h3>
                      <p className="text-sm text-gray-500">{car.year} • {car.brand}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-[#F59E0B]/10 px-2 py-1 rounded text-[#F59E0B] text-sm font-medium">
                      <Star size={14} className="fill-current" />
                      {car.rating}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 py-4 border-b border-gray-100 text-sm text-gray-600">
                    <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>{car.seats} مقاعد</div>
                    <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>{car.transmission}</div>
                    <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>{car.type}</div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-[#006B4D]">{car.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-500 ml-1">ج.م/يوم</span>
                    </div>
                    <Link href={`/fleet/${car.id}`} className="bg-[#111827] hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center">
                      احجز الآن
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
