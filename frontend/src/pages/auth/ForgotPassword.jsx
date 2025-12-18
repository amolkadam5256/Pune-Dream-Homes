import React, { useState } from 'react';
import { Mail, Phone, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../api/endpoints/auth.api';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [otpMethod, setOtpMethod] = useState('email');
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        otp: ''
    });
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setMessage({ type: '', text: '' });
    };

    const simulateApiCall = (duration = 1500) => {
        return new Promise(resolve => setTimeout(resolve, duration));
    };

    const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if (step === 1) {
            if (!formData.email) {
                setMessage({ type: 'error', text: 'Please enter your email' });
                return;
            }

            setLoading(true);
            try {
                const response = await authAPI.forgotPassword(formData.email);
                setMessage({ type: 'info', text: response.message || 'OTP sent to your email.' });
                setStep(2);
            } catch (error) {
                setMessage({
                    type: 'error',
                    text: error.response?.data?.message || 'Failed to send OTP. Please try again.'
                });
            } finally {
                setLoading(false);
            }
        } else if (step === 2) {
            if (!formData.otp || formData.otp.length !== 6) {
                setMessage({ type: 'error', text: 'Please enter valid 6-digit OTP' });
                return;
            }

            setLoading(true);
            try {
                const response = await authAPI.verifyResetOTP(formData.email, formData.otp);
                setMessage({ type: 'success', text: 'OTP verified!' });

                // Store email and otp in session storage for reset page
                sessionStorage.setItem('resetEmail', formData.email);
                sessionStorage.setItem('resetOTP', formData.otp);

                setTimeout(() => {
                    navigate('/auth/reset-password');
                }, 1500);
            } catch (error) {
                setMessage({
                    type: 'error',
                    text: error.response?.data?.message || 'Invalid or expired OTP.'
                });
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4"
            style={{ background: 'linear-gradient(to bottom right, #D6E4F5, #7FA6D9)' }}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <button
                    onClick={() => navigate('/auth/login')}
                    className="flex items-center mb-6 transition text-sm"
                    style={{ color: 'var(--color-neutral, #979DA6)' }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-dark, #0A0A0A)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-neutral, #979DA6)'}
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Login
                </button>

                <div className="text-center mb-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: 'var(--color-primary, #2262B2)' }}>
                        <Lock className="text-white" size={25} />
                    </div>
                    <h2 className="text-2xl font-bold" style={{ color: 'var(--color-dark, #0A0A0A)' }}>
                        Forgot Password
                    </h2>
                    <p className="mt-2 text-sm" style={{ color: 'var(--color-neutral, #979DA6)' }}>
                        {step === 1 ? 'Enter your details to receive OTP' : 'Verify your identity'}
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

                <form onSubmit={handleForgotPassword}>
                    {step === 1 && (
                        <>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm" style={{ color: 'var(--color-dark, #0A0A0A)' }}>
                                    Reset via
                                </label>
                                <div className="flex gap-4 mb-4">
                                    <button
                                        type="button"
                                        onClick={() => setOtpMethod('email')}
                                        className="flex-1 py-2 px-4 rounded-lg border-2 transition"
                                        style={otpMethod === 'email' ? {
                                            borderColor: 'var(--color-primary, #2262B2)',
                                            backgroundColor: 'var(--color-primary-lightest, #D6E4F5)',
                                            color: 'var(--color-primary-dark-2, #153E72)'
                                        } : {
                                            borderColor: '#E5E7EB',
                                            color: 'var(--color-neutral, #979DA6)'
                                        }}
                                    >
                                        <Mail className="inline mr-2" size={18} />
                                        Email
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setOtpMethod('phone')}
                                        className="flex-1 py-2 px-4 rounded-lg border-2 transition"
                                        style={otpMethod === 'phone' ? {
                                            borderColor: 'var(--color-primary, #2262B2)',
                                            backgroundColor: 'var(--color-primary-lightest, #D6E4F5)',
                                            color: 'var(--color-primary-dark-2, #153E72)'
                                        } : {
                                            borderColor: '#E5E7EB',
                                            color: 'var(--color-neutral, #979DA6)'
                                        }}
                                    >
                                        <Phone className="inline mr-2" size={18} />
                                        Phone
                                    </button>
                                </div>

                                {otpMethod === 'email' ? (
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3"
                                            style={{ color: 'var(--color-neutral, #979DA6)' }}
                                            size={20} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                                            style={{
                                                borderColor: '#E5E7EB',
                                                '--tw-ring-color': 'var(--color-primary, #2262B2)'
                                            }}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3"
                                            style={{ color: 'var(--color-neutral, #979DA6)' }}
                                            size={20} />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                                            style={{
                                                borderColor: '#E5E7EB',
                                                '--tw-ring-color': 'var(--color-primary, #2262B2)'
                                            }}
                                            placeholder="Enter your phone"
                                        />
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                                style={{ backgroundColor: 'var(--color-primary, #2262B2)' }}
                                onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = 'var(--color-primary-dark-1, #1B4F91)')}
                                onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = 'var(--color-primary, #2262B2)')}
                            >
                                {loading ? 'Sending OTP...' : 'Send OTP'}
                            </button>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="text-center mb-6">
                                <p style={{ color: 'var(--color-neutral, #979DA6)' }}>
                                    Enter the 6-digit code sent to your {otpMethod}
                                </p>
                            </div>

                            <div className="mb-6">
                                <label className="block mb-2 text-sm" style={{ color: 'var(--color-dark, #0A0A0A)' }}>
                                    OTP Code
                                </label>
                                <input
                                    type="text"
                                    name="otp"
                                    value={formData.otp}
                                    onChange={handleInputChange}
                                    maxLength="6"
                                    className="w-full px-4 py-3 border rounded-lg text-center text-2xl tracking-widest focus:outline-none focus:ring-2"
                                    style={{
                                        borderColor: '#E5E7EB',
                                        '--tw-ring-color': 'var(--color-primary, #2262B2)'
                                    }}
                                    placeholder="000000"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                                style={{ backgroundColor: 'var(--color-primary, #2262B2)' }}
                                onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = 'var(--color-primary-dark-1, #1B4F91)')}
                                onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = 'var(--color-primary, #2262B2)')}
                            >
                                {loading ? 'Verifying...' : 'Verify OTP'}
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-full mt-3 font-medium transition"
                                style={{ color: 'var(--color-primary, #2262B2)' }}
                                onMouseEnter={(e) => e.target.style.color = 'var(--color-primary-dark-1, #1B4F91)'}
                                onMouseLeave={(e) => e.target.style.color = 'var(--color-primary, #2262B2)'}
                            >
                                Resend OTP
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;