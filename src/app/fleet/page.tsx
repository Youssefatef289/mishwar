"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getFleet, Car } from '@/utils/storage';
import { 
  Search, MapPin, Calendar, Filter, Star, Check, CheckCircle2, 
  Sparkles, ShieldCheck, ChevronDown, SlidersHorizontal, ArrowLeft, X 
} from 'lucide-react';

export default function FleetPage() {
  const [fleet, setFleet] = useState<Car[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [location, setLocation] = useState<string>('القاهرة الكبرى');
  const [comparedCars, setComparedCars] = useState<Car[]>([]);

  useEffect(() => {
    setFleet(getFleet());
  }, []);

  const handleToggleCompare = (car: Car) => {
    if (comparedCars.find(c => c.id === car.id)) {
      setComparedCars(comparedCars.filter(c => c.id !== car.id));
    } else {
      if (comparedCars.length < 3) {
        setComparedCars([...comparedCars, car]);
      } else {
        alert('يمكنك مقارنة حتى 3 سيارات كحد أقصى في نفس الوقت.');
      }
    }
  };

  const filteredFleet = fleet.filter(car => {
    const matchesBrand = selectedBrand === 'all' || 
      car.brand.toLowerCase().includes(selectedBrand.toLowerCase()) || 
      (car.make && car.make.toLowerCase().includes(selectedBrand.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || car.category.includes(selectedCategory);
    const matchesPrice = (car.dailyPrice ?? car.pricePerDay ?? 0) <= maxPrice;
    const matchesSearch = !searchQuery || 
      car.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
      car.model.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesCategory && matchesPrice && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      
      {/* Top Search & Filter Bar */}
      <div className="bg-[#0B132B] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-right mb-8">
            <span className="bg-[#006B4D]/40 text-[#10B981] border border-[#006B4D] px-3.5 py-1 rounded-full text-xs font-bold inline-block mb-3">
              فحص معتمد 150+ نقطة • تسليم فوري
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">تصفح أسطول سيارات مشوار المعتمد</h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1">اختر من بين تشكيلة السيارات الفاخرة والعائلية والاقتصادية الموثقة رسمياً</p>
          </div>

          {/* Quick Search Widget */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-3 md:p-4 shadow-xl flex flex-col lg:flex-row items-center gap-3 text-slate-900">
            {/* Location */}
            <div className="w-full lg:w-1/4 bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 flex items-center gap-3 text-right">
              <MapPin className="w-5 h-5 text-[#006B4D] shrink-0" />
              <div className="flex-1">
                <span className="block text-[11px] font-bold text-slate-400">منطقة الاستلام</span>
                <select 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent text-xs md:text-sm font-extrabold text-slate-900 outline-none"
                >
                  <option value="القاهرة الكبرى">القاهرة الكبرى (كافة الفروع)</option>
                  <option value="الشيخ زايد">الشيخ زايد وأكتوبر</option>
                  <option value="التجمع الخامس">التجمع الخامس والقاهرة الجديدة</option>
                  <option value="مطار القاهرة VIP">مطار القاهرة صالة كبار الزوار T3</option>
                  <option value="الساحل الشمالي">الساحل الشمالي ومارينا</option>
                </select>
              </div>
            </div>

            {/* Dates */}
            <div className="w-full lg:w-2/5 bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 flex items-center gap-3 text-right">
              <Calendar className="w-5 h-5 text-[#006B4D] shrink-0" />
              <div className="flex-1 flex gap-2">
                <div className="flex-1">
                  <span className="block text-[11px] font-bold text-slate-400">تاريخ الاستلام</span>
                  <input type="date" defaultValue="2026-10-15" className="w-full bg-transparent text-xs font-bold text-slate-900 outline-none" />
                </div>
                <div className="w-px bg-slate-300"></div>
                <div className="flex-1">
                  <span className="block text-[11px] font-bold text-slate-400">تاريخ التسليم</span>
                  <input type="date" defaultValue="2026-10-18" className="w-full bg-transparent text-xs font-bold text-slate-900 outline-none" />
                </div>
              </div>
            </div>

            {/* Keyword Search */}
            <div className="w-full lg:w-1/4 bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 flex items-center gap-3 text-right">
              <Search className="w-5 h-5 text-[#006B4D] shrink-0" />
              <div className="flex-1">
                <span className="block text-[11px] font-bold text-slate-400">البحث بالماركة أو الموديل</span>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="مثال: Porsche أو S-Class..." 
                  className="w-full bg-transparent text-xs md:text-sm font-bold text-slate-900 outline-none placeholder-slate-400"
                />
              </div>
            </div>

            {/* Search Button */}
            <button className="w-full lg:w-auto bg-[#006B4D] hover:bg-[#00533C] text-white px-8 py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shrink-0">
              <Search className="w-4 h-4" />
              <span>تحديث البحث</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Sidebar Filters + Cars Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Right Sidebar Filters in RTL */}
          <div className="w-full lg:w-72 shrink-0 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-right space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-bold text-[#006B4D] bg-[#E6F4EF] px-2.5 py-1 rounded-full">
                  {filteredFleet.length} سيارة متوفرة
                </span>
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#006B4D]" />
                  <span>تصفية النتائج</span>
                </h3>
              </div>

              {/* Price Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-extrabold text-[#006B4D]">{maxPrice.toLocaleString()} ج.م / يوم</span>
                  <label className="text-xs font-bold text-slate-700">الميزانية اليومية القصوى</label>
                </div>
                <input 
                  type="range" 
                  min="2000" 
                  max="25000" 
                  step="500" 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#006B4D] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-1">
                  <span>25,000+ ج.م</span>
                  <span>2,000 ج.م</span>
                </div>
              </div>

              {/* Category Pills */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-3">فئة السيارة</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: 'الكل' },
                    { id: 'سيدان', label: 'سيدان فاخرة' },
                    { id: 'دفع رباعي', label: 'دفع رباعي SUV' },
                    { id: 'كروس أوفر', label: 'كروس أوفر' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedCategory === cat.id 
                          ? 'bg-[#006B4D] text-white shadow-sm' 
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-3">الماركة العالمية</label>
                <div className="space-y-2.5">
                  {[
                    { id: 'all', label: 'كافة الماركات' },
                    { id: 'بورشه', label: 'بورشه (Porsche)' },
                    { id: 'مرسيدس', label: 'مرسيدس-بنز (Mercedes)' },
                    { id: 'بي إم', label: 'بي إم دبليو (BMW)' },
                    { id: 'تويوتا', label: 'تويوتا (Toyota)' },
                    { id: 'كيا', label: 'كيا (Kia)' }
                  ].map(brand => (
                    <label key={brand.id} className="flex items-center justify-between text-xs font-semibold text-slate-700 cursor-pointer hover:text-[#006B4D]">
                      <span className="text-slate-400 text-[10px]">متاح</span>
                      <div className="flex items-center gap-2">
                        <span>{brand.label}</span>
                        <input 
                          type="radio" 
                          name="brand" 
                          checked={selectedBrand === brand.id} 
                          onChange={() => setSelectedBrand(brand.id)}
                          className="accent-[#006B4D]" 
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Perks */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 mb-3">مزايا مشوار الحصرية</label>
                <div className="space-y-2 text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-2 text-[#006B4D]">
                    <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                    <span>تأمين شامل بدون مسؤولية مدنية</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#006B4D]">
                    <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                    <span>توصيل مجاني لباب البيت</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#006B4D]">
                    <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                    <span>بدون إيداع نقدي للعميل المعتمد</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Cars Grid */}
          <div className="flex-1">
            {filteredFleet.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm">
                <p className="text-slate-500 font-bold mb-4">لا توجد سيارات مطابقة لمعايير البحث الحالية.</p>
                <button 
                  onClick={() => { setSelectedBrand('all'); setSelectedCategory('all'); setMaxPrice(25000); setSearchQuery(''); }}
                  className="bg-[#006B4D] text-white px-6 py-2.5 rounded-xl font-bold text-xs"
                >
                  إعادة ضبط الفلاتر
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredFleet.map((car) => {
                  const isCompared = comparedCars.some(c => c.id === car.id);
                  const price = car.dailyPrice ?? car.pricePerDay ?? 0;
                  return (
                    <div 
                      key={car.id} 
                      className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-all overflow-hidden flex flex-col group text-right"
                    >
                      {/* Car Visual Area */}
                      <div className="relative h-60 bg-gradient-to-b from-slate-50 to-white p-4 flex items-center justify-center overflow-hidden">
                        {/* Top Badges */}
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                          <span className="bg-[#10B981]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                            متاحة فوراً
                          </span>
                          <span className="bg-slate-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-semibold">
                            {car.category || 'سيدان فاخرة'}
                          </span>
                        </div>

                        {/* Compare Checkbox Button */}
                        <button 
                          onClick={() => handleToggleCompare(car)}
                          className={`absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                            isCompared 
                              ? 'bg-[#006B4D] text-white shadow-sm' 
                              : 'bg-white/80 hover:bg-white text-slate-600 shadow-sm border border-slate-200'
                          }`}
                        >
                          <Check className={`w-3.5 h-3.5 ${isCompared ? 'opacity-100' : 'opacity-0'}`} />
                          <span>قارن</span>
                        </button>

                        {/* Image */}
                        <img 
                          src={car.images?.[0] || car.image || 'https://via.placeholder.com/600'} 
                          alt={`${car.brand} ${car.model}`}
                          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                        />
                      </div>

                      {/* Details Area */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-xl font-black text-slate-900 group-hover:text-[#006B4D] transition-colors">
                              {car.brand} {car.model}
                            </h3>
                            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60">
                              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                              <span className="text-xs font-black text-amber-800">{car.rating || 4.9}</span>
                            </div>
                          </div>
                          
                          <p className="text-xs text-slate-400 font-semibold mb-4">
                            موديل {car.year} • {car.dealershipName || 'معرض رويال كارز المعتمد'}
                          </p>

                          {/* Performance Tags */}
                          <div className="grid grid-cols-3 gap-2 bg-[#F8FAFC] p-3 rounded-2xl text-center text-xs font-bold text-slate-700 mb-4 border border-slate-100">
                            <div>
                              <span className="block text-[10px] text-slate-400">المسافة</span>
                              <span>{car.mileageLimit || '300 كم/يوم'}</span>
                            </div>
                            <div className="border-r border-slate-200">
                              <span className="block text-[10px] text-slate-400">ناقل الحركة</span>
                              <span className="truncate">{car.transmission?.split(' ')[0] || 'أوتوماتيك'}</span>
                            </div>
                            <div className="border-r border-slate-200">
                              <span className="block text-[10px] text-slate-400">الوقود</span>
                              <span>{car.fuel?.split(' ')[0] || 'بنزين 95'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Action & Price */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-[11px] font-bold text-slate-400 block">السعر اليومي</span>
                            <span className="text-2xl font-black text-[#006B4D]">{price.toLocaleString()} <span className="text-xs font-bold text-slate-600">ج.م / يوم</span></span>
                          </div>

                          <div className="flex gap-2">
                            <Link 
                              href={`/fleet/${car.id}`}
                              className="bg-[#006B4D] hover:bg-[#00533C] text-white px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                            >
                              <span>احجز الآن</span>
                              <ArrowLeft className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Floating Comparison Bar when 2+ cars are selected */}
      {comparedCars.length > 0 && (
        <div className="fixed bottom-6 inset-x-4 max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-md text-white rounded-3xl p-4 shadow-2xl border border-slate-700 z-50 flex items-center justify-between animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-[#10B981] bg-[#10B981]/20 px-3 py-1 rounded-full border border-[#10B981]/30">
              مقارنة السيارات ({comparedCars.length}/3)
            </span>
            <div className="flex items-center gap-3">
              {comparedCars.map(car => (
                <div key={car.id} className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl text-xs font-bold">
                  <span>{car.brand} {car.model}</span>
                  <button onClick={() => handleToggleCompare(car)} className="text-slate-400 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => alert(`مقارنة شاملة بين: ${comparedCars.map(c => c.brand + ' ' + c.model).join(' ضد ')}`)}
              className="bg-[#10B981] hover:bg-[#059669] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md transition-all"
            >
              عرض جدول المقارنة
            </button>
            <button 
              onClick={() => setComparedCars([])}
              className="text-xs text-slate-400 hover:text-white font-semibold"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
