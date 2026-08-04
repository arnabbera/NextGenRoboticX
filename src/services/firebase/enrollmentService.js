import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";
import { generateEnrollmentId } from "./counterService";

/**
 * Firestore Collection
 */
const ENROLLMENT_COLLECTION = collection(db, "enrollments");

/**
 * Check whether a student is already enrolled
 */
export async function isEnrolled(uid, courseId) {
  const q = query(
    ENROLLMENT_COLLECTION,
    where("uid", "==", uid),
    where("courseId", "==", courseId)
  );

  const snapshot = await getDocs(q);

  return !snapshot.empty;
}

/**
 * Create a new enrollment
 */
export async function enrollInCourse({
  uid,
  studentId,
  courseId,
  courseTitle,
  totalLessons = 0,
  isFreeEnrollment = true,
}) {
  // Prevent duplicate enrollment
  const exists = await isEnrolled(uid, courseId);

  if (exists) {
    throw new Error("Student is already enrolled in this course.");
  }

  const enrollmentId = await generateEnrollmentId();

  const enrollment = {
    enrollmentId,

    uid,

    studentId,

    courseId,

    courseTitle,

    status: "active",

    isFreeEnrollment,

    certificateEnrolled: false,

    completion: {
      percent: 0,
      completedLessons: 0,
      totalLessons,
    },

    currentChapter: 1,

    currentLesson: 1,

    startedAt: serverTimestamp(),

    lastAccessed: serverTimestamp(),

    completedAt: null,
  };

  const docRef = await addDoc(
    ENROLLMENT_COLLECTION,
    enrollment
  );

  return {
    id: docRef.id,
    ...enrollment,
  };
}

/**
 * Get a student's enrollment for one course
 */
export async function getEnrollment(uid, courseId) {
  const q = query(
    ENROLLMENT_COLLECTION,
    where("uid", "==", uid),
    where("courseId", "==", courseId)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  };
}

/**
 * Get all enrollments of a student
 */
export async function getMyEnrollments(uid) {
  const q = query(
    ENROLLMENT_COLLECTION,
    where("uid", "==", uid)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/**
 * Update learning progress
 */
export async function updateProgress(
  enrollmentDocId,
  {
    percent,
    completedLessons,
    currentChapter,
    currentLesson,
  }
) {
  await updateDoc(doc(db, "enrollments", enrollmentDocId), {
    completion: {
      percent,
      completedLessons,
    },

    currentChapter,

    currentLesson,

    lastAccessed: serverTimestamp(),
  });
}

/**
 * Mark course completed
 */
export async function completeCourse(enrollmentDocId) {
  await updateDoc(doc(db, "enrollments", enrollmentDocId), {
    status: "completed",

    completedAt: serverTimestamp(),

    lastAccessed: serverTimestamp(),
  });
}