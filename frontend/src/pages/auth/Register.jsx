import React, { useState } from "react";
import { Mail, Phone, Lock, User, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "CUSTOMER", // Default role
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ type: "", text: "" });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setMessage({ type: "error", text: "Please fill in all fields" });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    if (formData.password.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters",
      });
      return;
    }

    setLoading(true);
    try {
      // Split the full name into firstName and lastName
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || null;

      // Send data matching Prisma schema structure
      const response = await register({
        email: formData.email,
        password: formData.password,
        firstName: firstName,
        lastName: lastName,
        phone: formData.phone,
        role: formData.role,
      });

      setMessage({
        type: "success",
        text:
          response.message ||
          "Registration successful! Redirecting to verify OTP...",
      });

      setTimeout(() => {
        navigate("/auth/verify-otp", { state: { email: formData.email } });
      }, 2000);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-linear-to-br from-blue-50 to-indigo-100 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white rounded-2xl shadow-xl p-8">
        <button
          onClick={() => navigate("/auth/login")}
          className="flex items-center mb-6 transition text-sm text-gray-500 hover:text-black"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </button>

        <div>
          <h2 className="mt-6 text-3xl font-bold text-center text-gray-900">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Join Pune Dream Homes today
          </p>
        </div>

        {message.text && (
          <div
            className={`p-4 rounded-lg ${
              message.type === "error"
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-green-50 text-green-700 border border-green-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91 1234567890"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am a:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["CUSTOMER", "BUILDER"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData({ ...formData, role })}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border transition-all ${
                      formData.role === role
                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    {role === "CUSTOMER"
                      ? "User"
                      : role.charAt(0) + role.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </div>

          <div className="text-sm text-center">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/auth/login")}
              className="font-bold text-blue-600 hover:text-blue-800"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
