"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Navigation, MapPin, Gauge, ShieldAlert, ShieldCheck, 
  Power, Fuel, Activity, Radio, Cpu, AlertTriangle, 
  CheckCircle2, ArrowLeft, RefreshCw 
} from 'lucide-react';

export default function FleetLiveTrackingPage() {
  const [selectedVehicle, setSelectedVehicle] = useState('car_1');
  const [immobilizerLocked, setImmobilizerLocked] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const trackedVehicles = [
    {
      id: 'car_1',
      name: 'بورشه Cayenne GTS 2024',
      plate: 'أ ب ج 4921',
      driver: 'م. طارق المنشاوي (مستأجر موثق)',
      location: 'القاهرة الجديدة، الطريق الدائري الأوسطي',
      speed: 85,
      fuel: 78,
      temp: 90,
      tpms: [32, 32, 33, 32],
      battery: '13.8V',
      status: 'moving',
      geofence: 'داخل النطاق المسموح (القاهرة الكبرى)',
      contractId: 'E-CTR-2026-CAI-9941'
    },
    {
      id: 'car_2',
      name: 'مرسيدس-بنز S450 Maybach',
      plate: 'س ع ط 1104',
      driver: 'د. خالد الصاوي',
      location: 'الجيزة، محور 26 يوليو باتجاه زايد',
      speed: 62,
      fuel: 65,
      temp: 88,
      tpms: [33, 33, 32, 33],
      battery: '14.1V',
      status: 'moving',
      geofence: 'داخل النطاق المسموح (الشيخ زايد)',
      contractId: 'E-CTR-2026-CAI-9938'
    },
    {
      id: 'car_3',
      name: 'بي إم دبليو 520i M-Sport',
      plate: 'ر ن م 8892',
      driver: 'أ. هاني عبد المجيد',
      location: 'طريق العلمين - الساحل الشمالي',
      speed: 105,
      fuel: 52,
      temp: 92,
      tpms: [32, 31, 32, 32],
      battery: '13.9V',
      status: 'moving',
      geofence: 'داخل نطاق الساحل الشمالي الإقليمي',
      contractId: 'E-CTR-2026-CAI-9912'
    },
    {
      id: 'car_4',
      name: 'تويوتا فورتشنر 4.0L V6',
      plate: 'ق هـ و 3319',
      driver: 'متوقفة في فرع التجمع الخامس',
      location: 'صالة العرض الرئيسية - التجمع',
      speed: 0,
      fuel: 95,
      temp: 45,
      tpms: [32, 32, 32, 32],
      battery: '12.8V',
      status: 'parked',
      geofence: 'آمنة في الجراج الرئيسي',
      contractId: 'متاحة للتأجير'
    }
  ];

  const currentCar = trackedVehicles.find(v => v.id === selectedVehicle) || trackedVehicles[0];

  const handleToggleImmobilizer = () => {
    if (!immobilizerLocked) {
      const confirmAction = confirm(
        `تنبيه أمني هام:\nهل أنت متأكد من تفعيل "قفل المحرك عن بعد (Remote Immobilizer)" للمركبة ${currentCar.name}؟\nسيتم إيقاف تدفق الوقود تدريجياً وإيقاف المحرك عند التوقف التام.`
      );
      if (confirmAction) {
        setImmobilizerLocked(true);
        alert('تم إرسال إشارة قفل المحرك بنجاح عبر بروتوكول OBD-II / CAN-Bus.');
      }
    } else {
      setImmobilizerLocked(false);
      alert('تم إلغاء قفل المحرك واستعادة تشغيل المركبة طبيعياً.');
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-right font-sans">
      
      {/* Top Header */}
      <div className="bg-[#0B132B] text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 animate-pulse text-[#10B981]" />
                <span>منظومة التيليماتكس والتتبع المباشر IoT (بث حي للأجهزة)</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              التتبع المباشر لأسطول المركبات والحالة الفنية
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              مراقبة المسارات الحية في القاهرة، الجيزة، والساحل مع لوحة القياس الفوري والتحكم عن بعد
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleRefresh}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 border border-white/20 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>تحديث الإحداثيات</span>
            </button>
            <Link 
              href="/dealer/dashboard" 
              className="bg-[#006B4D] hover:bg-[#00543C] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <span>العودة للوحة التحكم</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Right Column: Fleet List (4 cols in RTL) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                <h2 className="text-sm font-black text-slate-900">المركبات النشطة على الطريق ({trackedVehicles.length})</h2>
                <span className="text-[11px] font-bold text-[#10B981]">متصلة عبر 4G/GPS</span>
              </div>

              <div className="space-y-3">
                {trackedVehicles.map(v => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedVehicle(v.id);
                      setImmobilizerLocked(false);
                    }}
                    className={`w-full p-4 rounded-2xl border text-right transition-all flex flex-col gap-2 ${
                      selectedVehicle === v.id 
                        ? 'bg-[#E6F4EF] border-[#006B4D] ring-2 ring-[#006B4D]/20 shadow-sm' 
                        : 'bg-slate-50 border-slate-200/80 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xs font-black text-slate-900">{v.name}</h3>
                        <p className="text-[11px] font-mono text-slate-500 font-bold" dir="ltr">{v.plate}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        v.status === 'moving' 
                          ? 'bg-[#10B981]/20 text-[#006B4D]' 
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {v.status === 'moving' ? `${v.speed} كم/س` : 'متوقفة'}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 truncate flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#006B4D] shrink-0" />
                      <span>{v.location}</span>
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center & Left: Interactive Map & Telematics (8 cols in RTL) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Interactive GPS Map Canvas */}
            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm overflow-hidden">
              <div className="relative h-80 sm:h-96 rounded-2xl bg-[#0F172A] overflow-hidden flex items-center justify-center border border-slate-800">
                {/* Background Map Visual */}
                <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* Visual Route Lines Simulation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path 
                    d="M 120 280 Q 280 180 420 120 T 700 80" 
                    fill="none" 
                    stroke="#10B981" 
                    strokeWidth="3" 
                    strokeDasharray="6 6"
                    className="animate-pulse"
                  />
                </svg>

                {/* Pin Point Active Location */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#10B981]/30 border-2 border-[#10B981] flex items-center justify-center animate-ping absolute"></div>
                  <div className="w-12 h-12 rounded-2xl bg-[#006B4D] border-2 border-white text-white flex items-center justify-center shadow-2xl relative z-10">
                    <Navigation className="w-6 h-6 transform rotate-45" />
                  </div>
                  <div className="bg-slate-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-xl mt-3 shadow-lg border border-slate-700 text-center">
                    <span className="block text-[#10B981]">{currentCar.name}</span>
                    <span className="text-[10px] text-slate-300 font-normal">{currentCar.location}</span>
                  </div>
                </div>

                {/* Map Floating Control Badges */}
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <span className="bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-[#10B981] animate-pulse" />
                    <span>تحديث كل 3 ثوانٍ</span>
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 z-20">
                  <div className="bg-slate-900/80 backdrop-blur-md text-white p-2.5 rounded-xl text-xs font-bold border border-slate-700">
                    <span className="text-slate-400 block text-[10px]">النطاق الجغرافي:</span>
                    <span className="text-[#10B981]">{currentCar.geofence}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Telematics Dashboard & Remote Control */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    البيانات الحية لأجهزة المركبة (OBD-II Telematics)
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">
                    مركبة: {currentCar.name} • السائق: {currentCar.driver}
                  </p>
                </div>

                {/* Remote Engine Immobilizer CTA Button */}
                <button
                  onClick={handleToggleImmobilizer}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm transition-all ${
                    immobilizerLocked 
                      ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse' 
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <Power className="w-4 h-4 text-amber-300" />
                  <span>{immobilizerLocked ? 'المحرك مقفول (إلغاء القفل)' : 'قفل المحرك عن بعد (Immobilizer)'}</span>
                </button>
              </div>

              {/* 4 Telematics Gauges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                
                {/* Speed */}
                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-100 text-center">
                  <Gauge className="w-6 h-6 text-[#006B4D] mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-slate-400 block">السرعة الحالية</span>
                  <span className="text-2xl font-black text-slate-900">{currentCar.speed}</span>
                  <span className="text-[10px] text-slate-500 font-bold block">كم / ساعة</span>
                </div>

                {/* Fuel */}
                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-100 text-center">
                  <Fuel className="w-6 h-6 text-[#3B82F6] mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-slate-400 block">مستوى الوقود</span>
                  <span className="text-2xl font-black text-slate-900">{currentCar.fuel}%</span>
                  <span className="text-[10px] text-emerald-600 font-bold block">بنزين 95 سوبر</span>
                </div>

                {/* Coolant Temp */}
                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-100 text-center">
                  <Activity className="w-6 h-6 text-amber-500 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-slate-400 block">حرارة سائل التبريد</span>
                  <span className="text-2xl font-black text-slate-900">{currentCar.temp}°C</span>
                  <span className="text-[10px] text-slate-500 font-bold block">نطاق مثالي</span>
                </div>

                {/* Battery */}
                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-100 text-center">
                  <Cpu className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-slate-400 block">جهد البطارية الديناميكي</span>
                  <span className="text-2xl font-black text-slate-900">{currentCar.battery}</span>
                  <span className="text-[10px] text-emerald-600 font-bold block">شحن ممتاز</span>
                </div>

              </div>

              {/* Tire Pressure Monitoring System (TPMS) */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-slate-700">مراقبة ضغط الإطارات الذكي (TPMS):</span>
                  <span className="text-[11px] font-bold text-[#10B981] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    الضغط متزن لجميع العجلات ✓
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">أمامي أيمن</span>
                    <span className="font-black text-slate-900">{currentCar.tpms[0]} PSI</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">أمامي أيسر</span>
                    <span className="font-black text-slate-900">{currentCar.tpms[1]} PSI</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">خلفي أيمن</span>
                    <span className="font-black text-slate-900">{currentCar.tpms[2]} PSI</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">خلفي أيسر</span>
                    <span className="font-black text-slate-900">{currentCar.tpms[3]} PSI</span>
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

