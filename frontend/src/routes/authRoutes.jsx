// src/routes/AuthRoutes.jsx
import { Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

function AuthRoutes() {
    return (
        <Route path="/auth" element={<PublicLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
        </Route>
    );
}

export default AuthRoutes;