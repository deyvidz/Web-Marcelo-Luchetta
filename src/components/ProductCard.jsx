import { useCart } from '../hooks/useCart';
import { useState } from 'react';
import { useToast } from '../context/ToastContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    showToast(`${product.name} agregado al carrito`, 'success');
    
    setTimeout(() => {
      setAdded(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
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
            disabled={added}
            className={`px-5 py-3 rounded-xl transition-all duration-300 font-bold text-sm shadow-md hover:shadow-lg transform ${
              added
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white scale-105 cursor-default'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105 active:scale-95'
            } disabled:opacity-75`}
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