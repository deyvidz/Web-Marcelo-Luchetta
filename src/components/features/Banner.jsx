import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';


export default function Banners({ banners = [], onImageLoad }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);
    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (banners.length ? (prev + 1) % banners.length : 0));
    }, [banners.length]);

    useEffect(() => {
        if (!isAutoPlaying) return;
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(nextSlide, 3000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = null;
        };
    }, [isAutoPlaying, nextSlide]);

    useEffect(() => {
        const intervalId = intervalRef.current;
        const timeoutId = timeoutRef.current;
        return () => {
            if (intervalId) clearInterval(intervalId);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    // Keep index in-range when banners array changes length or becomes empty
    useEffect(() => {
        setCurrentIndex((prev) => {
            if (!banners || banners.length === 0) return 0;
            return prev >= banners.length ? 0 : prev;
        });
    }, [banners]);


    const prevSlide = () => {
        if (!banners || banners.length === 0) return;
        setCurrentIndex((prev) =>
            prev === 0 ? banners.length - 1 : prev - 1
        );
        setIsAutoPlaying(false);
    };

    const goToSlide = (index) => {
        if (!banners || banners.length === 0) return;
        if (index < 0 || index >= banners.length) return;
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    };


    const currentBanner = banners[currentIndex] || {};
    return (
        <section className="md:w-full md:h-full h-96 object-cover relative">
            <Link to={`/productos?${currentBanner.filterType ? 'categoria' : 'marca'}=${currentBanner.name}`} className="block w-full h-full">
                <picture>
                    <source media="(min-width: 768px)" srcSet={currentBanner.imageUrl} />
                    <img
                        src={currentBanner.imageUrlMovile}
                        alt={currentBanner.alt}
                        onLoad={onImageLoad}
                        className='w-full h-full object-cover'
                    />
                </picture>
            </Link>

            {/* Flecha izquierda */}
            <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 bg-background/80 text-text w-4 md:w-8 md:h-8 h-4 rounded-full flex items-center justify-center transition-transform shadow-md z-30 cursor-pointer hover:scale-105"
                aria-label="Anterior"
            >
                <span className="text-xl">‹</span>
            </button>

            {/* Flecha derecha */}
            <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 bg-background/80 text-text w-4 h-4 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-transform shadow-md z-30 cursor-pointer hover:scale-105"
                aria-label="Siguiente"
            >
                <span className="text-xl">›</span>
            </button>




            {/* Indicadores de puntos */}
            <div className="flex absolute bottom-4/10 gap-2 mt-4 w-full justify-center ">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all cursor-pointer ${index === currentIndex
                            ? 'w-4 bg-accent h-1 rounded-full'
                            : 'w-1 bg-accent/30 h-1 rounded-full'
                            }`}
                        aria-label={`Ir al slide ${index + 1}`}
                    />
                ))}
            </div>

        </section>
    );
}