// src/pages/Profile.jsx
import { PencilIcon, ShareIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid"; // Use solid for filled stars
import { Link } from "react-router-dom";
import StreamingPlatformLogo from "../components/StreamingPlatformLogo";
import StarRating from "../components/StarRating"; // Assuming you have this component
import { mockMovies } from "../data/mockData"; // Adjust path as needed

function Profile() {
  // Mock user data (can be fetched or managed via state later)
  const user = {
    name: "Jane Smith",
    // Calculate review count dynamically from movies with reviews
    // reviewCount: mockMovies.filter(movie => movie.review).length, // Uncomment if you want dynamic count
    preferredPlatforms: [
      "Netflix",
      "Disney+",
      "Prime Video",
      "Hulu",
      "HBO Max",
      "Apple TV",
    ], // Added Apple TV for demo
    favoriteGenres: ["Sci-Fi", "Drama", "Comedy", "History", "Fantasy"], // Added more for demo
  };

  // Filter movies that have a review written by the user
  const reviewedMovies = mockMovies.filter(
    (movie) => movie.review && movie.review.trim() !== ""
  );
  const reviewCount = reviewedMovies.length; // Dynamic review count

  return (
    // Apply consistent background and padding
    <div className="pb-12 bg-gradient-to-br from-gray-100 to-blue-50 min-h-screen font-sans">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Profile Header Card */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mt-6 mb-6 ring-1 ring-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            {/* User Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-0.5">
                {user.name}
              </h1>
              <p className="text-sm text-gray-500">{reviewCount} Reviews</p>
            </div>

            {/* Action Buttons - Using new style */}
            <div className="mt-4 sm:mt-0 flex flex-wrap gap-2 justify-start sm:justify-end">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-transparent text-xs sm:text-sm font-semibold rounded-full shadow-md text-white bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:-translate-y-0.5 transition duration-200 ease-in-out"
              >
                <PencilIcon
                  className="-ml-0.5 mr-1.5 h-4 w-4"
                  aria-hidden="true"
                />
                Edit Profile
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-transparent text-xs sm:text-sm font-semibold rounded-full shadow-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:-translate-y-0.5 transition duration-200 ease-in-out"
              >
                <ShareIcon
                  className="-ml-0.5 mr-1.5 h-4 w-4"
                  aria-hidden="true"
                />
                Share Profile
              </button>
            </div>
          </div>
        </div>

        {/* Preferences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Preferred Streaming Platforms Card */}
          <div className="bg-white shadow-lg rounded-xl p-4 ring-1 ring-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Preferred Platforms
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {user.preferredPlatforms.map((platform) => (
                <div
                  key={platform}
                  className="flex justify-center items-center aspect-video sm:aspect-square p-1 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <StreamingPlatformLogo
                    platform={platform}
                    className="w-full h-full object-contain" // Icons now fill the container
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Genres Card */}
          <div className="bg-white shadow-lg rounded-xl p-4 ring-1 ring-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Favorite Genres
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {user.favoriteGenres.map((genre) => (
                <span
                  key={genre}
                  // Same style as MovieDetail genres
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Section - User Reviews */}
        <div className="bg-white shadow-lg rounded-xl p-4 ring-1 ring-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
            Recent Reviews ({reviewCount})
          </h2>
          {reviewedMovies.length > 0 ? (
            // Reduced space-y-4
            <div className="space-y-4">
              {reviewedMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  {/* Small Poster Thumbnail */}
                  <Link to={`/movie/${movie.id}`} className="flex-shrink-0">
                    <img
                      src={movie.poster}
                      alt={`${movie.title} Poster`}
                      className="w-16 h-24 object-cover rounded-md shadow-sm hover:opacity-80 transition-opacity"
                    />
                  </Link>

                  {/* Review Details */}
                  <div className="flex-grow">
                    <Link to={`/movie/${movie.id}`} className="hover:underline">
                      <h3 className="text-base font-semibold text-gray-800">
                        {movie.title}
                      </h3>
                    </Link>
                    {/* Display User Rating */}
                    <div className="flex items-center my-1">
                      <StarRating rating={movie.rating} />{" "}
                      {/* Use StarRating component */}
                      <span className="ml-1.5 text-xs text-gray-700 font-semibold">
                        ({movie.rating}/5)
                      </span>
                    </div>
                    {/* Display User Review - limit lines shown */}
                    <blockquote className="mt-1 border-l-4 border-amber-300 pl-3 italic text-gray-700 text-xs bg-amber-50 py-1.5 rounded-r-md line-clamp-3">
                      {" "}
                      {/* line-clamp limits visible lines */}"{movie.review}"
                    </blockquote>
                    {/* Optional: Link to read full review on movie page */}
                    <Link
                      to={`/movie/${movie.id}`}
                      className="text-xs text-indigo-600 hover:text-indigo-800 mt-1 inline-block"
                    >
                      Read full review...
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic mt-2">
              No reviews written yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
