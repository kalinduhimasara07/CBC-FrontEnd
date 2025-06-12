import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Package,
  DollarSign,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import Loader from "./Loader"; // Ensure Loader is imported
import Loading from "../../components/loading";

const AdminProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    setIsLoading(true); // Trigger loading state when data fetch begins
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false); // Ensure loading is set to false even in case of error
      });
  }, [searchTerm, selectedCategory]); // Re-fetch when searchTerm or selectedCategory changes

  const categories = [
    "all",
    "Face Care",
    "Eye Care",
    "Lip Care",
    "Body Care",
    "Hair Care",
    "Makeup",
    "Fragrance",
    "Sun Care",
  ];

  const getStatusColor = (product) => {
    if (!product.isAvailable) return "bg-red-100 text-red-800";
    if (product.stock === 0) return "bg-red-100 text-red-800";
    if (product.stock <= 10) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  const getStatusText = (product) => {
    if (product.stock === 0) return "Out of Stock";
    if (product.stock <= 10) return "Low Stock";
    if (!product.isAvailable) return "Unavailable";
    return "Available";
  };

  const filteredProducts = products.filter((product) => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase(); // Normalize the search term

    // Ensure product.name and product.category are valid before using toLowerCase
    const matchesSearch =
      (product.name &&
        product.name.toLowerCase().includes(normalizedSearchTerm)) ||
      (product.category &&
        product.category.toLowerCase().includes(normalizedSearchTerm));

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
    setShowProductDetails(false);
  };

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
        setIsLoading(true); // Re-trigger loading to fetch data again
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error deleting product");
      });
  }

  return (
    <div className="h-screen bg-gradient-to-br from-orange-50 to-amber-50 overflow-y-scroll">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold" style={{ color: "#e17100" }}>
              Product Management
            </h1>
            <button
              onClick={() => {
                navigate("/admin/add-product");
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus size={20} />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {products.length}
                </p>
              </div>
              <Package size={24} style={{ color: "#e17100" }} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Available Products
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {products.filter((p) => p.isAvailable && p.stock > 0).length}
                </p>
              </div>
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Low Stock</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {products.filter((p) => p.stock > 0 && p.stock <= 10).length}
                </p>
              </div>
              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Value</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  LKR
                  {products
                    .reduce((sum, p) => sum + p.price * p.stock, 0)
                    .toLocaleString()}
                </p>
              </div>
              <DollarSign size={24} style={{ color: "#e17100" }} />
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Show loader if products are loading */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loading /> {/* Show Loader component when loading */}
          </div>
        ) : (
          // Products Table
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.productId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-12 w-12 rounded-lg object-cover"
                          src={
                            product.images[0] ||
                            "https://via.placeholder.com/80x80/e17100/white?text=P"
                          }
                          alt={product.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name.length > 50
                              ? `${product.name.slice(0, 30)}...`
                              : product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.productId}
                          </div>
                          {product.altNames && product.altNames.length > 0 && (
                            <div className="text-xs text-gray-400">
                              Also: {product.altNames.join(", ")}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <span className="font-medium">LKR {product.price}</span>
                        {product.labeledPrice !== product.price && (
                          <div className="text-xs text-gray-500 line-through">
                            LKR {product.labeledPrice}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          product
                        )}`}
                      >
                        {getStatusText(product)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span
                          className={`w-2 h-2 rounded-full mr-2 ${
                            product.isAvailable ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></span>
                        <span className="text-sm text-gray-900">
                          {product.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleProductClick(product)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded cursor-pointer"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          className="text-orange-600 hover:text-orange-900 p-1 rounded cursor-pointer"
                          onClick={() =>
                            navigate("/admin/edit-product", { state: product })
                          }
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => confirmDelete(product.productId)}
                          className="text-red-600 hover:text-red-900 p-1 rounded cursor-pointer"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </main>

      {/* Product Details Modal */}
      {showProductDetails && selectedProduct && (
        <div className="fixed inset-0 bg-[#00000095] flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold" style={{ color: "#e17100" }}>
                  Product Details
                </h2>
                <button
                  onClick={closeProductDetails}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Product Image and Basic Info */}
                <div>
                  <div className="bg-gray-100 rounded-xl p-8 mb-6 flex items-center justify-center">
                    <img
                      src={
                        selectedProduct.images[0] ||
                        "https://via.placeholder.com/200x200/e17100/white?text=P"
                      }
                      alt={selectedProduct.name}
                      className="w-48 h-48 object-cover rounded-lg"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {selectedProduct.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-1">
                        Product ID: {selectedProduct.productId}
                      </p>
                      <p className="text-gray-600">
                        {selectedProduct.description}
                      </p>
                      {selectedProduct.altNames &&
                        selectedProduct.altNames.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Also known as:
                            </p>
                            <p className="text-sm text-gray-700">
                              {selectedProduct.altNames.join(", ")}
                            </p>
                          </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                          selectedProduct
                        )}`}
                      >
                        {getStatusText(selectedProduct)}
                      </span>
                      <span className="px-3 py-1 text-sm font-medium bg-orange-100 text-orange-800 rounded-full">
                        {selectedProduct.category}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          selectedProduct.isAvailable
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      <span className="text-lg font-semibold">
                        {selectedProduct.isAvailable
                          ? "Available"
                          : "Unavailable"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column - Detailed Information */}
                <div className="space-y-6">
                  {/* Price and Stock */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Current Price
                        </p>
                        <p
                          className="text-2xl font-bold"
                          style={{ color: "#e17100" }}
                        >
                          LKR {selectedProduct.price}
                        </p>
                        {selectedProduct.labeledPrice !==
                          selectedProduct.price && (
                          <p className="text-sm text-gray-500 line-through">
                            Original: LKR {selectedProduct.labeledPrice}
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Stock</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {selectedProduct.stock}
                        </p>
                        <p className="text-sm text-gray-500">
                          {selectedProduct.stock <= 10
                            ? "Low stock!"
                            : "In stock"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Product Images */}
                  {selectedProduct.images &&
                    selectedProduct.images.length > 1 && (
                      console.log(selectedProduct.images),
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                          Product Images
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedProduct.images
                            .slice(0, 4)
                            .map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`${selectedProduct.name} ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border"
                              />
                            ))}
                        </div>
                      </div>
                    )}

                  {/* Alternative Names */}
                  {selectedProduct.altNames &&
                    selectedProduct.altNames.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                          Alternative Names
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.altNames.map((altName, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {altName}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Product Features */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Product Features
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        <span className="text-sm text-gray-700">
                          Long-lasting formula
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        <span className="text-sm text-gray-700">
                          High-quality ingredients
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        <span className="text-sm text-gray-700">
                          Suitable for all skin types
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={closeProductDetails}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button onClick={() =>
                            navigate("/admin/edit-product", { state: selectedProduct })
                          } className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2">
                  <Edit size={16} />
                  <span>Edit Product</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4" style={{ color: "#e17100" }}>
              Add New Product
            </h3>
            <p className="text-gray-600 mb-6">
              Product creation form would go here...
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
