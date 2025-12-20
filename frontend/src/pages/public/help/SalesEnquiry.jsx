import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SalesEnquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for your enquiry. Our sales team will contact you soon!');
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* Header Section */}
      <section className="bg-(--color-primary) text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Link to="/help/center" className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 text-sm font-bold transition-colors">
            <ArrowLeft size={16} /> Back to Help Center
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black mb-4"
          >
            Sales Enquiry
          </motion.h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-sm md:text-base">
            Looking to invest in Pune's premium real estate? Our experts are here to help you find the perfect property that matches your vision and budget.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-md shadow-lg border-t-4 border-(--color-primary)"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="text-(--color-primary)" size={24} />
                Contact Details
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-md text-(--color-primary)">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Call Us</p>
                    <p className="font-bold text-gray-800">+91 97529 71177</p>
                    <p className="font-bold text-gray-800">+91 87668 15281</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-md text-(--color-primary)">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Email Us</p>
                    <p className="font-bold text-gray-800">sales@punedreamhomes.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-md text-(--color-primary)">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Visit Office</p>
                    <p className="text-sm font-medium text-gray-800 leading-relaxed">
                      Bhavvesh Business Solutions LLP,<br />
                      Saikrupa, 1st Floor, Sr.No. 3/2, B/2/8,<br />
                      Akshay Colony, Warje, Pune 411052
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-md text-(--color-primary)">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Maha RERA</p>
                    <p className="font-bold text-gray-800">A061262500523</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Availability Card */}
            <div className="bg-(--color-primary-dark-2) text-white p-8 rounded-md shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-yellow-400" size={24} />
                <h4 className="font-bold uppercase tracking-widest text-xs">Working Hours</h4>
              </div>
              <p className="text-2xl font-black mb-2">9:00 AM - 8:00 PM</p>
              <p className="text-blue-200 text-xs">Our experts are available all 7 days of the week to assist your property search.</p>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 md:p-12 rounded-md shadow-lg"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-black text-gray-800 mb-2">Schedule a Meeting</h2>
                <p className="text-gray-500 text-sm">Fill out the form below and our experts will contribute their insights to your real estate plans.</p>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-500">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-slate-50 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-primary) transition-all text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-500">Mobile Number</label>
                  <input 
                    type="tel" 
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter your mobile"
                    className="w-full px-4 py-3 bg-slate-50 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-primary) transition-all text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-500">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-slate-50 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-primary) transition-all text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-500">City</label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    className="w-full px-4 py-3 bg-slate-50 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-primary) transition-all text-sm"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black uppercase text-gray-500">Message</label>
                  <textarea 
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your property requirements"
                    className="w-full px-4 py-3 bg-slate-50 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-primary) transition-all text-sm"
                  ></textarea>
                </div>

                <div className="md:col-span-2">
                  <button 
                    type="submit"
                    className="w-full md:w-auto px-10 py-4 bg-(--color-primary) text-white font-black rounded-md shadow-xl hover:bg-(--color-primary-dark-1) transition-all flex items-center justify-center gap-2 group"
                  >
                    Send Enquiry
                    <Send className="group-hover:translate-x-1 transition-transform" size={18} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesEnquiry;
