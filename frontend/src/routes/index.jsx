// src/routes/index.jsx
import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes.jsx';
import AuthRoutes from './authRoutes';
import CustomerRoutes from './CustomerRoutes';
import AdminRoutes from './AdminRoutes';
import NotFound from '../pages/NotFound';

function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            {PublicRoutes()}

            {/* Auth Routes */}
            {AuthRoutes()}

            {/* Customer Routes */}
            {CustomerRoutes()}

            {/* Admin Routes */}
            {AdminRoutes()}

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;