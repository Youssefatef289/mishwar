"use client";
import React, { useState } from 'react';
import { 
  FileText, ShieldCheck, CheckCircle2, Download, Printer, 
  ExternalLink, Search, Filter, QrCode, AlertCircle 
} from 'lucide-react';

export default function ContractsPage() {
  const [selectedContract, setSelectedContract] = useState<any | null>(null);

  const mockContracts = [
    {
      id: 'E-CTR-2026-CAI-9941',
      invoiceId: 'ETA-INV-883921',
      clientName: 'م. طارق المنشاوي',
      clientPhone: '+20 112 233 4455',
      nationalId: '2930415******9',
      carName: 'بورشه Cayenne GTS 2024',
      plateNumber: 'أ ب ج 4921',
      startDate: '2026-10-15',
      endDate: '2026-10-18',
      days: 3,
      amount: 49590,
      vat: 6090,
      deposit: 15000,
      signStatus: 'موقع رقمياً وموثق',
      etaStatus: 'معتمد رسمياً في منظومة الفاتورة الإلكترونية',
      auditTimestamp: '10 أكتوبر 2026 - 10:14:22 ص (توقيت القاهرة)'
    },
    {
      id: 'E-CTR-2026-CAI-9938',
      invoiceId: 'ETA-INV-883918',
      clientName: 'د. خالد الصاوي',
      clientPhone: '+20 100 882 1199',
      nationalId: '2880912******4',
      carName: 'مرسيدس-بنز S450 Maybach',
      plateNumber: 'س ع ط 1104',
      startDate: '2026-10-12',
      endDate: '2026-10-14',
      days: 2,
      amount: 41040,
      vat: 5040,
      deposit: 20000,
      signStatus: 'موقع رقمياً وموثق',
      etaStatus: 'معتمد رسمياً في منظومة الفاتورة الإلكترونية',
      auditTimestamp: '08 أكتوبر 2026 - 02:40:11 م (توقيت القاهرة)'
    },
    {
      id: 'E-CTR-2026-CAI-9912',
      invoiceId: 'ETA-INV-883905',
      clientName: 'أ. هاني عبد المجيد',
      clientPhone: '+20 122 449 0088',
      nationalId: '2951103******1',
      carName: 'بي إم دبليو 520i M-Sport',
      plateNumber: 'ر ن م 8892',
      startDate: '2026-10-01',
      endDate: '2026-10-05',
      days: 4,
      amount: 34200,
      vat: 4200,
      deposit: 10000,
      signStatus: 'مكتمل ومؤرشف',
      etaStatus: 'مسجل ومحصل ضريبياً',
      auditTimestamp: '30 سبتمبر 2026 - 11:05:00 ص'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-right">
      
      {/* Top Banner with Egyptian Tax Authority (ETA) Live Status */}
      <div className="bg-[#0B132B] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                الربط اللحظي مفعل مع مصلحة الضرائب المصرية (ETA Live API)
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white">إدارة العقود والفواتير الرقمية المعتمدة</h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1">توليد عقود كراء المركبات الموحدة، والتوقيعات الإلكترونية المشفرة</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 border border-white/20 p-3 rounded-2xl flex items-center gap-3 text-xs font-bold text-slate-200">
              <ShieldCheck className="w-5 h-5 text-[#10B981]" />
              <span>الختم الإلكتروني للشركات معتمد سارٍ</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Financial KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <span className="text-xs font-bold text-slate-400 block mb-1">إجمالي الفواتير المصدرة</span>
            <span className="text-3xl font-black text-[#006B4D] block">124,830 <span className="text-xs">ج.م</span></span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <span className="text-xs font-bold text-slate-400 block mb-1">العقود النشطة الموثقة</span>
            <span className="text-3xl font-black text-[#3B82F6] block">14 <span className="text-xs">عقداً</span></span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <span className="text-xs font-bold text-slate-400 block mb-1">ودائع التأمين المحجوزة</span>
            <span className="text-3xl font-black text-amber-600 block">180,000 <span className="text-xs">ج.م</span></span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <span className="text-xs font-bold text-slate-400 block mb-1">نسبة الامتثال الضريبي</span>
            <span className="text-3xl font-black text-[#10B981] block">100%</span>
          </div>
        </div>

        {/* Contracts Data Table matching Screenshot */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-slate-400">سجل العقود والمحررات الرسمية لعام 2026</span>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#006B4D]" />
              <span>جدول العقود والمستأجرين</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-extrabold pb-3">
                  <th className="py-3 pr-2">رقم العقد والفاتورة</th>
                  <th className="py-3">المستأجر</th>
                  <th className="py-3">السيارة المستأجرة</th>
                  <th className="py-3">فترة الإيجار</th>
                  <th className="py-3">القيمة والضريبة</th>
                  <th className="py-3">حالة التوثيق</th>
                  <th className="py-3 text-left pl-2">معاينة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                {mockContracts.map((ctr) => (
                  <tr key={ctr.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 pr-2">
                      <span className="font-mono font-black text-slate-900 block">{ctr.id}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{ctr.invoiceId}</span>
                    </td>
                    <td className="py-4">
                      <span className="text-slate-900 font-black block">{ctr.clientName}</span>
                      <span className="text-[10px] text-slate-400">{ctr.clientPhone}</span>
                    </td>
                    <td className="py-4">
                      <span className="text-slate-900 block">{ctr.carName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">لوحة: {ctr.plateNumber}</span>
                    </td>
                    <td className="py-4">
                      <span>من {ctr.startDate}</span>
                      <span className="block text-slate-400 text-[10px]">إلى {ctr.endDate} ({ctr.days} أيام)</span>
                    </td>
                    <td className="py-4">
                      <span className="font-black text-[#006B4D] block">{ctr.amount.toLocaleString()} ج.م</span>
                      <span className="text-[10px] text-slate-400">شامل ضريبة 14% ({ctr.vat.toLocaleString()} ج.م)</span>
                    </td>
                    <td className="py-4">
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-[10px] font-black inline-block">
                        {ctr.signStatus}
                      </span>
                    </td>
                    <td className="py-4 text-left pl-2">
                      <button 
                        onClick={() => setSelectedContract(ctr)}
                        className="bg-[#E6F4EF] hover:bg-[#d2ede2] text-[#006B4D] px-3.5 py-1.5 rounded-xl font-bold text-xs transition-colors"
                      >
                        عرض العقد
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Contract Detailed Drawer matching عقد كراء مركبة.png */}
      {selectedContract && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-3xl w-full border border-slate-200 shadow-2xl text-right space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-[#006B4D] bg-[#E6F4EF] px-3 py-1 rounded-full">
                  منظومة الفاتورة والعقد الإلكتروني الموحد
                </span>
                <span className="text-xs font-bold text-slate-400 font-mono">{selectedContract.id}</span>
              </div>
              <button onClick={() => setSelectedContract(null)} className="text-slate-400 hover:text-slate-700 text-lg font-black">✕</button>
            </div>

            <div className="text-center py-2 space-y-1">
              <h2 className="text-2xl font-black text-slate-900">عقد كراء وتشغيل مركبة سياحية ذاتية القيادة</h2>
              <p className="text-xs text-slate-500 font-semibold">
                وفقاً للقانون المصري المنظم لعقود النقل والإيجار الذكي واللائحة التنفيذية
              </p>
            </div>

            {/* Contract Clauses */}
            <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-200 space-y-4 text-xs font-semibold text-slate-700">
              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px]">الطرف الأول (المؤجر):</span>
                  <span className="font-black text-slate-900">معرض رويال كارز الفاخرة ش.م.م</span>
                  <span className="block text-[10px] text-slate-400">سجل تجاري: 489201 | بطاقة ضريبية: 994-120-845</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">الطرف الثاني (المستأجر):</span>
                  <span className="font-black text-slate-900">{selectedContract.clientName}</span>
                  <span className="block text-[10px] text-slate-400">الرقم القومي: {selectedContract.nationalId}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2 border-b border-slate-200 text-center">
                <div>
                  <span className="text-slate-400 block text-[10px]">المركبة المتعاقد عليها</span>
                  <span className="font-black text-slate-900">{selectedContract.carName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">رقم اللوحة المعدنية</span>
                  <span className="font-black text-slate-900">{selectedContract.plateNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">سقف الكيلومترات اليومي</span>
                  <span className="font-black text-slate-900">300 كم / اليوم</span>
                </div>
              </div>

              <div className="space-y-1 text-slate-600 text-[11px] leading-relaxed">
                <p>• <strong>بند التأمين:</strong> المركبة مشمولة بوثيقة تأمين شامل ضد الحوادث والسرقة مع إعفاء المستأجر من تحمل أي نسبة عند تقديم محضر رسمي.</p>
                <p>• <strong>بند الوديعة:</strong> يتم تعليق مبلغ الوديعة ({selectedContract.deposit.toLocaleString()} ج.م) كحجز مصرفي مؤقت ويتم الإفراج عنه آلياً فور فحص الاسترجاع.</p>
                <p>• <strong>التوقيع والتحقق:</strong> تم توثيق هذا العقد إلكترونياً عبر البوابة الموحدة ومطابقة بصمة الـ OTP بنجاح.</p>
              </div>
            </div>

            {/* Electronic Stamp & QR */}
            <div className="border border-slate-200 rounded-2xl p-4 bg-white flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-slate-900 block">التوثيق الرقمي والاعتماد الضريبي</span>
                <span className="text-[10px] text-slate-400 font-mono">{selectedContract.auditTimestamp}</span>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#10B981] mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>معتمد ومسجل بمنظومة الفاتورة الإلكترونية لجمهورية مصر العربية</span>
                </div>
              </div>
              <div className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center text-[9px] font-black text-slate-500 text-center p-1">
                <QrCode className="w-8 h-8 text-slate-800 mb-1" />
                <span>ETA QR Code</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => { alert('تم تحميل العقد الإلكتروني الرسمي بصيغة PDF.'); setSelectedContract(null); }}
                className="bg-[#006B4D] hover:bg-[#00533C] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-sm flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>تحميل العقد الرسمي (PDF)</span>
              </button>
              <button 
                onClick={() => setSelectedContract(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
