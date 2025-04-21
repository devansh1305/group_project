// src/screens/HomeScreen.js
import React from "react";
import HorizontalMovieList from "../components/HorizontalMovieList";
import { getMoviesForList } from "../data"; // Import function to get lists

const HomeScreen = () => {
  // Fetch movies for each list using the helper from data.js
  const recommendedMovies = getMoviesForList("Recommendations");
  const watchLaterMovies = getMoviesForList("Watch Later");
  const watchHistoryMovies = getMoviesForList("Watch History");

  return (
    <div>
      <HorizontalMovieList title="Recommendations" movies={recommendedMovies} />
      <HorizontalMovieList title="Watch Later" movies={watchLaterMovies} />
      <HorizontalMovieList title="Watch History" movies={watchHistoryMovies} />
    </div>
  );
};

export default HomeScreen;
