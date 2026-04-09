import { Link } from 'react-router-dom';
import ProductCarousel from '../components/features/ProductCarousel.jsx';
import { useFeaturedProduct, useProductByCategory } from '../hooks/useProducts.js';
import ProductList from '../components/features/ProductList.jsx';
import Loading from '../components/features/Loading.jsx';
import Resina from '../assets/resina.webp';
import Pinceles from '../assets/pinceles.webp';
import Membrana from '../assets/membrana.webp';
import Logo from '../assets/logonombre.png';
import { Icons } from '../icons/IconLibrary.jsx';

export default function Home() {
    const { products, loading } = useFeaturedProduct();
    const { products: Equipamiento, loading: eqLoading } = useProductByCategory('Equipamiento', 3);
    const { products: Iluminacion, loading: ilLoading } = useProductByCategory('Iluminación', 3);
    return (
        <div className="min-h-screen top-0 bg-background">
            {/* Hero Section */}

            <section className="grid grid-cols-1 items-center pb-15 relative overflow-hidden">
                <div className="absolute inset-0 mask-radial-fade bg-grid-pattern bg-conic-30 pointer-events-none z-0"></div>
                    <div className='flex flex-col text-center h-[90%] relative pt-40 pb-20 items-center justify-start z-10'>
                        <img src={Logo} alt="Logo" className='h-40 absolute top-0' />
                        <div>
                            <h1 className="text-text md:text-5xl text-3xl font-bold leading-12 md:leading-16 lg:leading-20  row-start-2 text-center"><span className='text-primary'>Excelencia y precisión <br /></span> para profesionales</h1>
                            <p className="text-secondary text-sm font-bold lg:text-xl justify-center">·Biomateriales · pinceles · resinas · scanners y mas·</p>
                            <p className="text-text/80 text-sm lg:text-lg justify-center mt-5 lg:p-20 p-5">
                                Accedé al catálogo más completo de insumos y
                                tecnología de vanguardia.
                            </p>
                        </div>
                        {/* logos */}
                        <div className='z-1 absolute w-90 md:w-145 h-29'>
                            <div className="absolute -top-40 -left-80 scale-35 max-[880px]:-left-30 max-[880px]:-top-60 max-[880px]:scale-30 max-[600px]:-left-50 "><img className='-rotate-12 hover:rotate-0 duration-200' src={Membrana} alt='Membrana Kytinon' /></div>
                            <div className="absolute -top-70 -right-50 scale-40 max-[880px]:right-0 max-[880px]:-top-90 max-[880px]:scale-30 max-[600px]:-right-15"><img className='hover:rotate-10 duration-200' src={Pinceles} alt='Pinceles SmileLine' /></div>
                            <div className="absolute -bottom-90 -left-70 scale-25 max-[880px]:-left-45 max-[880px]:-bottom-115 max-[600px]:right-0 max-[600px]:-bottom-140" ><img className='-rotate-12 hover:rotate-0 duration-200' src={Resina} alt='Resina Prizma' /></div>
                            <div className="absolute -bottom-95 -right-80 scale-25 max-[880px]:-right-50 max-[880px]:-bottom-115 max-[600px]:left-0 max-[600px]:-bottom-140" ><img className='rotate-12 hover:rotate-0 duration-200' src={Resina} alt='Resina Prizma' /></div>
                        </div>


                        <div className="flex gap-10 justify-center">
                            <Link
                                to="/productos"
                                className="group bg-primary border border-accent text-white lg:w-50 lg:h-20 lg:text-lg rounded-2xl p-4 flex items-center justify-center whitespace-nowrap hover:bg-primary/90 duration-200">
                                Ver productos
                                <Icons.ArrowIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 duration-200" />
                            </Link>

                            <a href="https://wa.me/91152498558" target="_blank" rel="noopener noreferrer" className="group bg-white text-primary border border-primary lg:w-50 lg:h-20 lg:text-lg p-4 rounded-2xl cursor-pointer flex items-center justify-center hover:bg-white/50 duration-200"><Icons.Whatsapp className="w-5 h-5 mr-1 group-hover:rotate-12 duration-200" /> Contactanos </a>
                        </div>
                        <span className='text-text/80 text-xs lg:text-sm'>No encontras lo que buscas? Lo conseguimos por vos</span>

                        <div className="flex gap-5 justify-center mt-40 md:mt-10">
                            <div>
                                <h3 className="text-text text-1xl font-bold">+1000 clientes</h3>
                                <p className="text-secondary text-xs">En todo el pais</p>
                            </div>
                            <div className="h-10 w-0.5 bg-linear-to-t from-primary to-secondary m-0"></div>
                            <div>
                                <h3 className="text-text text-1xl font-bold">Envios Nacionales</h3>
                                <p className="text-secondary text-xs">puerta a puerta</p>
                            </div>
                            <div className="h-10 w-0.5 bg-linear-to-t from-primary to-secondary m-0"></div>
                            <div>
                                <h3 className="text-text text-1xl font-bold">Atencion inmediata</h3>
                                <p className="text-secondary text-xs">Comunicate por whatsapp</p>
                            </div>
                        </div>
                    </div>

            </section>

            <section className=" bg-linear-to-b to-background via-backgroundb from-background  ">
                {loading ? (<Loading />) :
                    <ProductCarousel products={products} loading={loading} title="Destacados" />}
            </section>

            <section className=" px-4 pt-10 py-16 lg:py-20">

                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Productos
                    </h2>
                </div>

                {eqLoading ? (
                    <Loading />
                ) : (
                    <div className='bg-gray-100'>
                        <ProductList
                            products={Equipamiento}
                            title="Equipamiento"
                        />
                    </div>
                )}
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
            </section>

            {/* CTA Section */}
            <section className="bg-backgroundb text-text py-16 lg:py-20 mt-16 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                        ¿Buscas un producto en específico?
                    </h2>
                    <p className="text-xl lg:text-2xl mb-8 text-text/80">
                        Contactanos y te ayudamos a encontrarlo.
                    </p>
                    <a href="https://wa.me/1152498558"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex justify-center items-center bg-primary text-white hover:bg-primary/80 font-bold py-4 rounded-2xl duration-200 shadow text-lg"
                        aria-label="Contáctanos para buscar un producto específico"
                    ><Icons.Whatsapp className="w-5 h-5 mr-1 group-hover:rotate-12 duration-200 fill-white" /> Contactanos
                    </a>
                </div>
            </section>

        </div>
    );
}