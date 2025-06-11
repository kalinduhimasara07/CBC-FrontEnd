import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Star, MessageSquare } from "lucide-react";
import mediaUpload from "../utils/mediaUpload";
import Footer from "../components/footer";

const SiteReviewsPage = () => {
  const [newReview, setNewReview] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
    profileImg: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await mediaUpload(file);
        setNewReview((prev) => ({
          ...prev,
          profileImg: imageUrl,
        }));
        console.log("Image uploaded successfully:", imageUrl);
      } catch (error) {
        toast.error("Failed to upload image");
      }
    }
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please log in to access this action.");
      window.location.href = "/login";
      return;
    }

    setIsSubmitting(true);
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/siteReviews", newReview, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Review submitted successfully");
        setIsSubmitting(false);
      })
      .catch((err) => {
        const errorMessage =
          err?.response?.data?.message || // Common for Axios
          err?.message || // Fallback for generic errors
          "Error submitting review"; // Final fallback message

        toast.error(errorMessage);
        setIsSubmitting(false);
      });
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={interactive ? () => onRatingChange(star) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="h-full w-full bg-gray-50">
      <div className="max-w-4xl mx-auto pt-[90px]">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Customer Reviews
          </h1>
          <p className="text-lg text-gray-600">
            Share your experience and help others make informed decisions
          </p>
        </div>

        {/* Review Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            Write a Review
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newReview.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newReview.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              {renderStars(newReview.rating, true, (rating) =>
                setNewReview((prev) => ({ ...prev, rating }))
              )}
            </div>

            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Review
              </label>
              <textarea
                id="comment"
                name="comment"
                value={newReview.comment}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Share your experience with our service..."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="profileImg"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Profile Image
              </label>
              <input
                type="file"
                id="profileImg"
                name="profileImg"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SiteReviewsPage;
