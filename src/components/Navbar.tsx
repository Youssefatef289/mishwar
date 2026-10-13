"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getCurrentUser, logoutUser, setCurrentUser, getUsers, User } from '@/utils/storage';
import { 
  Car, Bell, User as UserIcon, LogOut, ShieldCheck, 
  ChevronDown, Building2, Key, CheckCircle2, Menu, X, 
  BadgePercent, FileText, MapPin, Sparkles, MessageSquare
} from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUser(getCurrentUser());
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setUserDropdownOpen(false);
    router.push('/login');
  };

  const handleSwitchUser = (role: 'renter' | 'dealer' | 'host') => {
    const allUsers = getUsers();
    const target = allUsers.find(u => u.role === role);
    if (target) {
      setCurrentUser(target);
      setUser(target);
      setUserDropdownOpen(false);
      if (role === 'dealer') router.push('/dealer/dashboard');
      else if (role === 'host') router.push('/host/dashboard');
      else router.push('/my-bookings');
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white border-b border-[#E3E5EA] sticky top-0 z-50 shadow-xs" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Single Line Header Bar */}
        <div className="flex items-center justify-between h-16 sm:h-20 whitespace-nowrap">
          
          {/* Right: Brand + Main Nav on Single Line */}
          <div className="flex items-center gap-6 lg:gap-8">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-10 h-10 rounded-[10px] bg-[#0B9A5B] flex items-center justify-center text-white shadow-xs group-hover:bg-[#09814c] transition-colors">
                <Car className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                  مشوار
                </span>
                <span className="text-[10px] font-bold text-[#0B9A5B] mt-0.5">
                  سيارات معتمدة
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Compact & Single-Line) */}
            <nav className="hidden lg:flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700">
              
              {/* 1. الرئيسية */}
              <Link 
                href="/" 
                className={`px-3.5 py-2 rounded-[8px] transition-colors ${
                  isActive('/') ? 'text-[#0B9A5B] bg-[#E6FBF2]' : 'hover:text-[#0B9A5B] hover:bg-slate-50'
                }`}
              >
                الرئيسية
              </Link>

              {/* 2. سيارات مستعملة */}
              <Link 
                href="/used-cars" 
                className={`px-3.5 py-2 rounded-[8px] transition-colors ${
                  isActive('/used-cars') ? 'text-[#0B9A5B] bg-[#E6FBF2]' : 'hover:text-[#0B9A5B] hover:bg-slate-50'
                }`}
              >
                سيارات مستعملة
              </Link>

              {/* 3. سيارات جديدة */}
              <Link 
                href="/#new-cars" 
                className="px-3.5 py-2 rounded-[8px] hover:text-[#0B9A5B] hover:bg-slate-50 transition-colors"
              >
                سيارات جديدة
              </Link>

              {/* 4. Dropdown: خدمات مشوار */}
              <div className="relative" ref={servicesDropdownRef}>
                <button
                  type="button"
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className={`px-3.5 py-2 rounded-[8px] flex items-center gap-1 transition-colors ${
                    servicesDropdownOpen ? 'text-[#0B9A5B] bg-[#E6FBF2]' : 'hover:text-[#0B9A5B] hover:bg-slate-50'
                  }`}
                >
                  <span>خدمات مشوار</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Services Dropdown Menu */}
                {servicesDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-[10px] shadow-lg border border-[#E3E5EA] p-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                    <Link
                      href="/#sell-car"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-xs font-bold text-slate-800 hover:bg-[#E6FBF2] hover:text-[#0B9A5B] transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-[#0B9A5B]" />
                      <span>بيع سيارتك</span>
                    </Link>
                    <Link
                      href="/fleet"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-xs font-bold text-slate-800 hover:bg-[#E6FBF2] hover:text-[#0B9A5B] transition-colors"
                    >
                      <Car className="w-4 h-4 text-[#0B9A5B]" />
                      <span>تصفح الأسطول</span>
                    </Link>
                    
                    {user?.role === 'renter' && (
                      <>
                        <div className="my-1 border-t border-[#E3E5EA]" />
                        <Link
                          href="/my-bookings"
                          onClick={() => setServicesDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-xs font-bold text-slate-800 hover:bg-[#E6FBF2] hover:text-[#0B9A5B] transition-colors"
                        >
                          <FileText className="w-4 h-4 text-[#0B9A5B]" />
                          <span>حجوزاتي</span>
                        </Link>
                        <Link
                          href="/chat"
                          onClick={() => setServicesDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-xs font-bold text-slate-800 hover:bg-[#E6FBF2] hover:text-[#0B9A5B] transition-colors"
                        >
                          <MessageSquare className="w-4 h-4 text-[#0B9A5B]" />
                          <span>المحادثات</span>
                        </Link>
                      </>
                    )}

                    {user?.role === 'dealer' && (
                      <>
                        <div className="my-1 border-t border-[#E3E5EA]" />
                        <Link
                          href="/dealer/dashboard"
                          onClick={() => setServicesDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-xs font-bold text-slate-800 hover:bg-[#E6FBF2] hover:text-[#0B9A5B] transition-colors"
                        >
                          <Building2 className="w-4 h-4 text-[#0B9A5B]" />
                          <span>لوحة المعرض</span>
                        </Link>
                        <Link
                          href="/dealer/contracts"
                          onClick={() => setServicesDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-xs font-bold text-slate-800 hover:bg-[#E6FBF2] hover:text-[#0B9A5B] transition-colors"
                        >
                          <FileText className="w-4 h-4 text-[#0B9A5B]" />
                          <span>العقود</span>
                        </Link>
                      </>
                    )}

                    {!user && (
                      <>
                        <div className="my-1 border-t border-[#E3E5EA]" />
                        <Link
                          href="/register"
                          onClick={() => setServicesDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-xs font-bold text-slate-800 hover:bg-[#E6FBF2] hover:text-[#0B9A5B] transition-colors"
                        >
                          <Building2 className="w-4 h-4 text-[#0B9A5B]" />
                          <span>انضم كشريك أو معرض</span>
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

            </nav>

          </div>

          {/* Left: Minimal Actions & User Profile Dropdown on Single Line */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Notification Icon */}
            <Link 
              href="/notifications" 
              className="relative p-2 rounded-[8px] hover:bg-slate-100 text-slate-600 transition-colors"
              title="الإشعارات"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444]" />
            </Link>

            {/* User Dropdown */}
            {user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-[8px] border border-[#E3E5EA] hover:border-[#0B9A5B]/40 bg-white hover:bg-slate-50 transition-colors cursor-pointer text-right"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80'}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  />
                  <span className="text-xs font-extrabold text-slate-900 hidden sm:inline max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* User Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-[10px] shadow-xl border border-[#E3E5EA] p-2 z-50 animate-in fade-in slide-in-from-top-1 text-right">
                    <div className="p-2.5 bg-slate-50 rounded-[8px] mb-2 border border-slate-100">
                      <p className="text-[11px] text-slate-400 font-bold">الحساب الحالي</p>
                      <p className="text-xs font-extrabold text-slate-900 truncate">{user.name}</p>
                      <span className="text-[10px] font-bold text-[#0B9A5B] flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="w-3 h-3" />
                        {user.role === 'dealer' ? 'معرض معتمد' : user.role === 'host' ? 'مالك سيارة' : 'مستأجر موثق'}
                      </span>
                    </div>

                    {/* Role Switcher */}
                    <div className="px-2 py-1 text-[10px] font-bold text-slate-400">
                      تبديل الحساب التجريبي:
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSwitchUser('renter')}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-[6px] text-xs font-bold transition-colors ${
                        user.role === 'renter' ? 'bg-[#E6FBF2] text-[#0B9A5B]' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>مستأجر (م. طارق)</span>
                      {user.role === 'renter' && <CheckCircle2 className="w-3.5 h-3.5 text-[#0B9A5B]" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSwitchUser('dealer')}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-[6px] text-xs font-bold transition-colors ${
                        user.role === 'dealer' ? 'bg-[#E6FBF2] text-[#0B9A5B]' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>معرض (رويال كارز)</span>
                      {user.role === 'dealer' && <CheckCircle2 className="w-3.5 h-3.5 text-[#0B9A5B]" />}
                    </button>

                    <div className="my-1.5 border-t border-[#E3E5EA]" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[6px] text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-[#0B9A5B] hover:bg-[#09814c] text-white text-xs font-bold px-3.5 py-2 rounded-[6px] transition-colors shadow-xs"
              >
                تسجيل الدخول
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-[6px] transition-colors"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E3E5EA] bg-white px-4 py-4 space-y-2 animate-in fade-in duration-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-[6px] text-sm font-bold ${
              isActive('/') ? 'text-[#0B9A5B] bg-[#E6FBF2]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            الرئيسية
          </Link>
          <Link
            href="/used-cars"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-[6px] text-sm font-bold ${
              isActive('/used-cars') ? 'text-[#0B9A5B] bg-[#E6FBF2]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            سيارات مستعملة
          </Link>
          <Link
            href="/#new-cars"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-[6px] text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            سيارات جديدة
          </Link>
          <Link
            href="/#sell-car"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-[6px] text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            بيع سيارتك
          </Link>
          <Link
            href="/fleet"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-[6px] text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            تصفح الأسطول
          </Link>
        </div>
      )}
    </header>
  );
}
