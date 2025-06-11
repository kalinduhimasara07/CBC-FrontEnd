import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBoxOpen, FaUsers, FaClipboardList, FaUser } from "react-icons/fa";

import { IoHome } from "react-icons/io5";
import AdminOrdersPage from "./adminOrdersPage";
import AdminUsersPage from "./adminUsersPage";
import { MdOutlineRateReview } from "react-icons/md";
import AddUserPage from "./addUserPage";
import ReviewPage from "./reviewPage";
import AdminHomePage from "./adminHome";
import AdminProductsPage from "./adminProductPage";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/loading";

import toast from "react-hot-toast";
import AddProductPage from "./addProductPage";
import EditProductPage from "./editProduct";


export default function AdminPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
    }
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.role !== "admin") {
          toast.error("You are not authorized to access this page");
          navigate("/login");
        } else {
          setUser(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        // toast.error("Error fetching user details");
        navigate("/login");
      });
  }, []);

  function getClass(pathname) {
    if (path.includes(pathname)) {
      return "text-black bg-gray-200 w-[200px] rounded-lg px-3 py-2 transition duration-300";
    } else {
      return "text-white w-[200px] hover:text-black hover:bg-gray-200 rounded-lg px-3 py-2 transition duration-300";
    }
  }

  const handleClick = () => {
    navigate("/admin/home");
  };
  return (
    <>
      {user === null ? (
        <div className="h-screen ">
          <Loading />
        </div>
      ) : (
        <div className="w-full h-screen flex">
          <div className="h-full w-[20%] bg-[#e17100] flex flex-col justify-between pl-7 py-6 text-white text-lg font-semibold">
            {/* Top section: Navigation */}
            <div className="flex flex-col items-start gap-6">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center px-5 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-xl shadow-md hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Go Back
              </button>

              <Link
                to="/admin/home"
                className={`flex items-center gap-3 mt-6 ${getClass(
                  "/admin/home"
                )}`}
              >
                <IoHome /> Home
              </Link>

              <Link
                to="/admin/product"
                className={`flex items-center gap-3 ${getClass(
                  "/admin/product"
                )}`}
              >
                <FaBoxOpen /> Products
              </Link>

              <Link
                to="/admin/users"
                className={`flex items-center gap-3 ${getClass(
                  "/admin/users"
                )}`}
              >
                <FaUsers /> Users
              </Link>

              <Link
                to="/admin/order"
                className={`flex items-center gap-3 ${getClass(
                  "/admin/order"
                )}`}
              >
                <FaClipboardList /> Orders
              </Link>

              <Link
                to="/admin/reviews"
                className={`flex items-center gap-3 ${getClass(
                  "/admin/reviews"
                )}`}
              >
                <MdOutlineRateReview /> Reviews
              </Link>

              <Link
                to="/admin/adduser"
                className={`flex items-center gap-3 ${getClass(
                  "/admin/adduser"
                )}`}
              >
                <FaUser /> Add User
              </Link>
            </div>

            {/* Bottom section: Admin info + Logout */}
            <div className="flex flex-col items-start gap-4 border-t border-white pt-6">
              <div className="text-sm text-white/80">👤 Admin</div>
              <button
                // Replace this with your logout logic
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/"); // Refresh the page to reset all state
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="h-full w-[80%] bg-white">
            {path === "/admin/home" && <AdminHomePage />}
            {path === "/admin/product" && <AdminProductsPage />}
            {path === "/admin/users" && <AdminUsersPage />}
            {path === "/admin/order" && <AdminOrdersPage />}
            {path === "/admin/reviews" && <ReviewPage />}
            {path === "/admin/adduser" && <AddUserPage />}
            {path === "/admin/edit-product" && <EditProductPage/>}
            {path === "/admin/add-product" && <AddProductPage />}
          </div>
        </div>
      )}
    </>
  );
}
