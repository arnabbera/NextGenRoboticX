import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

import { auth, googleProvider } from "./firebase";
import {
  createOrUpdateUser,
  getUserProfile,
} from "./userService";

/**
 * Google Login
 */
export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);

  const firebaseUser = result.user;

  // Create Firestore user OR update login statistics
  const profile = await createOrUpdateUser(firebaseUser);

  return {
    firebaseUser,
    profile,
  };
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

  const profile = await createOrUpdateUser(result.user);

  return {
    firebaseUser: result.user,
    profile,
  };
}

/**
 * Register
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

  const profile = await createOrUpdateUser(result.user);

  return {
    firebaseUser: result.user,
    profile,
  };
}

/**
 * Logout
 */
export async function logout() {
  await signOut(auth);
}

/**
 * Password Reset
 */
export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Returns current Firebase user
 */
export function getCurrentUser() {
  return auth.currentUser;
}

/**
 * Returns Firestore profile
 */
export async function getCurrentUserProfile() {
  if (!auth.currentUser) {
    return null;
  }

  return await getUserProfile(auth.currentUser.uid);
}

/**
 * Update Firebase profile
 */
export async function updateUserProfile(profile) {
  if (!auth.currentUser) {
    throw new Error("No authenticated user.");
  }

  await updateProfile(auth.currentUser, profile);
}

/**
 * Auth Listener
 */
export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, callback);
}