import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 border-t border-gray-700">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">

          {/* Columna 1: Información */}
          <div className="md:col-span-1">
            <h3 className="text-white text-xl font-extrabold mb-4">🦷 Marcelo Luchetta</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Tu proveedor de confianza en equipamiento odontológico profesional.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h3 className="text-white text-lg font-bold mb-5">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-sm hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  tabIndex={0}
                  aria-label="Ir a inicio"
                >
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  to="/productos" 
                  className="text-sm hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  tabIndex={0}
                  aria-label="Ver productos"
                >
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  Productos
                </Link>
              </li>
              <li>
                <Link 
                  to="/quien-soy" 
                  className="text-sm hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  tabIndex={0}
                  aria-label="Conocer más sobre nosotros"
                >
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  Quién Soy
                </Link>
              </li>
              <li>
                <Link 
                  to="/contacto" 
                  className="text-sm hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  tabIndex={0}
                  aria-label="Contactarnos"
                >
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h3 className="text-white text-lg font-bold mb-5">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <span>📧</span>
                <a 
                  href="mailto:marceloluchetta@hotmail.com" 
                  className="hover:underline"
                  tabIndex={0}
                  aria-label="Enviar email"
                >
                  marceloluchetta@hotmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <span>📱</span>
                <a 
                  href="https://wa.me/5491152498558" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                  tabIndex={0}
                  aria-label="Contactar por WhatsApp"
                >
                  +54 11 5249-8558
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>Juan Ramirez de Velasco 1056, CABA</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Horarios */}
          <div>
            <h3 className="text-white text-lg font-bold mb-5">Horarios</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-gray-400">Lunes - Viernes</li>
              <li className="text-white font-bold text-lg">9:00 - 21:00hs</li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-700 mt-10 pt-8 text-center">
          <p className="text-sm text-gray-400 mb-2">
            &copy; {new Date().getFullYear()} Marcelo Luchetta. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-500">
            <span className="text-gray-400">Métodos de pago:</span> Efectivo | Transferencia Bancaria
          </p>
        </div>
      </div>
    </footer>
  );
}