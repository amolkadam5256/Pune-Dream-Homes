import React from 'react';
import images from '../../../assets/images/images';
import { ArrowRight, MapPin, Building, Home, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LastSearched() {
    // Determine the current city or search context (Mocked for now)
    const searchLocation = "Pune";

    return (
        <section className="w-full bg-[#fcfdff] py-12 animate-fadeIn">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8 pl-2">
                    <h2 className="text-2xl font-bold text-[var(--color-dark)] mb-3">
                        Because you searched <span className="text-[var(--color-primary)]">{searchLocation}</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-[var(--color-primary)] rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1 - Properties Listed Stats */}
                    <Link to="/buy" className="group relative bg-[var(--color-primary-lightest)] rounded-xl p-6 border border-[var(--color-primary-lightest)] hover:shadow-xl hover:border-[var(--color-primary-light-1)] transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Home size={80} className="text-[var(--color-primary)]" />
                        </div>

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="text-3xl font-extrabold text-[var(--color-primary)] mb-2 tracking-tight">43K+</div>
                                <div className="text-[var(--color-neutral)] font-medium text-sm leading-snug">
                                    Properties listed<br />for you in {searchLocation}
                                </div>
                            </div>

                            <div className="mt-8 flex items-center gap-2 text-[var(--color-primary)] text-xs font-semibold group-hover:gap-3 transition-all">
                                Continue search
                                <ArrowRight size={16} />
                            </div>
                        </div>
                    </Link>

                    {/* Card 2 - Promotional Image Card */}
                    <div className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 md:col-span-1 border border-[var(--color-primary-lightest)]">
                        <img
                            src={images.img}
                            alt="Modern Interior"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/90 via-[var(--color-dark)]/60 to-transparent"></div>

                        <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="flex items-center gap-2 mb-2 text-[var(--color-primary-light-2)]">
                                    <Sparkles size={16} />
                                    <span className="text-xs font-bold uppercase tracking-wider">Special Offer</span>
                                </div>
                                <h3 className="text-lg font-bold mb-2">Dream Home Contest</h3>
                                <p className="text-gray-200 text-xs mb-4">Share your story and stand a chance to win vouchers worth <span className="font-bold text-white">₹5000</span></p>

                                <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark-1)] text-white px-5 py-2.5 rounded-full text-xs font-semibold transition-colors w-fit flex items-center gap-2">
                                    Participate Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 - Handpicked Projects */}
                    <Link to="/projects" className="group bg-white rounded-xl p-6 border border-[var(--color-primary-lightest)] shadow-sm hover:shadow-xl hover:border-[var(--color-primary-light-1)] transition-all duration-300 relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-[var(--color-primary-lightest)] rounded-full opacity-50 blur-2xl group-hover:bg-[var(--color-primary-light-2)] transition-colors"></div>

                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div className="w-12 h-12 bg-[var(--color-primary-lightest)] rounded-xl flex items-center justify-center mb-4 text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                                    <Building size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-[var(--color-dark)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                                    Handpicked Projects
                                </h3>
                                <p className="text-[var(--color-neutral)] text-xs">
                                    Exclusive collection of premium projects selected just for you.
                                </p>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <span className="text-xs font-semibold text-[var(--color-neutral)] group-hover:text-[var(--color-primary)] transition-colors">See Collection</span>
                                <div className="w-8 h-8 rounded-full border border-[var(--color-primary-lightest)] flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] transition-all">
                                    <ArrowRight size={14} className="text-[var(--color-neutral)] group-hover:text-white" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Card 4 - Exclusive Owner Properties */}
                    <Link to="/buy" className="group bg-white rounded-xl p-6 border border-[var(--color-primary-lightest)] shadow-sm hover:shadow-xl hover:border-[var(--color-primary-light-1)] transition-all duration-300 relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-[var(--color-primary-lightest)] rounded-full opacity-50 blur-2xl group-hover:bg-[var(--color-primary-light-2)] transition-colors"></div>

                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div className="w-12 h-12 bg-[var(--color-primary-lightest)] rounded-xl flex items-center justify-center mb-4 text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                                    <MapPin size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-[var(--color-dark)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                                    Owner Properties
                                </h3>
                                <p className="text-[var(--color-neutral)] text-xs">
                                    Direct from owners. No brokerage, verified listings.
                                </p>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <span className="text-xs font-semibold text-[var(--color-neutral)] group-hover:text-[var(--color-primary)] transition-colors">View Properties</span>
                                <div className="w-8 h-8 rounded-full border border-[var(--color-primary-lightest)] flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] transition-all">
                                    <ArrowRight size={14} className="text-[var(--color-neutral)] group-hover:text-white" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}