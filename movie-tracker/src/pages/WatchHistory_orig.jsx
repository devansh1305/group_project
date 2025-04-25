// src/pages/WatchHistory.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FunnelIcon } from '@heroicons/react/24/outline';
import MovieCard from '../components/MovieCard';
import FilterModal from '../components/FilterModal';
import { mockMovies } from '../data/mockData';

function WatchHistory() {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    genres: [],
    platforms: [],
    sortBy: 'date-new', // Default sort by date watched
    onlyMyPlatforms: false,
  });
  
  // Filter and sort movies
  let filteredMovies = mockMovies.filter(movie => movie.categories.includes('watched'));
  
  // Apply genre filter
  if (activeFilters.genres.length > 0) {
    filteredMovies = filteredMovies.filter(movie => 
      movie.genres.some(genre => activeFilters.genres.includes(genre))
    );
  }
  
  // Apply platform filter
  if (activeFilters.platforms.length > 0) {
    filteredMovies = filteredMovies.filter(movie => 
      movie.streamingServices.some(service => activeFilters.platforms.includes(service))
    );
  }
  
  // Apply sorting
  if (activeFilters.sortBy) {
    filteredMovies = [...filteredMovies].sort((a, b) => {
      switch (activeFilters.sortBy) {
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        case 'date-new':
          // Sort by date watched
          return new Date(b.dateWatched || 0) - new Date(a.dateWatched || 0);
        case 'date-old':
          // Sort by date watched
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
      
      {/* Active filters */}
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
      
      {/* Movie grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredMovies.map(movie => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            state={{ from: 'watch-history' }}
          >
            <div className="relative">
              <MovieCard movie={movie} />
              {movie.dateWatched && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 text-center">
                  Watched: {movie.dateWatched}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
      
      {filteredMovies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No watched movies match your filters.</p>
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

export default WatchHistory;