// src/components/RateReviewModal.jsx
import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import StarRating from "./StarRating"; // Assuming this is styled nicely

function RateReviewModal({ movie, onClose }) {
  // Retrieve existing rating/review if available in movie object, else default
  const [rating, setRating] = useState(movie?.rating || 0);
  const [review, setReview] = useState(movie?.review || "");
  const [dateWatched, setDateWatched] = useState(movie?.dateWatched || "");

  // Prevent body scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = () => {
    // TODO: Implement actual update logic (e.g., call an API, update state)
    console.log("Submitting:", {
      movieId: movie.id,
      rating,
      review,
      dateWatched,
    });
    // Example: update mock data (this won't persist unless managed globally)
    // const movieIndex = mockMovies.findIndex(m => m.id === movie.id);
    // if (movieIndex !== -1) {
    //   mockMovies[movieIndex] = { ...mockMovies[movieIndex], rating, review, dateWatched };
    // }
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" // Enhanced backdrop
      onClick={handleBackdropClick}
    >
      {/* Added subtle gradient, increased rounding */}
      <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-xl shadow-2xl w-full max-w-md flex flex-col ring-1 ring-black/5">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-200 flex-shrink-0">
          {/* Display Movie Title in Header */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Rate & Review
            </h3>
            <p className="text-sm text-indigo-600">{movie.title}</p>
          </div>
          <button
            type="button"
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition-colors"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content Area (though likely short) */}
        <div className="p-4 sm:p-5 space-y-5 overflow-y-auto flex-grow">
          {/* Rating Section */}
          <fieldset className="text-center sm:text-left">
            <legend className="block text-sm font-semibold text-gray-600 mb-2">
              Your Rating
            </legend>
            {/* Ensure StarRating component accepts size props or style appropriately */}
            <div className="inline-block">
              {" "}
              {/* Center stars if needed */}
              <StarRating
                rating={rating}
                interactive={true}
                onChange={setRating}
                size="large"
              />{" "}
              {/* Assuming StarRating takes size */}
            </div>
          </fieldset>

          {/* Review Section */}
          <fieldset>
            <label
              htmlFor="review"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Your Review{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="review"
              rows={5} // Slightly more rows
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm text-gray-800 transition placeholder:text-gray-400" // Improved styling
              placeholder="Share your thoughts on the movie..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </fieldset>

          {/* Date Watched Section */}
          <fieldset>
            <label
              htmlFor="date-watched"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Date Watched{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="date" // Use date type for better UX
              id="date-watched"
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm text-gray-800 transition placeholder:text-gray-400" // Improved styling
              placeholder="YYYY-MM-DD"
              value={dateWatched} // Ensure value format matches 'YYYY-MM-DD' for date input
              onChange={(e) => setDateWatched(e.target.value)}
            />
          </fieldset>
        </div>

        {/* Modal Footer - Actions */}
        <div className="p-4 sm:p-5 border-t border-gray-200 bg-gray-50/50 rounded-b-xl flex-shrink-0">
          {/* Submit Button - Full width, gradient style */}
          <button
            type="button"
            // Consistent gradient button style, full width
            className="w-full flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-lg shadow-md text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transform hover:-translate-y-0.5 transition duration-200 ease-in-out"
            onClick={handleSubmit}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default RateReviewModal;
