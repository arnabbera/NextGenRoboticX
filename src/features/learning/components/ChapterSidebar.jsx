import { Circle, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

const chapters = [
  { id: 1, title: "Introduction to Robotics", path: "/courses/robotics-foundation/learn" },
  { id: 2, title: "Arduino Basics", path: "/courses/robotics-foundation/learn/chapter-2" },
  { id: 3, title: "Sensors & Actuators", path: "/courses/robotics-foundation/learn/chapter-3" },
  { id: 4, title: "Motor Driver (L298N)" },
  { id: 5, title: "Bluetooth Robot" },
  { id: 6, title: "Obstacle Avoiding Robot" },
  { id: 7, title: "Line Following Robot" },
  { id: 8, title: "Voice Controlled Robot" },
  { id: 9, title: "AI Robot Integration" },
  { id: 10, title: "Final Project" },
];

export default function ChapterSidebar({ currentChapter = 1 }) {
  return (
    <div className="rounded-3xl bg-white shadow-lg">
      <div className="border-b p-5">
        <h2 className="text-xl font-bold">Course Curriculum</h2>
      </div>

      <div className="max-h-[700px] overflow-y-auto">
        {chapters.map((chapter) => {
          const current = chapter.id === currentChapter;
          const classes = `flex w-full items-center gap-3 border-b p-4 text-left transition ${
            current ? "bg-blue-50" : chapter.path ? "hover:bg-slate-50" : "cursor-not-allowed opacity-60"
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

          return chapter.path ? (
            <Link key={chapter.id} to={chapter.path} className={classes} aria-current={current ? "page" : undefined}>
              {content}
            </Link>
          ) : (
            <div key={chapter.id} className={classes} aria-disabled="true">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
