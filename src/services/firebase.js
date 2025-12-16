import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBPiTRg86J4eUkyGTClDGN1RfZwa5C-HWw",
    authDomain: "paginamarcelo-c3ada.firebaseapp.com",
    projectId: "paginamarcelo-c3ada",
    storageBucket: "paginamarcelo-c3ada.firebasestorage.app",
    messagingSenderId: "387159020292",
    appId: "1:387159020292:web:1c55aa9f1880dcbc943651",
    measurementId: "G-PHWDMBKRPG"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
