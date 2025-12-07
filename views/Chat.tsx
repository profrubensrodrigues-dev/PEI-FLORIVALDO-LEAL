import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { ChatMessage, Sender } from '../types';
import { generateFinancialAdvice } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Olá! Eu sou o InvesteJovem AI. Posso te ajudar a entender sobre investimentos, economês, ou como começar a poupar. O que você quer aprender hoje?',
      sender: Sender.AI,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: Sender.USER,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Call Gemini
    const responseText = await generateFinancialAdvice(userMsg.text);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      sender: Sender.AI,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-screen bg-gray-50">
      {/* Header Mobile Only (if needed, mostly handled by layout) */}
      <div className="p-4 md:p-8 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
            <Bot className="text-emerald-500" />
            AI Financial Advisor
        </h1>
        <p className="text-gray-500 text-sm">Tire suas dúvidas financeiras com inteligência artificial.</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === Sender.USER ? 'flex-row-reverse' : ''}`}
          >
            <div 
              className={`
                w-10 h-10 rounded-full flex items-center justify-center shrink-0
                ${msg.sender === Sender.USER ? 'bg-gray-200 text-gray-600' : 'bg-emerald-600 text-white'}
              `}
            >
              {msg.sender === Sender.USER ? <User size={20} /> : <Bot size={20} />}
            </div>
            
            <div 
              className={`
                max-w-[85%] md:max-w-[70%] p-4 rounded-2xl shadow-sm
                ${msg.sender === Sender.USER 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none'
                }
              `}
            >
               {msg.sender === Sender.AI ? (
                 <div className="prose prose-sm prose-emerald max-w-none">
                   <ReactMarkdown>{msg.text}</ReactMarkdown>
                 </div>
               ) : (
                 <p>{msg.text}</p>
               )}
               <span className={`text-[10px] block mt-2 opacity-70 ${msg.sender === Sender.USER ? 'text-emerald-100' : 'text-gray-400'}`}>
                 {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
               </span>
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex items-start gap-3">
             <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">
               <Bot size={20} />
             </div>
             <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
               <Loader2 size={16} className="animate-spin text-emerald-600" />
               <span className="text-sm text-gray-400">Digitando...</span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ex: Qual a diferença entre LCI e CDB?"
            className="w-full pl-6 pr-14 py-4 bg-gray-100 rounded-full border-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-gray-700"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="absolute right-2 top-2 p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;