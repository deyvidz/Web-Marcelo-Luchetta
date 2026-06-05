import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

// Tiempo en ms que el autoplay queda pausado tras una interacción del usuario,
// antes de reanudar automáticamente.
const RESUME_DELAY_MS = 5000;

export default function Banners({ banners = [], onImageLoad }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);
    const resumeTimeoutRef = useRef(null);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (banners.length ? (prev + 1) % banners.length : 0));
    }, [banners.length]);

    // Pausa el autoplay y programa un reinicio tras RESUME_DELAY_MS.
    // Se llama desde cualquier interacción del usuario con el carrusel (flecha o punto).
    const pauseAndScheduleResume = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (resumeTimeoutRef.current) {
            clearTimeout(resumeTimeoutRef.current);
        }
        resumeTimeoutRef.current = setTimeout(() => {
            resumeTimeoutRef.current = null;
            // Forzamos re-render para que el useEffect de abajo remonte el interval.
            setTick((t) => t + 1);
        }, RESUME_DELAY_MS);
    }, []);

    // Contador interno usado sólo para disparar el effect de autoplay tras la pausa.
    const [tick, setTick] = useState(0);

    // Effect: mantiene el autoplay corriendo. Se reinicia tras cada interacción
    // (gracias al `tick` que cambia en pauseAndScheduleResume) o al montar.
    useEffect(() => {
        if (!banners || banners.length <= 1) return;
        intervalRef.current = setInterval(nextSlide, 3000);
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nextSlide, tick]);

    // Limpia timeouts al desmontar.
    useEffect(() => {
        return () => {
            if (resumeTimeoutRef.current) {
                clearTimeout(resumeTimeoutRef.current);
            }
        };
    }, []);

    // Keep index in-range when banners array changes length or becomes empty.
    useEffect(() => {
        setCurrentIndex((prev) => {
            if (!banners || banners.length === 0) return 0;
            return prev >= banners.length ? 0 : prev;
        });
    }, [banners]);

    // Handlers públicos. Cada uno: navega Y pausa el autoplay (que se reanudará solo).
    const prevSlide = () => {
        if (!banners || banners.length === 0) return;
        setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
        pauseAndScheduleResume();
    };

    const goToSlide = (index) => {
        if (!banners || banners.length === 0) return;
        if (index < 0 || index >= banners.length) return;
        setCurrentIndex(index);
        pauseAndScheduleResume();
    };

    const currentBanner = banners[currentIndex] || {};

    // Estilo común: zona de la flecha. La zona es angosta (w-16 ~ 64px) para
    // capturar el target táctil sin comerse gran parte del Link. El círculo
    // visible va dentro de la zona. z-30 garantiza que esté sobre el CardList
    // superpuesto que viene después en el DOM de Home.jsx.
    const arrowZone = (side, onClick) => (
        <button
            onClick={onClick}
            aria-label={side === 'left' ? 'Anterior' : 'Siguiente'}
            className={`absolute top-0 ${side === 'left' ? 'left-0' : 'right-0'} h-full w-16 z-30 flex items-center ${side === 'left' ? 'justify-start pl-3 md:pl-4' : 'justify-end pr-3 md:pr-4'} cursor-pointer group`}
        >
            <span className="bg-background/80 text-text w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-transform shadow-md group-hover:scale-110">
                <span className="text-xl leading-none">{side === 'left' ? '‹' : '›'}</span>
            </span>
        </button>
    );

    return (
        <section
            className="md:w-full md:h-full h-96 object-cover relative"
        >
            <Link
                to={currentBanner.name ? `/productos?marca=${encodeURIComponent(currentBanner.name)}` : '/productos'}
                className="block w-full h-full"
            >
                <picture>
                    <source media="(min-width: 768px)" srcSet={currentBanner.imageUrl} />
                    <img
                        src={currentBanner.imageUrlMovile}
                        alt={currentBanner.alt}
                        onLoad={onImageLoad}
                        className="w-full h-full object-cover"
                    />
                </picture>
            </Link>

            {arrowZone('left', prevSlide)}
            {arrowZone('right', nextSlide)}

            {/* Indicadores de puntos */}
            <div className="flex absolute bottom-4/10 gap-2 mt-4 w-full justify-center z-30">
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
