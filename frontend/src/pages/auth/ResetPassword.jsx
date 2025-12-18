import React, { useState } from 'react';
import { Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../api/endpoints/auth.api';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setMessage({ type: '', text: '' });
    };

    const simulateApiCall = (duration = 1500) => {
        return new Promise(resolve => setTimeout(resolve, duration));
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!formData.password || !formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Please fill in all fields' });
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }
        if (formData.password.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
            return;
        }

        const email = sessionStorage.getItem('resetEmail');
        const otp = sessionStorage.getItem('resetOTP');

        if (!email || !otp) {
            setMessage({ type: 'error', text: 'Session expired. Please start over.' });
            setTimeout(() => navigate('/auth/forgot-password'), 2000);
            return;
        }

        setLoading(true);
        try {
            await authAPI.resetPassword(email, otp, formData.password);
            setMessage({ type: 'success', text: 'Password reset successful!' });

            // Clear reset session
            sessionStorage.removeItem('resetEmail');
            sessionStorage.removeItem('resetOTP');

            setTimeout(() => {
                navigate('/auth/login');
            }, 1500);
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to reset password. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-2"
            style={{ background: 'linear-gradient(to bottom right, #D6E4F5, #7FA6D9)' }}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <button
                    onClick={() => navigate('/auth/login')}
                    className="flex items-center mb-6 transition"
                    style={{ color: 'var(--color-neutral, #979DA6)' }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-dark, #0A0A0A)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-neutral, #979DA6)'}
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Login
                </button>

                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: 'var(--color-primary, #2262B2)' }}>
                        <Lock className="text-white" size={25} />
                    </div>
                    <h2 className="text-2xl font-bold" style={{ color: 'var(--color-dark, #0A0A0A)' }}>
                        Reset Password
                    </h2>
                    <p className="mt-2 text-sm" style={{ color: 'var(--color-neutral, #979DA6)' }}>
                        Create a new password for your account
                    </p>
                </div>

                {message.text && (
                    <div className={`mb-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' :
                        message.type === 'error' ? 'bg-red-100 text-red-700' :
                            'bg-blue-100 text-blue-700'
                        }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleResetPassword}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm" style={{ color: 'var(--color-dark, #0A0A0A)' }}>
                            New Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3"
                                style={{ color: 'var(--color-neutral, #979DA6)' }}
                                size={20} />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                                style={{
                                    borderColor: '#E5E7EB',
                                    '--tw-ring-color': 'var(--color-primary, #2262B2)'
                                }}
                                placeholder="Enter new password"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm" style={{ color: 'var(--color-dark, #0A0A0A)' }}>
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3"
                                style={{ color: 'var(--color-neutral, #979DA6)' }}
                                size={20} />
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                                style={{
                                    borderColor: '#E5E7EB',
                                    '--tw-ring-color': 'var(--color-primary, #2262B2)'
                                }}
                                placeholder="Confirm new password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                        style={{ backgroundColor: 'var(--color-primary, #2262B2)' }}
                        onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = 'var(--color-primary-dark-1, #1B4F91)')}
                        onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = 'var(--color-primary, #2262B2)')}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;