import FeatureSection from "../components/FeatureSection";
import vendedora from '../assets/images/vendedora.jpg';

export default function About() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50 py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Sobre Nosotros
          </h1>
          <div className="w-32 h-1.5 bg-linear-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            Conoce nuestra historia, misión y compromiso con la excelencia en equipamiento odontológico
          </p>
        </div>

        {/* Contenido principal */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center mb-10">
            {/* Imagen */}
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl ring-4 ring-blue-100 shrink-0">
              <img 
                src={vendedora} 
                alt="Marcelo Luchetta" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Información */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Marcelo Luchetta
              </h2>
              <p className="text-xl md:text-2xl text-blue-600 font-semibold mb-6">
                Fundador y Especialista
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Con más de 15 años de experiencia en el sector odontológico, 
                fundé este proyecto con la misión de proporcionar equipamiento de 
                alta calidad a profesionales de toda Argentina.
              </p>
            </div>
          </div>

          {/* Historia */}
          <div className="space-y-6 text-gray-700 leading-relaxed text-lg border-t border-gray-200 pt-8">
            <p className="text-gray-800">
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
              Hoy, somos reconocidos por nuestro compromiso con la calidad, 
              la atención personalizada y el respaldo técnico que brindamos a 
              cada uno de nuestros clientes.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">
            Nuestros Principios
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureSection 
              title={'Nuestra Misión'} 
              description={'Proveer equipamiento odontológico de calidad para mejorar la práctica profesional en Argentina'} 
              icon={'🎯'}
            />
            <FeatureSection 
              title={'Nuestra Visión'} 
              description={'Ser el proveedor líder en equipamiento dental, reconocido por nuestra excelencia y servicio al cliente'} 
              icon={'👁️'}
            />
            <FeatureSection 
              title={'Nuestros Valores'} 
              description={'Honestidad, calidad, compromiso con el cliente y pasión por la excelencia profesional'} 
              icon={'💎'}
            />
          </div>
        </div>

        {/* Estadísticas */}
        <div className="bg-linear-to-br from-blue-600 via-blue-700 to-blue-600 text-white rounded-2xl shadow-2xl p-8 md:p-12 mt-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              Números que nos respaldan
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-5xl md:text-6xl font-extrabold mb-3 bg-linear-to-br from-white to-blue-100 bg-clip-text text-transparent">
                  15+
                </div>
                <div className="text-blue-100 text-sm md:text-base font-medium">
                  Años de experiencia
                </div>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-5xl md:text-6xl font-extrabold mb-3 bg-linear-to-br from-white to-blue-100 bg-clip-text text-transparent">
                  500+
                </div>
                <div className="text-blue-100 text-sm md:text-base font-medium">
                  Clientes satisfechos
                </div>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-5xl md:text-6xl font-extrabold mb-3 bg-linear-to-br from-white to-blue-100 bg-clip-text text-transparent">
                  1000+
                </div>
                <div className="text-blue-100 text-sm md:text-base font-medium">
                  Equipos vendidos
                </div>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-5xl md:text-6xl font-extrabold mb-3 bg-linear-to-br from-white to-blue-100 bg-clip-text text-transparent">
                  100%
                </div>
                <div className="text-blue-100 text-sm md:text-base font-medium">
                  Productos certificados
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}