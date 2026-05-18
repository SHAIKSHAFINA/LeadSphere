import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import LeadsPage from "../pages/LeadsPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import LeadDetailsPage from "../pages/LeadDetailsPage";

const AppRouter = () => {
  return (
    <Routes>

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/dashboard"
        element={
            <ProtectedRoute>
            <DashboardPage />
            </ProtectedRoute>
        }
        />

        <Route
            path="/leads"
            element={
                <ProtectedRoute>
                <LeadsPage />
                </ProtectedRoute>
            }
        />
        <Route
            path="/leads/:id"
            element={
                <ProtectedRoute>
                <LeadDetailsPage />
                </ProtectedRoute>
            }
        />

        <Route
            path="/analytics"
            element={
                <ProtectedRoute>
                <AnalyticsPage />
                </ProtectedRoute>
            }
        />

      <Route
        path="*"
        element={<Navigate to="/login" />}
      />

    </Routes>
  );
};

export default AppRouter;