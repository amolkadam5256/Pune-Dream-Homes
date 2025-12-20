import React, { useState } from "react";
import {
  MessageCircle,
  Send,
  User,
  Phone,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const ChatWithUs = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to Pune Dream Homes support. How can we help you today?",
      sender: "bot",
      time: "9:00 AM",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInputText("");

    // Mock bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "Thanks for your message. One of our experts will join this chat shortly. For urgent enquiries, please call +91 97529 71177.",
          sender: "bot",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-80px)] font-sans flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-md shadow-2xl overflow-hidden flex flex-col h-[600px]">
        {/* Chat Header */}
        <div className="bg-(--color-primary) p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/help/center"
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={24} />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-(--color-primary) rounded-full"></div>
            </div>
            <div>
              <h1 className="font-bold text-sm">
                Pune Dream Homes Support Chat
              </h1>
              <p className="text-[10px] text-blue-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>{" "}
                Online
              </p>
            </div>
          </div>
          <div className="hidden sm:flex flex-col items-end text-[10px] text-blue-100 uppercase tracking-widest font-bold">
            <span>Maha RERA</span>
            <span>A061262500523</span>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-md text-sm shadow-sm ${
                    msg.sender === "user"
                      ? "bg-(--color-primary) text-white"
                      : "bg-white text-gray-700 border border-gray-100"
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <p
                    className={`text-[9px] mt-2 ${
                      msg.sender === "user" ? "text-blue-100" : "text-gray-400"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSend}
          className="p-4 bg-white border-t flex items-center gap-3"
        >
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 bg-slate-50 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-primary) text-sm transition-all"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            className="bg-(--color-primary) text-white p-3 rounded-md hover:bg-(--color-primary-dark-1) transition-all shadow-lg active:scale-95"
          >
            <Send size={20} />
          </button>
        </form>

        {/* Quick Contacts Footer */}
        <div className="bg-slate-50 p-3 border-t flex justify-center gap-6">
          <div className="flex items-center gap-2 text-[10px] text-gray-500">
            <Phone size={12} /> +91 97529 71177
          </div>
          <div className="flex items-center gap-2 text-[10px] text-gray-500">
            <Mail size={12} /> sales@punedreamhomes.com
          </div>
        </div>
      </div>

      <p className="mt-8 text-xs text-gray-400 max-w-md text-center">
        Our experts typically respond within 5-10 minutes during working hours
        (9 AM - 8 PM).
      </p>
    </div>
  );
};

export default ChatWithUs;
