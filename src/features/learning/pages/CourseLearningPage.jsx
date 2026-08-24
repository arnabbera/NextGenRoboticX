import { Navigate, useParams } from "react-router-dom";
import ArduinoProgrammingLearningPage from "./ArduinoProgrammingLearningPage";
import RaspberryPiLearningPage from "./RaspberryPiLearningPage";
import DroneTechnologyLearningPage from "./DroneTechnologyLearningPage";

export default function CourseLearningPage() {
  const { courseId } = useParams();

  if (courseId === "arduino-programming") {
    return <ArduinoProgrammingLearningPage />;
  }

  if (courseId === "raspberry-pi") {
    return <RaspberryPiLearningPage />;
  }

  if (courseId === "drone-technology") {
    return <DroneTechnologyLearningPage />;
  }

  return <Navigate to={`/courses/${courseId}`} replace />;
}
