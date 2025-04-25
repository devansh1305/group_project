// src/components/FilterModal.jsx
import { useState, useEffect } from "react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

// Hardcoded user preferred platforms for the "Only Show My Platforms" feature
const userPreferredPlatforms = ["Netflix", "Disney+", "Apple TV"];

function FilterModal({ onClose, onApplyFilters }) {
  // Initial state for all available platforms (adjust as needed)
  const allAvailablePlatforms = {
    Netflix: false,
    "Prime Video": false,
    Hulu: false,
    "Disney+": false,
    "HBO Max": false,
    "Apple TV": false,
    Peacock: false,
    "Paramount+": false, // Corrected Paramount name
  };

  const [genres, setGenres] = useState({
    // Keep genres state as before
    Action: false,
    Comedy: false,
    Drama: false,
    "Sci-Fi": false,
    Horror: false,
    Thriller: false,
    Romance: false,
    Animation: false,
    Documentary: false,
  });
  const [platforms, setPlatforms] = useState(allAvailablePlatforms);
  const [sortBy, setSortBy] = useState("");
  const [onlyMyPlatforms, setOnlyMyPlatforms] = useState(false); // Controls the mode

  // Prevent body scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleGenreChange = (genre) => {
    setGenres((prev) => ({ ...prev, [genre]: !prev[genre] }));
  };

  // Only allow manual platform changes if 'onlyMyPlatforms' is false
  const handlePlatformChange = (platform) => {
    if (!onlyMyPlatforms) {
      setPlatforms((prev) => ({ ...prev, [platform]: !prev[platform] }));
    }
    // If onlyMyPlatforms is true, do nothing on manual clicks
  };

  // Handle the toggle for "Only Show My Platforms"
  const handleOnlyMyPlatformsChange = (isChecked) => {
    setOnlyMyPlatforms(isChecked);
    if (isChecked) {
      // Select only the user's preferred platforms
      const newPlatformState = {};
      Object.keys(allAvailablePlatforms).forEach((p) => {
        newPlatformState[p] = userPreferredPlatforms.includes(p);
      });
      setPlatforms(newPlatformState);
    } else {
      // When unchecked, reset manual selections (or revert to previous state if needed)
      setPlatforms(allAvailablePlatforms); // Resetting all to false for clarity
    }
  };

  const handleReset = () => {
    setGenres(
      Object.fromEntries(Object.keys(genres).map((key) => [key, false]))
    );
    setPlatforms(allAvailablePlatforms); // Reset platforms to initial state
    setSortBy("");
    setOnlyMyPlatforms(false); // Reset the toggle
  };

  const handleApply = () => {
    onApplyFilters({
      genres: Object.entries(genres)
        .filter(([_, v]) => v)
        .map(([k]) => k),
      // Platforms state already reflects the correct selection based on mode
      platforms: Object.entries(platforms)
        .filter(([_, v]) => v)
        .map(([k]) => k),
      sortBy,
      // Include the toggle state if the parent component needs it
      // onlyMyPlatforms,
    });
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Updated CustomCheckbox to handle disabled state
  const CustomCheckbox = ({
    id,
    label,
    checked,
    onChange,
    disabled = false,
  }) => (
    <label
      htmlFor={id}
      className={`flex items-center group ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      }`}
    >
      <div
        className={`w-5 h-5 mr-3 flex items-center justify-center rounded border-2 transition-colors duration-150 ease-in-out ${
          checked && !disabled
            ? "bg-indigo-600 border-indigo-600 group-hover:bg-indigo-700 group-hover:border-indigo-700"
            : checked && disabled
            ? "bg-indigo-300 border-indigo-300" // Style for checked but disabled
            : !checked && disabled
            ? "bg-gray-100 border-gray-300" // Style for unchecked and disabled
            : "bg-white border-gray-300 group-hover:border-indigo-400" // Default unchecked
        }`}
      >
        {/* Show checkmark only if checked and not disabled (or style differently if needed) */}
        {checked && (
          <CheckIcon
            className={`w-3.5 h-3.5 ${disabled ? "text-white" : "text-white"}`}
          />
        )}
      </div>
      <span
        className={`text-sm select-none ${
          checked && !disabled
            ? "text-indigo-700 font-medium"
            : checked && disabled
            ? "text-indigo-500 font-medium"
            : !checked && disabled
            ? "text-gray-500"
            : "text-gray-700 group-hover:text-indigo-600"
        }`}
      >
        {label}
      </span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={disabled ? undefined : onChange} // Prevent onChange if disabled
        disabled={disabled}
        className="absolute opacity-0 w-0 h-0"
      />
    </label>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col ring-1 ring-black/5">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-800">Filter & Sort</h3>
          <button
            type="button"
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition-colors"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-grow">
          {/* Genre filters */}
          <fieldset>
            <legend className="text-sm font-semibold text-gray-600 mb-2 block">
              Genre
            </legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
              {Object.keys(genres).map((genre) => (
                <CustomCheckbox
                  key={genre}
                  id={`genre-${genre}`}
                  label={genre}
                  checked={genres[genre]}
                  onChange={() => handleGenreChange(genre)}
                />
              ))}
            </div>
          </fieldset>

          {/* Platform filters */}
          <fieldset>
            <legend className="text-sm font-semibold text-gray-600 mb-2 block">
              Available On
            </legend>
            {/* "Only My Platforms" Toggle at the top */}
            <div className="mb-3 pb-3 border-b border-gray-200">
              <CustomCheckbox
                id="only-my-platforms"
                label="Only Show My Platforms"
                checked={onlyMyPlatforms}
                // Use the new handler
                onChange={() => handleOnlyMyPlatformsChange(!onlyMyPlatforms)}
              />
            </div>
            {/* Manual Platform Selection Grid - Disabled based on toggle */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
              {Object.keys(platforms).map((platform) => (
                <CustomCheckbox
                  key={platform}
                  id={`platform-${platform}`}
                  label={platform}
                  checked={platforms[platform]}
                  onChange={() => handlePlatformChange(platform)}
                  // Disable manual selection if 'onlyMyPlatforms' is true
                  disabled={onlyMyPlatforms}
                />
              ))}
            </div>
          </fieldset>

          {/* Sort options */}
          <fieldset>
            <label
              htmlFor="sort-by"
              className="text-sm font-semibold text-gray-600 mb-1 block"
            >
              Sort By
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full rounded-lg border-gray-300 py-2 pl-3 pr-10 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
            >
              <option value="">Default</option>
              <option value="rating-high">Ratings: Highest First</option>
              <option value="rating-low">Ratings: Lowest First</option>
              <option value="date-new">Release Date: Newest First</option>
              <option value="date-old">Release Date: Oldest First</option>
            </select>
          </fieldset>
        </div>

        {/* Modal Footer - Actions */}
        <div className="flex justify-between items-center p-4 sm:p-5 border-t border-gray-200 bg-gray-50/50 rounded-b-xl flex-shrink-0">
          <button
            type="button"
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition-colors"
            onClick={handleReset}
          >
            Reset All
          </button>
          <button
            type="button"
            className="flex items-center justify-center px-5 py-2 border border-transparent text-sm font-semibold rounded-lg shadow-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:-translate-y-0.5 transition duration-200 ease-in-out"
            onClick={handleApply}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
