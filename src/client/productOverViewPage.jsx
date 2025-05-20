import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProductOverViewPage() {
  const { id: productId } = useParams();
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
        toast.error("Error fetching product data");
      });
  }, [productId]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl font-medium text-gray-600">Loading product...</div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="text-xl font-medium text-red-500">Failed to load product.</div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-80px)] w-full bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Image Carousel */}
        <div className="bg-gray-50 p-4">
          {product.images && product.images.length > 0 ? (
            <Swiper
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
              className="rounded-lg"
            >
              {product.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={`Product image ${idx + 1}`}
                    className="w-full h-[400px] object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            {product.altNames?.length > 0 && (
              <p className="text-sm text-gray-500 mb-4">
                Also known as: {product.altNames.join(", ")}
              </p>
            )}
            <p className="text-gray-700 mb-4">{product.description}</p>

            <div className="flex items-center gap-4 mb-4">
              <p className="text-lg text-gray-500 line-through">
                ${product.labeledPrice?.toFixed(2)}
              </p>
              <p className="text-2xl font-semibold text-green-600">
                ${product.price?.toFixed(2)}
              </p>
            </div>

            <div className="mb-4">
              <span
                className={`px-3 py-1 text-sm rounded-full font-medium ${
                  product.isAvailable && product.stock > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {product.isAvailable && product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
              <span className="ml-4 text-gray-600 text-sm">Stock: {product.stock}</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-6">
            <button
              disabled={!product.isAvailable || product.stock <= 0}
              className={`w-full py-3 rounded-xl text-white text-lg font-semibold transition-all ${
                product.isAvailable && product.stock > 0
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {product.isAvailable && product.stock > 0 ? "Buy Now" : "Unavailable"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}






// import axios from "axios";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";

// export default function ProductOverViewPage() {
//     const param = useParams();
//     const productId = param.id;
//     const [status, setStatus] = useState("loading"); // loading, success, error
//     const [product, setProduct] = useState(null);

//     useEffect(() => {
//         axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId)
//             .then((response) => {
//                 console.log(response.data);
//                 setProduct(response.data);
//                 setStatus("success");
//             })
//             .catch((error) => {
//                 // console.error("Error fetching product data:", error);
//                 setStatus("error");
//                 toast.error("Error fetching product data");
//             });
//     },[])

//     return (
//         <div className="flex items-center justify-center h-screen bg-gray-100 w-full">
//             <div className="text-center">
//                 <h1 className="text-6xl font-bold text-gray-800">Product Overview</h1>
//                 <p className="mt-4 text-lg text-gray-600">This is the product overview page. Id : {productId}</p>
//                 <a href="/" className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
//                     Go to Home
//                 </a>
//             </div>
//         </div>
//     );
// }