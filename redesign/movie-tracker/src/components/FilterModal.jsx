// src/components/FilterModal.jsx
import { useState, useEffect } from "react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

// Hardcoded user preferred platforms
const userPreferredPlatforms = ["Netflix", "Disney+", "Apple TV"];

function FilterModal({ onClose, onApplyFilters }) {
  // Initial platforms state
  const allAvailablePlatforms = {
    Netflix: false,
    "Prime Video": false,
    Hulu: false,
    "Disney+": false,
    "HBO Max": false,
    "Apple TV": false,
    Peacock: false,
    "Paramount+": false,
  };

  const [genres, setGenres] = useState({
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
  const [onlyMyPlatforms, setOnlyMyPlatforms] = useState(false);

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

  const handlePlatformChange = (platform) => {
    if (!onlyMyPlatforms) {
      setPlatforms((prev) => ({ ...prev, [platform]: !prev[platform] }));
    }
  };

  const handleOnlyMyPlatformsChange = (isChecked) => {
    setOnlyMyPlatforms(isChecked);
    if (isChecked) {
      const newPlatformState = {};
      Object.keys(allAvailablePlatforms).forEach((p) => {
        newPlatformState[p] = userPreferredPlatforms.includes(p);
      });
      setPlatforms(newPlatformState);
    } else {
      setPlatforms(allAvailablePlatforms);
    }
  };

  const handleReset = () => {
    setGenres(
      Object.fromEntries(Object.keys(genres).map((key) => [key, false]))
    );
    setPlatforms(allAvailablePlatforms);
    setSortBy("");
    setOnlyMyPlatforms(false);
  };

  const handleApply = () => {
    onApplyFilters({
      genres: Object.entries(genres)
        .filter(([_, v]) => v)
        .map(([k]) => k),
      platforms: Object.entries(platforms)
        .filter(([_, v]) => v)
        .map(([k]) => k),
      sortBy,
    });
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const modalBackdropStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(4px)",
  };

  const modalStyle = {
    backgroundColor: "var(--bsky-bg-secondary)",
    border: "1px solid var(--bsky-border)",
    borderRadius: "0.75rem",
  };

  const modalHeaderStyle = {
    borderBottom: "1px solid var(--bsky-border)",
    color: "var(--bsky-text-primary)",
  };

  const modalFooterStyle = {
    borderTop: "1px solid var(--bsky-border)",
  };

  const legendStyle = {
    color: "var(--bsky-text-secondary)",
    fontWeight: "600",
  };

  const selectStyle = {
    backgroundColor: "var(--bsky-bg-tertiary)",
    color: "var(--bsky-text-primary)",
    border: "1px solid var(--bsky-border)",
  };

  const CustomCheckbox = ({
    id,
    label,
    checked,
    onChange,
    disabled = false,
  }) => {
    const getBoxStyles = () => {
      if (checked && !disabled) {
        return {
          backgroundColor: "var(--bsky-accent-blue)",
          borderColor: "var(--bsky-accent-blue)",
        };
      } else if (checked && disabled) {
        return {
          backgroundColor: "var(--bsky-accent-blue)",
          borderColor: "var(--bsky-accent-blue)",
          opacity: 0.5,
        };
      } else if (!checked && disabled) {
        return {
          backgroundColor: "var(--bsky-bg-tertiary)",
          borderColor: "var(--bsky-border)",
          opacity: 0.6,
        };
      } else {
        return {
          backgroundColor: "var(--bsky-bg-tertiary)",
          borderColor: "var(--bsky-border)",
        };
      }
    };

    const getLabelStyles = () => {
      if (checked && !disabled) {
        return { color: "var(--bsky-accent-blue)", fontWeight: 500 };
      } else if (checked && disabled) {
        return {
          color: "var(--bsky-accent-blue)",
          fontWeight: 500,
          opacity: 0.7,
        };
      } else if (!checked && disabled) {
        return { color: "var(--bsky-text-muted)" };
      } else {
        return { color: "var(--bsky-text-secondary)" };
      }
    };

    return (
      <label
        htmlFor={id}
        className={`flex items-center group ${
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        }`}
      >
        <div
          style={getBoxStyles()}
          className="w-5 h-5 mr-3 flex items-center justify-center rounded-md transition-colors duration-150 ease-in-out"
        >
          {checked && (
            <CheckIcon
              className="w-3.5 h-3.5"
              style={{ color: disabled ? "rgba(255, 255, 255, 0.7)" : "white" }}
            />
          )}
        </div>
        <span style={getLabelStyles()} className="text-sm select-none">
          {label}
        </span>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={disabled ? undefined : onChange}
          disabled={disabled}
          className="absolute opacity-0 w-0 h-0"
        />
      </label>
    );
  };

  return (
    <div
      style={modalBackdropStyle}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div
        style={modalStyle}
        className="w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl"
      >
        {/* Modal Header */}
        <div
          style={modalHeaderStyle}
          className="flex justify-between items-center p-4 sm:p-5"
        >
          <h3 className="text-lg font-semibold">Filter & Sort</h3>
          <button
            type="button"
            className="p-1.5 rounded-full hover:bg-[var(--bsky-bg-tertiary)] transition-colors"
            style={{ color: "var(--bsky-text-muted)" }}
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
            <legend style={legendStyle} className="text-sm mb-2 block">
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
            <legend style={legendStyle} className="text-sm mb-2 block">
              Available On
            </legend>
            {/* "Only My Platforms" Toggle */}
            <div
              className="mb-3 pb-3"
              style={{ borderBottom: "1px solid var(--bsky-border)" }}
            >
              <CustomCheckbox
                id="only-my-platforms"
                label="Only Show My Platforms"
                checked={onlyMyPlatforms}
                onChange={() => handleOnlyMyPlatformsChange(!onlyMyPlatforms)}
              />
            </div>
            {/* Platform Selection Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
              {Object.keys(platforms).map((platform) => (
                <CustomCheckbox
                  key={platform}
                  id={`platform-${platform}`}
                  label={platform}
                  checked={platforms[platform]}
                  onChange={() => handlePlatformChange(platform)}
                  disabled={onlyMyPlatforms}
                />
              ))}
            </div>
          </fieldset>

          {/* Sort options 1*/}
          <fieldset>
            <label
              htmlFor="sort-by"
              style={legendStyle}
              className="text-sm mb-1 block"
            >
              Release Date by
            </label>
            <select
              id="release-sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={selectStyle}
              className="block w-full rounded-lg py-2 pl-3 pr-10 text-sm shadow-sm transition"
            >
              <option value="">Default</option>
              {/* <option value="rating-high">Ratings: Highest First</option> */}
              {/* <option value="rating-low">Ratings: Lowest First</option> */}
              <option value="date-new">Newest First</option>
              <option value="date-old">Oldest First</option>
            </select>
          </fieldset>

          {/* Sort options 2*/}
          <fieldset>
            <label
              htmlFor="sort-by"
              style={legendStyle}
              className="text-sm mb-1 block"
            >
              Ratings by
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={selectStyle}
              className="block w-full rounded-lg py-2 pl-3 pr-10 text-sm shadow-sm transition"
            >
              <option value="">Default</option>
              <option value="rating-high">Highest First</option>
              <option value="rating-low">Lowest First</option>
              {/* <option value="date-new">Release Date: Newest First</option> */}
              {/* <option value="date-old">Release Date: Oldest First</option> */}
            </select>
          </fieldset>
        </div>

        {/* Modal Footer - Actions */}
        <div
          style={modalFooterStyle}
          className="flex justify-between items-center p-4 sm:p-5 rounded-b-xl flex-shrink-0"
        >
          <button
            type="button"
            className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-[var(--bsky-bg-tertiary)] transition-colors"
            style={{
              borderColor: "var(--bsky-border)",
              backgroundColor: "var(--bsky-bg-tertiary)",
              color: "var(--bsky-text-secondary)",
            }}
            onClick={handleReset}
          >
            Reset All
          </button>
          <button
            type="button"
            className="flex items-center justify-center px-5 py-2 border-0 text-sm font-semibold rounded-lg shadow-md transition-colors"
            style={{
              backgroundColor: "var(--bsky-accent-blue)",
              color: "white",
            }}
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
