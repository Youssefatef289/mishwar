"use client";
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getBookings, getFleet, Booking, Car } from '@/utils/storage';
import { 
  ShieldCheck, Clock, CheckCircle2, Car as CarIcon, 
  MapPin, Calendar, FileText, MessageSquare, AlertCircle, 
  Sparkles, ArrowLeft, KeyRound, PhoneCall, Check 
} from 'lucide-react';

function BookingRequestContent() {
  const searchParams = useSearchParams();
  const bookingIdParam = searchParams.get('id');

  const [booking, setBooking] = useState<Booking | null>(null);
  const [car, setCar] = useState<Car | null>(null);
  const [timeLeft, setTimeLeft] = useState(899); // 14:59 minutes

  useEffect(() => {
    const allBookings = getBookings();
    let current = bookingIdParam ? allBookings.find(b => b.id === bookingIdParam) : allBookings[0];
    if (current) {
      setBooking(current);
      const fleet = getFleet();
      const carFound = fleet.find(c => c.id === current?.carId);
      if (carFound) setCar(carFound);
    }
  }, [bookingIdParam]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const bookingId = booking?.id || 'MSH-8492';
  const carName = car ? `${car.brand} ${car.model}` : (booking?.carName || 'بورشه Cayenne GTS');

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 text-right font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#E6F4EF] text-[#006B4D] border border-[#006B4D]/20 px-3.5 py-1 rounded-full text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
              <span>رقم الطلب المؤكد: {bookingId}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              مسار رحلة الحجز والاستلام المعتمد
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
              طلبك قيد المتابعة الفورية مع المعرض الشريك بعقد إلكتروني موثق من مصلحة الضرائب ETA
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center shrink-0 w-full md:w-auto">
            <span className="text-[11px] font-bold text-slate-400 block mb-1">وقت رد المعرض التنازلي:</span>
            <div className="flex items-center justify-center gap-1.5 text-xl font-black text-[#006B4D] font-mono" dir="ltr">
              <Clock className="w-5 h-5 text-[#10B981]" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* 4-Stages Confirmation Stepper */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
          <h2 className="text-base sm:text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#006B4D]" />
            <span>مراحل تأكيد وجاهزية المركبة</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Stage 1 */}
            <div className="bg-[#E6F4EF] border border-[#006B4D]/30 rounded-2xl p-4 relative flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-xl bg-[#006B4D] text-white flex items-center justify-center font-bold text-xs">
                  <Check className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-black text-[#006B4D] bg-white px-2 py-0.5 rounded-full">
                  مكتمل ✓
                </span>
              </div>
              <h3 className="font-black text-xs sm:text-sm text-slate-900 mb-1">1. تقديم الطلب وحجز الوديعة</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                تم تسجيل بيانات المستأجر وحجز الوديعة بنجاح عبر النظام.
              </p>
            </div>

            {/* Stage 2 */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 relative flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs animate-pulse">
                  2
                </span>
                <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  جاري المعالجة
                </span>
              </div>
              <h3 className="font-black text-xs sm:text-sm text-slate-900 mb-1">2. تأكيد الجاهزية من المعرض</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                يقوم مسؤول المعرض بتجهيز السيارة والفحص الأخير 360°.
              </p>
            </div>

            {/* Stage 3 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 relative flex flex-col justify-between opacity-80">
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                  قريباً
                </span>
              </div>
              <h3 className="font-black text-xs sm:text-sm text-slate-900 mb-1">3. العقد الرقمي وكود OTP</h3>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                إصدار العقد الإلكتروني ETA ورمز الاستلام المشفر.
              </p>
            </div>

            {/* Stage 4 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 relative flex flex-col justify-between opacity-80">
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
                  4
                </span>
                <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                  المحطة الأخيرة
                </span>
              </div>
              <h3 className="font-black text-xs sm:text-sm text-slate-900 mb-1">4. استلام المركبة ومحضر 360°</h3>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                فحص السيارة مع مندوب التسليم واستلام المفاتيح.
              </p>
            </div>
          </div>
        </div>

        {/* SafeReserve Guarantee Banner */}
        <div className="bg-gradient-to-l from-[#006B4D] to-[#04875B] text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>ميزة الحجز الآمن الفوري (SafeReserve) مفعلة مجاناً</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">ضمان عدم الانتظار أو الإلغاء</h3>
            <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
              في حال عدم استجابة المعرض خلال المهلة المحددة، يقوم نظام مشوار الذكي بترقية حجزك تلقائياً لمركبة بديلة من نفس الفئة أو أعلى بدون أي تكلفة إضافية، مع أولوية التسليم السريع.
            </p>
          </div>

          <div className="shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
            <span className="text-3xl font-black block text-amber-300">100%</span>
            <span className="text-[11px] font-bold text-white">ضمان توفير المركبة</span>
          </div>
        </div>

        {/* Booking Details Card & Live Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 2-Columns: Car & Contract Overview */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900">تفاصيل المركبة المحجوزة</h3>
              <span className="text-xs font-bold text-[#006B4D] bg-[#E6F4EF] px-3 py-1 rounded-full">
                {car?.category || 'دفع رباعي فاخرة'}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-full sm:w-48 h-32 rounded-2xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center overflow-hidden">
                <img 
                  src={car?.images?.[0] || '/images/carDesktopView.webp'} 
                  alt={carName}
                  className="w-full h-full object-contain drop-shadow-md" 
                />
              </div>

              <div className="flex-1 space-y-2 text-right">
                <h4 className="text-xl font-black text-slate-900">{carName}</h4>
                <p className="text-xs font-semibold text-slate-500">
                  المعرض المعتمد: <span className="text-slate-800 font-bold">{car?.dealershipName || 'معرض رويال كارز الفاخرة'}</span>
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-xs font-bold text-slate-700">
                  <span className="bg-slate-100 px-2.5 py-1 rounded-lg">ناقل الحركة: {car?.transmission?.split(' ')[0] || 'أوتوماتيك'}</span>
                  <span className="bg-slate-100 px-2.5 py-1 rounded-lg">الوقود: {car?.fuel?.split(' ')[0] || 'بنزين 95'}</span>
                  <span className="bg-slate-100 px-2.5 py-1 rounded-lg">المسافة: {car?.mileageLimit || '300 كم/يوم'}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <Calendar className="w-4 h-4 text-[#006B4D]" />
                <div>
                  <span className="text-slate-400 block text-[10px]">فترة الحجز:</span>
                  <span>{booking?.startDate || '2026-10-15'} إلى {booking?.endDate || '2026-10-18'} ({booking?.totalDays || 3} أيام)</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <MapPin className="w-4 h-4 text-[#006B4D]" />
                <div>
                  <span className="text-slate-400 block text-[10px]">فرع ومكان الاستلام:</span>
                  <span className="truncate block max-w-[200px]">{booking?.branch || 'صالة كبار الزوار VIP - مطار القاهرة مبنى 3'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 1-Column: Quick Connect & OTP Delivery Code */}
          <div className="space-y-6">
            
            {/* Handover Code */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F4EF] text-[#006B4D] mx-auto flex items-center justify-center font-black">
                <KeyRound className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-black text-slate-900">كود استلام المفتاح الرقمي</h4>
              <p className="text-xs text-slate-500">
                سيتم تفعيل الرمز فور توقيع العقد الإلكتروني وتسليمه لمندوب الفحص:
              </p>
              <div className="bg-slate-100 border border-dashed border-slate-300 py-3 rounded-xl text-lg font-mono font-black text-slate-900 tracking-widest" dir="ltr">
                ••• - •••
              </div>
              <span className="text-[11px] font-bold text-[#10B981] block">مشفر برقم الهوية الوطنية 256-Bit</span>
            </div>

            {/* Direct Actions */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
              <Link
                href="/chat"
                className="w-full bg-[#006B4D] hover:bg-[#00533C] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>محادثة مسؤول المعرض مباشرة</span>
              </Link>

              <Link
                href="/my-bookings"
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>متابعة كافة حجوزاتي</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default function BookingRequestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center"><p className="text-slate-500 font-bold">جاري تحميل مسار الحجز...</p></div>}>
      <BookingRequestContent />
    </Suspense>
  );
}
