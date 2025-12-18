import React, { useState, useEffect } from 'react'
import images from '../../../assets/images/images'

const MiniCarousel = () => {
    // Create an array of images from the imported object, repeating the available image
    const carouselImages = [images.img, images.img, images.img, images.img, images.img];

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
        <div className="hidden lg:block w-1/4 max-w-sm xl:max-w-md relative flex-shrink-0">
            {/* Carousel Container */}
            <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
                {/* Images */}
                {carouselImages.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute w-full h-full transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}

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
        </div>
    )
}

export default MiniCarousel