import { useState, useEffect } from "react";
import { getProducts, getProductById, getFeaturedProducts, getProductsByCategory, getSearchProducts } from "../services/productService";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!name) {
            setProducts([]);
            setLoading(false);
            return;
        }
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getSearchProducts(name);
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
    }, [name]);
    return { products, loading, error };
}