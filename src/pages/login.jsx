import { use, useState } from "react";
import Header from "../components/header";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const cart = location.state?.cart || [];
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setIsLoading(true); // Start loading
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/users/google", {
          token: tokenResponse.access_token,
        })
        .then((res) => {
          const isNewUser = res.data.message === "Account created successfully";
          toast.success(
            isNewUser
              ? "Welcome to Lumineé! Your account was created 🎉"
              : "Welcome back to Lumineé! 🎉",
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
          setIsLoading(false); // Stop loading
        });
    },
  });

  async function handleLogin() {
    setIsLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/login",
        { email, password }
      );
      toast.success("Welcome back to Lumineé!", {
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
      localStorage.setItem("token", response.data.token);
      // navigate(response.data.role == "admin" ? "/admin" : "/");
      // If the user was redirected from a specific page, navigate there
      if (from === "checkout") {
        navigate("/checkout", { state: { cart } });
      } else if (response.data.role == "admin") {
        navigate("/admin/home");
      } else {
        navigate("/products");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed", {
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
      setIsLoading(false);
    }
  }

  const handleGoogleLogin = () => {
    // toast("Google login coming soon!", { icon: "⚠️", duration: 5000, style: { background: "white", color: "#e17100", fontSize: "18px", marginTop: "80px" } });
    // window.open(import.meta.env.VITE_BACKEND_URL + "/api/users/google", "_self");
  };

  return (
    <div className="pt-[80px]">
      <Header />
      <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-gradient-to-br from-[#fff3e6] via-white to-[#fff0e0] relative overflow-hidden">
        {/* Glowing background circles */}
        <div className="absolute w-96 h-96 bg-[#e17100]/20 rounded-full top-10 left-10 blur-[100px] z-0"></div>
        <div className="absolute w-80 h-80 bg-[#e17100]/30 rounded-full bottom-10 right-10 blur-[120px] z-0"></div>

        {/* Login Card */}
        <div className="relative z-10 w-full md:w-[50%] flex items-center justify-center p-4">
          <div className="w-full max-w-md backdrop-blur-md rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-6 bg-white/30 p-10 border border-white/20">
            {/* Title */}
            <h1 className="text-5xl font-bold text-[#e17100] tracking-wide text-center drop-shadow-md">
              Lumineé
            </h1>
            <p className="text-md text-gray-700 font-medium -mt-4 mb-2">
              Beauty begins with confidence ✨
            </p>

            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              placeholder="Email"
              required
              className="w-[300px] h-[50px] px-4 rounded-2xl border border-[#e17100]/50 bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#e17100]"
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              required
              placeholder="Password"
              className="w-[300px] h-[50px] px-4 rounded-2xl border border-[#e17100]/50 bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#e17100]"
            />

            <button
              onClick={handleLogin}
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
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center w-full max-w-[300px] gap-2 text-sm text-gray-600">
              <div className="flex-grow h-[1px] bg-gray-300"></div>
              or
              <div className="flex-grow h-[1px] bg-gray-300"></div>
            </div>

            <button
              onClick={googleLogin}
              disabled={isLoading}
              className={`w-[300px] h-[50px] flex items-center justify-center gap-3 rounded-2xl font-semibold transition duration-300 border border-gray-300 ${
                isLoading
                  ? "bg-gray-200 cursor-not-allowed text-gray-500"
                  : "bg-white text-[#333] hover:shadow-lg shadow-md cursor-pointer"
              }`}
            >
              <FcGoogle size={22} />
              {isLoading ? "Please wait..." : "Sign in with Google"}
            </button>

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
                    Signing you in...
                  </p>
                </div>
              </div>
            )}

            {/* Footer */}
            <p className="text-sm text-gray-700 text-center font-medium">
              Don&apos;t have an account?{" "}
              <span
                className="text-[#e17100] font-semibold underline cursor-pointer hover:text-[#c96100]"
                onClick={() => navigate("/signup")}
              >
                Sign up
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
