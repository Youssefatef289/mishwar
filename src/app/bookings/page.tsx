"use client";

import React, { useState } from 'react';
import { FileText, Clock, CheckCircle, Car, MapPin, Phone, MessageCircle, FileBadge, Navigation, Key, Shield, Download, Check } from 'lucide-react';

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState('All');
  
  const tabs = ['All', 'Active', 'Ready', 'Review', 'Archive'];
  
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] p-6 font-sans dir-rtl">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header & Stats */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">حجوزاتي</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">نشط حالياً</p>
              <p className="text-2xl font-bold text-[#006B4D]">1</p>
            </div>
            <div className="bg-[#006B4D]/10 p-3 rounded-full text-[#006B4D]">
              <Car size={24} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">قادمة</p>
              <p className="text-2xl font-bold text-[#F59E0B]">2</p>
            </div>
            <div className="bg-[#F59E0B]/10 p-3 rounded-full text-[#F59E0B]">
              <Clock size={24} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">مكتملة</p>
              <p className="text-2xl font-bold text-[#10B981]">8</p>
            </div>
            <div className="bg-[#10B981]/10 p-3 rounded-full text-[#10B981]">
              <CheckCircle size={24} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 space-x-reverse overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-[#006B4D] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {tab === 'All' ? 'الكل' : tab === 'Active' ? 'نشط' : tab === 'Ready' ? 'جاهز للاستلام' : tab === 'Review' ? 'قيد المراجعة' : 'الأرشيف'}
            </button>
          ))}
        </div>

        {/* Active Booking Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#006B4D]/20 overflow-hidden">
          <div className="bg-[#006B4D]/5 p-4 border-b border-[#006B4D]/10 flex justify-between items-center">
            <div className="flex items-center space-x-3 space-x-reverse">
              <span className="bg-[#10B981] w-3 h-3 rounded-full animate-pulse"></span>
              <span className="font-semibold text-[#006B4D]">حجز نشط #B-4920</span>
            </div>
            <span className="text-sm font-medium bg-white px-3 py-1 rounded-full text-gray-700 border border-gray-200">
              ينتهي بعد يومين
            </span>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Car Image/Info Placeholder */}
              <div className="w-full md:w-1/3 space-y-4">
                <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <Car size={64} className="text-gray-300" />
                  <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded text-xs font-bold border border-gray-200">
                    أ ب ج 1234
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">بورش كايين 2024</h3>
                  <p className="text-gray-500">رياضية • أوتوماتيك • بنزين</p>
                </div>
                
                {/* Live Tracking */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 flex items-center gap-2"><Navigation size={16}/> مستوى الوقود</span>
                    <span className="font-semibold">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-[#10B981] h-1.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-2">
                    <span className="text-gray-600 flex items-center gap-2"><MapPin size={16}/> المسافة المقطوعة</span>
                    <span className="font-semibold">120 كم</span>
                  </div>
                </div>
              </div>

              {/* Details & Actions */}
              <div className="w-full md:w-2/3 space-y-6">
                
                {/* Stepper */}
                <div className="flex justify-between relative pt-2">
                  <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>
                  <div className="absolute top-5 right-0 w-3/4 h-0.5 bg-[#006B4D] -z-10"></div>
                  
                  {[
                    { label: 'تأكيد الحجز', done: true },
                    { label: 'تجهيز السيارة', done: true },
                    { label: 'في الطريق', done: true },
                    { label: 'التسليم', done: true },
                    { label: 'الإرجاع', done: false },
                  ].map((step, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 bg-white px-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${step.done ? 'bg-[#006B4D] border-[#006B4D] text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                        {step.done ? <Check size={12} /> : i + 1}
                      </div>
                      <span className={`text-xs ${step.done ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>{step.label}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Documents */}
                  <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3">
                    <h4 className="font-semibold text-sm text-gray-700 flex items-center gap-2"><FileText size={18}/> المستندات</h4>
                    <button className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg text-sm text-[#006B4D] font-medium transition-colors">
                      <span className="flex items-center gap-2"><FileBadge size={16} /> عقد الإيجار.pdf</span>
                      <Download size={16} />
                    </button>
                    <button className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg text-sm text-[#006B4D] font-medium transition-colors">
                      <span className="flex items-center gap-2"><Shield size={16} /> وثيقة التأمين الشامل.pdf</span>
                      <Download size={16} />
                    </button>
                  </div>

                  {/* Representative */}
                  <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3">
                    <h4 className="font-semibold text-sm text-gray-700 flex items-center gap-2"><Key size={18}/> ممثل التسليم</h4>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
                        أ
                      </div>
                      <div>
                        <p className="text-sm font-bold">أحمد محمد</p>
                        <p className="text-xs text-gray-500">متواجد في الموقع</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button className="flex-1 bg-[#006B4D] text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#005a41] transition-colors">
                        <Phone size={14} /> اتصال
                      </button>
                      <button className="flex-1 bg-white border border-[#006B4D] text-[#006B4D] py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                        <MessageCircle size={14} /> محادثة
                      </button>
                    </div>
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
