"use client";

import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [userType, setUserType] = useState('renter'); // renter | fleet
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row rtl">
      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 order-2 md:order-1">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#111827] mb-2">مرحباً بك في مشوار</h1>
            <p className="text-gray-500">سجل دخولك لمتابعة رحلتك</p>
          </div>

          <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
            <button
              onClick={() => setUserType('renter')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${userType === 'renter' ? 'bg-white text-[#111827] shadow-sm' : 'text-gray-500'}`}
            >
              مستأجر
            </button>
            <button
              onClick={() => setUserType('fleet')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${userType === 'fleet' ? 'bg-white text-[#111827] shadow-sm' : 'text-gray-500'}`}
            >
              أصحاب الأساطيل
            </button>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف أو البريد الإلكتروني</label>
              <div className="relative flex items-center">
                <div className="absolute right-3 flex items-center text-gray-400">
                  <span className="text-sm border-l pl-2 ml-2">🇪🇬 +20</span>
                </div>
                <input
                  type="text"
                  className="w-full pr-24 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006B4D] focus:border-transparent outline-none transition-all text-left"
                  placeholder="100 123 4567"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006B4D] focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <a href="#" className="text-sm text-[#006B4D] font-medium hover:underline">نسيت كلمة المرور؟</a>
              </div>
            </div>

            <Link href="/fleet" className="block w-full py-3 bg-[#006B4D] text-white text-center rounded-xl font-medium hover:bg-[#005a41] transition-colors shadow-lg shadow-[#006B4D]/30">
              تسجيل الدخول
            </Link>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">أو المتابعة عبر</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex justify-center items-center py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Google</span>
              </button>
              <button className="flex justify-center items-center py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.34-.85 3.73-.78 1.44.06 2.65.65 3.4 1.7-2.91 1.76-2.4 5.86.37 7.15-.71 1.71-1.63 3.3-2.58 4.1zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Apple</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Left Side - Visual */}
      <div className="hidden md:flex w-1/2 bg-[#006B4D] relative overflow-hidden items-center justify-center order-1 md:order-2">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#006B4D] via-[#006B4D]/80 to-transparent"></div>
        
        <div className="relative z-10 w-full max-w-lg p-8">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">اكتشف فخامة القيادة<br/>مع مشوار</h2>
            <p className="text-white/80 text-lg">المنصة الأولى لتأجير السيارات الفارهة والعملية في الشرق الأوسط.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
              <div className="flex items-center text-[#10B981] mb-2">
                <CheckCircle size={24} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">4,850+</div>
              <div className="text-white/70 text-sm">أسطول متكامل</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
              <div className="flex items-center text-[#3B82F6] mb-2">
                <CheckCircle size={24} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">99.8%</div>
              <div className="text-white/70 text-sm">رحلات ناجحة</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
