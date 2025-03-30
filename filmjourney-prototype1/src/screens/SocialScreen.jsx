import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import {
  watchedEntries,
  following,
  getMovieById,
  getUserById,
  users,
} from "../data/fakeData";
import "./ScreenStyles.css";

const SocialScreen = () => {
  const [friendFeed, setFriendFeed] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    // Get entries only from users the current user follows
    const feed = watchedEntries
      .filter((entry) => following.includes(entry.userId))
      .sort((a, b) => new Date(b.watchDate) - new Date(a.watchDate)); // Sort newest first

    setFriendFeed(feed);

    // Get details of followed users
    setFollowedUsers(users.filter((user) => following.includes(user.id)));
  }, []); // Run once on mount

  const handleCardClick = (movie, entry) => {
    const user = getUserById(entry.userId);
    console.log(`Clicked ${movie.title} watched by ${user?.name}`);
    // Later: Navigate to movie detail or user profile
  };

  const handleUserClick = (userId) => {
    // Placeholder for viewing a user's profile
    const user = getUserById(userId);
    alert(`Viewing profile of ${user?.name} (Not Implemented)`);
  };

  return (
    <div className="screen-container social-screen">
      <h2>Social Feed</h2>
      <p>See what your friends are watching.</p>

      {/* Simple Follow Management Visualization */}
      <div className="followed-users-grid">
        <h3>Following</h3>
        {followedUsers.map((user) => (
          <div
            key={user.id}
            className="followed-user-card"
            onClick={() => handleUserClick(user.id)}
          >
            <img src={user.avatar} alt={user.name} />
            <span>{user.name}</span>
            {/* Placeholder for activity/compatibility */}
          </div>
        ))}
      </div>

      <h3>Friend Activity</h3>
      <div className="movie-grid">
        {friendFeed.map((entry) => {
          const movie = getMovieById(entry.movieId);
          const user = getUserById(entry.userId);
          if (!movie || !user) return null; // Skip if data is missing

          return (
            <MovieCard
              key={entry.entryId}
              movie={movie}
              entry={entry}
              userAvatar={user.avatar} // Show friend's avatar
              onClick={handleCardClick}
              showStatus={true}
            />
          );
        })}
        {friendFeed.length === 0 && <p>No activity from friends yet.</p>}
      </div>

      {/* Placeholder for notification-style feed */}
      {/* <div className="activity-feed">
           <h3>Recent Activity (Placeholder)</h3>
            <ul><li>Alice watched The Shawshank Redemption</li></ul>
        </div> */}
    </div>
  );
};

export default SocialScreen;
