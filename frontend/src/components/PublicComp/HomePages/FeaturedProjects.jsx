import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Building, Home, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import images from '../../../assets/images/images';

// Placeholder for database data
const initialProject = [
    {
        id: 1,
        title: "Saniket WYCE Exclucity",
        builder: "Saniket Construction",
        location: "Bavdhan, Pune",
        marketedBy: "Wyce Corp",
        config: "2, 3, 4, 5 BHK Flats",
        price: "₹1.10 Cr onwards",
        image: images.img_10,
        logo: images.logo // Using a placeholder or generic logo
    },
    {
        id: 2,
        title: "Saniket WYCE Exclucity",
        builder: "Saniket Construction",
        location: "Bavdhan, Pune",
        marketedBy: "Wyce Corp",
        config: "2, 3, 4, 5 BHK Flats",
        price: "₹1.10 Cr onwards",
        image: images.img_12,
        logo: images.logo // Using a placeholder or generic logo
    },
    {
        id: 3,
        title: "Saniket WYCE Exclucity",
        builder: "Saniket Construction",
        location: "Bavdhan, Pune",
        marketedBy: "Wyce Corp",
        config: "2, 3, 4, 5 BHK Flats",
        price: "₹1.10 Cr onwards",
        image: images.img_14,
        logo: images.logo // Using a placeholder or generic logo
    },
];

const FeaturedProjects = () => {
    // State to simulate data fetching from MongoDB/MySQL
    const [projects, setProjects] = useState(initialProject);

    useEffect(() => {
        // TODO: Replace with actual API call to your backend (Node/Express + MongoDB/MySQL)
        // fetch('/api/featured-project')
        //     .then(res => res.json())
        //     .then(data => setProjects(data));
    }, []);

    if (!projects || projects.length === 0) return null;

    return (
        <section className="w-full py-12 bg-gray-50/50">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                {/* Header */}
                <div className="flex justify-between items-end mb-8 border-b pb-4 border-[var(--color-primary-lightest)]">
                    <div>
                        <h2 className="text-2xl md:text-2xl font-bold text-[var(--color-dark)]">
                            Featured <span className="text-[var(--color-primary)]">Projects</span>
                        </h2>
                        <div className="w-20 h-1.5 bg-[var(--color-primary)] rounded-full mt-2"></div>
                    </div>
                    <Link to="/projects" className="group flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark-1)] transition-all">
                        See all Projects
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {projects.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="group/featured relative w-full bg-white rounded-xl overflow-hidden shadow-md border border-[var(--color-primary-lightest)] hover:shadow-xl hover:border-[var(--color-primary-light-1)] transition-all duration-300 flex flex-col"
                        >

                            {/* Image Section */}
                            <div className="w-full h-56 md:h-64 relative overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/featured:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/5 group-hover/featured:bg-black/0 transition-colors duration-300"></div>

                                {/* Marketed By Badge */}
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg text-[10px] font-bold text-[var(--color-primary)] border border-[var(--color-primary-lightest)] uppercase tracking-wider">
                                    Marketed by {item.marketedBy}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="w-full p-6 bg-white relative">
                                {/* Decorative Blur */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary-lightest)] rounded-full blur-3xl opacity-40 -z-10"></div>

                                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">

                                    {/* Col 1: Icon/Logo Placeholder */}
                                    <div className="hidden md:flex md:col-span-2 justify-start">
                                        <div className="w-16 h-16 bg-[var(--color-primary-lightest)] border border-[var(--color-primary-lightest)] rounded-xl flex items-center justify-center p-3 shadow-inner">
                                            <Building className="w-full h-full text-[var(--color-primary)]" />
                                        </div>
                                    </div>

                                    {/* Col 2: Project Info */}
                                    <div className="md:col-span-6 space-y-2">
                                        <h3 className="text-xl font-bold text-[var(--color-dark)] leading-tight group-hover/featured:text-[var(--color-primary)] transition-colors">
                                            {item.title}
                                        </h3>

                                        <p className="text-sm text-[var(--color-neutral)] font-medium">
                                            by <span className="text-[var(--color-dark)] font-semibold">{item.builder}</span>
                                        </p>

                                        <div className="flex flex-wrap items-center gap-3 text-xs mt-3">
                                            <span className="bg-green-50 text-green-600 font-bold px-2 py-1 rounded border border-green-100 uppercase tracking-tighter">
                                                RERA Reg.
                                            </span>
                                            <div className="flex items-center gap-1.5 text-[var(--color-neutral)] font-medium">
                                                <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                                                {item.location}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Col 3: Config & Price */}
                                    <div className="md:col-span-4 flex flex-col justify-between items-start md:items-end gap-4 relative overflow-hidden h-full min-h-[80px]">
                                        <div className="text-left md:text-right">
                                            <p className="text-sm font-bold text-[var(--color-dark)] mb-1 flex items-center gap-1.5 md:justify-end">
                                                <Home className="w-3.5 h-3.5 text-[var(--color-primary)]" /> {item.config}
                                            </p>
                                            <p className="text-sm font-black text-[var(--color-primary)]">{item.price}</p>
                                        </div>
                                        <button className="w-full bg-[var(--color-primary)] text-white text-xs font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-[var(--color-primary-dark-1)] transition-all duration-500 opacity-0 translate-y-4 group-hover/featured:opacity-100 group-hover/featured:translate-y-0 uppercase tracking-wide">
                                            View Details
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default FeaturedProjects;
