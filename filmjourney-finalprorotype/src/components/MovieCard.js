// src/components/MovieCard.js
import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

// Props: movie object, layout ('horizontal' or 'vertical')
const MovieCard = ({ movie, layout = "horizontal" }) => {
  if (!movie) {
    return null; // Don't render if movie data is missing
  }

  // Base class + layout specific class
  const cardClass = `movie-card ${
    layout === "vertical" ? "movie-card-vertical" : ""
  }`;

  return (
    <Link to={`/movie/${movie.id}`} className={cardClass}>
      <img src={movie.poster} alt={movie.title} />
      <div className="movie-card-content">
        <div className="movie-card-title">{movie.title}</div>
        <div className="movie-card-rating">
          <StarRating rating={movie.rating} />
          {/* Optionally display numeric rating too */}
          {/* ({movie.imdbRating || 'N/A'}) */}
        </div>
        {layout === "vertical" && movie.dateWatched && (
          <div className="movie-card-extra">Watched: {movie.dateWatched}</div>
        )}
        {/* Add other info for vertical layout if needed */}
      </div>
    </Link>
  );
};

export default MovieCard;
