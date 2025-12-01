// src/pages/Cart.jsx
import { useCart } from '../hooks/useCart';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Cart() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice, 
    getTotalItems 
  } = useCart();
  const { showToast } = useToast();

  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Generar mensaje de WhatsApp
  const generateWhatsAppMessage = () => {
    let message = '¡Hola! Me gustaría hacer el siguiente pedido:\n\n';
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      message += `   Precio unitario: $${item.price.toLocaleString('es-AR')}\n`;
      message += `   Subtotal: $${(item.price * item.quantity).toLocaleString('es-AR')}\n\n`;
    });
    
    message += `*TOTAL: $${getTotalPrice().toLocaleString('es-AR')}*\n\n`;
    message += '¿Está disponible?';
    
    return encodeURIComponent(message);
  };

  // Abrir WhatsApp
  const handleWhatsAppCheckout = () => {
    const phone = '5491152498558';
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // Confirmar vaciar carrito
  const handleClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
    showToast('Carrito vaciado', 'info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
            🛒 Tu Carrito
          </h1>
          <div className="w-32 h-1.5 bg-gradient-to-br from-blue-600 to-blue-400 mx-auto md:mx-0 rounded-full mb-4"></div>
          <p className="text-lg text-gray-600 font-medium">
            {getTotalItems() === 0 
              ? 'No hay productos en tu carrito' 
              : `${getTotalItems()} ${getTotalItems() === 1 ? 'producto' : 'productos'} en tu carrito`
            }
          </p>
        </div>

        {cart.length === 0 ? (
          // Carrito vacío
          <div className="bg-white rounded-2xl shadow-xl p-12 md:p-16 text-center border border-gray-100 max-w-2xl mx-auto">
            <div className="text-9xl mb-8">🛒</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              ¡Agrega productos para comenzar tu pedido!
            </p>
            <Link
              to="/productos"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
              tabIndex={0}
              aria-label="Ver productos disponibles"
            >
              Ver Productos
            </Link>
          </div>
        ) : (
          // Carrito con productos
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Columna izquierda: Lista de productos */}
            <div className="lg:col-span-2 space-y-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row gap-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Imagen */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-36 h-36 object-cover rounded-xl shadow-md"
                  />

                  {/* Información del producto */}
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-blue-600 font-bold text-xl">
                      ${item.price.toLocaleString('es-AR')} c/u
                    </p>
                  </div>

                  {/* Controles */}
                  <div className="flex flex-wrap sm:flex-col sm:flex-nowrap items-center sm:items-end justify-between sm:justify-start gap-4 w-full">
                    {/* Cantidad */}
                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2 border border-gray-200">
                      <button
                        onClick={() => {
                          updateQuantity(item.id, item.quantity - 1);
                          if (item.quantity === 1) {
                            showToast(`${item.name} eliminado del carrito`, 'info');
                          }
                        }}
                        className="bg-white hover:bg-gray-100 active:bg-gray-200 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-gray-700 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-110 active:scale-95"
                        aria-label="Disminuir cantidad"
                        tabIndex={0}
                      >
                        -
                      </button>
                      <span className="w-14 text-center font-bold text-lg text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          updateQuantity(item.id, item.quantity + 1);
                        }}
                        className="bg-white hover:bg-gray-100 active:bg-gray-200 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-gray-700 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-110 active:scale-95"
                        aria-label="Aumentar cantidad"
                        tabIndex={0}
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Subtotal</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${(item.price * item.quantity).toLocaleString('es-AR')}
                      </p>
                    </div>

                    {/* Botón eliminar */}
                    <button
                      onClick={() => {
                        removeFromCart(item.id);
                        showToast(`${item.name} eliminado del carrito`, 'info');
                      }}
                      className="text-red-500 hover:text-red-700 font-semibold text-sm transition-all duration-200 px-3 py-2 rounded-lg hover:bg-red-50 active:bg-red-100 hover:scale-105 active:scale-95 w-full sm:w-auto text-center"
                      aria-label="Eliminar producto del carrito"
                      tabIndex={0}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              ))}

              {/* Botón vaciar carrito */}
              <div className="flex justify-end pt-4">
                {!showClearConfirm ? (
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="text-red-500 hover:text-red-700 font-semibold transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
                    tabIndex={0}
                    aria-label="Vaciar todo el carrito"
                  >
                    🗑️ Vaciar carrito
                  </button>
                ) : (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex flex-wrap items-center gap-4 shadow-md">
                    <p className="text-red-700 font-semibold">
                      ¿Estás seguro?
                    </p>
                    <button
                      onClick={handleClearCart}
                      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                      tabIndex={0}
                      aria-label="Confirmar vaciar carrito"
                    >
                      Sí, vaciar
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg transition-all duration-200 font-semibold"
                      tabIndex={0}
                      aria-label="Cancelar vaciar carrito"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Columna derecha: Resumen */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-4 border border-gray-100">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Resumen del Pedido
                </h2>

                {/* Detalles */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-700 pb-3 border-b border-gray-200">
                    <span className="font-medium">Productos ({getTotalItems()})</span>
                    <span className="font-semibold">${getTotalPrice().toLocaleString('es-AR')}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 pb-3 border-b border-gray-200">
                    <span className="font-medium">Envío</span>
                    <span className="text-green-600 font-semibold">A coordinar</span>
                  </div>
                  <div className="pt-3">
                    <div className="flex justify-between text-2xl font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-blue-600">
                        ${getTotalPrice().toLocaleString('es-AR')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botones */}
                <div className="space-y-3 mb-6">
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    tabIndex={0}
                    aria-label="Finalizar pedido por WhatsApp"
                  >
                    <span className="text-2xl">📱</span>
                    Finalizar por WhatsApp
                  </button>
                  
                  <Link
                    to="/productos"
                    className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-center font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                    tabIndex={0}
                    aria-label="Continuar comprando"
                  >
                    Seguir Comprando
                  </Link>
                </div>

                {/* Información adicional */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    💳 Métodos de Pago
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Efectivo
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Transferencia bancaria
                    </li>
                  </ul>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    🚚 Envíos
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Coordinamos el envío según tu ubicación. Te contactaremos por WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}