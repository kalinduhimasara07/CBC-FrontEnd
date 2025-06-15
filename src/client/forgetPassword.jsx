import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: email, 2: otp + new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSendOTP() {
    if (!email) {
      toast.error("Please enter your email address", {
        icon: "❌",
        duration: 4000,
        style: {
          background: "white",
          color: "#e17100",
          fontSize: "16px",
          marginTop: "80px",
        },
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/send-otp",
        { email }
      );
      
      toast.success("OTP sent to your email! Check your inbox 📧", {
        icon: "✅",
        duration: 6000,
        position: "top-right",
        style: {
          background: "white",
          color: "#e17100",
          fontSize: "16px",
          marginTop: "80px",
        },
      });
      
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send OTP", {
        icon: "❌",
        duration: 6000,
        style: {
          background: "white",
          color: "#e17100",
          fontSize: "16px",
          marginTop: "80px",
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResetPassword() {
    if (!otp || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields", {
        icon: "❌",
        duration: 4000,
        style: {
          background: "white",
          color: "#e17100",
          fontSize: "16px",
          marginTop: "80px",
        },
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", {
        icon: "❌",
        duration: 4000,
        style: {
          background: "white",
          color: "#e17100",
          fontSize: "16px",
          marginTop: "80px",
        },
      });
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long", {
        icon: "❌",
        duration: 4000,
        style: {
          background: "white",
          color: "#e17100",
          fontSize: "16px",
          marginTop: "80px",
        },
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/reset-password",
        { 
          email, 
          otp: parseInt(otp), 
          newPassword 
        }
      );
      
      toast.success("Password reset successfully! You can now login 🎉", {
        icon: "✅",
        duration: 6000,
        position: "top-right",
        style: {
          background: "white",
          color: "#e17100",
          fontSize: "16px",
          marginTop: "80px",
        },
      });
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to reset password", {
        icon: "❌",
        duration: 6000,
        style: {
          background: "white",
          color: "#e17100",
          fontSize: "16px",
          marginTop: "80px",
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleBackToEmail = () => {
    setStep(1);
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="pt-[80px] w-full">
      {/* Header placeholder - replace with your actual Header component */}
      

      <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-gradient-to-br from-[#fff3e6] via-white to-[#fff0e0] relative overflow-hidden">
        {/* Glowing background circles */}
        <div className="absolute w-96 h-96 bg-[#e17100]/20 rounded-full top-10 left-10 blur-[100px] z-0"></div>
        <div className="absolute w-80 h-80 bg-[#e17100]/30 rounded-full bottom-10 right-10 blur-[120px] z-0"></div>

        {/* Forgot Password Card */}
        <div className="relative z-10 w-full md:w-[50%] flex items-center justify-center p-4">
          <div className="w-full max-w-md backdrop-blur-md rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-6 bg-white/30 p-10 border border-white/20">
            
            {/* Step 1: Email Input */}
            {step === 1 && (
              <>
                {/* Title */}
                <h1 className="text-4xl font-bold text-[#e17100] tracking-wide text-center drop-shadow-md">
                  Forgot Password
                </h1>
                <p className="text-md text-gray-700 font-medium -mt-4 mb-2 text-center">
                  Enter your email to receive an OTP 📧
                </p>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-[300px] h-[50px] px-4 rounded-2xl border border-[#e17100]/50 bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#e17100]"
                />

                <button
                  onClick={handleSendOTP}
                  disabled={isLoading}
                  className={`w-[300px] h-[50px] rounded-2xl font-bold shadow-lg transition duration-300 ${
                    isLoading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#e17100] hover:bg-[#c96100] text-white"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 01-8 8z"
                        />
                      </svg>
                      Sending OTP...
                    </div>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </>
            )}

            {/* Step 2: OTP and New Password */}
            {step === 2 && (
              <>
                {/* Title */}
                <h1 className="text-3xl font-bold text-[#e17100] tracking-wide text-center drop-shadow-md">
                  Reset Password
                </h1>
                <p className="text-sm text-gray-700 font-medium -mt-4 mb-2 text-center">
                  Enter the OTP sent to <span className="font-semibold text-[#e17100]">{email}</span>
                </p>

                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  className="w-[300px] h-[50px] px-4 rounded-2xl border border-[#e17100]/50 bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#e17100] text-center text-lg font-mono"
                />

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  required
                  className="w-[300px] h-[50px] px-4 rounded-2xl border border-[#e17100]/50 bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#e17100]"
                />

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  required
                  className="w-[300px] h-[50px] px-4 rounded-2xl border border-[#e17100]/50 bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#e17100]"
                />

                <button
                  onClick={handleResetPassword}
                  disabled={isLoading}
                  className={`w-[300px] h-[50px] rounded-2xl font-bold shadow-lg transition duration-300 ${
                    isLoading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#e17100] hover:bg-[#c96100] text-white"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 01-8 8z"
                        />
                      </svg>
                      Resetting...
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </button>

                <button
                  onClick={handleBackToEmail}
                  disabled={isLoading}
                  className="text-[#e17100] font-semibold underline hover:text-[#c96100] transition duration-300"
                >
                  ← Back to email
                </button>
              </>
            )}

            {/* Loading Overlay */}
            {isLoading && (
              <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50 backdrop-blur-sm">
                <div className="flex flex-col items-center">
                  <svg
                    className="animate-spin h-10 w-10 text-[#e17100]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 01-8 8z"
                    />
                  </svg>
                  <p className="mt-4 text-[#e17100] font-semibold text-lg">
                    {step === 1 ? "Sending OTP..." : "Resetting password..."}
                  </p>
                </div>
              </div>
            )}

            {/* Footer */}
            <p className="text-sm text-gray-700 text-center font-medium">
              Remember your password?{" "}
              <span
                className="text-[#e17100] font-semibold underline cursor-pointer hover:text-[#c96100]"
                onClick={() => navigate("/login")}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}