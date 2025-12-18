import React, { useState } from 'react';
import { Search, MapPin, Calculator, Info, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import images from '../../../assets/images/images';

const locations = [
    'Pune', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
    'Kolkata', 'Ahmedabad', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur',
    'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
    'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik',
    'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar', 'Varanasi'
];

const PropWorth = () => {
    const [search, setSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const filteredLocations = locations.filter(loc =>
        loc.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="w-full py-4 md:py-6 px-4 md:px-6 relative">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="relative border border-[var(--color-primary-lightest)] rounded-2xl shadow-2xl flex flex-col lg:flex-row items-stretch min-h-[350px] md:min-h-[250px]">

                    {/* FULL CARD BACKGROUND IMAGE */}
                    <div className="absolute inset-0 z-0 rounded-2xl overflow-hidden">
                        <img
                            src={images.img2}
                            alt="Full Card BG"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark-2)]/95 via-[var(--color-primary-dark-1)]/90 to-[var(--color-primary-dark-2)]/80"></div>
                    </div>

                    {/* Left Side: Visual/Intro */}
                    <div className="relative z-10 lg:w-1/3 p-4 md:p-6 flex flex-col justify-center text-white border-b lg:border-b-0 lg:border-r border-white/10">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2 bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-md border border-white/30">
                                <TrendingUp className="w-3 h-3" />
                                <span className="text-[9px] font-bold uppercase tracking-widest">Premium Tool</span>
                            </div>
                            <h2 className="text-2xl md:text-2xl lg:text-3xl font-black mb-3 tracking-tight leading-tight">
                                Prop<span className="text-[var(--color-primary-light-2)]">Worth</span>
                            </h2>
                            <p className="text-xs md:text-sm text-blue-50 font-medium leading-relaxed mb-6 opacity-90">
                                Check Estimated Transaction Price of any Property accurately with Pune Dream Home's intelligence.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 group/item">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20 group-hover/item:bg-white/20 transition-all">
                                        <Calculator className="w-4 h-4 text-[var(--color-primary-light-2)]" />
                                    </div>
                                    <span className="text-xs font-bold tracking-wide">Real-time Analytics</span>
                                </div>
                                <div className="flex items-center gap-3 group/item">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20 group-hover/item:bg-white/20 transition-all">
                                        <Info className="w-4 h-4 text-[var(--color-primary-light-2)]" />
                                    </div>
                                    <span className="text-xs font-bold tracking-wide">Market Trend Insights</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Search Form */}
                    <div className="relative z-10 flex-1 p-6 md:p-8 lg:p-10 backdrop-blur-sm bg-white/5">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-6 h-[2px] bg-[var(--color-primary-light-2)]"></span>
                                <p className="text-[9px] md:text-[10px] font-black text-white/80 uppercase tracking-wider">Powered by Pune Dream Home</p>
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-white mb-5 md:mb-6 tracking-tight uppercase">Check Property Price</h3>

                            <div className="relative group z-20">
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-1.5 rounded-xl md:rounded-2xl border-2 border-[var(--color-primary-lightest)] shadow-lg focus-within:border-[var(--color-primary-light-2)] transition-all duration-300">
                                    <div className="flex items-center gap-3 px-3 flex-1">
                                        <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[var(--color-primary)] flex-shrink-0" />
                                        <input
                                            type="text"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            onFocus={() => setShowDropdown(true)}
                                            placeholder="Enter Locality"
                                            className="w-full bg-transparent py-3 md:py-3.5 outline-none text-sm md:text-base text-[var(--color-dark)] font-bold placeholder:text-gray-400"
                                        />
                                    </div>
                                    <button className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark-1)] text-white px-6 md:px-8 py-3 md:py-3.5 rounded-lg md:rounded-xl text-xs md:text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-2xl transition-all active:scale-95 group/btn">
                                        Check Worth
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1.5" />
                                    </button>
                                </div>

                                {/* Dropdown */}
                                {showDropdown && search && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)}></div>
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[var(--color-primary-lightest)] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-50 overflow-hidden animate-fadeIn max-h-[250px] overflow-y-auto">
                                            <div className="sticky top-0 p-2.5 bg-gray-50 border-b border-[var(--color-primary-lightest)] z-10 text-center">
                                                <span className="text-[9px] font-black text-[var(--color-primary)] uppercase tracking-widest">Select Location</span>
                                            </div>
                                            <div className="">
                                                {filteredLocations.map((loc) => (
                                                    <div
                                                        key={loc}
                                                        onClick={() => {
                                                            setSearch(loc);
                                                            setShowDropdown(false);
                                                        }}
                                                        className="px-4 py-3 hover:bg-[var(--color-primary-lightest)]/50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-0 transition-colors group/loc"
                                                    >
                                                        <div className="w-7 h-7 rounded-lg bg-[var(--color-primary-lightest)]/50 flex items-center justify-center group-hover/loc:bg-[var(--color-primary)] transition-colors">
                                                            <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)] group-hover/loc:text-white" />
                                                        </div>
                                                        <span className="text-xs md:text-sm font-bold text-[var(--color-dark)]">{loc}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                                <Link to="/valuation" className="flex items-center gap-3 p-2 rounded-xl border-2 border-white/20 hover:border-white/50 hover:bg-white/10 backdrop-blur-md bg-white/5 transition-all group">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--color-primary-light-2)] transition-all flex-shrink-0">
                                        <Calculator className="w-5 h-5 text-white group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white uppercase tracking-tight">Report</p>
                                        <p className="text-[9px] text-white/60 font-normal leading-tight">Property analysis</p>
                                    </div>
                                </Link>
                                <Link to="/trends" className="flex items-center gap-3 p-2 rounded-xl border-2 border-white/20 hover:border-white/50 hover:bg-white/10 backdrop-blur-md bg-white/5 transition-all group">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--color-primary-light-2)] transition-all flex-shrink-0">
                                        <TrendingUp className="w-5 h-5 text-white group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white uppercase tracking-tight">Trends</p>
                                        <p className="text-[9px] text-white/60 font-normal leading-tight">Historical data</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default PropWorth;
