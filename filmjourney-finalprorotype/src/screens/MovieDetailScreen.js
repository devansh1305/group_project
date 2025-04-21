// src/screens/MovieDetailScreen.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById, isInWatchLater } from "../data"; // Import helpers
import StarRating from "../components/StarRating";
import RateReviewModal from "../components/RateReviewModal";

// Platform icon mapping (simple example)
const platformIcons = {
  Netflix: "📺", // Replace with actual <img> or icon components later
  "Prime Video": "🅿️",
  "Disney+": "✨",
  Hulu: "🟩",
};

const MovieDetailScreen = () => {
  const { movieId } = useParams(); // Get movie ID from URL
  const navigate = useNavigate(); // Hook for navigation
  const [movie, setMovie] = useState(null);
  const [showRateModal, setShowRateModal] = useState(false);
  const [isOnWatchLater, setIsOnWatchLater] = useState(false);

  useEffect(() => {
    // Fetch movie data based on ID when component mounts or ID changes
    const fetchedMovie = getMovieById(movieId);
    if (fetchedMovie) {
      setMovie(fetchedMovie);
      setIsOnWatchLater(isInWatchLater(movieId)); // Check initial watch later status
    } else {
      // Handle movie not found case (e.g., redirect or show error)
      console.error("Movie not found!");
      navigate("/"); // Redirect home for now
    }
  }, [movieId, navigate]); // Re-run effect if movieId changes

  const handleToggleWatchLater = () => {
    // --- DEMO ONLY ---
    // In a real app, this would update state/backend
    console.log(
      `${isOnWatchLater ? "Removing from" : "Adding to"} Watch Later (Demo): ${
        movie.title
      }`
    );
    setIsOnWatchLater(!isOnWatchLater);
    // You might need to update the actual `watchLater` array in `data.js`
    // or use proper state management for this demo to persist the change
    // across navigation, but for a simple click demo, just toggling the
    // local state `isOnWatchLater` is sufficient.
    // -----------------
  };

  if (!movie) {
    return <div>Loading...</div>; // Or a more sophisticated loading indicator
  }

  return (
    <div className="movie-detail">
      <button className="back-button" onClick={() => navigate(-1)}>
        ←
      </button>{" "}
      {/* Go back */}
      <img src={movie.poster} alt={movie.title} />
      <div className="movie-detail-info">
        <h1>{movie.title}</h1>
        <StarRating rating={movie.rating} />
        <p>
          <strong>IMDB Rating:</strong> {movie.imdbRating || "N/A"}
        </p>
        <p>
          <strong>Release Date:</strong> {movie.releaseDate || "N/A"}
        </p>
        <p>
          <strong>Genre:</strong> {movie.genre?.join(", ") || "N/A"}
        </p>
        <p>
          <strong>Available On:</strong>
        </p>
        <div className="platform-icons">
          {movie.platforms?.length > 0
            ? movie.platforms.map((p) => (
                <span key={p}>{platformIcons[p] || p}</span>
              ))
            : "N/A"}
        </div>
        <p>
          <strong>Cast:</strong> {movie.cast?.join(", ") || "N/A"}
        </p>
        <p>
          <strong>Director:</strong> {movie.director || "N/A"}
        </p>
        <p>
          <strong>Writer:</strong> {movie.writer || "N/A"}
        </p>
        {movie.recognition && (
          <p>
            <strong>Recognition:</strong> {movie.recognition}
          </p>
        )}
        {movie.dateWatched && (
          <p>
            <strong>Date Watched:</strong> {movie.dateWatched}
          </p>
        )}

        <div className="detail-actions">
          <button onClick={handleToggleWatchLater}>
            {isOnWatchLater ? "✓ Added to Watch Later" : "+ Add to Watch Later"}
          </button>
          <button onClick={() => setShowRateModal(true)}>Rate Movie</button>
        </div>
      </div>
      <RateReviewModal
        show={showRateModal}
        onClose={() => setShowRateModal(false)}
        movieTitle={movie.title}
      />
    </div>
  );
};

export default MovieDetailScreen;
