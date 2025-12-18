import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Home, DollarSign, Search, ChevronDown, X } from 'lucide-react';
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

    // Map tabs to routes
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

    const removeLocation = (location) => {
        setSelectedLocations(selectedLocations.filter(loc => loc !== location));
    };

    // Handle search with navigation
    const handleSearch = () => {
        const route = tabRoutes[selectedTab] || '/buy';
        const params = new URLSearchParams();

        // Add search parameters
        if (selectedLocations.length > 0) {
            params.append('locations', selectedLocations.join(','));
        }
        if (selectedPropertyType) {
            params.append('propertyType', selectedPropertyType);
        }
        if (budget) {
            params.append('budget', budget);
        }

        // Navigate to the route with search parameters
        navigate(`${route}?${params.toString()}`);
    };

    // Handle tab change
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return (

        // bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 
        <div className="w-full py-16 px-4 flex flex-row relative gap-6">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary-lightest)] rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"></div>

            <div className="flex-1 relative z-10">
                <div className="max-w-7xl mx-auto mt-12">
                    {/* Welcome Text */}
                    <div className="flex items-center justify-start md:justify-center mb-6">
                        <h1 className="text-2xl md:text-2xl font-normal text-gray-800 text-left md:text-center">
                            Welcome back! Start your{' '}
                            <span className="text-[var(--color-primary)] font-bold">#PataBadloLifeBadlo Journey</span>
                        </h1>
                    </div>

                    {/* Tabs with hover animation */}
                    <div className="flex flex-wrap gap-4 mb-6 relative justify-start md:justify-center">
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
                                {/* Bottom border animation */}
                                <span
                                    className={`absolute bottom-0 left-0 h-0.5 bg-[var(--color-primary)] transition-all duration-300 ease-out ${selectedTab === tab
                                        ? 'w-full'
                                        : 'w-0 group-hover:w-full'
                                        }`}
                                ></span>
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="bg-white/80 backdrop-blur-md rounded-lg md:rounded-full shadow-sm border border-blue-100 p-3 md:p-4 space-y-3 md:space-y-0">
                        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                            {/* Location Dropdown */}
                            <div className="flex-1 min-w-full md:min-w-[200px] relative">
                                <div className="flex items-center gap-2 md:gap-2 px-4 py-3 md:py-2.5 border-2 border-blue-100 rounded-lg md:rounded-full hover:border-[var(--color-primary-light-1)] transition-all bg-white shadow-sm">
                                    <MapPin className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />

                                    {/* Show selected location with counter */}
                                    {selectedLocations.length > 0 && !showLocationDropdown && (
                                        <div className="flex items-center gap-2 py-0.5">
                                            <span className="text-sm font-semibold text-gray-800">
                                                {selectedLocations[0]}
                                            </span>
                                            {selectedLocations.length > 1 && (
                                                <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark-1)] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                                                    +{selectedLocations.length - 1}
                                                </span>
                                            )}
                                            <button
                                                onClick={() => setSelectedLocations([])}
                                                className="hover:bg-blue-100 rounded-full p-1 transition-colors"
                                            >
                                                <X className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                                            </button>
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
                                    <ChevronDown className="w-4 h-4 text-[var(--color-primary-light-1)] flex-shrink-0" />
                                </div>

                                {/* Location Dropdown */}
                                {showLocationDropdown && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setShowLocationDropdown(false)}
                                        ></div>
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-blue-100 rounded-lg shadow-2xl z-50 max-h-64 overflow-y-auto animate-slideDown">
                                            <div className="sticky top-0 bg-gradient-to-r from-[var(--color-primary-lightest)] to-blue-50 px-4 py-2 border-b border-blue-200">
                                                <span className="text-xs font-semibold text-[var(--color-primary)]">
                                                    {filteredLocations.length} locations found
                                                </span>
                                            </div>
                                            {filteredLocations.map((loc) => (
                                                <div
                                                    key={loc}
                                                    onClick={() => toggleLocation(loc)}
                                                    className={`px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors text-sm border-l-2 ${selectedLocations.includes(loc)
                                                        ? 'bg-blue-100 text-[var(--color-primary)] font-medium border-[var(--color-primary)]'
                                                        : 'text-gray-700 border-transparent'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span>{loc}</span>
                                                        {selectedLocations.includes(loc) && (
                                                            <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Property Type Dropdown */}
                            <div className="flex-1 min-w-full md:min-w-[200px] relative">
                                <div className="flex items-center gap-2 px-4 py-3 md:py-2.5 border-2 border-blue-100 rounded-lg md:rounded-full hover:border-[var(--color-primary-light-1)] transition-all bg-white shadow-sm">
                                    <Home className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />
                                    <input
                                        type="text"
                                        value={propertyTypeSearch || selectedPropertyType}
                                        onChange={(e) => setPropertyTypeSearch(e.target.value)}
                                        onFocus={() => setShowPropertyDropdown(true)}
                                        placeholder="Property type..."
                                        className="outline-none text-sm font-medium text-gray-700 w-full bg-transparent placeholder:text-gray-400"
                                    />
                                    <ChevronDown className="w-4 h-4 text-[var(--color-primary-light-1)] flex-shrink-0" />
                                </div>

                                {/* Property Type Dropdown */}
                                {showPropertyDropdown && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setShowPropertyDropdown(false)}
                                        ></div>
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-blue-100 rounded-lg shadow-2xl z-50 max-h-64 overflow-y-auto animate-slideDown">
                                            <div className="sticky top-0 bg-gradient-to-r from-[var(--color-primary-lightest)] to-blue-50 px-4 py-2 border-b border-blue-200">
                                                <span className="text-xs font-semibold text-[var(--color-primary)]">
                                                    {filteredPropertyTypes.length} property types
                                                </span>
                                            </div>
                                            {filteredPropertyTypes.map((type) => (
                                                <div
                                                    key={type}
                                                    onClick={() => {
                                                        setSelectedPropertyType(type);
                                                        setPropertyTypeSearch('');
                                                        setShowPropertyDropdown(false);
                                                    }}
                                                    className={`px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors text-sm border-l-2 ${selectedPropertyType === type
                                                        ? 'bg-blue-100 text-[var(--color-primary)] font-medium border-[var(--color-primary)]'
                                                        : 'text-gray-700 border-transparent'
                                                        }`}
                                                >
                                                    {type}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Budget */}
                            <div className="flex-1 min-w-full md:min-w-[200px] relative">
                                <div
                                    className="flex items-center gap-2 px-4 py-3 md:py-2.5 border-2 border-blue-100 rounded-lg md:rounded-full hover:border-[var(--color-primary-light-1)] transition-all bg-white shadow-sm cursor-pointer"
                                    onClick={() => setShowBudgetDropdown(!showBudgetDropdown)}
                                >
                                    <DollarSign className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />
                                    <input
                                        type="text"
                                        value={budgetOptions.find(b => b.value === budget)?.label || 'Budget'}
                                        readOnly
                                        placeholder="Select budget range..."
                                        className="outline-none text-sm font-medium text-gray-700 w-full bg-transparent placeholder:text-gray-400 cursor-pointer"
                                    />
                                    <ChevronDown className="w-4 h-4 text-[var(--color-primary-light-1)] flex-shrink-0" />
                                </div>

                                {/* Budget Dropdown */}
                                {showBudgetDropdown && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setShowBudgetDropdown(false)}
                                        ></div>
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-blue-100 rounded-lg shadow-2xl z-50 max-h-64 overflow-y-auto animate-slideDown">
                                            <div className="sticky top-0 bg-gradient-to-r from-[var(--color-primary-lightest)] to-blue-50 px-4 py-2 border-b border-blue-200">
                                                <span className="text-xs font-semibold text-[var(--color-primary)]">
                                                    {budgetOptions.length - 1} budget ranges
                                                </span>
                                            </div>
                                            {budgetOptions.map((budgetOption) => (
                                                <div
                                                    key={budgetOption.value}
                                                    onClick={() => {
                                                        setBudget(budgetOption.value);
                                                        setShowBudgetDropdown(false);
                                                    }}
                                                    className={`px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors text-sm border-l-2 ${budget === budgetOption.value
                                                        ? 'bg-blue-100 text-[var(--color-primary)] font-medium border-[var(--color-primary)]'
                                                        : 'text-gray-700 border-transparent'
                                                        }`}
                                                >
                                                    {budgetOption.label}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Search Button */}
                            <button
                                onClick={handleSearch}
                                className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark-1)] hover:from-[var(--color-primary-dark-1)] hover:to-[var(--color-primary-dark-2)] text-white font-semibold px-6 py-3 md:py-2.5 rounded-lg md:rounded-full flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full md:w-auto justify-center"
                            >
                                <Search className="w-5 h-5" />
                                <span className="text-sm">Search</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side Ad Banner */}
            <MiniCarousel />
        </div>
    );
};

export default HomeBanner;