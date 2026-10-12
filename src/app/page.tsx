"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Car as CarIcon, Search, ShieldCheck, MapPin, Calendar, Star, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { initStorage, getFleet, getUsers, Car, User } from '@/utils/storage';

export default function HomePage() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [dealers, setDealers] = useState<User[]>([]);

  useEffect(() => {
    initStorage();
    // Get all available cars and show up to 6 latest
    const fleet = getFleet().filter(c => c.status === 'available');
    setFeaturedCars(fleet.slice(-6).reverse()); // Show newest first
    
    // Get all dealers
    const allUsers = getUsers();
    const allDealers = allUsers.filter(u => u.role === 'dealer');
    setDealers(allDealers);
  }, []);

  const fadeUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#0B132B] text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1503376712351-56f8f7004f1e?auto=format&fit=crop&q=80" 
            alt="Luxury Car Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-transparent"></div>
        </div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="relative max-w-7xl mx-auto z-10 flex flex-col items-center text-center"
        >
          <motion.span variants={fadeUp} className="bg-[#006B4D]/20 text-[#10B981] px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-[#006B4D]/30 inline-block backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            البوابة الأولى لإدارة الأساطيل والتنقل الذكي في مصر
          </motion.span>
          
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
            استأجر سيارة أحلامك <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#10B981] to-[#04875B]">بكل سهولة وأمان</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed">
            منصة مشوار توفر لك أسطولاً متنامياً من السيارات الفاخرة والاقتصادية المضافة مباشرة من أفضل المعارض المعتمدة.
          </motion.p>

          {/* Search Widget */}
          <motion.div variants={fadeUp} className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-[2rem] w-full max-w-4xl flex flex-col md:flex-row gap-4 shadow-2xl">
            <div className="flex-1 bg-white rounded-2xl p-4 flex items-center gap-4 text-gray-900 transition-transform hover:scale-[1.02]">
              <div className="bg-[#E6F4EF] p-2 rounded-xl text-[#006B4D]"><MapPin className="w-5 h-5" /></div>
              <div className="text-right flex-1">
                <p className="text-xs text-gray-500 font-bold mb-1">موقع الاستلام</p>
                <input type="text" placeholder="أين تريد استلام السيارة؟" className="w-full outline-none text-sm font-semibold bg-transparent placeholder-gray-400" />
              </div>
            </div>
            
            <div className="flex-1 bg-white rounded-2xl p-4 flex items-center gap-4 text-gray-900 transition-transform hover:scale-[1.02]">
              <div className="bg-[#E6F4EF] p-2 rounded-xl text-[#006B4D]"><Calendar className="w-5 h-5" /></div>
              <div className="text-right flex-1">
                <p className="text-xs text-gray-500 font-bold mb-1">تاريخ الاستلام</p>
                <input type="date" className="w-full outline-none text-sm font-semibold bg-transparent text-gray-600" />
              </div>
            </div>
            
            <Link href="/fleet" className="bg-gradient-to-l from-[#00533C] to-[#006B4D] hover:shadow-lg hover:shadow-[#006B4D]/30 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95">
              <Search className="w-5 h-5" />
              البحث السريع
            </Link>
          </motion.div>
          
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-gray-300 font-medium">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm"><ShieldCheck className="text-[#10B981] w-5 h-5" /> مركبات مفحوصة بدقة</div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm"><ShieldCheck className="text-[#10B981] w-5 h-5" /> عقود رقمية موثقة</div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm"><ShieldCheck className="text-[#10B981] w-5 h-5" /> دعم فني على مدار الساعة</div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">أحدث السيارات المضافة</h2>
              <p className="text-gray-500 text-lg">تصفح أحدث ما أضافته معارضنا وشركاؤنا اليوم</p>
            </div>
            <Link href="/fleet" className="hidden md:flex items-center gap-2 text-[#006B4D] font-bold hover:gap-3 transition-all">
              عرض كل السيارات <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
          
          {featuredCars.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-gray-200">
              <CarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-500">لم يتم إضافة سيارات بعد</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCars.map((car, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  key={car.id} 
                  className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-xl transition-all group flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-100 p-4">
                    {/* Badge */}
                    <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-[#006B4D] px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      متاحة فوراً
                    </div>
                    {/* Image */}
                    <img 
                      src={car.images?.[0] || car.image || 'https://via.placeholder.com/600'} 
                      alt={`${car.brand || car.name} ${car.model || ''}`} 
                      className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl"
                    />
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold text-gray-900 line-clamp-1">{car.brand || car.name} {car.model || ''}</h3>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-xs font-bold text-yellow-700">4.9</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mb-6">{car.category || car.type || 'فاخرة'} • موديل {car.year || 2024}</p>
                    
                    <div className="flex justify-between text-sm text-gray-600 mb-8 bg-gray-50 p-4 rounded-2xl">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-gray-400 text-xs">ناقل الحركة</span>
                        <span className="font-semibold text-gray-800">{car.specs?.transmission || 'أوتوماتيك'}</span>
                      </div>
                      <div className="w-px bg-gray-200"></div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-gray-400 text-xs">الوقود</span>
                        <span className="font-semibold text-gray-800">{car.specs?.fuel || 'بنزين'}</span>
                      </div>
                      <div className="w-px bg-gray-200"></div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-gray-400 text-xs">المقاعد</span>
                        <span className="font-semibold text-gray-800">{car.specs?.seats || 5} ركاب</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500 font-medium">السعر اليومي</p>
                        <p className="text-2xl font-bold text-[#006B4D]">{(car.dailyPrice ?? car.price ?? car.pricePerDay ?? 0).toLocaleString()} <span className="text-sm">ج.م</span></p>
                      </div>
                      <Link href={`/fleet/${car.id}`} className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-md">
                        احجز الآن
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/fleet" className="inline-flex items-center gap-2 text-[#006B4D] font-bold">
              عرض كل السيارات <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted Dealers Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">شركاء مشوار المعتمدون</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">انضم إلى شبكة معارضنا واستفد من منصة متطورة لإدارة أسطولك. إليك أحدث المعارض التي انضمت إلينا.</p>
          </div>
          
          {dealers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">لا يوجد معارض مسجلة حالياً.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {dealers.slice(-5).map((dealer, idx) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  key={dealer.id} 
                  className="bg-gray-50 rounded-3xl p-6 text-center border border-gray-100 hover:border-[#006B4D]/30 hover:bg-[#F8FAFC] hover:shadow-lg transition-all group cursor-pointer"
                >
                  <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-[#006B4D] to-[#10B981] rounded-2xl p-0.5 mb-4 transform group-hover:-translate-y-2 transition-transform">
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-[#006B4D] text-2xl font-black">
                      {dealer.companyName ? dealer.companyName.charAt(0) : dealer.name.charAt(0)}
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{dealer.companyName || dealer.name}</h3>
                  <div className="flex items-center justify-center gap-1 text-xs font-semibold text-[#10B981]">
                    <ShieldCheck className="w-3 h-3" /> معرض موثق
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
