import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function useCourseEnrollments(enabled = true) {
  const { user } = useAuth();
  const [result, setResult] = useState({ uid: null, courseIds: [], error: "" });

  useEffect(() => {
    if (!enabled || !user) return undefined;
    let current = true;

    async function load() {
      try {
        const token = await user.getIdToken();
        const response = await fetch("/api/course-access/enrollments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to load enrollments.");
        if (current) setResult({ uid: user.uid, courseIds: data.courseIds || [], error: "" });
      } catch (error) {
        if (current) setResult({ uid: user.uid, courseIds: [], error: error.message });
      }
    }

    load();
    return () => { current = false; };
  }, [enabled, user]);

  return {
    courseIds: enabled && user && result.uid === user.uid ? result.courseIds : [],
    error: enabled && user && result.uid === user.uid ? result.error : "",
    loading: Boolean(enabled && user && result.uid !== user.uid),
  };
}
