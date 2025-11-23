import { Link } from 'react-router-dom';
import FeatureSection from '../components/FeatureSection';
import dientes from '../assets/images/dientes.png';
import fondo from '../assets/images/fondo.png';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div 
                className="bg-cover bg-center bg-no-repeat relative overflow-hidden"
                style={{ backgroundImage: `url(${fondo})` }}
            >
                {/* Overlay para mejor legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80"></div>
                
                {/* Hero Section */}{/* TODO: eliminar el mensaje de bienvenida para agregar un carrusel de productos con botones JERARQUICOS CTA, agregar y mas info */}
                <section className="container mx-auto px-4 py-20 md:py-28 text-center relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <img 
                                src={dientes} 
                                alt="Dientes" 
                                className="w-20 h-16 md:w-24 md:h-20 object-contain drop-shadow-lg" 
                            />
                            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                                Bienvenido
                            </h1>
                        </div>
                        <p className="text-lg md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
                            Tu proveedor de confianza en equipamiento odontológico profesional.
                            <span className="block mt-2 text-gray-600">
                                Calidad, experiencia y tecnología de vanguardia.
                            </span>
                        </p>
                        <Link
                            to="/productos"
                            className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
                            tabIndex={0}
                            aria-label="Ver nuestros productos"
                        >
                            Ver Productos
                        </Link>
                    </div>
                </section>
            </div>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-16 md:py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        ¿Por qué elegirnos?
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
                </div>
                <div className="grid md:grid-cols-3 gap-8 md:gap-10">
                    <FeatureSection 
                        icon={'✅'} 
                        title={'Calidad Garantizada'} 
                        description={'Productos certificados y de marcas reconocidas internacionalmente'} 
                    />
                    <FeatureSection 
                        icon={'🚚'} 
                        title={'Envíos a Todo el País'} 
                        description={'Entrega segura y rápida en toda Argentina'} 
                    />
                    <FeatureSection 
                        icon={'💳'} 
                        title={'Métodos de Pago'} 
                        description={'Efectivo o transferencia bancaria'} 
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white py-16 md:py-20 mt-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern opacity-10"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        ¿Necesitas asesoramiento?
                    </h2>
                    <p className="text-xl md:text-2xl mb-8 text-blue-100">
                        Nuestro equipo está listo para ayudarte
                    </p>
                    <Link
                        to="/contacto"
                        className="inline-block bg-white text-blue-600 hover:bg-gray-50 font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
                        tabIndex={0}
                        aria-label="Contáctanos para más información"
                    >
                        Contáctanos
                    </Link>
                </div>
            </section>
        </div>
    );
}