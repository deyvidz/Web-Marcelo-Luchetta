import { useState } from 'react';
import ProductCarousel from '../components/features/ProductCarousel.jsx';
import Banner from '../components/features/Banner.jsx';
import { useFeaturedProduct } from '../hooks/useProductQueries.js';
import { useBanners } from '../hooks/useBanners.js';
import Loading from '../components/features/Loading.jsx';
import { CardList } from '../components/features/CardList.jsx';
import { BannerSkeleton } from '../components/features/Loading.jsx';
import WhatsappCta from '../components/features/WhatsappCta.jsx';
export default function Home() {
    const { products, loading } = useFeaturedProduct();
    const { banners, loading: bannersLoading } = useBanners();
    const [imgLoaded, setImgLoaded] = useState(false);
    return (
        <div className="min-h-screen top-0 bg-background">

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


            {/* CTA Section */}
            <WhatsappCta title="¿Buscás un producto específico?">
                Contactame y te ayudo a encontrar el equipamiento
                ideal para tu consultorio.
            </WhatsappCta>

        </div>
    );
}