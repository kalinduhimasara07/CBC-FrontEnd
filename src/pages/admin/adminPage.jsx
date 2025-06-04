import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  FaBoxOpen,
  FaUsers,
  FaClipboardList,
  FaTags,
  FaUser,
} from "react-icons/fa";

import AdminProductPage from "./adminProductPage";
import AddProductPage from "./addProductPage";
import EditProductPage from "./editProduct";
import { IoHome } from "react-icons/io5";
import AdminOrdersPage from "./adminOrdersPage";
import AdminUsersPage from "./adminUsersPage";
import { MdOutlineRateReview } from "react-icons/md";
import AddUserPage from "./addUserPage";
import ReviewPage from "./reviewPage";
import AdminHomePage from "./adminHome";
import AdminProductsPage from "./testAdminProduct";

export default function AdminPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

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
              className={`flex items-center gap-3 ${getClass("/admin/users")}`}
            >
              <FaUsers /> Users
            </Link>

            <Link
              to="/admin/order"
              className={`flex items-center gap-3 ${getClass("/admin/order")}`}
            >
              <FaClipboardList /> Orders
            </Link>

            <Link
              to="/admin/category"
              className={`flex items-center gap-3 ${getClass(
                "/admin/category"
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
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="h-full w-[80%] bg-white">
          <Routes>
            <Route path="/product" element={<AdminProductsPage />} />
            <Route path="/users" element={<AdminUsersPage />} />
            <Route path="/home" element={<AdminHomePage />} />
            <Route path="/order" element={<AdminOrdersPage />} />
            <Route path="/category" element={<ReviewPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/edit-product/" element={<EditProductPage />} />
            <Route path="/adduser" element={<AddUserPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
