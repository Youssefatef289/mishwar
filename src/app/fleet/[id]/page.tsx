"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCarById, createBooking } from '@/utils/storage';
import { Calendar, CheckCircle2 } from 'lucide-react';

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [car, setCar] = useState<any>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // React in Next 13+ app dir passes params as a Promise in some versions, but directly here.
    // Handling directly as per typical use in client component for now.
    const fetchedCar = getCarById(params.id);
    setCar(fetchedCar);
  }, [params.id]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!car) return;
    
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      alert("Please login first.");
      router.push('/login');
      return;
    }
    
    const user = JSON.parse(storedUser);
    
    const booking = {
      id: Math.random().toString(36).substring(2, 9),
      carId: car.id,
      renterId: user.id,
      ownerId: car.ownerId,
      startDate,
      endDate,
      status: 'Pending',
      totalPrice: car.pricePerDay // Simplified calculation
    };
    
    createBooking(booking);
    router.push('/my-bookings');
  };

  if (!car) {
    return <div className="p-8 text-center">Loading car details...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-12">
            <div className="text-6xl text-gray-300">{car.make}</div>
          </div>
          <div className="md:w-1/2 p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{car.make} {car.model}</h1>
                <p className="text-gray-500 mt-1">{car.year} • {car.type || 'Standard'}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">${car.pricePerDay}</p>
                <p className="text-sm text-gray-500">per day</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Available for booking
              </h3>
              
              <form onSubmit={handleBooking} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input 
                      type="date" 
                      required
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input 
                      type="date" 
                      required
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                
                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors mt-6"
                >
                  <Calendar className="h-5 w-5" />
                  Book This Car
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
