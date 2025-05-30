// src/components/RateReviewModal.jsx
import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";

function RateReviewModal({ movie, onClose }) {
  const [rating, setRating] = useState(movie?.rating || 0);
  const [review, setReview] = useState(movie?.review || "");
  const [dateWatched, setDateWatched] = useState(movie?.dateWatched || "");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = () => {
    console.log("Submitting:", {
      movieId: movie.id,
      rating,
      review,
      dateWatched,
    });
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Direct star rating implementation for better control over size
  const EnhancedStarRating = ({ rating, onChange }) => {
    return (
      <div className="flex space-x-2">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            onClick={() => onChange(i + 1)}
            className="focus:outline-none p-1.5" // Added padding for larger touch target
            type="button"
          >
            {i < rating ? (
              <StarIcon
                className="h-8 w-8 sm:h-10 sm:w-10" // Larger stars
                style={{ color: "var(--bsky-accent-blue)" }}
              />
            ) : (
              <StarOutlineIcon
                className="h-8 w-8 sm:h-10 sm:w-10" // Larger stars
                style={{ color: "var(--bsky-text-muted)" }}
              />
            )}
          </button>
        ))}
      </div>
    );
  };

  const modalBackdropStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(4px)",
  };

  const modalStyle = {
    backgroundColor: "var(--bsky-bg-secondary)",
    border: "1px solid var(--bsky-border)",
    borderRadius: "0.75rem",
  };

  const headerStyle = {
    borderBottom: "1px solid var(--bsky-border)",
  };

  const titleStyle = {
    color: "var(--bsky-text-primary)",
  };

  const subtitleStyle = {
    color: "var(--bsky-accent-blue)",
  };

  const labelStyle = {
    color: "var(--bsky-text-secondary)",
    fontWeight: "600",
  };

  const optionalStyle = {
    color: "var(--bsky-text-muted)",
    fontWeight: "normal",
  };

  const inputStyle = {
    backgroundColor: "var(--bsky-bg-tertiary)",
    color: "var(--bsky-text-primary)",
    border: "1px solid var(--bsky-border)",
  };

  const footerStyle = {
    borderTop: "1px solid var(--bsky-border)",
  };

  const buttonStyle = {
    backgroundColor: "var(--bsky-accent-blue)",
    color: "white",
  };

  return (
    <div
      style={modalBackdropStyle}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div
        style={modalStyle}
        className="w-full max-w-md flex flex-col shadow-2xl"
      >
        <div
          style={headerStyle}
          className="flex justify-between items-center p-4 sm:p-5"
        >
          <div>
            <h3 style={titleStyle} className="text-lg font-semibold">
              Rate & Review
            </h3>
            <p style={subtitleStyle} className="text-sm">
              {movie.title}
            </p>
          </div>
          <button
            type="button"
            className="p-1.5 rounded-full transition-colors"
            style={{ color: "var(--bsky-text-muted)" }}
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-grow">
          {/* Enhanced Rating Section */}
          <fieldset className="text-center">
            <legend
              style={labelStyle}
              className="block text-base sm:text-lg mb-3 font-semibold" // Larger text
            >
              Your Rating
            </legend>
            <div className="inline-block">
              <EnhancedStarRating rating={rating} onChange={setRating} />
            </div>
          </fieldset>

          <fieldset>
            <label
              htmlFor="review"
              style={labelStyle}
              className="block text-sm mb-1"
            >
              Your Review <span style={optionalStyle}>(optional)</span>
            </label>
            <textarea
              id="review"
              rows={5}
              style={inputStyle}
              className="block w-full rounded-lg shadow-sm focus:border-[var(--bsky-accent-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--bsky-accent-blue)] sm:text-sm transition"
              placeholder="Share your thoughts on the movie..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <label
              htmlFor="date-watched"
              style={labelStyle}
              className="block text-sm mb-1"
            >
              Date Watched <span style={optionalStyle}>(optional)</span>
            </label>
            <input
              type="date"
              id="date-watched"
              style={inputStyle}
              className="block w-full rounded-lg shadow-sm focus:border-[var(--bsky-accent-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--bsky-accent-blue)] sm:text-sm transition"
              placeholder="YYYY-MM-DD"
              value={dateWatched}
              onChange={(e) => setDateWatched(e.target.value)}
            />
          </fieldset>
        </div>

        <div
          style={footerStyle}
          className="p-4 sm:p-5 rounded-b-xl flex-shrink-0"
        >
          <button
            type="button"
            style={buttonStyle}
            className="w-full flex items-center justify-center px-5 py-3 rounded-lg shadow-md text-sm font-semibold transition duration-200 ease-in-out"
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
