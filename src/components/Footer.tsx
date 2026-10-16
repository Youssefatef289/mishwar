"use client";
import React from 'react';
import Link from 'next/link';
import { 
  Phone, Mail, MapPin, ShieldCheck, Heart, 
  ArrowUpLeft, Globe, Clock, Car, MessageCircle 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0B132B] text-slate-300 border-t border-slate-800 pt-16 pb-8 text-right" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Mishwar Logo in Footer (اللوجو الجديد الشفاف) */}
            <Link href="/" className="inline-block group">
              <img 
                src="/images/mishwar-logo-white.png" 
                alt="مشوار لتأجير السيارات - Mishwar" 
                className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </Link>

            <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-sm">
              المنصة المصرية المعتمدة لتأجير السيارات الفاخرة والعائلية بالسائق أو بدون، مع عقود إلكترونية موحدة موثقة وتغطية تأمينية شاملة.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs font-bold text-[#00CF7B]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>عقود وتأمين شامل معتمد</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs font-bold text-slate-300">
                <Globe className="w-3.5 h-3.5" />
                <span>جمهورية مصر العربية</span>
              </span>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#00CF7B] hover:text-[#0B132B] border border-white/10 flex items-center justify-center transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#00CF7B] hover:text-[#0B132B] border border-white/10 flex items-center justify-center transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://wa.me/20100899980" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#25D366] hover:text-white border border-white/10 flex items-center justify-center transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.11L7.81 18.94L4.7 19.76L5.53 16.73L5.34 16.43C4.56 15.19 4.15 13.57 4.15 11.91C4.15 7.37 7.85 3.67 12.04 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.88 7.9 12.04 8.02 12.2C8.14 12.37 9.74 14.85 12.19 15.91C12.78 16.16 13.23 16.32 13.59 16.43C14.18 16.62 14.72 16.59 15.14 16.53C15.62 16.46 16.61 15.93 16.81 15.36C17.02 14.78 17.02 14.29 16.96 14.18C16.9 14.08 16.74 14.02 16.5 13.9C16.26 13.78 15.07 13.2 14.85 13.12C14.63 13.04 14.47 13 14.31 13.25C14.15 13.49 13.68 14.08 13.53 14.24C13.39 14.41 13.24 14.43 13 14.31C12.76 14.19 11.98 13.93 11.06 13.11C10.34 12.47 9.85 11.68 9.71 11.44C9.57 11.2 9.69 11.07 9.81 10.95C9.92 10.84 10.06 10.66 10.18 10.52C10.3 10.38 10.34 10.28 10.42 10.12C10.5 9.96 10.46 9.82 10.4 9.7C10.34 9.58 9.87 8.42 9.67 7.94C9.48 7.47 9.28 7.53 9.13 7.53H8.53V7.33Z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-white">روابط سريعة</h3>
            <ul className="space-y-2 text-xs font-bold text-slate-400">
              <li>
                <Link href="/" className="hover:text-[#00CF7B] transition-colors flex items-center gap-1">
                  <span>الرئيسية</span>
                </Link>
              </li>
              <li>
                <Link href="/fleet" className="hover:text-[#00CF7B] transition-colors flex items-center gap-1">
                  <span>تصفح أسطول السيارات</span>
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="hover:text-[#00CF7B] transition-colors flex items-center gap-1">
                  <span>تتبع الحجز والرحلات</span>
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-[#00CF7B] transition-colors flex items-center gap-1">
                  <span>من نحن</span>
                </Link>
              </li>
              <li>
                <Link href="/used-cars" className="hover:text-[#00CF7B] transition-colors flex items-center gap-1">
                  <span>سيارات مستعملة للبيع</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Branches & Support */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-white">الفروع والدعم 24/7</h3>
            <ul className="space-y-2 text-xs font-bold text-slate-400">
              <li className="flex items-center gap-2 text-[#00CF7B]">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:01008999980" className="font-extrabold text-sm" dir="ltr">01008999980</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <a href="mailto:info@rentexcars-eg.com" dir="ltr" className="hover:text-white">info@rentexcars-eg.com</a>
              </li>
              <li className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>فرع شيراتون المطار - النزهة</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>فرع التجمع الخامس - التسعين الشمالي</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>فرع الشيخ زايد - محور 26 يوليو</span>
              </li>
            </ul>
          </div>

          {/* Working Hours & Payment */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-white">مواعيد العمل والدفع</h3>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-[#00CF7B]" />
                <span>الخدمة مستمرة 24 ساعة / 7 أيام</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                خدمة استلام وتسليم السيارات متاحة على مدار الساعة بجميع الفروع وفي مطار القاهرة الدولي.
              </p>
              
              <div className="pt-2">
                <div className="text-[11px] font-bold text-slate-300 mb-1.5">وسائل الدفع المقبولة:</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-white/10 px-2 py-1 rounded text-[10px] text-white">Visa</span>
                  <span className="bg-white/10 px-2 py-1 rounded text-[10px] text-white">Mastercard</span>
                  <span className="bg-white/10 px-2 py-1 rounded text-[10px] text-white">ميزة</span>
                  <span className="bg-white/10 px-2 py-1 rounded text-[10px] text-white">فودافون كاش</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 مشوار لتأجير السيارات (Mishwar). جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">سياسة الخصوصية</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">شروط وأحكام التأجير</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
