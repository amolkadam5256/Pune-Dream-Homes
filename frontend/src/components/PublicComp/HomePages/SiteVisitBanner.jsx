import React from 'react';
import images from '../../../assets/images/images';
import { Car, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SiteVisitBanner = () => {
    return (
        <section className="w-full py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto"
            >
                <div className="relative overflow-hidden bg-[var(--color-primary-dark-1)] rounded-sm shadow-2xl group">
                    {/* Background Pattern/Overlay */}
                    <div className="absolute inset-0 opacity-20">
                        <img
                            src={images.img2}
                            alt="Background"
                            className="w-full h-full object-cover mix-blend-overlay transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark-2)] via-[var(--color-primary-dark-1)] to-transparent"></div>
                    </div>

                    {/* Content Container */}
                    <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">

                        {/* Left Side: Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex-1 space-y-6"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[var(--color-primary-lightest)] rounded-lg ">
                                    <Car className="w-6 h-6 text-[var(--color-primary)] animate-bounce " />
                                    <span className="absolute border-b-1 border-[var(--color-primary)]"></span>
                                </div>
                                <span className="text-[var(--color-primary-light-2)] font-bold text-sm uppercase tracking-widest">
                                    Exclusive Service
                                </span>
                            </div>

                            <h2 className="text-xl md:text-2xl font-black text-white leading-tight max-w-2xl">
                                Plan hassle-free <span className="text-red-400">Site Visits</span> & Evaluate Projects with <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[var(--color-primary-lightest)]">MagicDiary</span>
                            </h2>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-[var(--color-primary-lightest)] font-medium">
                                <Link to="/site-visits" className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">Instant Scheduling</span>
                                </Link>
                                <p className="text-sm font-normal text-white flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                    Get Free Cab for every site visit!
                                </p>
                            </div>
                        </motion.div>

                        {/* Right Side: CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="w-full md:w-auto"
                        >
                            <Link to="/projects">
                                <button className="w-full md:w-auto bg-white text-[var(--color-primary-dark-2)] hover:bg-[var(--color-primary-lightest)] font-black py-4 px-10 rounded-full text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 group/btn">
                                    Find out how
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                                </button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--color-primary-light-1)]/10 rounded-full -ml-24 -mb-24 blur-3xl"></div>
                </div>
            </motion.div>
        </section>
    );
};

export default SiteVisitBanner;

