import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Home, DollarSign, Search, ChevronDown, X } from 'lucide-react';
import { motion } from 'framer-motion';
import MiniCarousel from './MiniCarousel';

const HomeBanner = () => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('Buy');
    const [selectedLocations, setSelectedLocations] = useState(['Pune']);
    const [locationSearch, setLocationSearch] = useState('');
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [propertyTypeSearch, setPropertyTypeSearch] = useState('');
    const [selectedPropertyType, setSelectedPropertyType] = useState('Flat');
    const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
    const [budget, setBudget] = useState('');
    const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);

    const tabs = ['Buy', 'Rent', 'New Projects', 'PG', 'Plot', 'Commercial', 'Post Free Property Ad'];

    const tabRoutes = {
        'Buy': '/buy',
        'Rent': '/rent',
        'New Projects': '/projects',
        'PG': '/pg',
        'Plot': '/plot',
        'Commercial': '/commercial',
        'Post Free Property Ad': '/sell'
    };

    const locations = [
        'Pune', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
        'Kolkata', 'Ahmedabad', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur',
        'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
        'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik',
        'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar', 'Varanasi'
    ];

    const propertyTypes = [
        'Flat', 'House', 'Villa', 'Plot', 'Apartment', 'Builder Floor',
        'Penthouse', 'Studio Apartment', 'Residential Land', 'Farm House',
        'Serviced Apartment', 'Studio', '1 BHK', '2 BHK', '3 BHK', '4 BHK',
        '5 BHK', 'Commercial Office', 'Commercial Shop', 'Warehouse',
        'Industrial Building', 'Commercial Land', 'Business Center'
    ];

    const budgetOptions = [
        { value: '', label: 'Budget' },
        { value: 'under-50', label: 'Under ₹50 Lacs' },
        { value: '50-100', label: '₹50L - ₹1Cr' },
        { value: '100-150', label: '₹1Cr - ₹1.5Cr' },
        { value: '150-200', label: '₹1.5Cr - ₹2Cr' },
        { value: '200-300', label: '₹2Cr - ₹3Cr' },
        { value: 'above-300', label: 'Above ₹3Cr' }
    ];

    const filteredLocations = locations.filter(loc =>
        loc.toLowerCase().includes(locationSearch.toLowerCase())
    );

    const filteredPropertyTypes = propertyTypes.filter(type =>
        type.toLowerCase().includes(propertyTypeSearch.toLowerCase())
    );

    const toggleLocation = (location) => {
        if (selectedLocations.includes(location)) {
            setSelectedLocations(selectedLocations.filter(loc => loc !== location));
        } else {
            setSelectedLocations([...selectedLocations, location]);
        }
    };

    const handleSearch = () => {
        const route = tabRoutes[selectedTab] || '/buy';
        const params = new URLSearchParams();
        if (selectedLocations.length > 0) params.append('locations', selectedLocations.join(','));
        if (selectedPropertyType) params.append('propertyType', selectedPropertyType);
        if (budget) params.append('budget', budget);
        navigate(`${route}?${params.toString()}`);
    };

    const handleTabChange = (tab) => setSelectedTab(tab);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full py-12 md:py-16 px-4 relative overflow-visible"
        >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

                    {/* Left Side Content & Search */}
                    <div className="w-full lg:flex-1">
                        {/* Welcome Text */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex items-center justify-start md:justify-center lg:justify-start mb-6"
                        >
                            <h1 className="text-2xl md:text-2xl font-normal text-gray-800 text-left md:text-center lg:text-left">
                                Welcome back! Start your{' '}
                                <span className="text-[var(--color-primary)] font-bold">#PataBadloLifeBadlo Journey</span>
                            </h1>
                        </motion.div>

                        {/* Tabs with original styling */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap gap-x-4 gap-y-2 mb-6 relative justify-start md:justify-center lg:justify-start"
                        >
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => handleTabChange(tab)}
                                    className={`px-4 py-2.5 font-semibold text-sm transition-all duration-300 relative group ${selectedTab === tab
                                        ? 'text-[var(--color-primary)]'
                                        : 'text-gray-600'
                                        }`}
                                >
                                    {tab}
                                    <span
                                        className={`absolute bottom-0 left-0 h-0.5 bg-[var(--color-primary)] transition-all duration-300 ease-out ${selectedTab === tab
                                            ? 'w-full'
                                            : 'w-0 group-hover:w-full'
                                            }`}
                                    ></span>
                                </button>
                            ))}
                        </motion.div>

                        {/* Search Bar with original structural look but responsive fixes */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="bg-white/80 backdrop-blur-md rounded-lg md:rounded-full shadow-sm border border-blue-100 p-3 md:p-4"
                        >
                            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                                {/* Location Dropdown */}
                                <div className="flex-1 relative">
                                    <div className="flex items-center gap-2 px-4 py-3 md:py-2.5 border-2 border-blue-100 rounded-lg md:rounded-full hover:border-[var(--color-primary-light-1)] transition-all bg-white shadow-sm">
                                        <MapPin className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />

                                        <div className="flex flex-1 items-center gap-1 overflow-hidden">
                                            {selectedLocations.length > 0 && !showLocationDropdown && (
                                                <div className="flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 whitespace-nowrap">
                                                    <span className="text-xs font-semibold text-gray-800">{selectedLocations[0]}</span>
                                                    {selectedLocations.length > 1 && <span className="text-[10px] bg-[var(--color-primary)] text-white px-1 rounded-full">+{selectedLocations.length - 1}</span>}
                                                    <X className="w-3 h-3 text-gray-400 cursor-pointer" onClick={() => setSelectedLocations([])} />
                                                </div>
                                            )}
                                            <input
                                                type="text"
                                                value={locationSearch}
                                                onChange={(e) => setLocationSearch(e.target.value)}
                                                onFocus={() => setShowLocationDropdown(true)}
                                                placeholder={selectedLocations.length === 0 ? "Search locations..." : ""}
                                                className="outline-none text-sm font-medium text-gray-700 w-full bg-transparent placeholder:text-gray-400"
                                            />
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    </div>

                                    {showLocationDropdown && (
                                        <>
                                            <div className="fixed inset-0 z-40" onClick={() => setShowLocationDropdown(false)}></div>
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-blue-100 rounded-lg shadow-2xl z-50 max-h-60 overflow-y-auto p-2">
                                                {filteredLocations.map((loc) => (
                                                    <div
                                                        key={loc}
                                                        onClick={() => { toggleLocation(loc); setShowLocationDropdown(false); }}
                                                        className={`px-4 py-2.5 cursor-pointer rounded hover:bg-blue-50 transition-colors text-sm ${selectedLocations.includes(loc) ? 'bg-blue-100 text-[var(--color-primary)] font-medium' : 'text-gray-700'}`}
                                                    >
                                                        {loc}
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Property Type Dropdown */}
                                <div className="flex-1 relative">
                                    <div className="flex items-center gap-2 px-4 py-3 md:py-2.5 border-2 border-blue-100 rounded-lg md:rounded-full hover:border-[var(--color-primary-light-1)] transition-all bg-white shadow-sm cursor-pointer" onClick={() => setShowPropertyDropdown(!showPropertyDropdown)}>
                                        <Home className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />
                                        <span className="text-sm font-medium text-gray-700 truncate">{selectedPropertyType}</span>
                                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-auto" />
                                    </div>
                                    {showPropertyDropdown && (
                                        <>
                                            <div className="fixed inset-0 z-40" onClick={() => setShowPropertyDropdown(false)}></div>
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-blue-100 rounded-lg shadow-2xl z-50 max-h-60 overflow-y-auto p-2">
                                                {propertyTypes.map((type) => (
                                                    <div
                                                        key={type}
                                                        onClick={() => { setSelectedPropertyType(type); setShowPropertyDropdown(false); }}
                                                        className={`px-4 py-2.5 cursor-pointer rounded hover:bg-blue-50 transition-colors text-sm ${selectedPropertyType === type ? 'bg-blue-100 text-[var(--color-primary)] font-medium' : 'text-gray-700'}`}
                                                    >
                                                        {type}
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Search Button */}
                                <button
                                    onClick={handleSearch}
                                    className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark-1)] text-white font-semibold px-8 py-3 md:py-2.5 rounded-lg md:rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow hover:shadow-lg active:scale-95"
                                >
                                    <Search className="w-5 h-5" />
                                    <span className="text-sm">Search</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: MiniCarousel - Ensuring it stays visible during zoom */}
                    <div className="w-full lg:w-auto flex justify-center lg:justify-end">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 50 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="w-full max-w-[400px] lg:max-w-none"
                        >
                            <MiniCarousel />
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default HomeBanner;