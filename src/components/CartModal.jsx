// src/components/CartModal.jsx
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';

export default function CartModal({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  // Cerrar al hacer click fuera del modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // No renderizar si no está abierto
  if (!isOpen) return null;

  return (
    // Backdrop (fondo oscuro)
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 backdrop-blur-sm z-50 flex items-start justify-end p-4"
    >
      {/* Modal */}
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-md h-[90vh] flex flex-col animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              🛒 Tu Carrito
            </h2>
            <p className="text-sm text-gray-600">
              {getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Contenido del carrito */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            // Carrito vacío
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-600 mb-4">Tu carrito está vacío</p>
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Ver Productos
              </button>
            </div>
          ) : (
            // Lista de productos
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-gray-50 p-4 rounded-lg"
                >
                  {/* Imagen */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />

                  {/* Información */}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-2">
                      ${item.price.toLocaleString('es-AR')}
                    </p>

                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer con total */}
        {cart.length > 0 && (
          <div className="border-t p-6 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between text-xl font-bold">
              <span>Total:</span>
              <span className="text-blue-600">
                ${getTotalPrice().toLocaleString('es-AR')}
              </span>
            </div>

            {/* Botones */}
            <div className="space-y-2">
              <Link
                to="/carrito"
                onClick={onClose}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-3 rounded-lg transition-colors"
              >
                Ver Carrito Completo
              </Link>
              <button
                onClick={onClose}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-colors"
              >
                Seguir Comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}