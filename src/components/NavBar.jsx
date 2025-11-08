// src/components/NavBar.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Función para verificar si el link está activo
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold">🦷 DentalPro</span>
          </Link>

          {/* Links desktop */}
          <div className="hidden md:flex space-x-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-md transition-colors ${
                isActive('/') 
                  ? 'bg-blue-700 font-semibold' 
                  : 'hover:bg-blue-700'
              }`}
            >
              Inicio
            </Link>
            <Link 
              to="/productos" 
              className={`px-4 py-2 rounded-md transition-colors ${
                isActive('/productos') 
                  ? 'bg-blue-700 font-semibold' 
                  : 'hover:bg-blue-700'
              }`}
            >
              Productos
            </Link>
            <Link 
              to="/quien-soy" 
              className={`px-4 py-2 rounded-md transition-colors ${
                isActive('/quien-soy') 
                  ? 'bg-blue-700 font-semibold' 
                  : 'hover:bg-blue-700'
              }`}
            >
              Quién Soy
            </Link>
            <Link 
              to="/contacto" 
              className={`px-4 py-2 rounded-md transition-colors ${
                isActive('/contacto') 
                  ? 'bg-blue-700 font-semibold' 
                  : 'hover:bg-blue-700'
              }`}
            >
              Contacto
            </Link>
          </div>

          {/* Botón hamburguesa - móvil */}
          <button 
            className="md:hidden text-2xl focus:outline-none" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Menú móvil */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded-md transition-colors ${
                isActive('/') 
                  ? 'bg-blue-700 font-semibold' 
                  : 'hover:bg-blue-700'
              }`}
            >
              Inicio
            </Link>
            <Link 
              to="/productos" 
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded-md transition-colors ${
                isActive('/productos') 
                  ? 'bg-blue-700 font-semibold' 
                  : 'hover:bg-blue-700'
              }`}
            >
              Productos
            </Link>
            <Link 
              to="/quien-soy" 
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded-md transition-colors ${
                isActive('/quien-soy') 
                  ? 'bg-blue-700 font-semibold' 
                  : 'hover:bg-blue-700'
              }`}
            >
              Quién Soy
            </Link>
            <Link 
              to="/contacto" 
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded-md transition-colors ${
                isActive('/contacto') 
                  ? 'bg-blue-700 font-semibold' 
                  : 'hover:bg-blue-700'
              }`}
            >
              Contacto
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}