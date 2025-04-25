// src/pages/Home.jsx
import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { mockMovies } from "../data/mockData";
import StarRating from "../components/StarRating";
import StreamingPlatformLogo from "../components/StreamingPlatformLogo";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

function Home() {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const searchQuery = location.state?.searchQuery || "";
  const searchResultsRef = useRef(null);

  // useEffect for search remains the same
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

  // Data fetching remains the same (using full lists)
  const recommendations = mockMovies.filter((movie) =>
    movie.categories?.includes("recommended")
  );
  const watchLater = mockMovies.filter((movie) =>
    movie.categories?.includes("watchLater")
  );
  const watchHistory = mockMovies.filter((movie) =>
    movie.categories?.includes("watched")
  );

  // Carousel Section Component (Adjusted for mobile)
  const CarouselSection = ({ title, movies, viewAllLink }) => {
    if (!movies || movies.length === 0) {
      return null;
    }

    return (
      <section className="mb-3">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-2 px-1">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            {title}
          </h2>
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors group"
            >
              View All
              <ChevronRightIcon className="w-5 h-5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>

        {/* Scrollable Container */}
        <div className="flex space-x-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thumb-rounded-full">
          <div className="flex-shrink-0 w-1"></div>
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="flex-shrink-0 w-28 sm:w-32 md:w-36 group"
            >
              <div className="aspect-[2/3] bg-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-xl transform group-hover:scale-105 transition-all duration-200 ease-in-out">
                {movie.poster ? (
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-500 text-xs p-1 text-center">
                      No Poster
                    </span>
                  </div>
                )}
              </div>
              <p className="mt-1.5 text-xs sm:text-sm font-medium text-gray-700 truncate group-hover:text-indigo-600 transition-colors">
                {movie.title}
              </p>
            </Link>
          ))}
          <div className="flex-shrink-0 w-1"></div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 font-sans ">
      {/* Added overflow-x-hidden here */}
      <div className="container w-[352px]">
        {searchQuery ? (
          // Search Results View
          <div ref={searchResultsRef}>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Search Results for "{searchQuery}"
            </h2>
            {searchResults.length > 0 ? (
              <div className="flex flex-col space-y-3">
                {searchResults.map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    className="block group"
                  >
                    <div className="flex bg-white shadow-lg rounded-xl overflow-hidden ring-1 ring-black/5 hover:shadow-xl hover:ring-indigo-100 transition-all duration-200 ease-in-out">
                      <div className="w-20 sm:w-24 flex-shrink-0 bg-gray-200">
                        {movie.poster ? (
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-full h-full object-cover object-center"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <span className="text-gray-500 text-xs p-1 text-center">
                              No Poster
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-3 flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                            {movie.title}
                          </h3>
                          <div className="my-1 flex items-center">
                            <StarRating rating={movie.rating} />
                            <span className="ml-1.5 text-xs text-gray-700 font-semibold">
                              ({movie.rating}/5)
                            </span>
                          </div>
                        </div>
                        {movie.streamingServices &&
                          movie.streamingServices.length > 0 && (
                            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                              {" "}
                              {/* This uses flex-wrap already */}
                              {movie.streamingServices
                                .slice(0, 3)
                                .map((service) => (
                                  <StreamingPlatformLogo
                                    key={service}
                                    platform={service}
                                    className="h-5 w-auto"
                                  />
                                ))}
                              {movie.streamingServices.length > 3 && (
                                <span className="text-xs text-gray-400 ml-1">
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
              <div className="text-center py-10 px-4 bg-white rounded-xl shadow-md ring-1 ring-black/5">
                <p className="text-gray-600 font-medium">
                  No results found for "{searchQuery}"
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Try checking your spelling or searching for a different movie.
                </p>
              </div>
            )}
          </div>
        ) : (
          // Default View - Using updated CarouselSection
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

            {/* Placeholder remains the same */}
            {recommendations.length === 0 &&
              watchLater.length === 0 &&
              watchHistory.length === 0 && (
                <div className="text-center py-10 px-4 bg-white rounded-xl shadow-md ring-1 ring-black/5 mt-6">
                  <p className="text-gray-600 font-medium">
                    Your movie lists are empty.
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
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
