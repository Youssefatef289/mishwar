"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getCurrentUser, logoutUser, setCurrentUser, getUsers, User } from '@/utils/storage';
import { 
  Car, Bell, User as UserIcon, LogOut, MessageSquare, ShieldCheck, 
  ChevronDown, Sparkles, Building2, Key, CheckCircle2 
} from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setUser(getCurrentUser());
  }, [pathname]);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setDropdownOpen(false);
    router.push('/login');
  };

  const handleSwitchUser = (role: 'renter' | 'dealer' | 'host') => {
    const allUsers = getUsers();
    const target = allUsers.find(u => u.role === role);
    if (target) {
      setCurrentUser(target);
      setUser(target);
      setDropdownOpen(false);
      if (role === 'dealer') router.push('/dealer/dashboard');
      else if (role === 'host') router.push('/host/dashboard');
      else router.push('/my-bookings');
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Right Area (Brand & Main Navigation in RTL) */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-[#006B4D] flex items-center justify-center text-white shadow-md shadow-[#006B4D]/20 group-hover:bg-[#00533C] transition-colors">
                <Car className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-slate-900 tracking-tight leading-none">مشوار</span>
                <span className="text-[11px] font-semibold text-[#006B4D] mt-1">منصة المركبات والتنقل الذكي</span>
              </div>
            </Link>

            {/* Nav Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link 
                href="/" 
                className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive('/') ? 'text-[#006B4D] bg-[#E6F4EF]' : 'text-slate-600 hover:text-[#006B4D] hover:bg-slate-50'
                }`}
              >
                الرئيسية
              </Link>
              <Link 
                href="/fleet" 
                className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive('/fleet') ? 'text-[#006B4D] bg-[#E6F4EF]' : 'text-slate-600 hover:text-[#006B4D] hover:bg-slate-50'
                }`}
              >
                تصفح السيارات
              </Link>

              {/* Renter Specific */}
              {user?.role === 'renter' && (
                <>
                  <Link 
                    href="/my-bookings" 
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                      isActive('/my-bookings') ? 'text-[#006B4D] bg-[#E6F4EF]' : 'text-slate-600 hover:text-[#006B4D] hover:bg-slate-50'
                    }`}
                  >
                    حجوزاتي
                  </Link>
                  <Link 
                    href="/chat" 
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                      isActive('/chat') ? 'text-[#006B4D] bg-[#E6F4EF]' : 'text-slate-600 hover:text-[#006B4D] hover:bg-slate-50'
                    }`}
                  >
                    المحادثات
                  </Link>
                </>
              )}

              {/* Dealer Specific */}
              {user?.role === 'dealer' && (
                <>
                  <Link 
                    href="/dealer/dashboard" 
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                      isActive('/dealer/dashboard') ? 'text-[#006B4D] bg-[#E6F4EF]' : 'text-slate-600 hover:text-[#006B4D] hover:bg-slate-50'
                    }`}
                  >
                    لوحة تحكم الأسطول
                  </Link>
                  <Link 
                    href="/dealer/chat" 
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                      isActive('/dealer/chat') ? 'text-[#006B4D] bg-[#E6F4EF]' : 'text-slate-600 hover:text-[#006B4D] hover:bg-slate-50'
                    }`}
                  >
                    محادثات العملاء
                  </Link>
                  <Link 
                    href="/dealer/contracts" 
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                      isActive('/dealer/contracts') ? 'text-[#006B4D] bg-[#E6F4EF]' : 'text-slate-600 hover:text-[#006B4D] hover:bg-slate-50'
                    }`}
                  >
                    العقود والفواتير
                  </Link>
                </>
              )}

              {/* Host Specific */}
              {user?.role === 'host' && (
                <Link 
                  href="/host/dashboard" 
                  className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive('/host/dashboard') ? 'text-[#006B4D] bg-[#E6F4EF]' : 'text-slate-600 hover:text-[#006B4D] hover:bg-slate-50'
                  }`}
                >
                  لوحة سيارتي والأرباح
                </Link>
              )}

              {!user && (
                <>
                  <Link href="/register" className="px-3.5 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-[#006B4D] hover:bg-slate-50">
                    انضم كمعرض/مالك
                  </Link>
                  <Link href="/profile" className="px-3.5 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-[#006B4D] hover:bg-slate-50">
                    المعارض المعتمدة
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* Left Area (Actions & User Profile in RTL) */}
          <div className="flex items-center gap-3 md:gap-4">
            
            {/* Currency Pill */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700">
              <span className="w-4 h-3 bg-red-600 rounded-sm relative overflow-hidden inline-block border border-slate-300">
                <span className="block h-1 bg-white"></span>
                <span className="block h-1 bg-black"></span>
              </span>
              <span>ج.م (EGP)</span>
            </div>

            {/* Notification Bell */}
            <Link 
              href="/notifications" 
              className="relative p-2.5 rounded-xl border border-slate-200/80 hover:bg-slate-50 text-slate-600 transition-colors"
              title="مركز الإشعارات"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EF4444] ring-2 ring-white"></span>
            </Link>

            {/* User Dropdown / Login */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 p-1.5 pr-3 rounded-2xl border border-slate-200/80 hover:border-[#006B4D]/40 bg-white hover:bg-slate-50 transition-all text-right"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-extrabold text-slate-900 line-clamp-1">{user.name}</span>
                    <span className="text-[10px] font-bold text-[#006B4D] flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#10B981]" />
                      {user.role === 'dealer' ? 'معرض معتمد' : user.role === 'host' ? 'مالك P2P' : 'مستأجر موثق'}
                    </span>
                  </div>
                  <img 
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80'} 
                    alt={user.name} 
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-[#006B4D]/20"
                  />
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 text-right animate-in fade-in slide-in-from-top-2">
                    <div className="p-3 border-b border-slate-100 bg-[#F8FAFC] rounded-xl mb-2">
                      <p className="text-xs text-slate-500 font-semibold">الحساب النشط حالياً:</p>
                      <p className="text-sm font-bold text-slate-900">{user.name}</p>
                      <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-bold text-[#10B981]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>الهوية الوطنية المصرية موثقة رقمياً</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400">تبديل الحساب التجريبي سريعاً:</div>
                      <button 
                        onClick={() => handleSwitchUser('renter')}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                          user.role === 'renter' ? 'bg-[#E6F4EF] text-[#006B4D]' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-2"><UserIcon className="w-4 h-4" /> مستأجر (م. طارق المنشاوي)</span>
                        {user.role === 'renter' && <span className="w-2 h-2 rounded-full bg-[#006B4D]"></span>}
                      </button>

                      <button 
                        onClick={() => handleSwitchUser('dealer')}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                          user.role === 'dealer' ? 'bg-[#E6F4EF] text-[#006B4D]' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-2"><Building2 className="w-4 h-4" /> معرض (رويال كارز VIP)</span>
                        {user.role === 'dealer' && <span className="w-2 h-2 rounded-full bg-[#006B4D]"></span>}
                      </button>

                      <button 
                        onClick={() => handleSwitchUser('host')}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                          user.role === 'host' ? 'bg-[#E6F4EF] text-[#006B4D]' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-2"><Key className="w-4 h-4" /> مالك سيارة (أحمد كمال P2P)</span>
                        {user.role === 'host' && <span className="w-2 h-2 rounded-full bg-[#006B4D]"></span>}
                      </button>
                    </div>

                    <div className="border-t border-slate-100 mt-2 pt-2">
                      <Link 
                        href="/profile" 
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#006B4D]" />
                        ملفي الشخصي والتوثيق
                      </Link>

                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#EF4444] hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        تسجيل الخروج
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  href="/login" 
                  className="px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold text-[#006B4D] hover:bg-[#E6F4EF] transition-colors"
                >
                  تسجيل الدخول
                </Link>
                <Link 
                  href="/register" 
                  className="px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold text-white bg-[#006B4D] hover:bg-[#00533C] transition-all shadow-sm"
                >
                  إنشاء حساب
                </Link>
              </div>
            )}

            {/* Quick CTA */}
            <Link 
              href={user?.role === 'dealer' ? '/dealer/dashboard' : '/fleet'}
              className="hidden md:flex items-center gap-2 bg-[#006B4D] hover:bg-[#00533C] text-white px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm shadow-sm transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{user?.role === 'dealer' ? 'لوحة الأسطول' : 'احجز سيارتك'}</span>
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
}
