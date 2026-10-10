"use client";
import React from 'react';
import { FileText, ShieldAlert, DollarSign, Download, ExternalLink, Search, Filter } from 'lucide-react';

export default function ContractsPage() {
  const kpis = [
    { title: 'إجمالي الإيرادات', value: '1,250,000 ج.م', icon: DollarSign, color: 'text-[#006B4D]', bg: 'bg-[#006B4D]/10' },
    { title: 'العقود السارية', value: '342 عقد', icon: FileText, color: 'text-[#3B82F6]', bg: 'bg-[#3B82F6]/10' },
    { title: 'تأمينات محتجزة', value: '180,000 ج.م', icon: ShieldAlert, color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10' },
  ];

  const contracts = [
    { id: 'CTR-2023-8901', client: 'شركة الأفق للتجارة', car: 'تويوتا لاند كروزر 2023', dates: '12 أكتوبر - 20 أكتوبر', amount: '45,000 ج.م', status: 'مُوقع', isETA: true },
    { id: 'CTR-2023-8902', client: 'سالم عبدالله', car: 'هيونداي إلنترا 2022', dates: '15 أكتوبر - 18 أكتوبر', amount: '4,500 ج.م', status: 'بانتظار التوقيع', isETA: false },
    { id: 'CTR-2023-8903', client: 'مؤسسة الرواد', car: '5x نيسان صني', dates: '01 أكتوبر - 30 أكتوبر', amount: '60,000 ج.م', status: 'مُوقع', isETA: true },
    { id: 'CTR-2023-8904', client: 'ياسر منير', car: 'مرسيدس E200', dates: '14 أكتوبر - 16 أكتوبر', amount: '12,000 ج.م', status: 'منتهي', isETA: true },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">العقود والفواتير</h1>
          <p className="text-gray-500 mt-2">إدارة العقود الإلكترونية والفواتير الضريبية</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-[#10B981]/30 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">الربط مع منظومة الفاتورة الإلكترونية (ETA) نشط</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-4 rounded-xl ${kpi.bg}`}>
              <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">{kpi.title}</p>
              <p className="text-2xl font-bold">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Data Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-bold">سجل العقود</h2>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" />
              <input type="text" placeholder="بحث برقم العقد أو العميل..." className="w-full bg-gray-50 border border-gray-200 rounded-lg pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-[#006B4D]" />
            </div>
            <button className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 flex items-center gap-2 text-sm font-medium">
              <Filter className="w-4 h-4" /> فرز
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">رقم العقد</th>
                <th className="px-6 py-4 font-medium">العميل</th>
                <th className="px-6 py-4 font-medium">السيارة</th>
                <th className="px-6 py-4 font-medium">التاريخ</th>
                <th className="px-6 py-4 font-medium">القيمة / التأمين</th>
                <th className="px-6 py-4 font-medium">حالة التوقيع</th>
                <th className="px-6 py-4 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {contracts.map((contract, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-[#006B4D] font-medium">{contract.id}</td>
                  <td className="px-6 py-4 font-bold">{contract.client}</td>
                  <td className="px-6 py-4 text-gray-600">{contract.car}</td>
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{contract.dates}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold">{contract.amount}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                      ${contract.status === 'مُوقع' ? 'bg-[#10B981]/10 text-[#10B981]' : 
                        contract.status === 'بانتظار التوقيع' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' : 
                        'bg-gray-100 text-gray-600'}`}>
                      {contract.status}
                    </span>
                    {contract.isETA && (
                      <span className="block text-[10px] text-gray-400 mt-1">مسجل بالضرائب</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-gray-400 hover:text-[#006B4D]" title="تحميل PDF">
                        <Download className="w-5 h-5" />
                      </button>
                      <button className="text-gray-400 hover:text-[#3B82F6]" title="عرض التفاصيل">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
