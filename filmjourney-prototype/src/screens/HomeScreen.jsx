import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import {
  currentUser,
  watchedEntries,
  following,
  getMovieById,
  getUserById,
} from "../data/fakeData";
import "./ScreenStyles.css"; // Common styles for screens

const HomeScreen = () => {
  const [timelineEntries, setTimelineEntries] = useState([]);

  useEffect(() => {
    // Combine user's and friends' watched entries
    const friendsEntries = watchedEntries.filter((entry) =>
      following.includes(entry.userId)
    );
    const userEntries = watchedEntries.filter(
      (entry) => entry.userId === currentUser.id
    );

    // Combine and sort by date (newest first)
    const combined = [...userEntries, ...friendsEntries].sort(
      (a, b) => new Date(b.watchDate) - new Date(a.watchDate)
    );

    setTimelineEntries(combined);
  }, []); // Run only once on mount

  const handleCardClick = (movie, entry) => {
    // Later: Navigate to a detail view or show a modal
    console.log("Clicked:", movie.title, "Entry:", entry);
  };

  return (
    <div className="screen-container home-screen">
      <h2>Film Timeline</h2>
      <div className="movie-grid">
        {timelineEntries.map((entry) => {
          const movie = getMovieById(entry.movieId);
          const user = getUserById(entry.userId);
          return (
            <MovieCard
              key={entry.entryId}
              movie={movie}
              entry={entry}
              userAvatar={user?.id !== currentUser.id ? user?.avatar : null} // Show avatar only if friend
              onClick={handleCardClick}
              showStatus={true} // Show status indicator on home feed
            />
          );
        })}
      </div>
      {/* Floating Add Button */}
      <Link to="/add" className="floating-add-button">
        +
      </Link>
    </div>
  );
};

export default HomeScreen;
