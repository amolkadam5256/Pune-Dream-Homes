import React, { useRef } from 'react';
import images from '../../../assets/images/images';
import { ArrowRight, MapPin, Camera, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const OwnerPropertyCard = () => {
    const scrollContainerRef = useRef(null);

    const properties = [
        { id: 1, title: "2 BHK Flat", price: "₹60 Lac", area: "950 sqft", location: "Handewadi Road, Pune", status: "Ready to Move", photosCount: 14, image: images.img },
        { id: 2, title: "2 BHK Flat", price: "₹45 Lac", area: "787 sqft", location: "Pune", status: "Ready to Move", photosCount: 4, image: images.img2 },
        { id: 3, title: "1 BHK Flat", price: "₹29.5 Lac", area: "550 sqft", location: "Narhe, Pune", status: "Ready to Move", photosCount: 31, image: images.img_3 },
        { id: 4, title: "2 BHK Flat", price: "₹75 Lac", area: "950 sqft", location: "Katraj, Pune", status: "Ready to Move", photosCount: 12, image: images.img_4 },
        { id: 5, title: "3 BHK Flat", price: "₹1.25 Cr", area: "1305 sqft", location: "Wadachi Wadi, Undri, Pune", status: "Ready to Move", photosCount: 56, image: images.img_5 },
        { id: 6, title: "2 BHK Flat", price: "₹79 Lac", area: "1100 sqft", location: "Manjri, Manjri Budruk, Pune", status: "Ready to Move", photosCount: 3, image: images.img_6 },
        { id: 7, title: "2 BHK Flat", price: "₹80 Lac", area: "950 sqft", location: "Katraj, Pune", status: "Ready to Move", photosCount: 18, image: images.img_7 },
        { id: 8, title: "3 BHK Flat", price: "₹1.20 Cr", area: "1407 sqft", location: "Yewalewadi, Pune", status: "Ready to Move", photosCount: 17, image: images.img_8 },
        { id: 9, title: "2 BHK Flat", price: "₹65 Lac", area: "1000 sqft", location: "Wagholi, Pune", status: "Ready to Move", photosCount: 9, image: images.img_9 },
        { id: 10, title: "1 BHK Flat", price: "₹35 Lac", area: "600 sqft", location: "Hadapsar, Pune", status: "Ready to Move", photosCount: 6, image: images.img_10 },
        { id: 11, title: "3 BHK Flat", price: "₹1.15 Cr", area: "1350 sqft", location: "Baner, Pune", status: "Ready to Move", photosCount: 22, image: images.img_11 },
        { id: 12, title: "2 BHK Flat", price: "₹55 Lac", area: "900 sqft", location: "Dhanori, Pune", status: "Ready to Move", photosCount: 8, image: images.img_12 },
    ];

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 350; // Approx card width (340px) + gap (24px)
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="w-full py-8 bg-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                {/* Header */}
                <div className="flex justify-between items-end mb-6 border-b pb-3 border-[var(--color-primary-lightest)]">
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--color-dark)]">
                            Popular <span className="text-[var(--color-primary)]">Owner Properties</span>
                        </h2>
                        <div className="w-16 h-1 bg-[var(--color-primary)] rounded-full mt-2"></div>
                    </div>
                    <Link to="/properties" className="group flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark-1)] transition-colors">
                        See all Properties
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Carousel Container */}
                <div className="relative group">
                    {/* Left Navigation Button */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-2 rounded-full shadow-lg border border-[var(--color-primary-lightest)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Cards Scroll Area */}
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide -mx-2 px-2"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // For Firefox and IE/Edge
                    >
                        {properties.map((property, index) => (
                            <motion.div
                                key={property.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="min-w-[300px] md:min-w-[340px] snap-start"
                            >
                                <div className="group/owner bg-white rounded-xl overflow-hidden shadow-lg border border-[var(--color-primary-lightest)] hover:shadow-2xl hover:border-[var(--color-primary-light-1)] transition-all duration-300 relative h-full flex flex-col">

                                    {/* Image Section */}
                                    <div className="relative h-56 flex-shrink-0 overflow-hidden">
                                        <img
                                            src={property.image}
                                            alt={property.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/owner:scale-110"
                                        />
                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

                                        {/* Photo Count Badge */}
                                        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                                            <Camera className="w-3 h-3" />
                                            {property.photosCount}
                                        </div>

                                        {/* Like Button */}
                                        <button className="absolute top-3 right-3 p-1.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-colors">
                                            <Heart className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-5 flex flex-col flex-grow justify-between">
                                        <div>
                                            {/* Title & Price */}
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-lg font-bold text-[var(--color-dark)] group-hover:text-[var(--color-primary)] transition-colors">
                                                        {property.title}
                                                    </h3>
                                                    <p className="text-xs text-[var(--color-neutral)] font-medium line-clamp-1" title={`in ${property.location} `}>
                                                        in {property.location}
                                                    </p>
                                                </div>
                                                <div className="text-right whitespace-nowrap ml-2">
                                                    <p className="text-lg font-bold text-[var(--color-primary)]">
                                                        {property.price}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Details Row */}
                                            <div className="flex items-center gap-3 text-sm text-[var(--color-dark)] font-medium mb-4">
                                                <span className="bg-gray-100 px-2 py-1 rounded text-xs text-[var(--color-neutral)]">
                                                    {property.area}
                                                </span>
                                                <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs border border-green-100">
                                                    {property.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Footer / Action */}
                                        <div className="border-t border-[var(--color-primary-lightest)] pt-4 flex justify-between items-center mt-2">
                                            <div className="flex items-center gap-1 text-[var(--color-neutral)] text-xs truncate max-w-[60%]">
                                                <MapPin className="w-3 h-3 flex-shrink-0" />
                                                <span className="truncate">{property.location.split(',')[0]}</span>
                                            </div>

                                            <button className="bg-[var(--color-primary)] text-white text-xs font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-[var(--color-primary-dark-1)] transition-all duration-500 flex-shrink-0 opacity-0 translate-y-4 group-hover/owner:opacity-100 group-hover/owner:translate-y-0">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Navigation Button */}
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-2 rounded-full shadow-lg border border-[var(--color-primary-lightest)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default OwnerPropertyCard;
