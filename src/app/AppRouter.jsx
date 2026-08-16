import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

// Public Pages
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import FeatureDetailPage from "../features/marketing/pages/FeatureDetailPage";

// Layout
import Layout from "../components/layout/Layout";

// Auth
import LoginPage from "../features/auth/pages/LoginPage";

// Dashboard
import Dashboard from "../features/dashboard/pages/Dashboard";

// Courses
import Courses from "../features/courses/pages/Courses";
import CourseDetails from "../features/courses/pages/CourseDetails";

// Learning
import LearningPage from "../features/learning/pages/LearningPage";

// Student Pages
import Projects from "../features/projects/pages/Projects";
import Certificates from "../features/projects/pages/Certificates";
import Profile from "../features/projects/pages/Profile";
import Settings from "../features/projects/pages/Settings";
import ObstacleAvoidingRobotPage from "../features/projects/pages/ObstacleAvoidingRobotPage";


// Admin
import AdminRoute from "../components/auth/AdminRoute";
import AdminLayout from "../layouts/AdminLayout";

import AdminDashboard from "../features/admin/pages/AdminDashboard";
import CourseManagement from "../features/admin/pages/CourseManagement";
import CourseEditor from "../features/admin/pages/CourseEditor";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ===================== */}
        {/* Public Routes */}
        {/* ===================== */}

        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/features/:featureSlug"
          element={<FeatureDetailPage />}
        />

        <Route
          path="/projects/obstacle-avoiding-robot"
          element={<ObstacleAvoidingRobotPage />}
        />

        {/* ===================== */}
        {/* Protected Routes */}
        {/* ===================== */}

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Courses */}
            <Route path="/courses" element={<Courses />} />

            <Route
              path="/courses/:courseId"
              element={<CourseDetails />}
            />

            {/* Learning */}
            <Route
              path="/courses/:courseId/learn"
              element={<LearningPage />}
            />

            {/* Student */}
            <Route path="/projects" element={<Projects />} />

            <Route
              path="/certificates"
              element={<Certificates />}
            />

            <Route path="/profile" element={<Profile />} />

            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* ===================== */}
        {/* 404 */}
        {/* ===================== */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}