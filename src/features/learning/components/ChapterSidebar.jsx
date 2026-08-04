import { CheckCircle2, PlayCircle, Circle } from "lucide-react";

const chapters = [
  {
    id: 1,
    title: "Introduction to Robotics",
    status: "completed",
  },
  {
    id: 2,
    title: "Arduino Basics",
    status: "current",
  },
  {
    id: 3,
    title: "Sensors & Actuators",
    status: "pending",
  },
  {
    id: 4,
    title: "Motor Driver (L298N)",
    status: "pending",
  },
  {
    id: 5,
    title: "Bluetooth Robot",
    status: "pending",
  },
  {
    id: 6,
    title: "Obstacle Avoiding Robot",
    status: "pending",
  },
  {
    id: 7,
    title: "Line Following Robot",
    status: "pending",
  },
  {
    id: 8,
    title: "Voice Controlled Robot",
    status: "pending",
  },
  {
    id: 9,
    title: "AI Robot Integration",
    status: "pending",
  },
  {
    id: 10,
    title: "Final Project",
    status: "pending",
  },
];

export default function ChapterSidebar() {
  return (
    <div className="rounded-3xl bg-white shadow-lg">

      <div className="border-b p-5">

        <h2 className="text-xl font-bold">
          Course Curriculum
        </h2>

      </div>

      <div className="max-h-[700px] overflow-y-auto">

        {chapters.map((chapter) => (

          <button
            key={chapter.id}
            className={`flex w-full items-center gap-3 border-b p-4 text-left transition hover:bg-slate-50 ${
              chapter.status === "current"
                ? "bg-blue-50"
                : ""
            }`}
          >

            {chapter.status === "completed" && (
              <CheckCircle2
                className="text-green-600"
                size={22}
              />
            )}

            {chapter.status === "current" && (
              <PlayCircle
                className="text-blue-600"
                size={22}
              />
            )}

            {chapter.status === "pending" && (
              <Circle
                className="text-slate-400"
                size={20}
              />
            )}

            <div>

              <div className="font-semibold">
                Chapter {chapter.id}
              </div>

              <div className="text-sm text-slate-500">
                {chapter.title}
              </div>

            </div>

          </button>

        ))}

      </div>

    </div>
  );
}