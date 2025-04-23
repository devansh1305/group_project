// src/pages/Recommendations.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FunnelIcon } from '@heroicons/react/24/outline';
import MovieCard from '../components/MovieCard';
import StarRating from '../components/StarRating';
import FilterModal from '../components/FilterModal';
import { mockMovies } from '../data/mockData';

function Recommendations() {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    genres: [],
    platforms: [],
    sortBy: 'rating-high', // Default sort by highest rating
    onlyMyPlatforms: false,
  });
  
  // Filter and sort movies
  let filteredMovies = mockMovies.filter(movie => movie.categories.includes('recommended'));
  
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
          return new Date(b.releaseDate) - new Date(a.releaseDate);
        case 'date-old':
          return new Date(a.releaseDate) - new Date(b.releaseDate);
        default:
          return 0;
      }
    });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-l font-bold text-gray-900">Recommendations</h2>
        <div className="flex items-center space-x-2">
          <select
            className="block w-24 pl-2 pr-6 py-1 text-xs border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
            value={activeFilters.sortBy}
            onChange={(e) => setActiveFilters(prev => ({ ...prev, sortBy: e.target.value }))}
          >
            <option value="rating-high">Top Rated</option>
            <option value="rating-low">Low Rated</option>
            <option value="date-new">Newest</option>
            <option value="date-old">Oldest</option>
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
      
      {/* Active filters - only show genre and platform filters */}
      {(activeFilters.genres.length > 0 || activeFilters.platforms.length > 0 || activeFilters.onlyMyPlatforms) && (
        <div className="mb-3 px-1">
          <h2 className="text-xs font-medium text-gray-500">Filters:</h2>
          <div className="mt-1 flex flex-wrap gap-1">
            {activeFilters.genres.map(genre => (
              <span key={genre} className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-100 text-indigo-800">
                {genre}
              </span>
            ))}
            {activeFilters.platforms.map(platform => (
              <span key={platform} className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-800">
                {platform}
              </span>
            ))}
            {activeFilters.onlyMyPlatforms && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-yellow-100 text-yellow-800">
                My Platforms
              </span>
            )}
          </div>
        </div>
      )}
      
      {/* Movie grid - exactly matching Watch Later layout */}
      <div className="grid grid-cols-2 gap-4 px-1">
        {filteredMovies.map(movie => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            state={{ from: 'recommendations' }}
            className="block"
          >
            <div className="aspect-[2/3] overflow-hidden rounded-lg relative">
              {movie.poster ? (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
            <div className="mt-1">
              <h3 className="text-xs font-medium text-gray-900 truncate">{movie.title}</h3>
              <div className="flex items-center mt-1">
                <StarRating rating={movie.rating} size="small" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredMovies.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">No movies match your filters. Try adjusting your criteria.</p>
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