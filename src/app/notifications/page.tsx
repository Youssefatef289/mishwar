"use client";

import React, { useState } from 'react';
import { Bell, FileSignature, ShieldAlert, Gift, MessageSquare, AlertCircle, PhoneCall, HeadphonesIcon, Settings, CheckCheck, Clock } from 'lucide-react';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('All');
  
  const tabs = [
    { id: 'All', label: 'الكل' },
    { id: 'Bookings', label: 'الحجوزات', count: 1 },
    { id: 'Contracts', label: 'العقود', count: 2 },
    { id: 'Security', label: 'تنبيهات الأمان' },
    { id: 'Offers', label: 'العروض', count: 1 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] p-6 font-sans dir-rtl">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              الإشعارات <Bell className="text-[#006B4D]" size={28} />
            </h1>
            <button className="text-sm font-medium text-gray-500 hover:text-[#006B4D] flex items-center gap-1 transition-colors">
              <CheckCheck size={16} /> تحديد الكل كمقروء
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-xs mb-1">تنبيهات التسليم</p>
              <p className="text-xl font-bold text-[#006B4D]">1</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-xs mb-1">عقود للتوقيع</p>
              <p className="text-xl font-bold text-[#F59E0B]">2</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-xs mb-1">أمان النظام</p>
              <p className="text-xl font-bold text-[#EF4444]">0</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-xs mb-1">نقاط جديدة</p>
              <p className="text-xl font-bold text-[#3B82F6]">+500</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 space-x-reverse overflow-x-auto pb-2 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#006B4D] text-[#006B4D]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count && (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-[#006B4D] text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Notification List */}
          <div className="space-y-4">
            
            {/* Urgent Action - Delivery */}
            <div className="bg-white rounded-xl p-5 border-l-4 border-l-[#F59E0B] shadow-md flex gap-4 relative overflow-hidden">
              <div className="bg-[#F59E0B]/10 p-3 rounded-full h-fit text-[#F59E0B]">
                <Clock size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">موعد استلام السيارة يقترب!</h3>
                  <span className="text-xs text-gray-400">منذ 10 دقائق</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">ممثلينا في طريقهم إليك لتسليم سيارة بورش كايين. يرجى التواجد في الموقع المحدد خلال 30 دقيقة.</p>
                <div className="flex gap-3">
                  <button className="bg-[#006B4D] text-white px-4 py-2 rounded-lg text-sm font-medium">تتبع المندوب</button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">تعديل الموعد</button>
                </div>
              </div>
              {/* Unread indicator */}
              <div className="absolute top-5 right-5 w-2 h-2 bg-[#F59E0B] rounded-full"></div>
            </div>

            {/* Action Required - Contract */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex gap-4 relative">
              <div className="bg-[#3B82F6]/10 p-3 rounded-full h-fit text-[#3B82F6]">
                <FileSignature size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">مطلوب توقيعك الرقمي</h3>
                  <span className="text-xs text-gray-400">منذ ساعتين</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">عقد الإيجار رقم #CTR-889 جاهز للتوقيع. يرجى قراءة الشروط والأحكام وتوقيع العقد رقمياً لبدء الإيجار.</p>
                <button className="border border-[#3B82F6] text-[#3B82F6] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3B82F6]/5">معاينة وتوقيع العقد</button>
              </div>
              <div className="absolute top-5 right-5 w-2 h-2 bg-[#3B82F6] rounded-full"></div>
            </div>

            {/* Security Alert */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex gap-4 opacity-75">
              <div className="bg-gray-100 p-3 rounded-full h-fit text-gray-500">
                <ShieldAlert size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-700">تسجيل دخول جديد</h3>
                  <span className="text-xs text-gray-400">أمس، 09:45 م</span>
                </div>
                <p className="text-gray-500 text-sm">تم تسجيل الدخول إلى حسابك من جهاز جديد (iPhone 14) في مدينة جدة.</p>
              </div>
            </div>

            {/* Points / Offers */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex gap-4">
              <div className="bg-[#10B981]/10 p-3 rounded-full h-fit text-[#10B981]">
                <Gift size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-800">مكافأة الاسترداد النقدي!</h3>
                  <span className="text-xs text-gray-400">منذ يومين</span>
                </div>
                <p className="text-gray-600 text-sm">تهانينا! تمت إضافة 500 نقطة إلى محفظتك كاسترداد نقدي لرحلتك السابقة.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Floating Sidebar */}
        <div className="w-full lg:w-80 space-y-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 sticky top-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <HeadphonesIcon className="text-[#006B4D]" size={20} /> المساعدة العاجلة
            </h3>
            <p className="text-sm text-gray-500 mb-5">فريق الدعم متاح على مدار الساعة للإجابة على استفساراتك وحل أي مشكلة.</p>
            
            <div className="space-y-3">
              <button className="w-full bg-[#006B4D] text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#005a41] transition-colors shadow-md shadow-[#006B4D]/20">
                <PhoneCall size={18} /> الاتصال بخدمة العملاء
              </button>
              <button className="w-full bg-white border-2 border-gray-100 text-gray-700 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <MessageSquare size={18} /> محادثة فورية
              </button>
            </div>
            
            <div className="mt-6 pt-5 border-t border-gray-100">
              <a href="#" className="flex items-center justify-between text-sm text-gray-600 hover:text-[#006B4D]">
                <span className="flex items-center gap-2"><Settings size={16} /> إعدادات الإشعارات</span>
                <span className="text-gray-400">›</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
