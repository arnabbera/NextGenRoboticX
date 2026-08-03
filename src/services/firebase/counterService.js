import {
  doc,
  runTransaction,
} from "firebase/firestore";

import { db } from "./firebase";

const COUNTER_DOC = doc(db, "system", "counters");

/**
 * Ensure counter document exists
 */
async function initializeCounters(transaction) {
  const snapshot = await transaction.get(COUNTER_DOC);

  if (!snapshot.exists()) {
    transaction.set(COUNTER_DOC, {
      student: 0,
      instructor: 0,
      certificate: 0,
      enrollment: 0,
      project: 0,
    });

    return {
      student: 0,
      instructor: 0,
      certificate: 0,
      enrollment: 0,
      project: 0,
    };
  }

  return snapshot.data();
}

/**
 * Generic Counter
 */
export async function getNextCounter(counterName) {
  return await runTransaction(db, async (transaction) => {
    const counters = await initializeCounters(transaction);

    const current = counters[counterName] || 0;

    const next = current + 1;

    transaction.update(COUNTER_DOC, {
      [counterName]: next,
    });

    return next;
  });
}

/**
 * Student ID
 */
export async function generateStudentId() {
  const number = await getNextCounter("student");

  const year = new Date().getFullYear();

  return `NGRX-STU-${year}-${String(number).padStart(6, "0")}`;
}

/**
 * Instructor ID
 */
export async function generateInstructorId() {
  const number = await getNextCounter("instructor");

  const year = new Date().getFullYear();

  return `NGRX-INS-${year}-${String(number).padStart(6, "0")}`;
}

/**
 * Certificate ID
 */
export async function generateCertificateId() {
  const number = await getNextCounter("certificate");

  const year = new Date().getFullYear();

  return `NGRX-CERT-${year}-${String(number).padStart(6, "0")}`;
}

/**
 * Enrollment ID
 */
export async function generateEnrollmentId(courseCode) {
  const number = await getNextCounter("enrollment");

  const year = new Date().getFullYear();

  return `NGRX-${courseCode}-${year}-${String(number).padStart(6, "0")}`;
}

/**
 * Project ID
 */
export async function generateProjectId() {
  const number = await getNextCounter("project");

  const year = new Date().getFullYear();

  return `NGRX-PRJ-${year}-${String(number).padStart(6, "0")}`;
}