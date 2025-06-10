import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function AddProductPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState(location.state?.productId || "");
  const [name, setName] = useState(location.state?.name || "");
  const [altNames, setAltNames] = useState(
    location.state?.altNames?.join(",") || ""
  );
  const [description, setDescription] = useState(
    location.state?.description || ""
  );
  const [images, setImages] = useState();
  const [labeledPrice, setLabeledPrice] = useState(
    location.state?.labeledPrice || ""
  );
  const [price, setPrice] = useState(location.state?.price || "");
  const [stock, setStock] = useState(location.state?.stock || "");
  const [category, setCategory] = useState(location.state?.category || "");

  // Simulated functions for demo

  async function EditProduct(e) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    setLoading(true); // Start loading

    // Ensure location.state.images is defined, otherwise initialize as empty array
    let imageUrl = location.state?.images || [];
    const promisesArray = [];

    // Check if images are being uploaded (only if images are provided)
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        promisesArray[i] = mediaUpload(images[i]); // Create an array of promises for image upload
      }

      try {
        // If there are images to upload, resolve all promises
        if (images.length > 0) {
          imageUrl = await Promise.all(promisesArray); // Get the uploaded image URLs
        }
      } catch (error) {
        console.error("Error uploading images:", error);
        toast.error("Failed to upload images");
      }
    }

    // Prepare product data for updating
    const product = {
      productId,
      name,
      altNames,
      description,
      images: imageUrl, // Use the newly uploaded images or existing images
      labeledPrice,
      price,
      stock,
      category,
    };

    try {
      // Send the PUT request to update the product
      await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Product Updated successfully");
      navigate("/admin/product"); // Navigate to the product list page
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update product");
    } finally {
      setLoading(false); // End loading
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-12 px-4 overflow-scroll">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-start">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-5 py-2.5 bg-[#e17100] text-white rounded-xl shadow-md hover:bg-orange-600 hover:shadow-lg transition duration-300 ease-in-out"
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
          </div>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
            Edit Product
          </h1>
          <p className="text-gray-600 text-lg">
            Update and manage your product inventory
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-orange-100/50 p-8 backdrop-blur-sm border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Product ID
                </label>
                <input
                  type="text"
                  placeholder="Enter unique product ID"
                  required
                  disabled
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  Alternative Names
                </label>
                <input
                  type="text"
                  placeholder="Enter alternative names (comma separated)"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                  value={altNames}
                  onChange={(e) => setAltNames(e.target.value.split(","))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  Category
                </label>
                <select
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 bg-gray-50/50 hover:bg-white cursor-pointer"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="Face Care">Face Care</option>
                  <option value="Eye Care">Eye Care</option>
                  <option value="Lip Care">Lip Care</option>
                  <option value="Body Care">Body Care</option>
                  <option value="Hair Care">Hair Care</option>
                  <option value="Makeup">Makeup</option>
                  <option value="Fragrance">Fragrance</option>
                  <option value="Sun Care">Sun Care</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  Product Images
                </label>
                <div className="relative group">
                  <input
                    type="file"
                    multiple
                    className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 bg-gray-50/50 hover:bg-orange-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                    onChange={(e) => setImages(e.target.files)}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-orange-500 text-sm font-medium mt-10">
                      Drop images here or click to browse
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  Description
                </label>
                <textarea
                  placeholder="Enter detailed product description"
                  rows={4}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 bg-gray-50/50 hover:bg-white resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-700 rounded-full"></div>
                    Labeled Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                      value={labeledPrice}
                      onChange={(e) => setLabeledPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                    Selling Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-700 rounded-full"></div>
                  Stock Quantity
                </label>
                <input
                  type="number"
                  placeholder="Enter available stock"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              {/* Loading Animation */}
              {loading && (
                <div className="flex items-center justify-center p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-100">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                      <div
                        className="absolute inset-0 w-8 h-8 border-4 border-transparent border-r-amber-600 rounded-full animate-spin"
                        style={{ animationDelay: "0.15s" }}
                      ></div>
                    </div>
                    <div className="text-orange-700 font-semibold">
                      <div className="animate-pulse">Editing product...</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 pt-8 border-t border-gray-100">
            <button
              className="flex-1 px-8 py-4 text-gray-700 bg-gray-100 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 border-2 border-transparent hover:border-gray-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              onClick={() => navigate("/admin/product")}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              className={`flex-1 px-8 py-4 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none flex items-center justify-center gap-3 ${
                loading
                  ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300"
              }`}
              onClick={() => EditProduct()}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Editing...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Edit Product
                </>
              )}
            </button>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Product Guidelines
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ensure product ID is unique across your inventory</li>
                <li>
                  • Upload high-quality images for better customer engagement
                </li>
                <li>
                  • Provide detailed descriptions to improve searchability
                </li>
                <li>
                  • Keep stock quantities updated for accurate inventory
                  management
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import { use, useState } from "react";
// import toast from "react-hot-toast";
// import { useLocation, useNavigate } from "react-router-dom";
// import mediaUpload from "../../utils/mediaUpload";
// import axios from "axios";

// export default function EditProductPage() {
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const [productId, setProductId] = useState(location.state.productId);
//   const [name, setName] = useState(location.state.name);
//   const [altNames, setAltNames] = useState(location.state.altNames.join(","));
//   const [description, setDescription] = useState(location.state.description);
//   const [images, setImages] = useState([]);
//   const [labeledPrice, setLabeledPrice] = useState(location.state.labeledPrice);
//   const [price, setPrice] = useState(location.state.price);
//   const [stock, setStock] = useState(location.state.stock);
//   const [category, setCategory] = useState(location.state.category || "");

//   async function EditProduct(e) {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please login first");
//       return;
//     }

//     setLoading(true); // Start loading

//     let imageUrl = location.state.images;
//     const promisesArray = [];
//     for (let i = 0; i < images.length; i++) {
//       promisesArray[i] = mediaUpload(images[i]);
//     }

//     try {
//       if (images.length > 0) {
//         imageUrl = await Promise.all(promisesArray);
//       }

//       const product = {
//         productId,
//         name,
//         altNames,
//         description,
//         images: imageUrl,
//         labeledPrice,
//         price,
//         stock,
//         category,
//       };

//       await axios.put(
//         import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId,
//         product,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success("Product Updated successfully");
//       navigate("/admin/product");
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("Failed to update product");
//     } finally {
//       setLoading(false); // End loading
//     }
//   }

//   return (
//     <div className="container flex flex-col items-center justify-center min-h-screen px-4 py-1 bg-gray-50">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//         Edit Product
//       </h2>

//       <input
//         type="text"
//         disabled
//         placeholder="Product ID"
//         className="mb-2 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         value={productId}
//         onChange={(e) => setProductId(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Name"
//         className="mb-2 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Alt Names (comma separated)"
//         className="mb-2 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         value={altNames}
//         onChange={(e) => setAltNames(e.target.value.split(","))}
//       />
//       <select
//   className="mb-2 p-3 border border-gray-300 rounded-lg w-[300px] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//   value={category}
//   onChange={(e) => setCategory(e.target.value)}
// >
//   <option value="">Select Category</option>
//   <option value="electronics">Electronics</option>
//   <option value="fashion">Fashion</option>
//   <option value="beauty">Beauty</option>
//   <option value="home">Home</option>
//   <option value="sports">Sports</option>
// </select>

//       <textarea
//         placeholder="Description"
//         className="mb-2 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <input
//         type="file"
//         multiple
//         className="mb-2 p-2 border border-gray-300 rounded-lg w-[300px] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         onChange={(e) => setImages(e.target.files)}
//       />
//       <input
//         type="number"
//         placeholder="Labeled Price"
//         className="mb-2 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         value={labeledPrice}
//         onChange={(e) => setLabeledPrice(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Price"
//         className="mb-2 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Stock"
//         className="mb-2 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         value={stock}
//         onChange={(e) => setStock(e.target.value)}
//       />

//       {loading && (
//         <div className="flex items-center justify-center mt-4">
//           <svg
//             className="animate-spin h-6 w-6 text-blue-600"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             />
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8v8H4z"
//             />
//           </svg>
//           <span className="ml-2 text-blue-600">Updating...</span>
//         </div>
//       )}

//       <div className="flex gap-4 mt-4">
//         <button
//           className="px-5 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition"
//           disabled={loading}
//           onClick={() => navigate("/admin/product")}
//         >
//           Cancel
//         </button>

//         <button
//           className={`px-5 py-2 text-white rounded-lg shadow-md transition ${
//             loading
//               ? "bg-blue-300 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//           onClick={() => EditProduct()}
//           disabled={loading}
//         >
//           {loading ? "Updating..." : "Update Product"}
//         </button>
//       </div>
//     </div>
//   );
// }

// import { use, useState } from "react";
// import toast from "react-hot-toast";
// import { useLocation, useNavigate } from "react-router-dom";
// import mediaUpload from "../../utils/mediaUpload";
// import axios from "axios";

// export default function EditProductPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [productId, setProductId] = useState(location.state.productId);
//   const [name, setName] = useState(location.state.name);
//   const [altNames, setAltNames] = useState(location.state.altNames.join(","));
//   const [description, setDescription] = useState(location.state.description);
//   const [images, setImages] = useState([]);
//   const [labeledPrice, setLabeledPrice] = useState(location.state.labeledPrice);
//   const [price, setPrice] = useState(location.state.price);
//   const [stock, setStock] = useState(location.state.stock);

//   async function EditProduct(e) {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please login first");
//       return;
//     }

//     let imageUrl = location.state.images;
//     // if (images.length <= 0) {
//     //   toast.error("Please upload at least one image");
//     //   return;
//     // }
//     const promisesArray = [];
//     for (let i = 0; i < images.length; i++) {
//       promisesArray[i] = mediaUpload(images[i]);
//     }
//     try {
//       if (images.length > 0) {
//         imageUrl = await Promise.all(promisesArray);
//       }

//       console.log(imageUrl);
//       const product = {
//         productId,
//         name,
//         altNames,
//         description,
//         images: await imageUrl,
//         labeledPrice,
//         price,
//         stock,
//       };

//       axios
//         .put(import.meta.env.VITE_BACKEND_URL + "/api/product/"+productId, product, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((res) => {
//           console.log(res.data);
//           toast.success("Product Updated successfully");
//           navigate("/admin/product");
//         })
//         .catch((err) => {
//           console.log(err);
//           toast.error("Error Updating product");
//         });
//     } catch (error) {
//       console.error("Error uploading images:", error);
//       toast.error("Error uploading images");
//       return;
//     }
//   }

//   return (
//     <div className="container flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-50">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Product</h2>

//       <input
//         type="text"
//         disabled
//         placeholder="Product ID"
//         className="mb-4 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         value={productId}
//         onChange={(e) => setProductId(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Name"
//         className="mb-4 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Alt Names (comma separated)"
//         className="mb-4 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         value={altNames}
//         onChange={(e) => setAltNames(e.target.value.split(","))}
//       />
//       <textarea
//         placeholder="Description"
//         className="mb-4 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <input
//         type="file"
//         multiple
//         className="mb-4 p-2 border border-gray-300 rounded-lg w-[300px] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         onChange={(e) => setImages(e.target.files)}
//       />
//       <input
//         type="number"
//         placeholder="Labeled Price"
//         className="mb-4 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         value={labeledPrice}
//         onChange={(e) => setLabeledPrice(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Price"
//         className="mb-4 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Stock"
//         className="mb-4 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         value={stock}
//         onChange={(e) => setStock(e.target.value)}
//       />
//       <div className="flex gap-4 mt-4">
//         <button
//           className="px-5 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition"
//           onClick={() => {
//             navigate("/admin/product");
//           }}
//         >
//           Cancel
//         </button>
//         <button
//           className="px-5 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition"
//           onClick={() => {
//             EditProduct();
//           }}
//         >
//           Update Product
//         </button>
//       </div>
//     </div>
//   );
// }
