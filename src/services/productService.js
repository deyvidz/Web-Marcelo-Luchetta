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