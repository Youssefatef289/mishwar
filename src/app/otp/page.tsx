"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight, Clock, Lock, CheckCircle2 } from 'lucide-react';

export default function OtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [seconds, setSeconds] = useState(101); // 01:41
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `0${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleChange = (val: string, index: number) => {
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setVerified(true);
    setTimeout(() => {
      router.push('/my-bookings');
    }, 1200);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 text-center">
        
        {/* Security Badge */}
        <div className="w-16 h-16 bg-[#E6F4EF] rounded-2xl mx-auto flex items-center justify-center text-[#006B4D] mb-6 shadow-sm">
          <ShieldCheck className="w-9 h-9" />
        </div>

        <h1 className="text-2xl font-black text-slate-900 mb-2">التحقق من الرمز الآمن (OTP)</h1>
        <p className="text-xs md:text-sm text-slate-500 mb-6">
          تم إرسال كود التحقق المكون من 6 أرقام في رسالة نصية إلى رقم هاتفك المسجل <span className="font-bold text-slate-800" dir="ltr">+20 11****4455</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-6">
          {/* OTP 6-Digits Boxes */}
          <div className="flex justify-center gap-2 md:gap-3" dir="ltr">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                className="w-12 h-14 text-center text-xl font-black bg-[#F8FAFC] border border-slate-200 rounded-xl focus:outline-none focus:border-[#006B4D] focus:ring-2 focus:ring-[#006B4D]/20 transition-all text-slate-900 shadow-sm"
              />
            ))}
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
            <Clock className="w-4 h-4 text-[#006B4D]" />
            <span>تنتهي صلاحية الرمز خلال: </span>
            <span className="font-mono text-[#006B4D] text-sm font-black">{formatTime(seconds)}</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#006B4D] hover:bg-[#00533C] text-white py-3.5 rounded-xl font-bold text-sm shadow-md shadow-[#006B4D]/20 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
          >
            {verified ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                <span>تم تأكيد الهوية بنجاح...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>تأكيد الرمز ومتابعة الحساب</span>
              </>
            )}
          </button>

          {/* Resend */}
          <div className="text-xs text-slate-500">
            لم يصلك الرمز؟{' '}
            <button 
              type="button" 
              onClick={() => setSeconds(101)} 
              className="font-bold text-[#006B4D] hover:underline"
            >
              إعادة الإرسال الآن
            </button>
          </div>

          {/* SSL Security Footer */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] font-bold text-slate-400">
            <Lock className="w-3.5 h-3.5 text-[#10B981]" />
            <span>مشفر وفق معايير الحماية البنكية 256-bit SSL</span>
          </div>
        </form>

      </div>
    </div>
  );
}

