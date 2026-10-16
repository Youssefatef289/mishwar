"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, ChevronDown, Phone, Mail, Car, Shield, 
  MapPin, Calendar, Clock, Search, ArrowLeft, Check
} from 'lucide-react';

export default function Navbar() {
  const [fleetDropdownOpen, setFleetDropdownOpen] = useState(false);
  const [modelDrawerOpen, setModelDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setFleetDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setFleetDropdownOpen(false);
    setModelDrawerOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const carModels = [
    { name: "مرسيدس C200", brand: "Mercedes", cat: "Luxury", year: "2024", price: "4,500 ج.م" },
    { name: "بي إم دبليو الفئة الخامسة", brand: "BMW", cat: "Luxury", year: "2024", price: "5,000 ج.م" },
    { name: "تويوتا كورولا", brand: "Toyota", cat: "Sedan", year: "2023", price: "1,500 ج.م" },
    { name: "هيونداي توسان", brand: "Hyundai", cat: "SUVs", year: "2024", price: "2,200 ج.م" },
    { name: "كيا سبورتاج", brand: "Kia", cat: "SUVs", year: "2024", price: "2,100 ج.م" },
    { name: "نيسان صني", brand: "Nissan", cat: "Sedan", year: "2023", price: "1,100 ج.م" },
    { name: "شيري تيجو 7 برو", brand: "Chery", cat: "SUVs", year: "2024", price: "1,800 ج.م" },
    { name: "إم جي 6", brand: "MG", cat: "Sedan", year: "2023", price: "1,400 ج.م" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* 
        دمج النافبار مع الهيرو (Overlay over Hero Video):
        موضع fixed في أعلى الصفحة، شفاف تماماً في البداية ليظهر فيديو الهيرو من تحته مباشرة 
      */}
      <header 
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#0B132B]/95 backdrop-blur-md border-b border-white/10' 
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
        }`} 
        dir="rtl"
      >
        {/* 1. TOP BAR (شريط الاتصال والسوشيال ميديا الشفاف فوق الهيرو) */}
        <div className={`transition-all duration-300 text-xs py-2 px-4 sm:px-8 border-b ${
          scrolled ? 'border-white/10 text-slate-300' : 'border-white/15 text-slate-200'
        }`}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            
            {/* Right: Phone & Email */}
            <div className="flex items-center gap-3 text-[11px] sm:text-xs order-2 sm:order-1">
              <span className="text-slate-300">هاتف:</span>
              <a href="tel:01008999980" className="text-white hover:text-[#00CF7B] font-bold transition-colors" dir="ltr">
                01008999980
              </a>
              <span className="text-white/40">/</span>
              <a href="mailto:info@rentexcars-eg.com" className="text-slate-200 hover:text-[#00CF7B] transition-colors" dir="ltr">
                info@rentexcars-eg.com
              </a>
            </div>

            {/* Left: Social Media Icons + Login / Register */}
            <div className="flex items-center gap-4 text-[11px] sm:text-xs order-1 sm:order-2">
              <div className="flex items-center gap-2">
                <Link href="/login" className="text-slate-200 hover:text-white font-semibold transition-colors">
                  دخول
                </Link>
                <span className="text-white/40">—</span>
                <Link href="/register" className="text-slate-200 hover:text-[#00CF7B] font-semibold transition-colors">
                  تسجيل
                </Link>
              </div>

              <span className="text-white/30">|</span>

              {/* Social Icons */}
              <div className="flex items-center gap-2.5 text-slate-300">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-[#00CF7B] transition-colors">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-[#00CF7B] transition-colors">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://wa.me/20100899980" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:text-[#00CF7B] transition-colors">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* 2. MAIN NAV BAR */}
        <div className={`transition-all duration-300 ${scrolled ? 'py-2.5' : 'py-3.5'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
            
            {/* RIGHT: Mishwar Brand Logo (اللوجو الجديد الشفاف بدون خلفية بيضاء) */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <img 
                src="/images/mishwar-logo-white.png" 
                alt="مشوار لتأجير السيارات - Mishwar" 
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            {/* CENTER: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-white">
              
              {/* الرئيسية */}
              <Link 
                href="/" 
                className={`transition-colors py-1 ${
                  isActive('/') 
                    ? 'text-[#E5A83B] border-b-2 border-[#E5A83B]' 
                    : 'hover:text-[#00CF7B]'
                }`}
              >
                الرئيسية
              </Link>

              {/* الاسطول Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setFleetDropdownOpen(!fleetDropdownOpen)}
                  className="flex items-center gap-1.5 hover:text-[#00CF7B] transition-colors py-1 cursor-pointer"
                >
                  <span>الاسطول</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${fleetDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {fleetDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-[#101A36]/95 border border-white/10 rounded-xl p-2 z-50 text-right backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link
                      href="/fleet"
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold text-white hover:bg-white/10 hover:text-[#00CF7B] transition-colors"
                      onClick={() => setFleetDropdownOpen(false)}
                    >
                      <span>جميع السيارات</span>
                      <Car className="w-4 h-4 text-slate-300" />
                    </Link>
                    <Link
                      href="/fleet?category=Luxury"
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-[#00CF7B] transition-colors"
                      onClick={() => setFleetDropdownOpen(false)}
                    >
                      <span>سيارات فاخرة (Luxury)</span>
                      <span className="w-2 h-2 rounded-full bg-[#E5A83B]" />
                    </Link>
                    <Link
                      href="/fleet?category=SUVs"
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-[#00CF7B] transition-colors"
                      onClick={() => setFleetDropdownOpen(false)}
                    >
                      <span>سيارات دفع رباعي (SUVs)</span>
                      <span className="w-2 h-2 rounded-full bg-[#00CF7B]" />
                    </Link>
                    <Link
                      href="/fleet?category=Sedan"
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-[#00CF7B] transition-colors"
                      onClick={() => setFleetDropdownOpen(false)}
                    >
                      <span>سيارات سيدان (Sedan)</span>
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                    </Link>
                  </div>
                )}
              </div>

              {/* من نحن */}
              <Link 
                href="/#about" 
                className="hover:text-[#00CF7B] transition-colors py-1"
              >
                من نحن
              </Link>

              {/* تتبع الحجز */}
              <Link 
                href="/my-bookings" 
                className="hover:text-[#00CF7B] transition-colors py-1"
              >
                تتبع الحجز
              </Link>

              {/* المدونة */}
              <Link 
                href="/#blog" 
                className="hover:text-[#00CF7B] transition-colors py-1"
              >
                المدونة
              </Link>

              {/* تواصل معنا */}
              <Link 
                href="/#contact" 
                className="hover:text-[#00CF7B] transition-colors py-1"
              >
                تواصل معنا
              </Link>
            </nav>

            {/* LEFT: "اختار الموديل" with Hamburger Icon */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setModelDrawerOpen(true)}
                className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all cursor-pointer group backdrop-blur-xs"
              >
                <div className="flex flex-col gap-1 w-4">
                  <span className="h-0.5 w-full bg-white group-hover:bg-[#00CF7B] transition-colors" />
                  <span className="h-0.5 w-3/4 bg-white group-hover:bg-[#00CF7B] transition-colors" />
                  <span className="h-0.5 w-full bg-white group-hover:bg-[#00CF7B] transition-colors" />
                </div>
                <span>اختار الموديل</span>
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
                aria-label="قائمة الموبايل"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0B132B] border-b border-white/10 px-6 py-6 text-right space-y-4">
            <Link 
              href="/" 
              className="block text-white font-bold text-base hover:text-[#00CF7B]"
              onClick={() => setMobileMenuOpen(false)}
            >
              الرئيسية
            </Link>
            <Link 
              href="/fleet" 
              className="block text-slate-300 font-semibold text-base hover:text-[#00CF7B]"
              onClick={() => setMobileMenuOpen(false)}
            >
              الاسطول
            </Link>
            <Link 
              href="/#about" 
              className="block text-slate-300 font-semibold text-base hover:text-[#00CF7B]"
              onClick={() => setMobileMenuOpen(false)}
            >
              من نحن
            </Link>
            <Link 
              href="/my-bookings" 
              className="block text-slate-300 font-semibold text-base hover:text-[#00CF7B]"
              onClick={() => setMobileMenuOpen(false)}
            >
              تتبع الحجز
            </Link>
            <Link 
              href="/#blog" 
              className="block text-slate-300 font-semibold text-base hover:text-[#00CF7B]"
              onClick={() => setMobileMenuOpen(false)}
            >
              المدونة
            </Link>
            <Link 
              href="/#contact" 
              className="block text-slate-300 font-semibold text-base hover:text-[#00CF7B]"
              onClick={() => setMobileMenuOpen(false)}
            >
              تواصل معنا
            </Link>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-sm">
              <Link href="/login" className="text-white hover:text-[#00CF7B] font-bold">
                تسجيل الدخول
              </Link>
              <Link href="/register" className="text-[#00CF7B] font-bold">
                إنشاء حساب جديد
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Model Selection Drawer / Modal */}
      {modelDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200" dir="rtl">
          <div className="bg-[#0F172A] border border-white/15 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col text-white">
            
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">اختار الموديل المفضل</h3>
                <p className="text-xs text-slate-400 mt-0.5">تصفح أشهر سيارات مشوار المتاحة للتأجير الفوري</p>
              </div>
              <button 
                type="button" 
                onClick={() => setModelDrawerOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Models Grid */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
              {carModels.map((car, index) => (
                <Link
                  key={index}
                  href={`/fleet?model=${encodeURIComponent(car.name)}`}
                  onClick={() => setModelDrawerOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-[#00CF7B]/15 border border-white/10 hover:border-[#00CF7B]/50 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#00CF7B] group-hover:bg-[#00CF7B] group-hover:text-black transition-colors">
                      <Car className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-[#00CF7B] transition-colors">{car.name}</div>
                      <div className="text-[11px] text-slate-400">{car.cat} • موديل {car.year}</div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-black text-[#00CF7B]">{car.price}</div>
                    <div className="text-[10px] text-slate-400">/ اليوم</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-black/40 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">جميع السيارات شاملة التأمين والصيانة</span>
              <Link
                href="/fleet"
                onClick={() => setModelDrawerOpen(false)}
                className="px-4 py-2 bg-[#00CF7B] hover:bg-[#00b66c] text-[#0A2A5E] font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>عرض الأسطول بالكامل</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
