"use client";

import React, { useState, useEffect } from 'react';
import { getCurrentUser, getFleet, saveCar } from '@/utils/storage';
import { DollarSign, Car, Plus } from 'lucide-react';

export default function HostDashboard() {
  const [user, setUser] = useState<any>(null);
  const [myCars, setMyCars] = useState<any[]>([]);
  const [newCar, setNewCar] = useState({ name: '', type: '', price: '', image: '' });

  useEffect(() => {
    const u = getCurrentUser();
    if (u && u.role === 'host') {
      setUser(u);
      loadCars(u.id);
    }
  }, []);

  const loadCars = (userId: string) => {
    const allCars = getFleet();
    setMyCars(allCars.filter(c => c.ownerId === userId));
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
    loadCars(user.id);
    alert('Car listed successfully!');
  };

  if (!user) return <div className="p-8 text-center">Loading or unauthorized...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">P2P Host Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Earnings</p>
            <h3 className="text-2xl font-bold">$0.00</h3>
          </div>
          <div className="p-3 bg-green-100 rounded-full text-green-600">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Listed Cars</p>
            <h3 className="text-2xl font-bold">{myCars.length}</h3>
          </div>
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <Car className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center"><Plus className="w-5 h-5 mr-2" /> List a New Car</h2>
          <form onSubmit={handleAddCar} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Car Name</label>
              <input type="text" required value={newCar.name} onChange={e => setNewCar({...newCar, name: e.target.value})} className="w-full border rounded p-2" placeholder="e.g. Honda Civic" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Type</label>
              <input type="text" required value={newCar.type} onChange={e => setNewCar({...newCar, type: e.target.value})} className="w-full border rounded p-2" placeholder="e.g. Sedan" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Price per Day ($)</label>
              <input type="number" required value={newCar.price} onChange={e => setNewCar({...newCar, price: e.target.value})} className="w-full border rounded p-2" placeholder="e.g. 40" />
            </div>
            <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded font-medium hover:bg-purple-700">List Car</button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">My Fleet</h2>
          {myCars.length === 0 ? (
            <p className="text-gray-500">You haven't listed any cars yet.</p>
          ) : (
            <div className="space-y-4">
              {myCars.map(car => (
                <div key={car.id} className="flex items-center gap-4 p-3 border rounded">
                  <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden">
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-medium">{car.name}</h4>
                    <p className="text-sm text-gray-500">${car.price}/day • {car.status}</p>
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
