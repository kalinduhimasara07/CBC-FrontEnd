import React from "react";
import { UserCircle } from "lucide-react"; // optional icon
import { IoHome } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function AdminHome() {
    const navigate = useNavigate();
    function HandleHomeButton(){
        navigate('/');
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-400">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <UserCircle className="h-16 w-16 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome, Admin!
        </h1>
        <p className="text-gray-600 mb-6">
          You have successfully logged into the admin dashboard.
        </p>
        {/* <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
          Go to Dashboard
        </button> */}
        <div className="flex justify-center items-center">
          <button onClick={HandleHomeButton} className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition flex">
            <FaArrowLeft /><IoHome />
          </button>
        </div>
      </div>
    </div>
  );
}
