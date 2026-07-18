import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { isTokenExpired } from "./tokenChecker";

interface ProtectedRouteProps {
  content: ReactNode;
}

const ProtectedRoute = ({ content }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // const isExpired = isTokenExpired(token);

  // if (isExpired) {
  //   return <Navigate to="/login" replace />;
  // }

  return content;
};

export default ProtectedRoute;
