// src/screens/ListScreen.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import FilterModal from "../components/FilterModal";
import { getMoviesForList } from "../data";

const ListScreen = () => {
  const { listName } = useParams(); // Get list name from URL ('Recommendations', 'Watch Later', 'Watch History')
  const [movies, setMovies] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sortOption, setSortOption] = useState("Newest First"); // Mock sort state

  // Capitalize first letter for display if needed, handle URL variations
  const formattedListName = listName
    .replace(/([A-Z])/g, " $1") // Add space before capitals (for 'WatchLater' -> 'Watch Later')
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter

  useEffect(() => {
    // Fetch movies for the specified list
    setMovies(getMoviesForList(formattedListName));
  }, [formattedListName]); // Re-fetch if listName changes

  const handleSortChange = (e) => {
    console.log("Sort changed (Demo):", e.target.value);
    setSortOption(e.target.value);
    // Add mock sorting logic here if needed for demo
  };

  return (
    <div>
      <div className="list-header">
        <h1>{formattedListName}</h1>
        <div>
          {/* Show sorting only for Watch Later / History as per design? */}
          {(formattedListName === "Watch Later" ||
            formattedListName === "Watch History") && (
            <select value={sortOption} onChange={handleSortChange}>
              <option>Newest First</option>
              <option>Oldest First</option>
              {/* Add other sort options if needed */}
            </select>
          )}
          <button onClick={() => setShowFilterModal(true)}>Filters</button>
        </div>
      </div>
      <div className="movie-list-vertical">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} layout="vertical" />
          ))
        ) : (
          <p>No movies found in this list.</p>
        )}
      </div>

      <FilterModal
        show={showFilterModal}
        onClose={() => setShowFilterModal(false)}
      />
    </div>
  );
};

export default ListScreen;
