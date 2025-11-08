export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Sobre Nosotros
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Contenido principal */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            {/* Imagen del dueño (placeholder) */}
            <div className="w-48 h-48 bg-blue-100 rounded-full flex items-center justify-center text-6xl shrink-0">
              👨‍⚕️
            </div>
            
            {/* Información */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Dr. Juan Pérez
              </h2>
              <p className="text-xl text-blue-600 mb-4">
                Fundador de DentalPro
              </p>
              <p className="text-gray-600 leading-relaxed">
                Con más de 15 años de experiencia en el sector odontológico, 
                fundé DentalPro con la misión de proporcionar equipamiento de 
                alta calidad a profesionales de toda Argentina.
              </p>
            </div>
          </div>

          {/* Historia */}
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Después de años trabajando como odontólogo, identifiqué la necesidad 
              de contar con un proveedor confiable que ofreciera equipamiento 
              profesional a precios justos y con un servicio personalizado.
            </p>
            <p>
              En 2010, decidí emprender este proyecto para ayudar a colegas y 
              profesionales de la salud dental a equipar sus consultorios con 
              la mejor tecnología disponible.
            </p>
            <p>
              Hoy, DentalPro es reconocido por su compromiso con la calidad, 
              la atención personalizada y el respaldo técnico que brindamos a 
              cada uno de nuestros clientes.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-3 text-center">🎯</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
              Nuestra Misión
            </h3>
            <p className="text-gray-600 text-center">
              Proveer equipamiento odontológico de calidad para mejorar 
              la práctica profesional en Argentina
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-3 text-center">👁️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
              Nuestra Visión
            </h3>
            <p className="text-gray-600 text-center">
              Ser el proveedor líder en equipamiento dental, reconocido 
              por nuestra excelencia y servicio al cliente
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-3 text-center">💎</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
              Nuestros Valores
            </h3>
            <p className="text-gray-600 text-center">
              Honestidad, calidad, compromiso con el cliente y 
              pasión por la excelencia profesional
            </p>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="bg-blue-600 text-white rounded-lg shadow-md p-8 mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Años de experiencia</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Clientes satisfechos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Equipos vendidos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Productos certificados</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}