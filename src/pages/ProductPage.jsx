import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useProduct } from '../hooks/useProductQueries.js';
import { formatPrice } from '../utils/formatters.js';
import { buildWhatsappUrl } from '../utils/whatsapp.js';
import { Icons } from '../icons/IconLibrary.jsx';
import WhatsappCta from '../components/features/WhatsappCta.jsx';
export default function ProductPage() {
    const { id } = useParams();
    const { product, loading, error } = useProduct(id);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    // Si la URL trae ?variant=<label> (porque el usuario la eligió en la card),
    // arrancamos con esa variante. Si no, la marcada como isPopular; si no, la primera.
    // Si el usuario cambia el selector, gana su elección (selectedVariant tiene prioridad).
    const [searchParams] = useSearchParams();
    const [selectedVariant, setSelectedVariant] = useState(null);
    // Ref al contenedor del slide mobile. Se usa para scroll programático
    // (tap en dot) y para escuchar el scroll y mantener `selectedImage` sincronizado.
    const scrollRef = useRef(null);
    // Galería de imágenes: usar `images` array si existe en el doc, si no fallback a [product.image].
    // Para activar múltiples imágenes, agregar el campo `images: [url1, url2, ...]` en Firestore.
    // Declarado ANTES del useEffect que lo referencia en deps (evita TDZ).
    const images = Array.isArray(product?.images) && product.images.length > 0
        ? product.images
        : (product?.image ? [product.image] : []);
    // Listener de scroll: mantiene `selectedImage` en sync con la imagen visible.
    // requestAnimationFrame throttle: máximo 1 update por frame (60fps).
    // Deps: [images.length] — re-corre cuando el gallery se monta (post-load del producto),
    // porque en el primer render product es null y el JSX con el ref todavía no existe.
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;
        let rafId = null;
        const handleScroll = () => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                rafId = null;
                if (!container) return;
                const newIndex = Math.round(container.scrollLeft / container.clientWidth);
                setSelectedImage(newIndex);
            });
        };
        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            container.removeEventListener('scroll', handleScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [images.length]);
    const variantParam = searchParams.get('variant');
    const hasVariants = Array.isArray(product?.variant) && product.variant.length > 0;
    const effectiveVariant = hasVariants
        ? (selectedVariant
            || product.variant.find(v => v.label === variantParam)
            || product.variant.find(v => v.isPopular)
            || product.variant[0])
        : null;
    const displayPrice = effectiveVariant?.price ?? product?.price;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray/30 h-16 w-16 mx-auto mb-4"></div>
                    <p className="text-gray">Cargando producto...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-text mb-4">Error</h1>
                    <p className="text-gray mb-8">{error}</p>
                    <Link
                        to="/productos"
                        className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:brightness-90 transition-colors">
                        Ver todos los productos
                    </Link>
                </div>
            </div>
        );
    }

    // Si no existe el producto
    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-text mb-4">Producto no encontrado</h1>
                    <p className="text-gray mb-8">El producto que buscas no existe o fue eliminado.</p>
                    <Link
                        to="/productos"
                        className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:brightness-90 transition-colors">
                        Ver todos los productos
                    </Link>
                </div>
            </div>
        );
    }


    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

    // Scroll programático a la imagen i (cuando el usuario tapea un dot).
    const scrollToImage = (i) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTo({
            left: i * scrollRef.current.clientWidth,
            behavior: 'smooth',
        });
    };

    return (
        <div className="min-h-screen">
            {/* Breadcrumb */}
            <nav>
                <div className="container mx-auto px-4 py-4">
                    <ol className="flex items-center space-x-2 text-sm text-gray">
                        <li>
                            <Link to="/" className="hover:text-primary transition-colors">
                                Inicio
                            </Link>
                        </li>
                        <li className="flex items-center">
                            <Icons.ChevronRight className="w-4 h-4 mx-2" />
                            <Link to="/productos" className="hover:text-primary transition-colors">
                                Productos
                            </Link>
                        </li>
                        <li className="flex items-center">
                            <Icons.ChevronRight className="w-4 h-4 mx-2" />
                            <span className="text-text font-medium truncate max-w-xs">
                                {product.name}
                            </span>
                        </li>
                    </ol>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Sección de imágenes */}
                    {images.length > 0 && (
                        <>
                            {/* Mobile: slide horizontal con scroll-snap */}
                            <div className="lg:hidden space-y-3">
                                <div className="relative max-w-sm mx-auto">
                                    <div
                                        ref={scrollRef}
                                        className="overflow-x-auto snap-x snap-mandatory flex"
                                        style={{ scrollbarWidth: 'none' }}
                                    >
                                        {images.map((url, i) => (
                                            <div
                                                key={i}
                                                className="snap-start snap-always shrink-0 w-full"
                                            >
                                                <div className="aspect-square overflow-hidden m-1">
                                                    <img
                                                        src={url}
                                                        alt={`${product.name} - Vista ${i + 1}`}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Contador dinámico */}
                                    {images.length > 1 && (
                                        <div
                                            className="absolute top-3 left-3 bg-text text-white text-xs font-semibold px-2.5 py-1 rounded-md"
                                            aria-label={`Imagen ${selectedImage + 1} de ${images.length}`}
                                        >
                                            {selectedImage + 1} / {images.length}
                                        </div>
                                    )}
                                </div>
                                {images.length > 1 && (
                                    <div className="flex justify-center gap-2">
                                        {images.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => scrollToImage(i)}
                                                aria-label={`Ir a imagen ${i + 1}`}
                                                aria-current={selectedImage === i ? 'true' : undefined}
                                                className={`h-2.5 rounded-full transition-all ${selectedImage === i
                                                    ? 'w-6 bg-primary'
                                                    : 'w-2.5 bg-gray/30 hover:bg-gray/50'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Desktop: thumbnails verticales a la izquierda + imagen principal */}
                            <div className="hidden lg:flex flex-row gap-4 items-start">
                                {images.length > 1 && (
                                    <div className="flex flex-col gap-2 w-20 shrink-0">
                                        {images.map((url, i) => (
                                            <button
                                                key={i}
                                                onMouseEnter={() => setSelectedImage(i)}
                                                onClick={() => setSelectedImage(i)}
                                                onFocus={() => setSelectedImage(i)}
                                                aria-label={`Ver vista ${i + 1}`}
                                                aria-current={selectedImage === i ? 'true' : undefined}
                                                className={`aspect-square overflow-hidden transition-all cursor-pointer ${selectedImage === i
                                                    ? 'border-primary shadow-md'
                                                    : 'border-gray/30 hover:border-gray/50'
                                                    }`}
                                            >
                                                <img
                                                    src={url}
                                                    alt={`${product.name} - Vista ${i + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                                <div className="flex-1 overflow-hidden">
                                    <img
                                        src={images[selectedImage]}
                                        alt={product.name}
                                        className="w-full h-auto block"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Sección de información */}
                    <div className="space-y-6">
                        {/* Header del producto */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h1 className="text-3xl lg:text-4xl font-bold text-text mb-2">
                                    {product.name}
                                </h1>
                                <p className="text-lg text-gray">
                                    Categoría: <span className="font-medium text-text">{product.category}</span>
                                </p>
                            </div>
                            {product.featured && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                    ⭐ Destacado
                                </span>
                            )}
                        </div>

                        {/* Precio */}
                        <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-4xl lg:text-5xl font-bold text-primary">
                                {formatPrice(displayPrice)}
                            </span>
                            <span className="text-gray text-lg">c/u</span>
                        </div>

                        {/* Descripción */}
                        <div className="bg-backgroundb rounded-xl p-6 shadow-sm border border-gray/20">
                            <h2 className="text-xl font-semibold text-text mb-3">Descripción</h2>
                            <p className="text-text leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Selector de variantes */}
                        {hasVariants && (
                            <div className="bg-backgroundb rounded-xl p-6 shadow-sm border border-gray/20">
                                <h3 className="text-lg font-semibold text-text mb-3">Medida</h3>
                                <div className="relative max-w-xs">
                                    <select
                                        value={effectiveVariant.label}
                                        onChange={(e) => {
                                            const v = product.variant.find(v => v.label === e.target.value);
                                            setSelectedVariant(v);
                                        }}
                                        aria-label="Elegí una medida"
                                        className="w-full appearance-none cursor-pointer pl-3 pr-9 py-2.5 text-sm font-medium border border-gray/30 rounded-lg bg-backgroundb text-text hover:border-gray/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                                    >
                                        {product.variant.map((v) => (
                                            <option key={v.label} value={v.label}>
                                                {v.label}
                                            </option>
                                        ))}
                                    </select>
                                    <Icons.ChevronDown
                                        aria-hidden="true"
                                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Selector de cantidad */}
                        <div className="bg-backgroundb rounded-xl p-6 shadow-sm border border-gray/20">
                            <h3 className="text-lg font-semibold text-text mb-4">Cantidad</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray/40 rounded-lg">
                                    <button
                                        onClick={decreaseQuantity}
                                        className="p-3 hover:bg-backgroundc transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={quantity <= 1}
                                        aria-label="Disminuir cantidad"
                                    >
                                        <Icons.Minus className="w-5 h-5" />
                                    </button>
                                    <span className="px-6 py-3 font-semibold text-lg min-w-15 text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={increaseQuantity}
                                        className="p-3 hover:bg-backgroundc transition-colors"
                                        aria-label="Aumentar cantidad"
                                    >
                                        <Icons.Plus className="w-5 h-5" />
                                    </button>
                                </div>
                                <span className="text-gray">
                                    Total: <span className="font-semibold text-text">{formatPrice(displayPrice * quantity)}</span>
                                </span>
                            </div>
                        </div>


                        <a
                            href={buildWhatsappUrl(`Hola Marcelo, me interesa: ${product.name}${effectiveVariant ? ` - ${effectiveVariant.label}` : ''} (${formatPrice(displayPrice)}) x ${quantity} ${quantity === 1 ? 'unidad' : 'unidades'}.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-xl font-semibold shadow-sm text-lg bg-whatsapp text-white hover:brightness-90 transition-all text-center"
                            aria-label={`Consultar por ${product.name} por WhatsApp`}
                        >
                            <Icons.Whatsapp className="w-5 h-5 fill-white" />
                            Consultar por WhatsApp
                        </a>



                        {/* Información de contacto */}
                        <WhatsappCta title="¿No encontrás lo que buscás?">
                            Escribime y te ayudo a conseguir el producto que necesitás
                            para tu consultorio.
                        </WhatsappCta>
                    </div>
                </div>
            </div>
        </div>
    );
}