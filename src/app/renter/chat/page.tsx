"use client";

import React, { useState, useEffect } from 'react';
import { getCurrentUser, getConversationsForUser, sendMessage } from '@/utils/storage';
import { Send } from 'lucide-react';

export default function RenterChat() {
  const [user, setUser] = useState<any>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConvo, setSelectedConvo] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const u = getCurrentUser();
    if (u) {
      setUser(u);
      loadConversations(u.id);
    }
  }, []);

  const loadConversations = (userId: string) => {
    const convos = getConversationsForUser(userId);
    setConversations(convos || []);
    if (selectedConvo) {
      const updated = convos?.find((c: any) => c.id === selectedConvo.id);
      if (updated) setSelectedConvo(updated);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !selectedConvo) return;
    
    sendMessage(selectedConvo.id, {
      id: Date.now().toString(),
      senderId: user.id,
      text: newMessage,
      timestamp: new Date().toISOString()
    });
    
    setNewMessage('');
    loadConversations(user.id);
  };

  if (!user) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 h-[80vh] flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/3 bg-white border rounded-lg shadow-sm flex flex-col">
        <div className="p-4 border-b font-semibold">My Chats</div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {conversations.length === 0 ? <p className="text-gray-500 p-2 text-sm">No chats found.</p> : null}
          {conversations.map(convo => (
            <div 
              key={convo.id} 
              onClick={() => setSelectedConvo(convo)}
              className={`p-3 rounded cursor-pointer ${selectedConvo?.id === convo.id ? 'bg-indigo-50 border-indigo-200 border' : 'hover:bg-gray-50 border border-transparent'}`}
            >
              <p className="font-medium">Booking: {convo.bookingId}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="w-full md:w-2/3 bg-white border rounded-lg shadow-sm flex flex-col">
        {selectedConvo ? (
          <>
            <div className="p-4 border-b font-semibold">Chat for Booking: {selectedConvo.bookingId}</div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConvo.messages.map((msg: any, idx: number) => {
                const isMe = msg.senderId === user.id;
                return (
                  <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-lg max-w-[70%] ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>
            <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
              <input 
                type="text" 
                value={newMessage} 
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-indigo-500"
              />
              <button type="submit" className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700">
                <Send className="w-5 h-5" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
