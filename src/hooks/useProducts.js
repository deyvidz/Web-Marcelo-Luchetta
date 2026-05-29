import { useState, useEffect, useRef } from "react";
import { getProducts, getProductById, getFeaturedProducts, getProductsByCategory, getSearchProducts, getProductsWithFilters, getCategories } from "../services/productService";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts();
                setProducts(data);
                setError(null);
            } catch (e) {
                console.error('error', e);
                setError('Error al cargar los productos');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts()
    }, []);
    return { products, loading, error }
}

export const useProduct = (id) => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductById(id);
                setProduct(data);
                setError(null);
            } catch (e) {
                console.error('error', e);
                setError('Error al cargar el producto')
            } finally {
                setLoading(false)
            }
        };
        fetchProduct();
    }, [id]);
    return { product, loading, error };
}

export const useFeaturedProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getFeaturedProducts();
                setProducts(data);
                setError(null);
            } catch (e) {
                console.error('error', e);
                setError('Error al cargar los productos')
            } finally {
                setLoading(false)
            }
        };
        fetchProduct();
    }, []);
    return { products, loading, error };
}
export const useProductByCategory = (category, limitNum = 4) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!category) {
            setProducts([]);
            setLoading(false);
            return;
        }
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductsByCategory(category, limitNum);
                setProducts(data);
                setError(null);
            } catch (e) {
                console.error('error', e);
                setError('Error al cargar los productos')
            } finally {
                setLoading(false)
            }
        };
        fetchProduct();
    }, [category, limitNum]);
    return { products, loading, error };
}

export const useSearchProducts = (name) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!name) {
            setProducts([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        {/*debounce de 500 ms */}
        const fetchProduct = setTimeout(async () => {
            try {
                
                const data = await getSearchProducts(name);
                setProducts(data);
                setError(null);
            } catch (e) {
                console.error('error', e);
                setError('Error al cargar los productos')
            } finally {
                setLoading(false)
            }
        }, 500);
        return () => clearTimeout(fetchProduct);

    }, [name]);
    return { products, loading, error };
}

// Hook para listar todas las categorías disponibles (independiente de los filtros activos)
export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = await getCategories();
                if (isMounted) {
                    setCategories(data);
                    setError(null);
                }
            } catch (e) {
                console.error('error', e);
                if (isMounted) setError('Error al cargar las categorías');
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchCategories();
        return () => { isMounted = false };
    }, []);

    return { categories, loading, error };
}

// Hook para consultar productos según filtros (categoria, marca, nombre) — pensado para leer params desde URL
export const useProductsFiltered = (filters = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const filtersKey = JSON.stringify(filters);

    // Dependemos intencionadamente de la serialización de `filters`.
    // Usamos lastKeyRef para evitar refetches redundantes si algo provoca re-ejecución sin cambio real.
    const lastKeyRef = useRef();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (filtersKey === lastKeyRef.current) return; // no change, evita re-fetch
        lastKeyRef.current = filtersKey;

        console.debug('[useProductsFiltered] fetching with key', filtersKey);
        let isMounted = true;
        const fetch = async () => {
            try {
                setLoading(true);
                const data = await getProductsWithFilters(filters);
                console.debug('[useProductsFiltered] fetched', data.length, 'items');
                if (isMounted) {
                    setProducts(data);
                    setError(null);
                }
            } catch (e) {
                console.error('error', e);
                if (isMounted) setError('Error al cargar los productos');
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetch();
        return () => { isMounted = false };
    }, [filtersKey]);

    return { products, loading, error };
}