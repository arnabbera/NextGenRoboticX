import VideoPlayer from "./VideoPlayer";
import LessonNotes from "./LessonNotes";
import QuizPanel from "./QuizPanel";
import ProjectPanel from "./ProjectPanel";

export default function LearningContent() {
  return (
    <div className="space-y-6">

      <VideoPlayer />

      <LessonNotes />

      <QuizPanel />

      <ProjectPanel />

    </div>
  );
}
