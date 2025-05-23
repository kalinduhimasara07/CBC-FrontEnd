import { useState } from "react";
import Header from "../components/header";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignup() {
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
      toast.success("Signup successful!");
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data?.message || "Signup failed");
      toast.error(error.response?.data?.message || "Signup failed");
    }
  }

  return (
    <div className="pt-[80px]">
      <>
      <Header />
      <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-[url('/signup-background.png')] bg-cover bg-center">
        {/* Left Side */}
        <div className="w-[50%] h-full hidden md:block"></div>

        {/* Right Side - Form */}
        <div className="w-full md:w-[50%] h-full flex items-center justify-center p-4">
          <div className="w-full max-w-md h-auto backdrop-blur-md rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-6 bg-white/30 p-8 py-10">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg tracking-wide">
              Create Account
            </h1>

            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              value={firstName}
              placeholder="First Name"
              className="w-[300px] h-[50px] px-4 rounded-2xl border border-[#6a927f] bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#6a927f]"
            />

            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              value={lastName}
              placeholder="Last Name"
              className="w-[300px] h-[50px] px-4 rounded-2xl border border-[#6a927f] bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#6a927f]"
            />

            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              placeholder="Email"
              className="w-[300px] h-[50px] px-4 rounded-2xl border border-[#6a927f] bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#6a927f]"
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              placeholder="Password"
              className="w-[300px] h-[50px] px-4 rounded-2xl border border-[#6a927f] bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#6a927f]"
            />

            <button
              onClick={handleSignup}
              className="w-[300px] h-[50px] rounded-2xl bg-[#74a7cf] hover:bg-[#5e92bc] text-white font-bold shadow-md transition duration-300"
            >
              Sign Up
            </button>

            <p className="text-sm text-[#f0f4f8] p-2 bg-black/60 rounded-xl backdrop-blur-sm shadow-md">
              Already have an account?{" "}
              <span
                className="underline cursor-pointer text-white font-medium hover:text-[#cde4f7] transition duration-200"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
            
            <p className="text-sm  drop-shadow-sm max-w-md mx-auto leading-relaxed">
              By signing up, you agree to our{" "}
              <span
                className="underline cursor-pointer text-white font-semibold hover:text-[#a8d0ff] transition-colors duration-300"
                role="link"
                tabIndex={0}
              >
                Terms of Service
              </span>{" "}
              and{" "}
              <span
                className="underline cursor-pointer text-white font-semibold hover:text-[#a8d0ff] transition-colors duration-300"
                role="link"
                tabIndex={0}
              >
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </>
    </div>
  );
}
