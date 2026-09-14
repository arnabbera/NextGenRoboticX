import { Navigate, useParams } from "react-router-dom";
import ArduinoProgrammingLearningPage from "./ArduinoProgrammingLearningPage";
import RaspberryPiLearningPage from "./RaspberryPiLearningPage";
import DroneTechnologyLearningPage from "./DroneTechnologyLearningPage";
import EmbeddedSystemsLearningPage from "./EmbeddedSystemsLearningPage";
import InternetOfThingsLearningPage from "./InternetOfThingsLearningPage";

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

  if (courseId === "embedded-systems") {
    return <EmbeddedSystemsLearningPage />;
  }

  if (courseId === "internet-of-things") {
    return <InternetOfThingsLearningPage />;
  }

  return <Navigate to={`/courses/${courseId}`} replace />;
}
