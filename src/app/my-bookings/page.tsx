"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCurrentUser, getBookingsForUser, getCarById, Booking, Car } from '@/utils/storage';
import { Calendar, MapPin, CheckCircle, Clock, ShieldCheck, MessageSquare } from 'lucide-react';

interface PopulatedBooking extends Booking {
  carDetails?: Car | null;
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<PopulatedBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (user && user.role === 'renter') {
      const userBookings = getBookingsForUser(user.id, 'renter');
      const populated = userBookings.map(b => ({
        ...b,
        carDetails: getCarById(b.carId)
      }));
      setBookings(populated);
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="p-8 text-center">جاري التحميل...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">حجوزاتي وإدارة رحلاتي</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-[#10B981] mb-2">{bookings.filter(b => b.status === 'active').length}</span>
          <span className="text-gray-500 font-medium text-sm">حجوزات نشطة</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-[#F59E0B] mb-2">{bookings.filter(b => b.status === 'pending').length}</span>
          <span className="text-gray-500 font-medium text-sm">قيد المراجعة</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-[#3B82F6] mb-2">{bookings.filter(b => b.status === 'approved').length}</span>
          <span className="text-gray-500 font-medium text-sm">مؤكدة (قادمة)</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-gray-400 mb-2">{bookings.filter(b => b.status === 'completed').length}</span>
          <span className="text-gray-500 font-medium text-sm">مكتملة</span>
        </div>
      </div>

      <div className="space-y-6">
        {bookings.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد حجوزات حتى الآن</h3>
            <p className="text-gray-500 mb-6">تصفح أسطول السيارات واحجز سيارتك المفضلة الآن.</p>
            <Link href="/fleet" className="inline-block bg-[#006B4D] text-white px-6 py-3 rounded-xl font-semibold">تصفح الأسطول</Link>
          </div>
        ) : (
          bookings.map(booking => (
            <div key={booking.id} className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm flex flex-col md:flex-row">
              <div className="md:w-1/3 h-48 md:h-auto">
                <img src={booking.carDetails?.images[0] || 'https://via.placeholder.com/400'} alt="Car" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 md:w-2/3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{booking.carDetails?.brand} {booking.carDetails?.model}</h2>
                      <p className="text-gray-500">{booking.carDetails?.category} • {booking.carDetails?.year}</p>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 ${
                      booking.status === 'active' ? 'bg-[#10B981]/10 text-[#10B981]' : 
                      booking.status === 'pending' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' :
                      booking.status === 'approved' ? 'bg-[#3B82F6]/10 text-[#3B82F6]' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {booking.status === 'active' ? <Clock className="w-4 h-4" /> : null}
                      {booking.status === 'active' ? 'رحلة نشطة' : booking.status === 'pending' ? 'قيد المراجعة' : booking.status === 'approved' ? 'مؤكدة' : 'مكتملة'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="text-[#006B4D] w-5 h-5" />
                      <div>
                        <p className="text-xs text-gray-500">الاستلام</p>
                        <p className="font-semibold text-gray-900">{booking.startDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="text-gray-400 w-5 h-5" />
                      <div>
                        <p className="text-xs text-gray-500">التسليم</p>
                        <p className="font-semibold text-gray-900">{booking.endDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="text-[#006B4D] w-5 h-5" />
                      <div>
                        <p className="text-xs text-gray-500">الفرع</p>
                        <p className="font-semibold text-gray-900">{booking.branch || 'غير محدد'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="text-[#006B4D] w-5 h-5" />
                      <div>
                        <p className="text-xs text-gray-500">التكلفة الإجمالية</p>
                        <p className="font-bold text-[#006B4D]">{booking.totalPrice.toLocaleString()} ج.م</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <Link href={`/renter/chat?bookingId=${booking.id}&dealerId=${booking.ownerId}`} className="flex-1 bg-[#F8FAFC] border border-gray-200 text-gray-700 hover:bg-gray-100 px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
                    <MessageSquare className="w-5 h-5" /> محادثة مع المعرض
                  </Link>
                  {booking.status === 'approved' && (
                    <button className="flex-1 bg-[#006B4D] hover:bg-[#00533C] text-white px-4 py-3 rounded-xl font-semibold transition-colors">
                      دفع وتأكيد نهائي
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

