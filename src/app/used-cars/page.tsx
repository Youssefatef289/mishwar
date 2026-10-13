"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, Bookmark, LayoutGrid, List, ArrowUpDown, Heart, 
  ArrowLeftRight, Eye, MapPin, ChevronLeft, SlidersHorizontal, 
  X, Check, RotateCcw
} from 'lucide-react';

interface UsedCar {
  id: string;
  title: string;
  subtitle?: string;
  year: number;
  image: string;
  mileage: string;
  bodyType: string;
  fuel: string;
  transmission: string;
  location: string;
  negotiable?: boolean;
  price: number;
  views: number;
  brand: string;
}

const USED_CARS_DATA: UsedCar[] = [
  {
    id: 'hyundai-elantra-2022',
    title: 'هيونداي النترا HD 2022',
    year: 2022,
    brand: 'هيونداي',
    image: '/images/car.webp',
    mileage: '95,000 كم',
    bodyType: 'سيدان',
    fuel: 'بنزين',
    transmission: 'أوتوماتيك',
    location: 'القاهرة الجديدة',
    price: 850000,
    views: 4120,
  },
  {
    id: 'renault-duster-2022',
    title: 'رينو داستر 2022',
    year: 2022,
    brand: 'رينو',
    image: '/images/carDesktopView.webp',
    mileage: '160,000 كم',
    bodyType: 'هاتشباك',
    fuel: 'بنزين',
    transmission: 'أوتوماتيك',
    location: 'مصر الجديدة',
    negotiable: true,
    price: 670000,
    views: 3540,
  },
  {
    id: 'chery-envy-2018',
    title: 'شيري انفي 2018',
    year: 2018,
    brand: 'شيري',
    image: '/images/fiat-tipo-featured.webp',
    mileage: '248,000 كم',
    bodyType: 'سيدان',
    fuel: 'بنزين',
    transmission: 'يدوي',
    location: 'القاهرة الجديدة',
    negotiable: true,
    price: 290000,
    views: 2890,
  },
  {
    id: 'jeep-grand-cherokee-2024',
    title: 'Jeep جراند شيروكي 2024',
    subtitle: 'Limited 4x4',
    year: 2024,
    brand: 'جيب',
    image: '/images/how-it-works-car.webp',
    mileage: '12,000 كم',
    bodyType: 'SUV',
    fuel: 'بنزين',
    transmission: 'أوتوماتيك',
    location: 'مدينة نصر',
    price: 4800000,
    views: 6430,
  },
  {
    id: 'suzuki-alto-2008',
    title: 'سوزوكي ألتو 2008',
    year: 2008,
    brand: 'سوزوكي',
    image: '/images/car.webp',
    mileage: '173,000 كم',
    bodyType: 'هاتشباك',
    fuel: 'بنزين',
    transmission: 'يدوي',
    location: 'المقطم',
    price: 180000,
    views: 1950,
  },
  {
    id: 'jac-j7-2022',
    title: 'JAC J7 2022',
    subtitle: 'ULTIMATE',
    year: 2022,
    brand: 'JAC',
    image: '/images/carDesktopView.webp',
    mileage: '115,000 كم',
    bodyType: 'سيدان',
    fuel: 'بنزين',
    transmission: 'أوتوماتيك',
    location: 'الإسماعيلية',
    price: 650000,
    views: 2340,
  },
];

// Brand circle options matching specification
const BRAND_CIRCLES = [
  { name: 'تويوتا', logo: null, symbol: 'TOY' },
  { name: 'هيونداي', logo: '/images/Hyundai.webp', symbol: 'HYU' },
  { name: 'كيا', logo: '/images/Kia.webp', symbol: 'KIA' },
  { name: 'نيسان', logo: '/images/Nissan.webp', symbol: 'NIS' },
  { name: 'شيفروليه', logo: null, symbol: 'CHV' },
  { name: 'فولكس فاجن', logo: '/images/Volkswagen.webp', symbol: 'VW' },
  { name: 'سكودا', logo: null, symbol: 'SKO' },
  { name: 'مرسيدس', logo: '/images/Mercedes-Benz.webp', symbol: 'MB' },
  { name: 'بي إم دبليو', logo: '/images/BMW.webp', symbol: 'BMW' },
  { name: 'أودي', logo: null, symbol: 'AUD' },
  { name: 'مازدا', logo: null, symbol: 'MZD' },
  { name: 'هوندا', logo: null, symbol: 'HND' },
  { name: 'ميتسوبيشي', logo: null, symbol: 'MIT' },
  { name: 'سوزوكي', logo: null, symbol: 'SUZ' },
  { name: 'رينو', logo: '/images/Renault.webp', symbol: 'REN' },
];

export default function UsedCarsPage() {
  // Filter States
  const [searchBrand, setSearchBrand] = useState('');
  const [searchModel, setSearchModel] = useState('');
  const [selectedFuel, setSelectedFuel] = useState<string | null>(null);
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null);
  const [selectedTransmission, setSelectedTransmission] = useState<string | null>(null);
  const [selectedMileage, setSelectedMileage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedBrandCircle, setSelectedBrandCircle] = useState<string | null>(null);

  // View & UI States
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'views'>('featured');
  const [savedSearch, setSavedSearch] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compared, setCompared] = useState<string[]>([]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleCompare = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setCompared(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleClearAll = () => {
    setSearchBrand('');
    setSearchModel('');
    setSelectedFuel(null);
    setSelectedBodyType(null);
    setSelectedTransmission(null);
    setSelectedMileage(null);
    setSelectedColor(null);
    setSelectedBrandCircle(null);
  };

  // Filter & Sort Logic
  const filteredCars = useMemo(() => {
    return USED_CARS_DATA.filter(car => {
      if (searchBrand && !car.title.toLowerCase().includes(searchBrand.toLowerCase()) && !car.brand.toLowerCase().includes(searchBrand.toLowerCase())) {
        return false;
      }
      if (searchModel && !car.title.toLowerCase().includes(searchModel.toLowerCase())) {
        return false;
      }
      if (selectedBrandCircle && !car.title.toLowerCase().includes(selectedBrandCircle.toLowerCase()) && !car.brand.toLowerCase().includes(selectedBrandCircle.toLowerCase())) {
        return false;
      }
      if (selectedFuel && car.fuel !== selectedFuel) {
        return false;
      }
      if (selectedBodyType && car.bodyType !== selectedBodyType) {
        return false;
      }
      if (selectedTransmission && car.transmission !== selectedTransmission) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'views') return b.views - a.views;
      return 0;
    });
  }, [searchBrand, searchModel, selectedBrandCircle, selectedFuel, selectedBodyType, selectedTransmission, sortBy]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-6 sm:py-8 text-right font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Top Right: "الرئيسية > سيارات مستعملة" */}
        <nav className="flex items-center gap-1.5 text-xs text-[#2B3990] font-medium mb-6">
          <Link href="/" className="hover:underline">
            الرئيسية
          </Link>
          <span className="text-slate-400">&gt;</span>
          <span className="text-slate-700 font-bold">سيارات مستعملة</span>
        </nav>

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-4 flex items-center justify-between bg-white p-3.5 rounded-[10px] border border-[#E3E5EA] shadow-xs">
          <div className="text-sm font-bold text-slate-800">
            نتائج البحث : <span className="text-[#2B3990] font-black">{filteredCars.length.toLocaleString()}</span>
          </div>
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-1.5 bg-[#0B9A5B] text-white px-4 py-2 rounded-[6px] text-xs font-bold shadow-xs active:scale-95"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>تصفية النتائج</span>
          </button>
        </div>

        {/* 2-Column Grid Layout: Sidebar on Right (~320px), Results on Left */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* ==================== 1. SIDEBAR FILTERS (Right Side) ==================== */}
          <aside className={`
            w-full lg:w-[320px] shrink-0 bg-white rounded-[12px] border border-[#E3E5EA] p-5 shadow-xs
            ${mobileFilterOpen ? 'fixed inset-0 z-50 overflow-y-auto m-0 rounded-none p-6' : 'hidden lg:block'}
          `}>
            
            {/* Sidebar Header: "تصفية النتائج" on Right, "مسح الكل" on Left */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E3E5EA]">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-slate-900">تصفية النتائج</h2>
                {mobileFilterOpen && (
                  <button 
                    onClick={() => setMobileFilterOpen(false)}
                    className="lg:hidden text-slate-400 hover:text-slate-700 p-1 mr-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={handleClearAll}
                className="text-xs font-bold text-[#2B3990] underline hover:opacity-80 transition-opacity"
              >
                مسح الكل
              </button>
            </div>

            {/* Filter: الماركة */}
            <div className="py-4 border-b border-[#E3E5EA]">
              <label className="block text-sm font-bold text-slate-900 mb-2">
                الماركة
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchBrand}
                  onChange={(e) => setSearchBrand(e.target.value)}
                  placeholder="ابحث"
                  className="w-full bg-[#F3F4F6] text-xs font-medium text-slate-800 rounded-[6px] py-2.5 pr-8 pl-3 outline-none border border-transparent focus:border-[#2B3990] transition-colors"
                />
                <Search className="w-4 h-4 text-slate-400 absolute top-3 right-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Filter: الموديل */}
            <div className="py-4 border-b border-[#E3E5EA]">
              <label className="block text-sm font-bold text-slate-900 mb-2">
                الموديل
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchModel}
                  onChange={(e) => setSearchModel(e.target.value)}
                  placeholder="ابحث"
                  className="w-full bg-[#F3F4F6] text-xs font-medium text-slate-800 rounded-[6px] py-2.5 pr-8 pl-3 outline-none border border-transparent focus:border-[#2B3990] transition-colors"
                />
                <Search className="w-4 h-4 text-slate-400 absolute top-3 right-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Filter: الوقود */}
            <div className="py-4 border-b border-[#E3E5EA]">
              <label className="block text-sm font-bold text-slate-900 mb-2">
                الوقود
              </label>
              <div className="flex flex-wrap gap-2">
                {['بنزين', 'ديزل', 'هايبرد', 'كهربائية'].map((item) => {
                  const isSelected = selectedFuel === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSelectedFuel(isSelected ? null : item)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-[6px] transition-colors ${
                        isSelected 
                          ? 'bg-[#2B3990] text-white' 
                          : 'bg-[#F3F4F6] text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter: نوع الهيكل */}
            <div className="py-4 border-b border-[#E3E5EA]">
              <label className="block text-sm font-bold text-slate-900 mb-2">
                نوع الهيكل
              </label>
              <div className="flex flex-wrap gap-2">
                {['SUV', 'سيدان', 'هاتشباك', 'نقل', 'فولج كار', 'أخرى'].map((item) => {
                  const isSelected = selectedBodyType === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSelectedBodyType(isSelected ? null : item)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-[6px] transition-colors ${
                        isSelected 
                          ? 'bg-[#2B3990] text-white' 
                          : 'bg-[#F3F4F6] text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter: ناقل الحركة */}
            <div className="py-4 border-b border-[#E3E5EA]">
              <label className="block text-sm font-bold text-slate-900 mb-2">
                ناقل الحركة
              </label>
              <div className="flex flex-wrap gap-2">
                {['أوتوماتيك', 'يدوي', 'CVT'].map((item) => {
                  const isSelected = selectedTransmission === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSelectedTransmission(isSelected ? null : item)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-[6px] transition-colors ${
                        isSelected 
                          ? 'bg-[#2B3990] text-white' 
                          : 'bg-[#F3F4F6] text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter: الكيلومترات */}
            <div className="py-4 border-b border-[#E3E5EA]">
              <label className="block text-sm font-bold text-slate-900 mb-2">
                الكيلومترات
              </label>
              <div className="flex flex-wrap gap-2">
                {['حتى ٢٠ ألف كم', 'حتى ٥٠ ألف كم', 'حتى ١٠٠ ألف كم', 'حتى ١٥٠ ألف كم', 'حتى ٢٠٠ ألف كم'].map((item) => {
                  const isSelected = selectedMileage === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSelectedMileage(isSelected ? null : item)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-[6px] transition-colors ${
                        isSelected 
                          ? 'bg-[#2B3990] text-white' 
                          : 'bg-[#F3F4F6] text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter: اللون (Cut off at bottom in reference screenshot) */}
            <div className="pt-4">
              <label className="block text-sm font-bold text-slate-900 mb-2">
                اللون
              </label>
              <div className="flex flex-wrap gap-2">
                {['أبيض', 'أسود', 'فضي', 'رمادي', 'أزرق', 'أحمر'].map((item) => {
                  const isSelected = selectedColor === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSelectedColor(isSelected ? null : item)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-[6px] transition-colors ${
                        isSelected 
                          ? 'bg-[#2B3990] text-white' 
                          : 'bg-[#F3F4F6] text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Apply Button */}
            {mobileFilterOpen && (
              <div className="mt-8 pt-4 border-t border-[#E3E5EA]">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full h-[48px] bg-[#0B9A5B] text-white font-bold rounded-[6px] flex items-center justify-center text-sm shadow-sm"
                >
                  تطبيق الفلاتر ({filteredCars.length})
                </button>
              </div>
            )}

          </aside>

          {/* ==================== 2. RESULTS AREA (Left Side) ==================== */}
          <main className="flex-1 min-w-0 w-full">
            
            {/* Results Top Row: Count on Right, Actions on Left */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 bg-white p-3.5 sm:px-4 rounded-[10px] border border-[#E3E5EA] shadow-xs">
              
              {/* Right: Search Results Count */}
              <div className="text-sm sm:text-base font-extrabold text-slate-900">
                نتائج البحث : <span className="text-[#2B3990]">1,048</span>
              </div>

              {/* Left: Action Buttons */}
              <div className="flex items-center gap-2">
                
                {/* "حفظ البحث" Button: Navy outline with Bookmark icon */}
                <button
                  type="button"
                  onClick={() => setSavedSearch(!savedSearch)}
                  className={`h-9 px-3 rounded-[6px] border border-[#0A2A5E] text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    savedSearch ? 'bg-[#0A2A5E] text-white' : 'text-[#0A2A5E] hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${savedSearch ? 'fill-white' : ''}`} />
                  <span>حفظ البحث</span>
                </button>

                {/* View Mode Toggle (Grid / List) */}
                <div className="flex items-center border border-[#E3E5EA] rounded-[6px] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`h-9 px-2.5 flex items-center justify-center transition-colors ${
                      viewMode === 'grid' ? 'bg-slate-100 text-[#2B3990]' : 'bg-white text-slate-400 hover:text-slate-600'
                    }`}
                    title="عرض شبكي"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`h-9 px-2.5 flex items-center justify-center transition-colors ${
                      viewMode === 'list' ? 'bg-slate-100 text-[#2B3990]' : 'bg-white text-slate-400 hover:text-slate-600'
                    }`}
                    title="عرض طولي"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort Control */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="h-9 pr-7 pl-3 rounded-[6px] border border-[#E3E5EA] bg-white text-xs font-bold text-slate-700 outline-none cursor-pointer hover:border-slate-300"
                  >
                    <option value="featured">الترتيب: الأحدث</option>
                    <option value="price-asc">السعر: من الأقل للأعلى</option>
                    <option value="price-desc">السعر: من الأعلى للأقل</option>
                    <option value="views">الأكثر مشاهدة</option>
                  </select>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute top-2.5 right-2 pointer-events-none" />
                </div>

              </div>

            </div>

            {/* Circular Horizontal Scrollable Brand Bar (Diameter ~48px) */}
            <div 
              className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-none mb-6"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {BRAND_CIRCLES.map((brand, idx) => {
                const isActive = selectedBrandCircle === brand.name;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedBrandCircle(isActive ? null : brand.name)}
                    title={brand.name}
                    className={`w-12 h-12 rounded-full border shrink-0 bg-white flex items-center justify-center p-2 shadow-xs transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? 'border-[#0B9A5B] ring-2 ring-[#0B9A5B]/30' 
                        : 'border-[#E3E5EA] hover:border-[#0B9A5B] hover:scale-105'
                    }`}
                  >
                    {brand.logo ? (
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-[11px] font-black text-slate-700 select-none">
                        {brand.symbol}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Brand Filter Notice */}
            {selectedBrandCircle && (
              <div className="flex items-center gap-2 mb-4 bg-[#EEF0FF] text-[#2B3990] px-3 py-1.5 rounded-[6px] text-xs font-bold self-start inline-flex">
                <span>تصفية حسب: {selectedBrandCircle}</span>
                <button 
                  onClick={() => setSelectedBrandCircle(null)} 
                  className="hover:opacity-75"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* 3-Column Cars Grid (gap ~18px) */}
            <div className={`
              ${viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[18px]' 
                : 'flex flex-col gap-4'
              }
            `}>
              {filteredCars.map((car) => {
                const isFav = favorites.includes(car.id);
                const isComp = compared.includes(car.id);

                return (
                  <div
                    key={car.id}
                    className={`bg-white rounded-[10px] border border-[#E3E5EA] shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex ${
                      viewMode === 'grid' ? 'flex-col' : 'flex-col sm:flex-row'
                    } group`}
                  >
                    
                    {/* Top Car Image Showcase (~300x155) */}
                    <div className={`relative bg-[#F9FAFB] flex items-center justify-center overflow-hidden border-b border-[#F0F2F5] ${
                      viewMode === 'grid' ? 'h-[155px] w-full' : 'h-[180px] sm:w-[260px] shrink-0'
                    }`}>
                      
                      {/* Top Right (in RTL): Badge "إعلان" with view count & eye icon */}
                      <div className="absolute top-2.5 right-2.5 z-10 bg-slate-900/75 backdrop-blur-xs text-white px-2 py-0.5 rounded-[4px] text-[10px] font-bold flex items-center gap-1 shadow-xs">
                        <span className="bg-[#0B9A5B] text-white px-1 py-0.2 rounded-[2px] text-[9px] font-black">
                          إعلان
                        </span>
                        <Eye className="w-3 h-3 text-slate-300 mr-0.5" />
                        <span>{car.views.toLocaleString()}</span>
                      </div>

                      {/* Top Left (in RTL): Heart & Compare Buttons */}
                      <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
                        {/* Compare Button with background #2B3990 & white icon */}
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

                        {/* White Square Heart Button */}
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

                      {/* Car Image */}
                      <img
                        src={car.image}
                        alt={car.title}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        {/* Title: Bold aligned right */}
                        <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-[#0B9A5B] transition-colors leading-tight">
                          {car.title}
                        </h3>

                        {/* Optional Subtitle (e.g. "Limited 4x4" / "ULTIMATE") */}
                        {car.subtitle && (
                          <p className="text-[11px] font-bold text-[#6B7280] mt-0.5">
                            {car.subtitle}
                          </p>
                        )}

                        {/* Tags Row: Mileage, Body Type, Fuel, Transmission */}
                        <div className="flex flex-wrap items-center gap-1 mt-2.5">
                          <span className="bg-[#EEF0FF] text-[#2B3990] text-[10px] font-semibold px-2 py-0.5 rounded-[4px]">
                            {car.mileage}
                          </span>
                          <span className="bg-[#EEF0FF] text-[#2B3990] text-[10px] font-semibold px-2 py-0.5 rounded-[4px]">
                            {car.bodyType}
                          </span>
                          <span className="bg-[#EEF0FF] text-[#2B3990] text-[10px] font-semibold px-2 py-0.5 rounded-[4px]">
                            {car.fuel}
                          </span>
                          <span className="bg-[#EEF0FF] text-[#2B3990] text-[10px] font-semibold px-2 py-0.5 rounded-[4px]">
                            {car.transmission}
                          </span>
                        </div>

                        {/* Location & "قابل للتفاوض" Badge */}
                        <div className="flex items-center justify-between mt-2.5 pt-1 text-[11px]">
                          <div className="flex items-center gap-1 text-[#6B7280]">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{car.location}</span>
                          </div>

                          {car.negotiable && (
                            <span className="bg-[#F3F4F6] text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-[4px]">
                              قابل للتفاوض
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Footer: Thin Separator, Price #2B3990 & "قسطها مع الليثي" */}
                      <div className="pt-2.5 border-t border-[#E3E5EA] flex items-center justify-between">
                        <div>
                          <span className="text-base font-black text-[#2B3990]">
                            ج.م {car.price.toLocaleString()}
                          </span>
                        </div>

                        <Link
                          href="/fleet"
                          className="flex items-center gap-0.5 text-[11px] font-bold text-[#2B3990] hover:underline"
                        >
                          <span>قسطها مع الليثي</span>
                          <ChevronLeft className="w-3 h-3" />
                        </Link>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

            {/* Empty State if filter leaves no cars */}
            {filteredCars.length === 0 && (
              <div className="bg-white rounded-[12px] border border-[#E3E5EA] p-12 text-center my-6">
                <RotateCcw className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                <h3 className="font-bold text-slate-800 text-base mb-1">لا توجد نتائج مطابقة لبحثك</h3>
                <p className="text-xs text-slate-500 mb-4">جرب مسح بعض الفلاتر لعرض مزيد من السيارات</p>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="bg-[#2B3990] text-white px-5 py-2 rounded-[6px] text-xs font-bold"
                >
                  مسح جميع الفلاتر
                </button>
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
}

