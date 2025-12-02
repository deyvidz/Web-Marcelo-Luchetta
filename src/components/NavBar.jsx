import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartModal from './CartModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();

  const totalItems = getTotalItems();
  // Función para verificar si el link está activo
  const isActive = (path) => location.pathname === path;

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
    setIsOpen(false);
  };

  return (
    <>
    <nav className="bg-linear-to-r from-blue-600 via-blue-700 to-blue-600 text-white shadow-xl sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            tabIndex={0}
            aria-label="Ir al inicio"
          >
            <span className="text-xl md:text-2xl font-extrabold tracking-tight">Marcelo Luchetta</span>
          </Link>

          {/* Links desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-5 py-2.5 rounded-lg transition-all duration-200 font-semibold ${
                isActive('/')
                  ? 'bg-white text-blue-700 shadow-lg'
                  : 'hover:bg-blue-800 hover:shadow-md'
              }`}
              tabIndex={0}
              aria-label="Ir a inicio"
            >
              Inicio
            </Link>
            <Link
              to="/productos"
              className={`px-5 py-2.5 rounded-lg transition-all duration-200 font-semibold ${
                isActive('/productos')
                  ? 'bg-white text-blue-700 shadow-lg'
                  : 'hover:bg-blue-800 hover:shadow-md'
              }`}
              tabIndex={0}
              aria-label="Ver productos"
            >
              Productos
            </Link>
            <Link
              to="/quien-soy"
              className={`px-5 py-2.5 rounded-lg transition-all duration-200 font-semibold ${
                isActive('/quien-soy')
                  ? 'bg-white text-blue-700 shadow-lg'
                  : 'hover:bg-blue-800 hover:shadow-md'
              }`}
              tabIndex={0}
              aria-label="Conocer más sobre nosotros"
            >
              Quién Soy
            </Link>
            <Link
              to="/contacto"
              className={`px-5 py-2.5 rounded-lg transition-all duration-200 font-semibold ${
                isActive('/contacto')
                  ? 'bg-white text-blue-700 shadow-lg'
                  : 'hover:bg-blue-800 hover:shadow-md'
              }`}
              tabIndex={0}
              aria-label="Contactarnos"
            >
              Contacto
            </Link>

            {/* Icono del carrito */}
            <div className="relative ml-4">
              <button 
                onClick={handleCartClick}
                className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-900 px-5 py-2.5 rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                tabIndex={0}
                aria-label={`Abrir carrito de compras${totalItems > 0 ? ` con ${totalItems} productos` : ''}`}
              >
                <span className="text-xl">🛒</span>
                <span>Carrito</span>
              </button>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse">
                  {totalItems}
                </span>
              )}
            </div>
          </div>

          {/* Botón hamburguesa - móvil */}
          <button
            className="md:hidden text-3xl focus:outline-none hover:opacity-80 transition-opacity p-2"
            onClick={handleToggleMenu}
            tabIndex={0}
            aria-label="Abrir menú de navegación"
            aria-expanded={isOpen}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>


        {/* Menú móvil */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-slide-left">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg transition-all duration-200 font-semibold ${
                isActive('/')
                  ? 'bg-white text-blue-700 shadow-md'
                  : 'hover:bg-blue-800'
              }`}
              tabIndex={0}
              aria-label="Ir a inicio"
            >
              Inicio
            </Link>
            <Link
              to="/productos"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg transition-all duration-200 font-semibold ${
                isActive('/productos')
                  ? 'bg-white text-blue-700 shadow-md'
                  : 'hover:bg-blue-800'
              }`}
              tabIndex={0}
              aria-label="Ver productos"
            >
              Productos
            </Link>
            <Link
              to="/quien-soy"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg transition-all duration-200 font-semibold ${
                isActive('/quien-soy')
                  ? 'bg-white text-blue-700 shadow-md'
                  : 'hover:bg-blue-800'
              }`}
              tabIndex={0}
              aria-label="Conocer más sobre nosotros"
            >
              Quién Soy
            </Link>
            <Link
              to="/contacto"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg transition-all duration-200 font-semibold ${
                isActive('/contacto')
                  ? 'bg-white text-blue-700 shadow-md'
                  : 'hover:bg-blue-800'
              }`}
              tabIndex={0}
              aria-label="Contactarnos"
            >
              Contacto
            </Link>
            {/* Carrito móvil */}
            <button
              onClick={handleCartClick}
              className="w-full flex items-center justify-between px-4 py-3 bg-blue-800 hover:bg-blue-900 rounded-lg transition-all duration-200 font-semibold shadow-md"
              tabIndex={0}
              aria-label={`Abrir carrito de compras${totalItems > 0 ? ` con ${totalItems} productos` : ''}`}
            >
              <span>🛒 Carrito</span>
              {totalItems > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </nav>
    {/* Modal del carrito - ⬅️ NUEVO */}
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
  />
  </>
  );
}