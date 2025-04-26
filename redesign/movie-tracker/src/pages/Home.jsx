// src/pages/Home.jsx
import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { mockMovies } from "../data/mockData";
import StarRating from "../components/StarRating";
import MovieListItem from "../components/MovieListItem";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import StackedPlatformLogos from "../components/StackedPlatformLogos";

function Home() {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const searchQuery = location.state?.searchQuery || "";
  const searchResultsRef = useRef(null);

  useEffect(() => {
    if (searchQuery) {
      const results = mockMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setTimeout(() => {
        searchResultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const recommendations = mockMovies.filter((movie) =>
    movie.categories?.includes("recommended")
  );
  const watchLater = mockMovies.filter((movie) =>
    movie.categories?.includes("watchLater")
  );
  const watchHistory = mockMovies.filter((movie) =>
    movie.categories?.includes("watched")
  );

  const sectionTitleStyle = {
    color: "var(--bsky-text-primary)",
    fontWeight: "700",
  };

  const viewAllStyle = {
    color: "var(--bsky-accent-blue)",
  };

  const movieCardStyle = {
    backgroundColor: "var(--bsky-bg-tertiary)",
    borderRadius: "0.5rem",
  };

  const movieTitleStyle = {
    color: "var(--bsky-text-secondary)",
    fontWeight: "500",
  };

  const noResultsStyle = {
    backgroundColor: "var(--bsky-bg-secondary)",
    border: "1px solid var(--bsky-border)",
    borderRadius: "0.75rem",
  };

  const CarouselSectionStacked = ({ title, movies, viewAllLink }) => {
    if (!movies || movies.length === 0) {
      return null;
    }

    const platformBadgeStyle = {
      backgroundColor: "var(--bsky-bg-tertiary)",
      color: "var(--bsky-text-secondary)",
      fontSize: "0.6rem",
    };

    return (
      <section className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 style={sectionTitleStyle} className="text-lg">
            {title}
          </h2>
          <Link
            to={viewAllLink}
            style={viewAllStyle}
            className="flex items-center text-sm font-medium group"
          >
            View All
            <ChevronRightIcon className="w-4 h-4 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="flex-shrink-0 w-32 sm:w-36 group"
            >
              <div
                style={movieCardStyle}
                className="aspect-[2/3] overflow-hidden shadow-md transition-all"
              >
                {movie.poster ? (
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span
                      style={{ color: "var(--bsky-text-muted)" }}
                      className="text-xs"
                    >
                      No Image
                    </span>
                  </div>
                )}
              </div>

              {/* IMDb Rating */}
              <div className="mt-2 flex items-center space-x-1">
                <StarRating rating={movie.imdbRating / 2} size="small" />
                <span
                  style={{ color: "var(--bsky-text-secondary)" }}
                  className="text-xs"
                >
                  {movie.imdbRating}
                </span>
              </div>

              {/* Streaming Platforms - Updated to use stacked logos */}
              {movie.streamingServices &&
                movie.streamingServices.length > 0 && (
                  <div className="mt-1 h-8">
                    <StackedPlatformLogos
                      platforms={movie.streamingServices}
                      maxVisible={2}
                    />
                  </div>
                )}
            </Link>
          ))}
        </div>
      </section>
    );
  };

  // src/pages/Home.jsx - Updated CarouselSection component
  const CarouselSection = ({ title, movies, viewAllLink }) => {
    if (!movies || movies.length === 0) {
      return null;
    }

    const platformBadgeStyle = {
      backgroundColor: "var(--bsky-bg-tertiary)",
      color: "var(--bsky-text-secondary)",
      fontSize: "0.6rem",
    };

    return (
      <section className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 style={sectionTitleStyle} className="text-lg">
            {title}
          </h2>
          <Link
            to={viewAllLink}
            style={viewAllStyle}
            className="flex items-center text-sm font-medium group"
          >
            View All
            <ChevronRightIcon className="w-4 h-4 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="flex-shrink-0 w-32 sm:w-36 group"
            >
              <div
                style={movieCardStyle}
                className="aspect-[2/3] overflow-hidden shadow-md transition-all"
              >
                {movie.poster ? (
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span
                      style={{ color: "var(--bsky-text-muted)" }}
                      className="text-xs"
                    >
                      No Image
                    </span>
                  </div>
                )}
              </div>

              {/* IMDb Rating */}
              <div className="mt-2 flex items-center space-x-1">
                <StarRating rating={movie.imdbRating / 2} size="small" />
                <span
                  style={{ color: "var(--bsky-text-secondary)" }}
                  className="text-xs"
                >
                  {movie.imdbRating}
                </span>
              </div>

              {/* Streaming Platforms */}
              {movie.streamingServices &&
                movie.streamingServices.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {movie.streamingServices.slice(0, 2).map((service) => (
                      <span
                        key={service}
                        style={platformBadgeStyle}
                        className="inline-flex items-center px-1 py-0.5 rounded-full font-medium"
                      >
                        {service}
                      </span>
                    ))}
                    {movie.streamingServices.length > 2 && (
                      <span
                        style={{
                          color: "var(--bsky-text-muted)",
                          fontSize: "0.6rem",
                        }}
                      >
                        +{movie.streamingServices.length - 2}
                      </span>
                    )}
                  </div>
                )}
            </Link>
          ))}
        </div>
      </section>
    );
  };

  const searchResultItemStyle = {
    backgroundColor: "var(--bsky-bg-secondary)",
    border: "1px solid var(--bsky-border)",
    borderRadius: "0.75rem",
  };

  const platformBadgeStyle = {
    backgroundColor: "var(--bsky-bg-tertiary)",
    color: "var(--bsky-text-secondary)",
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto">
        {searchQuery ? (
          <div ref={searchResultsRef}>
            <h2 style={sectionTitleStyle} className="text-xl mb-4">
              Search Results for "{searchQuery}"
            </h2>

            {searchResults.length > 0 ? (
              <div className="space-y-3">
                {searchResults.map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    className="block"
                  >
                    <MovieListItem movie={movie} />
                  </Link>
                ))}
              </div>
            ) : (
              <div style={noResultsStyle} className="text-center py-10 px-4">
                <p style={{ color: "var(--bsky-text-primary)" }}>
                  No results found for "{searchQuery}"
                </p>
                <p
                  style={{ color: "var(--bsky-text-muted)" }}
                  className="text-sm mt-1"
                >
                  Try checking your spelling or searching for a different movie.
                </p>
              </div>
            )}
            {/* {searchResults.length > 0 ? (
              <div className="space-y-3">
                {searchResults.map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    className="block group"
                  >
                    <div
                      style={searchResultItemStyle}
                      className="flex overflow-hidden hover:border-[var(--bsky-accent-blue)] transition"
                    >
                      <div className="w-20 sm:w-24 flex-shrink-0">
                        {movie.poster ? (
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            className="flex items-center justify-center h-full"
                            style={{
                              backgroundColor: "var(--bsky-bg-tertiary)",
                            }}
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
                      <div className="flex-1 p-3 flex flex-col justify-between">
                        <div>
                          <h3
                            style={{ color: "var(--bsky-text-primary)" }}
                            className="text-sm sm:text-base font-semibold group-hover:text-[var(--bsky-accent-blue)] transition-colors"
                          >
                            {movie.title}
                          </h3>
                          <div className="my-1 flex items-center">
                            <StarRating rating={movie.rating} />
                            <span
                              style={{ color: "var(--bsky-text-secondary)" }}
                              className="ml-2 text-xs"
                            >
                              ({movie.rating}/5)
                            </span>
                          </div>
                        </div>
                        {movie.streamingServices &&
                          movie.streamingServices.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {movie.streamingServices
                                .slice(0, 3)
                                .map((service) => (
                                  <span
                                    key={service}
                                    style={platformBadgeStyle}
                                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                                  >
                                    {service}
                                  </span>
                                ))}
                              {movie.streamingServices.length > 3 && (
                                <span
                                  style={{ color: "var(--bsky-text-muted)" }}
                                  className="text-xs ml-1"
                                >
                                  +{movie.streamingServices.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div style={noResultsStyle} className="text-center py-10 px-4">
                <p style={{ color: "var(--bsky-text-primary)" }}>
                  No results found for "{searchQuery}"
                </p>
                <p
                  style={{ color: "var(--bsky-text-muted)" }}
                  className="text-sm mt-1"
                >
                  Try checking your spelling or searching for a different movie.
                </p>
              </div>
            )} */}
          </div>
        ) : (
          <div>
            <CarouselSection
              title="Recommendations"
              movies={recommendations}
              viewAllLink="/recommendations"
            />
            <CarouselSection
              title="Watch Later"
              movies={watchLater}
              viewAllLink="/watch-later"
            />
            <CarouselSection
              title="Watch History"
              movies={watchHistory}
              viewAllLink="/watch-history"
            />

            {recommendations.length === 0 &&
              watchLater.length === 0 &&
              watchHistory.length === 0 && (
                <div
                  style={noResultsStyle}
                  className="text-center py-10 px-4 mt-6"
                >
                  <p style={{ color: "var(--bsky-text-primary)" }}>
                    Your movie lists are empty.
                  </p>
                  <p
                    style={{ color: "var(--bsky-text-muted)" }}
                    className="text-sm mt-1"
                  >
                    Start adding movies to your Watchlist or watch history!
                  </p>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
