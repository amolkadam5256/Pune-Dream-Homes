import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
    const location = useLocation();
    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (!token) {
        // Redirect to login if not authenticated
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    if (roles && !roles.includes(user?.role)) {
        // Redirect to home if user doesn't have required role
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
