import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          🦷 Bienvenido a DentalPro
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Tu proveedor de confianza en equipamiento odontológico profesional.
          Calidad, experiencia y tecnología de vanguardia.
        </p>
        <Link 
          to="/productos" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg"
        >
          Ver Productos
        </Link>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Calidad Garantizada
            </h3>
            <p className="text-gray-600">
              Productos certificados y de marcas reconocidas internacionalmente
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Envíos a Todo el País
            </h3>
            <p className="text-gray-600">
              Entrega segura y rápida en toda Argentina
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Pago Fácil
            </h3>
            <p className="text-gray-600">
              Efectivo o transferencia bancaria
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Necesitas asesoramiento?
          </h2>
          <p className="text-xl mb-6">
            Nuestro equipo está listo para ayudarte
          </p>
          <Link 
            to="/contacto" 
            className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Contáctanos
          </Link>
        </div>
      </section>
    </div>
  );
}