import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useProduct } from '../hooks/useProducts.js';
import { useCart } from '../hooks/useCart.js';
import { useToast } from '../context/ToastContext.jsx';
import { formatPrice } from '../utils/formatters.js';
import { Icons } from '../icons/IconLibrary.jsx';

export default function ProductPage() {
    const { id } = useParams();
    const { product, loading, error } = useProduct(id);
    const { addToCart } = useCart();
    const { showToast } = useToast();
    const [added, setAdded] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando producto...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Error</h1>
                    <p className="text-gray-600 mb-8">{error}</p>
                    <Link
                        to="/productos"
                        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Ver todos los productos
                    </Link>
                </div>
            </div>
        );
    }

    // Si no existe el producto
    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
                    <p className="text-gray-600 mb-8">El producto que buscas no existe o fue eliminado.</p>
                    <Link
                        to="/productos"
                        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Ver todos los productos
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        setAdded(true);
        showToast(`${quantity} × ${product.name} agregado${quantity > 1 ? 's' : ''} al carrito`, 'success');

        setTimeout(() => {
            setAdded(false);
        }, 2000);
    };

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <nav className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-4">
                    <ol className="flex items-center space-x-2 text-sm text-gray-600">
                        <li>
                            <Link to="/" className="hover:text-blue-600 transition-colors">
                                Inicio
                            </Link>
                        </li>
                        <li className="flex items-center">
                            <Icons.ChevronRight className="w-4 h-4 mx-2" />
                            <Link to="/productos" className="hover:text-blue-600 transition-colors">
                                Productos
                            </Link>
                        </li>
                        <li className="flex items-center">
                            <Icons.ChevronRight className="w-4 h-4 mx-2" />
                            <span className="text-gray-900 font-medium truncate max-w-xs">
                                {product.name}
                            </span>
                        </li>
                    </ol>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Sección de imágenes */}
                    <div className="space-y-4">
                        {/* Imagen principal */}
                        <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Miniaturas (placeholder para futuro) */}
                        <div className="grid grid-cols-4 gap-2">
                            {[1, 2, 3, 4].map((index) => (
                                <div
                                    key={index}
                                    className={`aspect-square bg-white rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${selectedImage === index - 1
                                        ? 'border-blue-600 shadow-md'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => setSelectedImage(index - 1)}
                                >
                                    <img
                                        src={product.image}
                                        alt={`${product.name} - Vista ${index}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sección de información */}
                    <div className="space-y-6">
                        {/* Header del producto */}
                        <div>
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                        {product.name}
                                    </h1>
                                    <p className="text-lg text-gray-600">
                                        Categoría: <span className="font-medium text-gray-900">{product.category}</span>
                                    </p>
                                </div>
                                {product.featured && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        ⭐ Destacado
                                    </span>
                                )}
                            </div>

                            {/* Precio */}
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-4xl lg:text-5xl font-bold text-blue-600">
                                    {formatPrice(product.price)}
                                </span>
                                <span className="text-gray-500 text-lg">c/u</span>
                            </div>
                        </div>

                        {/* Descripción */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Descripción</h2>
                            <p className="text-gray-700 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Selector de cantidad */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cantidad</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                        onClick={decreaseQuantity}
                                        className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={quantity <= 1}
                                        aria-label="Disminuir cantidad"
                                    >
                                        <Icons.Minus className="w-5 h-5" />
                                    </button>
                                    <span className="px-6 py-3 font-semibold text-lg min-w-[60px] text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={increaseQuantity}
                                        className="p-3 hover:bg-gray-100 transition-colors"
                                        aria-label="Aumentar cantidad"
                                    >
                                        <Icons.Plus className="w-5 h-5" />
                                    </button>
                                </div>
                                <span className="text-gray-600">
                                    Total: <span className="font-semibold text-gray-900">{formatPrice(product.price * quantity)}</span>
                                </span>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={added}
                                className={`flex-1 py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform ${added
                                    ? 'bg-green-600 text-white scale-105 cursor-default'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5'
                                    } disabled:opacity-75`}
                                aria-label={added ? 'Producto agregado' : `Agregar ${quantity} unidades al carrito`}
                            >
                                {added ? (
                                    <span className="flex items-center justify-center gap-2">
                                        ✓ ¡Agregado al carrito!
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <Icons.Cart className="w-6 h-6" />
                                        Agregar al carrito
                                    </span>
                                )}
                            </button>

                            <Link
                                to="/carrito"
                                className="py-4 px-8 rounded-xl font-semibold shadow-sm text-lg bg-gray-300 border-gray-300 text-gray-800 hover:bg-gray-200 transition-colors text-center"
                            >
                                Ir al carrito
                            </Link>
                        </div>

                        {/* Características adicionales */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                                <div className="text-2xl mb-2">🚚</div>
                                <p className="text-sm font-medium text-gray-900">Envío a todo el país</p>
                                <p className="text-xs text-gray-600 mt-1">Consultar costos</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                                <div className="text-2xl mb-2">💳</div>
                                <p className="text-sm font-medium text-gray-900">Múltiples formas de pago</p>
                                <p className="text-xs text-gray-600 mt-1">Transferencia o efectivo</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                                <div className="text-2xl mb-2">✅</div>
                                <p className="text-sm font-medium text-gray-900">Garantía de calidad</p>
                                <p className="text-xs text-gray-600 mt-1">Productos certificados</p>
                            </div>
                        </div>

                        {/* Información de contacto */}
                        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                            <h3 className="text-lg font-semibold text-blue-900 mb-3">¿Necesitas asesoramiento?</h3>
                            <p className="text-blue-800 mb-4">
                                Mandame mensaje por WhatsApp o Email y te ayudo a elegir el mejor producto para vos.
                            </p>
                            <Link
                                to="/contacto"
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Contacto
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}