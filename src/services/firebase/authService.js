import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

/**
 * Google Sign-In
 */
export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

/**
 * Email Login
 */
export async function login(email, password) {
  const result = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return result.user;
}

/**
 * Register User
 */
export async function register(name, email, password) {
  const result = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  if (name) {
    await updateProfile(result.user, {
      displayName: name,
    });
  }

  return result.user;
}

/**
 * Logout
 */
export async function logout() {
  await signOut(auth);
}

/**
 * Reset Password
 */
export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Update Profile
 */
export async function updateUserProfile(profile) {
  if (!auth.currentUser) {
    throw new Error("No authenticated user found.");
  }

  await updateProfile(auth.currentUser, profile);
}

/**
 * Current User
 */
export function getCurrentUser() {
  return auth.currentUser;
}

/**
 * Auth State Listener
 */
export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, callback);
}