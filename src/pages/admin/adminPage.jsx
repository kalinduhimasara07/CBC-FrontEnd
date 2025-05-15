import { Link, Route, Routes } from "react-router-dom";
import { FaBoxOpen, FaUsers, FaClipboardList, FaTags } from "react-icons/fa";

import AdminProductPage from "./adminProductPage";
import AddProductPage from "./addProductPage";
import EditProductPage from "./editProduct";

export default function AdminPage() {
  return (
    <>
      <div className="w-full h-screen flex">
        <div className="h-full w-[20%] bg-blue-700 flex flex-col items-start  pl-7 py-6 gap-6 text-white text-lg font-semibold">
          <Link to="/admin/product" className="flex items-center gap-3 mt-6">
            <FaBoxOpen /> Products
          </Link>
          <Link to="/admin/user" className="flex items-center gap-3">
            <FaUsers /> Users
          </Link>
          <Link to="/admin/order" className="flex items-center gap-3">
            <FaClipboardList /> Orders
          </Link>
          <Link to="/admin/category" className="flex items-center gap-3">
            <FaTags /> Categories
          </Link>
        </div>
        <div className="h-full w-[80%] bg-amber-400">
          <Routes>
            <Route path="/product" element={<AdminProductPage />} />
            <Route path="/user" element={<h1>User</h1>} />
            <Route path="/order" element={<h1>Order</h1>} />
            <Route path="/category" element={<h1>Category</h1>} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/edit-product/" element={<EditProductPage/>} />
          </Routes>
        </div>
      </div>
    </>
  );
}
