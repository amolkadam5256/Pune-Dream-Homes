import React, { useState, useEffect } from 'react';
import images from '../../../assets/images/images';
import { Phone, ArrowRight, Building2, MapPin, BadgePercent } from 'lucide-react';

const SPONSORED_PROPERTIES = [
    {
        id: 1,
        title: "Pancard Business Hub",
        location: "Baner, Pune",
        type: "Office Spaces",
        price: "₹ 1.33 Cr onwards",
        marketedBy: "Aaeshka Realtors LLP",
        initials: "AR",
        image: images.img
    },
    {
        id: 2,
        title: "Royal Palms Residency",
        location: "Koregaon Park, Pune",
        type: "Luxury 3BHK",
        price: "₹ 2.5 Cr onwards",
        marketedBy: "Empire Builders",
        initials: "EB",
        image: images.img
    },
    {
        id: 3,
        title: "Green Valley Phase II",
        location: "Wakad, Pune",
        type: "Modern Apartments",
        price: "₹ 85 Lakhs onwards",
        marketedBy: "Greenfield Group",
        initials: "GG",
        image: images.img
    }
];

const SponsoredCard = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % SPONSORED_PROPERTIES.length);
        }, 5000); // Cycle every 5 seconds

        return () => clearInterval(timer);
    }, []);

    const property = SPONSORED_PROPERTIES[currentIndex];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
            <div className="w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-xl flex flex-col md:flex-row group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:border-[var(--color-primary-light-1)] border border-[var(--color-primary-lightest)] relative animate-in fade-in duration-700">
                {/* Left Section - Image */}
                <div className="w-full md:w-[40%] relative overflow-hidden min-h-[220px]">
                    <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 z-10">
                        <span className="bg-white/95 backdrop-blur-md text-[var(--color-primary)] text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-md border border-[var(--color-primary-lightest)] flex items-center gap-1.5">
                            <BadgePercent className="w-3 h-3" />
                            Sponsored
                        </span>
                    </div>
                    {/* Overlay for hover effect */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>

                {/* Right Section - Content */}
                <div className="w-full md:w-[60%] p-5 md:p-6 flex flex-col justify-between relative bg-gradient-to-br from-white to-[var(--color-primary-lightest)]/20">
                    {/* Decorative background blur */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary-lightest)] rounded-full blur-3xl opacity-50 -z-10"></div>

                    <div className="key-frame-sync transition-all duration-500">
                        {/* Header */}
                        <div className="mb-4">
                            <h3 className="text-xl md:text-2xl font-bold text-[var(--color-dark)] leading-tight mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                                {property.title}
                            </h3>
                            <p className="text-[var(--color-neutral)] font-medium flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
                                {property.location}
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-4">
                            <div className="border-l-2 border-[var(--color-primary)] pl-3">
                                <p className="text-[var(--color-neutral)] text-[10px] uppercase tracking-wide mb-1 flex items-center gap-1">
                                    <Building2 className="w-3 h-3" /> Type
                                </p>
                                <p className="text-[var(--color-dark)] font-bold text-sm">{property.type}</p>
                            </div>
                            <div className="border-l-2 border-[var(--color-primary)] pl-3">
                                <p className="text-[var(--color-neutral)] text-[10px] uppercase tracking-wide mb-1 flex items-center gap-1">
                                    Price
                                </p>
                                <p className="text-[var(--color-dark)] font-bold text-sm">{property.price}</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer / Actions */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-[var(--color-primary-lightest)]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[var(--color-primary-lightest)] flex items-center justify-center text-[var(--color-primary)] font-bold text-sm shadow-inner">
                                {property.initials}
                            </div>
                            <div>
                                <p className="text-[10px] text-[var(--color-neutral)] uppercase tracking-wide">Marketed by</p>
                                <p className="text-xs font-bold text-[var(--color-dark)]">{property.marketedBy}</p>
                            </div>
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto">
                            <button className="flex-1 sm:flex-none bg-[var(--color-primary)] text-white font-bold text-xs py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-[var(--color-primary-dark-1)] transition-all duration-300 shadow-md hover:shadow-lg active:scale-95">
                                Contact Builder
                            </button>
                        </div>
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="absolute bottom-0 left-0 h-1 bg-[var(--color-primary-light-1)] transition-all duration-500" style={{ width: `${((currentIndex + 1) / SPONSORED_PROPERTIES.length) * 100}%` }}></div>
            </div>
        </div>
    );
};

export default SponsoredCard;
