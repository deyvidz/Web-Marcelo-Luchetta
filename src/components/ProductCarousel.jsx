import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

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
    <div className="relative bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden shadow-2xl">
      {/* Contenido del slide */}
      <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center min-h-[500px]">

        {/* Columna izquierda: Información */}
        <div className="text-white space-y-6 z-10">
          <div className="inline-block bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
            ⭐ PRODUCTO DESTACADO
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
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 text-center shadow-lg"
            >
              📋 Más Información
            </Link>

            <button
              onClick={handleAddToCart}
              className={`font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg ${justAdded
                  ? 'bg-green-500 text-white'
                  : 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
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

        {/* Columna derecha: Imagen */}
        <div className="relative">
          <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
            />
            {/* Badge de categoría */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-semibold text-gray-800">
              {currentProduct.category}
            </div>
          </div>

          {/* Decoración de fondo */}
          <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl transform scale-75" />
        </div>
      </div>

      {/* Botones de navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all z-20 group"
        aria-label="Anterior"
      >
        <span className="text-2xl group-hover:scale-125 transition-transform">‹</span>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all z-20 group"
        aria-label="Siguiente"
      >
        <span className="text-2xl group-hover:scale-125 transition-transform">›</span>
      </button>
    </div>
  );
}