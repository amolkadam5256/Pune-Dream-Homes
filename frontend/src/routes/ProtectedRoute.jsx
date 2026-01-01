import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  const location = useLocation();
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user?.role)) {
    // Redirect to appropriate dashboard based on user's actual role
    const userRole = user?.role?.toUpperCase();

    switch (userRole) {
      case "ADMIN":
        return <Navigate to="/admin/admin-dashboard" replace />;
      case "CUSTOMER":
        return <Navigate to="/customer/customer-dashboard" replace />;
      case "BUILDER":
        return <Navigate to="/builder/dashboard" replace />;
      default:
        // If role is unknown, redirect to home
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
