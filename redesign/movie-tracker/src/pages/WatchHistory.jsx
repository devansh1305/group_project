// src/pages/WatchHistory.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FunnelIcon, StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import FilterModal from '../components/FilterModal';
import { mockMovies } from '../data/mockData';

// Helper function to interpolate between two colors
const interpolateColor = (color1, color2, factor) => {
  const hex = (color) => {
    const colorStr = color.slice(1);
    return {
      r: parseInt(colorStr.substring(0, 2), 16),
      g: parseInt(colorStr.substring(2, 4), 16),
      b: parseInt(colorStr.substring(4, 6), 16),
    };
  };

  const c1 = hex(color1);
  const c2 = hex(color2);

  const r = Math.round(c1.r + factor * (c2.r - c1.r));
  const g = Math.round(c1.g + factor * (c2.g - c1.g));
  const b = Math.round(c1.b + factor * (c2.b - c1.b));

  return `rgb(${r}, ${g}, ${b})`;
};

function WatchHistory() {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    genres: [],
    platforms: [],
    sortBy: 'date-new',
    onlyMyPlatforms: false,
  });

  // Helper function to calculate review text color based on rating
  const getReviewColor = (rating) => {
    const mutedRed = '#FF6347'; // Tomato
    const mutedYellow = '#FFD700'; // Gold
    const mutedGreen = '#32CD32'; // Lime Green

    if (rating <= 2.5) {
      const factor = rating / 2.5;
      return interpolateColor(mutedRed, mutedYellow, factor);
    } else {
      const factor = (rating - 2.5) / 2.5;
      return interpolateColor(mutedYellow, mutedGreen, factor);
    }
  };

  // Filter and sort movies
  let filteredMovies = mockMovies.filter(movie => movie.categories.includes('watched'));

  if (activeFilters.genres.length > 0) {
    filteredMovies = filteredMovies.filter(movie =>
      movie.genres.some(genre => activeFilters.genres.includes(genre))
    );
  }

  if (activeFilters.platforms.length > 0) {
    filteredMovies = filteredMovies.filter(movie =>
      movie.streamingServices.some(service => activeFilters.platforms.includes(service))
    );
  }

  if (activeFilters.sortBy) {
    filteredMovies = [...filteredMovies].sort((a, b) => {
      switch (activeFilters.sortBy) {
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        case 'date-new':
          return new Date(b.dateWatched || 0) - new Date(a.dateWatched || 0);
        case 'date-old':
          return new Date(a.dateWatched || 0) - new Date(b.dateWatched || 0);
        default:
          return 0;
      }
    });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-nowrap text-gray-900">Watch History</h2>
        <div className="flex space-x-4">
          <select
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={activeFilters.sortBy}
            onChange={(e) => setActiveFilters(prev => ({ ...prev, sortBy: e.target.value }))}
          >
            <option value="date-new">Recently Watched</option>
            <option value="date-old">Oldest First</option>
            <option value="rating-high">Highest Rated</option>
            <option value="rating-low">Lowest Rated</option>
          </select>
          <button
            type="button"
            onClick={() => setShowFilterModal(true)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FunnelIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            Filters
          </button>
        </div>
      </div>

      {(activeFilters.genres.length > 0 || activeFilters.platforms.length > 0 || activeFilters.onlyMyPlatforms) && (
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-500">Active Filters:</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {activeFilters.genres.map(genre => (
              <span key={genre} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {genre}
              </span>
            ))}
            {activeFilters.platforms.map(platform => (
              <span key={platform} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {platform}
              </span>
            ))}
            {activeFilters.onlyMyPlatforms && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Only My Platforms
              </span>
            )}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filteredMovies.map(movie => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            state={{ from: 'watch-history' }}
            className="block"
          >
            <div className="flex items-start p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-24 h-auto rounded-md"
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{movie.title}</h3>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, index) =>
                    index < Math.floor(movie.rating) ? (
                      <StarSolid key={index} className="h-5 w-5 text-yellow-400" />
                    ) : (
                      <StarOutline key={index} className="h-5 w-5 text-gray-300" />
                    )
                  )}
                  <span className="ml-2 text-sm text-gray-600">
                    {movie.rating.toFixed(1)} / 5
                  </span>
                </div>
                {movie.review && (
                  <p
                    className="mt-2 text-sm line-clamp-3"
                    style={{ color: getReviewColor(movie.rating) }}
                  >
                    {movie.review}
                  </p>
                )}
                {movie.dateWatched && (
                  <p className="mt-2 text-sm text-gray-500">
                    Watched on: {movie.dateWatched}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No watched movies match your filters.</p>
        </div>
      )}

      {showFilterModal && (
        <FilterModal
          onClose={() => setShowFilterModal(false)}
          onApplyFilters={setActiveFilters}
        />
      )}
    </div>
  );
}

export default WatchHistory;