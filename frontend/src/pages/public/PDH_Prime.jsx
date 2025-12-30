import React, { useState } from 'react';
import {
  Check,
  HelpCircle,
  Phone,
  MessageSquare,
  Star,
  ShieldCheck,
  Users,
  Unlock,
  Zap,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PDH_Prime = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('Basic');

  const plans = [
    {
      name: 'Free',
      price: '0',
      oldPrice: null,
      off: null,
      features: {
        contacts: 'Max 2',
        unlock: false,
        validity: 'NA'
      },
      buttonText: 'Current Plan',
      isCurrent: true,
      popular: false
    },
    {
      name: 'Basic',
      price: '1199',
      oldPrice: '2398',
      off: '50%',
      features: {
        contacts: 'Max 10',
        unlock: true,
        validity: '3 Months'
      },
      buttonText: 'Continue with Basic',
      isCurrent: false,
      popular: false
    },
    {
      name: 'Pro',
      price: '1599',
      oldPrice: '3198',
      off: '50%',
      features: {
        contacts: 'Max 30',
        unlock: true,
        validity: '3 Months'
      },
      buttonText: 'Continue with Pro',
      isCurrent: false,
      popular: true
    }
  ];

  const testimonials = [
    {
      name: 'Shailey Shankar',
      role: 'HR Professional | Bengaluru',
      text: 'Great experience. Contacted one of the Owner Properties and was able to finialise the first one. Superb service. Value for money pack'
    },
    {
      name: 'Pritha Manchanda',
      role: 'Product Manager | Pune',
      text: 'Finding a Property on my own was difficult. Got help from an assistant and received a no. of options. So was able to get somewhat close to my requirement'
    },
    {
      name: 'Kriti Arora',
      role: 'Finance Professional | Chennai',
      text: 'I was new to the city and had no idea about good localities. MB Prime team helped me a lot with all my queries. Found a home quickly and saved on brokerage too.'
    }
  ];

  return (
    <div className="bg-slate-50 font-sans text-sm">
      {/* Hero Section */}
      <section className="bg-(--color-primary) text-white py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-yellow-400 text-black px-2 py-0.5 mt-2 font-bold text-xs">MB PRIME</span>
              <h1 className="text-2xl xl:text-4xl font-black">Pune <span className="text-yellow-400">Dream</span> Homes Prime</h1>
            </div>
            <p className="text-lg sm:text-xl mb-6 font-medium text-blue-50">Pay Zero Commission & Call Owners Directly</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-md border border-white/20">
                <ShieldCheck className="text-yellow-400" size={24} />
                <div>
                  <p className="font-bold text-sm">100% Transparency</p>
                  <p className="text-xs text-blue-100 italic">Promise verified listings</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-md border border-white/20">
                <Users className="text-yellow-400" size={24} />
                <div>
                  <p className="font-bold text-sm">Call Owners Directly</p>
                  <p className="text-xs text-blue-100 italic">Save thousands in brokerage</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white text-(--color-dark) p-6 rounded-md shadow-2xl w-full max-w-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Query for packages?</h3>
              <Phone className="text-(--color-primary)" size={20} />
            </div>
            <p className="text-2xl font-black text-(--color-primary) mb-1">+91-7303439363</p>
            <p className="text-xs text-gray-500 mb-6">Available 9 AM - 8 PM (All days)</p>
            <a href="#how-it-works" className="w-full bg-(--color-primary) text-white py-3 rounded-md font-bold hover:bg-(--color-primary-dark-1) transition-colors flex items-center justify-center gap-2">
              Know More <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4 -mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl xl:text-3xl font-bold mb-2">Choose the Right Plan for You</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto rounded-md"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                whileHover={{ y: -5 }}
                className={`relative bg-white rounded-md shadow-lg overflow-hidden border-2 ${plan.popular ? 'border-yellow-400' : 'border-transparent'}`}
              >
                {plan.popular && (
                  <div className="absolute top-4 right-0 bg-yellow-400 text-black px-4 py-1 text-[10px] font-black uppercase rounded-l-md shadow-sm">
                    Recommended
                  </div>
                )}

                <div className="p-6 border-b border-gray-100 text-center">
                  <h3 className="text-xl font-black mb-4 uppercase tracking-wider">{plan.name}</h3>
                  <div className="flex flex-col items-center justify-center">
                    {plan.oldPrice && (
                      <span className="text-gray-400 line-through text-sm">₹ {plan.oldPrice}</span>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black">₹ {plan.price}</span>
                      {plan.off && <span className="text-green-600 font-bold text-xs">({plan.off} Off)</span>}
                    </div>
                  </div>
                  {plan.name !== 'Free' && (
                    <div className="bg-red-50 text-red-600 text-[10px] font-bold py-1 px-2 rounded-sm inline-block mt-2">
                      Limited Period Offer: Hurry Up!
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">No. of Owners to contact</span>
                    <span className="font-bold">{plan.features.contacts}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Unlock Owner Properties</span>
                    {plan.features.unlock ? <Check className="text-green-500" size={18} /> : <Zap className="text-gray-300" size={18} />}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Validity (Months)</span>
                    <span className="font-bold">{plan.features.validity}</span>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={user ? (user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard') : '/auth/login'}
                    className={`w-full py-3 rounded-md font-black transition-all flex items-center justify-center ${plan.isCurrent
                        ? 'border border-(--color-primary) text-(--color-primary) hover:bg-slate-50'
                        : 'bg-(--color-primary) text-white hover:bg-(--color-primary-dark-1) shadow-md active:scale-95'
                      }`}
                  >
                    {plan.buttonText}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl xl:text-3xl font-bold mb-4">How it works</h2>
            <p className="text-gray-500">In 3 simple steps, get your dream home without any brokerage</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-gray-200 -translate-y-1/2 z-0"></div>

            {[
              { id: 1, title: 'Become a Prime member', desc: 'Step up to Pune Dream Homes Prime & explore Owner Posted Properties', icon: <Star size={32} /> },
              { id: 2, title: 'Access Prime Properties', desc: 'Unlock properties that are exclusively reserved for our Prime members', icon: <Unlock size={32} /> },
              { id: 3, title: 'Finalize directly', desc: 'Contact owners directly, visit property and close the deal effortlessly', icon: <Users size={32} /> }
            ].map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center text-center px-4">
                <div className="w-16 h-16 bg-blue-50 text-(--color-primary) border-2 border-(--color-primary) rounded-md flex items-center justify-center mb-6 shadow-sm">
                  {step.icon}
                  <span className="absolute -top-3 -right-3 bg-(--color-primary) text-white w-8 h-8 rounded-md flex items-center justify-center font-bold">{step.id}</span>
                </div>
                <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                <p className="text-gray-500 leading-relaxed text-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl xl:text-3xl font-bold">Hear from our members</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-md shadow-md border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-gray-600 italic text-xs leading-relaxed mb-6">"{t.text}"</p>
                </div>
                <div className="border-t pt-4">
                  <p className="font-bold text-(--color-dark)">{t.name}</p>
                  <p className="text-[10px] text-gray-500 font-medium">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto bg-(--color-primary-lightest) p-8 rounded-md border border-(--color-primary-light-2)">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-black text-(--color-primary-dark-2) mb-4 leading-tight">Ready to save on brokerage?</h3>
              <div className="flex items-center gap-3 bg-white p-3 rounded-md mb-4 border border-blue-200">
                <MessageSquare className="text-green-600" size={24} />
                <p className="font-medium text-xs">I agree to receive updates from Pune Dream Homes via WhatsApp</p>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-green-600 cursor-pointer" />
              </div>
              <Link
                to={user ? (user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard') : '/auth/register'}
                className="w-full md:w-auto px-12 py-4 bg-(--color-primary) text-white font-black rounded-md shadow-xl hover:scale-105 transition-transform flex items-center justify-center"
              >
                Get Started
              </Link>
            </div>

            <div className="w-full md:w-64 bg-white p-6 rounded-md border border-blue-200 shadow-sm">
              <p className="text-xs font-bold text-gray-500 mb-4 text-center">Were you assisted by a Tele-executive?</p>
              <div className="flex gap-2">
                <button className="flex-1 py-2 border rounded-md hover:bg-slate-50 transition-colors">No</button>
                <button className="flex-1 py-2 border border-(--color-primary) text-(--color-primary) font-bold rounded-md hover:bg-blue-50 transition-colors">Yes</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 font-medium mb-4">Have any queries? We're here to assist you!</p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="text-(--color-primary)" size={18} />
              <span className="font-bold">+91-7303439363</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="text-(--color-primary)" size={18} />
              <button className="text-(--color-primary) font-bold hover:underline">Request a Callback</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Nav */}
      <section className="bg-slate-900 text-gray-400 py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h5 className="text-white font-bold mb-4 text-sm">Property Type</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/buy" className="hover:text-white transition-colors">Buy</Link></li>
              <li><Link to="/rent" className="hover:text-white transition-colors">Rent</Link></li>
              <li><Link to="/post-property" className="hover:text-white transition-colors">Sell</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4 text-sm">Services</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/home-loans" className="hover:text-white transition-colors">Home Loans</Link></li>
              <li><Link to="/property-services" className="hover:text-white transition-colors">Property Services</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4 text-sm">Resources</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/resources" className="hover:text-white transition-colors">Resources</Link></li>
              <li><Link to="/help/center" className="hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4 text-sm">Quick Links</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/auth/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/post-property" className="hover:text-white transition-colors">Post Property Free</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PDH_Prime;