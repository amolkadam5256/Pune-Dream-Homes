import apiClient from '../client';

export const authAPI = {
    // Register new user
    register: async (userData) => {
        const response = await apiClient.post('/auth/register', userData);
        return response.data;
    },

    // Verify OTP
    verifyOTP: async (email, otp) => {
        const response = await apiClient.post('/auth/verify-otp', { email, otp });
        return response.data;
    },

    // Login with email/password
    login: async (email, password) => {
        const response = await apiClient.post('/auth/login', { email, password });
        return response.data;
    },

    // Resend OTP
    resendOTP: async (email) => {
        const response = await apiClient.post('/auth/resend-otp', { email });
        return response.data;
    },

    // Forgot password
    forgotPassword: async (email) => {
        const response = await apiClient.post('/auth/forgot-password', { email });
        return response.data;
    },

    // Verify reset OTP
    verifyResetOTP: async (email, otp) => {
        const response = await apiClient.post('/auth/verify-reset-otp', { email, otp });
        return response.data;
    },

    // Reset password
    resetPassword: async (email, otp, password) => {
        const response = await apiClient.post('/auth/reset-password', { email, otp, password });
        return response.data;
    },

    // Logout
    logout: async () => {
        const response = await apiClient.post('/auth/logout');
        return response.data;
    },

    // Get current user
    getCurrentUser: async () => {
        const response = await apiClient.get('/auth/me');
        return response.data;
    },
};
