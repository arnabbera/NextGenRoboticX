import {
  CheckCircle2,
  Circle,
} from "lucide-react";

export default function UpcomingGoals() {

  const goals = [
    {
      title: "Finish Chapter 4",
      completed: true,
    },
    {
      title: "Complete Quiz 4",
      completed: false,
    },
    {
      title: "Upload Arduino Project",
      completed: false,
    },
    {
      title: "Schedule Certification Exam",
      completed: false,
    },
  ];

  return (
    <div className="rounded-3xl bg-white p-6 shadow">

      <h2 className="text-xl font-bold text-slate-800">
        Upcoming Goals
      </h2>

      <div className="mt-6 space-y-4">

        {goals.map((goal, index) => (

          <div
            key={index}
            className="flex items-center gap-3"
          >

            {goal.completed ? (
              <CheckCircle2
                className="text-green-600"
                size={20}
              />
            ) : (
              <Circle
                className="text-slate-400"
                size={20}
              />
            )}

            <span
              className={
                goal.completed
                  ? "text-slate-700"
                  : "text-slate-500"
              }
            >
              {goal.title}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}