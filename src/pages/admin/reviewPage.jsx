import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null); // To hold the selected review for detail view

  // Fetch all reviews from the backend
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/siteReviews", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure you're sending the token
        },
      }) // Adjust URL if needed
      .then((res) => {
        setReviews(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  // Handle approve review
  const handleApprove = async (reviewId, currentStatus) => {
    try {
      // The isApproved status will now be passed in the request body
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/siteReviews/${reviewId}`,
        {
          isApproved: !currentStatus, // Toggle the approval status
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure you're sending the token
          },
        }
      );

      // Check if approval was successful
      if (response.status === 200) {
        // Update the local state to reflect the approval change
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === reviewId
              ? { ...review, isApproved: !currentStatus }
              : review
          )
        );
      } else {
        console.log("Failed to approve the review");
      }
    } catch (error) {
      console.error("Error approving review:", error);
    }
  };

  // Show details of the review
  const handleViewDetails = (review) => {
    setSelectedReview(review); // Set the selected review to show details
  };

  // Handle closing the review details modal
  const handleCloseDetails = () => {
    setSelectedReview(null); // Close the modal by clearing the selected review
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-11/12 max-w-6xl bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">All Reviews</h2>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">#</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Rating</th>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review, index) => (
                  <tr key={review._id}>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{review.name}</td>
                    <td className="py-2 px-4 border-b">{review.rating}</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(review.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={
                          () => handleApprove(review._id, review.isApproved) // Pass the current approval status
                        }
                        className={`${
                          review.isApproved ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"
                        } text-white px-4 py-2 rounded-lg cursor-pointer mr-2`}
                      >
                        {review.isApproved ? "Approved" : "Approve"}
                      </button>
                      <button
                        onClick={() => handleViewDetails(review)} // Show review details
                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Review Details Modal */}
        {selectedReview && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl w-1/2">
              <h2 className="text-2xl font-bold mb-4">Review Details</h2>
              <div className="mb-4">
                <strong>Name:</strong> {selectedReview.name}
              </div>
              <div className="mb-4">
                <strong>Email:</strong> {selectedReview.email}
              </div>
              <div className="mb-4">
                <strong>Rating:</strong> {selectedReview.rating}
              </div>
              <div className="mb-4">
                <strong>Comment:</strong> {selectedReview.comment}
              </div>
              <div className="mb-4">
                <strong>Profile Image:</strong>
                <img
                  src={selectedReview.profileImg}
                  alt={selectedReview.name}
                  className="w-24 h-24 rounded-full"
                />
              </div>
              <div className="mb-4">
                <strong>Date:</strong>{" "}
                {new Date(selectedReview.date).toLocaleDateString()}
              </div>
              <button
                onClick={handleCloseDetails} // Close the details modal
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
