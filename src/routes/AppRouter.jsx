import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import Dashboard from "../features/dashboard/pages/Dashboard";

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
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}