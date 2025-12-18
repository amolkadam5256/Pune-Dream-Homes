import React, { useState } from 'react';
import { Mail, Phone, Lock, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { register, verifyOTP } = useAuth();
    const [otpMethod, setOtpMethod] = useState('email');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        otp: ''
    });
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setMessage({ type: '', text: '' });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (step === 1) {
            if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
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

            setLoading(true);
            try {
                const response = await register({
                    fullName: formData.name,
                    email: formData.email,
                    phoneNumber: formData.phone,
                    password: formData.password,
                    role: 'customer'
                });

                setMessage({ type: 'info', text: response.message || 'OTP sent to your email.' });
                setStep(2);
            } catch (error) {
                setMessage({
                    type: 'error',
                    text: error.response?.data?.message || 'Registration failed. Please try again.'
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
                const response = await verifyOTP(formData.email, formData.otp);

                setMessage({ type: 'success', text: 'Account created and verified successfully!' });
                setTimeout(() => {
                    navigate('/customer/dashboard');
                }, 1500);
            } catch (error) {
                setMessage({
                    type: 'error',
                    text: error.response?.data?.message || 'Verification failed. Please try again.'
                });
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4"
            style={{ background: 'linear-gradient(to bottom right, #D6E4F5, #4D82C6)' }}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <button
                    onClick={() => navigate('/auth/login')}
                    className="flex items-center mb-6 transition text-sm"
                    style={{ color: '#979DA6' }}
                    onMouseEnter={(e) => e.target.style.color = '#0A0A0A'}
                    onMouseLeave={(e) => e.target.style.color = '#979DA6'}
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Login
                </button>

                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: '#2262B2' }}>
                        <User className="text-white" size={25} />
                    </div>
                    <h2 className="text-2xl font-bold" style={{ color: '#0A0A0A' }}>
                        Create Account
                    </h2>
                    <p className="mt-2 text-sm" style={{ color: '#979DA6' }}>
                        Step {step} of 2
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

                <form onSubmit={handleSignup}>
                    {step === 1 ? (
                        <>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm" style={{ color: '#0A0A0A' }}>
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3"
                                        style={{ color: '#979DA6' }}
                                        size={20} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                                        style={{ borderColor: '#E5E7EB' }}
                                        onFocus={(e) => e.target.style.borderColor = '#2262B2'}
                                        onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                        placeholder="Enter your name"
                                    />
                                </div>
                            </div>

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
                                        style={{ borderColor: '#E5E7EB' }}
                                        onFocus={(e) => e.target.style.borderColor = '#2262B2'}
                                        onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-sm" style={{ color: '#0A0A0A' }}>
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3"
                                        style={{ color: '#979DA6' }}
                                        size={20} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                                        style={{ borderColor: '#E5E7EB' }}
                                        onFocus={(e) => e.target.style.borderColor = '#2262B2'}
                                        onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                        placeholder="Enter your phone"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
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
                                        style={{ borderColor: '#E5E7EB' }}
                                        onFocus={(e) => e.target.style.borderColor = '#2262B2'}
                                        onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                        placeholder="Create password"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-sm" style={{ color: '#0A0A0A' }}>
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3"
                                        style={{ color: '#979DA6' }}
                                        size={20} />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                                        style={{ borderColor: '#E5E7EB' }}
                                        onFocus={(e) => e.target.style.borderColor = '#2262B2'}
                                        onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                        placeholder="Confirm password"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block mb-2 text-sm" style={{ color: '#0A0A0A' }}>
                                    Verify via
                                </label>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setOtpMethod('email')}
                                        className="flex-1 py-2 px-4 rounded-lg border-2 transition"
                                        style={otpMethod === 'email' ? {
                                            borderColor: '#2262B2',
                                            backgroundColor: '#D6E4F5',
                                            color: '#153E72'
                                        } : {
                                            borderColor: '#E5E7EB',
                                            color: '#979DA6'
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
                                            borderColor: '#2262B2',
                                            backgroundColor: '#D6E4F5',
                                            color: '#153E72'
                                        } : {
                                            borderColor: '#E5E7EB',
                                            color: '#979DA6'
                                        }}
                                    >
                                        <Phone className="inline mr-2" size={18} />
                                        Phone
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                                style={{ backgroundColor: '#2262B2' }}
                                onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#1B4F91')}
                                onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#2262B2')}
                            >
                                {loading ? 'Sending OTP...' : 'Continue'}
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="text-center mb-6">
                                <p style={{ color: '#979DA6' }}>
                                    Enter the 6-digit code sent to your {otpMethod}
                                </p>
                                <p className="text-sm font-medium mt-2"
                                    style={{ color: '#2262B2' }}>
                                    {otpMethod === 'email' ? formData.email : formData.phone}
                                </p>
                            </div>

                            <div className="mb-6">
                                <label className="block mb-2 text-sm" style={{ color: '#0A0A0A' }}>
                                    OTP Code
                                </label>
                                <input
                                    type="text"
                                    name="otp"
                                    value={formData.otp}
                                    onChange={handleInputChange}
                                    maxLength="6"
                                    className="w-full px-4 py-3 border rounded-lg text-center text-2xl tracking-widest focus:outline-none focus:ring-2"
                                    style={{ borderColor: '#E5E7EB' }}
                                    onFocus={(e) => e.target.style.borderColor = '#2262B2'}
                                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                    placeholder="000000"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                                style={{ backgroundColor: '#2262B2' }}
                                onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#1B4F91')}
                                onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#2262B2')}
                            >
                                {loading ? 'Verifying...' : 'Verify & Create Account'}
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-full mt-3 font-medium transition"
                                style={{ color: '#2262B2' }}
                                onMouseEnter={(e) => e.target.style.color = '#1B4F91'}
                                onMouseLeave={(e) => e.target.style.color = '#2262B2'}
                            >
                                Change {otpMethod}
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Register;