import { auth, googleProvider } from "../firebase/firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Google Login
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Logout
export const logout = async () => {
  await signOut(auth);
};

// Current User
export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};