"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser, setCurrentUser, getUsers } from '@/utils/storage';
import { 
  Car, ShieldCheck, Lock, Eye, EyeOff, Sparkles, 
  ArrowLeft, CheckCircle2, Building2, User, Key, Phone, Mail 
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'renter' | 'dealer' | 'host'>('renter');
  const [identifier, setIdentifier] = useState('tarek_menshawy');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const handleRoleSelect = (selectedRole: 'renter' | 'dealer' | 'host') => {
    setRole(selectedRole);
    if (selectedRole === 'renter') setIdentifier('tarek_menshawy');
    else if (selectedRole === 'dealer') setIdentifier('royal_cars');
    else if (selectedRole === 'host') setIdentifier('ahmed_host');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = loginUser(identifier, role);
    if (user) {
      if (user.role === 'dealer') router.push('/dealer/dashboard');
      else if (user.role === 'host') router.push('/host/dashboard');
      else router.push('/my-bookings');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F8FAFC] flex flex-col lg:flex-row">
      
      {/* Visual Column (Left in RTL, visual hero with glassmorphic cards) */}
      <div className="lg:w-1/2 relative bg-[#0B132B] text-white p-8 md:p-14 flex flex-col justify-between overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1503376712351-56f8f7004f1e?auto=format&fit=crop&q=80" 
            alt="Luxury Fleet" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/60 to-transparent"></div>
        </div>

        {/* Top Badges */}
        <div className="relative z-10 flex flex-wrap gap-3">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs font-bold text-white">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            أسطول القاهرة والجيزة والساحل الشمالي
          </div>
          <div className="inline-flex items-center gap-1.5 bg-[#006B4D]/60 backdrop-blur-md border border-[#006B4D] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#E6F4EF]">
            <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
            فحص معتمد 150+ نقطة
          </div>
        </div>

        {/* Middle Stats Cards (Glassmorphic) */}
        <div className="relative z-10 my-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black leading-tight text-white">
            رحلتك القادمة تبدأ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#10B981] to-[#006B4D]">
              بأعلى معايير الرفاهية
            </span>
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-lg leading-relaxed">
            المنصة الذكية الأولى في مصر لربط المستأجرين بأرقى أساطيل السيارات الفاخرة والمعارض المعتمدة بعقود رقمية وتأمين شامل.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 max-w-md">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
              <span className="text-2xl md:text-3xl font-black text-white block">4,850+</span>
              <span className="text-xs text-slate-300 font-semibold">أسطول سيارات متاح فوراً</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
              <span className="text-2xl md:text-3xl font-black text-[#10B981] block">99.8%</span>
              <span className="text-xs text-slate-300 font-semibold">رحلات ناجحة بدون أي نزاع</span>
            </div>
          </div>
        </div>

        {/* Bottom Payment Badges */}
        <div className="relative z-10 pt-6 border-t border-white/10">
          <p className="text-xs text-slate-400 font-semibold mb-3">طرق الدفع المصرية المعتمدة فورياً:</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-lg text-xs font-bold text-white">ميزة Meeza</span>
            <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-lg text-xs font-bold text-[#10B981]">انستاباي InstaPay</span>
            <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-300">فوري Fawry</span>
            <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-lg text-xs font-bold text-white">البطاقات الائتمانية CIB & NBE</span>
          </div>
        </div>
      </div>

      {/* Form Column (Right in RTL) */}
      <div className="lg:w-1/2 p-6 md:p-14 flex items-center justify-center">
        <div className="w-full max-w-lg bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100">
          
          <div className="mb-8 text-right">
            <span className="text-xs font-bold text-[#006B4D] bg-[#E6F4EF] px-3 py-1 rounded-full inline-block mb-3">
              بوابة تسجيل الدخول الرسمية
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">أهلاً بك مجدداً في مشوار</h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">سجل الدخول للوصول إلى حجوزاتك أو إدارة أسطول سياراتك</p>
          </div>

          {/* Role Switcher Tabs */}
          <div className="grid grid-cols-3 gap-2 bg-[#F8FAFC] p-1.5 rounded-2xl mb-8 border border-slate-200/80">
            <button 
              type="button"
              onClick={() => handleRoleSelect('renter')}
              className={`flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold transition-all ${
                role === 'renter' 
                  ? 'bg-white text-[#006B4D] shadow-sm ring-1 ring-[#006B4D]/20' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>مستأجر / أفراد</span>
            </button>

            <button 
              type="button"
              onClick={() => handleRoleSelect('dealer')}
              className={`flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold transition-all ${
                role === 'dealer' 
                  ? 'bg-white text-[#006B4D] shadow-sm ring-1 ring-[#006B4D]/20' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>معرض معتمد</span>
            </button>

            <button 
              type="button"
              onClick={() => handleRoleSelect('host')}
              className={`flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold transition-all ${
                role === 'host' 
                  ? 'bg-white text-[#006B4D] shadow-sm ring-1 ring-[#006B4D]/20' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Key className="w-4 h-4" />
              <span>مالك سيارة P2P</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5 text-right">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                اسم المستخدم، البريد، أو رقم الهاتف (+20)
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  placeholder="مثال: tarek_menshawy أو +2010..."
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#006B4D] focus:ring-2 focus:ring-[#006B4D]/20 transition-all text-right"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Link href="/otp" className="text-xs font-bold text-[#006B4D] hover:underline">
                  نسيت كلمة المرور؟ (كود OTP)
                </Link>
                <label className="block text-xs font-bold text-slate-700">كلمة المرور</label>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#006B4D] focus:ring-2 focus:ring-[#006B4D]/20 transition-all text-right pr-4 pl-12"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-slate-300 text-[#006B4D] focus:ring-[#006B4D]" 
                />
                <span>تذكر هذا المتصفح لمدة 30 يوماً</span>
              </label>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#006B4D] hover:bg-[#00533C] text-white py-3.5 rounded-xl font-bold text-sm shadow-md shadow-[#006B4D]/20 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>دخول مباشر ({role === 'dealer' ? 'لوحة المعرض' : role === 'host' ? 'لوحة المالك' : 'حساب المستأجر'})</span>
            </button>

            {/* Quick Demo Credentials Reminder */}
            <div className="bg-[#E6F4EF]/60 border border-[#006B4D]/20 rounded-xl p-3 text-right">
              <p className="text-[11px] font-bold text-[#006B4D]">
                💡 حساب تجريبي مفعل مسبقاً: {identifier} (اضغط على دخول مباشرة للتجربة).
              </p>
            </div>

            <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-600">
              ليس لديك حساب بعد؟{' '}
              <Link href="/register" className="font-bold text-[#006B4D] hover:underline">
                أنشئ حساباً جديداً الآن
              </Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
