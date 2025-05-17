import { useEffect, useState } from "react";
import { sampleProduct } from "../../assets/sample.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminProductPage() {
  const [products, setProducts] = useState(sampleProduct);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading === true) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoading]);

  function deleteProduct(productId) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Product deleted successfully");
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error deleting product");
      });
  }

  function confirmDelete(productId) {
    toast(
      (t) => (
        <span className="flex flex-col gap-2">
          <strong>Are you sure you want to delete?</strong>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                deleteProduct(productId);
                toast.dismiss(t.id);
              }}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-300 text-black px-3 py-1 rounded"
            >
              No
            </button>
          </div>
        </span>
      ),
      {
        duration: 10000,
      }
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6 relative">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Product List
      </h2>

      <button
        className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-700 transition"
        onClick={() => {
          navigate("/admin/add-product");
        }}
      >
        + Add Product
      </button>

      <div className="bg-white shadow-md rounded-lg">
        {/* Table Header */}
        <table className="min-w-full table-fixed border-collapse">
          <thead className="bg-gray-300 text-gray-700 text-sm uppercase tracking-wider sticky top-0 z-10">
            <tr>
              <th className="py-3 px-6 text-left">Product ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Stock</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
        </table>

        {/* Scrollable Table Body */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-[200px]">
              <div className="w-[80px] h-[80px] bg-amber-50 border-5 border-blue-300 rounded-full border-t-blue-600 animate-spin"></div>
            </div>
          ) : (
            <table className="min-w-full table-fixed border-collapse">
              <tbody>
                {products.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-200 transition hover:shadow-lg"
                  >
                    <td className="py-3 px-6 text-left font-medium text-gray-800">
                      {item.productId}
                    </td>
                    <td className="py-3 px-6 text-left text-gray-700">
                      {item.name}
                    </td>
                    <td className="py-3 px-6 text-left">
                      <img
                        src={item.images[0]}
                        className="w-16 h-16 rounded object-cover border border-gray-300"
                        alt={item.name}
                      />
                    </td>
                    <td className="py-3 px-6 text-left text-green-700 font-semibold">
                      LKR {item.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-6 text-left">{item.stock}</td>
                    <td>
                      <div className="py-3 px-6 flex gap-4 items-center justify-center text-2xl">
                        <FaEdit
                          onClick={() => {
                            navigate("/admin/edit-product/", {
                              state: item,
                            });
                          }}
                          className="text-blue-600 cursor-pointer"
                        />
                        <FaTrash
                          onClick={() => {
                            confirmDelete(item.productId);
                          }}
                          className="text-red-600 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
