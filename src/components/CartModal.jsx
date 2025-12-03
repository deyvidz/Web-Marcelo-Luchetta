// src/components/CartModal.jsx
import { useCart } from '../hooks/useCart';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
import { Icons } from './icons/IconLibrary';

export default function CartModal({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const { showToast } = useToast();

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
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-end p-4 animate-slide-left"
      tabIndex={-1}
      aria-label="Cerrar modal del carrito"
    >
      {/* Modal */}
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[90vh] flex flex-col animate-slide-left border border-gray-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-linear-to-r from-blue-50 to-white">
          <div>
            <h2 id="cart-modal-title" className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-gray-900">
              <Icons.Cart className='w-10 h-10' /> Tu Carrito 
            </h2>
            <p className="text-sm text-gray-600 mt-1 font-medium">
              {getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 text-3xl font-bold w-10 h-10 rounded-full transition-all duration-200 flex items-center justify-center"
            tabIndex={0}
            aria-label="Cerrar modal del carrito"
          >
            ✕
          </button>
        </div>

        {/* Contenido del carrito */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            // Carrito vacío
            <div className="flex flex-col justify-center items-center py-16">
              <Icons.EmptyCart className='w-15 h-15 mb-6' />
              <p className="text-gray-700 mb-6 text-lg font-medium">Tu carrito está vacío</p>
              <Link 
                to="/productos"
                onClick={onClose}
                className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl"
                tabIndex={0}
                aria-label="Cerrar y ver productos"
              >
                Ver Productos
              </Link>
            </div>
          ) : (
            // Lista de productos
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-linear-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Imagen */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />

                  {/* Información */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1 text-sm line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-blue-600 font-bold mb-3 text-lg">
                      ${item.price.toLocaleString('es-AR')}
                    </p>

                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item.id, item.quantity - 1);
                          } else {
                            removeFromCart(item.id);
                            showToast(`${item.name} eliminado del carrito`, 'info');
                          }
                        }}
                        className="bg-white hover:bg-gray-100 active:bg-gray-200 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-gray-700 shadow-sm transition-all duration-200 hover:scale-110 active:scale-95"
                        aria-label="Disminuir cantidad"
                        tabIndex={0}
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          updateQuantity(item.id, item.quantity + 1);
                          showToast(`Cantidad de ${item.name} actualizada`, 'success', 1000);
                        }}
                        className="bg-white hover:bg-gray-100 active:bg-gray-200 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-gray-700 shadow-sm transition-all duration-200 hover:scale-110 active:scale-95"
                        aria-label="Aumentar cantidad"
                        tabIndex={0}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      showToast(`${item.name} eliminado del carrito`, 'info');
                    }}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 active:bg-red-100 font-bold p-2 rounded-lg transition-all duration-200 self-start hover:scale-110 active:scale-95"
                    aria-label="Eliminar producto del carrito"
                    tabIndex={0}
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
          <div className="border-t border-gray-200 p-6 space-y-4 bg-linear-to-br from-gray-50 to-white">
            {/* Total */}
            <div className="flex items-center justify-between text-2xl font-bold pb-4 border-b border-gray-200">
              <span className="text-gray-900">Total:</span>
              <span className="text-blue-600">
                ${getTotalPrice().toLocaleString('es-AR')}
              </span>
            </div>

            {/* Botones */}
            <div className="space-y-3">
              <Link
                to="/carrito"
                onClick={onClose}
                className="block w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                tabIndex={0}
                aria-label="Ver carrito completo"
              >
                Ver Carrito Completo
              </Link>
              <button
                onClick={onClose}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                tabIndex={0}
                aria-label="Cerrar y continuar comprando"
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