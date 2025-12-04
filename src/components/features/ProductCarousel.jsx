import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { Icons } from '../../icons/IconLibrary';
export default function ProductCarousel({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);



  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const handleAddToCart = () => {
    addToCart(products[currentIndex]);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const currentProduct = products[currentIndex];

  return (
    <div className="relative bg-linear-to-r from-blue-400 to-blue-500 rounded-2xl overflow-hidden shadow-2xl">
      {/* Contenido del slide */}
      <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center min-h-[500px]">

        {/* Columna izquierda: Imagen */}
        <div className="relative z-10 ">
          <Link
            to={`/productos/${currentProduct.id}`}>
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="w-full h-[400px] object-cover rounded-2xl shadow-2xl" />
          </Link>
          {/* Badge de categoría */}
          <div className="absolute top-4 right-4 backdrop-blur-md bg-white/70 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold shadow-sm border border-white/40">
            {currentProduct.category}
          </div>
        </div>

        {/* Columna Derecha: Información */}
        <div className="text-white space-y-6 z-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold">
            <Icons.Star className='w-5 h-5 ' />
          <span className='text-blue-500'>PRODUCTO DESTACADO</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            {currentProduct.name}
          </h2>

          <p className="text-xl text-blue-100 leading-relaxed">
            {currentProduct.description}
          </p>

          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold">
              ${currentProduct.price.toLocaleString('es-AR')}
            </span>
          </div>

          {/* Botones CTA */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              to={`/productos/${currentProduct.id}`}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 text-center shadow-lg"
            >
              📋 Más Información
            </Link>

            <button
              onClick={handleAddToCart}
              className={`font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg ${justAdded
                ? 'bg-green-500 text-white'
                : 'bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700  text-white '
                }`}
            >
              {justAdded ? '✓ Agregado al Carrito' : '🛒 Comprar Ahora'}
            </button>
          </div>

          {/* Indicadores de puntos */}
          <div className="flex gap-3 pt-6">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all ${index === currentIndex
                  ? 'w-12 bg-white'
                  : 'w-3 bg-white/50 hover:bg-white/75'
                  } h-3 rounded-full`}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        </div>


      </div>

      {/* Botones de navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2  bg-white/20 hover:bg-white/30  text-white w-12 h-12 rounded-full flex items-center justify-center transition-all z-20 group"
        aria-label="Anterior"
      >
        <span className="text-2xl group-hover:scale-125 transition-transform">‹</span>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2  bg-white/20 hover:bg-white/30  text-white w-12 h-12 rounded-full flex items-center justify-center transition-all z-20 group"
        aria-label="Siguiente"
      >
        <span className="text-2xl group-hover:scale-125 transition-transform">›</span>
      </button>
    </div>
  );
}