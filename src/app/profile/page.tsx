"use client";

import React from 'react';
import { ShieldCheck, Smartphone, Mail, MapPin, Key, Laptop, Lock, Award, Check, User, CreditCard } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] p-6 font-sans dir-rtl">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-[#006B4D] to-[#10B981] rounded-2xl flex items-center justify-center text-white shadow-lg relative">
              <User size={40} />
              <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-sm">
                <ShieldCheck size={20} className="text-[#10B981]" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                عبدالله خالد <span className="bg-[#10B981]/10 text-[#10B981] text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1"><Check size={12}/> تم التحقق عبر نفاذ</span>
              </h1>
              <p className="text-gray-500 mt-1">عضو منذ 2022</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-xl shadow-md flex items-center gap-2">
              <Award size={20} />
              <div>
                <p className="text-xs opacity-90">الفئة الحالية</p>
                <p className="font-bold">العضوية الذهبية</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm flex items-center gap-2">
              <CreditCard size={20} className="text-[#006B4D]" />
              <div>
                <p className="text-xs text-gray-500">نقاط الاسترداد النقدي</p>
                <p className="font-bold text-[#006B4D]">2,450 نقطة</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-bold">المعلومات الشخصية</h2>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm text-gray-500 flex items-center gap-2"><User size={14}/> رقم الهوية الوطنية</label>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 font-medium tracking-widest text-left" dir="ltr">
                      10 **** **** 89
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-500 flex items-center gap-2"><Smartphone size={14}/> رقم الجوال (موثق)</label>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 font-medium text-left" dir="ltr">
                      +966 50 *** **12
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-500 flex items-center gap-2"><Mail size={14}/> البريد الإلكتروني</label>
                    <div className="bg-white p-3 rounded-lg border border-gray-200 font-medium text-left" dir="ltr">
                      a.khalid@example.com
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-500 flex items-center gap-2"><MapPin size={14}/> العنوان الوطني</label>
                    <div className="bg-white p-3 rounded-lg border border-gray-200 font-medium">
                      الرياض، حي الملقا، مبنى 123
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold">الأمان والخصوصية</h2>
              </div>
              <div className="p-5 space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#006B4D]/10 p-2 rounded-lg text-[#006B4D]">
                      <Lock size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">قوة كلمة المرور</h3>
                      <p className="text-sm text-gray-500">تم التحديث منذ شهرين</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#10B981] text-sm font-medium">قوية</span>
                    <button className="text-sm text-[#3B82F6] hover:underline font-medium">تغيير</button>
                  </div>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#3B82F6]/10 p-2 rounded-lg text-[#3B82F6]">
                      <Key size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">المصادقة الثنائية (2FA)</h3>
                      <p className="text-sm text-gray-500">تأمين إضافي لحسابك</p>
                    </div>
                  </div>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006B4D]"></div>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2"><Laptop size={18} className="text-gray-400"/> الجلسات النشطة</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <Laptop size={20} className="text-gray-600" />
                        <div>
                          <p className="text-sm font-semibold">MacBook Pro - الرياض</p>
                          <p className="text-xs text-gray-500">نشط الآن • متصفح Chrome</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <Smartphone size={20} className="text-gray-600" />
                        <div>
                          <p className="text-sm font-semibold">iPhone 14 Pro - جدة</p>
                          <p className="text-xs text-gray-500">آخر ظهور: أمس • تطبيق iOS</p>
                        </div>
                      </div>
                      <button className="text-xs text-[#EF4444] font-medium hover:underline">إنهاء الجلسة</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Digital License */}
            <div className="bg-[#006B4D] rounded-2xl shadow-md p-5 text-white relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              
              <div className="flex justify-between items-start mb-4">
                <ShieldCheck size={28} className="text-[#10B981]" />
                <span className="bg-white/20 px-2 py-1 rounded text-xs font-medium">نشطة</span>
              </div>
              <h2 className="text-lg font-bold mb-1">الرخصة الرقمية</h2>
              <p className="text-white/80 text-sm mb-6">صالحة حتى 2028</p>
              
              <div className="bg-white p-2 rounded-xl flex items-center justify-center mb-4">
                {/* QR Code Placeholder */}
                <div className="w-full aspect-square border-4 border-dashed border-gray-200 flex flex-col items-center justify-center rounded-lg bg-gray-50">
                  <span className="text-gray-400 text-xs">QR Code</span>
                  <span className="text-gray-400 text-xs">للمسح السريع</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-xs text-white/80 border-t border-white/20 pt-3">
                <span>جهة الإصدار: المرور السعودي</span>
                <span>فئة: خصوصي</span>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold mb-4">المزايا والحصانات</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-[#10B981]/5 border border-[#10B981]/20 rounded-xl">
                  <div className="bg-[#10B981]/20 p-1.5 rounded-lg text-[#10B981] mt-0.5">
                    <Check size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#006B4D]">إعفاء من التأمين النقدي</p>
                    <p className="text-xs text-gray-500 mt-1">بفضل سجلك النظيف وعضويتك الذهبية.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
