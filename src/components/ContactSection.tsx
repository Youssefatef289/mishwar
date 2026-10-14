"use client";
import React, { useState } from 'react';
import { SITE_CONFIG } from '@/config/siteConfig';
import { 
  Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2, 
  ChevronDown, ChevronUp, Sparkles, Smartphone, Download
} from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'شراء سيارة معتمدة',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', service: 'شراء سيارة معتمدة', notes: '' });
    }, 4000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="contact" className="py-14 md:py-24 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#E6FBF2] border border-[#00C97B]/30 px-3.5 py-1 rounded-full text-xs font-bold text-[#0B9A5B] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>تواصل وحجز مباشر</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            نحن هنا لمساعدتك في كل خطوة من مشوارك
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 font-semibold mt-2 leading-relaxed">
            تواصل مباشرة مع فريق خدمة العملاء والاستشارات الفنية 24/7 أو قم بتحميل تطبيق مشوار على هاتفك.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Right Column: Direct Inquiry Form */}
          <div className="lg:col-span-7 bg-[#F8FAFC] rounded-3xl p-6 sm:p-10 border border-[#E3E5EA] shadow-xs">
            <h3 className="text-xl font-black text-slate-900 mb-2">أرسل استفسارك أو احجز موعد فحص</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-6">
              سيتواصل معك مستشار سيارات معتمد في أقل من 15 دقيقة لتأكيد كافة التفاصيل.
            </p>

            {submitted ? (
              <div className="bg-[#E6FBF2] border border-[#00C97B] p-6 rounded-2xl text-center space-y-2 animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 text-[#0B9A5B] mx-auto" />
                <h4 className="text-base font-black text-slate-900">تم استلام طلبك بنجاح!</h4>
                <p className="text-xs font-bold text-slate-600">سيقوم فريق خدمة عملاء مشوار بالاتصال بك فوراً.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">الاسم بالكامل</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="مثال: محمد عبد الله"
                    className="w-full bg-white text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B9A5B] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">رقم الهاتف المحمول (واتساب)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="010XXXXXXXX"
                    className="w-full bg-white text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B9A5B] transition-colors"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">الخدمة المطلوبة</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-white text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B9A5B] transition-colors cursor-pointer"
                  >
                    <option value="شراء سيارة معتمدة">شراء سيارة مستعملة معتمدة</option>
                    <option value="شراء سيارة جديدة">شراء سيارة جديدة كاش أو قسط</option>
                    <option value="استئجار سيارة فاخرة">استئجار سيارة (يومي / شهري)</option>
                    <option value="بيع سيارتي">بيع سيارتي والحصول على تقييم فوري</option>
                    <option value="الانضمام كمعرض شريك">الانضمام كمعرض شريك في شبكة مشوار</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">تفاصيل إضافية (الموديل أو الميزانية)</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="اكتب أي مواصفات أو استفسار محدد..."
                    className="w-full bg-white text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-[#0B9A5B] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-[48px] bg-[#0B9A5B] hover:bg-[#09814c] text-white font-bold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال الطلب الآن</span>
                </button>
              </form>
            )}

            {/* Direct Quick Contact Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 mt-6 border-t border-slate-200">
              <a
                href={SITE_CONFIG.contact.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>محادثة واتساب فورية</span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 bg-[#0A2A5E] hover:bg-[#071f45] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span dir="ltr">{SITE_CONFIG.contact.phone}</span>
              </a>
            </div>
          </div>

          {/* Left Column: App Download Banner & FAQ Accordion */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* App Download Card */}
            <div className="bg-[#0A2A5E] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
              <div className="relative z-10 space-y-3">
                <span className="text-[11px] font-bold text-[#00C97B] bg-white/10 px-3 py-1 rounded-full inline-block">
                  تطبيق مشوار للهواتف الذكية
                </span>
                <h4 className="text-xl sm:text-2xl font-black">حمل التطبيق واستمتع بتجربة تنقل أسرع</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  احجز سيارتك، تابع الفحص الفني، واستلم عقودك الموثقة بلمسة زر واحدة مع عروض حصرية لمستخدمي التطبيق.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={SITE_CONFIG.appDownload.ios}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
                  >
                    <Smartphone className="w-4 h-4 text-[#00C97B]" />
                    <span>App Store</span>
                  </a>
                  <a
                    href={SITE_CONFIG.appDownload.android}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
                  >
                    <Download className="w-4 h-4 text-[#00C97B]" />
                    <span>Google Play</span>
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-[#F8FAFC] rounded-3xl p-6 border border-[#E3E5EA] space-y-3">
              <h4 className="text-base font-black text-slate-900 mb-4">الأسئلة الشائعة</h4>
              {SITE_CONFIG.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="bg-white rounded-xl border border-slate-200/80 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-3.5 text-right flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 hover:text-[#0B9A5B] transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-[#0B9A5B]" /> : <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

