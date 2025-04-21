// src/components/FilterModal.jsx
import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

function FilterModal({ onClose, onApplyFilters }) {
  const [genres, setGenres] = useState({
    Action: false,
    Comedy: false,
    Drama: false,
    'Sci-Fi': false,
    Horror: false,
  });
  
  const [platforms, setPlatforms] = useState({
    Netflix: false,
    'Prime Video': false,
    Hulu: false,
    'Disney+': false,
  });
  
  const [sortBy, setSortBy] = useState('');
  const [onlyMyPlatforms, setOnlyMyPlatforms] = useState(false);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleGenreChange = (genre) => {
    setGenres(prev => ({
      ...prev,
      [genre]: !prev[genre]
    }));
  };

  const handlePlatformChange = (platform) => {
    setPlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  const handleReset = () => {
    setGenres({
      Action: false,
      Comedy: false,
      Drama: false,
      'Sci-Fi': false,
      Horror: false,
    });
    setPlatforms({
      Netflix: false,
      'Prime Video': false,
      Hulu: false,
      'Disney+': false,
    });
    setSortBy('');
    setOnlyMyPlatforms(false);
  };

  const handleApply = () => {
    onApplyFilters({
      genres: Object.entries(genres)
        .filter(([_, isSelected]) => isSelected)
        .map(([genre]) => genre),
      platforms: Object.entries(platforms)
        .filter(([_, isSelected]) => isSelected)
        .map(([platform]) => platform),
      sortBy,
      onlyMyPlatforms,
    });
    onClose();
  };

  const handleBackdropClick = (e) => {
    // Close modal when clicking the backdrop, not the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium text-gray-900">Filters</h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          {/* Genre filters */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Genre</h4>
            <div className="space-y-2">
              {Object.keys(genres).map(genre => (
                <div key={genre} className="flex items-center">
                  <input
                    id={`genre-${genre}`}
                    name={`genre-${genre}`}
                    type="checkbox"
                    checked={genres[genre]}
                    onChange={() => handleGenreChange(genre)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`genre-${genre}`} className="ml-3 text-sm font-medium text-gray-700">
                    {genre}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Platform filters */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Available On</h4>
            <div className="space-y-2">
              {Object.keys(platforms).map(platform => (
                <div key={platform} className="flex items-center">
                  <input
                    id={`platform-${platform}`}
                    name={`platform-${platform}`}
                    type="checkbox"
                    checked={platforms[platform]}
                    onChange={() => handlePlatformChange(platform)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`platform-${platform}`} className="ml-3 text-sm font-medium text-gray-700">
                    {platform}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Sort options */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Sort</h4>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select...</option>
              <option value="rating-high">Sort by Ratings: Highest First</option>
              <option value="rating-low">Sort by Ratings: Lowest First</option>
              <option value="date-new">Sort by Release Date: Newest First</option>
              <option value="date-old">Sort by Release Date: Oldest First</option>
            </select>
          </div>
          
          {/* Only show available on my platforms toggle */}
          <div className="mt-6">
            <div className="flex items-center">
              <input
                id="only-my-platforms"
                name="only-my-platforms"
                type="checkbox"
                checked={onlyMyPlatforms}
                onChange={() => setOnlyMyPlatforms(!onlyMyPlatforms)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="only-my-platforms" className="ml-3 text-sm font-medium text-gray-700">
                Only Show Available on My Platforms
              </label>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleReset}
            >
              Reset All
            </button>
            <button
              type="button"
              className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleApply}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;