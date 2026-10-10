"use client";

import React, { useState } from 'react';
import { Star, MapPin, Calendar, CheckCircle2, Shield, Settings, Info, Users, Gauge, ArrowRight, Rotate3D } from 'lucide-react';
import Link from 'next/link';

export default function CarDetailsPage() {
  const [withDriver, setWithDriver] = useState(false);
  const pricePerDay = 12500;
  const driverPrice = 1500;
  const days = 3;
  
  const total = (pricePerDay * days) + (withDriver ? driverPrice * days : 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] rtl pb-20">
      {/* Header Nav */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/fleet" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
            <ArrowRight size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[#111827]">بورش 911 كاريرا</h1>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>2023</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="flex items-center text-[#F59E0B] font-medium"><Star size={14} className="fill-current ml-1" /> 4.9 (124 تقييم)</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="flex items-center"><MapPin size={14} className="ml-1" /> فرع التجمع الخامس</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-6">
        {/* Images */}
        <div className="relative rounded-2xl overflow-hidden mb-8 bg-black h-[400px] lg:h-[500px] flex items-center justify-center">
          <img src="https://images.unsplash.com/photo-1503376712341-a1aa8c878f14?q=80&w=2070&auto=format&fit=crop" alt="Porsche" className="w-full h-full object-cover opacity-90" />
          
          <button className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 py-2.5 rounded-full flex items-center gap-2 font-medium border border-white/30 transition-colors">
            <Rotate3D size={20} />
            عرض 360 درجة
          </button>
          
          <div className="absolute top-6 left-6 flex gap-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-20 h-14 rounded-lg overflow-hidden border-2 border-white/50 cursor-pointer hover:border-white">
                <img src="https://images.unsplash.com/photo-1503376712341-a1aa8c878f14?q=80&w=300&auto=format&fit=crop" alt="thumb" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Specs */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-[#111827] mb-6">المواصفات الفنية</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
                  <Users size={24} className="text-[#006B4D] mb-2" />
                  <span className="text-sm text-gray-500 mb-1">المقاعد</span>
                  <span className="font-semibold text-[#111827]">2 مقاعد</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
                  <Settings size={24} className="text-[#006B4D] mb-2" />
                  <span className="text-sm text-gray-500 mb-1">ناقل الحركة</span>
                  <span className="font-semibold text-[#111827]">أوتوماتيك PDK</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
                  <Gauge size={24} className="text-[#006B4D] mb-2" />
                  <span className="text-sm text-gray-500 mb-1">التسارع</span>
                  <span className="font-semibold text-[#111827]">4.0 ثانية (0-100)</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
                  <Shield size={24} className="text-[#006B4D] mb-2" />
                  <span className="text-sm text-gray-500 mb-1">الفحص</span>
                  <span className="font-semibold text-[#10B981]">85 نقطة (ممتاز)</span>
                </div>
              </div>
            </section>

            {/* Inspection info */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} className="text-[#10B981]" />
              </div>
              <div>
                <h3 className="font-bold text-[#111827] mb-2">ضمان الجودة من مشوار</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  تم فحص هذه السيارة بدقة متناهية عبر 85 نقطة فحص ميكانيكية وكهربائية وللشكل الخارجي والداخلي. السيارة جاهزة للقيادة مع تأمين شامل مسبق.
                </p>
              </div>
            </section>
          </div>

          {/* Sticky Booking Summary */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-28">
              <div className="flex justify-between items-baseline mb-6">
                <div>
                  <span className="text-3xl font-bold text-[#006B4D]">{pricePerDay.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 mr-1">ج.م / يوم</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <Calendar size={20} className="text-[#006B4D]" />
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">فترة الإيجار</div>
                    <div className="text-sm font-medium">12 نوفمبر - 15 نوفمبر (3 أيام)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <MapPin size={20} className="text-[#006B4D]" />
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">الاستلام والتسليم</div>
                    <div className="text-sm font-medium">فرع التجمع الخامس</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-[#111827] mb-3 text-sm">إضافات</h4>
                <label className="flex items-center justify-between p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={withDriver} onChange={() => setWithDriver(!withDriver)} className="w-4 h-4 accent-[#006B4D]" />
                    <div>
                      <div className="text-sm font-medium">سائق خاص</div>
                      <div className="text-xs text-gray-500">سائق محترف يتحدث الإنجليزية</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">+1,500 ج.م/يوم</div>
                </label>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>الإيجار ({days} أيام)</span>
                  <span>{(pricePerDay * days).toLocaleString()} ج.م</span>
                </div>
                {withDriver && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>السائق ({days} أيام)</span>
                    <span>{(driverPrice * days).toLocaleString()} ج.م</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-[#10B981]">
                  <span>خصم المنصة</span>
                  <span>-0 ج.م</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-[#111827] pt-2 border-t border-gray-100 mt-2">
                  <span>الإجمالي</span>
                  <span>{total.toLocaleString()} ج.م</span>
                </div>
              </div>

              <button className="w-full bg-[#111827] text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20">
                تأكيد الحجز
              </button>
              <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
                <Info size={12} /> لن يتم خصم المبلغ حتى يتم التأكيد
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
