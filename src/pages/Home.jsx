import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCarousel from '../components/features/ProductCarousel.jsx';
import Banner from '../components/features/Banner.jsx';
import { useFeaturedProduct } from '../hooks/useProducts.js';
import { useBanners } from '../hooks/useBanners.js';
import ProductList from '../components/features/ProductList.jsx';
import Loading from '../components/features/Loading.jsx';
import Logo from '../assets/logonombre.png';
import Banner1 from '../assets/bannerK.webp';
import Banner2 from '../assets/bannerS.webp';
import { Icons } from '../icons/IconLibrary.jsx';
import { GridLayout } from '../components/features/GridLayout.jsx';
import { GridCard } from '../components/features/GridCard.jsx';
import { CardList } from '../components/features/CardList.jsx';
import { Card } from '../components/features/Card.jsx';
import { BannerSkeleton } from '../components/features/Loading.jsx';
export default function Home() {
    const { products, loading } = useFeaturedProduct();
    const { banners, loading: bannersLoading } = useBanners();
    const [imgLoaded, setImgLoaded] = useState(false);
    return (
        <div className="min-h-screen top-0 bg-background">
            {/* Hero Section  TODO: IMPLEMENTAR SKELETON DE BANNER, HACER TARJETAS RESPONSIVE*/}

            <div className='relative mb-20'>
                {(bannersLoading || !imgLoaded) && <BannerSkeleton />}
                {!bannersLoading && (
                    <div className={imgLoaded ? 'relative' : 'absolute inset-0 overflow-hidden'}>
                        <Banner
                            banners={banners}
                            onImageLoad={() => setImgLoaded(true)} // pasás el callback al Banner
                        />
                    </div>
                )}
                <div className='absolute h-15 md:h-40 w-full bottom-0 bg-linear-to-b from-transparent via-background/60 via-40% to-background to-70% pointer-events-none'>
                </div><CardList />
            </div>





            <section className=" bg-linear-to-b to-background via-backgroundb from-background  ">
                {loading ? (<Loading />) :
                    <ProductCarousel products={products} loading={loading} title="Destacados" />}
            </section>
            {/* category Section */}

            <GridCard titulo="Kytinon" type="Marca" />

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
                        className="group flex justify-center items-center bg-primary text-white hover:bg-primary/80 font-bold py-4 rounded-2xl duration-300 shadow text-lg"
                        aria-label="Contáctanos para buscar un producto específico"
                    ><Icons.Whatsapp className="w-5 h-5 mr-1 group-hover:rotate-12 duration-300 fill-white" /> Contactanos
                    </a>
                </div>
            </section>

        </div>
    );
}