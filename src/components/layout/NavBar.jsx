import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { Icons } from "../../icons/IconLibrary.jsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  // Función para verificar si el link está activo
  const isActive = (path) => location.pathname === path;

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };



  return (
    <>
      <nav className='sticky top-0 left-0 w-full backdrop-blur-md transition-all duration-300 z-50'>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className='flex items-center justify-between gap-2'>
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-2 hover:opacity-90 transition-opacity"
                tabIndex={0}
                aria-label="Ir al inicio"
              >
                <img src={logo} alt="Logo de Marcelo Luchetta" className="h-10 w-auto" />
              </Link>
            </div>

            {/* Links desktop */}
            <div className="hidden md:flex items-center space-x-5  backdrop-blur-sm rounded-full p-2 pl-4 pr-4 shadow-md">

              <Link
                to="/"
                className={`nav-link font-bold ${isActive('/')
                    ? 'after:w-full text-text'
                    : 'text-text/80  hover:text-text '
                  }`}
                tabIndex={0}
                aria-label="Ir a inicio"
              >
                Inicio
              </Link>
              <Link
                to="/productos"
                className={`nav-link font-bold ${isActive('/productos')
                  ? 'after:w-full text-text'
                  : 'text-text/80  hover:text-text '
                  }`}
                tabIndex={0}
                aria-label="Ver productos"
              >
                Productos
              </Link>
              <Link
                to="/quien-soy"
                className={`nav-link font-bold ${isActive('/quien-soy')
                  ? 'after:w-full text-text'
                  : 'text-text/80  hover:text-text '
                  }`}
                tabIndex={0}
                aria-label="Conocer más sobre nosotros"
              >
                Quién Soy
              </Link>
              <Link
                to="/contacto"
                className={`nav-link font-bold ${isActive('/contacto')
                  ? 'after:w-full text-text'
                  : 'text-text/80  hover:text-text '
                  }`}
                tabIndex={0}
                aria-label="Contactarnos"
              >
                Contacto
              </Link>



            </div >

            <div className='flex items-center justify-between gap-4'>
              <a href="https://instagram.com/marcelo_luchetta"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
                aria-label="Ir a Instagram"><Icons.Instagram className='w-7 h-7 hover:opacity-90 hover:scale-105 transition-opacity' /></a>
              <a
                href="https://www.facebook.com/marceloluchetta"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
                aria-label="Ir a Facebook"><Icons.Facebook className='w-7 h-7 hover:opacity-90 hover:scale-105 transition-opacity' /></a>
              <a
                href="https://wa.me/5491152498558"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
                aria-label="Contactar por WhatsApp"><Icons.Whatsapp className='w-7 h-7 hover:opacity-90 hover:scale-105 transition-opacity' /></a>
            </div>

            {/* Botón hamburguesa - móvil */}
            <button
              className='md:hidden text-3xl focus:outline-none hover:opacity-80 transition-opacity p-2 text-primary'
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
            <div className="md:hidden flex flex-col pb-4 space-y-2 animate-slide-left border-b border-primary/10">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={` self-center nav-link ${isActive('/')
                  ? 'after:w-full text-text'
                  : 'text-text/80'
                  }`}
                tabIndex={0}
                aria-label="Ir a inicio"
              >
                Inicio
              </Link>
              <Link
                to="/productos"
                onClick={() => setIsOpen(false)}
                className={`self-center nav-link ${isActive('/productos')
                  ? 'after:w-full text-text'
                  : 'text-text/80'
                  }`}
                tabIndex={0}
                aria-label="Ver productos"
              >
                Productos
              </Link>
              <Link
                to="/quien-soy"
                onClick={() => setIsOpen(false)}
                className={`self-center nav-link ${isActive('/quien-soy')
                  ? 'after:w-full text-text'
                  : 'text-text/80'
                  }`}
                tabIndex={0}
                aria-label="Conocer más sobre nosotros"
              >
                Quién Soy
              </Link>
              <Link
                to="/contacto"
                onClick={() => setIsOpen(false)}
                className={`self-center nav-link  ${isActive('/contacto')
                  ? 'after:w-full text-text'
                  : 'text-text/80'
                  }`}
                tabIndex={0}
                aria-label="Contactarnos"
              >
                Contacto
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}