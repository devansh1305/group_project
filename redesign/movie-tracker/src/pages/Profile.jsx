// src/pages/Profile.jsx
import { PencilIcon, ShareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import StreamingPlatformLogo from "../components/StreamingPlatformLogo";
import StarRating from "../components/StarRating";
import { mockMovies } from "../data/mockData";

function Profile() {
  const user = {
    name: "Jane Smith",
    preferredPlatforms: [
      "Netflix",
      "Disney+",
      "Prime Video",
      "Hulu",
      "HBO Max",
      "Apple TV",
    ],
    favoriteGenres: ["Sci-Fi", "Drama", "Comedy", "History", "Fantasy"],
  };

  const reviewedMovies = mockMovies.filter(
    (movie) => movie.review && movie.review.trim() !== ""
  );
  const reviewCount = reviewedMovies.length;

  const cardStyle = {
    backgroundColor: 'var(--bsky-bg-secondary)',
    border: '1px solid var(--bsky-border)',
    borderRadius: '0.75rem',
  };

  const headingStyle = {
    color: 'var(--bsky-text-primary)',
    borderBottom: '1px solid var(--bsky-border)',
  };

  const nameStyle = {
    color: 'var(--bsky-text-primary)',
  };

  const reviewCountStyle = {
    color: 'var(--bsky-text-secondary)',
  };

  const platformItemStyle = {
    backgroundColor: 'var(--bsky-bg-tertiary)',
    border: '1px solid var(--bsky-border)',
  };

  const genreTagStyle = {
    backgroundColor: 'var(--bsky-bg-tertiary)',
    color: 'var(--bsky-text-primary)',
  };

  const reviewCardStyle = {
    backgroundColor: 'var(--bsky-bg-tertiary)',
    border: '1px solid var(--bsky-border)',
  };

  const reviewTitleStyle = {
    color: 'var(--bsky-text-primary)',
  };

  const reviewBlockquoteStyle = {
    borderLeft: '4px solid var(--bsky-accent-blue)',
    backgroundColor: 'var(--bsky-bg-secondary)',
    color: 'var(--bsky-text-secondary)',
    opacity: 0.8,
  };

  const reviewLinkStyle = {
    color: 'var(--bsky-accent-blue)',
  };

  const noReviewsStyle = {
    color: 'var(--bsky-text-muted)',
  };

  const buttonBlueStyle = {
    backgroundColor: 'var(--bsky-accent-blue)',
    color: 'white',
  };

  const buttonPurpleStyle = {
    backgroundColor: 'var(--bsky-accent-purple)',
    color: 'white',
  };

  return (
    <div className="pb-12 min-h-screen">
      <div className="container mx-auto max-w-4xl px-4">
        <div style={cardStyle} className="shadow-lg p-4 sm:p-6 mt-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 style={nameStyle} className="text-2xl md:text-3xl font-bold mb-0.5">
                {user.name}
              </h1>
              <p style={reviewCountStyle} className="text-sm">{reviewCount} Reviews</p>
            </div>

            <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
              <button
                type="button"
                style={buttonBlueStyle}
                className="flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full shadow-md transition"
              >
                <PencilIcon
                  className="mr-1.5 h-4 w-4"
                  aria-hidden="true"
                />
                Edit Profile
              </button>
              <button
                type="button"
                style={buttonPurpleStyle}
                className="flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full shadow-md transition"
              >
                <ShareIcon
                  className="mr-1.5 h-4 w-4"
                  aria-hidden="true"
                />
                Share Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div style={cardStyle} className="shadow-lg p-4">
            <h2 style={headingStyle} className="text-lg font-semibold mb-3 pb-2">
              Preferred Platforms
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {user.preferredPlatforms.map((platform) => (
                <div
                  key={platform}
                  style={platformItemStyle}
                  className="flex justify-center items-center aspect-video sm:aspect-square p-1 rounded-lg"
                >
                  <StreamingPlatformLogo
                    platform={platform}
                    className="w-full h-full object-contain" 
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={cardStyle} className="shadow-lg p-4">
            <h2 style={headingStyle} className="text-lg font-semibold mb-3 pb-2">
              Favorite Genres
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {user.favoriteGenres.map((genre) => (
                <span
                  key={genre}
                  style={genreTagStyle}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={cardStyle} className="shadow-lg p-4">
          <h2 style={headingStyle} className="text-lg font-semibold mb-3 pb-2">
            Recent Reviews ({reviewCount})
          </h2>
          {reviewedMovies.length > 0 ? (
            <div className="space-y-4">
              {reviewedMovies.map((movie) => (
                <div
                  key={movie.id}
                  style={reviewCardStyle}
                  className="flex items-start gap-3 p-3 rounded-lg"
                >
                  <Link to={`/movie/${movie.id}`} className="flex-shrink-0">
                    <img
                      src={movie.poster}
                      alt={`${movie.title} Poster`}
                      className="w-16 h-24 object-cover rounded-md shadow-sm hover:opacity-80 transition-opacity"
                    />
                  </Link>

                  <div className="flex-grow">
                    <Link to={`/movie/${movie.id}`} className="hover:text-[var(--bsky-accent-blue)] transition-colors">
                      <h3 style={reviewTitleStyle} className="text-base font-semibold">
                        {movie.title}
                      </h3>
                    </Link>
                    <div className="flex items-center my-1">
                      <StarRating rating={movie.rating} />
                      <span style={{ color: 'var(--bsky-text-secondary)' }} className="ml-1.5 text-xs font-semibold">
                        ({movie.rating}/5)
                      </span>
                    </div>
                    <blockquote style={reviewBlockquoteStyle} className="mt-1 pl-3 italic text-xs py-1.5 rounded-r-md line-clamp-3">
                      "{movie.review}"
                    </blockquote>
                    <Link
                      to={`/movie/${movie.id}`}
                      style={reviewLinkStyle}
                      className="text-xs hover:underline mt-1 inline-block"
                    >
                      Read full review...
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={noReviewsStyle} className="text-sm italic mt-2">
              No reviews written yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;