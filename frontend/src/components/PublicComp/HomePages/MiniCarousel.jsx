import React, { useState, useEffect } from 'react'
import images from '../../../assets/images/images'
import { motion, AnimatePresence } from 'framer-motion'

const MiniCarousel = () => {
    // Unique images for the carousel to make it look active and premium
    const carouselImages = [images.img_17, images.img_18, images.img_3, images.img_4, images.img_7];

    const [currentIndex, setCurrentIndex] = useState(0)

    // Auto-rotate carousel every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [carouselImages.length])

    const goToSlide = (index) => {
        setCurrentIndex(index)
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-[350px] lg:w-[450px] relative flex-shrink-0"
        >
            {/* Carousel Container */}
            <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-lg border border-white/20">
                {/* Images */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute w-full h-full"
                    >
                        <img
                            src={carouselImages[currentIndex]}
                            alt={`Slide ${currentIndex + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Indicators - 4 indicators as requested */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {[0, 1, 2, 3].map((index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'bg-white w-8'
                                : 'bg-white/50 hover:bg-white/75'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default MiniCarousel