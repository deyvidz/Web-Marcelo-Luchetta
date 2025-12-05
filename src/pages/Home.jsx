import { Link } from 'react-router-dom';
import ProductCarousel from '../components/features/ProductCarousel.jsx';
import FeatureSection from '../components/features/FeatureSection.jsx';
import { featuredProducts } from '../data/products';

export default function Home() {
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-12">
                <ProductCarousel products={featuredProducts} />
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-16 md:py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        ¿Por qué elegirnos?
                    </h2>
                    <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
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
            <section className="bg-linear-to-r from-blue-600 via-blue-700 to-blue-600 text-white py-16 md:py-20 mt-16 relative overflow-hidden">
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