import React, { useState, useEffect } from "react";
import {
  Phone,
  ArrowRight,
  Building2,
  MapPin,
  BadgePercent,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Dummy data for sponsored properties
const DUMMY_PROPERTIES = [
  {
    id: 1,
    title: "Luxury Heights - Premium 3 BHK Apartments",
    location: "Koregaon Park, Pune",
    type: "3 BHK Apartment",
    price: "₹1.85 Cr",
    image:
      "https://images.unsplash.com/photo-1565402170291-8491f14678db?w=800&q=80",
    initials: "PB",
    marketedBy: "Premium Builders Pvt Ltd",
    featured: true,
  },
  {
    id: 2,
    title: "Tech Paradise - Modern IT Park Living",
    location: "Hinjewadi Phase 3, Pune",
    type: "2 BHK Apartment",
    price: "₹75 Lac - 1.2 Cr",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    initials: "SC",
    marketedBy: "Smart City Developers",
    featured: true,
  },
  {
    id: 3,
    title: "Skyline Residency - Ultra Luxury Penthouses",
    location: "Andheri West, Mumbai",
    type: "4 BHK Penthouse",
    price: "₹6.5 Cr",
    image:
      "https://images.unsplash.com/photo-1565402170291-8491f14678db?w=800&q=80",
    initials: "EC",
    marketedBy: "Elite Constructions Ltd",
    featured: true,
  },
];

const SponsoredCard = () => {
  const [properties, setProperties] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useDummyData, setUseDummyData] = useState(true); // Toggle for dummy data

  // Fetch properties from backend API or use dummy data
  useEffect(() => {
    const fetchProperties = async () => {
      // If using dummy data, skip API call
      if (useDummyData) {
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
          setProperties(DUMMY_PROPERTIES);
          setLoading(false);
        }, 500);
        return;
      }

      // Actual API call
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "http://localhost:5000/api/properties/sponsored"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data && result.data.length > 0) {
          setProperties(result.data);
        } else {
          setError("No sponsored properties available");
          // Fallback to dummy data on error
          setProperties(DUMMY_PROPERTIES);
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError(err.message || "Failed to load properties");
        // Fallback to dummy data on error
        setProperties(DUMMY_PROPERTIES);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [useDummyData]);

  // Auto-cycle through properties every 5 seconds
  useEffect(() => {
    if (properties.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % properties.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [properties.length]);

  // Manual navigation
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? properties.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % properties.length);
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div className="w-full max-w-4xl bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl h-64 animate-pulse flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-gray-600 font-medium">Loading properties...</p>
          </div>
        </div>
      </div>
    );
  }

  // No properties state (shouldn't happen with dummy data)
  if (properties.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div className="w-full max-w-4xl bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
          <div className="text-gray-400 text-5xl mb-4">🏢</div>
          <h3 className="text-gray-700 font-bold text-xl mb-2">
            No Properties Available
          </h3>
          <p className="text-gray-600">
            Check back later for sponsored properties
          </p>
        </div>
      </div>
    );
  }

  const property = properties[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8"
    >
      {/* Toggle for dummy data (development only) */}
      {process.env.NODE_ENV === "development" && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => setUseDummyData(!useDummyData)}
            className="text-xs bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 transition"
          >
            {useDummyData ? "🎭 Using Dummy Data" : "🌐 Using API Data"}
          </button>
        </div>
      )}

      <div className="w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-xl flex flex-col md:flex-row group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:border-[var(--color-primary-light-1)] border border-[var(--color-primary-lightest)] relative">
        {/* Left Section - Image */}
        <div className="w-full md:w-[40%] relative overflow-hidden min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={property.image}
              alt={property.title}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </AnimatePresence>
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-white/95 backdrop-blur-md text-[var(--color-primary)] text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-md border border-[var(--color-primary-lightest)] flex items-center gap-1.5">
              <BadgePercent className="w-3 h-3" />
              Sponsored
            </span>
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

          {/* Navigation Arrows */}
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Previous property"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Next property"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Section - Content */}
        <div className="w-full md:w-[60%] p-5 md:p-6 flex flex-col justify-between relative bg-gradient-to-br from-white to-[var(--color-primary-lightest)]/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary-lightest)] rounded-full blur-3xl opacity-50 -z-10"></div>

          <div className="key-frame-sync transition-all duration-500">
            <div className="mb-4">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--color-dark)] leading-tight mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                {property.title}
              </h3>
              <p className="text-[var(--color-neutral)] font-medium flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
                {property.location}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-4">
              <div className="border-l-2 border-[var(--color-primary)] pl-3">
                <p className="text-[var(--color-neutral)] text-[10px] uppercase tracking-wide mb-1 flex items-center gap-1">
                  <Building2 className="w-3 h-3" /> Type
                </p>
                <p className="text-[var(--color-dark)] font-bold text-sm">
                  {property.type}
                </p>
              </div>
              <div className="border-l-2 border-[var(--color-primary)] pl-3">
                <p className="text-[var(--color-neutral)] text-[10px] uppercase tracking-wide mb-1 flex items-center gap-1">
                  Price
                </p>
                <p className="text-[var(--color-dark)] font-bold text-sm">
                  {property.price}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-[var(--color-primary-lightest)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary-lightest)] flex items-center justify-center text-[var(--color-primary)] font-bold text-sm shadow-inner">
                {property.initials}
              </div>
              <div>
                <p className="text-[10px] text-[var(--color-neutral)] uppercase tracking-wide">
                  Marketed by
                </p>
                <p className="text-xs font-bold text-[var(--color-dark)]">
                  {property.marketedBy || property.marketed_by}
                </p>
              </div>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  alert(
                    `Contacting ${property.marketedBy} about ${property.title}`
                  );
                }}
                className="flex-1 sm:flex-none bg-[var(--color-primary)] text-white font-bold text-xs py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-[var(--color-primary-dark-1)] transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              >
                <Phone className="w-3 h-3" />
                Contact Builder
              </button>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-[var(--color-primary-light-1)] transition-all duration-500 ease-out"
          style={{
            width: `${((currentIndex + 1) / properties.length) * 100}%`,
          }}
        ></div>

        {/* Property Counter & Dots */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-md">
            {currentIndex + 1} / {properties.length}
          </div>
        </div>

        {/* Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {properties.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[var(--color-primary)] w-6"
                  : "bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Go to property ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SponsoredCard;
