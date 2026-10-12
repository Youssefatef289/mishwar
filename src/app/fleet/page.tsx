"use client";
import React, { useEffect, useState } from 'react';
import { getFleet } from '@/utils/storage';
import Link from 'next/link';
import { Car } from 'lucide-react';

export default function FleetPage() {
  const [fleet, setFleet] = useState<any[]>([]);

  useEffect(() => {
    const cars = getFleet();
    setFleet(cars);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        <Car className="h-8 w-8 text-blue-600" />
        Available Cars
      </h1>
      
      {fleet.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500">No cars available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fleet.map((car) => (
            <div key={car.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{car.make} {car.model}</h3>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <span>{car.year}</span>
                  <span className="font-medium text-blue-600">${car.pricePerDay}/day</span>
                </div>
                <div className="mb-4">
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
                    {car.type || 'Standard'}
                  </span>
                </div>
                <Link 
                  href={`/fleet/${car.id}`}
                  className="block w-full text-center bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium py-2 px-4 rounded-md transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
