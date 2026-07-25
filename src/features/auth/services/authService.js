import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../firebase/firebase";

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    return result.user;
  } catch (error) {
    throw error;
  }
}