import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { FaLocationDot, FaCrown } from "react-icons/fa6";
import images from "../../../assets/images/images";

const nearbyCities = ["Thane", "Navi Mumbai", "Nagpur", "Mumbai"];
const popularCities = ["Ahmedabad", "Bangalore", "Beyond Thane", "Chennai", "Gurgaon", "Hyderabad", "Indore", "Jaipur", "Kolkata", "Lucknow", "Mumbai", "Navi Mumbai", "New Delhi", "Noida", "Pune", "Thane"];
const allCities = ["Agra", "Ahmadnagar", "Allahabad", "Aluva", "Amritsar", "Aurangabad", "Badlapur", "Bareilly", "Belgaum", "Bhiwadi", "Bhiwandi", "Bhopal", "Bhubaneswar", "Bokaro Steel City", "Chandigarh", "Chengalpattu", "Coimbatore", "Dehradun", "Durgapur", "Ernakulam", "Erode", "Faridabad", "Ghaziabad", "Goa", "Gorakhpur", "Greater Noida", "Guntur", "Guwahati", "Gwalior", "Haridwar", "Hosur", "Hubli", "Jabalpur", "Jalandhar", "Jammu", "Jamshedpur", "Jodhpur", "Kalyan", "Kannur", "Kanpur", "Khopoli", "Kochi", "Kodaikanal", "Kottayam", "Kozhikode", "Lonavala", "Ludhiana", "Madurai", "Mangalore", "Mohali", "Mysore", "Nagpur", "Nainital", "Nanded", "Nashik", "Navsari", "Nellore", "Newtown", "Ooty", "Palakkad", "Palghar", "Panchkula", "Patiala", "Patna", "Pondicherry", "Raipur", "Rajahmundry", "Ranchi", "Salem", "Satara", "Shimla", "Siliguri", "Solapur", "Sonipat", "Surat", "Thanjavur", "Thrissur", "Tirunelveli", "Tirupati", "Tirupur", "Trichy", "Trivandrum", "Tumkur", "Udaipur", "Udupi", "Vadodara", "Vapi", "Varanasi", "Vijayawada", "Visakhapatnam"];

const TopBar = () => {
    const [selectedCity, setSelectedCity] = useState("Pune");
    const [openCityMenu, setOpenCityMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const cityLink = (city) => `/property-in-${city.toLowerCase().replace(/\s+/g, "-")}`;

    return (
        <div className={`sticky top-0 z-50 transition-colors duration-300 ${scrolled ? "bg-[var(--color-primary)]" : "bg-[var(--color-primary)]/95"} shadow-md`}>
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2">
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                    {/* LEFT SECTION */}
                    <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 flex-1 min-w-0">


                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex-shrink-0"
                        >
                            <img src={images.logo} alt="DomainName" className="h-8 sm:h-10 object-contain brightness-0 invert" />
                        </Link>

                        {/* Desktop City Selector */}
                        <div className="relative hidden lg:block flex-shrink-0">
                            <div
                                className="relative group"
                                onMouseEnter={() => setOpenCityMenu(true)}
                                onMouseLeave={() => setOpenCityMenu(false)}
                            >
                                <div className="flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
                                    {/* <FaLocationDot className="text-yellow-300 text-xs flex-shrink-0" /> */}
                                    <span className="font-semibold text-white whitespace-nowrap text-xs">{selectedCity}</span>
                                    <FaAngleDown className="text-white transition-transform group-hover:rotate-180 flex-shrink-0" />
                                </div>

                                {/* DESKTOP CITY DROPDOWN */}
                                {openCityMenu && (
                                    <div className="absolute left-0 top-full mt-2 w-[90vw] max-w-4xl bg-white shadow-2xl rounded-xl overflow-hidden z-50">
                                        <div className="p-5 space-y-5 max-h-[80vh] overflow-y-auto">
                                            {/* CURRENT CITY */}
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-[var(--color-primary)] text-white px-3 py-1.5 text-xs font-semibold rounded">
                                                        {selectedCity}
                                                    </div>
                                                    <span className="text-xs text-gray-600">Properties in this city</span>
                                                </div>
                                            </div>

                                            {/* NEARBY CITIES */}
                                            <div>
                                                <h3 className="font-bold text-gray-800 text-xs mb-3">Nearby Cities</h3>
                                                <div className="flex flex-wrap gap-3">
                                                    {nearbyCities.map((city) => (
                                                        <Link
                                                            key={city}
                                                            to={cityLink(city)}
                                                            onClick={() => {
                                                                setSelectedCity(city);
                                                                setOpenCityMenu(false);
                                                            }}
                                                            className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${city === selectedCity
                                                                ? 'bg-[var(--color-primary)] text-white font-bold'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-[var(--color-primary)]'
                                                                }`}
                                                        >
                                                            {city}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* POPULAR CITIES */}
                                            <div>
                                                <h3 className="font-bold text-gray-800 text-xs mb-3">Popular Metro Cities</h3>
                                                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                                                    {popularCities.map((city) => (
                                                        <Link
                                                            key={city}
                                                            to={cityLink(city)}
                                                            onClick={() => {
                                                                setSelectedCity(city);
                                                                setOpenCityMenu(false);
                                                            }}
                                                            className="text-xs text-gray-700 hover:text-[var(--color-primary)] hover:underline truncate py-1"
                                                        >
                                                            {city}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* ALL OTHER CITIES */}
                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <h3 className="font-bold text-gray-800 text-xs">All Other Cities</h3>
                                                    <span className="text-xs text-gray-500 font-medium">Sorted A-Z</span>
                                                </div>
                                                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                                                    {allCities.map((city) => (
                                                        <Link
                                                            key={city}
                                                            to={cityLink(city)}
                                                            onClick={() => {
                                                                setSelectedCity(city);
                                                                setOpenCityMenu(false);
                                                            }}
                                                            className="text-xs text-gray-600 hover:text-[var(--color-primary)] hover:underline truncate py-1"
                                                        >
                                                            {city}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="pt-4 border-t border-gray-200 text-center">
                                                <p className="text-gray-600 text-xs">
                                                    Can't find your city?{" "}
                                                    <Link to="/request-city" className="text-[var(--color-primary)] font-semibold hover:underline">
                                                        Request to add your city
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SECTION - Desktop */}
                    <div className="hidden lg:flex items-center gap-4 xl:gap-6 flex-shrink-0">
                        {/* MB Prime */}
                        <Link
                            to="/mb-prime"
                            className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors text-xs font-medium"
                        >
                            <FaCrown className="flex-shrink-0" />
                            <span className="whitespace-nowrap">MB Prime</span>
                        </Link>

                        {/* Login/Signup */}
                        <Link
                            to="/auth/login"
                            className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors text-xs font-medium"
                        >
                            <FaUser className="flex-shrink-0" />
                            <span className="whitespace-nowrap">Login / Signup</span>
                        </Link>

                        {/* Post Property */}
                        <Link
                            to="/post-property"
                            className="bg-white text-[var(--color-primary)] font-semibold px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-[var(--color-primary)] transition-all whitespace-nowrap text-xs shadow-md"
                        >
                            Post Property FREE
                        </Link>
                    </div>

                    {/* MOBILE/TABLET RIGHT SECTION */}
                    <div className="flex lg:hidden items-center gap-2 sm:gap-3 flex-shrink-0">
                        {/* Mobile City Selector */}
                        <div className="relative">
                            <div
                                className="flex items-center gap-1 sm:gap-1.5 cursor-pointer px-2 py-1 rounded-lg hover:bg-white/10 transition-colors"
                                onClick={() => setOpenCityMenu(!openCityMenu)}
                            >
                                <FaLocationDot className="text-yellow-300 text-xs sm:text-xs flex-shrink-0" />
                                <span className="font-semibold text-white text-xs sm:text-xs whitespace-nowrap max-w-[60px] sm:max-w-none truncate">{selectedCity}</span>
                                <FaAngleDown className={`text-white text-xs sm:text-xs transition-transform flex-shrink-0 ${openCityMenu ? 'rotate-180' : ''}`} />
                            </div>

                            {/* MOBILE CITY DROPDOWN */}
                            {openCityMenu && (
                                <>
                                    {/* Backdrop */}
                                    <div
                                        className="fixed inset-0 bg-black/30 z-40"
                                        onClick={() => setOpenCityMenu(false)}
                                    ></div>

                                    {/* Dropdown */}
                                    <div className="fixed left-0 right-0 top-[60px] bg-white shadow-2xl overflow-hidden border-t-2 border-[var(--color-primary)] z-50">
                                        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
                                            {/* CURRENT CITY */}
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-[var(--color-primary)] text-white px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-xs font-semibold rounded">
                                                        {selectedCity}
                                                    </div>
                                                    <span className="text-xs sm:text-xs text-gray-600">Properties</span>
                                                </div>
                                            </div>

                                            {/* NEARBY CITIES */}
                                            <div>
                                                <h3 className="font-bold text-gray-800 text-xs sm:text-xs mb-2">Nearby Cities</h3>
                                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                    {nearbyCities.map((city) => (
                                                        <Link
                                                            key={city}
                                                            to={cityLink(city)}
                                                            onClick={() => {
                                                                setSelectedCity(city);
                                                                setOpenCityMenu(false);
                                                            }}
                                                            className={`text-xs sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-colors ${city === selectedCity
                                                                ? 'bg-[var(--color-primary)] text-white font-bold'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-blue-50'
                                                                }`}
                                                        >
                                                            {city}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* POPULAR CITIES */}
                                            <div>
                                                <h3 className="font-bold text-gray-800 text-xs sm:text-xs mb-2">Popular Cities</h3>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-1.5">
                                                    {popularCities.map((city) => (
                                                        <Link
                                                            key={city}
                                                            to={cityLink(city)}
                                                            onClick={() => {
                                                                setSelectedCity(city);
                                                                setOpenCityMenu(false);
                                                            }}
                                                            className="text-xs sm:text-xs text-gray-700 hover:text-[var(--color-primary)] hover:underline truncate p-1"
                                                        >
                                                            {city}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* ALL OTHER CITIES */}
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="font-bold text-gray-800 text-xs sm:text-xs">All Cities</h3>
                                                    <span className="text-xs text-gray-500">A-Z</span>
                                                </div>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-1.5">
                                                    {allCities.map((city) => (
                                                        <Link
                                                            key={city}
                                                            to={cityLink(city)}
                                                            onClick={() => {
                                                                setSelectedCity(city);
                                                                setOpenCityMenu(false);
                                                            }}
                                                            className="text-xs text-gray-600 hover:text-[var(--color-primary)] hover:underline truncate p-1"
                                                        >
                                                            {city}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Mobile Post Property */}
                        <Link
                            to="/post-property"
                            className="bg-white text-[var(--color-primary)] font-bold px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-xs rounded-lg hover:bg-yellow-300 transition-all whitespace-nowrap shadow-md flex-shrink-0"
                        >
                            Post FREE
                        </Link>

                        {/* Mobile Menu Toggle (Moved to Right) */}
                        <button
                            className="lg:hidden text-white p-1 hover:bg-white/10 rounded transition-colors flex-shrink-0 ml-1"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>
                    </div>
                </div>

                {/* MOBILE MENU */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-white shadow-xl rounded-lg mt-3 p-4">
                        <div className="space-y-3">
                            {/* MB Prime Mobile */}
                            <Link
                                to="/mb-prime"
                                className="flex items-center gap-3 text-gray-800 hover:text-[var(--color-primary)] hover:bg-blue-50 py-2.5 px-3 rounded-lg transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <FaCrown className="text-lg flex-shrink-0" />
                                <span className="font-semibold text-xs">MB Prime</span>
                            </Link>

                            {/* Login/Signup Mobile */}
                            <Link
                                to="/auth/login"
                                className="flex items-center gap-3 text-gray-800 hover:text-[var(--color-primary)] hover:bg-blue-50 py-2.5 px-3 rounded-lg transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <FaUser className="text-lg flex-shrink-0" />
                                <span className="font-semibold text-xs">Login / Signup</span>
                            </Link>

                            {/* Divider */}
                            <div className="border-t border-gray-200 pt-3">
                                <h3 className="font-bold text-gray-800 text-xs mb-2 px-3">Quick Links</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <Link
                                        to="/buy"
                                        className="text-gray-700 hover:text-[var(--color-primary)] hover:bg-blue-50 text-xs p-3 bg-gray-50 rounded-lg transition-colors text-center font-medium"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Buy
                                    </Link>
                                    <Link
                                        to="/rent"
                                        className="text-gray-700 hover:text-[var(--color-primary)] hover:bg-blue-50 text-xs p-3 bg-gray-50 rounded-lg transition-colors text-center font-medium"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Rent
                                    </Link>
                                    <Link
                                        to="/commercial"
                                        className="text-gray-700 hover:text-[var(--color-primary)] hover:bg-blue-50 text-xs p-3 bg-gray-50 rounded-lg transition-colors text-center font-medium"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Commercial
                                    </Link>
                                    <Link
                                        to="/projects"
                                        className="text-gray-700 hover:text-[var(--color-primary)] hover:bg-blue-50 text-xs p-3 bg-gray-50 rounded-lg transition-colors text-center font-medium"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Projects
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopBar;