import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../components/imageSlider";
import { AddToCart, getCart } from "../utils/cart";
import toast from "react-hot-toast";

// Loading Component
function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto"></div>
        <p className="text-amber-600 font-medium text-lg">
          Loading product details...
        </p>
      </div>
    </div>
  );
}

// Main Product Overview Page Component
export default function ProductOverViewPage() {
  const { id: productId } = useParams();
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (product) => {
    // This is where you'd call a cart API or update local/global state
    // alert(`Added ${quantity} x ${product.name} to cart!`);
    // console.log("Old Cart");
    // console.log(getCart());
    AddToCart(product, quantity);
    toast.success(`Added ${quantity} x ${product.name} to cart!`);
    // console.log("New Cart");
    // console.log(getCart());
  };

  const handleBuyNow = (product) => {
    // This would ideally redirect to a checkout page
    alert(`Proceeding to buy ${quantity} x ${product.name}`);
    // e.g., navigate("/checkout", { state: { product } });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
        alert("Error fetching product data");
      });
  }, [productId]);

  if (status === "loading") return <Loading />;
  if (status === "error")
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <svg
            className="w-16 h-16 text-red-400 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <p className="text-red-600 font-medium text-lg">
            Failed to load product
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  const discountPercentage = Math.round(
    ((product.labeledPrice - product.price) / product.labeledPrice) * 100
  );

  return (
    <div className="min-h-screen pt-[80px] bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Image Section */}
            <div className="flex justify-center">
              <ImageSlider images={product.images} />
            </div>

            {/* Product Details Section */}
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/50">
                {/* Product Title */}
                <div className="space-y-3 mb-6">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                    {product.name}
                  </h1>
                  {product.altNames?.length > 0 && (
                    <p className="text-gray-600 italic">
                      Also known as:{" "}
                      <span className="font-medium">
                        {product.altNames.join(", ")}
                      </span>
                    </p>
                  )}
                </div>

                {/* Price Section */}
                <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-2xl lg:text-3xl font-bold text-amber-700">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.labeledPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {discountPercentage}% OFF
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    You save $
                    {(product.labeledPrice - product.price).toFixed(2)}!
                  </p>
                </div>

                {/* Stock Information */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">
                      Stock Available
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                      {product.stock} units
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <p
                      className={`text-xl font-bold ${
                        product.stock > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Product Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-16 h-12 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center font-bold text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600 transition-colors"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Add to Cart • ${(product.price * quantity).toFixed(2)}
                  </button>

                  <button
                    onClick={() => handleBuyNow(product)}
                    disabled={product.stock === 0}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Buy Now • ${(product.price * quantity).toFixed(2)}
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600 font-medium">
                      Quality Guaranteed
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600 font-medium">
                      Fast Shipping
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600 font-medium">
                      24/7 Support
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// export default function ProductOverViewPage() {
//   const { id: productId } = useParams();
//   const [status, setStatus] = useState("loading");
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${productId}`)
//       .then((response) => {
//         setProduct(response.data);
//         setStatus("success");
//       })
//       .catch(() => {
//         setStatus("error");
//         toast.error("Error fetching product data");
//       });
//   }, [productId]);

//   if (status === "loading") {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <div className="text-xl font-medium text-gray-600">Loading product...</div>
//       </div>
//     );
//   }

//   if (status === "error") {
//     return (
//       <div className="flex items-center justify-center h-screen bg-red-50">
//         <div className="text-xl font-medium text-red-500">Failed to load product.</div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-[calc(100vh-80px)] w-full bg-gray-100 p-8">
//       <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
//         {/* Image Carousel */}
//         <div className="bg-gray-50 p-4">
//           {product.images && product.images.length > 0 ? (
//             <Swiper
//               navigation
//               pagination={{ clickable: true }}
//               modules={[Navigation, Pagination]}
//               className="rounded-lg"
//             >
//               {product.images.map((img, idx) => (
//                 <SwiperSlide key={idx}>
//                   <img
//                     src={img}
//                     alt={`Product image ${idx + 1}`}
//                     className="w-full h-[400px] object-cover rounded-lg"
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           ) : (
//             <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
//               No Image Available
//             </div>
//           )}
//         </div>

//         {/* Product Details */}
//         <div className="p-8 flex flex-col justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
//             {product.altNames?.length > 0 && (
//               <p className="text-sm text-gray-500 mb-4">
//                 Also known as: {product.altNames.join(", ")}
//               </p>
//             )}
//             <p className="text-gray-700 mb-4">{product.description}</p>

//             <div className="flex items-center gap-4 mb-4">
//               <p className="text-lg text-gray-500 line-through">
//                 ${product.labeledPrice?.toFixed(2)}
//               </p>
//               <p className="text-2xl font-semibold text-green-600">
//                 ${product.price?.toFixed(2)}
//               </p>
//             </div>

//             <div className="mb-4">
//               <span
//                 className={`px-3 py-1 text-sm rounded-full font-medium ${
//                   product.isAvailable && product.stock > 0
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-600"
//                 }`}
//               >
//                 {product.isAvailable && product.stock > 0 ? "In Stock" : "Out of Stock"}
//               </span>
//               <span className="ml-4 text-gray-600 text-sm">Stock: {product.stock}</span>
//             </div>
//           </div>

//           {/* CTA Button */}
//           <div className="mt-6">
//             <button
//               disabled={!product.isAvailable || product.stock <= 0}
//               className={`w-full py-3 rounded-xl text-white text-lg font-semibold transition-all ${
//                 product.isAvailable && product.stock > 0
//                   ? "bg-blue-600 hover:bg-blue-700"
//                   : "bg-gray-400 cursor-not-allowed"
//               }`}
//             >
//               {product.isAvailable && product.stock > 0 ? "Buy Now" : "Unavailable"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
