// components/HeroBanner.jsx
import React, { useState } from 'react';
import { Home, Search, MapPin, TrendingUp, Award, Clock } from 'lucide-react';
import { statsData } from '../../../../constants/propertyData';

const HeroBanner = ({ onQuickSearch }) => {
    const [quickSearchTerm, setQuickSearchTerm] = useState('');

    const handleQuickSearch = (e) => {
        e.preventDefault();
        if (quickSearchTerm.trim()) {
            onQuickSearch(quickSearchTerm);
        }
    };

    const popularLocalities = [
        'Kharadi', 'Hinjewadi', 'Wakad', 'Baner', 'Kothrud'
    ];

    return (
        <div>
            {/* Main Hero Section */}
            <div
                className="text-white relative overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark-2) 100%)'
                }}
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 py-16 relative z-10">
                    {/* Header with Icon */}
                    <div className="flex items-center gap-3 mb-4 animate-fadeIn">
                        <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                            <Home className="w-10 h-10" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold">
                                Ready to Move Properties
                            </h1>
                        </div>
                    </div>

                    {/* Subtitle */}
                    <p className="text-xl mb-8 animate-fadeIn"
                        style={{
                            color: 'var(--color-primary-lightest)',
                            animationDelay: '0.1s'
                        }}
                    >
                        Find your perfect home in Pune - Move in today!
                    </p>

                    {/* Quick Search Bar */}
                    <form
                        onSubmit={handleQuickSearch}
                        className="bg-white rounded-xl p-2 flex flex-col md:flex-row gap-2 shadow-2xl max-w-4xl animate-fadeIn"
                        style={{ animationDelay: '0.2s' }}
                    >
                        <div className="flex-1 flex items-center gap-2 px-4 min-w-0">
                            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Search by location or property name..."
                                value={quickSearchTerm}
                                onChange={(e) => setQuickSearchTerm(e.target.value)}
                                className="w-full py-3 outline-none text-gray-900 placeholder-gray-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap"
                            style={{
                                backgroundColor: 'var(--color-primary)'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = 'var(--color-primary-dark-1)';
                                e.target.style.transform = 'scale(1.02)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'var(--color-primary)';
                                e.target.style.transform = 'scale(1)';
                            }}
                        >
                            Search
                        </button>
                    </form>

                    {/* Popular Localities */}
                    <div className="mt-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                        <p className="text-sm mb-3 opacity-90">Popular Localities:</p>
                        <div className="flex flex-wrap gap-2">
                            {popularLocalities.map((locality, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setQuickSearchTerm(locality);
                                        onQuickSearch(locality);
                                    }}
                                    className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-white/20 transition-all duration-300 flex items-center gap-2 border border-white/20"
                                >
                                    <MapPin className="w-3 h-3" />
                                    {locality}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-white shadow-sm border-b border-gray-100">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {/* Total Properties */}
                        <div className="text-center group cursor-pointer">
                            <div className="flex items-center justify-center mb-2">
                                <div
                                    className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                                    style={{
                                        backgroundColor: 'var(--color-primary-lightest)'
                                    }}
                                >
                                    <Home className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                                </div>
                            </div>
                            <p
                                className="text-3xl font-bold mb-1 transition-colors"
                                style={{ color: 'var(--color-primary)' }}
                            >
                                {statsData.totalProperties}
                            </p>
                            <p className="text-sm text-gray-600 font-medium">Properties</p>
                        </div>

                        {/* New Projects */}
                        <div className="text-center group cursor-pointer">
                            <div className="flex items-center justify-center mb-2">
                                <div
                                    className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                                    style={{
                                        backgroundColor: 'var(--color-primary-lightest)'
                                    }}
                                >
                                    <TrendingUp className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                                </div>
                            </div>
                            <p
                                className="text-3xl font-bold mb-1"
                                style={{ color: 'var(--color-primary)' }}
                            >
                                {statsData.newProjects}
                            </p>
                            <p className="text-sm text-gray-600 font-medium">New Projects</p>
                        </div>

                        {/* Verified */}
                        <div className="text-center group cursor-pointer">
                            <div className="flex items-center justify-center mb-2">
                                <div
                                    className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                                    style={{
                                        backgroundColor: 'var(--color-primary-lightest)'
                                    }}
                                >
                                    <Award className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                                </div>
                            </div>
                            <p
                                className="text-3xl font-bold mb-1"
                                style={{ color: 'var(--color-primary)' }}
                            >
                                {statsData.verified}
                            </p>
                            <p className="text-sm text-gray-600 font-medium">Verified</p>
                        </div>

                        {/* Support */}
                        <div className="text-center group cursor-pointer">
                            <div className="flex items-center justify-center mb-2">
                                <div
                                    className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                                    style={{
                                        backgroundColor: 'var(--color-primary-lightest)'
                                    }}
                                >
                                    <Clock className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                                </div>
                            </div>
                            <p
                                className="text-3xl font-bold mb-1"
                                style={{ color: 'var(--color-primary)' }}
                            >
                                {statsData.support}
                            </p>
                            <p className="text-sm text-gray-600 font-medium">Support</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Banner */}
            <div
                className="py-4"
                style={{
                    backgroundColor: 'var(--color-primary-lightest)'
                }}
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                            <span className="font-medium" style={{ color: 'var(--color-primary-dark-2)' }}>
                                No Brokerage
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                            <span className="font-medium" style={{ color: 'var(--color-primary-dark-2)' }}>
                                Instant Viewing
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                            <span className="font-medium" style={{ color: 'var(--color-primary-dark-2)' }}>
                                Verified Properties
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                            <span className="font-medium" style={{ color: 'var(--color-primary-dark-2)' }}>
                                Move-in Ready
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;