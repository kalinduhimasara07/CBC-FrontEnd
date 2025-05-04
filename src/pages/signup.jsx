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
    <>
      <Header />
      <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-[url('/login-background.png')] bg-cover bg-center">
        {/* Left Side */}
        <div className="w-[50%] h-full hidden md:block"></div>

        {/* Right Side - Form */}
        <div className="w-full md:w-[50%] h-full flex items-center justify-center p-4">
          <div className="w-full max-w-md h-auto backdrop-blur-md rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-6 bg-white/30 p-8 py-10">
            <h1 className="text-4xl font-bold text-white drop-shadow">Sign Up</h1>

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
              className="w-[300px] h-[50px] rounded-2xl bg-[#6a927f] hover:bg-[#5c816f] text-white font-bold transition duration-300"
            >
              Sign Up
            </button>

            <p className="text-sm text-white/80">
              Already have an account?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
