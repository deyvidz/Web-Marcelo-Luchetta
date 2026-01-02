import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export const saveContactMessage = async (data) => {
  await addDoc(collection(db, "contactMessages"), {
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    createdAt: serverTimestamp(),
  });
};