// src/screens/SearchScreen.js
import React from "react";
import MovieCard from "../components/MovieCard";

// Props: results array
const SearchScreen = ({ results }) => {
  return (
    <div>
      <h2>Search Results</h2>
      <div className="movie-list-vertical">
        {results.length > 0 ? (
          results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} layout="vertical" />
          ))
        ) : (
          <p>No movies found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;
