import { Navigate, useParams } from "react-router-dom";
import ArduinoProgrammingLearningPage from "./ArduinoProgrammingLearningPage";

export default function CourseLearningPage() {
  const { courseId } = useParams();

  if (courseId === "arduino-programming") {
    return <ArduinoProgrammingLearningPage />;
  }

  return <Navigate to={`/courses/${courseId}`} replace />;
}
