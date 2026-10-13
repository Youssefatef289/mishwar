"use client";
import React from 'react';
import Link from 'next/link';
import { 
  Car, Phone, Mail, MapPin, ShieldCheck, Heart, 
  ArrowUpLeft, Globe 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B132B] text-slate-300 border-t border-slate-800 pt-16 pb-8 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#006B4D] flex items-center justify-center text-white shadow-md shadow-[#006B4D]/30">
                <Car className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white tracking-tight leading-none">مشوار</span>
                <span className="text-[11px] font-semibold text-[#10B981] mt-1">بوابة إدارة الأساطيل والتنقل الذكي</span>
              </div>
            </Link>

            <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-sm">
              المنصة المصرية المعتمدة الأولى لتأجير السيارات الفاخرة والعائلية وإدارة أساطيل المعارض بعقود إلكترونية موحدة موثقة مع مصلحة الضرائب المصرية (ETA).
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs font-bold text-[#10B981]">
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
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#006B4D] border border-white/10 flex items-center justify-center transition-all">
                <img src="/images/facebookLogo.7fe86659.svg" alt="Facebook" className="w-4 h-4 brightness-200" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#006B4D] border border-white/10 flex items-center justify-center transition-all">
                <img src="/images/InstagramLogo.e8fd0abd.svg" alt="Instagram" className="w-4 h-4 brightness-200" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#006B4D] border border-white/10 flex items-center justify-center transition-all">
                <img src="/images/linkedinLogo.dfd9aafc.svg" alt="LinkedIn" className="w-4 h-4 brightness-200" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-white">روابط سريعة</h3>
            <ul className="space-y-2 text-xs font-bold text-slate-400">
              <li>
                <Link href="/" className="hover:text-[#10B981] transition-colors flex items-center gap-1">
                  <span>الرئيسية</span>
                </Link>
              </li>
              <li>
                <Link href="/fleet" className="hover:text-[#10B981] transition-colors flex items-center gap-1">
                  <span>تصفح أسطول السيارات</span>
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="hover:text-[#10B981] transition-colors flex items-center gap-1">
                  <span>حجوزاتي والرحلات النشطة</span>
                </Link>
              </li>
              <li>
                <Link href="/dealer/dashboard" className="hover:text-[#10B981] transition-colors flex items-center gap-1">
                  <span>بوابة ملاك الأساطيل والمعارض</span>
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-[#10B981] transition-colors flex items-center gap-1">
                  <span>المحادثات المباشرة</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Branches & Support */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-white">الفروع والدعم 24/7</h3>
            <ul className="space-y-2 text-xs font-bold text-slate-400">
              <li className="flex items-center gap-2 text-[#10B981]">
                <Phone className="w-4 h-4 shrink-0" />
                <span className="font-extrabold text-sm" dir="ltr">الخط الساخن: 19854</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span dir="ltr">+20 109 988 7766</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>support@mishwar.eg</span>
              </li>
              <li className="flex items-start gap-2 pt-1 text-[11px] text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>القاهرة (التجمع الخامس) • الجيزة (الشيخ زايد) • الإسكندرية (لوران) • مطار القاهرة T3</span>
              </li>
            </ul>
          </div>

          {/* Official Payments & ETA */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-white">طرق الدفع والتوثيق</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              دفع رسمي معتمد بعقود إلكترونية موحدة موثقة لحظياً.
            </p>
            
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="bg-white/10 px-2.5 py-1 rounded-lg text-[11px] font-bold text-white border border-white/10">
                ميزة Meeza
              </span>
              <span className="bg-white/10 px-2.5 py-1 rounded-lg text-[11px] font-bold text-white border border-white/10">
                InstaPay
              </span>
              <span className="bg-white/10 px-2.5 py-1 rounded-lg text-[11px] font-bold text-white border border-white/10">
                Visa / MasterCard
              </span>
              <span className="bg-white/10 px-2.5 py-1 rounded-lg text-[11px] font-bold text-white border border-white/10">
                فوري Fawry
              </span>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 bg-[#006B4D]/30 border border-[#10B981]/30 px-3 py-1.5 rounded-xl text-[11px] font-bold text-[#10B981]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                <span>ربط مالي وضريبي ETA معتمد</span>
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Simple Bar ("سطر بسيط") */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
          <div>
            <p>© 2026 مشوار لتقنية المعلومات والنقل الذكي ش.م.م. جميع الحقوق محفوظة.</p>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">الشروط والأحكام</span>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">سياسة الخصوصية</span>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">السجل التجاري: 489201</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

