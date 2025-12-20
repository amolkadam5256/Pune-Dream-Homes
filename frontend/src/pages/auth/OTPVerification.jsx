import React, { useState, useEffect } from "react";
import { Mail, ArrowLeft, ShieldCheck } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authAPI } from "../../api/endpoints/auth.api";

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOTP } = useAuth();

  // Get email from location state or query params
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const stateEmail = location.state?.email;
    const searchParams = new URLSearchParams(location.search);
    const queryEmail = searchParams.get("email");

    const finalEmail = stateEmail || queryEmail;
    if (!finalEmail) {
      navigate("/auth/login");
      return;
    }
    setEmail(finalEmail);
  }, [location, navigate]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setMessage({ type: "error", text: "Please enter a valid 6-digit OTP" });
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOTP(email, otp);
      setMessage({ type: "success", text: "Email verified successfully!" });

      setTimeout(() => {
        if (response.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/customer/dashboard");
        }
      }, 1500);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Verification failed. Please check the OTP.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0) return;

    setResending(true);
    try {
      await authAPI.resendOTP(email);
      setMessage({ type: "success", text: "New OTP sent to your email!" });
      setTimer(60);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to resend OTP.",
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(to bottom right, #D6E4F5, #7FA6D9)",
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <button
          onClick={() => navigate("/auth/login")}
          className="flex items-center mb-6 transition text-sm text-gray-500 hover:text-black"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Login
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-blue-100 text-blue-600">
            <ShieldCheck size={35} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            We've sent a 6-digit code to{" "}
            <span className="font-semibold text-blue-600">{email}</span>
          </p>
        </div>

        {message.text && (
          <div
            className={`mb-6 p-4 rounded-xl text-sm font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-100"
                : "bg-red-50 text-red-700 border border-red-100"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleVerify}>
          <div className="mb-8">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Enter OTP Code
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength="6"
              className="w-full px-4 py-4 border-2 rounded-xl text-center text-3xl font-bold tracking-[0.5em] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              placeholder="000000"
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">Didn't receive the code?</p>
          <button
            onClick={handleResendOTP}
            disabled={timer > 0 || resending}
            className={`mt-2 font-bold transition-all ${
              timer > 0 || resending
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:text-blue-800"
            }`}
          >
            {resending
              ? "Sending..."
              : timer > 0
              ? `Resend code in ${timer}s`
              : "Resend OTP Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
