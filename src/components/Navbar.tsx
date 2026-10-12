"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCurrentUser, logoutUser, User } from '@/utils/storage';
import { Car, Bell, User as UserIcon, LogOut, MessageSquare } from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    router.push('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Car className="h-8 w-8 text-[#006B4D]" />
              <span className="text-xl font-bold text-gray-900">مشوار</span>
            </Link>
            
            <div className="hidden sm:flex sm:mr-8 gap-6">
              <Link href="/" className="text-gray-600 hover:text-[#006B4D]">الرئيسية</Link>
              <Link href="/fleet" className="text-gray-600 hover:text-[#006B4D]">تصفح السيارات</Link>
              
              {user?.role === 'renter' && (
                <>
                  <Link href="/my-bookings" className="text-gray-600 hover:text-[#006B4D]">حجوزاتي</Link>
                  <Link href="/renter/chat" className="text-gray-600 hover:text-[#006B4D]">الرسائل</Link>
                  <Link href="/profile" className="text-gray-600 hover:text-[#006B4D]">حسابي المعتمد</Link>
                </>
              )}
              
              {user?.role === 'dealer' && (
                <>
                  <Link href="/dealer/dashboard" className="text-gray-600 hover:text-[#006B4D]">لوحة تحكم الأسطول</Link>
                  <Link href="/dealer/chat" className="text-gray-600 hover:text-[#006B4D]">المحادثات</Link>
                  <Link href="/dealer/contracts" className="text-gray-600 hover:text-[#006B4D]">العقود والفواتير</Link>
                </>
              )}
              
              {user?.role === 'host' && (
                <Link href="/host/dashboard" className="text-gray-600 hover:text-[#006B4D]">إدارة سيارتي</Link>
              )}
              
              {!user && (
                <Link href="/login" className="text-gray-600 hover:text-[#006B4D]">انضم كمعرض/مالك</Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500">EGP - ج.م</span>
            <button className="text-gray-400 hover:text-gray-500 relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-gray-900">{user.name}</span>
                  <span className="text-xs text-gray-500">{user.role}</span>
                </div>
                <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-[#006B4D] bg-[#E6F4EF] rounded-lg hover:bg-[#c2ebd7]">
                  دخول
                </Link>
                <Link href="/register" className="px-4 py-2 text-sm font-medium text-white bg-[#006B4D] rounded-lg hover:bg-[#00533C]">
                  حساب جديد
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

