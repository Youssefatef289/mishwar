"use client";
import React from 'react';
import { MapPin, Users, ToggleLeft, ToggleRight, Building2, Navigation, Plane, ShieldCheck } from 'lucide-react';

export default function BranchesPage() {
  const branches = [
    { name: 'المركز الرئيسي - التجمع الخامس', icon: Building2, location: 'القاهرة الجديدة', radius: '35 كم', status: 'نشط', type: 'إقليمي' },
    { name: 'فرع أركان بلازا', icon: Building2, location: 'الشيخ زايد', radius: '15 كم', status: 'نشط', type: 'محلي' },
    { name: 'صالة كبار الزوار - المطار', icon: Plane, location: 'مطار القاهرة', radius: 'مخصص', status: 'نشط', type: 'VIP' },
  ];

  const inspectors = [
    { name: 'محمود عبد السلام', role: 'مفتش أول', branch: 'التجمع الخامس', task: 'تسليم سيارة - مدينة نصر', status: 'في الطريق' },
    { name: 'كريم طارق', role: 'مفتش', branch: 'الشيخ زايد', task: 'استلام سيارة - أكتوبر', status: 'يعمل' },
    { name: 'سامي عادل', role: 'مفتش VIP', branch: 'المطار', task: 'لا توجد مهام حالية', status: 'متاح' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">إدارة الفروع والنطاقات الجغرافية</h1>
        <p className="text-gray-500 mt-2">تحكم في مناطق التغطية وسياسات التسليم للفروع المختلفة</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Branches & Policies) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Map Mock View */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden h-[300px] flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-blue-50">
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm font-medium text-sm text-gray-700 flex items-center gap-2 border border-gray-200">
              <MapPin className="w-4 h-4 text-[#EF4444]" />
              عرض الخريطة الحية للمناطق
            </div>
            
            {/* Mock Map Radius circles */}
            <div className="relative">
              <div className="w-64 h-64 rounded-full border-2 border-[#3B82F6] bg-[#3B82F6]/10 absolute -top-32 -right-32 animate-pulse"></div>
              <div className="w-32 h-32 rounded-full border-2 border-[#10B981] bg-[#10B981]/20 absolute -top-16 -right-16"></div>
              <MapPin className="w-8 h-8 text-[#006B4D] absolute top-0 right-0 z-10" />
            </div>
          </div>

          {/* Branches Cards */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Building2 className="text-[#006B4D]" />
              قائمة الفروع
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {branches.map((branch, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-[#006B4D]/30 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gray-50 rounded-lg text-[#006B4D]">
                        <branch.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold">{branch.name}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" /> {branch.location}
                        </p>
                      </div>
                    </div>
                    <span className="bg-[#10B981]/10 text-[#10B981] text-xs px-2 py-1 rounded-full font-medium">
                      {branch.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <span className="flex items-center gap-1"><Navigation className="w-4 h-4 text-gray-400" /> النطاق: {branch.radius}</span>
                    <span className="font-medium text-[#006B4D]">{branch.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Inspectors & Policies) */}
        <div className="space-y-8">
          {/* Handover Policies */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="text-[#3B82F6]" />
              سياسات التسليم
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium text-gray-800">التوصيل للمنزل (مجاني)</p>
                  <p className="text-xs text-gray-500 mt-1">ضمن نطاق 15 كم من الفرع</p>
                </div>
                <ToggleRight className="w-8 h-8 text-[#10B981]" />
              </div>
              <div className="flex justify-between items-center py-2 border-t border-gray-50">
                <div>
                  <p className="font-medium text-gray-800">التوصيل الإقليمي</p>
                  <p className="text-xs text-gray-500 mt-1">رسوم إضافية خارج النطاق</p>
                </div>
                <ToggleRight className="w-8 h-8 text-[#10B981]" />
              </div>
              <div className="flex justify-between items-center py-2 border-t border-gray-50">
                <div>
                  <p className="font-medium text-gray-800">الاستلام من الفرع فقط</p>
                  <p className="text-xs text-gray-500 mt-1">للسيارات الفارهة (VIP)</p>
                </div>
                <ToggleLeft className="w-8 h-8 text-gray-300" />
              </div>
            </div>
          </div>

          {/* Inspectors Directory */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Users className="text-[#F59E0B]" />
              فريق المفتشين
            </h2>
            <div className="space-y-4">
              {inspectors.map((inspector, idx) => (
                <div key={idx} className="flex gap-4 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-600 font-bold">
                    {inspector.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{inspector.name}</h4>
                    <p className="text-xs text-[#006B4D] mb-1">{inspector.role} • {inspector.branch}</p>
                    <p className="text-xs text-gray-500 truncate">{inspector.task}</p>
                  </div>
                  <div className="flex items-start">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1 ${inspector.status === 'متاح' ? 'bg-[#10B981]' : inspector.status === 'في الطريق' ? 'bg-[#3B82F6]' : 'bg-[#F59E0B]'}`}></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
              عرض جميع المفتشين
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
