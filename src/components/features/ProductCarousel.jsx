import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../../icons/IconLibrary.jsx';
import { formatPrice } from '../../utils/formatters.js';

export default function ProductCarousel({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (products.length ? (prev + 1) % products.length : 0));
  }, [products.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 10000);
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




  const currentProduct = products[currentIndex];

  return (
    <div className=" p-4 md:p-6 w-full ">

        <h2 className="text-xs text-text-secondary text-center  uppercase tracking-widest md:text-xl">PRODUCTOS DESTACADOS</h2>
        
      {/* Contenedor principal */}
      <div className="flex flex-col md:flex-row gap-7 lg:gap-25 items-center justify-center border border-text/30 rounded-lg p-6 bg-backgroundb">
        <h2 className="text-2xl text-primary font-bold mt-1 md:hidden">
          {currentProduct.name}
        </h2>
        <div className="relative w-full lg:w-200  rounded-lg shadow-lg overflow-hidden h-64 lg:h-100">
          <Link to={`/productos/${currentProduct.id}`} className="block w-full h-full">
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="w-full aspect-4/3 h-full object-cover rounded-sm"
            />
          </Link>

          {/* Badge de categoría */}
          <div className="absolute top-4 right-4 bg-backgroundb/80 text-accent px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
            {currentProduct.category}
          </div>

          {/* Flecha izquierda */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 bg-white/80 text-text w-8 h-8 rounded-full flex items-center justify-center transition-transform shadow-md z-30 cursor-pointer hover:scale-105"
            aria-label="Anterior"
          >
            <span className="text-xl">‹</span>
          </button>

          {/* Flecha derecha */}
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 bg-white/80 text-text w-8 h-8 rounded-full flex items-center justify-center transition-transform shadow-md z-30 cursor-pointer hover:scale-105"
            aria-label="Siguiente"
          >
            <span className="text-xl">›</span>
          </button>
        </div>


        <div className=" flex flex-col items-center gap-5 text-center md:items-start md:text-left">


          <h2 className="hidden md:block text-4xl lg:text-5xl text-primary font-bold max-w-lg mb-2">{currentProduct.name}</h2>
          {/* Descripción */}
          <p className="text-lg md:text-xl text-text mb-6 max-w-lg">
            {currentProduct.description}
          </p>

          {/* Precio */}

          <span className="text-2xl md:text-3xl text-primary mb-8 font-bold">
            {formatPrice(currentProduct.price)}
          </span>


          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href={`https://wa.me/1152498558?text=Hola, estoy interesado en el producto "${currentProduct.name}" y me gustaría saber si tiene stock disponible.`} target="_blank" rel="noopener noreferrer" className="group bg-primary border border-accent text-white p-4 rounded-2xl cursor-pointer flex items-center justify-center hover:bg-primary/80 duration-200">
              <Icons.Whatsapp className="w-5 h-5 mr-1 group-hover:rotate-12 duration-200 fill-white" /> Comprar Ahora
            </a>

            <Link
              to={`/productos/${currentProduct.id}`}
              className="flex items-center justify-center border border-primary text-primary font-semibold py-3 px-5 rounded-2xl text-sm transition-all bg-white hover:bg-gray/70 "
            >
              Más Información
            </Link>
          </div>
        </div>
      </div>
      {/* Indicadores de puntos */}
      <div className="flex gap-2 mt-4 w-full justify-center ">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all cursor-pointer ${index === currentIndex
              ? 'w-8 bg-accent h-2 rounded-full'
              : 'w-2 bg-accent/30 h-2 rounded-full'
              }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
}