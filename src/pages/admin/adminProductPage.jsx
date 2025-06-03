import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  function handleRowClick(product, event) {
    // Prevent modal from opening when clicking on action buttons
    if (event.target.closest(".action-buttons")) {
      return;
    }
    setSelectedProduct(product);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setSelectedProduct(null);
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

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
          <table className="min-w-full table-fixed border-collapse">
            <thead className="bg-gray-300 text-gray-700 text-sm uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="py-3 px-6 text-left w-[15%]">Product ID</th>
                <th className="py-3 px-6 text-left w-[20%]">Name</th>
                <th className="py-3 px-6 text-left w-[15%]">Image</th>
                <th className="py-3 px-6 text-left w-[15%]">Price</th>
                <th className="py-3 px-6 text-left w-[15%]">Stock</th>
                <th className="py-3 px-6 text-center w-[20%]">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6">
                    <div className="flex items-center justify-center h-[200px]">
                      <div className="w-[80px] h-[80px] bg-amber-50 border-5 border-blue-300 rounded-full border-t-blue-600 animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-200 transition hover:shadow-sm cursor-pointer"
                    onClick={(e) => handleRowClick(item, e)}
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
                      <div className="py-3 px-6 flex gap-4 items-center justify-center text-2xl action-buttons">
                        <FaEdit
                          onClick={() =>
                            navigate("/admin/edit-product/", { state: item })
                          }
                          className="text-blue-600 cursor-pointer hover:text-blue-800 transition"
                        />
                        <FaTrash
                          onClick={() => confirmDelete(item.productId)}
                          className="text-red-600 cursor-pointer hover:text-red-800 transition"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Details Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-[#00000070] flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Product Details
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Images */}
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-3">
                    Images
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProduct.images &&
                      selectedProduct.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${selectedProduct.name} ${index + 1}`}
                          className="w-full h-32 object-cover rounded border border-gray-300"
                        />
                      ))}
                  </div>
                </div>

                {/* Product Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Product ID
                    </label>
                    <p className="text-lg font-semibold text-gray-800">
                      {selectedProduct.productId}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Name
                    </label>
                    <p className="text-lg text-gray-800">
                      {selectedProduct.name}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Price
                    </label>
                    <p className="text-xl font-bold text-green-700">
                      LKR {selectedProduct.price?.toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Stock
                    </label>
                    <p className="text-lg text-gray-800">
                      {selectedProduct.stock}
                    </p>
                  </div>

                  {selectedProduct.category && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Category
                      </label>
                      <p className="text-lg text-gray-800">
                        {selectedProduct.category}
                      </p>
                    </div>
                  )}

                  {selectedProduct.brand && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Brand
                      </label>
                      <p className="text-lg text-gray-800">
                        {selectedProduct.brand}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {selectedProduct.description && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Description
                  </label>
                  <p className="text-gray-800 leading-relaxed bg-gray-50 p-4 rounded border">
                    {selectedProduct.description}
                  </p>
                </div>
              )}

              {/* Additional Details */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedProduct.weight && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Weight
                    </label>
                    <p className="text-gray-800">{selectedProduct.weight}</p>
                  </div>
                )}

                {selectedProduct.dimensions && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Dimensions
                    </label>
                    <p className="text-gray-800">
                      {selectedProduct.dimensions}
                    </p>
                  </div>
                )}

                {selectedProduct.color && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Color
                    </label>
                    <p className="text-gray-800">{selectedProduct.color}</p>
                  </div>
                )}

                {selectedProduct.material && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Material
                    </label>
                    <p className="text-gray-800">{selectedProduct.material}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons in Modal */}
              <div className="mt-8 flex gap-4 justify-end border-t border-gray-200 pt-4">
                <button
                  onClick={() => {
                    navigate("/admin/edit-product/", {
                      state: selectedProduct,
                    });
                    closeModal();
                  }}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  <FaEdit /> Edit Product
                </button>
                <button
                  onClick={() => {
                    confirmDelete(selectedProduct.productId);
                    closeModal();
                  }}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  <FaTrash /> Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
