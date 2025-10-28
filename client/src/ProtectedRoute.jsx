import { Navigate } from "react-router";

const ProtectedRoute = ({ content }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return content;
};

export default ProtectedRoute;
