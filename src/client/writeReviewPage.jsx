import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import mediaUpload from "../utils/mediaUpload";

// Loading Component
function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto"></div>
        <p className="text-amber-600 font-medium text-lg">Loading...</p>
      </div>
    </div>
  );
}

// Login Required Component
function LoginRequired() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/50 max-w-md w-full mx-4">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Login Required
            </h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to write a review.
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              Go to Login
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

//AccessDenied
function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/50 max-w-md w-full mx-4">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-6">
              You can't access this page. Go back and come with the correct URL.
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WriteReviewPage() {
  //   const { id: productId } = useParams();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [product, setProduct] = useState(null);
  const location = useLocation();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    comment: "",
    profileImg: "", // Profile image URL
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      // Redirect to login if not authenticated
      navigate("/login");
    }
  }, [token, navigate]);

  const productId = location.state?.productId || null;

  // If productId is not available, redirect to login page
  if (!productId) {
    return <AccessDenied />;
  }

  // Fetch product details
  useEffect(() => {
    if (token && productId) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${productId}`)
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          toast.error("Failed to load product details");
          setLoading(false);
        });
    }
  }, [productId, token]);

  // If still loading or not logged in, show loading or login required
  if (loading) {
    return <Loading />;
  }

  if (!token) {
    return <LoginRequired />;
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await mediaUpload(file); // Upload the image
        setFormData((prev) => ({
          ...prev,
          profileImg: imageUrl, // Set the uploaded image URL to form data
        }));
        console.log("Image uploaded successfully:", imageUrl);
      } catch (error) {
        toast.error("Failed to upload image");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (formData.rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!formData.comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    setSubmitting(true);

    try {
      const reviewData = {
        productId,
        name: formData.name.trim(),
        rating: formData.rating,
        comment: formData.comment.trim(),
        profileImg: formData.profileImg.trim() || undefined, // Ensure this is being sent
      };


      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Review submitted successfully!");
      navigate(`/orders`);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => interactive && handleRatingClick(index + 1)}
        className={`${
          interactive
            ? "cursor-pointer hover:scale-110 transition-transform"
            : "cursor-default"
        }`}
        disabled={!interactive}
      >
        <svg
          className={`w-8 h-8 ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          } ${interactive ? "hover:text-yellow-300" : ""}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    ));
  };

  return (
    <div className="w-full pt-[80px] bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Product
          </button>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Write a Review
              </h1>
              {product && (
                <p className="text-amber-100">
                  Share your experience with{" "}
                  <span className="font-semibold">{product.name}</span>
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-8">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-3"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
                  required
                />
              </div>

              {/* Profile Image Upload */}
              <div>
                <label
                  htmlFor="profileImg"
                  className="block text-sm font-medium text-gray-700 mb-3"
                >
                  Profile Image (Optional)
                </label>
                <input
                  type="file"
                  id="profileImg"
                  name="profileImg"
                  accept="image/*"
                  onChange={handleImageChange} // Handle file input change
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
                />
                {formData.profileImg && (
                  <p className="text-xs text-gray-500 mt-2">
                    Image uploaded successfully!
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Leave empty to use default avatar
                </p>
              </div>

              {/* Rating Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Rating *
                </label>
                <div className="flex items-center gap-2 mb-2">
                  {renderStars(formData.rating, true)}
                </div>
                <p className="text-sm text-gray-600">
                  {formData.rating === 0 && "Click to rate"}{" "}
                  {formData.rating > 0 &&
                    `${formData.rating} star${formData.rating > 1 ? "s" : ""}`}
                </p>
              </div>

              {/* Comment Field */}
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-3"
                >
                  Your Review *
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={6}
                  value={formData.comment}
                  onChange={handleInputChange}
                  placeholder="Share your detailed experience with this product. What did you like? What could be improved?"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400 resize-vertical"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  Minimum 10 characters ({formData.comment.length} characters)
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
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
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      Submit Review
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  disabled={submitting}
                  className="sm:w-auto px-8 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 disabled:text-gray-400 font-medium py-4 rounded-2xl transition-colors disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>

              {/* Guidelines */}
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
                <h4 className="font-semibold text-amber-800 mb-2">
                  Review Guidelines
                </h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Be honest and constructive in your feedback</li>
                  <li>• Focus on the product features and your experience</li>
                  <li>• Avoid inappropriate language or personal attacks</li>
                  <li>• Help other customers make informed decisions</li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default function WriteReviewPage() {
//   //   const { id: productId } = useParams();

//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [product, setProduct] = useState(null);
//   const location = useLocation();

//   // Form state
//   const [formData, setFormData] = useState({
//     name: "",
//     rating: 0,
//     comment: "",
//     profileImg: "",
//   });

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       // Redirect to login if not authenticated
//       navigate("/login");
//     }
//   }, [token, navigate]);

//   const productId = location.state?.productId || null;

//   // If productId is not available, redirect to login page
//   if (!productId) {
//     return <AccessDenied />;
//   }

//    // Fetch product details
//   useEffect(() => {
//     if (token && productId) {
//       axios
//         .get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${productId}`)
//         .then((response) => {
//           setProduct(response.data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching product:", error);
//           toast.error("Failed to load product details");
//           setLoading(false);
//         });
//     }
//   }, [productId, token]);

//   // If still loading or not logged in, show loading or login required
//   if (loading) {
//     return <Loading />;
//   }

//   if (!token) {
//     return <LoginRequired />;
//   }

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleRatingClick = (rating) => {
//     setFormData((prev) => ({
//       ...prev,
//       rating,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!formData.name.trim()) {
//       toast.error("Please enter your name");
//       return;
//     }
//     if (formData.rating === 0) {
//       toast.error("Please select a rating");
//       return;
//     }
//     if (!formData.comment.trim()) {
//       toast.error("Please write a comment");
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const reviewData = {
//         productId,
//         name: formData.name.trim(),
//         rating: formData.rating,
//         comment: formData.comment.trim(),
//         profileImg: formData.profileImg.trim() || undefined,
//       };

//       await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/reviews`,
//         reviewData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       toast.success("Review submitted successfully!");
//       //   navigate(`/product/${productId}`);
//       navigate(`/orders`);
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       toast.error("Failed to submit review. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const renderStars = (rating, interactive = false) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <button
//         key={index}
//         type="button"
//         onClick={() => interactive && handleRatingClick(index + 1)}
//         className={`${
//           interactive
//             ? "cursor-pointer hover:scale-110 transition-transform"
//             : "cursor-default"
//         }`}
//         disabled={!interactive}
//       >
//         <svg
//           className={`w-8 h-8 ${
//             index < rating ? "text-yellow-400" : "text-gray-300"
//           } ${interactive ? "hover:text-yellow-300" : ""}`}
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//         </svg>
//       </button>
//     ));
//   };

//   return (
//     <div className="w-full pt-[80px] bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
//       <div className="container mx-auto px-4 py-8 lg:py-12">
//         <div className="max-w-3xl mx-auto">
//           {/* Back Button */}
//           <button
//             onClick={() => navigate(-1)}
//             className="mb-6 flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//             Back to Product
//           </button>

//           <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-6">
//               <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
//                 Write a Review
//               </h1>
//               {product && (
//                 <p className="text-amber-100">
//                   Share your experience with{" "}
//                   <span className="font-semibold">{product.name}</span>
//                 </p>
//               )}
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-8">
//               {/* Name Field */}
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700 mb-3"
//                 >
//                   Your Name *
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="Enter your full name"
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
//                   required
//                 />
//               </div>

//               {/* Profile Image URL (Optional) */}
//               <div>
//                 <label
//                   htmlFor="profileImg"
//                   className="block text-sm font-medium text-gray-700 mb-3"
//                 >
//                   Profile Image URL (Optional)
//                 </label>
//                 <input
//                   type="url"
//                   id="profileImg"
//                   name="profileImg"
//                   value={formData.profileImg}
//                   onChange={handleInputChange}
//                   placeholder="https://example.com/your-profile-image.jpg"
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
//                 />
//                 <p className="text-xs text-gray-500 mt-2">
//                   Leave empty to use default avatar
//                 </p>
//               </div>

//               {/* Rating */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   Rating *
//                 </label>
//                 <div className="flex items-center gap-2 mb-2">
//                   {renderStars(formData.rating, true)}
//                 </div>
//                 <p className="text-sm text-gray-600">
//                   {formData.rating === 0 && "Click to rate"}
//                   {formData.rating === 1 && "1 star - Poor"}
//                   {formData.rating === 2 && "2 stars - Fair"}
//                   {formData.rating === 3 && "3 stars - Good"}
//                   {formData.rating === 4 && "4 stars - Very Good"}
//                   {formData.rating === 5 && "5 stars - Excellent"}
//                 </p>
//               </div>

//               {/* Comment */}
//               <div>
//                 <label
//                   htmlFor="comment"
//                   className="block text-sm font-medium text-gray-700 mb-3"
//                 >
//                   Your Review *
//                 </label>
//                 <textarea
//                   id="comment"
//                   name="comment"
//                   rows={6}
//                   value={formData.comment}
//                   onChange={handleInputChange}
//                   placeholder="Share your detailed experience with this product. What did you like? What could be improved?"
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400 resize-vertical"
//                   required
//                 />
//                 <p className="text-xs text-gray-500 mt-2">
//                   Minimum 10 characters ({formData.comment.length} characters)
//                 </p>
//               </div>

//               {/* Submit Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
//                 >
//                   {submitting ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Submitting...
//                     </>
//                   ) : (
//                     <>
//                       <svg
//                         className="w-5 h-5"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                         />
//                       </svg>
//                       Submit Review
//                     </>
//                   )}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => navigate(-1)}
//                   disabled={submitting}
//                   className="sm:w-auto px-8 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 disabled:text-gray-400 font-medium py-4 rounded-2xl transition-colors disabled:cursor-not-allowed"
//                 >
//                   Cancel
//                 </button>
//               </div>

//               {/* Guidelines */}
//               <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
//                 <h4 className="font-semibold text-amber-800 mb-2">
//                   Review Guidelines
//                 </h4>
//                 <ul className="text-sm text-amber-700 space-y-1">
//                   <li>• Be honest and constructive in your feedback</li>
//                   <li>• Focus on the product features and your experience</li>
//                   <li>• Avoid inappropriate language or personal attacks</li>
//                   <li>• Help other customers make informed decisions</li>
//                 </ul>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
