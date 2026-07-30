// Firebase Core
import { initializeApp } from "firebase/app";

// Firebase Authentication
import { getAuth } from "firebase/auth";

// Firestore Database
import { getFirestore } from "firebase/firestore";

// Cloud Storage
import { getStorage } from "firebase/storage";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_QycGv-_ie0OV2Q5lkXaqPU1pUaF8rz4",
  authDomain: "nextgenroboticx.firebaseapp.com",
  projectId: "nextgenroboticx",
  storageBucket: "nextgenroboticx.firebasestorage.app",
  messagingSenderId: "428168842542",
  appId: "1:428168842542:web:5ff2c0af0dafa73f43bebf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export
export { app, auth, db, storage };
export default app;