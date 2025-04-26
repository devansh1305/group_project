// src/pages/Recommendations.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FunnelIcon } from "@heroicons/react/24/outline";
import MovieListItem from "../components/MovieListItem";
import FilterModal from "../components/FilterModal";
import { mockMovies } from "../data/mockData";

function Recommendations() {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    genres: [],
    platforms: [],
    sortBy: "rating-high", // Default sort by highest rating
    onlyMyPlatforms: false,
  });

  // Filter and sort movies
  let filteredMovies = mockMovies.filter((movie) =>
    movie.categories.includes("recommended")
  );

  // Apply genre filter
  if (activeFilters.genres.length > 0) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.genres.some((genre) => activeFilters.genres.includes(genre))
    );
  }

  // Apply platform filter
  if (activeFilters.platforms.length > 0) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.streamingServices.some((service) =>
        activeFilters.platforms.includes(service)
      )
    );
  }

  // Apply sorting
  if (activeFilters.sortBy) {
    filteredMovies = [...filteredMovies].sort((a, b) => {
      switch (activeFilters.sortBy) {
        case "rating-high":
          return b.rating - a.rating;
        case "rating-low":
          return a.rating - b.rating;
        case "date-new":
          return new Date(b.releaseDate) - new Date(a.releaseDate);
        case "date-old":
          return new Date(a.releaseDate) - new Date(b.releaseDate);
        default:
          return 0;
      }
    });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2
          className="text-lg font-bold"
          style={{ color: "var(--bsky-text-primary)" }}
        >
          Recommendations
        </h2>
        <div className="flex items-center space-x-2">
          {/* <select
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
            <option value="rating-high">Top Rated</option>
            <option value="rating-low">Low Rated</option>
            <option value="date-new">Newest</option>
            <option value="date-old">Oldest</option>
          </select> */}

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

      {/* Active filters display */}
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
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            state={{ from: "recommendations" }}
            className="block"
          >
            <MovieListItem movie={movie} />
          </Link>
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <div
          className="text-center py-8"
          style={{ color: "var(--bsky-text-muted)" }}
        >
          <p className="text-sm">
            No movies match your filters. Try adjusting your criteria.
          </p>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <FilterModal
          onClose={() => setShowFilterModal(false)}
          onApplyFilters={setActiveFilters}
        />
      )}
    </div>
  );
}

export default Recommendations;
