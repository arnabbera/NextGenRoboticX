import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import Dashboard from "../features/dashboard/pages/Dashboard";

import Courses from "../features/courses/pages/Courses";
import CourseDetails from "../features/courses/pages/CourseDetails";

import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

export default function AppRouter() {
  return (
    <BrowserRouter
      basename={import.meta.env.PROD ? "/NextGenRoboticX_V2" : "/"}
    >
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route
            path="/courses/:courseId"
            element={<CourseDetails />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}