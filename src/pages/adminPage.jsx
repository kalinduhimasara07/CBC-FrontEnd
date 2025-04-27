import { Link, Route, Routes } from "react-router-dom";

export default function AdminPage() {
  return (
    <>
      <div className="w-full h-screen flex">
        <div className="h-full w-[20%] bg-blue-700 flex flex-col items-center gap-4">
            <Link to="/admin/product" className="text-white text-lg font-semibold ">Products</Link>
            <Link to="/admin/user" className="text-white text-lg font-semibold ">Users</Link>
            <Link to="/admin/order" className="text-white text-lg font-semibold ">Orders</Link>
            <Link to="/admin/category" className="text-white text-lg font-semibold ">Categories</Link>
        </div>
        <div className="h-full w-[80%] bg-amber-400">
            <Routes path="/*">
                <Route path="/product" element={<h1>Product</h1>} />
                <Route path="/user" element={<h1>User</h1>} />
                <Route path="/order" element={<h1>Order</h1>} />
                <Route path="/category" element={<h1>Category</h1>} />
            </Routes>
        </div>
      </div>
    </>
  );
}
