import { useState } from "react";
import { useParams } from "react-router-dom";

import LessonHeader from "../components/LessonHeader";
import ProgressBar from "../components/ProgressBar";
import ChapterSidebar from "../components/ChapterSidebar";
import VideoPlayer from "../components/VideoPlayer";
import LessonNotes from "../components/LessonNotes";
import PdfViewer from "../components/PdfViewer";
import NavigationButtons from "../components/NavigationButtons";
import QuizCard from "../components/QuizCard";

import courses from "../../courses/data/courses";
import { courseContent } from "../../courses/data/courseContent";
import quizData from "../data/quizData";

export default function LearningPage() {
  const { courseId } = useParams();

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-4xl font-bold text-red-600">
          Course Not Found
        </h1>
      </div>
    );
  }

  const chapters = courseContent[course.id]?.chapters || [];

  const [activeChapter, setActiveChapter] = useState(0);

  const lesson =
    chapters[activeChapter] || {
      title: "Coming Soon",
      duration: "",
      video: "",
      pdf: "",
      notes: "",
      quiz: false,
      project: false,
    };

  const progress =
    chapters.length === 0
      ? 0
      : Math.round(((activeChapter + 1) / chapters.length) * 100);

  const questions =
    quizData[course.id]?.[lesson.id] || [];

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-7xl space-y-6 p-6">

        <LessonHeader course={course} />

        <ProgressBar progress={progress} />

        <div className="grid gap-6 lg:grid-cols-4">

          <div className="lg:col-span-1">

            <ChapterSidebar
              chapters={chapters}
              activeChapter={activeChapter}
              setActiveChapter={setActiveChapter}
            />

          </div>

          <div className="space-y-6 lg:col-span-3">

            {lesson.video ? (
              <VideoPlayer url={lesson.video} />
            ) : (
              <div className="rounded-3xl bg-white p-20 text-center shadow">
                <h2 className="text-3xl font-bold">
                  Video Coming Soon
                </h2>

                <p className="mt-4 text-slate-600">
                  This lesson video has not been uploaded yet.
                </p>
              </div>
            )}

            <LessonNotes lesson={lesson} />

            <PdfViewer pdf={lesson.pdf} />

            {lesson.quiz && (
              <QuizCard
                questions={questions}
              />
            )}

            <NavigationButtons
              activeChapter={activeChapter}
              totalChapters={chapters.length}
              setActiveChapter={setActiveChapter}
            />

          </div>

        </div>

      </div>

    </div>
  );
}