// src/components/FilterModal.js
import React, { useState } from "react";

// Props: show, onClose
const FilterModal = ({ show, onClose }) => {
  // --- Mock state for filters ---
  // In a real app, this state might live higher up or be managed globally
  const [genres, setGenres] = useState({
    Action: false,
    Comedy: false,
    Drama: false,
    SciFi: false,
    Horror: false,
  });
  const [platforms, setPlatforms] = useState({
    Netflix: true,
    PrimeVideo: true,
    Hulu: false,
    DisneyPlus: true,
  });
  const [sortByRating, setSortByRating] = useState("Highest First");
  const [sortByRelease, setSortByRelease] = useState("Newest First");
  const [onlyMyPlatforms, setOnlyMyPlatforms] = useState(true);
  // -----------------------------

  const handleGenreChange = (e) => {
    setGenres({ ...genres, [e.target.name]: e.target.checked });
  };

  const handlePlatformChange = (e) => {
    setPlatforms({ ...platforms, [e.target.name]: e.target.checked });
  };

  const handleApply = () => {
    console.log("Applying Filters (Demo):", {
      genres,
      platforms,
      sortByRating,
      sortByRelease,
      onlyMyPlatforms,
    });
    onClose(); // Close modal after "applying"
  };

  const handleReset = () => {
    // Reset to default state shown in Page 5
    setGenres({
      Action: false,
      Comedy: false,
      Drama: false,
      SciFi: false,
      Horror: false,
    });
    setPlatforms({
      Netflix: true,
      PrimeVideo: true,
      Hulu: false,
      DisneyPlus: true,
    });
    setSortByRating("Highest First");
    setSortByRelease("Newest First");
    setOnlyMyPlatforms(true);
    console.log("Resetting Filters (Demo)");
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {" "}
        {/* Prevent closing when clicking inside */}
        <button className="modal-close-button" onClick={onClose}>
          ×
        </button>
        <h2>Filters</h2>
        <div className="filter-section">
          <h3>Genre</h3>
          <div className="filter-options">
            {Object.keys(genres).map((genre) => (
              <label key={genre}>
                <input
                  type="checkbox"
                  name={genre}
                  checked={genres[genre]}
                  onChange={handleGenreChange}
                />{" "}
                {genre}
              </label>
            ))}
          </div>
        </div>
        <div className="filter-section">
          <h3>Available On</h3>
          <div className="filter-options">
            {Object.keys(platforms).map((platform) => (
              <label key={platform}>
                <input
                  type="checkbox"
                  name={platform}
                  checked={platforms[platform]}
                  onChange={handlePlatformChange}
                />{" "}
                {platform.replace(/([A-Z])/g, " $1").trim()}{" "}
                {/* Add space before caps */}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                checked={onlyMyPlatforms}
                onChange={(e) => setOnlyMyPlatforms(e.target.checked)}
              />{" "}
              Only Show Available on My Platforms
            </label>
          </div>
        </div>
        <div className="filter-section">
          <h3>Sort By Ratings</h3>
          <div className="filter-options">
            <label>
              <input
                type="radio"
                value="Highest First"
                checked={sortByRating === "Highest First"}
                onChange={(e) => setSortByRating(e.target.value)}
              />{" "}
              Highest First
            </label>
            <label>
              <input
                type="radio"
                value="Lowest First"
                checked={sortByRating === "Lowest First"}
                onChange={(e) => setSortByRating(e.target.value)}
              />{" "}
              Lowest First
            </label>
          </div>
        </div>
        <div className="filter-section">
          <h3>Sort By Release Date</h3>
          <div className="filter-options">
            <label>
              <input
                type="radio"
                value="Newest First"
                checked={sortByRelease === "Newest First"}
                onChange={(e) => setSortByRelease(e.target.value)}
              />{" "}
              Newest First
            </label>
            <label>
              <input
                type="radio"
                value="Oldest First"
                checked={sortByRelease === "Oldest First"}
                onChange={(e) => setSortByRelease(e.target.value)}
              />{" "}
              Oldest First
            </label>
          </div>
        </div>
        <div className="modal-actions">
          <button onClick={handleReset} className="secondary">
            Reset All
          </button>
          <button onClick={handleApply}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
