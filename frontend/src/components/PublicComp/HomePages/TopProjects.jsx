import React, { useRef, useState } from 'react';
import images from '../../../assets/images/images';
import { ArrowRight, MapPin, Building2, ChevronLeft, ChevronRight, Home, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TopProjects = () => {
    const scrollContainerRef = useRef(null);

    const projects = [
        {
            id: 1,
            title: "Amanora Gateway Towers 2",
            builder: "Amanora Park Town",
            location: "Amanora Park Town, Pune",
            config: "2, 3, 4 BHK Flats",
            price: "₹ 2.17 Cr onwards",
            marketedBy: "Amanora Park Town",
            image: images.img_13,
            isRera: true
        },
        {
            id: 2,
            title: "Altamira by VTP Luxe",
            builder: "VTP Realty",
            location: "Wagholi, Pune",
            config: "3 BHK Flats",
            price: "₹ 1.30 Cr onwards",
            marketedBy: "Hind Realty",
            image: images.img_14,
            isRera: true
        },
        {
            id: 3,
            title: "Lodha Estilo",
            builder: "Lodha",
            location: "Kharadi, Pune",
            config: "2, 3, 4 BHK Flats",
            price: "₹ 2.34 Cr onwards",
            marketedBy: "Hind Realty",
            image: images.img_15,
            isRera: true
        },
        {
            id: 4,
            title: "Pride World City",
            builder: "Pride Group",
            location: "Charholi, Pune",
            config: "1, 2, 3 BHK Flats",
            price: "₹ 45 L onwards",
            marketedBy: "Pride Group",
            image: images.img_16,
            isRera: true
        }
    ];

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 350;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="w-full py-10 bg-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4"
            >
                {/* Header */}
                <div className="flex justify-between items-end mb-8 border-b pb-4 border-[var(--color-primary-lightest)]">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-dark)] flex items-center gap-2">
                            Top <span className="text-[var(--color-primary)]">Projects</span>
                        </h2>
                        <div className="w-20 h-1 bg-[var(--color-primary)] rounded-full mt-3"></div>
                    </div>
                    <Link to="/projects" className="group flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark-1)] transition-all">
                        See all Projects
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Carousel Container */}
                <div className="relative group/carousel">
                    {/* Left Navigation Button */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-3 rounded-full shadow-xl border border-[var(--color-primary-lightest)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Cards Scroll Area */}
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide -mx-2 px-2"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="min-w-[300px] md:min-w-[340px] snap-start"
                            >
                                <div className="group/card bg-white rounded-2xl overflow-hidden shadow-lg border border-[var(--color-primary-lightest)] hover:shadow-2xl hover:border-[var(--color-primary-light-1)] transition-all duration-500 flex flex-col h-full">

                                    {/* Image Section */}
                                    <div className="relative h-52 overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>

                                        {/* Status Badge */}
                                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-lg text-[10px] font-bold text-[var(--color-primary)] border border-white/20 uppercase tracking-wider">
                                            {project.isRera ? 'RERA Registered' : 'New Launch'}
                                        </div>

                                        {/* Builder/Marketed By Logo Overlay (Small) */}
                                        <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1.5 shadow-lg">
                                                <Building2 className="w-full h-full text-[var(--color-primary)]" />
                                            </div>
                                            <span className="text-white text-xs font-bold drop-shadow-md truncate max-w-[150px]">
                                                {project.builder}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-6 flex flex-col flex-grow justify-between relative bg-white">
                                        {/* Decorative Blur */}
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-primary-lightest)] rounded-full blur-3xl opacity-30 -z-10"></div>

                                        <div>
                                            <h3 className="text-xl font-bold text-[var(--color-dark)] group-hover/card:text-[var(--color-primary)] transition-colors mb-2 line-clamp-1">
                                                {project.title}
                                            </h3>

                                            <div className="flex items-center gap-1.5 text-[var(--color-neutral)] text-sm mb-4">
                                                <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                                                <span className="truncate">{project.location}</span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] text-[var(--color-neutral)] uppercase tracking-wider font-bold">Configuration</p>
                                                    <div className="flex items-center gap-1.5 text-[var(--color-dark)] font-bold text-xs">
                                                        <Home className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                                                        {project.config}
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] text-[var(--color-neutral)] uppercase tracking-wider font-bold">Starting Price</p>
                                                    <p className="text-[var(--color-primary)] font-bold text-sm tracking-tight">{project.price}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="pt-4 border-t border-[var(--color-primary-lightest)] flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <p className="text-[9px] text-[var(--color-neutral)] uppercase tracking-tight">Marketed By</p>
                                                <p className="text-[11px] font-bold text-[var(--color-dark)] truncate max-w-[100px]">{project.marketedBy}</p>
                                            </div>
                                            <button className="bg-[var(--color-primary)] text-white text-[11px] font-bold py-2.5 px-5 rounded-xl shadow-lg hover:bg-[var(--color-primary-dark-1)] transition-all hover:scale-105 active:scale-95">
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
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-3 rounded-full shadow-xl border border-[var(--color-primary-lightest)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default TopProjects;
