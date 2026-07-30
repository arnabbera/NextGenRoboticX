import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const COURSE_COLLECTION = "courses";
const courseCollectionRef = collection(db, COURSE_COLLECTION);

/**
 * Create a new course
 */
export async function createCourse(courseData) {
  try {
    const docRef = await addDoc(courseCollectionRef, {
      ...courseData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      id: docRef.id,
    };
  } catch (error) {
    console.error("createCourse:", error);

    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Get all courses
 */
export async function getCourses() {
  try {
    const snapshot = await getDocs(courseCollectionRef);

    const courses = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      success: true,
      data: courses,
    };
  } catch (error) {
    console.error("getCourses:", error);

    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Get published courses
 */
export async function getPublishedCourses() {
  try {
    const q = query(
      courseCollectionRef,
      where("published", "==", true)
    );

    const snapshot = await getDocs(q);

    const courses = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      success: true,
      data: courses,
    };
  } catch (error) {
    console.error("getPublishedCourses:", error);

    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Get featured courses
 */
export async function getFeaturedCourses() {
  try {
    const q = query(
      courseCollectionRef,
      where("featured", "==", true),
      where("published", "==", true)
    );

    const snapshot = await getDocs(q);

    const courses = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      success: true,
      data: courses,
    };
  } catch (error) {
    console.error("getFeaturedCourses:", error);

    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Get single course
 */
export async function getCourse(courseId) {
  try {
    const courseRef = doc(db, COURSE_COLLECTION, courseId);

    const snapshot = await getDoc(courseRef);

    if (!snapshot.exists()) {
      return {
        success: false,
        error: "Course not found.",
      };
    }

    return {
      success: true,
      data: {
        id: snapshot.id,
        ...snapshot.data(),
      },
    };
  } catch (error) {
    console.error("getCourse:", error);

    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Update course
 */
export async function updateCourse(courseId, updates) {
  try {
    const courseRef = doc(db, COURSE_COLLECTION, courseId);

    await updateDoc(courseRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("updateCourse:", error);

    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Delete course
 */
export async function deleteCourse(courseId) {
  try {
    const courseRef = doc(db, COURSE_COLLECTION, courseId);

    await deleteDoc(courseRef);

    return {
      success: true,
    };
  } catch (error) {
    console.error("deleteCourse:", error);

    return {
      success: false,
      error: error.message,
    };
  }
}