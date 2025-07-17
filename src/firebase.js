// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'; // ✅ importa auth

const firebaseConfig = {
  apiKey: "AIzaSyDMJEIXAIiykoE1Q7rwxNLWhDavktS0zAY",
  authDomain: "pandero-digital.firebaseapp.com",
  projectId: "pandero-digital",
  storageBucket: "pandero-digital.firebasestorage.app",
  messagingSenderId: "553721776885",
  appId: "1:553721776885:web:c17fe1c409003a2a9b93bc"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); // ✅ ahora está exportado
export const provider = new GoogleAuthProvider(); // ✅ proveedor para login con Google
