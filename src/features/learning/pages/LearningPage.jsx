import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import courses from "../../courses/data/courses";
import roboticsLessons from "../data/roboticsLessons";

import ChapterSidebar from "../components/ChapterSidebar";
import LessonViewer from "../components/LessonViewer";
import ProgressBar from "../components/ProgressBar";

export default function LearningPage() {
  const { courseId } = useParams();

  // Find selected course
  const course = courses.find((c) => c.id === courseId);

  // Load lessons (later this will depend on courseId)
  const lessons = useMemo(() => {
    return roboticsLessons;
  }, [courseId]);

  // Selected lesson
  const [activeLessonId, setActiveLessonId] = useState(
    lessons[0]?.id ?? null
  );

  // Course not found
  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <h1 className="text-3xl font-bold text-red-600">
          Course not found
        </h1>
      </div>
    );
  }

  // Active lesson
  const activeLesson =
    lessons.find((lesson) => lesson.id === activeLessonId) ||
    lessons[0];

  // Current lesson index
  const activeIndex = lessons.findIndex(
    (lesson) => lesson.id === activeLesson.id
  );

  // Progress
  const completed = lessons.filter(
    (lesson) => lesson.completed
  ).length;

  // Go to next lesson
  const handleNext = () => {
    if (activeIndex < lessons.length - 1) {
      setActiveLessonId(lessons[activeIndex + 1].id);
    }
  };

  // Go to previous lesson
  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveLessonId(lessons[activeIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-7xl p-6">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-4xl font-bold">
              {course.title}
            </h1>

            <p className="mt-2 text-slate-600">
              Continue your learning journey.
            </p>
          </div>

          <ProgressBar
            completed={completed}
            total={lessons.length}
          />

        </div>

        {/* Main Layout */}
        <div className="grid gap-6 lg:grid-cols-12">

          {/* Sidebar */}
          <aside className="lg:col-span-3">

            <ChapterSidebar
              lessons={lessons}
              activeLessonId={activeLesson.id}
              onSelect={setActiveLessonId}
            />

          </aside>

          {/* Lesson */}
          <main className="lg:col-span-9">

            <LessonViewer
              lesson={activeLesson}
              hasPrevious={activeIndex > 0}
              hasNext={activeIndex < lessons.length - 1}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />

          </main>

        </div>

      </div>

    </div>
  );
}