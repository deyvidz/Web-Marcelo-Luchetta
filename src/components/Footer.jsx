import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Columna 1: Información */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Marcelo</h3>
            <p className="text-sm leading-relaxed">
              Tu proveedor de confianza en equipamiento odontológico profesional.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/productos" className="text-sm hover:text-white transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/quien-soy" className="text-sm hover:text-white transition-colors">
                  Quién Soy
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-sm hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-2 text-xs">
              <li>📧 marceloluchetta@hotmail.com</li>
              <li>📱 +54 11 5149-8558</li>
              <li>📍 Juan Ramirez de Velasco 1056, CABA</li>
            </ul>
          </div>

          {/* Columna 4: Horarios */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Horarios</h3>
            <ul className="space-y-2 text-sm">
              <li>Lunes - Viernes</li>
              <li className="text-white font-semibold">9:00 - 21:00hs</li>

            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Marcelo Luchetta. Todos los derechos reservados.</p>
          <p className="mt-2">
            <span className="text-gray-400">Métodos de pago:</span> Efectivo | Transferencia Bancaria
          </p>
        </div>
      </div>
    </footer>
  );
}