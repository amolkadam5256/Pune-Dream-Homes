import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    Youtube,
    MessageCircle,
    ChevronUp
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [showScrollTop, setShowScrollTop] = useState(false);

    const footerLinks = {
        company: [
            { label: 'About Us', path: '/about' },
            { label: 'Our Services', path: '/services' },
            { label: 'Privacy Policy', path: '/privacy' },
            { label: 'Terms & Conditions', path: '/terms' },
            { label: 'Career', path: '/careers' }
        ],
        quickLinks: [
            { label: 'Featured Projects', path: '/projects' },
            { label: 'Calculators', path: '/calculators' },
            { label: 'PropWorth Tool', path: '/valuation' },
            { label: 'Price Trends', path: '/trends' },
            { label: 'Site Visits', path: '/site-visits' }
        ],
        support: [
            { label: 'Help Center', path: '/help/center' },
            { label: 'Contact Us', path: '/help/sales-enquiry' },
            { label: 'FAQs', path: '/faqs' },
            { label: 'Feedback', path: '/feedback' },
            { label: 'Blogs', path: '/blogs' }
        ]
    };

    // Show/hide scroll to top button
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.pageYOffset > 400);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <motion.footer
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-(--color-dark) text-white pt-10 pb-10 px-4 md:px-6 relative overflow-hidden"
            >
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-(--color-primary)/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-(--color-primary-light-1)/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                        {/* Brand Section */}
                        <div className="space-y-6">
                            <Link to="/" className="inline-block">
                                <h2 className="text-2xl font-black tracking-tighter uppercase italic">
                                    Pune Dream <span className="text-(--color-primary-light-2)">Homes</span>
                                </h2>
                            </Link>
                            <p className="text-sm text-gray-400 leading-relaxed font-medium">
                                Your trusted destination for premium real estate in Pune. Discover the perfect home, evaluate prices, and schedule hassle-free visits with our intelligent platform.
                            </p>
                            <div className="flex items-center gap-4">
                                {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, idx) => (
                                    <a
                                        key={idx}
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-(--color-primary) hover:border-(--color-primary) transition-all duration-300 group"
                                    >
                                        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Link Groups */}
                        <div className="grid grid-cols-2 gap-8 lg:col-span-2">
                            <div className="space-y-6">
                                <h3 className="text-base font-bold uppercase tracking-widest text-white">Links</h3>
                                <ul className="space-y-4">
                                    {footerLinks.quickLinks.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                to={link.path}
                                                className="text-sm text-gray-400 hover:text-(--color-primary-light-2) transition-colors flex items-center gap-2 group"
                                            >
                                                <span className="w-0 h-[1.5px] bg-(--color-primary-light-2) group-hover:w-3 transition-all duration-300"></span>
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-base font-bold uppercase tracking-widest text-white">Company</h3>
                                <ul className="space-y-4">
                                    {footerLinks.company.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                to={link.path}
                                                className="text-sm text-gray-400 hover:text-(--color-primary-light-2) transition-colors flex items-center gap-2 group"
                                            >
                                                <span className="w-0 h-[1.5px] bg-(--color-primary-light-2) group-hover:w-3 transition-all duration-300"></span>
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Contact & Newsletter */}
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <h3 className="text-base font-bold uppercase tracking-widest text-white">Contact Info</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3 group">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-(--color-primary) transition-colors">
                                            <MapPin className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                        </div>
                                        <span className="text-xs text-gray-400 leading-relaxed font-medium">
                                            Bhavvesh Business Solutions LLP, Saikrupa, 1st Floor, Sr.No. 3/2, B/2/8, Akshay Colony, Warje, Pune 411052
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3 group">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-(--color-primary) transition-colors">
                                            <Phone className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                        </div>
                                        <span className="text-xs text-gray-400 font-medium">+91 97529 71177</span>
                                    </li>
                                    <li className="flex items-center gap-3 group">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-(--color-primary) transition-colors">
                                            <Mail className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                        </div>
                                        <span className="text-xs text-gray-400 font-medium">sales@punedreamhomes.com</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <p className="text-[10px] font-black uppercase text-gray-500 tracking-[3px]">Chat with expert</p>
                                <button className="flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] px-4 py-2.5 rounded-xl border border-[#25D366]/20 font-bold text-xs hover:bg-[#25D366]/20 transition-all active:scale-95 group">
                                    <MessageCircle className="w-4 h-4 fill-[#25D366]" />
                                    WhatsApp Support
                                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            &copy; {currentYear} Pune Dream Homes. All Rights Reserved.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            {['Privacy Policy', 'Cookie Policy', 'Disclaimer'].map((item) => (
                                <Link key={item} to="#" className="text-[10px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest">
                                    {item}
                                </Link>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">MAHA RERA NO: A061262500523</span>
                        </div>
                    </div>
                </div>
            </motion.footer>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 text-white p-4 rounded-full shadow-2xl hover:shadow-xl transition-all z-50"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'var(--color-primary-dark-1)';
                        e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'var(--color-primary)';
                        e.target.style.transform = 'scale(1)';
                    }}
                    aria-label="Scroll to top"
                >
                    <ChevronUp className="w-5 h-5" />
                </button>
            )}
        </>
    );
};

export default Footer;