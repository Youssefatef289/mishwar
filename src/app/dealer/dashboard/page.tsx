"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  getFleet, saveCar, updateCarStatus, getBookings, updateBookingStatus, 
  getCurrentUser, Car, Booking 
} from '@/utils/storage';
import { 
  Building2, Car as CarIcon, Plus, CheckCircle2, XCircle, 
  TrendingUp, Users, DollarSign, Calendar, ShieldCheck, 
  Sparkles, SlidersHorizontal, ArrowLeft, MessageSquare, 
  BarChart3, Clock, AlertCircle 
} from 'lucide-react';

export default function DealerDashboardPage() {
  const [fleet, setFleet] = useState<Car[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  
  // New Car Form State
  const [newBrand, setNewBrand] = useState('مرسيدس-بنز');
  const [newModel, setNewModel] = useState('E200 AMG 2024');
  const [newYear, setNewYear] = useState(2024);
  const [newCategory, setNewCategory] = useState('سيدان فاخرة');
  const [newPrice, setNewPrice] = useState(6500);
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80');

  useEffect(() => {
    setFleet(getFleet());
    setBookings(getBookings());
  }, []);

  const handleApprove = (id: string) => {
    updateBookingStatus(id, 'approved');
    setBookings([...getBookings()]);
  };

  const handleReject = (id: string) => {
    updateBookingStatus(id, 'rejected');
    setBookings([...getBookings()]);
  };

  const handleStatusChange = (carId: string, status: string) => {
    updateCarStatus(carId, status);
    setFleet([...getFleet()]);
  };

  const handleSaveCar = (e: React.FormEvent) => {
    e.preventDefault();
    const user = getCurrentUser();
    const newCar: Car = {
      id: 'car_' + Date.now(),
      ownerId: user ? user.id : 'dealer_royal',
      brand: newBrand,
      model: newModel,
      year: Number(newYear),
      category: newCategory,
      dailyPrice: Number(newPrice),
      images: [newImage],
      status: 'available',
      mileageLimit: '300 كم/اليوم',
      transmission: 'أوتوماتيك 9G-Tronic',
      fuel: 'بنزين 95',
      seats: 5,
      horsepower: '258 حصان توربو',
      rating: 5.0,
      inspectionScore: 98,
      dealershipName: user?.companyName || 'معرض رويال كارز الفاخرة',
      features: ['شاشة رقمية', 'فتحة سقف بانوراما', 'نظام ركن آلي'],
      tags: ['متاحة فوراً', 'تأمين شامل']
    };

    saveCar(newCar);
    setFleet([...getFleet()]);
    setIsAddCarModalOpen(false);
    alert('تمت إضافة السيارة الجديدة بنجاح إلى الأسطول وستظهر تلقائياً في الصفحة الرئيسية!');
  };

  const pendingBookings = bookings.filter(b => b.status === 'pending');

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-right">
      
      {/* Dealership Banner matching من لوحه التحكم المعرض.png */}
      <div className="bg-[#0B132B] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#006B4D] to-[#10B981] p-1 shadow-lg shrink-0">
              <div className="w-full h-full bg-[#0B132B] rounded-[14px] flex items-center justify-center text-white">
                <Building2 className="w-8 h-8 text-[#10B981]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 px-3 py-0.5 rounded-full text-xs font-black">
                  شريك بلاتينيوم معتمد VIP
                </span>
                <span className="text-xs text-slate-400 font-bold">فرع التجمع الخامس وأركان زايد</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white">بوابة إدارة الأساطيل - معرض رويال كارز الفاخرة</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsAddCarModalOpen(true)}
              className="bg-[#006B4D] hover:bg-[#00533C] text-white px-5 py-3 rounded-2xl font-bold text-xs md:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>إضافة سيارة جديدة للأسطول</span>
            </button>
            <Link 
              href="/dealer/chat"
              className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-2xl font-bold text-xs md:text-sm border border-white/20 transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#10B981]" />
              <span>محادثات العملاء</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* KPI Top Stat Widgets */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <span className="text-xs font-bold text-slate-400 block mb-1">إجمالي الأسطول</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{fleet.length}</span>
              <span className="text-xs font-bold text-slate-500">مركبة</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <span className="text-xs font-bold text-slate-400 block mb-1">طلبات بانتظار الموافقة</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#F59E0B]">{pendingBookings.length || 2}</span>
              <span className="text-xs font-bold text-amber-600">طلب فوري</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <span className="text-xs font-bold text-slate-400 block mb-1">صافي إيرادات الشهر</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#006B4D]">485,000</span>
              <span className="text-xs font-bold text-slate-500">ج.م</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <span className="text-xs font-bold text-slate-400 block mb-1">معدل الإشغال الحالي</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#3B82F6]">84%</span>
              <span className="text-xs font-bold text-blue-600">نشط</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <span className="text-xs font-bold text-slate-400 block mb-1">رضا العملاء المعتمدين</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#10B981]">99.1%</span>
              <span className="text-xs font-bold text-emerald-600">ممتاز</span>
            </div>
          </div>
        </div>

        {/* Priority Pending Orders Section */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              يتطلب إجراء خلال ساعتين
            </span>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#F59E0B]" />
              <span>طلبات الحجز ذات الأولوية الفورية</span>
            </h2>
          </div>

          {pendingBookings.length === 0 ? (
            <p className="text-xs font-bold text-slate-400 text-center py-6">لا توجد طلبات معلقة حالياً، تم الرد على كافة الحجوزات.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {pendingBookings.map((b) => (
                <div key={b.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black text-slate-900">طلب حجز كود: {b.id}</span>
                      <span className="text-xs font-bold text-[#006B4D]">• {b.renterName}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-semibold">
                      المدة: {b.startDate} إلى {b.endDate} ({b.totalDays} أيام) • الاستلام: {b.branch}
                    </p>
                    <p className="text-xs font-black text-[#006B4D] mt-1">
                      القيمة: {(b.totalPrice ?? 49590).toLocaleString()} ج.م (مدفوعة بنجاح)
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleApprove(b.id)}
                      className="bg-[#10B981] hover:bg-[#059669] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>موافقة فورية</span>
                    </button>
                    <button 
                      onClick={() => handleReject(b.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2.5 rounded-xl font-bold text-xs transition-all"
                    >
                      رفض الطلب
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Fleet Inventory Management Table matching Screenshot */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-slate-400">تحديث الحالات ينعكس فورياً في الموقع</span>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <CarIcon className="w-5 h-5 text-[#006B4D]" />
              <span>إدارة وجاهزية أسطول السيارات</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-extrabold pb-3">
                  <th className="py-3 pr-2">السيارة</th>
                  <th className="py-3">الفئة والموديل</th>
                  <th className="py-3">السعر اليومي</th>
                  <th className="py-3">حالة الجاهزية</th>
                  <th className="py-3 text-left pl-2">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                {fleet.map((car) => (
                  <tr key={car.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 pr-2 flex items-center gap-3">
                      <img 
                        src={car.images?.[0] || 'https://via.placeholder.com/150'} 
                        alt="Car" 
                        className="w-14 h-10 object-contain rounded-lg bg-slate-100 p-1"
                      />
                      <span className="font-black text-slate-900">{car.brand} {car.model}</span>
                    </td>
                    <td className="py-4">{car.category} ({car.year})</td>
                    <td className="py-4 font-black text-[#006B4D]">{(car.dailyPrice ?? 14500).toLocaleString()} ج.م</td>
                    <td className="py-4">
                      <select 
                        value={car.status || 'available'}
                        onChange={(e) => handleStatusChange(car.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer ${
                          car.status === 'available' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : car.status === 'rented'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        <option value="available">متاحة فوراً</option>
                        <option value="rented">مؤجرة حالياً</option>
                        <option value="maintenance">صيانة دورية</option>
                      </select>
                    </td>
                    <td className="py-4 text-left pl-2">
                      <Link href={`/fleet/${car.id}`} className="text-[#006B4D] hover:underline font-bold">
                        معاينة العرض
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Add New Car Modal */}
      {isAddCarModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full border border-slate-200 shadow-2xl text-right space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h2 className="text-xl font-black text-slate-900">إضافة سيارة جديدة لأسطول المعرض</h2>
              <button onClick={() => setIsAddCarModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-black">✕</button>
            </div>

            <form onSubmit={handleSaveCar} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-slate-700 mb-1">الماركة (Brand)</label>
                <input 
                  type="text" 
                  value={newBrand} 
                  onChange={e => setNewBrand(e.target.value)} 
                  required 
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-slate-900" 
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">الموديل والفئة (Model & Trim)</label>
                <input 
                  type="text" 
                  value={newModel} 
                  onChange={e => setNewModel(e.target.value)} 
                  required 
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-slate-900" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1">سنة الصنع</label>
                  <input 
                    type="number" 
                    value={newYear} 
                    onChange={e => setNewYear(Number(e.target.value))} 
                    required 
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-slate-900" 
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">السعر اليومي (ج.م)</label>
                  <input 
                    type="number" 
                    value={newPrice} 
                    onChange={e => setNewPrice(Number(e.target.value))} 
                    required 
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-slate-900" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">فئة الهيكل</label>
                <select 
                  value={newCategory} 
                  onChange={e => setNewCategory(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-slate-900"
                >
                  <option value="سيدان فاخرة">سيدان فاخرة</option>
                  <option value="دفع رباعي SUV">دفع رباعي SUV</option>
                  <option value="كروس أوفر">كروس أوفر</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">رابط صورة السيارة</label>
                <input 
                  type="text" 
                  value={newImage} 
                  onChange={e => setNewImage(e.target.value)} 
                  required 
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-slate-900 text-left" 
                />
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button 
                  type="submit" 
                  className="bg-[#006B4D] hover:bg-[#00533C] text-white px-6 py-2.5 rounded-xl font-bold shadow-sm"
                >
                  حفظ ونشر في المنصة فوراً
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsAddCarModalOpen(false)}
                  className="bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl font-bold"
                >
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
