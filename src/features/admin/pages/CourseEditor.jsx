import Card from "../../../components/ui/Card";

export default function CourseEditor() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Create Course
        </h1>

        <p className="mt-2 text-slate-500">
          This page will be connected to Firestore in the next step.
        </p>
      </div>

      <Card title="Course Information">
        <div className="py-20 text-center text-slate-500">
          Course editor coming next...
        </div>
      </Card>
    </div>
  );
}