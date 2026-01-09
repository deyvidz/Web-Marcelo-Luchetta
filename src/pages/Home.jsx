import { Link } from 'react-router-dom';
import ProductCarousel from '../components/features/ProductCarousel.jsx';
import { useFeaturedProduct, useProductByCategory } from '../hooks/useProducts.js';
import ProductList from '../components/features/ProductList.jsx';

export default function Home() {
    const { products, loading } = useFeaturedProduct();
    const { products: Equipamiento, loading: eqLoading } = useProductByCategory('Equipamiento', 3);
    const { products: Iluminacion, loading: ilLoading } = useProductByCategory('Iluminación', 3);
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-12">
                {/* pasar loading al carrusel y render condicional */}
                {loading ? (
                    <div className="w-full h-96 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
                    </div>
                ) : (
                    <ProductCarousel products={products} loading={loading} />
                )}
            </section>

            <section className="container mx-auto px-4 py-16 md:py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Productos
                    </h2>
                </div>
                <div className="w-full h-1 bg-linear-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
                {eqLoading ? (
                    <div className="w-full h-96 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
                    </div>
                ) : (
                    <div className='bg-gray-100'>
                        <ProductList
                            products={Equipamiento}
                            title="Equipamiento"
                        />
                    </div>
                )}
                <div className="w-full h-1 bg-linear-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
                {ilLoading ? (
                    <div className="w-full h-96 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
                    </div>
                ) : (
                    <div className='bg-gray-100'>
                        <ProductList
                            products={Iluminacion}
                            title="Iluminación"
                        />
                    </div>
                )}
                <div className="w-full h-1 bg-linear-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>

            </section>

            {/* CTA Section */}
            <section className="bg-linear-to-r from-blue-600 via-blue-700 to-blue-600 text-white py-16 md:py-20 mt-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern opacity-10"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        ¿Buscas un producto en específico?
                    </h2>
                    <p className="text-xl md:text-2xl mb-8 text-blue-100">
                        Contactanos y te ayudamos a encontrarlo.
                    </p>
                    <Link
                        to="/contacto"
                        className="inline-block bg-white text-blue-600 hover:bg-gray-50 font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
                        tabIndex={0}
                        aria-label="Contáctanos para más información"
                    >
                        Contactanos
                    </Link>
                </div>
            </section>
        </div>
    );
}