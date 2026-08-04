import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

const COURSE_COLLECTION = collection(db, "courses");

/**
 * Create a new course
 * Document ID = course slug
 */
export async function createCourse(course) {
  const slug = course.slug.trim().toLowerCase();

  const docRef = doc(db, "courses", slug);

  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    throw new Error("Course already exists.");
  }

  const newCourse = {
    id: slug,
    slug,

    title: course.title,

    category: course.category,

    level: course.level,

    language: course.language ?? "English",

    duration: course.duration,

    price: course.price ?? 0,

    freeLearning: course.freeLearning ?? true,

    certificateAvailable:
      course.certificateAvailable ?? true,

    thumbnail: course.thumbnail ?? "",

    banner: course.banner ?? "",

    shortDescription:
      course.shortDescription ?? "",

    description:
      course.description ?? "",

    learningOutcomes:
      course.learningOutcomes ?? [],

    requirements:
      course.requirements ?? [],

    chapterCount: 0,

    lessonCount: 0,

    studentCount: 0,

    rating: 0,

    reviewCount: 0,

    status: "draft",

    published: false,

    createdBy: course.createdBy,

    createdAt: serverTimestamp(),

    updatedAt: serverTimestamp(),

    publishedAt: null,
  };

  await setDoc(docRef, newCourse);

  return newCourse;
}

/**
 * Get course by slug
 */
export async function getCourse(courseId) {
  const snapshot = await getDoc(
    doc(db, "courses", courseId)
  );

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}

/**
 * Get all courses
 */
export async function getAllCourses() {
  const snapshot = await getDocs(COURSE_COLLECTION);

  return snapshot.docs.map((doc) => doc.data());
}

/**
 * Get published courses only
 */
export async function getPublishedCourses() {
  const q = query(
    COURSE_COLLECTION,
    where("published", "==", true)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data());
}

/**
 * Update course
 */
export async function updateCourse(courseId, updates) {
  await updateDoc(doc(db, "courses", courseId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Publish course
 */
export async function publishCourse(courseId) {
  await updateDoc(doc(db, "courses", courseId), {
    published: true,
    status: "published",
    publishedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/**
 * Archive course
 */
export async function archiveCourse(courseId) {
  await updateDoc(doc(db, "courses", courseId), {
    published: false,
    status: "archived",
    updatedAt: serverTimestamp(),
  });
}