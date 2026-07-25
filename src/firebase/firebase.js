import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_QycGv-_ie0OV2Q5lkXaqPU1pUaF8rz4",
  authDomain: "nextgenroboticx.firebaseapp.com",
  projectId: "nextgenroboticx",
  storageBucket: "nextgenroboticx.firebasestorage.app",
  messagingSenderId: "428168842542",
  appId: "1:428168842542:web:5ff2c0af0dafa73f43bebf",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();