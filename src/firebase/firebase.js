import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_QycGv-_ie0OV2Q5lkXaqPU1pUaF8rz4",
  authDomain: "nextgenroboticx.firebaseapp.com",
  projectId: "nextgenroboticx",
  storageBucket: "nextgenroboticx.firebasestorage.app",
  messagingSenderId: "428168842542",
  appId: "1:428168842542:web:5ff2c0af0dafa73f43bebf",
};

const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);

// Google Login Provider
export const googleProvider = new GoogleAuthProvider();

// Firestore Database
export const db = getFirestore(app);

export default app;