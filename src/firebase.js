import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDNTbG7gTCRNGP9_fF4Rohl7vR83mKL5ug",
  authDomain: "pokanipro.firebaseapp.com",
  projectId: "pokanipro",
  storageBucket: "pokanipro.firebasestorage.app",
  messagingSenderId: "1043317640536",
  appId: "1:1043317640536:web:45d6cf9cc1c7ce104e692d",
  measurementId: "G-LT64J969Z2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
