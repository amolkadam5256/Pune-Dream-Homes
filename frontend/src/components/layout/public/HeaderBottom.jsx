import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const HeaderBottom = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);

    // Function to calculate dropdown position to keep it within viewport
    const getDropdownPosition = (index, totalItems) => {
        // For first 3 items (Buy, Rent, Sell), align to left
        if (index <= 2) {
            return { left: '0', transform: 'none' };
        }
        // For last 2 items (MB Advice, Help), align to right
        if (index >= totalItems - 2) {
            return { right: '0', transform: 'none' };
        }
        // For middle items, center align
        return { left: '50%', transform: 'translateX(-50%)' };
    };

    const buySubsections = {
        "Popular Choices": [
            { label: "Ready to Move", link: "/buy/ready-to-move" },
            { label: "Owner Properties", link: "/buy/owner-properties" },
            { label: "Budget Homes", link: "/buy/budget-homes" },
            { label: "Premium Homes", link: "/buy/premium-homes" },
            { label: "New Projects", link: "/buy/new-projects" }
        ],
        "Property Types": [
            { label: "Flats in Pune", link: "/buy/flats-pune" },
            { label: "House for sale in Pune", link: "/buy/house-pune" },
            { label: "Villa in Pune", link: "/buy/villa-pune" },
            { label: "Plot in Pune", link: "/buy/plot-pune" },
            { label: "Office Space in Pune", link: "/buy/office-pune" },
            { label: "Commercial Space in Pune", link: "/buy/commercial-pune" }
        ],
        "Budget": [
            { label: "Under ₹ 50 Lac", link: "/buy/budget/under-50lac" },
            { label: "₹ 50 Lac - ₹ 1 Cr", link: "/buy/budget/50lac-1cr" },
            { label: "₹ 1 Cr - ₹ 1.5 Cr", link: "/buy/budget/1cr-1.5cr" },
            { label: "Above ₹ 1.5 Cr", link: "/buy/budget/above-1.5cr" }
        ],
        "Explore": [
            { label: "Localities in Pune", link: "/explore/localities" },
            { label: "Projects in Pune", link: "/explore/projects" },
            { label: "Find an Agent", link: "/explore/agents" },
            { label: "Home Interiors in Pune", link: "/explore/interiors" }
        ],
        "Buying Tools": [
            { label: "PropWorth", link: "/tools/propworth" },
            { label: "Rates & Trends", link: "/tools/rates-trends" },
            { label: "Buy vs Rent", link: "/tools/buy-vs-rent" },
            { label: "Tips and Guides", link: "/tools/tips-guides" }
        ]
    };

    const rentSubsections = {
        "Popular Choices": [
            { label: "Owner Properties", link: "/rent/owner-properties" },
            { label: "Verified Properties", link: "/rent/verified" },
            { label: "Furnished Homes", link: "/rent/furnished" },
            { label: "Bachelor Friendly Homes", link: "/rent/bachelor-friendly" },
            { label: "Immediately Available", link: "/rent/immediate" }
        ],
        "Property Types": [
            { label: "Flat for rent in Pune", link: "/rent/flat-pune" },
            { label: "House for rent in Pune", link: "/rent/house-pune" },
            { label: "Villa for rent in Pune", link: "/rent/villa-pune" },
            { label: "PG in Pune", link: "/rent/pg-pune" },
            { label: "Office Space in Pune", link: "/rent/office-pune" },
            { label: "Commercial Space in Pune", link: "/rent/commercial-pune" },
            { label: "Coworking Space in Pune", link: "/rent/coworking-pune" },
            { label: "Coliving Space in Pune", link: "/rent/coliving-pune" },
            { label: "Student Hostels in Pune", link: "/rent/hostels-pune" },
            { label: "Luxury PG in Pune", link: "/rent/luxury-pg-pune" }
        ],
        "Budget": [
            { label: "Under ₹ 10,000", link: "/rent/budget/under-10k" },
            { label: "₹ 10,000 - ₹ 15,000", link: "/rent/budget/10k-15k" },
            { label: "₹ 15,000 - ₹ 25,000", link: "/rent/budget/15k-25k" },
            { label: "Above ₹ 25,000", link: "/rent/budget/above-25k" }
        ],
        "Explore": [
            { label: "Localities", link: "/rent/localities" },
            { label: "Buy Vs Rent", link: "/rent/buy-vs-rent" },
            { label: "Find an Agent", link: "/rent/find-agent" },
            { label: "Share Requirement", link: "/rent/share-requirement" }
        ],
        "Property Services": [
            { label: "Rent Agreement", link: "/services/rent-agreement" }
        ]
    };

    const sellSubsections = {
        "For Owner": [
            { label: "Post Property Free", link: "/sell/post-free" },
            { label: "My Dashboard", link: "/sell/dashboard" },
            { label: "+91 123456789", link: "tel:+91123456789" },
            { label: "Email Us : support@magicbricks.com", link: "mailto:support@magicbricks.com" }
        ],
        "For Agent & Builder": [
            { label: "My Dashboard", link: "/agent/dashboard" },
            { label: "Developer Lounge", link: "/agent/developer-lounge" },
            { label: "Sales Enquiry", link: "/agent/sales-enquiry" },
            { label: "Ad Packages", link: "/agent/ad-packages" },
        ],
        "Selling Tools": [
            { label: "Property Valuation", link: "/sell/valuation" },
            { label: "Find an Agent", link: "/sell/find-agent" },
            { label: "Rates & Trends", link: "/sell/rates-trends" },
            { label: "PropWorth", link: "/sell/propworth" },
            { label: "Digipin", link: "/sell/digipin" }
        ]
    };

    const homeLoansSubsections = {
        "Apply Now": [
            { label: "Home Loans", link: "/loans/home-loans" },
            { label: "Balance Transfer", link: "/loans/balance-transfer" },
            { label: "Loan Against Property", link: "/loans/loan-against-property" }
        ],
        "Partners": [
            { label: "SBI Home Loan", link: "/loans/partners/sbi" },
            { label: "HDFC Home Loan", link: "/loans/partners/hdfc" },
            { label: "Axis Home Loan", link: "/loans/partners/axis" },
            { label: "Kotak Home Loan", link: "/loans/partners/kotak" },
            { label: "LIC HF Home Loan", link: "/loans/partners/lichf" },
            { label: "ICICI Home Loan", link: "/loans/partners/icici" },
            { label: "Canara Bank Home Loan", link: "/loans/partners/canara" },
            { label: "Bank of Baroda Home Loan", link: "/loans/partners/bob" },
            { label: "Punjab National Bank Home Loan", link: "/loans/partners/pnb" }
        ],
        "Explore": [
            { label: "Home Loan EMI Calculator", link: "/loans/emi-calculator" },
            { label: "Home Loan Eligibility", link: "/loans/eligibility" },
            { label: "Get Home Loan Offers NEW", link: "/loans/offers", badge: "NEW" },
            { label: "Check Credit Score", link: "/loans/credit-score" },
            { label: "Home Loan Prepayment", link: "/loans/prepayment" },
            { label: "Home Loan Interest Rate", link: "/loans/interest-rate" },
            { label: "Home Loan Balance Transfer", link: "/loans/balance-transfer-info" },
            { label: "Home Loan Documentation", link: "/loans/documentation" }
        ],
        "EMI Calculators": [
            { label: "SBI Home Loan EMI Calculator", link: "/loans/emi/sbi" },
            { label: "HDFC Home Loan EMI Calculator", link: "/loans/emi/hdfc" },
            { label: "Axis Bank Home Loan EMI Calculator", link: "/loans/emi/axis" },
            { label: "Bajaj Home Loan EMI Calculator", link: "/loans/emi/bajaj" },
            { label: "Kotak Home Loan EMI Calculator", link: "/loans/emi/kotak" },
            { label: "L&T Home Loan EMI Calculator", link: "/loans/emi/lnt" }
        ],
        "Interest Rates": [
            { label: "SBI Home Loan Interest Rate", link: "/loans/rates/sbi" },
            { label: "HDFC Home Loan Interest Rate", link: "/loans/rates/hdfc" },
            { label: "Axis Bank Home Loan Interest Rate", link: "/loans/rates/axis" },
            { label: "Bajaj Home Loan Interest Rate", link: "/loans/rates/bajaj" },
            { label: "Kotak Bank Interest Rate", link: "/loans/rates/kotak" },
            { label: "L&T Home Loan Interest Rate", link: "/loans/rates/lnt" }
        ]
    };

    const homeInteriorsSubsections = [
        { label: "Home Interior Design Services", link: "/interiors/design-services" },
        { label: "Explore our services", link: "/interiors/explore-services" }
    ];

    const mbAdviceSubsections = {
        "Interior Designers Near You": [
            { label: "Interior Designers Delhi", link: "/advice/designers/delhi" },
            { label: "Interior Designers Gurgaon", link: "/advice/designers/gurgaon" },
            { label: "Interior Designers Bangalore", link: "/advice/designers/bangalore" },
            { label: "Interior Designers Pune", link: "/advice/designers/pune" },
            { label: "Interior Designers Hyderabad", link: "/advice/designers/hyderabad" },
            { label: "Interior Designers Chennai", link: "/advice/designers/chennai" },
            { label: "Interior Designers Mumbai", link: "/advice/designers/mumbai" },
            { label: "Interior Designers Noida", link: "/advice/designers/noida" }
        ],
        "MB Research": [
            { label: "Research & Insights", link: "/advice/research/insights" },
            { label: "Prop Index", link: "/advice/research/prop-index" },
            { label: "Find Pincode", link: "/advice/research/pincode" }
        ],
        "Services & Tools": [
            { label: "Property Valuation", link: "/advice/tools/valuation" },
            { label: "Rates & Trends", link: "/advice/tools/rates-trends" },
            { label: "Area Converter", link: "/advice/tools/area-converter" },
            { label: "PropWorth", link: "/advice/tools/propworth" },
            { label: "Buy v/s Rent", link: "/advice/tools/buy-vs-rent" }
        ],
        "Localities & Projects": [
            { label: "Localities in Pune", link: "/advice/localities/pune" },
            { label: "Locality Review Videos", link: "/advice/localities/videos" },
            { label: "Compare Localities", link: "/advice/localities/compare" },
            { label: "New Projects in Pune", link: "/advice/projects/pune" },
            { label: "Project Review Videos", link: "/advice/projects/videos" },
            { label: "MBTV Videos", link: "/advice/mbtv" }
        ],
        "News & Blogs": [
            { label: "Latest Blogs", link: "/advice/blogs/latest" },
            { label: "Lifestyle", link: "/advice/blogs/lifestyle" },
            { label: "Policies", link: "/advice/blogs/policies" },
            { label: "Finance & Legal", link: "/advice/blogs/finance-legal" },
            { label: "City Blogs", link: "/advice/blogs/city" },
            { label: "Property News", link: "/advice/news/property" },
            { label: "Trending Web Stories", link: "/advice/stories/trending" }
        ]
    };

    const helpSubsections = [
        { label: "Help Center", link: "/help/center" },
        { label: "Sales Enquiry", link: "/help/sales-enquiry" },
        { label: "Chat with Us", link: "/help/chat" }
    ];

    // Menu items for both desktop and mobile
    const menuItems = [
        { title: "Buy", subsections: buySubsections },
        { title: "Rent", subsections: rentSubsections },
        { title: "Sell", subsections: sellSubsections },
        { title: "Home Loans", subsections: homeLoansSubsections },
        { title: "Home Interiors", subsections: homeInteriorsSubsections },
        { title: "MB Advice", subsections: mbAdviceSubsections },
        { title: "Help", subsections: helpSubsections }
    ];

    // For mobile view, we'll use only first 4 items
    const mobileMenuItems = menuItems.slice(0, 4);

    return (
        <>
            {/* Desktop Header - Show all menu items with dropdowns on hover */}
            <header className="hidden lg:block bg-white shadow-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6">
                    <nav className="flex items-center justify-start h-12 relative">
                        {/* All Menu Items in One Line */}
                        <div className="flex items-center space-x-6">
                            {menuItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="relative group"
                                    onMouseEnter={() => setActiveDropdown(index)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <div className="flex items-center px-6 py-2 text-gray-700 hover:text-[var(--color-primary)] font-medium group cursor-pointer transition-all duration-200">
                                        <span className="font-semibold text-xs relative">
                                            {item.title}
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full"></span>
                                        </span>
                                        {item.subsections && (
                                            <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                                        )}
                                    </div>

                                    {/* Mega Dropdown for Buy, Rent, Sell, Home Loans, MB Advice */}
                                    {item.subsections && typeof item.subsections === 'object' && !Array.isArray(item.subsections) && (
                                        <div
                                            className="absolute top-full mt-1 w-[900px] bg-white shadow-2xl rounded-lg z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 border-t-0 border-[var(--color-primary)]"
                                            style={{
                                                ...getDropdownPosition(index, menuItems.length),
                                                maxWidth: 'calc(100vw -40px)'
                                            }}
                                        >
                                            <div className="p-6 grid grid-cols-5 gap-6 max-w-full overflow-x-hidden">
                                                {Object.entries(item.subsections).map(([section, items], sectionIndex) => (
                                                    <div key={sectionIndex} className="space-y-3">
                                                        <h3 className="font-bold text-gray-800 text-xs border-b-2 border-[var(--color-primary)] pb-2 mb-2 uppercase tracking-wide">
                                                            {section}
                                                        </h3>
                                                        <div className="space-y-2">
                                                            {items.map((subItem, subIndex) => (
                                                                <a
                                                                    key={subIndex}
                                                                    href={subItem.link}
                                                                    className="block text-xs text-gray-600 hover:text-[var(--color-primary)] hover:bg-blue-50 p-1.5 rounded transition-all duration-150 hover:translate-x-1 group/item"
                                                                    onClick={() => setActiveDropdown(null)}
                                                                >
                                                                    <span className="flex items-center justify-between">
                                                                        <span>{subItem.label}</span>
                                                                        {subItem.badge && (
                                                                            <span className="ml-2 px-1.5 py-0.5 text-[9px] font-bold bg-[var(--color-primary)] to-pink-500 text-white rounded animate-pulse">
                                                                                {subItem.badge}
                                                                            </span>
                                                                        )}
                                                                    </span>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Simple Dropdown for Home Interiors and Help */}
                                    {item.subsections && Array.isArray(item.subsections) && (
                                        <div
                                            className="absolute top-full mt-1 w-64 bg-white shadow-lg rounded-lg z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 border-t-0 border-[var(--color-primary)]"
                                            style={{
                                                right: '0',
                                                transform: 'none',
                                                maxWidth: 'calc(100vw - 40px)'
                                            }}
                                        >
                                            <div className="p-4">
                                                {item.subsections.map((subItem, subIndex) => (
                                                    <a
                                                        key={subIndex}
                                                        href={subItem.link}
                                                        className="flex items-center p-2.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-[var(--color-primary)] rounded transition-all duration-150 border-b border-gray-100 last:border-b-0"
                                                        onClick={() => setActiveDropdown(null)}
                                                    >
                                                        <span>{subItem.label}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </nav>
                </div>
            </header>

            {/* Mobile Header - Full width with only 4 items */}
            <header className="lg:hidden bg-white shadow-md sticky top-0 z-40">
                <div className="w-full px-1">
                    <nav className="flex items-center justify-between h-14">
                        {/* Full width - each menu item takes equal space */}
                        {mobileMenuItems.map((item, index) => (
                            <div
                                key={index}
                                className="relative group flex-1 text-center"
                                onMouseEnter={() => setActiveDropdown(index)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <div className="flex items-center justify-center px-1 py-3 text-gray-700 hover:text-[var(--color-primary)] font-medium group cursor-pointer w-full">
                                    <span className="font-semibold text-xs">{item.title}</span>
                                    {item.subsections && (
                                        <ChevronDown className={`ml-1 w-3 h-3 transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
                                    )}
                                </div>

                                {/* Mega Dropdown for Buy, Rent, Sell, Home Loans (mobile optimized) */}
                                {item.subsections && typeof item.subsections === 'object' && !Array.isArray(item.subsections) && (
                                    <div className="fixed left-0 right-0 top-14 bg-white shadow-2xl z-50 max-h-[calc(100vh-3.5rem)] overflow-y-auto invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                                        <div className="p-4">
                                            {/* Grid layout for sections */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                {Object.entries(item.subsections).map(([section, items], sectionIndex) => (
                                                    <div key={sectionIndex} className="space-y-3">
                                                        <h3 className="font-bold text-gray-800 text-xs pb-2 mb-2 border-b-2 border-[var(--color-primary)] uppercase tracking-wide">
                                                            {section}
                                                        </h3>
                                                        <div className="space-y-2">
                                                            {items.map((subItem, subIndex) => (
                                                                <a
                                                                    key={subIndex}
                                                                    href={subItem.link}
                                                                    className="block text-xs text-gray-600 hover:text-[var(--color-primary)] hover:bg-blue-50 p-2 rounded-lg transition-all duration-150"
                                                                    onClick={() => setActiveDropdown(null)}
                                                                >
                                                                    <span className="flex items-center justify-between">
                                                                        <span>{subItem.label}</span>
                                                                        {subItem.badge && (
                                                                            <span className="ml-2 px-1.5 py-0.5 text-[9px] font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white rounded">
                                                                                {subItem.badge}
                                                                            </span>
                                                                        )}
                                                                    </span>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            </header>
        </>
    );
};

export default HeaderBottom;