import { FileText } from "lucide-react";

export default function LessonNotes() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">

      <div className="mb-5 flex items-center gap-3">

        <FileText
          className="text-blue-600"
          size={28}
        />

        <h2 className="text-2xl font-bold">
          Lesson Notes
        </h2>

      </div>

      <div className="prose max-w-none">

        <h3>Introduction to Robotics</h3>

        <p>
          This section will display lesson notes from Firestore using
          Markdown.
        </p>

        <ul>
          <li>Definition of Robotics</li>
          <li>Applications</li>
          <li>Robot Components</li>
          <li>Sensors & Actuators</li>
        </ul>

      </div>

    </div>
  );
}