import { useCart } from '../../hooks/useCart';
import { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { Link } from 'react-router-dom';

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
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform  group">
      <div className="relative overflow-hidden group">
        <Link to={`/productos/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        </Link>
      </div>
      <div className="p-4 group">
      <Link to={`/productos/${product.id}`}>
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-black transition-colors">
          {product.name}
        </h3>
        </Link>

        <p className="text-gray-500 text-xs mb-4 line-clamp-3 leading-relaxed">
          {product.description}
        </p>

        <span className="text-2xl md:text-3xl font-extrabold text-blue-600">
            ${product.price.toLocaleString('es-AR')}
        </span>
        <div className="flex items-center justify-between pt-4 border-t mt-2 border-gray-100">
          <Link className={"px-5 py-3 rounded-xl transition-all duration-300 text-sm shadow-md hover:shadow-lg transform bg-linear-to-r bg-gray-100 hover:bg-gray-200 text-gray-800"}
           to={`/productos/${product.id}`}>+ info
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`px-5 py-3 rounded-xl transition-all duration-300 font-bold text-sm shadow-md hover:shadow-lg hover:cursor-pointer transform ${
              added
                ? 'bg-linear-to-r from-green-500 to-green-600 text-white scale-105 cursor-default'
                : 'bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700  text-white '
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