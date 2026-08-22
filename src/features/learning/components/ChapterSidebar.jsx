import { Circle, PlayCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { courseContent } from "../../courses/data/courseContent";

export default function ChapterSidebar({ currentChapter = 1 }) {
  const { courseId = "robotics-foundation" } = useParams();
  const chapters = courseContent[courseId]?.chapters || [];

  return (
    <div className="rounded-3xl bg-white shadow-lg">
      <div className="border-b p-5">
        <h2 className="text-xl font-bold">Course Curriculum</h2>
      </div>

      <div>
        {chapters.map((chapter) => {
          const path = chapter.id === 1
            ? `/courses/${courseId}/learn`
            : `/courses/${courseId}/learn/chapter-${chapter.id}`;
          const current = chapter.id === currentChapter;
          const classes = `flex w-full items-center gap-3 border-b p-4 text-left transition ${
            current ? "bg-blue-50" : "hover:bg-slate-50"
          }`;
          const content = (
            <>
              {current ? (
                <PlayCircle className="text-blue-600" size={22} aria-hidden="true" />
              ) : (
                <Circle className="text-slate-400" size={20} aria-hidden="true" />
              )}
              <div>
                <div className="font-semibold">Chapter {chapter.id}</div>
                <div className="text-sm text-slate-500">{chapter.title}</div>
              </div>
            </>
          );

          return (
            <Link key={chapter.id} to={path} className={classes} aria-current={current ? "page" : undefined}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
