"use client";
import React, { useState, useEffect } from 'react';
import { getFleet, saveCar, getCurrentUser, Car } from '@/utils/storage';
import { 
  Key, Plus, Calendar, DollarSign, TrendingUp, ShieldCheck, 
  Car as CarIcon, CheckCircle2, Star, Clock 
} from 'lucide-react';

export default function HostDashboardPage() {
  const [myCars, setMyCars] = useState<Car[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [brand, setBrand] = useState('تويوتا');
  const [model, setModel] = useState('كورولا 2024');
  const [year, setYear] = useState(2024);
  const [dailyPrice, setDailyPrice] = useState(2200);
  const [rentalType, setRentalType] = useState('يومي ومشاوير بسائق');
  const [city, setCity] = useState('القاهرة - التجمع الخامس');

  useEffect(() => {
    const user = getCurrentUser();
    const all = getFleet();
    if (user) {
      setMyCars(all.filter(c => c.ownerId === user.id || c.ownerId === 'host_ahmed'));
    }
  }, []);

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    const user = getCurrentUser();
    const newCar: Car = {
      id: 'car_host_' + Date.now(),
      ownerId: user ? user.id : 'host_ahmed',
      brand,
      model,
      year: Number(year),
      category: 'سيدان اقتصادية فاخرة',
      dailyPrice: Number(dailyPrice),
      images: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80'],
      status: 'available',
      mileageLimit: '300 كم/اليوم',
      transmission: 'أوتوماتيك',
      fuel: 'بنزين 92',
      seats: 5,
      horsepower: '140 حصان',
      rating: 4.9,
      inspectionScore: 95,
      dealershipName: user?.name || 'أحمد كمال (مالك P2P)',
      features: ['تأمين شامل', 'شاشة ذكية', 'بلوتوث'],
      tags: [rentalType, city]
    };

    saveCar(newCar);
    setMyCars([...myCars, newCar]);
    setIsAddModalOpen(false);
    alert('تمت إضافة سيارتك الشخصية بنجاح إلى شبكة مشوار للمشاوير والتأجير!');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-right">
      
      {/* Top Banner */}
      <div className="bg-[#0B132B] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#006B4D] flex items-center justify-center text-white shadow-lg shrink-0">
              <Key className="w-8 h-8 text-[#10B981]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 px-3 py-0.5 rounded-full text-xs font-black">
                  مضيف معتمد P2P • رخصة موثقة
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white">لوحة مالك السيارة - تأجير ومشاوير ذكية</h1>
            </div>
          </div>

          <div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#006B4D] hover:bg-[#00533C] text-white px-5 py-3 rounded-2xl font-bold text-xs md:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>إضافة سيارتي الخاصة للتأجير</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Earnings KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <span className="text-xs font-bold text-slate-400 block mb-1">صافي أرباح الشهر الحالي</span>
            <span className="text-3xl font-black text-[#006B4D] block">38,400 <span className="text-xs">ج.م</span></span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <span className="text-xs font-bold text-slate-400 block mb-1">السيارات المعروضة</span>
            <span className="text-3xl font-black text-slate-900 block">{myCars.length} <span className="text-xs">سيارات</span></span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <span className="text-xs font-bold text-slate-400 block mb-1">المشاوير المكتملة</span>
            <span className="text-3xl font-black text-[#3B82F6] block">19 <span className="text-xs">مشواراً</span></span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <span className="text-xs font-bold text-slate-400 block mb-1">متوسط تقييم المستأجرين</span>
            <div className="flex items-center gap-1.5 mt-1">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="text-2xl font-black text-slate-900">4.9 / 5</span>
            </div>
          </div>
        </div>

        {/* My Listed Cars */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
          <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-4">
            سياراتي المعروضة على المنصة
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myCars.map((car) => (
              <div key={car.id} className="border border-slate-200 rounded-2xl p-4 flex items-center gap-4 bg-[#F8FAFC]">
                <img 
                  src={car.images?.[0] || 'https://via.placeholder.com/200'} 
                  alt="Car" 
                  className="w-24 h-16 object-contain rounded-xl bg-white p-1"
                />
                <div className="flex-1">
                  <h3 className="font-black text-slate-900 text-sm">{car.brand} {car.model}</h3>
                  <p className="text-xs text-slate-500 font-bold">{car.dailyPrice?.toLocaleString()} ج.م / يوم</p>
                  <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-full mt-1">
                    جاهزة للاستلام
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full border border-slate-200 shadow-2xl text-right space-y-4 text-xs font-bold">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h2 className="text-lg font-black text-slate-900">إضافة سيارة شخصية للتأجير P2P</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 font-black">✕</button>
            </div>

            <form onSubmit={handleAddCar} className="space-y-3">
              <div>
                <label className="block text-slate-700 mb-1">الماركة والموديل</label>
                <input 
                  type="text" 
                  value={`${brand} ${model}`}
                  onChange={e => setModel(e.target.value)}
                  required 
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5" 
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">السعر المطلوب لليوم أو المشوار (ج.م)</label>
                <input 
                  type="number" 
                  value={dailyPrice} 
                  onChange={e => setDailyPrice(Number(e.target.value))}
                  required 
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5" 
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">نوع الإيجار</label>
                <select 
                  value={rentalType} 
                  onChange={e => setRentalType(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5"
                >
                  <option value="يومي ومشاوير بسائق">يومي ومشاوير خاصة بسائق</option>
                  <option value="قيادة ذاتية يومي فقط">قيادة ذاتية يومي فقط</option>
                  <option value="مشاوير مطار ومناسبات">مشاوير مطار ومناسبات VIP</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">منطقة التسليم والتواجد</label>
                <input 
                  type="text" 
                  value={city} 
                  onChange={e => setCity(e.target.value)}
                  required 
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5" 
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="submit" className="bg-[#006B4D] text-white px-5 py-2.5 rounded-xl font-bold">
                  نشر السيارة فوراً
                </button>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="bg-slate-100 text-slate-700 px-3 py-2.5 rounded-xl">
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
