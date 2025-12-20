import React, { useRef, useState, useEffect } from 'react';
import images from '../../../assets/images/images';
import { ArrowRight, ChevronLeft, ChevronRight, BadgeCheck, Building2, User, Award, Home, Key } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const initialAgents = [
    {
        id: 1,
        name: "Rajesh Malhotra",
        company: "Malhotra Realty Group",
        operatingSince: "2010",
        buyersServed: "1500+",
        saleCount: 45,
        rentCount: 120,
        operatesIn: "Baner, Hinjewadi, Wakad, Balewadi",
        saleRange: "₹ 80 L - ₹ 3.5 Cr",
        rentRange: "₹ 25k - ₹ 85k",
        image: images.img_10
    },
    {
        id: 2,
        name: "Priya Sharma",
        company: "Elegant Homes Pune",
        operatingSince: "2015",
        buyersServed: "850+",
        saleCount: 62,
        rentCount: 45,
        operatesIn: "Koregaon Park, Kalyani Nagar, Viman Nagar",
        saleRange: "₹ 1.2 Cr - ₹ 8 Cr",
        rentRange: "₹ 45k - ₹ 2.5 L",
        image: images.img_11
    },
    {
        id: 3,
        name: "Amit Deshmukh",
        company: "Deshmukh & Associates",
        operatingSince: "2008",
        buyersServed: "2200+",
        saleCount: 110,
        rentCount: 200,
        operatesIn: "Hadapsar, Kharadi, Magarpatta City",
        saleRange: "₹ 45 L - ₹ 1.8 Cr",
        rentRange: "₹ 15k - ₹ 55k",
        image: images.img_12
    },
    {
        id: 4,
        name: "Sneha Kulkarni",
        company: "Prime Properties",
        operatingSince: "2018",
        buyersServed: "400+",
        saleCount: 28,
        rentCount: 95,
        operatesIn: "Aundh, Pashan, Bavdhan",
        saleRange: "₹ 65 L - ₹ 2.2 Cr",
        rentRange: "₹ 20k - ₹ 65k",
        image: images.img_13
    },
    {
        id: 5,
        name: "Vikram Singh",
        company: "Luxury Living Pune",
        operatingSince: "2012",
        buyersServed: "1200+",
        saleCount: 75,
        rentCount: 30,
        operatesIn: "NIBM Road, Undri, Wanowrie",
        saleRange: "₹ 90 L - ₹ 5 Cr",
        rentRange: "₹ 35k - ₹ 1.2 L",
        image: images.img_14
    }
];

const AgentCard = () => {
    const scrollContainerRef = useRef(null);
    const [agents, setAgents] = useState(initialAgents);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3003/api';
                const response = await fetch(`${apiUrl}/agents`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();

                if (data && data.length > 0) {
                    // Map backend data to frontend structure
                    const formattedAgents = data.map(agent => ({
                        id: agent.id,
                        name: agent.name,
                        company: agent.company,
                        operatingSince: agent.operating_since,
                        buyersServed: agent.buyers_served,
                        saleCount: agent.sale_count,
                        rentCount: agent.rent_count,
                        operatesIn: agent.operates_in,
                        saleRange: agent.sale_range,
                        rentRange: agent.rent_range,
                        image: images.img
                    }));
                    setAgents(formattedAgents);
                }
            } catch (error) {
                console.error("Error fetching agents, using demo data:", error);
                // Keep the initialAgents in state on error
            }
        };

        fetchAgents();
    }, []);


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
        <section className="w-full py-2">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                {/* Header */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-dark)] flex items-center gap-2">
                            MB Preferred <span className="text-[var(--color-primary)]">Agents in Pune</span>
                        </h2>
                        <div className="w-20 h-1 bg-[var(--color-primary)] rounded-full mt-3"></div>
                    </div>
                    <Link to="/agents" className="group flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark-1)] transition-colors">
                        See all
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Carousel */}
                <div className="relative group/carousel">
                    {/* Left Navigation Button */}
                    <button
                        onClick={() => scroll('left')}
                        className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 bg-white p-3 rounded-full shadow-lg border border-gray-100 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Scroll Area */}
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-6 pb-2 snap-x snap-mandatory scrollbar-hide -mx-2 px-2"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {agents.map((agent, index) => (
                            <motion.div
                                key={agent.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -10 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="min-w-[280px] sm:min-w-[320px] md:min-w-[340px] snap-start"
                            >
                                <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 hover:border-[var(--color-primary-light-1)] transition-all duration-500 min-h-[380px] cursor-default flex flex-col">

                                    {/* --- Top Section: Image & Badge --- */}
                                    <div className="p-6 pb-0 flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-20 h-20 rounded-xl overflow-hidden shadow-md border-2 border-white ring-2 ring-gray-50 flex-shrink-0">
                                                <img src={agent.image} alt={agent.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-0.5 border border-white">
                                                <Award className="w-3 h-3" />
                                                <span>MB</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold tracking-wide uppercase text-[var(--color-primary)] bg-[var(--color-primary-lightest)] px-2 py-0.5 rounded mb-1 w-fit">
                                                MB Preferred
                                            </div>
                                            <h3 className="text-xl font-bold text-[var(--color-dark)] leading-tight mb-0.5">{agent.name}</h3>
                                            <p className="text-xs text-[var(--color-neutral)] font-medium truncate max-w-[180px]">{agent.company}</p>
                                        </div>
                                    </div>

                                    {/* --- Divider --- */}
                                    <div className="mx-6 my-4 border-b border-gray-100"></div>

                                    {/* --- Middle Section: Stats Grid --- */}
                                    <div className="px-6 grid grid-cols-2 gap-y-4 gap-x-4">
                                        <div>
                                            <p className="text-[10px] text-[var(--color-neutral)] uppercase tracking-wide mb-0.5">Operating Since</p>
                                            <p className="text-sm font-bold text-[var(--color-dark)]">{agent.operatingSince}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-[var(--color-neutral)] uppercase tracking-wide mb-0.5">Buyers Served</p>
                                            <p className="text-sm font-bold text-[var(--color-dark)]">{agent.buyersServed}</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5 mb-0.5 text-[var(--color-primary)]">
                                                <Home className="w-3.5 h-3.5" />
                                                <span className="text-lg font-bold">{agent.saleCount}</span>
                                            </div>
                                            <p className="text-[10px] text-[var(--color-neutral)]">Properties for Sale</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5 mb-0.5 text-[var(--color-neutral)]">
                                                <Key className="w-3.5 h-3.5" />
                                                <span className="text-lg font-bold">{agent.rentCount}</span>
                                            </div>
                                            <p className="text-[10px] text-[var(--color-neutral)]">Properties for Rent</p>
                                        </div>
                                    </div>

                                    {/* --- Bottom: Overlay Details (Revealed on Hover) --- */}
                                    <div className="absolute inset-0 bg-white/98 backdrop-blur-md flex flex-col p-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-10 pointer-events-none group-hover:pointer-events-auto">
                                        <div className="flex flex-col h-full">
                                            <div>
                                                <div className="mb-4">
                                                    <h4 className="text-lg font-bold text-[var(--color-dark)] mb-1">{agent.name}</h4>
                                                    <p className="text-xs font-semibold text-[var(--color-primary)]">{agent.company}</p>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <p className="text-[10px] text-[var(--color-neutral)] uppercase font-bold mb-1">Operates in</p>
                                                        <p className="text-xs text-[var(--color-dark)] leading-relaxed line-clamp-3">{agent.operatesIn}</p>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-2">
                                                        <div className="bg-blue-50 p-2 rounded">
                                                            <p className="text-[10px] text-[var(--color-neutral)] font-semibold">Sale Price Range</p>
                                                            <p className="text-xs font-bold text-[var(--color-primary)]">{agent.saleRange}</p>
                                                        </div>
                                                        {agent.rentRange !== "Not Available" && (
                                                            <div className="bg-green-50 p-2 rounded">
                                                                <p className="text-[10px] text-[var(--color-neutral)] font-semibold">Rent Price Range</p>
                                                                <p className="text-xs font-bold text-green-700">{agent.rentRange}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 mt-4">
                                                <button className="flex items-center justify-center gap-2 border border-[var(--color-primary)] text-[var(--color-primary)] text-xs font-bold py-2.5 rounded-lg hover:bg-[var(--color-primary-lightest)] transition-colors">
                                                    View Details
                                                </button>
                                                <button className="flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white text-xs font-bold py-2.5 rounded-lg hover:bg-[var(--color-primary-dark-1)] transition-colors shadow-lg shadow-blue-500/30">
                                                    View Properties
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Navigation Button */}
                    <button
                        onClick={() => scroll('right')}
                        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 bg-white p-3 rounded-full shadow-lg border border-gray-100 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default AgentCard;
