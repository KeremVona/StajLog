import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import Internships from "./pages/Internships";
import InternshipDetail from "./pages/InternshipDetail";
import MakeInternship from "./pages/MakeInternship";
import MakeLog from "./pages/MakeLog";
import LogDetail from "./pages/LogDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* General Routes */}
          <Route
            path="/home"
            element={<ProtectedRoute content={<Dashboard />} />}
          />
          <Route
            path="/internships"
            element={<ProtectedRoute content={<Internships />} />}
          />
          <Route
            path="/internships/:id"
            element={<ProtectedRoute content={<InternshipDetail />} />}
          />
          <Route
            path="/make-internship"
            element={<ProtectedRoute content={<MakeInternship />} />}
          />

          <Route
            path="/internships/:id/log/:logId"
            element={<ProtectedRoute content={<LogDetail />} />}
          />
          <Route
            path="/internships/:id/make-log"
            element={<ProtectedRoute content={<MakeLog />} />}
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
