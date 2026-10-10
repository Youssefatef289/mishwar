"use client";
import React from 'react';
import { LineChart, Users, Store, Shield, AlertTriangle, CheckCircle2, XCircle, FileSearch, ArrowUpRight } from 'lucide-react';

export default function AdminDashboard() {
  const kpis = [
    { label: 'إجمالي القيمة الإجمالية (GMV)', value: '14.2M ج.م', icon: LineChart, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10', trend: '+12.5%' },
    { label: 'المستخدمين النشطين', value: '8,290', icon: Users, color: 'text-[#3B82F6]', bg: 'bg-[#3B82F6]/10', trend: '+5.2%' },
    { label: 'المعارض الموثقة', value: '142', icon: Store, color: 'text-[#006B4D]', bg: 'bg-[#006B4D]/10', trend: '+2' },
  ];

  const onboardingRequests = [
    { id: 'REQ-001', name: 'معرض الأوتو الحديث', location: 'القاهرة', docs: '4/5', status: 'قيد المراجعة' },
    { id: 'REQ-002', name: 'أفانتي لتأجير السيارات', location: 'الإسكندرية', docs: '5/5', status: 'مكتمل' },
    { id: 'REQ-003', name: 'موتورز ستار', location: 'الجيزة', docs: '2/5', status: 'نواقص' },
  ];

  const liveOps = [
    { time: '14:23', type: 'تنبيه', message: 'تأخر في تسليم سيارة - الطلب #4459', priority: 'high' },
    { time: '14:15', type: 'نظام', message: 'تحديث بيانات أسعار التأمين الشامل', priority: 'low' },
    { time: '13:50', type: 'دعم', message: 'طلب إلغاء من عميل VIP - قيد المعالجة', priority: 'medium' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] p-4 md:p-8">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="w-8 h-8 text-[#006B4D]" />
            لوحة تحكم الإدارة العليا
          </h1>
          <p className="text-gray-500 mt-2">نظرة عامة على الأداء والموافقات والعمليات الحية</p>
        </div>
      </div>

      {/* Main KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-xl ${kpi.bg}`}>
                <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold">{kpi.value}</p>
              </div>
            </div>
            <div className="flex items-center text-sm font-medium text-[#10B981]">
              {kpi.trend} <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Onboarding Pipeline */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FileSearch className="text-[#F59E0B]" />
              طلبات انضمام المعارض
            </h2>
            <button className="text-sm text-[#006B4D] font-medium">عرض الكل</button>
          </div>
          <div className="flex-1 space-y-4">
            {onboardingRequests.map((req, idx) => (
              <div key={idx} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-bold text-gray-800">{req.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{req.location} • المستندات: {req.docs}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium border
                    ${req.status === 'مكتمل' ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20' : 
                      req.status === 'نواقص' ? 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20' : 
                      'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20'}`}>
                    {req.status}
                  </span>
                  <div className="flex gap-1">
                    <button className="p-1.5 text-[#10B981] hover:bg-[#10B981]/10 rounded-md" title="قبول"><CheckCircle2 className="w-5 h-5" /></button>
                    <button className="p-1.5 text-[#EF4444] hover:bg-[#EF4444]/10 rounded-md" title="رفض"><XCircle className="w-5 h-5" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Operations Feed & Governance */}
        <div className="space-y-8">
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <AlertTriangle className="text-[#EF4444]" />
              تغذية العمليات الحية (Live Ops)
            </h2>
            <div className="space-y-4 relative before:absolute before:inset-y-0 before:right-[15px] before:w-[2px] before:bg-gray-100">
              {liveOps.map((op, idx) => (
                <div key={idx} className="relative pr-10">
                  <div className={`absolute right-0 top-1.5 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center z-10
                    ${op.priority === 'high' ? 'bg-[#EF4444]' : op.priority === 'medium' ? 'bg-[#F59E0B]' : 'bg-gray-400'}`}>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-sm text-gray-800">{op.type}</span>
                      <span className="text-xs text-gray-500 font-mono">{op.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{op.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Governance Matrix Snippet */}
          <div className="bg-[#006B4D] text-white rounded-2xl shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <h2 className="text-lg font-bold mb-4 relative z-10">مصفوفة الصلاحيات (مختصر)</h2>
            <div className="grid grid-cols-2 gap-4 relative z-10 text-sm">
              <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                <span className="block text-white/70 mb-1">تجميد حساب معرض</span>
                <span className="font-bold">مدير العمليات +</span>
              </div>
              <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                <span className="block text-white/70 mb-1">تعديل نسبة العمولة</span>
                <span className="font-bold">المدير المالي</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
