import LessonHeader from "../components/LessonHeader";
import ChapterSidebar from "../components/ChapterSidebar";
import LearningContent from "../components/LearningContent";
import NavigationButtons from "../components/NavigationButtons";

export default function LearningPortal() {
  return (
    <div className="min-h-screen bg-slate-100">

      <LessonHeader chapter={1} lesson={1} chapterTitle="Introduction to Robotics" />

      <div className="mx-auto max-w-7xl p-6">

        <div className="grid grid-cols-12 gap-6">

          {/* Sidebar */}

          <div className="col-span-12 lg:col-span-3">

            <ChapterSidebar currentChapter={1} />

          </div>

          {/* Lesson */}

          <div className="col-span-12 lg:col-span-9">

            <LearningContent />

            <NavigationButtons />

          </div>

        </div>

      </div>

    </div>
  );
}