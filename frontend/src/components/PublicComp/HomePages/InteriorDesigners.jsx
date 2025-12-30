import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const InteriorDesigners = () => {
    return (
        <section
            className="w-full px-4 md:px-8 py-16 relative overflow-hidden">
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 " />

            <div className="max-w-7xl mx-auto relative z-10 p-5 rounded-xl " style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&h=600&fit=crop')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'scroll',
            }} >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-top">
                    {/* Left Side - Text Overlay */}
                    <div className="text-white space-y-3 pt-4 sm:pt-20">
                        <div>
                            <p className="text-lg font-semibold opacity-90">Transform your Home with</p>
                            <h2 className="text-5xl md:text-6xl font-bold mt-2" style={{ color: 'var(--color-primary)' }}>magicInteriors</h2>
                        </div>
                        <p className="text-lg opacity-90 max-w-md">
                            Transform your living space with premium interior design solutions tailored to your style and budget.
                        </p>
                    </div>

                    {/* Right Side - Content Card */}
                    <div className="space-y-6">
                        {/* Info Box */}
                        <div className="relative bg-white rounded-3xl p-6 shadow-2xl space-y-6 backdrop-blur-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Why choose us?</h3>

                            {/* Benefit 1 */}
                            <div className="flex items-start gap-3 mb-2">
                                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'var(--color-primary-light-1)' }} />
                                <p className="text-gray-700">
                                    <span className="font-semibold text-gray-900">Compare & choose from</span>
                                    <span className="font-bold" style={{ color: 'var(--color-primary)' }}> 300+ top verified interior brands</span>
                                </p>
                            </div>

                            {/* Benefit 2 */}
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'var(--color-primary-light-1)' }} />
                                <p className="text-gray-700">
                                    <span className="font-semibold text-gray-900">Calculate your interiors cost instantly</span>
                                    <span className="font-bold" style={{ color: 'var(--color-primary)' }}> with our advanced estimator</span>
                                </p>
                            </div>
                        </div>

                        {/* Savings Badge */}
                        <div className="flex items-center gap-2 rounded-lg px-4 py-0 w-fit">
                            <span className="text-black font-bold px-2 py-2 rounded text-xs" style={{ backgroundColor: 'var(--color-primary-light-2)' }}>Save up to 40%</span>
                        </div>

                        {/* Brand Logos */}
                        <div className="border-t pt-2">
                            <p className="text-xs text-gray-600 mb-3 font-semibold"><span className="font-semibold text-sm" style={{ color: 'var(--color-primary)' }}>Top Brands : </span>
                                TRUSTED BY</p>
                            <div className="relative overflow-hidden">
                                <motion.div
                                    className="flex items-center gap-3 pb-2 cursor-grab active:cursor-grabbing"
                                    initial={{ x: 0 }}
                                    animate={{ x: -600 }}
                                    transition={{
                                        duration: 20,
                                        ease: "linear",
                                        repeat: Infinity,
                                        repeatType: "loop"
                                    }}
                                    drag="x"
                                    dragElastic={0.1}
                                    dragMomentum={true}
                                    onDragEnd={() => {
                                        // Animation continues automatically after drag
                                    }}
                                >
                                    {/* Placeholder brand logos - Duplicated for infinite scroll */}
                                    {[...Array(2)].map((_, iteration) => (
                                        <React.Fragment key={iteration}>
                                            <div className="flex-shrink-0 h-8 rounded px-3 flex items-center text-xs font-bold text-white" style={{ backgroundImage: `linear-gradient(to right, var(--color-primary-light-1), var(--color-primary))` }}>
                                                Brand 1
                                            </div>
                                            <div className="flex-shrink-0 h-8 rounded px-3 flex items-center text-xs font-bold text-white" style={{ backgroundImage: `linear-gradient(to right, var(--color-primary-light-1), var(--color-primary))` }}>
                                                Brand 2
                                            </div>
                                            <div className="flex-shrink-0 h-8 rounded px-3 flex items-center text-xs font-bold text-white" style={{ backgroundImage: `linear-gradient(to right, var(--color-primary-light-1), var(--color-primary))` }}>
                                                Brand 3
                                            </div>
                                            <div className="flex-shrink-0 h-8 rounded px-3 flex items-center text-xs font-bold text-white" style={{ backgroundImage: `linear-gradient(to right, var(--color-primary-light-1), var(--color-primary))` }}>
                                                Brand 4
                                            </div>
                                            <div className="flex-shrink-0 h-8 rounded px-3 flex items-center text-xs font-bold text-white" style={{ backgroundImage: `linear-gradient(to right, var(--color-primary-light-1), var(--color-primary))` }}>
                                                Brand 5
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 pt-2">
                            <button className="px-8 py-3 text-white font-bold rounded-full transition-all hover:shadow-xl" style={{ backgroundColor: 'var(--color-primary)', boxShadow: '0 10px 25px rgba(34, 98, 178, 0.2)' }}>
                                Interior Designers
                            </button>
                            <button className="px-8 py-3 font-bold rounded-full transition-colors" style={{ border: `2px solid var(--color-primary)`, color: 'var(--color-primary)', backgroundColor: 'transparent' }} onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-primary-lightest)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                                Get Instant Quote
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InteriorDesigners;
