import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../components/imageSlider";
import { AddToCart, getCart } from "../utils/cart";
import toast from "react-hot-toast";
import { s } from "framer-motion/client";

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

// ========================================
// REVIEWS COMPONENT - NEW ADDITION
// ========================================
function ProductReviews() {
  // Sample review data - in real app, this would come from API
  // TO TEST NO REVIEWS: Change sampleReviews to [] (empty array)
  // const sampleReviews = [
  //   {
  //     id: 1,
  //     name: "Sarah Johnson",
  //     rating: 5,
  //     date: "2024-12-15",
  //     comment: "Absolutely love this product! The quality exceeded my expectations and delivery was super fast. Highly recommend!",
  //     verified: true
  //   },
  //   {
  //     id: 2,
  //     name: "Mike Chen",
  //     rating: 4,
  //     date: "2024-12-10",
  //     comment: "Great product overall. Good value for money. Only minor issue was the packaging could be better, but the product itself is excellent.",
  //     verified: true
  //   },
  //   {
  //     id: 3,
  //     name: "Emma Rodriguez",
  //     rating: 5,
  //     date: "2024-12-08",
  //     comment: "Perfect! Exactly what I was looking for. The description was accurate and it arrived in perfect condition. Will definitely buy again.",
  //     verified: false
  //   },
  //   {
  //     id: 4,
  //     name: "David Wilson",
  //     rating: 4,
  //     date: "2024-12-05",
  //     comment: "Good quality product. Took a bit longer to arrive than expected but worth the wait. Customer service was helpful when I had questions.",
  //     verified: true
  //   },
  //   {
  //     id: 5,
  //     name: "Lisa Thompson",
  //     rating: 5,
  //     date: "2024-12-01",
  //     comment: "Outstanding! This has become my go-to product. The quality is consistent and the price is very reasonable. Shipping was quick too.",
  //     verified: true
  //   }
  // ];

  const [sampleReviews, setSampleReviews] = useState([]);
  const { id: productId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/reviews/" + productId)
      .then((res) => {
        setSampleReviews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Calculate average rating - handle empty reviews
  const averageRating =
    sampleReviews.length > 0
      ? sampleReviews.reduce((sum, review) => sum + review.rating, 0) /
        sampleReviews.length
      : 0;

  // Count ratings by star - handle empty reviews
  const ratingCounts = {
    5: sampleReviews.filter((r) => r.rating === 5).length,
    4: sampleReviews.filter((r) => r.rating === 4).length,
    3: sampleReviews.filter((r) => r.rating === 3).length,
    2: sampleReviews.filter((r) => r.rating === 2).length,
    1: sampleReviews.filter((r) => r.rating === 1).length,
  };

  // Helper function to render stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  //handleWriteReview
  const handleWriteReview = () => {
    navigate("/writereview", { state: { productId } });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/50">
      {/* Reviews Header */}
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
          Customer Reviews
        </h2>

        {/* Rating Summary - Show only if reviews exist */}
        {sampleReviews.length > 0 ? (
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-6">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                <span className="text-3xl font-bold text-gray-800">
                  {averageRating.toFixed(1)}
                </span>
                <div className="flex">
                  {renderStars(Math.round(averageRating))}
                </div>
              </div>
              <p className="text-gray-600">
                Based on {sampleReviews.length} reviews
              </p>
            </div>

            {/* Rating Breakdown */}
            <div className="flex-1 max-w-md">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-600 w-3">{star}</span>
                  <svg
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{
                        width: `${
                          (ratingCounts[star] / sampleReviews.length) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {ratingCounts[star]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // No Reviews Message
          <div className="text-center py-8 mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No Reviews Yet
            </h3>
            <p className="text-gray-500">
              Be the first to review this product!
            </p>
          </div>
        )}
      </div>

      {/* Individual Reviews - Show only if reviews exist */}
      {sampleReviews.length > 0 ? (
        <div className="space-y-6">
          {sampleReviews.map((review, index) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* User Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-800">
                      {review.name}
                    </h4>
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Verified Purchase
                    </span>
                    {/* {review.verified && (
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Verified Purchase
                      </span>
                    )} */}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* Write a Review Button */}
      {/* when dosetn have token then disable the button */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        {/* <button
          onClick={handleWriteReview}
          disabled={!token}
          className={`bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-300 ${
            !token
              ? "opacity-50 cursor-not-allowed hover:scale-100 shadow-none"
              : "hover:shadow-xl hover:scale-[1.02]"
          }`}
        >
          Write a Review
        </button> */}
      </div>
    </div>
  );
}

// ========================================
// MAIN PRODUCT OVERVIEW PAGE COMPONENT
// ========================================
export default function ProductOverViewPage() {
  const { id: productId } = useParams();
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

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
    navigate("/checkout", {
      state: {
        cart: [
          {
            productId: product.productId,
            name: product.name,
            images: product.images[0],
            labeledPrice: product.labeledPrice,
            price: product.price,
            qty: quantity,
          },
        ],
      },
    });
    //
    toast.success(`Buying ${quantity} x ${product.name} now!`);
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
                      LKR {product.price.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      LKR {product.labeledPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {discountPercentage}% OFF
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    You save LKR
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
                    Add to Cart • LKR {(product.price * quantity).toFixed(2)}
                  </button>

                  <button
                    onClick={() => handleBuyNow(product)}
                    disabled={product.stock === 0}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Buy Now • LKR{(product.price * quantity).toFixed(2)}
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

          {/* ========================================
              PRODUCT REVIEWS SECTION - NEW ADDITION
              ======================================== */}
          <div className="mt-16">
            <ProductReviews />
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
