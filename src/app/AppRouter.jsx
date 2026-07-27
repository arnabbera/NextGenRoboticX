import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import Dashboard from "../features/dashboard/pages/Dashboard";

import Courses from "../features/courses/pages/Courses";
import CourseDetails from "../features/courses/pages/CourseDetails";

import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

export default function AppRouter() {
  return (
    <BrowserRouter>
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
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Courses */}
          <Route path="/courses" element={<Courses />} />

          {/* Course Details */}
          <Route
            path="/courses/:courseId"
            element={<CourseDetails />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}