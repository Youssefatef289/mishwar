"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getFleet } from '@/utils/storage';

export default function BookingRequestPage() {
  const router = useRouter();

  useEffect(() => {
    const fleet = getFleet();
    if (fleet.length > 0) {
      router.replace(`/fleet/${fleet[0].id}`);
    } else {
      router.replace('/fleet');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <p className="text-slate-500 font-bold">جاري توجيهك لنموذج حجز المركبة...</p>
    </div>
  );
}

