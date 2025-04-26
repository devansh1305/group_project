// src/pages/WatchHistory.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FunnelIcon, PencilIcon } from "@heroicons/react/24/outline";
import FilterModal from "../components/FilterModal";
import RateReviewModal from "../components/RateReviewModal";
import MovieListItem from "../components/MovieListItem";
import { mockMovies } from "../data/mockData";

function WatchHistory() {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    genres: [],
    platforms: [],
    sortBy: "date-new",
    onlyMyPlatforms: false,
  });

  // Filter and sort movies
  let filteredMovies = mockMovies.filter((movie) =>
    movie.categories.includes("watched")
  );

  if (activeFilters.genres.length > 0) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.genres.some((genre) => activeFilters.genres.includes(genre))
    );
  }

  if (activeFilters.platforms.length > 0) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.streamingServices.some((service) =>
        activeFilters.platforms.includes(service)
      )
    );
  }

  if (activeFilters.sortBy) {
    filteredMovies = [...filteredMovies].sort((a, b) => {
      switch (activeFilters.sortBy) {
        case "rating-high":
          return b.rating - a.rating;
        case "rating-low":
          return a.rating - b.rating;
        case "date-new":
          return new Date(b.dateWatched || 0) - new Date(a.dateWatched || 0);
        case "date-old":
          return new Date(a.dateWatched || 0) - new Date(b.dateWatched || 0);
        default:
          return 0;
      }
    });
  }

  const handleReviewEdit = (movie, e) => {
    e.preventDefault(); // Prevent navigating to movie detail page
    setSelectedMovie(movie);
    setShowRateModal(true);
  };

  const handleCloseRateModal = () => {
    setShowRateModal(false);
    setSelectedMovie(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2
          className="text-lg font-bold"
          style={{ color: "var(--bsky-text-primary)" }}
        >
          Watch History
        </h2>
        <div className="flex items-center space-x-2">
          <select
            className="block pl-2 pr-6 py-1 text-xs rounded-md"
            style={{
              backgroundColor: "var(--bsky-bg-tertiary)",
              color: "var(--bsky-text-primary)",
              border: "1px solid var(--bsky-border)",
            }}
            value={activeFilters.sortBy}
            onChange={(e) =>
              setActiveFilters((prev) => ({ ...prev, sortBy: e.target.value }))
            }
          >
            <option value="date-new">Recently Watched</option>
            <option value="date-old">Oldest First</option>
            <option value="rating-high">Highest Rated</option>
            <option value="rating-low">Lowest Rated</option>
          </select>

          <button
            type="button"
            onClick={() => setShowFilterModal(true)}
            className="inline-flex items-center px-3 py-1.5 text-sm rounded-md"
            style={{
              backgroundColor: "var(--bsky-bg-tertiary)",
              color: "var(--bsky-text-primary)",
              border: "1px solid var(--bsky-border)",
            }}
          >
            <FunnelIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            Filters
          </button>
        </div>
      </div>

      {/* Active filters */}
      {(activeFilters.genres.length > 0 ||
        activeFilters.platforms.length > 0 ||
        activeFilters.onlyMyPlatforms) && (
        <div className="mb-3">
          <h2
            style={{ color: "var(--bsky-text-muted)" }}
            className="text-xs font-medium mb-1"
          >
            Filters:
          </h2>
          <div className="flex flex-wrap gap-1">
            {activeFilters.genres.map((genre) => (
              <span
                key={genre}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
                style={{
                  backgroundColor: "var(--bsky-bg-tertiary)",
                  color: "var(--bsky-text-secondary)",
                }}
              >
                {genre}
              </span>
            ))}
            {activeFilters.platforms.map((platform) => (
              <span
                key={platform}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
                style={{
                  backgroundColor: "var(--bsky-bg-tertiary)",
                  color: "var(--bsky-text-secondary)",
                }}
              >
                {platform}
              </span>
            ))}
            {activeFilters.onlyMyPlatforms && (
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
                style={{
                  backgroundColor: "var(--bsky-bg-tertiary)",
                  color: "var(--bsky-accent-blue)",
                }}
              >
                My Platforms
              </span>
            )}
          </div>
        </div>
      )}

      {/* Movie list */}
      <div className="space-y-3">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            style={{
              backgroundColor: "var(--bsky-bg-secondary)",
              border: "1px solid var(--bsky-border)",
              borderRadius: "0.75rem",
              transition: "all 0.2s",
            }}
            className="hover:border-[var(--bsky-accent-blue)] shadow-md overflow-hidden"
          >
            {/* Top section: Poster and Details */}
            <div className="flex">
              {/* Poster (Left) */}
              <div className="w-24 sm:w-28 flex-shrink-0">
                <Link to={`/movie/${movie.id}`}>
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
                </Link>
              </div>

              {/* Movie details (Right) */}
              <div className="flex-1 p-3 flex flex-col min-h-[7rem]">
                <Link to={`/movie/${movie.id}`} className="flex-grow">
                  {/* Title - limit to 2 lines max */}
                  <h3
                    style={{
                      color: "var(--bsky-text-primary)",
                      fontWeight: "600",
                    }}
                    className="text-base line-clamp-2"
                  >
                    {movie.title}
                  </h3>

                  {/* Metadata line: Release date ✿ Genre ✿ Length */}
                  <p
                    style={{
                      color: "var(--bsky-text-secondary)",
                      fontSize: "0.85rem",
                    }}
                    className="mt-1"
                  >
                    {new Date(movie.releaseDate).getFullYear()} ✿{" "}
                    {movie.genres[0]} ✿ {movie.length || "N/A"}
                  </p>

                  {/* User Rating (stars only) */}
                  <div className="mt-2 flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          style={{
                            color:
                              i < Math.round(movie.rating)
                                ? "var(--bsky-accent-blue)"
                                : "var(--bsky-text-muted)",
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Date watched */}
                  {movie.dateWatched && (
                    <p
                      style={{ color: "var(--bsky-text-muted)" }}
                      className="text-xs mt-1"
                    >
                      Watched on {movie.dateWatched}
                    </p>
                  )}
                </Link>
              </div>
            </div>

            {/* Review section (Bottom, Full Width) - no border */}
            {movie.review && (
              <div className="px-3 pb-3 pt-0">
                <div className="relative">
                  <div
                    onClick={(e) => handleReviewEdit(movie, e)}
                    className="group cursor-pointer"
                  >
                    <p
                      className="text-xs italic relative group-hover:blur-sm transition-all duration-200 py-2"
                      style={{
                        color: "var(--bsky-text-secondary)",
                        borderLeft: "3px solid var(--bsky-accent-blue)",
                        paddingLeft: "0.5rem",
                      }}
                    >
                      "
                      {movie.review.length > 150
                        ? movie.review.substring(0, 150) + "..."
                        : movie.review}
                      "
                    </p>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="bg-black bg-opacity-40 rounded-full p-2">
                        <PencilIcon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <div
          className="text-center py-8"
          style={{ color: "var(--bsky-text-muted)" }}
        >
          <p className="text-sm">No watched movies match your filters.</p>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <FilterModal
          onClose={() => setShowFilterModal(false)}
          onApplyFilters={setActiveFilters}
        />
      )}

      {/* Rate and Review Modal */}
      {showRateModal && selectedMovie && (
        <RateReviewModal movie={selectedMovie} onClose={handleCloseRateModal} />
      )}
    </div>
  );
}

export default WatchHistory;
