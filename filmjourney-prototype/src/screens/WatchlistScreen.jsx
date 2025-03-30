import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import {
  watchlist as initialWatchlist,
  currentUser,
  getMovieById,
} from "../data/fakeData";
import "./ScreenStyles.css";

// Allow modification for prototype drag/drop simulation later
let watchlistData = [...initialWatchlist];

const WatchlistScreen = () => {
  const [userWatchlist, setUserWatchlist] = useState([]);
  const [moodBoards, setMoodBoards] = useState({});

  useEffect(() => {
    const wl = watchlistData.filter((item) => item.userId === currentUser.id);
    setUserWatchlist(wl);

    // Group by mood
    const boards = wl.reduce((acc, item) => {
      const mood = item.mood || "Uncategorized"; // Default mood
      if (!acc[mood]) {
        acc[mood] = [];
      }
      acc[mood].push(item);
      // Sort items within a mood board, maybe by priority?
      acc[mood].sort((a, b) => (b.priority || 0) - (a.priority || 0));
      return acc;
    }, {});
    setMoodBoards(boards);
  }, []); // Re-run if watchlistData were to change (it doesn't in this simple version)

  const handleCardClick = (movie, item) => {
    console.log("Watchlist item clicked:", movie.title, "Mood:", item.mood);
    // Later: Options to watch now, remove, edit mood/priority
  };

  // Simple priority to size mapping
  const getCardSize = (priority) => {
    if (priority >= 3) return "large";
    if (priority === 2) return "normal";
    return "small";
  };

  return (
    <div className="screen-container watchlist-screen">
      <h2>My Watchlist</h2>
      <p>Organized by mood and occasion.</p>

      {Object.entries(moodBoards).map(([mood, items]) => (
        <div key={mood} className="mood-board">
          <h3>{mood}</h3>
          <div className="movie-grid watchlist-grid">
            {items.map((item) => {
              const movie = getMovieById(item.movieId);
              if (!movie) return null;
              return (
                <MovieCard
                  key={item.watchlistId}
                  movie={movie}
                  entry={item} // Pass watchlist item data if needed
                  onClick={handleCardClick}
                  size={getCardSize(item.priority)} // Apply size based on priority
                />
              );
            })}
          </div>
        </div>
      ))}

      {userWatchlist.length === 0 && (
        <p>
          Your watchlist is empty. Long-press on movie posters elsewhere to add!
        </p>
      )}
      {/* Long-press functionality not implemented in this basic prototype */}
    </div>
  );
};

export default WatchlistScreen;
