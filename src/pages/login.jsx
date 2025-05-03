import { useState } from "react";
import Header from "../components/header";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email: email,
        password: password,
      });
      toast.success("Login successful!");
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }
  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-[url('/login-background.png')] bg-cover bg-center">
        <div className="w-[50%] h-full "></div>
        <div className="w-[50%] h-full  flex items-center justify-center">
          <div className="w-[500px] h-[600px] backdrop-blur-md rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-4 bg-white/30">
            <h1 className="text-4xl font-bold text-white">Login</h1>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              value={email}
              className="w-[300px] h-[50px] rounded-2xl border border-[#6a927f]"
            />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              value={password}
              className="w-[300px] h-[50px] rounded-2xl border border-[#6a927f]"
            />
            <button
              onClick={handleLogin}
              className="w-[300px] h-[50px] rounded-2xl bg-[#6a927f] text-white font-bold"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
