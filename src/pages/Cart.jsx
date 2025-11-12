// src/pages/Cart.jsx
import { useCart } from '../hooks/useCart';
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
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🛒 Tu Carrito
          </h1>
          <p className="text-gray-600">
            {getTotalItems() === 0 
              ? 'No hay productos en tu carrito' 
              : `${getTotalItems()} ${getTotalItems() === 1 ? 'producto' : 'productos'} en tu carrito`
            }
          </p>
        </div>

        {cart.length === 0 ? (
          // Carrito vacío
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600 mb-6">
              ¡Agrega productos para comenzar tu pedido!
            </p>
            <Link
              to="/productos"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Ver Productos
            </Link>
          </div>
        ) : (
          // Carrito con productos
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Columna izquierda: Lista de productos */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-4"
                >
                  {/* Imagen */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg"
                  />

                  {/* Información del producto */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {item.description}
                    </p>
                    <p className="text-blue-600 font-bold text-lg">
                      ${item.price.toLocaleString('es-AR')} c/u
                    </p>
                  </div>

                  {/* Controles */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4">
                    {/* Cantidad */}
                    <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-white hover:bg-gray-200 w-8 h-8 rounded flex items-center justify-center font-bold text-gray-700 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-bold text-lg">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-white hover:bg-gray-200 w-8 h-8 rounded flex items-center justify-center font-bold text-gray-700 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                      <p className="text-xl font-bold text-gray-800">
                        ${(item.price * item.quantity).toLocaleString('es-AR')}
                      </p>
                    </div>

                    {/* Botón eliminar */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 font-semibold text-sm transition-colors"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              ))}

              {/* Botón vaciar carrito */}
              <div className="flex justify-end">
                {!showClearConfirm ? (
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                  >
                    🗑️ Vaciar carrito
                  </button>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-4">
                    <p className="text-red-700 font-semibold">
                      ¿Estás seguro?
                    </p>
                    <button
                      onClick={handleClearCart}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                    >
                      Sí, vaciar
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Columna derecha: Resumen */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Resumen del Pedido
                </h2>

                {/* Detalles */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Productos ({getTotalItems()})</span>
                    <span>${getTotalPrice().toLocaleString('es-AR')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span className="text-green-600 font-semibold">A coordinar</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span className="text-blue-600">
                        ${getTotalPrice().toLocaleString('es-AR')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botones */}
                <div className="space-y-3">
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="text-2xl">📱</span>
                    Finalizar por WhatsApp
                  </button>
                  
                  <Link
                    to="/productos"
                    className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-center font-semibold py-3 rounded-lg transition-colors"
                  >
                    Seguir Comprando
                  </Link>
                </div>

                {/* Información adicional */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-bold text-gray-800 mb-3">
                    💳 Métodos de Pago
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>✓ Efectivo</li>
                    <li>✓ Transferencia bancaria</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="font-bold text-gray-800 mb-3">
                    🚚 Envíos
                  </h3>
                  <p className="text-sm text-gray-600">
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