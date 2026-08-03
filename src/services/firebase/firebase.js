// ============================================
// NextGenRoboticX Firebase Configuration
// ============================================

// Firebase Core
import { initializeApp } from "firebase/app";

// Firebase Authentication
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firestore Database
import { getFirestore } from "firebase/firestore";

// Firebase Storage
import { getStorage } from "firebase/storage";

// ============================================
// Firebase Configuration
// ============================================

const firebaseConfig = {
  apiKey: "AIzaSyC_QycGv-_ie0OV2Q5lkXaqPU1pUaF8rz4",
  authDomain: "nextgenroboticx.firebaseapp.com",
  projectId: "nextgenroboticx",
  storageBucket: "nextgenroboticx.firebasestorage.app",
  messagingSenderId: "428168842542",
  appId: "1:428168842542:web:5ff2c0af0dafa73f43bebf",
};

// ============================================
// Initialize Firebase
// ============================================

const app = initializeApp(firebaseConfig);

// ============================================
// Firebase Services
// ============================================

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();

// Always ask Google to let the user choose an account
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// ============================================
// Export Firebase App
// ============================================

export default app;