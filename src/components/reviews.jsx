import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Heart, Sparkles } from "lucide-react";
import axios from "axios";

const CosmeticReviewsComponent = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [reviews, setReviews] = useState([
    {
      name: "",
      review: "",
      profileImg: "",
      rating: 0,
    },
  ]);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/siteReviews") // This should return only approved reviews for non-admin users
        .then((res) => {
          setReviews(res.data); // Store the filtered reviews (approved reviews only)
          // console.log(res.data); // You can remove this console log in production
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const nextReview = () => {
    setIsAutoPlaying(false);
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setIsAutoPlaying(false);
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index) => {
    setIsAutoPlaying(false);
    setCurrentReview(index);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-[#e17100] fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="bg-gradient-to-br from-pink-50 via-orange-50 to-amber-50 py-16 px-4 pt-[200px]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-[#e17100]" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              Customer Reviews
            </h2>
            <Sparkles className="w-8 h-8 text-[#e17100]" />
          </div>
          <p className="text-xl text-gray-600 mb-8">
            See what our beauty lovers are saying about our products
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              {renderStars(Math.round(averageRating))}
              <span className="text-2xl font-bold text-[#e17100] ml-2">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <div className="text-gray-600">
              ({reviews.length} verified reviews)
            </div>
          </div>
        </div>

        {/* Featured Review */}
        <div className="relative mb-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-orange-100">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Customer Image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    src={
                      reviews[currentReview]?.profileImg ||
                      "https://avatar.iran.liara.run/public/boy?username=Ash"
                    } // Ensure `reviews[currentReview]` is defined
                    alt={reviews[currentReview]?.name || "Anonymous"} // Fallback for name if not defined
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-[#e17100]/20"
                  />

                  <div className="absolute -bottom-2 -right-2 bg-[#e17100] rounded-full p-2">
                    <Heart className="w-4 h-4 text-white fill-current" />
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="flex-1 text-center md:text-left h-60">
                <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                  {renderStars(reviews[currentReview]?.rating)}{" "}
                  {/* Using optional chaining */}
                </div>

                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                  "{reviews[currentReview]?.comment || "No comment available"}"{" "}
                  {/* Using optional chaining */}
                </p>

                <div className="space-y-2">
                  <h4 className="text-xl font-semibold text-gray-800">
                    {reviews[currentReview]?.name || "Anonymous"}{" "}
                    {/* Fallback if name is undefined */}
                  </h4>

                  <p className="text-gray-500 text-sm">
                    {formatDate(reviews[currentReview]?.date) || "Unknown Date"}{" "}
                    {/* Fallback if date is undefined */}
                  </p>
                </div>
              </div>
              
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevReview}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#e17100] hover:bg-[#c5640e] rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextReview}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#e17100] hover:bg-[#c5640e] rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mb-16">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToReview(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentReview
                  ? "bg-[#e17100] scale-125"
                  : "bg-gray-300 hover:bg-[#e17100]/50"
              }`}
            />
          ))}
        </div>

        {/* Review Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-orange-100 hover:border-[#e17100]/30"
              onClick={() => goToReview(index)}
            >
              {/* Review Header */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={
                    reviews[currentReview].profileImg ||
                    "https://avatar.iran.liara.run/public/boy?username=Ash"
                  } // Fallback image if profileImg is empty
                  alt={reviews[currentReview].name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-[#e17100]/20"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-sm">
                    {review.name}
                  </h4>
                  <div className="flex items-center gap-1 mt-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>

              {/* Product Name */}
              <p className="text-[#e17100] font-medium text-sm mb-3">
                {review.product}
              </p>

              {/* Review Text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                "{review.comment}"
              </p>

              {/* Date */}
              <p className="text-gray-400 text-xs">{formatDate(review.date)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CosmeticReviewsComponent;
