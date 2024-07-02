import React from "react";
import { useAuthStore } from "../state-management/AppState"; // Adjust the import path as necessary
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/" />;
  }

  // If authenticated, render the protected component
  return <Component {...rest} />;
};

export default ProtectedRoute;
