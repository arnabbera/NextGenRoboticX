import { FolderKanban } from "lucide-react";
import { Link } from "react-router-dom";
import useCourseEnrollments from "../../courses/hooks/useCourseEnrollments";
import Projects from "./Projects";

export default function StudentProjects({ view }) {
  const { courseIds, loading, error } = useCourseEnrollments();

  if (loading) {
    return <p role="status" className="p-8 text-slate-600">Checking your course enrollment...</p>;
  }
  if (error) {
    return <p role="alert" className="rounded-xl bg-red-50 p-6 text-red-700">{error}</p>;
  }

  const enrolled = courseIds.length > 0;
  const showEnrolled = view === "enrolled" || (view === "auto" && enrolled);
  const heading = showEnrolled ? "Enrolled Projects" : "Available Projects";

  if (showEnrolled && !enrolled) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 text-center">
        <FolderKanban className="mx-auto text-blue-700" size={50} />
        <h1 className="mt-5 text-3xl font-bold text-slate-900">No enrolled projects yet</h1>
        <p className="mt-3 text-slate-600">Enroll in any one course to unlock all projects, including the ability to copy project text and images.</p>
        <Link to="/projects/available" className="mt-6 inline-block rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white">Browse Available Projects</Link>
      </div>
    );
  }

  if (!showEnrolled && enrolled) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 text-center">
        <FolderKanban className="mx-auto text-emerald-700" size={50} />
        <h1 className="mt-5 text-3xl font-bold text-slate-900">All projects are enrolled</h1>
        <p className="mt-3 text-slate-600">Your course enrollment unlocked every project. You can copy their content and images.</p>
        <Link to="/projects/enrolled" className="mt-6 inline-block rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white">View Enrolled Projects</Link>
      </div>
    );
  }

  return (
    <Projects
      heading={heading}
      enrolled={showEnrolled}
      description={showEnrolled
        ? "All projects are unlocked through your course enrollment. Open any project to copy text, images and guides."
        : "Preview every project. Enroll in any one course to move all projects to Enrolled Projects and unlock copying."}
    />
  );
}
