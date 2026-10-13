"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerUser, setCurrentUser, User } from '@/utils/storage';
import { 
  UserPlus, ShieldCheck, Building2, User as UserIcon, Key, 
  Phone, Mail, Lock, CheckCircle2, ArrowLeft 
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'renter' | 'dealer' | 'host'>('renter');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+20 ');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: 'user_' + Date.now(),
      username: email.split('@')[0] || 'user_' + Date.now(),
      name,
      companyName: role === 'dealer' ? (companyName || name) : undefined,
      email,
      phone,
      role,
      verifiedNationalId: true,
      tier: role === 'dealer' ? 'معرض معتمد VIP' : 'عضو ذهبي'
    };

    registerUser(newUser);
    setCurrentUser(newUser);

    if (role === 'dealer') router.push('/dealer/dashboard');
    else if (role === 'host') router.push('/host/dashboard');
    else router.push('/my-bookings');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F8FAFC] flex items-center justify-center p-4 py-12 text-right">
      <div className="w-full max-w-xl bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100">
        
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-[#006B4D] bg-[#E6F4EF] px-3.5 py-1 rounded-full inline-block mb-3">
            انضم لمنظومة التنقل الذكي الأكثر تطوراً
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">إنشاء حساب جديد في مشوار</h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            اختر نوع حسابك للبدء في استئجار السيارات أو إدارة أسطولك
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="mb-6 bg-slate-50 border border-slate-100 p-3 rounded-2xl flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#006B4D] text-white flex items-center justify-center text-xs">1</span>
            <span className="text-slate-800">الخطوة 1 من 2: بيانات الحساب ونوع العضوية</span>
          </div>
          <span className="text-[#006B4D] bg-[#E6F4EF] px-2.5 py-1 rounded-full text-[11px]">متبقي خطوة</span>
        </div>

        {/* 3-Roles Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 bg-[#F8FAFC] p-1.5 rounded-2xl mb-6 border border-slate-200/80">
          <button 
            type="button"
            onClick={() => setRole('renter')}
            className={`flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl text-xs font-bold transition-all text-center ${
              role === 'renter' 
                ? 'bg-white text-[#006B4D] shadow-sm ring-1 ring-[#006B4D]/20' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>مستأجر / عميل</span>
            <span className="text-[10px] text-slate-400 font-normal">استئجار سيارات فاخرة</span>
          </button>

          <button 
            type="button"
            onClick={() => setRole('dealer')}
            className={`flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl text-xs font-bold transition-all text-center ${
              role === 'dealer' 
                ? 'bg-white text-[#006B4D] shadow-sm ring-1 ring-[#006B4D]/20' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>معرض معتمد</span>
            <span className="text-[10px] text-slate-400 font-normal">إدارة الأساطيل وعقود ETA</span>
          </button>

          <button 
            type="button"
            onClick={() => setRole('host')}
            className={`flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl text-xs font-bold transition-all text-center ${
              role === 'host' 
                ? 'bg-white text-[#006B4D] shadow-sm ring-1 ring-[#006B4D]/20' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>مالك سيارة (P2P)</span>
            <span className="text-[10px] text-slate-400 font-normal">مشاركة سيارتك واستثمارها</span>
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {role === 'dealer' ? 'اسم ممثل المعرض المسؤول' : 'الاسم الرباعي الكامل'}
            </label>
            <input 
              type="text" 
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="مثال: م. طارق المنشاوي"
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-slate-900 outline-none focus:border-[#006B4D]"
            />
          </div>

          {role === 'dealer' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">الاسم التجاري للمعرض / الشركة</label>
              <input 
                type="text" 
                required
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="مثال: معرض رويال كارز الفاخرة ش.م.م"
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-slate-900 outline-none focus:border-[#006B4D]"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">رقم الهاتف المحمول (+20)</label>
              <input 
                type="text" 
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+20 100 000 0000"
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-slate-900 outline-none focus:border-[#006B4D] text-left"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">البريد الإلكتروني</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-slate-900 outline-none focus:border-[#006B4D] text-left"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-slate-700">كلمة المرور (8 أحرف على الأقل)</label>
              {password.length > 0 && (
                <span className={`text-[11px] font-bold ${password.length >= 8 ? 'text-[#10B981]' : 'text-amber-500'}`}>
                  {password.length >= 8 ? 'قوة كلمة المرور: ممتازة ✓' : 'كلمة المرور: قصيرة'}
                </span>
              )}
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-slate-900 outline-none focus:border-[#006B4D]"
            />
            {/* Password strength bar */}
            {password.length > 0 && (
              <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    password.length >= 8 ? 'bg-[#10B981] w-full' : password.length >= 5 ? 'bg-amber-400 w-2/3' : 'bg-rose-500 w-1/3'
                  }`}
                ></div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-slate-600">
            <input type="checkbox" required defaultChecked className="accent-[#006B4D] w-4 h-4 rounded" />
            <span>أوافق على الشروط والأحكام ووثيقة العقود الإلكترونية الموحدة ETA</span>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#006B4D] hover:bg-[#00533C] text-white py-3.5 rounded-xl font-black text-sm shadow-md shadow-[#006B4D]/20 transition-all flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>تأكيد التسجيل والدخول الفوري</span>
          </button>

          <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-600">
            لديك حساب بالفعل؟{' '}
            <Link href="/login" className="font-bold text-[#006B4D] hover:underline">
              تسجيل الدخول من هنا
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}
