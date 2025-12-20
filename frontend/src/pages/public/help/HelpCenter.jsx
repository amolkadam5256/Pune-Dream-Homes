import React, { useState } from 'react';
import { 
  Search, 
  HelpCircle, 
  BookOpen, 
  LifeBuoy, 
  ChevronRight, 
  CreditCard, 
  UserCheck, 
  Home, 
  MessageCircle,
  PhoneCall,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    { title: 'Buying Guide', icon: <Home className="text-blue-500" />, count: 12, color: 'bg-blue-50' },
    { title: 'Prime Membership', icon: <UserCheck className="text-yellow-600" />, count: 8, color: 'bg-yellow-50' },
    { title: 'Payments & Bills', icon: <CreditCard className="text-green-500" />, count: 5, color: 'bg-green-50' },
    { title: 'Account Settings', icon: <LifeBuoy className="text-purple-500" />, count: 7, color: 'bg-purple-50' },
  ];

  const faqs = [
    {
      q: "How do I become a PDH Prime member?",
      a: "You can become a Prime member by visiting our PDH Prime page and choosing a plan that fits your needs. Once the payment is successful, your account will be upgraded instantly."
    },
    {
      q: "What is the benefit of contacting owners directly?",
      a: "Contacting owners directly allows you to negotiate transparently and save significantly on brokerage fees, which can often be as much as 1-2 months of rent or 2% of the property value."
    },
    {
      q: "How can I post my property for free?",
      a: "Click on the 'Post Property FREE' button in the header. Fill in your property details, upload photos, and your listing will be live after a quick verification by our team."
    },
    {
      q: "Is there any charge for searching properties?",
      a: "Searching most listings on Pune Dream Homes is free. However, some exclusive owner-posted properties are reserved for our Prime members."
    }
  ];
  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* Hero Search Section */}
      <section className="bg-(--color-primary) text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black mb-8"
          >
            How can we help you?
          </motion.h1>
          
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            <input 
              type="text"
              placeholder="Search for questions, tutorials, topics..."
              className="w-full pl-14 pr-6 py-5 rounded-md text-gray-800 font-medium shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-200/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <p className="mt-6 text-blue-100 text-sm">
            Popular topics: <button onClick={() => setSearchQuery('Prime Membership')} className="underline cursor-pointer">Prime Membership</button>, <button onClick={() => setSearchQuery('Post')} className="underline cursor-pointer">Posting Ads</button>, <button onClick={() => setSearchQuery('Owner')} className="underline cursor-pointer">Owner Contacts</button>
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-md shadow-md border border-gray-100 cursor-pointer group"
            >
              <div className={`${cat.color} w-14 h-14 rounded-md flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                {cat.icon}
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">{cat.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs font-medium">{cat.count} Articles</span>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-(--color-primary) group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="text-(--color-primary)" size={28} />
              <h2 className="text-2xl font-black text-gray-800">
                {searchQuery ? `Search results for "${searchQuery}"` : 'Frequently Asked Questions'}
              </h2>
            </div>
            
            <div className="space-y-4">
              {filteredFaqs.length > 0 ? filteredFaqs.map((faq, i) => (
                <div key={faq.q} className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
                  <button 
                    onClick={() => setOpenFaq(openFaq === faq.q ? null : faq.q)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-gray-700">{faq.q}</span>
                    <ChevronRight 
                      size={20} 
                      className={`text-gray-400 transition-transform ${openFaq === faq.q ? 'rotate-90' : ''}`} 
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === faq.q && (
                      <motion.div 
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-gray-500 text-sm leading-relaxed border-t border-slate-50 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )) : (
                <div className="text-center py-12 bg-white rounded-md border border-dashed border-gray-200">
                  <HelpCircle className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-500">No matching questions found. Try a different search term.</p>
                </div>
              )}
            </div>
            
            <button className="mt-8 text-(--color-primary) font-bold flex items-center gap-2 hover:underline" onClick={() => setSearchQuery('')}>
              View all documentation <ChevronRight size={18} />
            </button>
          </div>

          {/* Sidebar Contact */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-md shadow-lg border-2 border-(--color-primary-lightest)">
              <h3 className="text-xl font-black mb-6 text-gray-800">Still need help?</h3>
              
              <div className="space-y-6">
                <Link to="/help/chat" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm group-hover:text-green-600 transition-colors">Chat with Us</h4>
                    <p className="text-xs text-gray-500">Live chat is available 9am-6pm</p>
                  </div>
                </Link>

                <Link to="/help/sales-enquiry" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-blue-50 text-(--color-primary) rounded-md flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm group-hover:text-(--color-primary) transition-colors">Email Sales</h4>
                    <p className="text-xs text-gray-500">Get a response within 24 hours</p>
                  </div>
                </Link>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm group-hover:text-yellow-600 transition-colors">Call Support</h4>
                    <p className="text-xs text-gray-500">+91 97529 71177</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-center text-xs text-gray-400">
                  MAHA RERA NO: <span className="font-bold">A061262500523</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
