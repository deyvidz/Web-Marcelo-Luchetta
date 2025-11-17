import { useCart } from '../hooks/useCart';
import { useState } from 'react';
export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-2xl md:text-3xl font-extrabold text-blue-600">
            ${product.price.toLocaleString('es-AR')}
          </span>

          <button
            onClick={handleAddToCart}
            className={`px-5 py-3 rounded-xl transition-all duration-300 font-bold text-sm shadow-md hover:shadow-lg transform hover:scale-105 ${
              added
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
            }`}
            tabIndex={0}
            aria-label={`${added ? 'Producto agregado' : `Agregar ${product.name} al carrito`}`}
          >
            {added ? '✓ Agregado' : 'Añadir'}
          </button>
        </div>
      </div>
    </div>
  )
}