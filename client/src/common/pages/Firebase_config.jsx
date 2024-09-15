// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6LZITF5pLhKQZRC_rpzqyeQy_uo3OvJA",
  authDomain: "ecommerce-86da8.firebaseapp.com",
  projectId: "ecommerce-86da8",
  storageBucket: "ecommerce-86da8.appspot.com",
  messagingSenderId: "397280818461",
  appId: "1:397280818461:web:cfe34d9d835f4b2b52ddf4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider(); // 
