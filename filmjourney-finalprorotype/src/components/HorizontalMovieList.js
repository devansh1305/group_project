// src/components/HorizontalMovieList.js
import React from "react";
import MovieCard from "./MovieCard";

// Props: title, movies array
const HorizontalMovieList = ({ title, movies }) => {
  return (
    <div className="horizontal-movie-list">
      <h3>{title}</h3>
      <div className="scroll-container">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} layout="horizontal" />
        ))}
        {/* Add a placeholder if list is empty */}
        {movies.length === 0 && <p>No movies in this list yet.</p>}
      </div>
    </div>
  );
};

export default HorizontalMovieList;
