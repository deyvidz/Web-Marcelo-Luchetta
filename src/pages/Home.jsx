import { Link } from 'react-router-dom';
import ProductCarousel from '../components/features/ProductCarousel.jsx';
import { useFeaturedProduct, useProductByCategory } from '../hooks/useProducts.js';
import ProductList from '../components/features/ProductList.jsx';
import logo from '../assets/logo-nombre.png';
import Loading from '../components/features/Loading.jsx';

export default function Home() {
    const { products, loading } = useFeaturedProduct();
    const { products: Equipamiento, loading: eqLoading } = useProductByCategory('Equipamiento', 3);
    const { products: Iluminacion, loading: ilLoading } = useProductByCategory('Iluminación', 3);
    return (
        <div className="min-h-screen top-0">
            
            {/* Hero Section */}
            <hero className="lg:flex lg:flex-row-reverse py-40 ">
                <div className="lg:relative lg:right-20 w-full flex flex-col items-center justify-center pt-20 md:pt-50 lg:pt-0">
                    <img src={logo} alt="Logo" className=" lg:h-150 motion-scale-in-[0.25] motion-opacity-in-[0%] motion-blur-in-[20px] motion-duration-1500" />
                    <h2 className="font-playfair text-xl md:text-2xl -mt-2 lg:text-2xl text-text/90 motion-scale-in-50 motion-translate-x-in-[-2%] motion-translate-y-in-75 motion-opacity-in-[0%] motion-blur-in-[5px] motion-duration-[1.25s] motion-delay-[0.95s] motion-duration-[1.55s]/scale motion-duration-[1.55s]/translate motion-delay-[1.25s]/opacity motion-delay-[1.25s]/blur">
                        TU PROVEEDOR DE CONFIANZA
                    </h2>
                </div>
                <section className="lg:relative w-full lg:pl-20 pt-40 md:pt-70 lg:pt-0 h-[45vh] motion-scale-in-[0.25] motion-opacity-in-[0%] motion-blur-in-[20px] motion-duration-1500">
                    {loading ? (
                        <Loading />
                    ) : (
                        <ProductCarousel products={products} loading={loading} />
                    )}
                </section>
            </hero>



            <section className="container mx-auto px-4 pt-120 py-16 lg:py-20 ">
                
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
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
                    <Loading />
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
            <section className="bg-linear-to-r from-blue-600 via-blue-700 to-blue-600 text-white py-16 lg:py-20 mt-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern opacity-10"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                        ¿Buscas un producto en específico?
                    </h2>
                    <p className="text-xl lg:text-2xl mb-8 text-blue-100">
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