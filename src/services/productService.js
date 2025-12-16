import { collection, getDocs, doc,getDoc, query, where, limit } from 'firebase/firestore';
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
        console.error('Error al obtener los productos:', error);
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
        console.log('error al obtener productos', e);
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
        console.log('error al obtener productos destacados', e);
        return [];
    }
};