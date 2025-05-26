import { use, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function EditProductPage() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [productId, setProductId] = useState(location.state.productId);
  const [name, setName] = useState(location.state.name);
  const [altNames, setAltNames] = useState(location.state.altNames.join(","));
  const [description, setDescription] = useState(location.state.description);
  const [images, setImages] = useState([]);
  const [labeledPrice, setLabeledPrice] = useState(location.state.labeledPrice);
  const [price, setPrice] = useState(location.state.price);
  const [stock, setStock] = useState(location.state.stock);
  const [category, setCategory] = useState(location.state.category || "");

  async function EditProduct(e) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    setLoading(true); // Start loading

    let imageUrl = location.state.images;
    const promisesArray = [];
    for (let i = 0; i < images.length; i++) {
      promisesArray[i] = mediaUpload(images[i]);
    }

    try {
      if (images.length > 0) {
        imageUrl = await Promise.all(promisesArray);
      }

      const product = {
        productId,
        name,
        altNames,
        description,
        images: imageUrl,
        labeledPrice,
        price,
        stock,
        category, 
      };

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
      navigate("/admin/product");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update product");
    } finally {
      setLoading(false); // End loading
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen px-4 py-1 bg-gray-50">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Edit Product
      </h2>

      <input
        type="text"
        disabled
        placeholder="Product ID"
        className="mb-2 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        className="mb-2 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Alt Names (comma separated)"
        className="mb-2 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={altNames}
        onChange={(e) => setAltNames(e.target.value.split(","))}
      />
      <select
  className="mb-2 p-3 border border-gray-300 rounded-lg w-[300px] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">Select Category</option>
  <option value="electronics">Electronics</option>
  <option value="fashion">Fashion</option>
  <option value="beauty">Beauty</option>
  <option value="home">Home</option>
  <option value="sports">Sports</option>
</select>

      <textarea
        placeholder="Description"
        className="mb-2 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="file"
        multiple
        className="mb-2 p-2 border border-gray-300 rounded-lg w-[300px] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setImages(e.target.files)}
      />
      <input
        type="number"
        placeholder="Labeled Price"
        className="mb-2 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={labeledPrice}
        onChange={(e) => setLabeledPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        className="mb-2 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Stock"
        className="mb-2 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      {loading && (
        <div className="flex items-center justify-center mt-4">
          <svg
            className="animate-spin h-6 w-6 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          <span className="ml-2 text-blue-600">Updating...</span>
        </div>
      )}

      <div className="flex gap-4 mt-4">
        <button
          className="px-5 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition"
          disabled={loading}
          onClick={() => navigate("/admin/product")}
        >
          Cancel
        </button>

        <button
          className={`px-5 py-2 text-white rounded-lg shadow-md transition ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={() => EditProduct()}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
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
