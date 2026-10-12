"use client";

import React, { useState, useEffect } from 'react';
import { getCurrentUser, getBookingsForUser, saveCar, updateBookingStatus } from '@/utils/storage';
import { Car, Check, X, Plus } from 'lucide-react';

export default function DealerDashboard() {
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [newCar, setNewCar] = useState({ name: '', type: '', price: '', image: '' });

  useEffect(() => {
    const u = getCurrentUser();
    if (u && u.role === 'dealer') {
      setUser(u);
      loadBookings(u.id);
    }
  }, []);

  const loadBookings = (userId: string) => {
    const b = getBookingsForUser(userId, 'dealer');
    setBookings(b || []);
  };

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    saveCar({
      id: Date.now().toString(),
      ownerId: user.id,
      name: newCar.name,
      type: newCar.type,
      price: Number(newCar.price),
      image: newCar.image || 'https://via.placeholder.com/300x200',
      status: 'available'
    });
    setNewCar({ name: '', type: '', price: '', image: '' });
    alert('Car added successfully!');
  };

  const handleUpdateBooking = (id: string, status: string) => {
    updateBookingStatus(id, status);
    if (user) loadBookings(user.id);
  };

  if (!user) return <div className="p-8 text-center">Loading or unauthorized...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Dealer Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center"><Plus className="w-5 h-5 mr-2" /> Add New Car</h2>
          <form onSubmit={handleAddCar} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Car Name</label>
              <input type="text" required value={newCar.name} onChange={e => setNewCar({...newCar, name: e.target.value})} className="w-full border rounded p-2" placeholder="e.g. Toyota Camry" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Type</label>
              <input type="text" required value={newCar.type} onChange={e => setNewCar({...newCar, type: e.target.value})} className="w-full border rounded p-2" placeholder="e.g. Sedan" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Price per Day ($)</label>
              <input type="number" required value={newCar.price} onChange={e => setNewCar({...newCar, price: e.target.value})} className="w-full border rounded p-2" placeholder="e.g. 50" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700">Add Car</button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center"><Car className="w-5 h-5 mr-2" /> Pending Bookings</h2>
          {bookings.filter(b => b.status === 'pending').length === 0 ? (
            <p className="text-gray-500">No pending bookings.</p>
          ) : (
            <div className="space-y-4">
              {bookings.filter(b => b.status === 'pending').map(booking => (
                <div key={booking.id} className="p-4 border rounded flex justify-between items-center bg-gray-50">
                  <div>
                    <p className="font-medium">Car ID: {booking.carId}</p>
                    <p className="text-sm text-gray-600">Dates: {booking.startDate} to {booking.endDate}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleUpdateBooking(booking.id, 'approved')} className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200" title="Approve">
                      <Check className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleUpdateBooking(booking.id, 'rejected')} className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200" title="Reject">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
