"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Key, MapPin, Calendar, Clock, ChevronDown, Check, 
  Phone, MessageCircle, ShieldCheck, ArrowDown
} from 'lucide-react';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<'Luxury' | 'SUVs' | 'Sedan'>('Luxury');
  const [differentDropoff, setDifferentDropoff] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('فرع شيراتون المطار');
  const [dropoffLocation, setDropoffLocation] = useState('فرع شيراتون المطار');
  const [pickupDate, setPickupDate] = useState('2026-10-15');
  const [returnDate, setReturnDate] = useState('2026-10-18');
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnTime, setReturnTime] = useState('10:00');

  const branches = [
    'فرع شيراتون المطار',
    'فرع التجمع الخامس (شارع التسعين)',
    'فرع الشيخ زايد (هايبر وان)',
    'فرع ٦ أكتوبر (الحصري)'
  ];

  const scrollToBooking = () => {
    const el = document.getElementById('quick-booking-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col justify-between overflow-hidden " dir="rtl">
      
      {/* 1. BACKGROUND VIDEO (مع فيديو hero.mp4 يمتد خلف النافبار تماماً بدون شادو) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-cars.webp"
          className="w-full h-full object-cover scale-105"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark Vignette Overlay for readability without shadows */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B132B]/80 via-[#0B132B]/50 to-[#0B132B]/90" />
      </div>

      {/* 2. CENTER CONTENT (بدون أي شادو كما طُلب: مسح الشادو في الهيرو) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-36 sm:pt-44 lg:pt-48 pb-10 flex flex-col items-center text-center flex-1 justify-center">
        
        {/* Main Headline (بدون drop-shadow) */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 sm:mb-8">
          مشوار لتأجير السيارات
        </h1>

        {/* Circular CTA Button (الدائرة الحمراء مع المفتاح - بدون شادو) */}
        <div className="mb-6 group">
          <button
            type="button"
            onClick={scrollToBooking}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-red-500/80 hover:border-[#00CF7B] bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center text-white transition-all duration-300 transform group-hover:scale-105 group-hover:bg-[#00CF7B]/10 cursor-pointer"
            aria-label="احجز الان"
          >
            {/* Car Key Icon */}
            <svg 
              className="w-6 h-6 sm:w-7 sm:h-7 text-red-500 group-hover:text-[#00CF7B] transition-colors mb-1" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.8" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="7.5" cy="15.5" r="5.5" />
              <path d="m21 2-9.6 9.6" />
              <path d="m15.5 7.5 3 3L22 7l-3-3" />
            </svg>
            <span className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-[#00CF7B] transition-colors">
              احجز الان
            </span>
          </button>
        </div>

        {/* Subtitle (بدون drop-shadow) */}
        <p className="text-sm sm:text-lg font-semibold text-slate-200 max-w-xl">
          استمتع بأسهل إجراءات للتأجير بالسائق أو بدون.
        </p>

      </div>

      {/* 3. BOOKING OVERLAY CARD (كارت الحجز السفلي بدون شادو) */}
      <div id="quick-booking-card" className="relative z-20 max-w-5xl mx-auto px-4 w-full -mb-6 sm:-mb-8">
        
        {/* Vehicle Category Pills (Luxury | SUVs | Sedan) */}
        <div className="flex justify-center items-center gap-2 mb-[-1px]">
          <div className="inline-flex bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-t-xl border-t border-x border-slate-300 gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('Luxury')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'Luxury'
                  ? 'bg-[#0B132B] text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Luxury
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('SUVs')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'SUVs'
                  ? 'bg-[#0B132B] text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              SUVs
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('Sedan')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'Sedan'
                  ? 'bg-[#0B132B] text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Sedan
            </button>
          </div>
        </div>

        {/* Booking Form Card (بدون shadow-2xl / حد رمادي نظيف) */}
        <div className="bg-white rounded-2xl border border-slate-300 p-5 sm:p-7">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `/fleet?category=${activeTab}&pickup=${encodeURIComponent(pickupLocation)}`;
            }}
            className="space-y-4"
          >
            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Pickup Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#00CF7B]" />
                  <span>موقع الاستلام</span>
                </label>
                <div className="relative">
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 focus:border-[#00CF7B] focus:ring-1 focus:ring-[#00CF7B] transition-all cursor-pointer"
                  >
                    {branches.map((b, i) => (
                      <option key={i} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Drop-off Location */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    <span>موقع التسليم</span>
                  </label>
                  <label className="flex items-center gap-1 text-[10px] text-slate-500 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={differentDropoff}
                      onChange={(e) => setDifferentDropoff(e.target.checked)}
                      className="rounded text-[#00CF7B] focus:ring-[#00CF7B] w-3 h-3"
                    />
                    <span>فرع آخر</span>
                  </label>
                </div>
                <select
                  disabled={!differentDropoff}
                  value={differentDropoff ? dropoffLocation : pickupLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  className={`w-full border rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 transition-all ${
                    differentDropoff 
                      ? 'bg-slate-50 border-slate-300 focus:border-[#00CF7B] cursor-pointer' 
                      : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {branches.map((b, i) => (
                    <option key={i} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Pickup Date & Time */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#00CF7B]" />
                  <span>تاريخ ووقت الاستلام</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2 py-2 text-xs font-semibold text-slate-900 focus:border-[#00CF7B]"
                  />
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2 py-2 text-xs font-semibold text-slate-900 focus:border-[#00CF7B]"
                  />
                </div>
              </div>

              {/* Return Date & Time */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>تاريخ ووقت التسليم</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2 py-2 text-xs font-semibold text-slate-900 focus:border-[#00CF7B]"
                  />
                  <input
                    type="time"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2 py-2 text-xs font-semibold text-slate-900 focus:border-[#00CF7B]"
                  />
                </div>
              </div>

            </div>

            {/* Submit Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs text-slate-600 font-semibold">
                <span className="flex items-center gap-1 text-[#00CF7B]">
                  <Check className="w-4 h-4" />
                  تأمين شامل بدون دفعة مقدمة
                </span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="hidden sm:inline">إلغاء مجاني حتى 24 ساعة</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-[#00CF7B] hover:bg-[#00b66c] text-[#0B132B] font-extrabold text-sm rounded-xl transition-all border border-[#00CF7B] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>احجز الآن في {activeTab}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* 4. FLOATING BUTTONS (بدون شادو مع حدود نظيفة) */}
      
      {/* Bottom-Left: Language Switcher Pill */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          type="button"
          className="flex items-center gap-1.5 bg-white text-slate-800 text-xs font-extrabold px-3 py-2 rounded-xl border border-slate-300 transition-all cursor-pointer hover:bg-slate-50"
          aria-label="تغيير اللغة"
        >
          <span>AR</span>
          <span>🇪🇬</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </button>
      </div>

      {/* Bottom-Right: Phone & WhatsApp Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-center">
        
        {/* Floating Call Button */}
        <a
          href="tel:01008999980"
          className="w-12 h-12 rounded-full bg-[#E63946] hover:bg-[#d62828] text-white flex items-center justify-center border-2 border-white hover:scale-105 transition-transform cursor-pointer"
          aria-label="اتصل بنا"
        >
          <Phone className="w-5 h-5 fill-current" />
        </a>

        {/* Floating WhatsApp Button with Official Icon and Badge 1 */}
        <a
          href="https://wa.me/20100899980"
          target="_blank"
          rel="noreferrer"
          className="relative w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white flex items-center justify-center border-2 border-white hover:scale-105 transition-transform cursor-pointer"
          aria-label="تواصل عبر واتساب"
        >
          {/* Official WhatsApp Icon */}
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.11L7.81 18.94L4.7 19.76L5.53 16.73L5.34 16.43C4.56 15.19 4.15 13.57 4.15 11.91C4.15 7.37 7.85 3.67 12.04 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.88 7.9 12.04 8.02 12.2C8.14 12.37 9.74 14.85 12.19 15.91C12.78 16.16 13.23 16.32 13.59 16.43C14.18 16.62 14.72 16.59 15.14 16.53C15.62 16.46 16.61 15.93 16.81 15.36C17.02 14.78 17.02 14.29 16.96 14.18C16.9 14.08 16.74 14.02 16.5 13.9C16.26 13.78 15.07 13.2 14.85 13.12C14.63 13.04 14.47 13 14.31 13.25C14.15 13.49 13.68 14.08 13.53 14.24C13.39 14.41 13.24 14.43 13 14.31C12.76 14.19 11.98 13.93 11.06 13.11C10.34 12.47 9.85 11.68 9.71 11.44C9.57 11.2 9.69 11.07 9.81 10.95C9.92 10.84 10.06 10.66 10.18 10.52C10.3 10.38 10.34 10.28 10.42 10.12C10.5 9.96 10.46 9.82 10.4 9.7C10.34 9.58 9.87 8.42 9.67 7.94C9.48 7.47 9.28 7.53 9.13 7.53H8.53V7.33Z"/>
          </svg>
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-white">
            1
          </span>
        </a>

      </div>

    </section>
  );
}
