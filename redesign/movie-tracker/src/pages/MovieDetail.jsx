// src/pages/MovieDetail.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  PlusIcon,
  StarIcon,
  ShareIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import StarRating from "../components/StarRating";
import RateReviewModal from "../components/RateReviewModal";
import StreamingPlatformLogo from "../components/StreamingPlatformLogo";
import { mockMovies } from "../data/mockData";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showRateModal, setShowRateModal] = useState(false);
  const movie = mockMovies.find((m) => m.id === parseInt(id));
  const isInWatchlist = movie?.categories?.includes("watchLater");

  if (!movie) {
    return (
      <div
        className="text-center py-10"
        style={{ color: "var(--bsky-text-primary)" }}
      >
        Movie not found
      </div>
    );
  }

  const releaseYear = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : "N/A";

  const sectionStyle = {
    backgroundColor: "var(--bsky-bg-secondary)",
    border: "1px solid var(--bsky-border)",
    borderRadius: "0.75rem",
  };

  const headingStyle = {
    color: "var(--bsky-text-primary)",
    borderBottom: "1px solid var(--bsky-border)",
  };

  const detailLabelStyle = {
    color: "var(--bsky-text-muted)",
    fontSize: "0.75rem",
    fontWeight: "600",
  };

  const detailValueStyle = {
    color: "var(--bsky-text-secondary)",
  };

  const genreTagStyle = {
    backgroundColor: "var(--bsky-bg-tertiary)",
    color: "var(--bsky-text-primary)",
  };

  const actionButtonStyle = (primary = false) => ({
    backgroundColor: primary
      ? "var(--bsky-accent-blue)"
      : "var(--bsky-bg-tertiary)",
    color: primary ? "white" : "var(--bsky-text-muted)",
    border: primary ? "none" : "1px solid var(--bsky-border)",
  });

  const reviewBlockStyle = {
    borderLeft: "4px solid var(--bsky-accent-blue)",
    opacity: 0.8,
    backgroundColor: "var(--bsky-bg-tertiary)",
    color: "var(--bsky-text-secondary)",
  };

  return (
    <div className="pb-12 min-h-screen">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mt-5 mb-4 inline-flex items-center text-sm font-medium group"
          style={{ color: "var(--bsky-text-secondary)" }}
        >
          <ArrowLeftIcon
            className="mr-1.5 h-4 w-4 group-hover:text-[var(--bsky-accent-blue)]"
            aria-hidden="true"
          />
          Back
        </button>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Column: Poster & Actions */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <div
              className="aspect-[2/3] overflow-hidden shadow-xl relative group cursor-pointer"
              style={{
                backgroundColor: "var(--bsky-bg-tertiary)",
                border: "1px solid var(--bsky-border)",
                borderRadius: "0.75rem",
              }}
            >
              {movie.poster ? (
                <>
                  <img
                    src={movie.poster}
                    alt={`Poster for ${movie.title}`}
                    className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-black bg-opacity-60 rounded-full p-5 transform group-hover:scale-110 transition-transform">
                      <PlayIcon className="h-10 w-10 text-white" />
                    </div>
                    <span className="absolute bottom-4 text-white font-medium text-sm bg-black bg-opacity-60 py-1 px-3 rounded-full">
                      Watch Trailer
                    </span>
                  </div>
                </>
              ) : (
                <div
                  className="flex items-center justify-center h-full"
                  style={{ color: "var(--bsky-text-muted)" }}
                >
                  No Poster
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-2">
              <button
                type="button"
                style={actionButtonStyle(!isInWatchlist)}
                className="flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-full transition"
                disabled={isInWatchlist}
              >
                <PlusIcon className="mr-1.5 h-4 w-4" aria-hidden="true" />
                {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
              </button>
              <button
                type="button"
                onClick={() => setShowRateModal(true)}
                style={{
                  backgroundColor: "var(--bsky-accent-purple)",
                  color: "white",
                }}
                className="flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-full transition"
              >
                <StarIcon className="mr-1.5 h-4 w-4" aria-hidden="true" />
                Rate / Review
              </button>
              <button
                type="button"
                style={{
                  backgroundColor: "var(--bsky-accent-teal)",
                  color: "white",
                }}
                className="flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-full transition"
              >
                <ShareIcon className="mr-1.5 h-4 w-4" aria-hidden="true" />
                Share
              </button>
            </div>
          </div>

          {/* Right Column: Details & Reviews */}
          <div className="w-full lg:w-2/3">
            <h1
              style={{ color: "var(--bsky-text-primary)" }}
              className="text-3xl font-bold mb-1"
            >
              {movie.title}
            </h1>
            <p
              style={{ color: "var(--bsky-text-secondary)" }}
              className="text-lg mb-4 font-light"
            >
              ({releaseYear})
            </p>

            {/* Details Section */}
            <div style={sectionStyle} className="p-4 mb-4 shadow-lg">
              <h2
                style={headingStyle}
                className="text-lg font-semibold mb-3 pb-2"
              >
                Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div className="flex flex-col">
                  <dt style={detailLabelStyle} className="mb-1">
                    Genres
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre}
                        style={genreTagStyle}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt style={detailLabelStyle} className="mb-1">
                    Director
                  </dt>
                  <dd style={detailValueStyle}>{movie.director}</dd>
                </div>
                <div className="flex flex-col">
                  <dt style={detailLabelStyle} className="mb-1">
                    Cast
                  </dt>
                  <dd style={detailValueStyle} className="leading-snug">
                    {movie.cast.join(", ")}
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt style={detailLabelStyle} className="mb-1">
                    Writer
                  </dt>
                  <dd style={detailValueStyle}>{movie.writer}</dd>
                </div>
                <div className="flex flex-col">
                  <dt style={detailLabelStyle} className="mb-1">
                    Release Date
                  </dt>
                  <dd style={detailValueStyle}>{movie.releaseDate}</dd>
                </div>
                {movie.recognition && (
                  <div className="flex flex-col">
                    <dt style={detailLabelStyle} className="mb-1">
                      Recognition
                    </dt>
                    <dd style={detailValueStyle}>{movie.recognition}</dd>
                  </div>
                )}
                {movie.dateWatched && (
                  <div className="flex flex-col">
                    <dt style={detailLabelStyle} className="mb-1">
                      Date Watched
                    </dt>
                    <dd style={detailValueStyle}>{movie.dateWatched}</dd>
                  </div>
                )}
                <div className="md:col-span-2 flex flex-col mt-1">
                  <dt style={detailLabelStyle} className="mb-1">
                    Available On
                  </dt>
                  <dd className="flex flex-wrap gap-3">
                    {movie.streamingServices.map((service) => (
                      <StreamingPlatformLogo
                        key={service}
                        platform={service}
                        className="h-10 w-20 rounded-lg"
                        style={{
                          backgroundColor: "var(--bsky-bg-tertiary)",
                          border: "1px solid var(--bsky-border)",
                        }}
                      />
                    ))}
                  </dd>
                </div>
              </div>
            </div>

            {/* Ratings & Reviews Section */}
            <div style={sectionStyle} className="p-4 shadow-lg">
              <h2
                style={headingStyle}
                className="text-lg font-semibold mb-3 pb-2"
              >
                Ratings & Reviews
              </h2>

              <div className="mb-3 flex items-center gap-4 flex-wrap">
                <div className="flex items-center">
                  <span
                    style={{ color: "var(--bsky-text-muted)" }}
                    className="text-xs font-medium mr-1.5"
                  >
                    Your Rating:
                  </span>
                  <StarRating rating={movie.rating} />
                  <span
                    style={{ color: "var(--bsky-text-primary)" }}
                    className="ml-1.5 text-xs font-semibold"
                  >
                    ({movie.rating}/5)
                  </span>
                </div>
                <div className="flex items-center">
                  <span
                    style={{ color: "var(--bsky-text-muted)" }}
                    className="text-xs font-medium mr-1.5"
                  >
                    IMDb:
                  </span>
                  <span
                    style={{ color: "var(--bsky-text-primary)" }}
                    className="text-xs font-semibold"
                  >
                    {movie.imdbRating}/10
                  </span>
                </div>
              </div>

              {movie.review ? (
                <div className="space-y-3">
                  <div>
                    <h3
                      style={{ color: "var(--bsky-accent-blue)" }}
                      className="text-xs font-semibold mb-1"
                    >
                      Your Review:
                    </h3>
                    <blockquote
                      style={reviewBlockStyle}
                      className="pl-3 italic text-xs py-2 rounded-r-md"
                    >
                      "{movie.review}"
                    </blockquote>
                  </div>
                </div>
              ) : (
                <p
                  style={{ color: "var(--bsky-text-muted)" }}
                  className="text-xs italic mt-2"
                >
                  No reviews available yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rate and Review Modal */}
      {showRateModal && (
        <RateReviewModal
          movie={movie}
          onClose={() => setShowRateModal(false)}
        />
      )}
    </div>
  );
}

export default MovieDetail;
