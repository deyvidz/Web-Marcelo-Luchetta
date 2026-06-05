import { useState, useEffect } from 'react';
import { getProducts, getProductById, getFeaturedProducts, getProductsByCategory, getSearchProducts } from '../services/productService';
import { useAsync } from './useAsync.js';

const ERR_PRODUCTS = 'Error al cargar los productos';
const ERR_PRODUCT = 'Error al cargar el producto';

// useProducts: lista completa
export const useProducts = () => {
    const { data, loading, error } = useAsync(getProducts, [], ERR_PRODUCTS);
    return { products: data ?? [], loading, error };
};

// useProduct: detalle por id
export const useProduct = (id) => {
    const { data, loading, error } = useAsync(() => getProductById(id), [id], ERR_PRODUCT);
    return { product: data, loading, error };
};

// useFeaturedProduct: productos destacados
export const useFeaturedProduct = () => {
    const { data, loading, error } = useAsync(() => getFeaturedProducts(), [], ERR_PRODUCTS);
    return { products: data ?? [], loading, error };
};

// useProductByCategory: por categoría (con early-return si no hay categoría)
export const useProductByCategory = (category, limitNum = 4) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        if (!category) {
            setProducts([]);
            setLoading(false);
            return () => { isMounted = false };
        }
        const fetch = async () => {
            try {
                setLoading(true);
                const data = await getProductsByCategory(category, limitNum);
                if (isMounted) setProducts(data);
            } catch (e) {
                console.error('error', e);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetch();
        return () => { isMounted = false };
    }, [category, limitNum]);

    return { products, loading, error: null };
};

// useSearchProducts: con debounce de 500ms
export const useSearchProducts = (name) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!name) {
            setProducts([]);
            setLoading(false);
            return;
        }
        let isMounted = true;
        setLoading(true);
        const timeoutId = setTimeout(async () => {
            try {
                const data = await getSearchProducts(name);
                if (isMounted) setProducts(data);
            } catch (e) {
                console.error('error', e);
            } finally {
                if (isMounted) setLoading(false);
            }
        }, 500);
        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, [name]);

    return { products, loading, error: null };
};
