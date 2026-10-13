"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Car as CarIcon, Search, ShieldCheck, MapPin, Calendar, Star, 
  ArrowLeft, CheckCircle2, Sparkles, Building2, Clock, PhoneCall, 
  FileCheck2, KeyRound, Award, Fuel, Gauge, SlidersHorizontal, 
  ChevronLeft, ArrowUpRight, Zap, Check, ChevronDown, ChevronUp,
  CalendarCheck, CreditCard
} from 'lucide-react';
import { initStorage, getFleet, getUsers, Car, User } from '@/utils/storage';

export default function HomePage() {
  const router = useRouter();
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [dealers, setDealers] = useState<User[]>([]);
  const [showAllBrands, setShowAllBrands] = useState(false);

  // Search filter states
  const [rentalType, setRentalType] = useState<'self' | 'chauffeur'>('self');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('القاهرة الكبرى');
  const [budgetTier, setBudgetTier] = useState<string>('all');
  const [pickupDate, setPickupDate] = useState<string>('2026-10-15');
  const [returnDate, setReturnDate] = useState<string>('2026-10-18');

  useEffect(() => {
    initStorage();
    const fleet = getFleet().filter(c => c.status === 'available');
    setFeaturedCars(fleet);
    
    const allUsers = getUsers();
    setDealers(allUsers.filter(u => u.role === 'dealer'));
  }, []);

  // Calculate day count
  const start = new Date(pickupDate);
  const end = new Date(returnDate);
  const diffTime = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  const daysCount = diffTime > 0 ? diffTime : 1;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedBrand !== 'all') params.append('brand', selectedBrand);
    if (selectedLocation) params.append('location', selectedLocation);
    if (budgetTier !== 'all') params.append('budget', budgetTier);
    router.push(`/fleet?${params.toString()}`);
  };

  // Primary 6 Brands matching Screenshot 3
  const primaryBrands = [
    { name: 'مرسيدس', en: 'Mercedes', logo: '/images/Mercedes-Benz.webp' },
    { name: 'رينو', en: 'Renault', logo: '/images/Renault.webp' },
    { name: 'ب م دبليو', en: 'BMW', logo: '/images/BMW.webp' },
    { name: 'أوبل', en: 'Opel', logo: '/images/Opel.webp' },
    { name: 'بيجو', en: 'Peugeot', logo: '/images/Peugeot.webp' },
    { name: 'نيسان', en: 'Nissan', logo: '/images/Nissan.webp' },
  ];

  // Extra Brands revealed on "شاهد المزيد"
  const extraBrands = [
    { name: 'هيونداي', en: 'Hyundai', logo: '/images/Hyundai.webp' },
    { name: 'كيا', en: 'Kia', logo: '/images/Kia.webp' },
    { name: 'فولكس فاجن', en: 'Volkswagen', logo: '/images/Volkswagen.webp' },
    { name: 'جيب', en: 'Jeep', logo: '/images/Jeep.webp' },
    { name: 'إم جي', en: 'MG', logo: '/images/MG.webp' },
    { name: 'ستروين', en: 'Citroen', logo: '/images/Citroen.webp' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-right font-sans">
      
      {/* 1. Hero Section (Conversion-Focused, Inspired by Sylndr) */}
      <section className="relative bg-[#0B132B] text-white pt-16 pb-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Glow & Background Image */}
        <div className="absolute inset-0 opacity-25 mix-blend-luminosity">
          <img 
            src="https://images.unsplash.com/photo-1503376712351-56f8f7004f1e?auto=format&fit=crop&q=80" 
            alt="Luxury Fleet" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/85 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto z-10 flex flex-col items-center text-center">
          
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 bg-[#006B4D]/40 border border-[#10B981]/40 px-4 py-1.5 rounded-full text-xs font-bold text-[#10B981] mb-6 backdrop-blur-md shadow-sm">
            <Sparkles className="w-4 h-4 text-[#10B981]" />
            <span>المنصة المصرية المعتمدة الأولى لتأجير السيارات الفاخرة والعائلية</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight md:leading-snug max-w-4xl tracking-tight">
            استأجر سيارتك الفاخرة بعقد رقمي موثق.. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#10B981] via-[#04875B] to-[#006B4D]">
              استلام فوري وفحص معتمد 100%
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mt-4 mb-6 leading-relaxed font-medium">
            أكبر أسطول سيارات في القاهرة، الجيزة، والساحل الشمالي. بدون إجراءات ورقية معقدة، وبدون إيداع نقدي للعملاء المعتمدين.
          </p>

          {/* Focal Car Image Presentation */}
          <div className="relative max-w-xl w-full my-2 flex justify-center">
            <img 
              src="/images/carDesktopView.webp" 
              alt="Mishwar Signature Car" 
              className="w-full max-h-56 object-contain drop-shadow-[0_25px_35px_rgba(0,107,77,0.45)] hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 text-xs font-bold text-slate-300 mt-4 mb-6">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>فحص معتمد 85+ نقطة</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>عقود إلكترونية موحدة ETA</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <PhoneCall className="w-4 h-4 text-[#10B981]" />
              <span>دعم طوارئ وتوصيل 24/7</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Overlapping Multi-Param Search Box (Sylndr Style) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 z-20 relative">
        <div className="bg-white rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] border border-slate-100">
          
          {/* Search Type Tabs */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
            <div className="flex items-center gap-2 bg-[#F8FAFC] p-1.5 rounded-2xl border border-slate-200/80">
              <button 
                type="button"
                onClick={() => setRentalType('self')}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                  rentalType === 'self' 
                    ? 'bg-[#006B4D] text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                استئجار قيادة ذاتية (يومي / شهري)
              </button>
              <button 
                type="button"
                onClick={() => setRentalType('chauffeur')}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                  rentalType === 'chauffeur' 
                    ? 'bg-[#006B4D] text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                سيارة مع سائق خاص VIP
              </button>
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-[#006B4D]">
              <Sparkles className="w-4 h-4" />
              <span>تسليم فوري بمطار القاهرة أو لباب بيتك</span>
            </div>
          </div>

          {/* Search Inputs Form */}
          <form onSubmit={handleSearchSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Make & Model */}
              <div className="bg-[#F8FAFC] p-3.5 rounded-2xl border border-slate-200">
                <label className="block text-[11px] font-bold text-slate-400 mb-1">الماركة العالمية</label>
                <select 
                  value={selectedBrand} 
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-transparent text-xs md:text-sm font-black text-slate-900 outline-none cursor-pointer"
                >
                  <option value="all">كافة الماركات المتاحة</option>
                  <option value="مرسيدس">مرسيدس-بنز (Mercedes)</option>
                  <option value="بورشه">بورشه (Porsche)</option>
                  <option value="بي إم">بي إم دبليو (BMW)</option>
                  <option value="رينج">رينج روفر (Range Rover)</option>
                  <option value="تويوتا">تويوتا (Toyota)</option>
                  <option value="كيا">كيا (Kia)</option>
                </select>
              </div>

              {/* Pickup Location */}
              <div className="bg-[#F8FAFC] p-3.5 rounded-2xl border border-slate-200">
                <label className="block text-[11px] font-bold text-slate-400 mb-1">منطقة وفرع الاستلام</label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#006B4D] shrink-0" />
                  <select 
                    value={selectedLocation} 
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-transparent text-xs md:text-sm font-black text-slate-900 outline-none cursor-pointer"
                  >
                    <option value="القاهرة الكبرى">كافة فروع القاهرة الكبرى</option>
                    <option value="مطار القاهرة VIP">مطار القاهرة صالة كبار الزوار T3</option>
                    <option value="التجمع الخامس">التجمع الخامس والقاهرة الجديدة</option>
                    <option value="الشيخ زايد">الشيخ زايد وأكتوبر</option>
                    <option value="الساحل الشمالي">الساحل الشمالي ومارينا</option>
                  </select>
                </div>
              </div>

              {/* Dates & Duration Counter */}
              <div className="bg-[#F8FAFC] p-3.5 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-black text-[#006B4D] bg-[#E6F4EF] px-2 py-0.5 rounded-md">
                    {daysCount} أيام إيجار
                  </span>
                  <label className="text-[11px] font-bold text-slate-400">تواريخ الرحلة</label>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#006B4D] shrink-0" />
                  <div className="flex items-center gap-1.5 w-full text-xs font-bold text-slate-900">
                    <input 
                      type="date" 
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-1/2 bg-transparent outline-none text-[11px] font-bold" 
                    />
                    <span>إلى</span>
                    <input 
                      type="date" 
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-1/2 bg-transparent outline-none text-[11px] font-bold" 
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="flex items-end">
                <button 
                  type="submit"
                  className="w-full bg-[#006B4D] hover:bg-[#00533C] text-white py-3.5 px-6 rounded-2xl font-black text-sm shadow-lg shadow-[#006B4D]/30 transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <Search className="w-5 h-5" />
                  <span>ابحث عن سيارتك الآن</span>
                </button>
              </div>

            </div>

            {/* Budget Range Pills (Quick Price Discovery) */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 ml-2">الميزانية اليومية:</span>
              {[
                { id: 'all', label: 'كافة الأسعار' },
                { id: 'under_3000', label: 'أقل من 3,000 ج.م' },
                { id: '3000_7000', label: '3,000 - 7,000 ج.م' },
                { id: '7000_15000', label: '7,000 - 15,000 ج.م' },
                { id: 'above_15000', label: 'أكثر من 15,000 ج.م VIP' },
              ].map(tier => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setBudgetTier(tier.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    budgetTier === tier.id 
                      ? 'bg-[#E6F4EF] text-[#006B4D] border border-[#006B4D]' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </form>

        </div>
      </div>

      {/* 2. Guaranteed Section: "مشوار مضمون!" (Matching Screenshot 2) */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-3xl md:rounded-[2.5rem] p-6 sm:p-10 md:p-16 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
          
          {/* Background Decorative Emerald Rhombus Elements matching Sylndr */}
          <div className="absolute left-6 top-0 bottom-0 w-2/5 pointer-events-none opacity-90 hidden md:block select-none">
            <div className="absolute top-6 left-16 w-24 h-32 bg-[#00B569] transform -skew-x-12 rounded-xl"></div>
            <div className="absolute bottom-6 left-6 w-24 h-32 bg-[#00B569] transform -skew-x-12 rounded-xl"></div>
            <div className="absolute top-24 left-48 w-32 h-24 bg-[#00B569] transform -skew-x-12 rounded-xl"></div>
          </div>

          {/* Left: Two Cars Graphic */}
          <div className="relative z-10 w-full md:w-1/2 flex items-center justify-center">
            <img 
              src="/images/mishwar-guaranteed-cars.webp" 
              alt="مشوار مضمون" 
              className="w-full max-h-72 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right: Text and Action Buttons */}
          <div className="relative z-10 w-full md:w-1/2 text-right space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              مشوار مضمون!
            </h2>
            <p className="text-sm sm:text-base font-bold text-slate-600 leading-relaxed">
              استأجر أو بيع عربية مستعملة بسهولة وآمان
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link 
                href="/fleet"
                className="bg-[#00875A] hover:bg-[#006B4D] text-white font-bold text-sm sm:text-base px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                شراء عربية
              </Link>
              <Link 
                href="/register"
                className="bg-[#0A2540] hover:bg-[#06182A] text-white font-bold text-sm sm:text-base px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                بيع عربيتك
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3. How It Works: "ازاي استأجر عربية من على مشوار ماركت؟" (Matching Screenshot 1) */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-black text-[#006B4D] mb-2 tracking-tight">
            ازاي استأجر عربية من على مشوار ماركت؟
          </h2>
          <p className="text-sm sm:text-base font-bold text-slate-700">
            أضمن منصة عربيات في مصر
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Interactive Card with Outline Icons and Car */}
          <div className="lg:col-span-5 bg-[#EAF7F2] rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-between items-center relative overflow-hidden min-h-[380px] border border-[#A3D9C9]/50 shadow-sm">
            {/* 3 Top Icons (Book, Test, Finance) */}
            <div className="flex items-center justify-around w-full pt-2 px-2 z-10">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <div className="w-14 h-14 rounded-2xl border-2 border-[#00B569] flex items-center justify-center text-[#00B569] bg-white/70 shadow-xs">
                  <CalendarCheck className="w-7 h-7 stroke-[2.2]" />
                </div>
                <span className="text-xs font-bold text-[#006B4D]">Book</span>
              </div>

              <div className="flex flex-col items-center gap-1.5 text-center">
                <div className="w-14 h-14 rounded-2xl border-2 border-[#00B569] flex items-center justify-center text-[#00B569] bg-white/70 shadow-xs">
                  <Gauge className="w-7 h-7 stroke-[2.2]" />
                </div>
                <span className="text-xs font-bold text-[#006B4D]">Test</span>
              </div>

              <div className="flex flex-col items-center gap-1.5 text-center">
                <div className="w-14 h-14 rounded-2xl border-2 border-[#00B569] flex items-center justify-center text-[#00B569] bg-white/70 shadow-xs">
                  <CreditCard className="w-7 h-7 stroke-[2.2]" />
                </div>
                <span className="text-xs font-bold text-[#006B4D]">Finance</span>
              </div>
            </div>

            {/* Bottom: Silver Sedan with Neon Ground Platform */}
            <div className="relative w-full mt-6 flex justify-center items-end">
              <img 
                src="/images/how-it-works-car.webp" 
                alt="عربية مشوار ماركت" 
                className="w-full max-h-56 object-contain drop-shadow-md z-10 hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 left-1/4 right-1/4 h-3 bg-[#00E082] rounded-full blur-xs opacity-90"></div>
            </div>
          </div>

          {/* Right: Vertical Process Steps */}
          <div className="lg:col-span-7 flex flex-col justify-center pr-2 lg:pr-8">
            <div className="relative space-y-8 pr-6 border-r-2 border-[#00B569]/30 mr-2">
              
              {/* Step 1 */}
              <div className="relative group">
                <div className="absolute -right-[31px] top-1.5 w-4 h-4 rounded-full bg-[#00B569] ring-4 ring-[#E6F4EF]"></div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1">
                  اختار العربية المناسبة من على مشوار ماركت
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  كل العربيات المعروضة معاها تقرير فحص شامل
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="absolute -right-[31px] top-1.5 w-4 h-4 rounded-full bg-[#00B569] ring-4 ring-[#E6F4EF]"></div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1">
                  ابعت عرض السعر المناسب
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  اختار تكون مشتري جاد عشان تشتري العربية أسرع
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative group">
                <div className="absolute -right-[31px] top-1.5 w-4 h-4 rounded-full bg-[#00B569] ring-4 ring-[#E6F4EF]"></div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1">
                  خطط تمويل مختلفة تناسب جميع الأشخاص
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  ادفع كاش أو بالتقسيط من خلال مشوار كاش
                </p>
              </div>

            </div>

            {/* CTA Button */}
            <div className="mt-8 pr-6">
              <Link 
                href="/fleet"
                className="inline-block bg-[#00875A] hover:bg-[#006B4D] text-white font-bold text-sm sm:text-base px-10 py-3 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                اعرف المزيد
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Sell Your Car Banner: "بيع عربيتك" (Matching Screenshot 3 Top) */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#EBF0FA] rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col-reverse md:flex-row items-center justify-between gap-8 border border-slate-200/60 shadow-sm overflow-hidden">
          
          {/* Left: Fiat Tipo Car Graphic */}
          <div className="relative w-full md:w-1/2 flex flex-col items-center justify-center">
            <img 
              src="/images/fiat-tipo-featured.webp" 
              alt="بيع عربيتك مع مشوار" 
              className="w-full max-h-56 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
            />
            {/* Dark Navy Pedestal Bar */}
            <div className="w-3/5 h-2.5 bg-[#0A2540] rounded-full -mt-2 opacity-80"></div>
          </div>

          {/* Right: Text & Action */}
          <div className="w-full md:w-1/2 text-right space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
              بيع عربيتك
            </h2>
            <p className="text-xs sm:text-sm font-bold text-slate-600">
              بأحسن سعر، بدون فصال، بأسهل إجراءات
            </p>
            <div className="pt-2">
              <Link 
                href="/register"
                className="inline-block bg-[#0A2540] hover:bg-[#06182A] text-white font-bold text-sm px-8 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
              >
                بيع عربيتك
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Most Popular Brands: "أشهر الماركات" (Matching Screenshot 3 Bottom) */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-[#006B4D]">
            أشهر الماركات
          </h2>
        </div>

        {/* 6 Primary Brand Cards matching Image 3 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {primaryBrands.map((brand, idx) => (
            <Link
              key={idx}
              href={`/fleet?brand=${brand.en}`}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-[#006B4D]/40 shadow-xs hover:shadow-md transition-all group flex flex-col items-center justify-center text-center cursor-pointer hover:-translate-y-1 duration-200"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center p-2 mb-2 transition-transform group-hover:scale-110">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="w-full h-full object-contain" 
                />
              </div>
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-[#006B4D] transition-colors">
                {brand.name}
              </h3>
            </Link>
          ))}
        </div>

        {/* Extra Brands (Toggled via "شاهد المزيد") */}
        {showAllBrands && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-4 animate-in fade-in duration-300">
            {extraBrands.map((brand, idx) => (
              <Link
                key={idx}
                href={`/fleet?brand=${brand.en}`}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-[#006B4D]/40 shadow-xs hover:shadow-md transition-all group flex flex-col items-center justify-center text-center cursor-pointer hover:-translate-y-1 duration-200"
              >
                <div className="w-16 h-16 rounded-xl flex items-center justify-center p-2 mb-2 transition-transform group-hover:scale-110">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <h3 className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-[#006B4D] transition-colors">
                  {brand.name}
                </h3>
              </Link>
            ))}
          </div>
        )}

        {/* "شاهد المزيد" Dropdown Button */}
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={() => setShowAllBrands(!showAllBrands)}
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-[#006B4D] hover:text-[#00533C] transition-colors py-2 px-4 rounded-full hover:bg-[#E6F4EF]"
          >
            <span>{showAllBrands ? 'عرض أقل' : 'شاهد المزيد'}</span>
            {showAllBrands ? (
              <ChevronUp className="w-4 h-4 text-[#006B4D]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#006B4D]" />
            )}
          </button>
        </div>
      </section>

      {/* 4. Latest Additions (أحدث الإضافات لأسطول مشوار) */}
      <section id="latest-additions" className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-black text-[#10B981] bg-emerald-50 px-3 py-1 rounded-full mb-2 inline-block border border-emerald-200">
                أسطول 2026/2025 المحدث لحظياً
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">أحدث الإضافات لأسطول مشوار المعتمد</h2>
              <p className="text-xs md:text-sm text-slate-500 mt-1">سيارات مجهزة بأعلى فئات الرفاهية وجاهزة للتسليم الفوري</p>
            </div>

            <Link 
              href="/fleet" 
              className="bg-[#E6F4EF] hover:bg-[#d5ede4] text-[#006B4D] px-5 py-2.5 rounded-2xl text-xs font-black transition-colors flex items-center gap-2 self-start md:self-auto"
            >
              <span>عرض كامل الأسطول (4,850+ سيارة)</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* Cars Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.slice(0, 6).map((car) => {
              const price = car.dailyPrice ?? car.pricePerDay ?? 14500;
              return (
                <div 
                  key={car.id}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_35px_-4px_rgba(0,0,0,0.1)] transition-all overflow-hidden flex flex-col group"
                >
                  {/* Top Image Showcase */}
                  <div className="relative h-64 bg-slate-50 p-6 flex items-center justify-center overflow-hidden">
                    <div className="absolute top-4 right-4 z-10 flex gap-1.5">
                      <span className="bg-[#10B981] text-white px-3 py-1 rounded-full text-[11px] font-black shadow-sm">
                        متاحة فوراً
                      </span>
                      <span className="bg-slate-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[11px] font-bold">
                        {car.category || 'سيدان فاخرة'}
                      </span>
                    </div>

                    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-xl text-xs font-black text-amber-800 flex items-center gap-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{car.rating || 4.9}</span>
                    </div>

                    <img 
                      src={car.images?.[0] || car.image || 'https://via.placeholder.com/600'} 
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-contain transform group-hover:scale-108 transition-transform duration-500 drop-shadow-xl" 
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-xl font-black text-slate-900 group-hover:text-[#006B4D] transition-colors">
                          {car.brand} {car.model}
                        </h3>
                        <span className="text-xs font-bold text-slate-400">موديل {car.year}</span>
                      </div>
                      <p className="text-xs text-slate-500 font-semibold mb-4">
                        المالك / المعرض: <span className="text-slate-800 font-bold">{car.dealershipName || 'معرض رويال كارز VIP'}</span>
                      </p>

                      {/* Specs Pill matching Sylndr style */}
                      <div className="grid grid-cols-3 gap-2 bg-[#F8FAFC] p-3 rounded-2xl text-center text-xs font-bold text-slate-700 border border-slate-100">
                        <div>
                          <span className="block text-[10px] text-slate-400">ناقل الحركة</span>
                          <span className="truncate">{car.transmission?.split(' ')[0] || 'أوتوماتيك'}</span>
                        </div>
                        <div className="border-r border-slate-200">
                          <span className="block text-[10px] text-slate-400">الوقود</span>
                          <span>{car.fuel?.split(' ')[0] || 'بنزين 95'}</span>
                        </div>
                        <div className="border-r border-slate-200">
                          <span className="block text-[10px] text-slate-400">السعة</span>
                          <span>{car.seats || 5} ركاب</span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block">السعر اليومي الشامل:</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black text-[#006B4D]">{price.toLocaleString()}</span>
                          <span className="text-xs font-bold text-slate-600">ج.م / يوم</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link 
                          href={`/fleet/${car.id}`}
                          className="bg-[#006B4D] hover:bg-[#00533C] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                        >
                          <span>احجز فوراً</span>
                          <ArrowLeft className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Trust Pillars: "ليه تختار منصة مشوار؟" (Inspired by Sylndr Mdmoun) */}
      <section id="why-choose-us" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-black text-[#006B4D] bg-[#E6F4EF] px-3.5 py-1 rounded-full mb-3 inline-block">
            معايير الثقة والضمان
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">ليه تختار منصة مشوار لتنقلاتك؟</h2>
          <p className="text-xs md:text-sm text-slate-500 mt-2">
            صممنا تجربة تأجير المركبات لتوفر لك أقصى درجات الأمان والشفافية بدون أي مفاجآت أو إجراءات روتينية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-4 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-[#E6F4EF] p-3 flex items-center justify-center">
              <img src="/images/wideAngleIcon.cf64df81.svg" alt="360 Inspection" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-lg font-black text-slate-900">فحص فني معتمد 360°</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              كل سيارة تخضع لفحص دقيق لأكثر من 85 نقطة تشمل المحرك، الفرامل، وتكييف الهواء مع شهادة جودة رقمية مرفقة.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-4 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-[#E6F4EF] p-3 flex items-center justify-center">
              <img src="/images/assuranceIcon.79e10b1f.svg" alt="Official Guarantee" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-lg font-black text-slate-900">عقود رقمية وربط ضريبي ETA</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              توثيق فوري للعقد الموحد برقم التسجيل الضريبي لضمان حقوقك القانونية وحمايتك التأمينية الكاملة طوال الرحلة.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-4 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-[#E6F4EF] p-3 flex items-center justify-center">
              <img src="/images/truckIcon.64c6c40a.svg" alt="Express Delivery" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-lg font-black text-slate-900">استلام فوري وتوصيل لباب بيتك</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              استلم سيارتك من صالات كبار الزوار بمطار القاهرة أو اطلب تسليمها معقمة عند باب بيتك في التجمع أو زايد.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-4 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-[#E6F4EF] p-3 flex items-center justify-center">
              <img src="/images/moneyIcon.82021139.svg" alt="Deposit Exemption" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-lg font-black text-slate-900">إعفاء من التأمين النقدي</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              للعملاء الموثقين بالهوية الوطنية، نوفر إمكانية الحجز بدون حجز ودائع نقدية معقدة واسترداد فوري للتأمينات.
            </p>
          </div>

        </div>
      </section>



      {/* 7. Dealership Partners */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <span className="text-xs font-black text-[#006B4D] bg-[#E6F4EF] px-3.5 py-1 rounded-full mb-2 inline-block">
            شبكة شركاء النجاح
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">معارض السيارات الفاخرة المعتمدة</h2>
          <p className="text-xs text-slate-500 mt-1">شركاؤنا يخضعون لتدقيق رسمي لضمان أقصى مستويات الخدمة</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {dealers.map((dealer) => (
            <div 
              key={dealer.id}
              className="bg-white p-6 rounded-3xl border border-slate-100 text-center shadow-sm space-y-3 hover:border-[#006B4D]/30 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#E6F4EF] text-[#006B4D] mx-auto flex items-center justify-center font-black text-xl">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="font-black text-slate-900 text-sm">{dealer.companyName || dealer.name}</h3>
              <span className="text-[11px] font-bold text-[#10B981] flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>معرض معتمد VIP</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Conversion CTA Banner */}
      <section className="py-16 bg-[#0B132B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-right">
            <span className="text-xs font-black text-[#10B981] bg-[#10B981]/20 px-3 py-1 rounded-full inline-block border border-[#10B981]/30">
              فرصة لأصحاب الأساطيل والمعارض والمُلاك
            </span>
            <h2 className="text-2xl md:text-4xl font-black">هل تمتلك أسطول سيارات أو سيارة فاخرة؟</h2>
            <p className="text-xs md:text-sm text-slate-400 max-w-xl font-medium">
              انضم إلى منصة مشوار كمعرض شريك أو مالك سيارة P2P، واحصل على عقود إلكترونية موحدة، تأمين شامل، وإدارة أرباحك بسلاسة.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link 
              href="/register" 
              className="bg-[#006B4D] hover:bg-[#00533C] text-white px-8 py-4 rounded-2xl font-black text-sm shadow-lg shadow-[#006B4D]/40 transition-all flex items-center gap-2"
            >
              <span>سجل معرضك أو سيارتك الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
