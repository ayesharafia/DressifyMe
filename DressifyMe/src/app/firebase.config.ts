// src/app/firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCefquw9ChsBNjHEJOygmCj0NJRiRfpXV0",
  authDomain: "dressifyme-557a3.firebaseapp.com",
  projectId: "dressifyme-557a3",
  storageBucket: "dressifyme-557a3.firebasestorage.app",
  messagingSenderId: "1040537028282",
  appId: "1:1040537028282:web:055486f531abc9ff0c6483"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);