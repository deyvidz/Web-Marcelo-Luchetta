import { useState, useEffect, useRef } from 'react';
import { getCategories, getBrands, getProductsWithFilters } from '../services/productService';
import { useAsync } from './useAsync.js';

const ERR_CATEGORIES = 'Error al cargar las categorías';
const ERR_BRANDS = 'Error al cargar las marcas';
const ERR_FILTERED = 'Error al cargar los productos';

// useCategories: lista completa de categorías (independiente de filtros activos)
export const useCategories = () => {
    const { data, loading, error } = useAsync(getCategories, [], ERR_CATEGORIES);
    return { categories: data ?? [], loading, error };
};

// useBrands: lista completa de marcas (independiente de filtros activos)
export const useBrands = () => {
    const { data, loading, error } = useAsync(getBrands, [], ERR_BRANDS);
    return { brands: data ?? [], loading, error };
};

// useProductsFiltered: con cache por filtersKey para evitar refetches redundantes.
// Serializa `filters` para detectar cambios reales (el objeto podría re-crearse en
// cada render aunque su contenido sea el mismo).
export const useProductsFiltered = (filters = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const filtersKey = JSON.stringify(filters);
    const lastKeyRef = useRef();

    useEffect(() => {
        if (filtersKey === lastKeyRef.current) return;
        lastKeyRef.current = filtersKey;

        let isMounted = true;
        const fetch = async () => {
            try {
                setLoading(true);
                const data = await getProductsWithFilters(filters);
                if (isMounted) {
                    setProducts(data);
                    setError(null);
                }
            } catch (e) {
                console.error('error', e);
                if (isMounted) setError(ERR_FILTERED);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetch();
        return () => { isMounted = false };
    }, [filtersKey]);

    return { products, loading, error };
};
