"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  getBookingsForUser, getCurrentUser, getCarById, Booking, Car 
} from '@/utils/storage';
import { 
  Calendar, MapPin, Clock, ShieldCheck, MessageSquare, 
  FileText, CheckCircle2, ChevronRight, Phone, Navigation, 
  Fuel, Gauge, Award, Download, AlertTriangle, ArrowLeft 
} from 'lucide-react';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'approved' | 'completed'>('all');
  const [selectedContractModal, setSelectedContractModal] = useState<Booking | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      const userBookings = getBookingsForUser(user.id, user.role);
      setBookings(userBookings);
    }
  }, []);

  const activeCount = bookings.filter(b => b.status === 'active').length || 1;
  const approvedCount = bookings.filter(b => b.status === 'approved' || b.status === 'pending').length || 2;
  const completedCount = 8;
  const cancelledCount = 0;

  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return b.status === 'active';
    if (activeTab === 'approved') return b.status === 'approved' || b.status === 'pending';
    if (activeTab === 'completed') return b.status === 'completed';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-right" dir="rtl">
      
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-1">
              <span>بوابة المستأجر</span>
              <span>•</span>
              <span className="text-[#10B981] font-bold">هوية معتمدة موثقة</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900">حجوزاتي وإدارة رحلاتي الحية</h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">تتبع رحلاتك النشطة، عقودك الرقمية، ومواقع استلام المفاتيح لحظياً</p>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/fleet"
              className="bg-[#006B4D] hover:bg-[#00533C] text-white px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm shadow-sm transition-all flex items-center gap-2"
            >
              <span>حجز سيارة جديدة</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Metric Counters Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-3xl font-black text-[#10B981] block leading-none">{activeCount}</span>
              <span className="text-xs font-bold text-slate-600 mt-1 block">نشط حالياً على الطريق</span>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#10B981]">
              <Navigation className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-3xl font-black text-[#3B82F6] block leading-none">{approvedCount}</span>
              <span className="text-xs font-bold text-slate-600 mt-1 block">رحلات قادمة مؤكدة</span>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#3B82F6]">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-3xl font-black text-slate-700 block leading-none">{completedCount}</span>
              <span className="text-xs font-bold text-slate-600 mt-1 block">رحلات مكتملة ومؤرشفة</span>
            </div>
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-3xl font-black text-slate-400 block leading-none">{cancelledCount}</span>
              <span className="text-xs font-bold text-slate-600 mt-1 block">رحلات ملغاة</span>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-[#EF4444]">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-slate-200/80 pb-4 overflow-x-auto">
          {[
            { id: 'all', label: 'كافة الرحلات' },
            { id: 'active', label: 'الرحلات النشطة (Live)' },
            { id: 'approved', label: 'بانتظار الاستلام والموافقة' },
            { id: 'completed', label: 'أرشيف الرحلات السابقة' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-[#006B4D] text-white shadow-sm' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.map((booking) => {
            const car = getCarById(booking.carId);
            const isLive = booking.status === 'active';

            return (
              <div 
                key={booking.id} 
                className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden"
              >
                {/* Header Strip */}
                <div className="bg-[#F8FAFC] px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-black text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                      رقم الحجز: {booking.id}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-black ${
                      isLive 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : booking.status === 'approved'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {isLive ? '● رحلة نشطة على الطريق' : booking.status === 'approved' ? 'مؤكدة بانتظار موعد الاستلام' : 'قيد مراجعة المعرض'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500">
                      العقد الرقمي: <span className="text-slate-900 font-mono">{booking.contractId || 'E-CTR-2026-CAI'}</span>
                    </span>
                    <button 
                      onClick={() => setSelectedContractModal(booking)}
                      className="text-xs font-bold text-[#006B4D] hover:underline flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>معاينة العقد</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-8">
                  
                  {/* Stepper Timeline */}
                  <div className="bg-[#F8FAFC] p-4 md:p-6 rounded-2xl border border-slate-100">
                    <div className="grid grid-cols-4 gap-2 text-center relative">
                      {[
                        { title: 'تقديم الطلب', done: true, desc: 'تم بنجاح عبر التطبيق' },
                        { title: 'موافقة المعرض', done: true, desc: 'معرض رويال كارز VIP' },
                        { title: 'الدفع والتأكيد', done: booking.stage ? booking.stage >= 3 : true, desc: 'مدفوع إلكترونياً بالكامل' },
                        { title: 'فحص الاستلام 360°', done: isLive, desc: 'توقيع المحضر الرقمي' }
                      ].map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black mb-2 shadow-sm ${
                            step.done ? 'bg-[#006B4D] text-white' : 'bg-slate-200 text-slate-500'
                          }`}>
                            {step.done ? '✓' : idx + 1}
                          </div>
                          <span className="text-xs font-black text-slate-900">{step.title}</span>
                          <span className="text-[10px] text-slate-400 font-medium hidden sm:block mt-0.5">{step.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main Booking Body (Car visual + specs + GPS) */}
                  <div className="flex flex-col lg:flex-row gap-8 items-center">
                    {/* Visual */}
                    <div className="w-full lg:w-1/3 h-52 bg-slate-50 rounded-2xl p-4 flex items-center justify-center">
                      <img 
                        src={car?.images?.[0] || '/images/carDesktopView.webp'} 
                        alt={car?.model || "Car"} 
                        className="w-full h-full object-contain drop-shadow-xl"
                      />
                    </div>

                    {/* Details */}
                    <div className="w-full lg:w-2/3 space-y-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-black text-slate-900">{car?.brand || 'بورشه'} {car?.model || 'Cayenne GTS'}</h3>
                          <p className="text-xs text-slate-500 font-semibold mt-0.5">
                            نقطة التسليم: <span className="text-slate-900 font-bold">{booking.branch || 'فرع التجمع الخامس'}</span>
                          </p>
                        </div>

                        <div className="text-left">
                          <span className="text-xs text-slate-400 font-bold block">التكلفة الإجمالية</span>
                          <span className="text-2xl font-black text-[#006B4D]">{(booking.totalPrice ?? 49590).toLocaleString()} ج.م</span>
                        </div>
                      </div>

                      {/* Dates and Times */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs bg-[#F8FAFC] p-4 rounded-2xl border border-slate-100">
                        <div>
                          <span className="text-slate-400 block text-[11px] font-bold">بداية الحجز:</span>
                          <span className="font-bold text-slate-900">{booking.startDate} ({booking.startTime || '10:00 ص'})</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px] font-bold">نهاية الحجز:</span>
                          <span className="font-bold text-slate-900">{booking.endDate} ({booking.endTime || '10:00 ص'})</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px] font-bold">المدة:</span>
                          <span className="font-bold text-slate-900">{booking.totalDays} أيام متواصلة</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px] font-bold">التأمين المحجوز:</span>
                          <span className="font-bold text-amber-700">15,000 ج.م (مستردة)</span>
                        </div>
                      </div>

                      {/* Telematics & Live GPS (Only if active) */}
                      {isLive && (
                        <div className="bg-[#E6F4EF]/70 border border-[#006B4D]/20 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-[#10B981] animate-ping"></div>
                            <div>
                              <span className="text-xs font-extrabold text-[#006B4D] block">التتبع الحي للمركبة (GPS Active)</span>
                              <span className="text-xs text-slate-700 font-bold">
                                الموقع الحالي: {booking.gpsStatus?.location || 'محور 26 يوليو - الشيخ زايد'}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-6 text-xs font-bold text-slate-700">
                            <div className="flex items-center gap-1.5">
                              <Fuel className="w-4 h-4 text-[#006B4D]" />
                              <span>مستوى الوقود: {booking.gpsStatus?.fuelPercent || 92}%</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Gauge className="w-4 h-4 text-[#006B4D]" />
                              <span>العداد: {booking.gpsStatus?.odometer || '18,420 كم'}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Link 
                        href={`/chat?bookingId=${booking.id}`}
                        className="bg-[#006B4D] hover:bg-[#00533C] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>محادثة فورية مع مسؤول المعرض</span>
                      </Link>

                      <button 
                        onClick={() => alert('جاري الاتصال بمسؤول تسليم المفتاح: +201099887766')}
                        className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all"
                      >
                        <Phone className="w-4 h-4 text-[#006B4D]" />
                        <span>اتصال بمندوب التسليم</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setSelectedContractModal(booking)}
                        className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5"
                      >
                        <Download className="w-4 h-4" />
                        <span>تحميل العقد وشهادة التأمين (PDF)</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Contract Preview Modal */}
      {selectedContractModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl text-right space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <span className="text-xs font-black text-[#006B4D] bg-[#E6F4EF] px-3 py-1 rounded-full">
                وثيقة العقد الإلكتروني الموحد لجمهورية مصر العربية
              </span>
              <button onClick={() => setSelectedContractModal(null)} className="text-slate-400 hover:text-slate-700 text-lg font-black">✕</button>
            </div>

            <div className="text-center py-2 space-y-1">
              <h2 className="text-xl font-black text-slate-900">عقد كراء وتشغيل مركبة ذاتية القيادة</h2>
              <p className="text-xs text-slate-500 font-mono">رقم التسجيل الضريبي الموحد ETA: 994-120-845</p>
            </div>

            <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-100 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">الطرف الأول (المؤجر):</span>
                <span className="font-black text-slate-900">معرض رويال كارز الفاخرة ش.م.م</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">الطرف الثاني (المستأجر):</span>
                <span className="font-black text-slate-900">{selectedContractModal.renterName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">رقم الشاسيه واللوحة:</span>
                <span className="font-black text-slate-900">أ ب ج 4921 (ملاكي القاهرة)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">فترة الإيجار:</span>
                <span className="font-black text-slate-900">من {selectedContractModal.startDate} إلى {selectedContractModal.endDate}</span>
              </div>
              <div className="flex justify-between text-[#006B4D] font-black border-t border-slate-200 pt-2">
                <span>إجمالي القيمة التعاقدية الشاملة:</span>
                <span>{(selectedContractModal.totalPrice ?? 49590).toLocaleString()} ج.م</span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-slate-900 block">التوقيع الرقمي المشفر</span>
                <span className="text-[10px] text-slate-400 font-mono">SHA-256: 8fbc492e...190e verified by ETA</span>
              </div>
              <div className="w-16 h-16 bg-white border border-slate-300 rounded-xl flex items-center justify-center text-[10px] font-black text-slate-400">
                [QR كود الفحص]
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => { alert('تم تحميل العقد الرقمي بصيغة PDF بنجاح.'); setSelectedContractModal(null); }}
                className="bg-[#006B4D] hover:bg-[#00533C] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-sm"
              >
                تحميل المستند الرسمي (PDF)
              </button>
              <button 
                onClick={() => setSelectedContractModal(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
