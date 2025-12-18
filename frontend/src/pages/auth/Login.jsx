import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setMessage({ type: '', text: '' });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setMessage({ type: 'error', text: 'Please fill in all fields' });
            return;
        }

        setLoading(true);
        try {
            const response = await login(formData.email, formData.password);

            setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
            setTimeout(() => {
                // Navigate to dashboard based on role
                if (response.user.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/customer/dashboard');
                }
            }, 1000);
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Login failed. Please check your credentials.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-2"
            style={{ background: 'linear-gradient(to bottom right, #D6E4F5, #7FA6D9)' }}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: '#2262B2' }}>
                        <Lock className="text-white" size={25} />
                    </div>
                    <h2 className="text-2xl font-bold" style={{ color: '#0A0A0A' }}>
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm" style={{ color: '#979DA6' }}>
                        Sign in to your account
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

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm" style={{ color: '#0A0A0A' }}>
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3"
                                style={{ color: '#979DA6' }}
                                size={20} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                                style={{
                                    borderColor: '#E5E7EB'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#2262B2'}
                                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm" style={{ color: '#0A0A0A' }}>
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3"
                                style={{ color: '#979DA6' }}
                                size={20} />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                                style={{
                                    borderColor: '#E5E7EB'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#2262B2'}
                                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <div className="text-right mb-3">
                        <button
                            type="button"
                            onClick={() => navigate('/auth/forgot-password')}
                            className="text-sm font-medium transition"
                            style={{ color: '#2262B2' }}
                            onMouseEnter={(e) => e.target.style.color = '#1B4F91'}
                            onMouseLeave={(e) => e.target.style.color = '#2262B2'}
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                        style={{ backgroundColor: '#2262B2' }}
                        onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#1B4F91')}
                        onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#2262B2')}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-center mt-6 text-sm" style={{ color: '#979DA6' }}>
                    Don't have an account?{' '}
                    <button
                        onClick={() => navigate('/auth/register')}
                        className="font-semibold transition text-sm"
                        style={{ color: '#2262B2' }}
                        onMouseEnter={(e) => e.target.style.color = '#1B4F91'}
                        onMouseLeave={(e) => e.target.style.color = '#2262B2'}
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;