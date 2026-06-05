import { useState, useEffect } from 'react';

// Hook genérico para fetches asíncronos.
// Encapsula useState(loading/error), isMounted guard, try/catch/finally
// y limpia el estado al desmontar el componente.
//
// `fetcher(dataKey)` se invoca cada vez que cambia `dataKey` (puede ser un valor
// primitivo o un array de dependencias). Retorna { data, loading, error, refetch }.
//
//   const { data, loading, error } = useAsync(() => getProducts(), []);
//   const { data, loading, error } = useAsync((id) => getProductById(id), [id]);
//
export function useAsync(fetcher, deps = [], errorMessage = 'Error al cargar los datos') {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const run = async () => {
            try {
                setLoading(true);
                const result = await fetcher();
                if (isMounted) {
                    setData(result);
                    setError(null);
                }
            } catch (e) {
                console.error('error', e);
                if (isMounted) setError(errorMessage);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        run();
        return () => { isMounted = false };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return { data, loading, error };
}
