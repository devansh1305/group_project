import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { currentUser, watchedEntries, getMovieById } from "../data/fakeData";
import "./ScreenStyles.css";

const ProfileScreen = () => {
  const [userEntries, setUserEntries] = useState([]);
  const [highestRated, setHighestRated] = useState([]);

  useEffect(() => {
    const entries = watchedEntries
      .filter((entry) => entry.userId === currentUser.id)
      .sort((a, b) => new Date(b.watchDate) - new Date(a.watchDate)); // Sort newest first

    setUserEntries(entries);

    // Find highest rated (simple version: >= 4.5 stars)
    const topRated = entries
      .filter((entry) => entry.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating); // Sort by rating desc
    setHighestRated(topRated);
  }, []); // Run once

  const handleCardClick = (movie, entry) => {
    console.log("Clicked own entry:", movie.title, entry);
    // Later: Allow editing the entry?
  };

  return (
    <div className="screen-container profile-screen">
      <h2>My Profile</h2>
      <div className="profile-header">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="profile-avatar"
        />
        <h3>{currentUser.name}</h3>
        {/* Add stats later: Movies watched, hours, etc. */}
      </div>

      <div className="profile-section">
        <h3>Highest Rated Films</h3>
        <div className="movie-grid profile-grid">
          {highestRated.length > 0 ? (
            highestRated.map((entry) => {
              const movie = getMovieById(entry.movieId);
              return movie ? (
                <MovieCard
                  key={entry.entryId}
                  movie={movie}
                  entry={entry}
                  onClick={handleCardClick}
                  showStatus={false}
                  size="small"
                />
              ) : null;
            })
          ) : (
            <p>No high-rated films yet.</p>
          )}
        </div>
      </div>

      <div className="profile-section">
        <h3>Recently Watched</h3>
        {/* Visual Calendar Grid - Simplified to a regular grid for prototype */}
        <div className="movie-grid profile-grid">
          {userEntries.length > 0 ? (
            userEntries.map((entry) => {
              const movie = getMovieById(entry.movieId);
              return movie ? (
                <MovieCard
                  key={entry.entryId}
                  movie={movie}
                  entry={entry}
                  onClick={handleCardClick}
                  showStatus={true}
                  size="small"
                />
              ) : null;
            })
          ) : (
            <p>You haven't logged any films yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
