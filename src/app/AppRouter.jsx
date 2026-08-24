import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import FeatureDetailPage from "../features/marketing/pages/FeatureDetailPage";
import Layout from "../components/layout/Layout";
import LoginPage from "../features/auth/pages/LoginPage";
import Dashboard from "../features/dashboard/pages/Dashboard";
import Courses from "../features/courses/pages/Courses";
import EnrolledCourses from "../features/courses/pages/EnrolledCourses";
import CourseDetails from "../features/courses/pages/CourseDetails";
import CourseAccessRoute from "../features/courses/components/CourseAccessRoute";
import RoboticsTestPage from "../features/assessment/pages/RoboticsTestPage";
import LearningPage from "../features/learning/pages/LearningPage";
import CourseLearningPage from "../features/learning/pages/CourseLearningPage";
import ArduinoBasicsChapterPage from "../features/learning/pages/ArduinoBasicsChapterPage";
import SensorsActuatorsChapterPage from "../features/learning/pages/SensorsActuatorsChapterPage";
import L298NMotorDriverChapterPage from "../features/learning/pages/L298NMotorDriverChapterPage";
import BluetoothRobotChapterPage from "../features/learning/pages/BluetoothRobotChapterPage";
import ObstacleAvoidingRobotChapterPage from "../features/learning/pages/ObstacleAvoidingRobotChapterPage";
import LineFollowingRobotChapterPage from "../features/learning/pages/LineFollowingRobotChapterPage";
import VoiceControlledRobotChapterPage from "../features/learning/pages/VoiceControlledRobotChapterPage";
import AIRobotIntegrationChapterPage from "../features/learning/pages/AIRobotIntegrationChapterPage";
import FinalProjectChapterPage from "../features/learning/pages/FinalProjectChapterPage";
import Projects from "../features/projects/pages/Projects";
import Certificates from "../features/projects/pages/Certificates";
import Profile from "../features/projects/pages/Profile";
import Settings from "../features/projects/pages/Settings";
import ViewOnlyProjectRoute from "../features/projects/components/ViewOnlyProjectRoute";
import ObstacleAvoidingRobotPage from "../features/projects/pages/ObstacleAvoidingRobotPage";
import LineFollowingRobotPage from "../features/projects/pages/LineFollowingRobotPage";
import IoTSmartMonitoringPage from "../features/projects/pages/IoTSmartMonitoringPage";
import SmartHomeAutomationPage from "../features/projects/pages/SmartHomeAutomationPage";
import ArduinoDronePage from "../features/projects/pages/ArduinoDronePage";
import FaceRecognitionRobotPage from "../features/projects/pages/FaceRecognitionRobotPage";
import HumanoidRobotPage from "../features/projects/pages/HumanoidRobotPage";
import RoboticArmAutomationPage from "../features/projects/pages/RoboticArmAutomationPage";
import SmartAgriculturePage from "../features/projects/pages/SmartAgriculturePage";
import AdminRoute from "../components/auth/AdminRoute";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import CourseManagement from "../features/admin/pages/CourseManagement";
import CourseEditor from "../features/admin/pages/CourseEditor";
import CourseChaptersManagement from "../features/admin/pages/CourseChaptersManagement";
import ProjectManagement from "../features/admin/pages/ProjectManagement";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/features/:featureSlug" element={<FeatureDetailPage />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />

        <Route element={<ViewOnlyProjectRoute />}>
          <Route path="/projects/obstacle-avoiding-robot" element={<ObstacleAvoidingRobotPage />} />
          <Route path="/projects/line-following-robot" element={<LineFollowingRobotPage />} />
          <Route path="/projects/iot-smart-monitoring" element={<IoTSmartMonitoringPage />} />
          <Route path="/projects/smart-home-automation" element={<SmartHomeAutomationPage />} />
          <Route path="/projects/arduino-drone" element={<ArduinoDronePage />} />
          <Route path="/projects/face-recognition-robot" element={<FaceRecognitionRobotPage />} />
          <Route path="/projects/humanoid-robot" element={<HumanoidRobotPage />} />
          <Route path="/projects/robotic-arm-automation" element={<RoboticArmAutomationPage />} />
          <Route path="/projects/smart-agriculture" element={<SmartAgriculturePage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/available" element={<Courses />} />
            <Route path="/courses/enrolled" element={<EnrolledCourses />} />
            <Route element={<CourseAccessRoute />}>
              <Route path="/courses/robotics-foundation/learn" element={<LearningPage />} />
              <Route path="/courses/:courseId/learn" element={<CourseLearningPage />} />
              <Route path="/courses/:courseId/learn/:chapterSlug" element={<CourseLearningPage />} />
            <Route path="/courses/:courseId/mock-test" element={<RoboticsTestPage />} />
            <Route path="/courses/:courseId/assessment" element={<RoboticsTestPage />} />
            <Route path="/courses/robotics-foundation/learn/chapter-2" element={<ArduinoBasicsChapterPage />} />
            <Route path="/courses/robotics-foundation/learn/chapter-3" element={<SensorsActuatorsChapterPage />} />
            <Route path="/courses/robotics-foundation/learn/chapter-4" element={<L298NMotorDriverChapterPage />} />
            <Route path="/courses/robotics-foundation/learn/chapter-5" element={<BluetoothRobotChapterPage />} />
            <Route path="/courses/robotics-foundation/learn/chapter-6" element={<ObstacleAvoidingRobotChapterPage />} />
            <Route path="/courses/robotics-foundation/learn/chapter-7" element={<LineFollowingRobotChapterPage />} />
            <Route path="/courses/robotics-foundation/learn/chapter-8" element={<VoiceControlledRobotChapterPage />} />
            <Route path="/courses/robotics-foundation/learn/chapter-9" element={<AIRobotIntegrationChapterPage />} />
              <Route path="/courses/robotics-foundation/learn/chapter-10" element={<FinalProjectChapterPage />} />
            </Route>
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/all-courses" element={<Courses />} />
          <Route path="/admin/all-projects" element={<Projects />} />
          <Route path="/admin/courses" element={<CourseManagement />} />
          <Route path="/admin/courses/new" element={<CourseEditor />} />
          <Route path="/admin/courses/:courseId/edit" element={<CourseEditor />} />
          <Route path="/admin/courses/:courseId/chapters" element={<CourseChaptersManagement />} />
          <Route path="/admin/projects" element={<ProjectManagement />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
