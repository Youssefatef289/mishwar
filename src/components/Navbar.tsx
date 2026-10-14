"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCurrentUser, logoutUser, setCurrentUser, getUsers, User } from '@/utils/storage';
import { 
  Car, Bell, User as UserIcon, LogOut, ShieldCheck, 
  ChevronDown, Building2, CheckCircle2, Menu, X, 
  Sparkles, Video, MessageSquare, PhoneCall, Image as ImageIcon
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/siteConfig';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUser(getCurrentUser());
    setMobileMenuOpen(false);
  }, [pathname]);

  // Sticky header scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setUserDropdownOpen(false);
  };

  const handleSwitchUser = (role: 'renter' | 'dealer' | 'host') => {
    const allUsers = getUsers();
    const target = allUsers.find(u => u.role === role);
    if (target) {
      setCurrentUser(target);
      setUser(target);
      setUserDropdownOpen(false);
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E3E5EA] py-1' 
          : 'bg-white border-b border-[#E3E5EA] py-0'
      }`}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 whitespace-nowrap">
          
          {/* Right: Brand Logo + Primary Nav */}
          <div className="flex items-center gap-6 xl:gap-8">
            
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
                  منصة السيارات المعتمدة
                </span>
              </div>
            </Link>

            {/* Main Single-Line Navigation */}
            <nav className="hidden lg:flex items-center gap-1 text-xs xl:text-sm font-bold text-slate-700">
              <Link 
                href="/#hero" 
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isActive('/') ? 'text-[#0B9A5B] bg-[#E6FBF2]' : 'hover:text-[#0B9A5B] hover:bg-slate-50'
                }`}
              >
                الرئيسية
              </Link>

              <Link 
                href="/used-cars" 
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isActive('/used-cars') ? 'text-[#0B9A5B] bg-[#E6FBF2]' : 'hover:text-[#0B9A5B] hover:bg-slate-50'
                }`}
              >
                سيارات مستعملة
              </Link>

              <Link 
                href="/#new-cars" 
                className="px-3 py-2 rounded-lg hover:text-[#0B9A5B] hover:bg-slate-50 transition-colors"
              >
                سيارات جديدة
              </Link>

              <Link 
                href="/#services" 
                className="px-3 py-2 rounded-lg hover:text-[#0B9A5B] hover:bg-slate-50 transition-colors"
              >
                خدماتنا
              </Link>

              <Link 
                href="/#how-it-works" 
                className="px-3 py-2 rounded-lg hover:text-[#0B9A5B] hover:bg-slate-50 transition-colors"
              >
                كيف تعمل؟
              </Link>

              <Link 
                href="/#video-tour" 
                className="px-3 py-2 rounded-lg hover:text-[#0B9A5B] hover:bg-slate-50 transition-colors"
              >
                فيديو الجولة
              </Link>

              {/* Dropdown for More Sections */}
              <div className="relative" ref={moreDropdownRef}>
                <button
                  type="button"
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className={`px-3 py-2 rounded-lg flex items-center gap-1 transition-colors ${
                    moreDropdownOpen ? 'text-[#0B9A5B] bg-[#E6FBF2]' : 'hover:text-[#0B9A5B] hover:bg-slate-50'
                  }`}
                >
                  <span>المزيد</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {moreDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#E3E5EA] p-1.5 z-50 animate-in fade-in slide-in-from-top-1 text-right">
                    <Link
                      href="/#gallery"
                      onClick={() => setMoreDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-[#E6FBF2] hover:text-[#0B9A5B]"
                    >
                      <ImageIcon className="w-4 h-4 text-[#0B9A5B]" />
                      <span>معرض الوسائط</span>
                    </Link>
                    <Link
                      href="/#sell-car"
                      onClick={() => setMoreDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-[#E6FBF2] hover:text-[#0B9A5B]"
                    >
                      <Sparkles className="w-4 h-4 text-[#0B9A5B]" />
                      <span>بيع سيارتك</span>
                    </Link>
                    <Link
                      href="/#testimonials"
                      onClick={() => setMoreDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-[#E6FBF2] hover:text-[#0B9A5B]"
                    >
                      <MessageSquare className="w-4 h-4 text-[#0B9A5B]" />
                      <span>آراء العملاء</span>
                    </Link>
                    <Link
                      href="/fleet"
                      onClick={() => setMoreDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-[#E6FBF2] hover:text-[#0B9A5B]"
                    >
                      <Car className="w-4 h-4 text-[#0B9A5B]" />
                      <span>تصفح كامل الأسطول</span>
                    </Link>
                    <div className="my-1 border-t border-slate-100" />
                    <Link
                      href="/#contact"
                      onClick={() => setMoreDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-[#E6FBF2] hover:text-[#0B9A5B]"
                    >
                      <PhoneCall className="w-4 h-4 text-[#0B9A5B]" />
                      <span>تواصل معنا</span>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Left: Main Call to Action Button + User Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Main CTA Button */}
            <Link
              href="/used-cars"
              className="bg-[#0B9A5B] hover:bg-[#09814c] text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Car className="w-4 h-4" />
              <span>احجز سيارتك</span>
            </Link>

            {/* User Dropdown */}
            {user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl border border-slate-200 hover:border-[#0B9A5B]/40 bg-white hover:bg-slate-50 transition-colors cursor-pointer text-right"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80'}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  />
                  <span className="text-xs font-extrabold text-slate-900 hidden sm:inline max-w-[90px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-1 text-right">
                    <div className="p-2.5 bg-slate-50 rounded-xl mb-2 border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-bold">الحساب النشط</p>
                      <p className="text-xs font-extrabold text-slate-900 truncate">{user.name}</p>
                      <span className="text-[10px] font-bold text-[#0B9A5B] flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="w-3 h-3" />
                        {user.role === 'dealer' ? 'معرض معتمد' : user.role === 'host' ? 'مالك سيارة' : 'مستأجر موثق'}
                      </span>
                    </div>

                    <div className="px-2 py-1 text-[10px] font-bold text-slate-400">
                      تبديل الحساب التجريبي:
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSwitchUser('renter')}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        user.role === 'renter' ? 'bg-[#E6FBF2] text-[#0B9A5B]' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>مستأجر (م. طارق)</span>
                      {user.role === 'renter' && <CheckCircle2 className="w-3.5 h-3.5 text-[#0B9A5B]" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSwitchUser('dealer')}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        user.role === 'dealer' ? 'bg-[#E6FBF2] text-[#0B9A5B]' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>معرض (رويال كارز)</span>
                      {user.role === 'dealer' && <CheckCircle2 className="w-3.5 h-3.5 text-[#0B9A5B]" />}
                    </button>

                    <div className="my-1.5 border-t border-slate-100" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
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
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition-colors"
              >
                تسجيل الدخول
              </Link>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1.5 animate-in fade-in duration-200 text-right">
          <Link
            href="/#hero"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            الرئيسية
          </Link>
          <Link
            href="/used-cars"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-bold text-[#0B9A5B] bg-[#E6FBF2]"
          >
            سيارات مستعملة
          </Link>
          <Link
            href="/#new-cars"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            سيارات جديدة
          </Link>
          <Link
            href="/#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            خدماتنا ومميزاتنا
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            كيف تعمل المنصة؟
          </Link>
          <Link
            href="/#video-tour"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            فيديو الجولة الحية
          </Link>
          <Link
            href="/#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            معرض الوسائط
          </Link>
          <Link
            href="/#sell-car"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            بيع سيارتك
          </Link>
          <Link
            href="/#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            آراء العملاء
          </Link>
          <Link
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            تواصل معنا
          </Link>
        </div>
      )}
    </header>
  );
}
