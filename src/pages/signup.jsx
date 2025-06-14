import { useState } from "react";
import Header from "../components/header";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "No previous page";
  const cart = location.state?.cart || [];

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/users/google", {
          token: tokenResponse.access_token,
        })
        .then((res) => {
          const isNewUser = res.data.message === "Account created successfully";
          toast.success(
            isNewUser
              ? "Welcome to Crystal Beauty Clear! Your account was created 🎉"
              : "Welcome back to Crystal Beauty Clear! 🎉",
            {
              duration: 6000,
              position: "top-right",
              icon: isNewUser ? "🆕" : "🎉",
              style: {
                background: "white",
                color: "#e17100",
                fontSize: "18px",
                marginTop: "80px",
              },
            }
          );
          localStorage.setItem("token", res.data.token);
          if (from === "checkout") {
            navigate("/checkout", { state: { cart } });
          } else if (res.data.role === "admin") {
            navigate("/admin/home");
          } else {
            navigate("/products");
          }
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || "Login failed", {
            icon: "❌",
            duration: 6000,
            style: {
              background: "white",
              color: "#e17100",
              fontSize: "18px",
              marginTop: "80px",
            },
          });
        })
        .finally(() => {
          setIsGoogleLoading(false);
        });
    },
  });

  async function handleSignup() {
    setIsSignupLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/",
        {
          email,
          firstName,
          lastName,
          password,
        }
      );
      toast.success("Welcome to Crystal Beauty Clear!", {
        icon: "🎉",
        duration: 6000,
        position: "top-right",
        style: {
          background: "white",
          color: "#e17100",
          fontSize: "18px",
          marginTop: "80px",
        },
      });
      navigate("/login", { state: { from, cart } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed", {
        icon: "❌",
        duration: 6000,
        style: {
          background: "white",
          color: "#e17100",
          fontSize: "18px",
          marginTop: "80px",
        },
      });
    } finally {
      setIsSignupLoading(false);
    }
  }

  const handleGoogleSignup = () => {
    toast("Google signup coming soon ✨", {
      icon: "⚠️",
      duration: 5000,
      style: {
        background: "white",
        color: "#e17100",
        fontSize: "18px",
        marginTop: "80px",
      },
    });
  };

  return (
    <div className="pt-[80px]">
      <Header />
      <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-gradient-to-br from-[#fff3e6] via-white to-[#fff0e0] relative overflow-hidden">
        {/* Background glow circles */}
        <div className="absolute w-96 h-96 bg-[#e17100]/20 rounded-full top-20 left-20 blur-[100px] z-0"></div>
        <div className="absolute w-80 h-80 bg-[#e17100]/30 rounded-full bottom-20 right-20 blur-[120px] z-0"></div>

        <div className="relative z-10 w-full md:w-[50%] h-full flex items-center justify-center p-4">
          <div className="w-full max-w-md h-auto backdrop-blur-md rounded-3xl shadow-2xl flex flex-col items-center justify-center gap-4 bg-white/40 p-6 border border-white/20">
            <h1 className="text-4xl font-bold text-[#e17100] tracking-wide text-center drop-shadow-md">
              Crystal Beauty Clear
            </h1>
            <p className="text-sm text-gray-700 font-medium -mt-2 mb-1">
              Let your beauty shine ✨
            </p>
            {/* Then reduce footer text to text-xs or sm */}

            {/* Inputs */}
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              value={firstName}
              placeholder="First Name"
              className="w-[300px] h-[50px] px-4 rounded-2xl border border-[#e17100]/40 bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#e17100] shadow-sm"
            />

            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              value={lastName}
              placeholder="Last Name"
              className="w-[300px] h-[50px] px-4 rounded-2xl border border-[#e17100]/40 bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#e17100] shadow-sm"
            />

            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              placeholder="Email"
              className="w-[300px] h-[50px] px-4 rounded-2xl border border-[#e17100]/40 bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#e17100] shadow-sm"
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              placeholder="Password"
              className="w-[300px] h-[50px] px-4 rounded-2xl border border-[#e17100]/40 bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#e17100] shadow-sm"
            />

            {/* Sign Up Button */}
            <button
              onClick={handleSignup}
              disabled={isSignupLoading}
              className={`w-[300px] h-[50px] rounded-2xl font-semibold shadow-xl transition duration-300 ${
                isSignupLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#e17100] hover:bg-[#c96100] text-white"
              }`}
            >
              {isSignupLoading ? (
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
                  Signing up...
                </div>
              ) : (
                "Sign Up"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center w-full max-w-[300px] gap-2 text-sm text-gray-600">
              <div className="flex-grow h-[1px] bg-gray-300"></div>
              or
              <div className="flex-grow h-[1px] bg-gray-300"></div>
            </div>

            {/* Google Signup */}
            <button
              onClick={googleLogin}
              disabled={isGoogleLoading}
              className={`w-[300px] h-[50px] flex items-center justify-center gap-3 rounded-2xl font-semibold shadow-md transition duration-300 border ${
                isGoogleLoading
                  ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                  : "bg-white text-[#333] hover:shadow-lg border-gray-300"
              }`}
            >
              {isGoogleLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-[#e17100]"
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
                  Signing up...
                </>
              ) : (
                <>
                  <FcGoogle size={22} />
                  Sign up with Google
                </>
              )}
            </button>

            {/* Footer */}
            <p className="text-sm text-gray-700 text-center font-medium">
              Already have an account?{" "}
              <span
                className="text-[#e17100] font-semibold underline cursor-pointer hover:text-[#c96100]"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>

            <p className="text-xs text-gray-500 text-center max-w-sm leading-relaxed">
              By signing up, you agree to our{" "}
              <span className="underline cursor-pointer hover:text-[#e17100]">
                <Link to="/terms">Terms of Service</Link>
              </span>{" "}
              and{" "}
              <span className="underline cursor-pointer hover:text-[#e17100]">
                <Link to="/privacy">Privacy Policy</Link>
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
