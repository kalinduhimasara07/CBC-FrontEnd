import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function AddProductPage() {
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState([]);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [labeledPrice, setLabeledPrice] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  async function AddProduct(e) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }
    if (images.length <= 0) {
      toast.error("Please upload at least one image");
      return;
    }
    const promisesArray = [];
    for (let i = 0; i < images.length; i++) {
      promisesArray[i] = mediaUpload(images[i]);
    }
    try {
      const imageUrl = Promise.all(promisesArray);
      console.log(imageUrl);
      const product = {
        productId,
        name,
        altNames,
        description,
        images: await imageUrl,
        labeledPrice,
        price,
        stock,
      };

      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/product", product, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          toast.success("Product added successfully");
          navigate("/admin/product");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error adding product");
        });
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Error uploading images");
      return;
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-50">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Product</h2>

      <input
        type="text"
        placeholder="Product ID"
        className="mb-4 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        className="mb-4 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Alt Names (comma separated)"
        className="mb-4 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={altNames}
        onChange={(e) => setAltNames(e.target.value.split(","))}
      />
      <textarea
        placeholder="Description"
        className="mb-4 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="file"
        multiple
        className="mb-4 p-2 border border-gray-300 rounded-lg w-[300px] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setImages(e.target.files)}
      />
      <input
        type="number"
        placeholder="Labeled Price"
        className="mb-4 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={labeledPrice}
        onChange={(e) => setLabeledPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        className="mb-4 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Stock"
        className="mb-4 p-3 border border-gray-300 rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <div className="flex gap-4 mt-4">
        <button
          className="px-5 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition"
          onClick={() => {
            navigate("/admin/product");
          }}
        >
          Cancel
        </button>
        <button
          className="px-5 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={() => {
            AddProduct();
          }}
        >
          Add Product
        </button>
      </div>
    </div>
  );
}
