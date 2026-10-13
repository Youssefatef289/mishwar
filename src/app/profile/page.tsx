"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCurrentUser, User } from '@/utils/storage';
import { 
  ShieldCheck, Smartphone, Mail, MapPin, Key, Laptop, Lock, 
  Award, Check, User as UserIcon, CreditCard, Sparkles, LogOut, 
  CheckCircle2, QrCode, Building2 
} from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const current = getCurrentUser();
    setUser(current);
  }, []);

  const displayName = user?.name || 'م. طارق المنشاوي';
  const displayEmail = user?.email || 'tarek.menshawy@gmail.com';
  const displayPhone = user?.phone || '+20 11 2233 4455';

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] p-4 sm:p-8 font-sans text-right" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-[#006B4D] to-[#10B981] rounded-2xl flex items-center justify-center text-white shadow-lg relative shrink-0">
              <UserIcon size={40} />
              <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                <ShieldCheck size={18} className="text-[#10B981]" />
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900">{displayName}</h1>
                <span className="bg-[#E6F4EF] text-[#006B4D] text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 border border-[#006B4D]/20">
                  <CheckCircle2 size={13} className="text-[#10B981]" />
                  <span>موثق عبر بوابة مصر الرقمية</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 font-semibold mt-1">عضو معتمد في مشوار VIP منذ 2023 • هوية رقمية معتمدة</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2.5 rounded-2xl shadow-sm flex items-center gap-2.5">
              <Award size={20} className="text-white" />
              <div>
                <p className="text-[10px] opacity-90 font-bold">الفئة المعتمدة</p>
                <p className="font-black text-xs sm:text-sm">العضوية الذهبية VIP</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-sm flex items-center gap-2.5">
              <CreditCard size={20} className="text-[#006B4D]" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold">نقاط مشوار كاش باك</p>
                <p className="font-black text-[#006B4D] text-xs sm:text-sm">3,200 نقطة</p>
              </div>
            </div>
          </div>
        </div>

        {/* Exemption & Safe Shield Banner */}
        <div className="bg-[#E6F4EF] border border-[#006B4D]/30 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#006B4D] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                إعفاء كامل من التأمين النقدي حتى 150,000 ج.م
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                بفضل توثيق الرقم القومي وسجلك المالي النظيف، يمكنك استلام أي سيارة فاخرة بدون حجز ودائع نقدية مجمدة.
              </p>
            </div>
          </div>
          <span className="bg-white text-[#006B4D] px-4 py-2 rounded-xl text-xs font-black shadow-xs shrink-0 border border-[#006B4D]/20">
            ميزة مفعلة رسمياً ✓
          </span>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main 2-Columns */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* National Identity & Verification */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <UserIcon size={18} className="text-[#006B4D]" />
                  <span>المعلومات الشخصية والتوثيق الحكومي</span>
                </h2>
                <span className="text-[11px] font-bold text-[#10B981] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ربط آمن 100%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">الرقم القومي المصري (بطاقة سارية)</label>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono font-bold text-slate-900 text-left" dir="ltr">
                    294 **** **** 3819
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">رقم الهاتف الموثق بالـ OTP</label>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono font-bold text-slate-900 text-left" dir="ltr">
                    {displayPhone}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">البريد الإلكتروني المعتمد</label>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono font-bold text-slate-900 text-left" dir="ltr">
                    {displayEmail}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">محل الإقامة المسجل</label>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-bold text-slate-900 text-right">
                    القاهرة الجديدة، التجمع الخامس، حي الياسمين
                  </div>
                </div>
              </div>
            </div>

            {/* Saved Payment Methods */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <CreditCard size={18} className="text-[#006B4D]" />
                  <span>وسائل الدفع المصرية المحفوظة</span>
                </h2>
                <button className="text-xs font-bold text-[#006B4D] hover:underline">+ إضافة وسيلة جديدة</button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 bg-[#F8FAFC] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center font-black text-xs">
                      CIB
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900">البنك التجاري الدولي (CIB)</p>
                      <p className="text-[11px] text-slate-400 font-mono" dir="ltr">•••• •••• •••• 9012</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded-full">افتراضية</span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-[#F8FAFC] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#006B4D] text-white flex items-center justify-center font-black text-xs">
                      IP
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900">حساب إنستاباي (InstaPay)</p>
                      <p className="text-[11px] text-slate-400 font-mono" dir="ltr">tarek@instapay</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-200/80 px-2 py-0.5 rounded-full">معتمد</span>
                </div>
              </div>
            </div>

            {/* Security & Active Sessions */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 space-y-5">
              <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-4">
                الأمان والجلسات النشطة
              </h2>

              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="bg-[#006B4D]/10 p-2.5 rounded-xl text-[#006B4D]">
                    <Lock size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">المصادقة الثنائية (2FA) عبر OTP</h3>
                    <p className="text-xs text-slate-500">حماية عمليات الحجز وتوقيع العقود برمز مشفر</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#10B981] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  مفعلة ✓
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-xs text-slate-700 flex items-center gap-2">
                    <Laptop size={16} className="text-slate-400" />
                    <span>الأجهزة المتصلة بحسابك حالياً</span>
                  </h3>
                  <button 
                    onClick={() => alert('تم إنهاء جميع الجلسات الأخرى بنجاح.')}
                    className="text-xs font-bold text-rose-600 hover:underline"
                  >
                    تسجيل الخروج من كافة الأجهزة
                  </button>
                </div>

                <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs">
                  <div className="flex items-center gap-3">
                    <Laptop size={18} className="text-[#006B4D]" />
                    <div>
                      <p className="font-bold text-slate-900">MacBook Pro M3 — القاهرة، التجمع</p>
                      <p className="text-[10px] text-slate-400">نشط الآن • Chrome 129</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#10B981]">الجهاز الحالي</span>
                </div>

                <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs">
                  <div className="flex items-center gap-3">
                    <Smartphone size={18} className="text-slate-600" />
                    <div>
                      <p className="font-bold text-slate-900">iPhone 15 Pro Max — الشيخ زايد</p>
                      <p className="text-[10px] text-slate-400">آخر اتصال: اليوم 02:15 م • Safari</p>
                    </div>
                  </div>
                  <button className="text-[11px] font-bold text-rose-500 hover:underline">إنهاء</button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Digital License */}
          <div className="space-y-6">
            
            {/* Egyptian Digital Driver License */}
            <div className="bg-[#0B132B] rounded-3xl shadow-lg p-6 text-white relative overflow-hidden space-y-5 border border-slate-800">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#006B4D] flex items-center justify-center text-white">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-300 block">جمهورية مصر العربية</span>
                    <span className="text-[10px] text-[#10B981] font-bold">وزارة الداخلية - المرور</span>
                  </div>
                </div>
                <span className="bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 px-2.5 py-0.5 rounded-full text-[10px] font-black">
                  سارية حتى 2029
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white">{displayName}</h3>
                <p className="text-xs text-slate-400 font-semibold">رخصة قيادة خاصة درجة ثالثة</p>
                <p className="text-xs font-mono text-[#10B981] mt-1" dir="ltr">LIC-EGY-0921482</p>
              </div>

              {/* Barcode / QR Simulation */}
              <div className="bg-white p-3 rounded-2xl flex flex-col items-center justify-center text-slate-900">
                <QrCode size={90} className="text-slate-900" />
                <span className="text-[10px] font-mono font-bold text-slate-500 mt-1">كود التحقق الرقمي المعتمد</span>
              </div>

              <div className="flex justify-between items-center text-[11px] text-slate-400 border-t border-white/10 pt-3">
                <span>وحدة مرور: القاهرة الجديدة</span>
                <span>فصيلة الدم: O+</span>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-3">
              <h4 className="text-sm font-black text-slate-900">روابط سريعة لحسابك</h4>
              <Link 
                href="/my-bookings" 
                className="w-full bg-[#E6F4EF] hover:bg-[#d0ece1] text-[#006B4D] py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-between transition-colors"
              >
                <span>عرض حجوزاتي والرحلات النشطة</span>
                <span>←</span>
              </Link>
              <Link 
                href="/chat" 
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-between transition-colors"
              >
                <span>المحادثات المباشرة مع المعارض</span>
                <span>←</span>
              </Link>
              <Link 
                href="/notifications" 
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-between transition-colors"
              >
                <span>مركز الإشعارات والتنبيهات</span>
                <span>←</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
