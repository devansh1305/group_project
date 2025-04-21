// src/components/StarRating.js
import React from "react";

const Star = ({ filled, onClick }) => (
  <span
    className={`star ${filled ? "filled" : ""}`}
    onClick={onClick}
    style={{ cursor: onClick ? "pointer" : "default" }} // Only show pointer if interactive
  >
    ★
  </span>
);

const StarRating = ({ rating, interactive = false, onRate = () => {} }) => {
  const totalStars = 5;
  const filledStars = Math.round(rating); // Or use rating directly if you want half-stars (more complex)

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          filled={index < (interactive ? rating : filledStars)} // Show precise rating when interacting
          onClick={interactive ? () => onRate(index + 1) : null}
        />
      ))}
    </div>
  );
};

export default StarRating;
