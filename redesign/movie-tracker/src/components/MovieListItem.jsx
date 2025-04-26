// src/components/MovieListItem.jsx
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

function MovieListItem({ movie }) {
  const cardStyle = {
    backgroundColor: "var(--bsky-bg-secondary)",
    border: "1px solid var(--bsky-border)",
    borderRadius: "0.75rem",
    transition: "all 0.2s",
  };

  const titleStyle = {
    color: "var(--bsky-text-primary)",
    fontWeight: "600",
  };

  const metadataStyle = {
    color: "var(--bsky-text-secondary)",
    fontSize: "0.85rem",
  };

  const platformTagStyle = {
    backgroundColor: "var(--bsky-bg-tertiary)",
    color: "var(--bsky-text-secondary)",
    fontSize: "0.7rem",
  };

  // Get just the year from the release date
  const releaseYear = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : "N/A";
  // Get just the first genre
  const primaryGenre =
    movie.genres && movie.genres.length > 0 ? movie.genres[0] : "N/A";

  return (
    <div
      style={cardStyle}
      className="flex hover:border-[var(--bsky-accent-blue)] shadow-md overflow-hidden"
    >
      {/* Poster */}
      <div className="w-24 sm:w-28 flex-shrink-0">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="flex items-center justify-center h-full"
            style={{ backgroundColor: "var(--bsky-bg-tertiary)" }}
          >
            <span
              style={{ color: "var(--bsky-text-muted)" }}
              className="text-xs"
            >
              No Image
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-3 flex flex-col">
        {/* Title */}
        <h3 style={titleStyle} className="text-base">
          {movie.title}
        </h3>

        {/* Metadata line: Release date ✿ Genre ✿ Length */}
        <p style={metadataStyle} className="mt-1">
          {releaseYear} ✿ {primaryGenre} ✿ {movie.length || "N/A"}
        </p>

        {/* IMDb Rating */}
        <div className="mt-2 flex items-center">
          <StarRating rating={movie.imdbRating / 2} size="small" />
          <span
            style={{ color: "var(--bsky-text-secondary)" }}
            className="ml-2 text-xs"
          >
            {movie.imdbRating}/10
          </span>
        </div>

        {/* Streaming Platforms */}
        {movie.streamingServices && movie.streamingServices.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {movie.streamingServices.map((service) => (
              <span
                key={service}
                style={platformTagStyle}
                className="inline-flex items-center px-2 py-0.5 rounded-full font-medium"
              >
                {service}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieListItem;
