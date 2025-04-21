// src/components/RateReviewModal.js
import React, { useState } from "react";
import StarRating from "./StarRating";

// Props: show, onClose, movieTitle
const RateReviewModal = ({ show, onClose, movieTitle }) => {
  const [rating, setRating] = useState(0); // User's rating input
  const [review, setReview] = useState("");
  const [dateWatched, setDateWatched] = useState("");

  const handleDone = () => {
    // In a real app, you'd save this data
    console.log("Review Submitted (Demo):", {
      movieTitle,
      rating,
      review,
      dateWatched,
    });
    onClose(); // Close the modal
  };

  const handleClose = () => {
    // Optionally reset state on close if desired
    setRating(0);
    setReview("");
    setDateWatched("");
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={handleClose}>
          ×
        </button>
        <h2>Rate and Review</h2>
        <h3>{movieTitle || "Movie Title"}</h3>

        <label>Your Rating:</label>
        <StarRating rating={rating} interactive={true} onRate={setRating} />

        <label htmlFor="reviewText">Your Review:</label>
        <textarea
          id="reviewText"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Your Review..."
        />

        <label htmlFor="dateWatched">Date Watched:</label>
        <input
          type="date" // Use date input type
          id="dateWatched"
          value={dateWatched}
          onChange={(e) => setDateWatched(e.target.value)}
          placeholder="MM/DD/YY"
        />

        <div className="modal-actions">
          <button onClick={handleDone}>Done</button>
        </div>
      </div>
    </div>
  );
};

export default RateReviewModal;
