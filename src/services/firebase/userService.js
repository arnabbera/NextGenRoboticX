import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";
import { generateStudentId } from "./counterService";

/**
 * Get role from Firestore.
 * If email is listed in roles/admins -> admin
 * Otherwise -> student
 */
async function resolveUserRole(email) {
  try {
    const roleDoc = await getDoc(doc(db, "roles", "admins"));

    if (!roleDoc.exists()) {
      return "student";
    }

    const data = roleDoc.data();

    const admins = data.admins || [];
    const instructors = data.instructors || [];

    if (admins.includes(email)) {
      return "admin";
    }

    if (instructors.includes(email)) {
      return "instructor";
    }

    return "student";
  } catch (error) {
    console.error(error);
    return "student";
  }
}

/**
 * Creates user on first login
 * Updates login statistics on subsequent logins
 */
export async function createOrUpdateUser(firebaseUser) {
  if (!firebaseUser) {
    throw new Error("Firebase user is missing.");
  }

  const userRef = doc(db, "users", firebaseUser.uid);

  const snapshot = await getDoc(userRef);

  /*
   * Existing User
   */

  if (snapshot.exists()) {
    await updateDoc(userRef, {
      lastLogin: serverTimestamp(),
      loginCount: increment(1),
    });

    const updated = await getDoc(userRef);

    return updated.data();
  }

  /*
   * New User
   */

  const studentId = await generateStudentId();

  const role = await resolveUserRole(firebaseUser.email);

  const userData = {
    uid: firebaseUser.uid,

    studentId,

    displayName: firebaseUser.displayName || "",

    email: firebaseUser.email || "",

    photoURL: firebaseUser.photoURL || "",

    role,

    provider: "google",

    loginCount: 1,

    createdAt: serverTimestamp(),

    lastLogin: serverTimestamp(),

    isActive: true,

    profileCompleted: false,

    enrolledCourses: [],

    totalCertificates: 0,

    totalProjects: 0,

    totalLearningHours: 0,
  };

  await setDoc(userRef, userData);

  return userData;
}

/**
 * Returns Firestore profile
 */

export async function getUserProfile(uid) {
  const snapshot = await getDoc(doc(db, "users", uid));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}

/**
 * Update Profile
 */

export async function updateProfile(uid, data) {
  await updateDoc(doc(db, "users", uid), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Increment Learning Hours
 */

export async function addLearningHours(uid, hours) {
  await updateDoc(doc(db, "users", uid), {
    totalLearningHours: increment(hours),
  });
}

/**
 * Increment Project Count
 */

export async function incrementProjectCount(uid) {
  await updateDoc(doc(db, "users", uid), {
    totalProjects: increment(1),
  });
}

/**
 * Increment Certificate Count
 */

export async function incrementCertificateCount(uid) {
  await updateDoc(doc(db, "users", uid), {
    totalCertificates: increment(1),
  });
}