import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddUserPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [createdUser, setCreatedUser] = useState({});

  const role = "admin";

  async function handleSignup() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/",
        {
          email,
          firstName,
          lastName,
          password,
          role,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("User added successfully!");
      setCreatedUser({ firstName, lastName, email });
      setShowNotification(true);

      // Clear inputs
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
    } catch (error) {
      toast.error("Add User failed");
    }
  }

  return (
    <div className="">
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#fff3e6] via-white to-[#fff0e0] relative overflow-hidden">
        {/* Background glow circles */}
        <div className="absolute w-96 h-96 bg-[#e17100]/20 rounded-full top-20 left-20 blur-[100px] z-0"></div>
        <div className="absolute w-80 h-80 bg-[#e17100]/30 rounded-full bottom-20 right-20 blur-[120px] z-0"></div>

        <div className="relative z-10 w-full md:w-[50%] h-full flex items-center justify-center p-4">
          <div className="w-full max-w-md h-auto backdrop-blur-md rounded-3xl shadow-2xl flex flex-col items-center justify-center gap-4 bg-white/40 p-6 border border-white/20">
            <h1 className="text-4xl font-bold text-[#e17100] tracking-wide text-center drop-shadow-md">
              Add Admin User
            </h1>

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

            <button
              onClick={handleSignup}
              className="w-[300px] h-[50px] rounded-2xl bg-[#e17100] hover:bg-[#c96100] text-white font-semibold shadow-xl hover:shadow-2xl transition duration-300"
            >
              Add User
            </button>
          </div>
        </div>

        {/* Floating Notification */}
        {showNotification && (
          <div className="absolute top-8 right-8 bg-white border border-[#e17100] rounded-xl shadow-lg p-4 z-50 w-80 animate-fade-in-down">
            <h2 className="text-xl font-semibold text-[#e17100] mb-2">User Added</h2>
            <p><strong>First Name:</strong> {createdUser.firstName}</p>
            <p><strong>Last Name:</strong> {createdUser.lastName}</p>
            <p><strong>Email:</strong> {createdUser.email}</p>
            <button
              onClick={() => setShowNotification(false)}
              className="mt-4 w-full bg-[#e17100] hover:bg-[#c96100] text-white py-2 px-4 rounded-xl transition duration-300"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
