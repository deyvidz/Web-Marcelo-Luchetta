import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/features/ProductList.jsx';
import { useProductsFiltered, useCategories, useBrands } from '../hooks/useProducts.js';
import SearchBar from '../components/layout/SearchBar.jsx';
import { Icons } from '../icons/IconLibrary.jsx';
import { FILTER_KEYS, FILTER_LABELS, PRICE_RANGES, getActivePriceLabel } from '../utils/filterConfig.js';
import RadioRow from '../components/features/filters/RadioRow.jsx';
import FilterChip from '../components/features/filters/FilterChip.jsx';
import FilterSection from '../components/features/filters/FilterSection.jsx';

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterOpen, setFilterOpen] = useState(false);

    // leer filtros por URL, proporcionar valores predeterminados
    const categoriaParam = searchParams.get(FILTER_KEYS.categoria) || '';
    const marcaParam = searchParams.get(FILTER_KEYS.marca) || '';
    const nombreParam = searchParams.get(FILTER_KEYS.nombre) || '';
    const precioParam = searchParams.get(FILTER_KEYS.precio) || '';

    const filters = useMemo(
        () => ({ categoria: categoriaParam, marca: marcaParam, nombre: nombreParam }),
        [categoriaParam, marcaParam, nombreParam]
    );

    const { products, loading, error } = useProductsFiltered(filters);
    const { categories: allCategories } = useCategories();
    const { brands: allBrands } = useBrands();

    // Listado de categorías (viene de Firestore, fallback a productos cargados)
    const categories = useMemo(() => {
        return allCategories.length > 0
            ? allCategories
            : [...new Set(products.map(p => p.category).filter(Boolean))];
    }, [allCategories, products]);

    // Listado de marcas (idem, independiente de los filtros activos)
    const brands = useMemo(() => {
        return allBrands.length > 0
            ? allBrands
            : [...new Set(products.map(p => p.brand).filter(Boolean))].sort(
                (a, b) => a.localeCompare(b, 'es')
            );
    }, [allBrands, products]);

    // Aplica filtro de precio en el cliente (Firestore no soporta range queries con otros where sin índice compuesto)
    const priceFilteredProducts = useMemo(() => {
        if (!precioParam) return products;
        const range = PRICE_RANGES.find(r => r.id === precioParam);
        if (!range) return products;
        return products.filter(p => p.price >= range.min && p.price < range.max);
    }, [products, precioParam]);

    // Filtrar productos por categoría
    const filteredProducts = useMemo(() => {
        if (!categoriaParam) return priceFilteredProducts;
        return priceFilteredProducts.filter(product => product.category === categoriaParam);
    }, [categoriaParam, priceFilteredProducts]);


    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    const setParam = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (!value) params.delete(key);
        else params.set(key, value);
        setSearchParams(params);
    };

    // Handler genérico para radios: tocar el activo lo deselecciona
    const handleRadioChange = (key, current, value) => {
        setParam(key, current === value ? '' : value);
        setFilterOpen(false);
    };

    const handleSearchChange = (query) => {
        setParam(FILTER_KEYS.nombre, query);
    };

    const handleClearFilters = () => {
        setSearchParams(new URLSearchParams());
        setFilterOpen(false);
    };

    // Listas de radios
    const categoryList = (
        <div className="space-y-3">
            {categories.map(cat => (
                <RadioRow
                    key={cat}
                    name={FILTER_KEYS.categoria}
                    value={cat}
                    current={categoriaParam}
                    onChange={(v) => handleRadioChange(FILTER_KEYS.categoria, categoriaParam, v)}
                >
                    {cat}
                </RadioRow>
            ))}
        </div>
    );

    const brandList = (
        <div className="space-y-3">
            {brands.map(brand => (
                <RadioRow
                    key={brand}
                    name={FILTER_KEYS.marca}
                    value={brand}
                    current={marcaParam}
                    onChange={(v) => handleRadioChange(FILTER_KEYS.marca, marcaParam, v)}
                >
                    {brand}
                </RadioRow>
            ))}
        </div>
    );

    const priceList = (
        <div className="space-y-3">
            {PRICE_RANGES.map(range => (
                <RadioRow
                    key={range.id}
                    name={FILTER_KEYS.precio}
                    value={range.id}
                    current={precioParam}
                    onChange={(v) => handleRadioChange(FILTER_KEYS.precio, precioParam, v)}
                >
                    {range.label}
                </RadioRow>
            ))}
        </div>
    );

    const hasActiveFilter = Boolean(categoriaParam || marcaParam || nombreParam || precioParam);
    const activePriceLabel = getActivePriceLabel(precioParam);

    // Chips de filtros activos (categoria, marca, precio)
    const activeChips = [
        categoriaParam && {
            key: FILTER_KEYS.categoria,
            label: categoriaParam,
            onRemove: () => setParam(FILTER_KEYS.categoria, ''),
        },
        marcaParam && {
            key: FILTER_KEYS.marca,
            label: marcaParam,
            onRemove: () => setParam(FILTER_KEYS.marca, ''),
        },
        precioParam && activePriceLabel && {
            key: FILTER_KEYS.precio,
            label: activePriceLabel,
            onRemove: () => setParam(FILTER_KEYS.precio, ''),
            ariaLabel: 'Quitar filtro de precio',
        },
    ].filter(Boolean);

    return (
        <div className="min-h-screen py-12 md:py-16 px-4 max-w-7xl mx-auto">
            {/* Barra de busqueda */}
            <div className="flex flex-wrap justify-center mb-6">
                <SearchBar value={nombreParam} onSearchChange={handleSearchChange} />
            </div>

            {/* Chips de filtros activos (debajo del SearchBar) */}
            {activeChips.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                    {activeChips.map(chip => (
                        <FilterChip
                            key={chip.key}
                            label={chip.label}
                            onRemove={chip.onRemove}
                            ariaLabel={chip.ariaLabel}
                        />
                    ))}
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-8 md:gap-10">
                {/* Filtros mobile - acordeón */}
                <div className="md:hidden mb-6">
                    <div className="relative flex items-center justify-center">
                        <button
                            type="button"
                            onClick={() => setFilterOpen(prev => !prev)}
                            className="w-full flex items-center justify-center gap-2 text-primary font-bold py-3"
                            aria-expanded={filterOpen}
                            aria-controls="mobile-filters"
                        >
                            {FILTER_LABELS.filtros}
                            <Icons.ChevronRight
                                className={`w-4 h-4 transition-transform duration-300 ${filterOpen ? 'rotate-90' : ''}`}
                            />
                        </button>
                        {hasActiveFilter && (
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="absolute right-0 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                            >
                                {FILTER_LABELS.limpiarFiltros}
                            </button>
                        )}
                    </div>

                    <div
                        id="mobile-filters"
                        className={`grid transition-all duration-500 ease-in-out ${
                            filterOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
                        }`}
                    >
                        <div className="overflow-hidden pl-2 border-l border-gray-300">
                            <FilterSection title={FILTER_LABELS.categoria}>{categoryList}</FilterSection>
                            <FilterSection title={FILTER_LABELS.marca} className="mt-6">{brandList}</FilterSection>
                            <FilterSection title={FILTER_LABELS.precio} className="mt-6">{priceList}</FilterSection>
                        </div>
                    </div>
                </div>

                {/* Sidebar de filtros - desktop */}
                <aside className="hidden md:block w-56 lg:w-64 shrink-0">
                    {/* Espacio reservado para "Limpiar filtros" — evita que el aside salte de altura */}
                    <div className="min-h-7 mb-2">
                        {hasActiveFilter && (
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                            >
                                {FILTER_LABELS.limpiarFiltros}
                            </button>
                        )}
                    </div>

                    <FilterSection title={FILTER_LABELS.categoria}>{categoryList}</FilterSection>
                    <FilterSection title={FILTER_LABELS.marca} className="mt-8">{brandList}</FilterSection>
                    <FilterSection title={FILTER_LABELS.precio} className="mt-8">{priceList}</FilterSection>
                </aside>

                {/* Lista de productos */}
                <section className="flex-1 min-w-0">
                    <ProductList
                        products={filteredProducts}
                        isLoading={loading}
                    />
                </section>
            </div>
        </div>
    );
}
