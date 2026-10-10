"use client";
import React from 'react';
import { Star, Plus, Wallet, Car, CalendarCheck, DollarSign, Activity, Check, X, Settings, ArrowUpRight, Clock } from 'lucide-react';

export default function DealerDashboard() {
  const stats = [
    { label: 'حجم الأسطول', value: '142 سيارة', icon: Car, color: 'text-blue-500', bg: 'bg-blue-100' },
    { label: 'الحجوزات النشطة', value: '84 حجز', icon: CalendarCheck, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10' },
    { label: 'صافي الأرباح (شهري)', value: '485,000 ج.م', icon: DollarSign, color: 'text-[#006B4D]', bg: 'bg-[#006B4D]/10' },
    { label: 'نسبة الإشغال', value: '84%', icon: Activity, color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10' },
  ];

  const liveOrders = [
    { id: '#ORD-992', car: 'مرسيدس C200', client: 'أحمد محمود', duration: '3 أيام', amount: '12,000 ج.م' },
    { id: '#ORD-993', car: 'بي إم دبليو X5', client: 'محمد خالد', duration: 'يومين', amount: '15,000 ج.م' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] p-4 md:p-8">
      {/* Banner */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
            VIP
          </div>
          <div>
            <h1 className="text-2xl font-bold">معرض النخبة للسيارات</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">باقة بلاتينيوم</span>
              <div className="flex items-center text-yellow-500 text-sm">
                <Star className="w-4 h-4 fill-current" />
                <span className="mx-1 text-gray-600">4.9 (128 تقييم)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#006B4D] text-white px-6 py-2.5 rounded-lg hover:bg-[#005a40] transition-colors font-medium">
            <Plus className="w-5 h-5" />
            إضافة سيارة
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border-2 border-[#006B4D] text-[#006B4D] px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            <Wallet className="w-5 h-5" />
            سحب الأرباح
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Priority Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Activity className="text-[#EF4444] animate-pulse" />
              طلبات عاجلة قيد الانتظار
            </h2>
            <button className="text-sm text-[#006B4D] hover:underline">عرض الكل</button>
          </div>
          <div className="space-y-4">
            {liveOrders.map((order, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Car className="text-gray-500 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">{order.car}</h3>
                    <p className="text-sm text-gray-500">{order.client} • {order.duration}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                  <div className="text-left font-bold text-lg text-[#006B4D]">{order.amount}</div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-[#10B981]/10 text-[#10B981] rounded-lg hover:bg-[#10B981]/20">
                      <Check className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-[#EF4444]/10 text-[#EF4444] rounded-lg hover:bg-[#EF4444]/20">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 360 Handover Queue */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Clock className="text-[#3B82F6]" />
            طابور التسليم (360)
          </h2>
          <div className="space-y-4">
            <div className="border-r-4 border-[#F59E0B] p-4 bg-gray-50 rounded-l-xl">
              <div className="flex justify-between mb-2">
                <span className="font-bold">تويوتا كامري</span>
                <span className="text-sm text-[#F59E0B] font-medium">الآن</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">فحص وتصوير 360 درجة قبل التسليم</p>
              <button className="w-full bg-white border border-gray-200 text-sm font-medium py-2 rounded-lg hover:bg-gray-50">بدء الفحص</button>
            </div>
            <div className="border-r-4 border-gray-300 p-4 bg-gray-50 rounded-l-xl">
              <div className="flex justify-between mb-2">
                <span className="font-bold">كيا سبورتاج</span>
                <span className="text-sm text-gray-500 font-medium">14:30</span>
              </div>
              <p className="text-sm text-gray-600">استلام من العميل</p>
            </div>
          </div>
        </div>

        {/* Fleet Inventory */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-6">حالة الأسطول</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-[#10B981]/20 bg-[#10B981]/5 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 mb-1">متاحة للإيجار</p>
                <p className="text-2xl font-bold text-[#10B981]">45</p>
              </div>
              <Check className="w-8 h-8 text-[#10B981] opacity-50" />
            </div>
            <div className="p-4 rounded-xl border border-[#3B82F6]/20 bg-[#3B82F6]/5 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 mb-1">مؤجرة حالياً</p>
                <p className="text-2xl font-bold text-[#3B82F6]">84</p>
              </div>
              <Car className="w-8 h-8 text-[#3B82F6] opacity-50" />
            </div>
            <div className="p-4 rounded-xl border border-[#EF4444]/20 bg-[#EF4444]/5 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 mb-1">في الصيانة</p>
                <p className="text-2xl font-bold text-[#EF4444]">13</p>
              </div>
              <Settings className="w-8 h-8 text-[#EF4444] opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
