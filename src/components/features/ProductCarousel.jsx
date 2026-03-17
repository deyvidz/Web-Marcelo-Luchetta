import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart.js';
import { Icons } from '../../icons/IconLibrary.jsx';
import { formatPrice } from '../../utils/formatters.js';

export default function ProductCarousel({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (products.length ? (prev + 1) % products.length : 0));
  }, [products.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isAutoPlaying, nextSlide]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);


  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const handleAddToCart = () => {
    addToCart(products[currentIndex]);
    setJustAdded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setJustAdded(false), 2000);
  };



  const currentProduct = products[currentIndex];

  return (
    <div className="relative rounded-xl overflow-hidden shadow-2xs p-4 md:p-6 max-w-xl mx-auto">
      <div className="text-center mb-4">
        <div className="text-xs text-text-secondary  uppercase tracking-widest">PRODUCTOS DESTACADOS</div>
        <h2 className="text-2xl md:text-3xl text-text font-bold mt-1 h-12 md:h-14">
          {currentProduct.name}
        </h2>
      </div>

      {/* Contenedor principal */}
      <div className="flex flex-col items-center text-center">
        <div className="relative w-[320px] md:w-[600px] lg:w-[420px] rounded-lg shadow-lg overflow-hidden h-64 lg:h-80">
          <Link to={`/productos/${currentProduct.id}`} className="block w-full h-full">
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </Link>

          {/* Badge de categoría */}
          <div className="absolute top-4 right-4 backdrop-blur-md bg-surface/70 text-text px-3 py-1 rounded-full text-sm font-semibold shadow-sm border border-border/40">
            {currentProduct.category}
          </div>
        </div>

        {/* Flecha izquierda */}
        <button
          onClick={prevSlide}
          className="absolute left-3 md:top-3/7 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-text w-8 h-8 rounded-full flex items-center justify-center transition-transform shadow-md z-30 cursor-pointer hover:scale-105"
          aria-label="Anterior"
        >
          <span className="text-xl">‹</span>
        </button>

        {/* Flecha derecha */}
        <button
          onClick={nextSlide}
          className="absolute right-3 md:top-3/7 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-text w-8 h-8 rounded-full flex items-center justify-center transition-transform shadow-md z-30 cursor-pointer hover:scale-105"
          aria-label="Siguiente"
        >
          <span className="text-xl">›</span>
        </button>

        {/* Descripción */}
        <p className="text-base md:text-lg text-text-secondary leading-relaxed mt-4 max-w-2xl h-15 md:h-20 lg:h-10 overflow-hidden">
          {currentProduct.description}
        </p>

        {/* Precio */}
        <div className="mt-3 h-5 pb-2 flex items-center justify-center">
          <span className="text-lg md:text-xl text-text font-bold">
            {formatPrice(currentProduct.price)}
          </span>
        </div>

        {/* Botones */}
        <div className="mt-2 h-10 flex items-center gap-3 justify-center">
          <button
            onClick={handleAddToCart}
            className={`font-bold py-2 px-4 rounded-md transition-all shadow-sm text-sm ${justAdded
              ? 'bg-green-500 text-white'
              : 'bg-primary text-white hover:opacity-90'
              }`}
          >
            {justAdded ? '✓ Agregado al Carrito' : 'Comprar Ahora'}
          </button>

          <Link
            to={`/productos/${currentProduct.id}`}
            className="border-2 border-primary text-primary font-semibold py-2 px-4 rounded-md text-sm transition-all hover:bg-primary/10"
          >
            Más Información
          </Link>
        </div>

        {/* Indicadores de puntos */}
        <div className="flex gap-2 pt-4">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all ${index === currentIndex
                ? 'w-8 bg-point h-2 rounded-full'
                : 'w-2 bg-point/30 h-2 rounded-full'
                }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}