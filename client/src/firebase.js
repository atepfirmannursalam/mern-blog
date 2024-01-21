// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-6f7aa.firebaseapp.com",
  projectId: "mern-blog-6f7aa",
  storageBucket: "mern-blog-6f7aa.appspot.com",
  messagingSenderId: "1002959562612",
  appId: "1:1002959562612:web:ca35ba84dd9ef3c01eee21",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
