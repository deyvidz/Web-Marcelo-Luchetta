import { useState, useEffect } from 'react';
import { getBanners } from '../services/productService';

// Hook para cargar banners desde Firestore
export const useBanners = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchbanners = async () => {
            try {
                setLoading(true);
                const data = await getBanners();
                setBanners(data);
                setError(null);
            } catch (e) {
                console.error('error', e);
                setError('Error al cargar los banners');
            } finally {
                setLoading(false);
            }
        };
        fetchbanners()
    }, []);
    return { banners, loading, error }
}
