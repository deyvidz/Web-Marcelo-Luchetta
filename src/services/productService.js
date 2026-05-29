import { collection, getDocs, doc,getDoc, query, where, limit, orderBy } from 'firebase/firestore';
import { db } from './firebase';

export const getProducts = async () => {
    try {
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);
        const products = snapshot.docs.map(doc =>({
            id: doc.id,
            ...doc.data()
        }))
        return products;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return [];
    }
};

export const getProductById = async (id) => {
    try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data()
            }
        } else return null;
    } catch (e) {
        console.log('Error al obtener producto', e);
        return null;
    }
};
export const getFeaturedProducts = async (limitNum = 6) => {
    try {
        // Consulta sin orderBy para evitar requerimiento de índice compuesto.
        const q = query(collection(db, 'products'), where('featured', '==', true), limit(limitNum));
        const snapshot = await getDocs(q);
        const products = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        return products;
    } catch (e) {
        console.log('Error al obtener productos destacados', e);
        return [];
    }
};
export const getProductsByCategory = async (category, limitNum = 4) => {
    try {
        // Consulta sin orderBy para evitar requerimiento de índice compuesto.
        const q = query(collection(db, 'products'), where('category', '==', category), limit(limitNum));
        const snapshot = await getDocs(q);
        const products = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        return products;
    } catch (e) {
        console.log('Error al obtener productos', e);
        return [];
    }
};

export const getSearchProducts = async (name) => {
    //TODO: implementar KEYWORDS como en KYTINON pasta/membrana, reemplazar name_lower por '"keywords", "array-contains"'
            try {
                const q = query(
                    collection(db, "products"),
                    orderBy("name_lower"),
                    where("name_lower", ">=", name),
                    where("name_lower", "<=", name + "\uf8ff"),
                    limit(10)
                );
                const snapshot = await getDocs(q);
                const products = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
                return products;    
            } catch (err) {
                console.error('Error al buscar productos', err);
                return [];
            }
        };

        export const getProductsWithFilters = async ({ categoria, marca, nombre, limitNum = 50 } = {}) => {
            try {
                const constraintsBase = [];
                const col = collection(db, 'products');

                if (categoria) {
                    constraintsBase.push(where('category', '==', categoria));
                }
                if (marca) {
                    constraintsBase.push(where('brand', '==', marca));
                }

                if (nombre) {
                    const tokens = nombre.toLowerCase().split(/\s+/).filter(Boolean);
                    try {
                        const constraints = [...constraintsBase];
                        if (tokens.length === 1) {
                            // Single token:  array-contains para tokens exactos en keywords
                            constraints.push(where('keywords', 'array-contains', tokens[0]));
                        } else {
                            // Multiple tokens: array-contains-any
                            const anyTokens = tokens.slice(0, 10);
                            constraints.push(where('keywords', 'array-contains-any', anyTokens));
                        }
                        constraints.push(limit(limitNum));
                        const q = query(col, ...constraints);
                        const snapshot = await getDocs(q);
                        const products = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

                        // Si encuentra resultados en Keywords, los retorna
                        if (products.length > 0) return products;
                    } catch (err) {
                        // La consulta por palabra clave puede fallar si el campo/índice no existe; ignorar y usar una alternativa.
                        console.warn('La búsqueda por palabra clave falló o no arrojó resultados, recurriendo a la búsqueda de subcadenas:', err);
                    }

                    // Fallback: obtener por restricciones base (categoría/marca) y filtrar del lado del cliente por coincidencia de subcadena en name_lower
                    try {
                        const constraints = [...constraintsBase, limit(limitNum)];
                        const q = query(col, ...constraints);
                        const snapshot = await getDocs(q);
                        const all = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
                        const needle = nombre.toLowerCase();
                        const filtered = all.filter(p => (p.name_lower || (p.name || '')).toLowerCase().includes(needle));
                        return filtered.slice(0, limitNum);
                    } catch (err) {
                        console.error('Fallback substring search failed:', err);
                        return [];
                    }
                }

                // Si no encuentra por nombre, usar base constraints
                const q = query(col, ...constraintsBase, limit(limitNum));
                const snapshot = await getDocs(q);
                const products = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
                return products;
            } catch (err) {
                console.error('Error al obtener productos con filtros:', err);
                return [];
            }
        };

// Lee la colección `categories` (cada doc debe tener un campo `name`).
// Se mantiene aparte de `products` para que el listado de categorías no dependa
// de los productos cargados/filtrados en pantalla.
export const getCategories = async () => {
    try {
        const snapshot = await getDocs(collection(db, 'categories'));
        return snapshot.docs
            .map(d => d.data().name)
            .filter(Boolean)
            .sort((a, b) => a.localeCompare(b, 'es'));
    } catch (e) {
        console.error('Error al obtener categorías:', e);
        return [];
    }
};

export const getBanners = async () => {
    try {
        const bannersRef = collection(db, 'banners');
        const snapshot = await getDocs(bannersRef);
        const banners = snapshot.docs.map(doc =>({
            id: doc.id,
            ...doc.data()
        }))
        return banners;
    } catch (error) {
        console.error('Error al obtener banners:', error);
        return [];
    }
};