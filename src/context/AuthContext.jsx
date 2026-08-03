import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  signInWithGoogle,
  login,
  register,
  logout,
  subscribeToAuthChanges,
  getCurrentUserProfile,
} from "../services/firebase/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Listen for Firebase Authentication changes
   */
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      setUser(firebaseUser);

      try {
        const firestoreProfile = await getCurrentUserProfile();
        setProfile(firestoreProfile);
      } catch (error) {
        console.error("Failed to load profile", error);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  /**
   * Google Login
   */
  async function loginWithGoogle() {
    setLoading(true);

    try {
      const result = await signInWithGoogle();

      setUser(result.firebaseUser);
      setProfile(result.profile);

      return result;
    } finally {
      setLoading(false);
    }
  }

  /**
   * Logout
   */
  async function logoutUser() {
    await logout();

    setUser(null);
    setProfile(null);
  }

  const value = {
    user,
    profile,
    loading,

    login,
    register,

    loginWithGoogle,

    logout: logoutUser,

    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}