import React, { useState } from "react";
import "./RatingComponent.css";

// Simple star rating component
const StarRating = ({ rating, setRating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        const isHalf = rating >= ratingValue - 0.5 && rating < ratingValue;
        const isFull = rating >= ratingValue;

        return (
          <span
            key={index}
            className={`star ${isFull ? "full" : isHalf ? "half" : ""}`}
            onClick={() => setRating(ratingValue)} // Click full star
            onMouseMove={(e) => {
              // Handle half star selection (basic)
              const rect = e.target.getBoundingClientRect();
              const isLeftSide = e.clientX - rect.left < rect.width / 2;
              if (isLeftSide) {
                // Optional: Visual feedback for hovering half
              }
            }}
            onDoubleClick={() => setRating(ratingValue - 0.5)} // Double click for half star - simpler than mouse move detection
          >
            ★
          </span>
        );
      })}
      <span className="rating-value"> ({rating}/5)</span>
      <button
        onClick={() => setRating(0)}
        style={{ marginLeft: "10px", fontSize: "10px" }}
      >
        Clear
      </button>
    </div>
  );
};

// Simple Emoji Slider (using buttons for prototype)
const EmotionRating = ({ emotion, setEmotion }) => {
  const emojis = ["😠", "🙁", "😐", "😊", "😍"]; // Hated -> Masterpiece
  return (
    <div className="emotion-rating">
      <label>Emotion: </label>
      {emojis.map((emoji, index) => (
        <button
          key={index}
          className={`emoji-button ${emotion === index + 1 ? "selected" : ""}`}
          onClick={() => setEmotion(index + 1)}
        >
          {emoji}
        </button>
      ))}
      <span className="emotion-value"> ({emotion}/5)</span>
    </div>
  );
};

const RatingComponent = ({ initialRating = 0, initialEmotion = 0, onSave }) => {
  const [rating, setRating] = useState(initialRating);
  const [emotion, setEmotion] = useState(initialEmotion);
  const [review, setReview] = useState("");
  const [tags, setTags] = useState([]); // Simple tag implementation

  const handleAddTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleSave = () => {
    onSave({ rating, emotion, review, tags });
  };

  return (
    <div className="rating-section">
      <h4>Rate this Film</h4>
      <StarRating rating={rating} setRating={setRating} />
      <EmotionRating emotion={emotion} setEmotion={setEmotion} />

      <div className="quick-tags">
        <label>Quick Tags: </label>
        {/* Example Tags */}
        <button className="tag-bubble" onClick={() => handleAddTag("Fun")}>
          Fun
        </button>
        <button
          className="tag-bubble"
          onClick={() => handleAddTag("Emotional")}
        >
          Emotional
        </button>
        <button
          className="tag-bubble"
          onClick={() => handleAddTag("Mind-bending")}
        >
          Mind-bending
        </button>
      </div>
      <div className="selected-tags">
        {tags.map((tag) => (
          <span key={tag} className="tag-bubble selected">
            {tag}{" "}
            <button
              onClick={() => setTags(tags.filter((t) => t !== tag))}
              className="remove-tag"
            >
              x
            </button>
          </span>
        ))}
      </div>

      <div className="review-section">
        <textarea
          placeholder="Add your review (optional)..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={3}
        />
      </div>

      <button onClick={handleSave} className="save-button">
        Save Entry
      </button>
    </div>
  );
};

export default RatingComponent;
