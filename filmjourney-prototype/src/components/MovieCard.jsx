import React from "react";
import "./MovieCard.css"; // We'll create this CSS file

const MovieCard = ({
  movie,
  entry,
  userAvatar,
  onClick,
  showStatus = false,
  size = "normal",
}) => {
  if (!movie) return null; // Handle case where movie data might be missing

  const sizeClass = `movie-card-${size}`; // e.g., 'movie-card-small', 'movie-card-large'

  const renderStatusIndicator = () => {
    if (!showStatus || !entry?.status) return null;
    let symbol = "";
    let color = "";
    switch (entry.status) {
      case "watched":
        symbol = "✓";
        color = "limegreen";
        break;
      case "partial":
        symbol = "½";
        color = "orange";
        break;
      case "rewatched":
        symbol = "↻";
        color = "lightblue";
        break;
      default:
        return null;
    }
    return (
      <div className="status-indicator" style={{ backgroundColor: color }}>
        {symbol}
      </div>
    );
  };

  return (
    <div
      className={`movie-card ${sizeClass}`}
      onClick={() => (onClick ? onClick(movie, entry) : null)}
    >
      <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
      {userAvatar && (
        <img src={userAvatar} alt="User" className="user-avatar-corner" />
      )}
      {renderStatusIndicator()}
      {/* Basic title display on hover/focus might be nice */}
      {/* <div className="movie-title-overlay">{movie.title}</div> */}
    </div>
  );
};

export default MovieCard;
