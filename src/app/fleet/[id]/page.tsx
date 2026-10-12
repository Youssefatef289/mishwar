"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  getCarById, getCurrentUser, createBooking, Car 
} from '@/utils/storage';
import { 
  Star, ShieldCheck, MapPin, Calendar, Clock, CheckCircle2, 
  Sparkles, RotateCw, Fuel, Gauge, Award, ArrowLeft, UserCheck, 
  FileText, Check, AlertCircle 
} from 'lucide-react';

function CarDetailsPageContent() {
  const params = useParams();
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);
  
  // Booking state
  const [startDate, setStartDate] = useState('2026-10-15');
  const [endDate, setEndDate] = useState('2026-10-18');
  const [startTime, setStartTime] = useState('10:00 ص');
  const [endTime, setEndTime] = useState('10:00 ص');
  const [branch, setBranch] = useState('صالة كبار الزوار VIP - مطار القاهرة مبنى 3');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['سائق خاص بزي رسمي']);
  const [is360Open, setIs360Open] = useState(false);

  useEffect(() => {
    if (params?.id) {
      const found = getCarById(params.id as string);
      setCar(found);
    }
  }, [params]);

  if (!car) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-3xl text-center shadow-sm max-w-md">
          <p className="text-slate-500 font-bold mb-4">جاري تحميل تفاصيل السيارة...</p>
          <Link href="/fleet" className="bg-[#006B4D] text-white px-6 py-2.5 rounded-xl font-bold text-xs">
            العودة للأسطول
          </Link>
        </div>
      </div>
    );
  }

  // Calculate duration
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  const totalDays = diffTime > 0 ? diffTime : 1;

  const dailyRate = car.dailyPrice ?? car.pricePerDay ?? 14500;
  const addonsTotal = (selectedAddons.includes('سائق خاص بزي رسمي') ? 1200 * totalDays : 0) +
                      (selectedAddons.includes('باقة كيلومترات مفتوحة') ? 1500 * totalDays : 0) +
                      (selectedAddons.includes('مقعد أطفال معقم') ? 200 * totalDays : 0);
  
  const subtotal = (dailyRate * totalDays) + addonsTotal;
  const vat = Math.round(subtotal * 0.14);
  const depositHold = 15000;
  const totalPrice = subtotal + vat;

  const handleToggleAddon = (name: string) => {
    if (selectedAddons.includes(name)) {
      setSelectedAddons(selectedAddons.filter(a => a !== name));
    } else {
      setSelectedAddons([...selectedAddons, name]);
    }
  };

  const handleConfirmBooking = () => {
    const user = getCurrentUser();
    const bookingId = 'MSH-' + Math.floor(1000 + Math.random() * 9000);

    createBooking({
      id: bookingId,
      carId: car.id,
      brand: car.brand,
      model: car.model,
      renterId: user ? user.id : 'renter_guest',
      renterName: user ? user.name : 'مستأجر مشوار المعتمد',
      ownerId: car.ownerId || 'dealer_royal',
      startDate,
      endDate,
      startTime,
      endTime,
      totalDays,
      dailyRate,
      subtotal,
      vat,
      depositHold,
      totalPrice,
      status: 'pending',
      branch,
      addons: selectedAddons,
      contractId: `E-CTR-${new Date().getFullYear()}-CAI-${Math.floor(1000 + Math.random() * 9000)}`,
      stage: 1
    });

    router.push('/my-bookings');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-right">
      
      {/* Top Breadcrumb & Header */}
      <div className="bg-white border-b border-slate-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-2">
              <Link href="/" className="hover:text-[#006B4D]">الرئيسية</Link>
              <span>/</span>
              <Link href="/fleet" className="hover:text-[#006B4D]">الأسطول المعتمد</Link>
              <span>/</span>
              <span className="text-slate-900">{car.brand} {car.model}</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-black text-slate-900">{car.brand} {car.model}</h1>
              <span className="bg-[#E6F4EF] text-[#006B4D] border border-[#006B4D]/20 px-3 py-1 rounded-full text-xs font-black">
                موديل {car.year}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              التابعة لمعرض: <span className="text-slate-900 font-bold">{car.dealershipName || 'معرض رويال كارز الفاخرة'}</span> • تقييم 5 نجوم معتمد
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIs360Open(true)}
              className="bg-[#0B132B] hover:bg-[#1E293B] text-white px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <RotateCw className="w-4 h-4 text-[#10B981] animate-spin-slow" />
              <span>جولة ثلاثية الأبعاد 360° للمقصورة</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Details + Sticky Booking Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 2-Columns: Gallery & Technical Specs */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Gallery Grid */}
            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm overflow-hidden">
              <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center p-6">
                <img 
                  src={car.images?.[0] || car.image || 'https://via.placeholder.com/800'} 
                  alt={car.brand} 
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
                <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-bold">
                  صور واقعية موثقة ومعتمدة من الفحص الفني
                </div>
              </div>
            </div>

            {/* Engineering Specifications Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-4">
                المواصفات الفنية والهندسية
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-100 text-center">
                  <span className="block text-[11px] font-bold text-slate-400 mb-1">المحرك والقوة</span>
                  <span className="text-xs md:text-sm font-black text-slate-900">{car.horsepower || 'V8 Twin-Turbo'}</span>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-100 text-center">
                  <span className="block text-[11px] font-bold text-slate-400 mb-1">ناقل الحركة</span>
                  <span className="text-xs md:text-sm font-black text-slate-900">{car.transmission || 'أوتوماتيك'}</span>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-100 text-center">
                  <span className="block text-[11px] font-bold text-slate-400 mb-1">نوع الوقود</span>
                  <span className="text-xs md:text-sm font-black text-slate-900">{car.fuel || 'بنزين 95'}</span>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-100 text-center">
                  <span className="block text-[11px] font-bold text-slate-400 mb-1">سعة المقاعد</span>
                  <span className="text-xs md:text-sm font-black text-slate-900">{car.seats || 5} ركاب VIP</span>
                </div>
              </div>

              {/* Luxury Features */}
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 mb-3">تجهيزات الرفاهية والأمان:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(car.features || [
                    'نظام صوتي Burmester 3D المحيطي',
                    'مقاعد تدليك جلدية مع تبريد وتدفئة',
                    'سقف بانورامي مزدوج مع تحكم كهربائي',
                    'شاشات ترفيه خلفية مع Apple CarPlay'
                  ]).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 85-Point Inspection Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="text-xs font-black text-[#10B981] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  شهادة جودة رقمية معتمدة A+
                </span>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-[#006B4D]" />
                  <span>تقرير الفحص الشامل 85 نقطة</span>
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                  <span className="text-2xl font-black text-[#10B981] block">100%</span>
                  <span className="text-xs font-bold text-slate-700">المحرك وناقل الحركة</span>
                </div>
                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                  <span className="text-2xl font-black text-[#10B981] block">98%</span>
                  <span className="text-xs font-bold text-slate-700">الفرامل ونظام التعليق</span>
                </div>
                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                  <span className="text-2xl font-black text-[#10B981] block">96%</span>
                  <span className="text-xs font-bold text-slate-700">هيكل السيارة والطلاء</span>
                </div>
              </div>

              <div className="p-4 bg-[#E6F4EF] rounded-2xl text-xs font-bold text-[#006B4D] flex items-center justify-between">
                <span>تم إجراء الفحص الأخير بتاريخ 10 أكتوبر 2026 بواسطة مهندس معتمد.</span>
                <button onClick={() => alert('تم تنزيل تقرير الفحص الفني المعتمد (PDF).')} className="underline">
                  تحميل تقرير الفحص الكامل (PDF)
                </button>
              </div>
            </div>

          </div>

          {/* 1-Column: Sticky Booking Summary Widget */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-xl sticky top-28 space-y-6">
              
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-1">السعر اليومي الشامل</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-[#006B4D]">{dailyRate.toLocaleString()}</span>
                  <span className="text-xs font-bold text-slate-500">ج.م / اليوم</span>
                </div>
              </div>

              {/* Duration & Dates */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">تاريخ ووقت الاستلام</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="date" 
                      value={startDate} 
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900 outline-none"
                    />
                    <select 
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900 outline-none"
                    >
                      <option>10:00 ص</option>
                      <option>12:00 م</option>
                      <option>02:00 م</option>
                      <option>06:00 م</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">تاريخ ووقت التسليم</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="date" 
                      value={endDate} 
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900 outline-none"
                    />
                    <select 
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900 outline-none"
                    >
                      <option>10:00 ص</option>
                      <option>12:00 م</option>
                      <option>02:00 م</option>
                      <option>06:00 م</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">نقطة أو فرع الاستلام</label>
                  <select 
                    value={branch} 
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900 outline-none"
                  >
                    <option value="صالة كبار الزوار VIP - مطار القاهرة مبنى 3">صالة كبار الزوار VIP - مطار القاهرة مبنى 3</option>
                    <option value="فرع التجمع الخامس - البلاتينيوم مول">فرع التجمع الخامس - البلاتينيوم مول</option>
                    <option value="فرع أركان بلازا - الشيخ زايد">فرع أركان بلازا - الشيخ زايد</option>
                    <option value="توصيل لباب بيتك">توصيل لباب بيتك (مجاناً)</option>
                  </select>
                </div>
              </div>

              {/* Add-ons */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 mb-3">الباقات والإضافات الاختيارية:</label>
                <div className="space-y-2.5">
                  {[
                    { id: 'سائق خاص بزي رسمي', price: 1200, label: 'سائق خاص بزي رسمي (+1,200 ج.م/يوم)' },
                    { id: 'باقة كيلومترات مفتوحة', price: 1500, label: 'باقة كيلومترات مفتوحة (+1,500 ج.م/يوم)' },
                    { id: 'مقعد أطفال معقم', price: 200, label: 'مقعد أطفال معقم ISOFIX (+200 ج.م/يوم)' }
                  ].map(addon => (
                    <label key={addon.id} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-[#F8FAFC] cursor-pointer text-xs font-bold">
                      <span className="text-[#006B4D]">{addon.label}</span>
                      <input 
                        type="checkbox" 
                        checked={selectedAddons.includes(addon.id)} 
                        onChange={() => handleToggleAddon(addon.id)}
                        className="accent-[#006B4D] rounded"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Bill Breakdown */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs font-semibold text-slate-600">
                <div className="flex justify-between">
                  <span>إيجار ({totalDays} أيام × {dailyRate.toLocaleString()} ج.م)</span>
                  <span className="font-bold text-slate-900">{(dailyRate * totalDays).toLocaleString()} ج.م</span>
                </div>
                {addonsTotal > 0 && (
                  <div className="flex justify-between text-[#006B4D]">
                    <span>إجمالي الإضافات المختارة</span>
                    <span className="font-bold">{addonsTotal.toLocaleString()} ج.م</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>ضريبة القيمة المضافة مصلحة الضرائب ETA (14%)</span>
                  <span className="font-bold text-slate-900">{vat.toLocaleString()} ج.م</span>
                </div>
                <div className="flex justify-between text-amber-700 bg-amber-50 p-2 rounded-xl text-[11px] font-bold">
                  <span>مبلغ التأمين المحجوز مؤقتاً (Deposit Hold)</span>
                  <span>{depositHold.toLocaleString()} ج.م</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-200">
                  <span>إجمالي الحجز المطلوب:</span>
                  <span className="text-[#006B4D] text-lg">{totalPrice.toLocaleString()} ج.م</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button 
                onClick={handleConfirmBooking}
                className="w-full bg-[#006B4D] hover:bg-[#00533C] text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-[#006B4D]/30 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>تأكيد ومتابعة الحجز الفوري</span>
                <ArrowLeft className="w-5 h-5" />
              </button>

              <p className="text-[11px] font-semibold text-center text-slate-400">
                🔒 عقد إلكتروني موحد معتمد وضمان استرداد فوري
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 360 Modal */}
      {is360Open && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-3xl p-6 max-w-3xl w-full border border-slate-700 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-[#10B981] flex items-center gap-1.5">
                <RotateCw className="w-4 h-4 animate-spin-slow" /> جولة افتراضية للمقصورة الداخلية 360°
              </span>
              <button onClick={() => setIs360Open(false)} className="text-slate-400 hover:text-white font-black text-lg">✕</button>
            </div>
            <div className="relative h-96 bg-black rounded-2xl overflow-hidden flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80" 
                alt="Cabin 360" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center p-6">
                <RotateCw className="w-12 h-12 text-[#10B981] mb-3 animate-spin" />
                <p className="font-black text-xl">مقصورة فاخرة مجهزة بنظام Burmester 3D وتعتيم إلكتروني</p>
                <p className="text-xs text-slate-300 mt-2">اسحب الماوس للتنقل داخل مقصورة القيادة والمقاعد الخلفية</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function CarDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-8 text-slate-500 font-bold">جاري تحميل تفاصيل السيارة...</div>}>
      <CarDetailsPageContent />
    </Suspense>
  );
}
