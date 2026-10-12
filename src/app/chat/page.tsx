"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  getConversations, getConversationById, sendMessage, getCurrentUser, 
  getBookings, Conversation, ChatMessage, Booking 
} from '@/utils/storage';
import { 
  Send, Paperclip, Mic, MapPin, ShieldCheck, CheckCircle2, 
  Car, User, Phone, Clock, FileText, CheckCheck, Sparkles 
} from 'lucide-react';

function ChatPageContent() {
  const searchParams = useSearchParams();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeThread, setActiveThread] = useState<Conversation | null>(null);
  const [inputText, setInputText] = useState('');
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const all = getConversations();
    setConversations(all);

    const bookingId = searchParams.get('bookingId');
    if (bookingId) {
      const match = all.find(c => c.bookingId === bookingId);
      if (match) setActiveThread(match);
      else if (all.length > 0) setActiveThread(all[0]);
    } else if (all.length > 0) {
      setActiveThread(all[0]);
    }
  }, [searchParams]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || !activeThread) return;

    const newMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      senderId: user ? user.id : 'user_me',
      senderName: user ? user.name : 'مستأجر مشوار',
      senderRole: user?.role === 'dealer' ? 'dealer' : 'renter',
      text: text,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    sendMessage(activeThread.id, newMsg);

    const updated = getConversationById(activeThread.id);
    if (updated) {
      setActiveThread({ ...updated });
      setConversations(getConversations());
    }
    setInputText('');
  };

  const handleQuickAction = (chipText: string) => {
    handleSendMessage(chipText);
  };

  return (
    <div className="h-[calc(100vh-80px)] bg-[#F8FAFC] flex flex-col text-right">
      
      {/* Top Banner */}
      <div className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
          <h1 className="text-base font-black text-slate-900">مركز المحادثات والتنسيق المباشر (Live Chat)</h1>
        </div>
        <span className="text-xs font-bold text-slate-400">
          تشفير آمن للرسائل 256-bit • مسجل تحت إشراف الدعم الفني
        </span>
      </div>

      {/* Main 3-Panels Workspace matching اداره المحادثات.png */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Right Panel: Threads List (in RTL) */}
        <div className="w-80 bg-white border-l border-slate-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-xs font-black text-slate-400 mb-2">المحادثات النشطة ({conversations.length})</h2>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {conversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setActiveThread(conv)}
                className={`w-full p-4 text-right transition-colors flex items-start gap-3 ${
                  activeThread?.id === conv.id ? 'bg-[#E6F4EF]/70 border-r-4 border-[#006B4D]' : 'hover:bg-slate-50'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 text-[#006B4D] font-bold">
                  <Car className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-black text-slate-900 truncate">
                      {user?.role === 'dealer' ? conv.renterName : conv.dealerName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{conv.lastUpdated}</span>
                  </div>
                  <p className="text-[11px] font-bold text-[#006B4D] truncate">{conv.carName || 'بورشه Cayenne GTS'}</p>
                  <p className="text-[11px] text-slate-500 truncate mt-1">
                    {conv.messages[conv.messages.length - 1]?.text || 'بدء المحادثة...'}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Center Panel: Messages Stream */}
        <div className="flex-1 flex flex-col bg-[#F8FAFC]">
          
          {/* Thread Header */}
          {activeThread ? (
            <>
              <div className="bg-white border-b border-slate-200 p-4 px-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#006B4D] text-white flex items-center justify-center font-bold">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">
                      {user?.role === 'dealer' ? activeThread.renterName : activeThread.dealerName}
                    </h3>
                    <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                      <span>متصل الآن • حجز كود: {activeThread.bookingId || 'MSH-8821'}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#006B4D] bg-[#E6F4EF] px-3 py-1 rounded-full">
                    {activeThread.carName}
                  </span>
                </div>
              </div>

              {/* Message Bubbles Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {activeThread.messages.map((msg) => {
                  if (msg.isSystem) {
                    return (
                      <div key={msg.id} className="flex justify-center my-4">
                        <div className="bg-slate-200/80 text-slate-700 px-4 py-2 rounded-2xl text-xs font-bold shadow-sm max-w-md text-center">
                          ⚙️ {msg.text}
                        </div>
                      </div>
                    );
                  }

                  const isMe = (user?.role === 'dealer' && msg.senderRole === 'dealer') || 
                               (user?.role !== 'dealer' && msg.senderRole === 'renter');

                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-md rounded-2xl p-4 shadow-sm text-right ${
                        isMe 
                          ? 'bg-[#006B4D] text-white rounded-br-none' 
                          : 'bg-white text-slate-900 border border-slate-200 rounded-bl-none'
                      }`}>
                        <div className="flex items-center justify-between gap-4 mb-1 text-[10px] font-bold opacity-80">
                          <span>{msg.senderName}</span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <p className="text-xs md:text-sm font-semibold leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Action Chips matching Screenshot */}
              <div className="bg-white px-6 py-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
                <span className="text-[11px] font-bold text-slate-400 shrink-0">ردود وإجراءات سريعة:</span>
                {[
                  'تأكيد الاستلام بالمطار VIP T3',
                  'إرسال رابط الفحص الفني المعتمد 85 نقطة',
                  'موقع السيارة المباشر عبر الـ GPS',
                  'السيارة جاهزة ومعقمة بالكامل'
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickAction(chip)}
                    className="bg-slate-50 hover:bg-[#E6F4EF] hover:text-[#006B4D] text-slate-700 border border-slate-200 text-xs font-bold px-3 py-1.5 rounded-xl transition-all shrink-0 whitespace-nowrap"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="bg-white border-t border-slate-200 p-4 px-6 flex items-center gap-3">
                <button className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50" title="إرفاق ملف">
                  <Paperclip className="w-5 h-5" />
                </button>
                <button className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50" title="تسجيل صوتي">
                  <Mic className="w-5 h-5" />
                </button>

                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="اكتب رسالتك المباشرة هنا لمسؤول المعرض..."
                  className="flex-1 bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#006B4D] text-right"
                />

                <button 
                  onClick={() => handleSendMessage()}
                  className="bg-[#006B4D] hover:bg-[#00533C] text-white px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
                >
                  <Send className="w-4 h-4 rotate-180" />
                  <span>إرسال</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400">
              اختر محادثة لعرض تفاصيلها.
            </div>
          )}

        </div>

        {/* Left Panel: Customer / Booking Mini Dossier matching اداره المحادثات.png */}
        <div className="w-80 bg-white border-r border-slate-200 p-6 hidden xl:flex flex-col space-y-6 shrink-0 overflow-y-auto">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-400 mb-1">ملف العقد والرحلة النشطة</h3>
            <span className="text-base font-black text-slate-900">كود الحجز: MSH-8821</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
            <div className="h-32 bg-white rounded-xl p-2 flex items-center justify-center border border-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1503376712351-56f8f7004f1e?auto=format&fit=crop&q=80" 
                alt="Car" 
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-sm font-black text-slate-900 text-center">بورشه Cayenne GTS 2024</p>
            <p className="text-[11px] text-slate-500 font-bold text-center">لوحة رقم: أ ب ج 4921</p>
          </div>

          <div className="space-y-3 text-xs font-semibold">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-400">مبلغ التأمين المحجوز:</span>
              <span className="font-bold text-slate-900">15,000 ج.م</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-400">نقطة التسليم:</span>
              <span className="font-bold text-slate-900">مطار القاهرة T3 VIP</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-400">صلاحية رخصة القيادة:</span>
              <span className="font-bold text-[#10B981]">سارية حتى 2029 ✓</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-400">حالة العقد الإلكتروني:</span>
              <span className="font-bold text-[#006B4D]">موقع رقمياً</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <button 
              onClick={() => alert('تم إرسال إشعار للمستأجر بإتمام تسليم المفتاح الرقمي بنجاح.')}
              className="w-full bg-[#006B4D] hover:bg-[#00533C] text-white py-3 rounded-xl font-bold text-xs shadow-sm transition-all text-center"
            >
              تأكيد تسليم المفتاح الرقمي
            </button>
            <button 
              onClick={() => alert('تم فتح محضر الفحص الفني للسيارة 360°')}
              className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-3 rounded-xl font-bold text-xs transition-all text-center"
            >
              عرض استمارة الفحص 360°
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#F8FAFC] flex items-center justify-center p-8 text-slate-500 font-bold">جاري تحميل المحادثات...</div>}>
      <ChatPageContent />
    </Suspense>
  );
}
