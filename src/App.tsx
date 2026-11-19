// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./routes/LandingPage";
import RegisterPage from "./routes/RegisterPage";
import LoginPage from "./routes/LoginPage";
import Dashboard from "./routes/Dashboard";
import ForgotPasswordPage from "./routes/ForgotPasswordPage";
import { useAuth } from "./context/AuthContext";
+// New page imports
+import TimetablePage from "./routes/timetable/TimetablePage";
+import AssignmentsPage from "./routes/assignments/AssignmentsPage";
+import ActivitiesPage from "./routes/activities/ActivitiesPage";
+import NotebookPage from "./routes/notebook/NotebookPage";
+import GroupsPage from "./routes/groups/GroupsPage";
+import ProfilePage from "./routes/profile/ProfilePage";

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      {/* Protected routes */}
      <Route
        path="/dashboard/*"
        element={user ? <Dashboard /> : <Navigate to="/login" replace />}
      >
        {/* Nested routes under Dashboard */}
        <Route index element={<Navigate to="timetable" replace />} />
        <Route path="timetable" element={<TimetablePage />} />
        <Route path="assignments" element={<AssignmentsPage />} />
        <Route path="activities" element={<ActivitiesPage />} />
        <Route path="notebook" element={<NotebookPage />} />
        <Route path="groups" element={<GroupsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
