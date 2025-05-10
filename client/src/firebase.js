// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "recipe-sharing-platform-5fbc6.firebaseapp.com",
  projectId: "recipe-sharing-platform-5fbc6",
  storageBucket: "recipe-sharing-platform-5fbc6.firebasestorage.app",
  messagingSenderId: "997659776387",
  appId: "1:997659776387:web:bd17027a49686700fa12b6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);