// src/screens/ProfileScreen.js
import React from "react";
import { userProfile } from "../data"; // Import mock profile data

const ProfileScreen = () => {
  const handleEditProfile = () => alert("Edit Profile clicked (Demo)");
  const handleShareProfile = () => alert("Share Profile clicked (Demo)");
  const handleEditPlatforms = () =>
    alert("Edit Platforms clicked (Demo) - could open Filter Modal");

  return (
    <div>
      <div className="profile-info">
        {/* Add Profile Picture Placeholder if desired */}
        <h1>{userProfile.name}</h1>
        <p>{userProfile.reviewsCount} Reviews</p>
        <div className="profile-actions">
          <button onClick={handleEditProfile}>Edit Profile</button>
          <button onClick={handleShareProfile}>Share Profile</button>
        </div>
      </div>

      <div className="profile-platforms">
        <h3>
          My Streaming Platforms:{" "}
          <button
            onClick={handleEditPlatforms}
            style={{ fontSize: "0.8rem", marginLeft: "10px" }}
          >
            Edit
          </button>
        </h3>
        {userProfile.platforms.map((platform) => (
          <span key={platform}>{platform}</span>
        ))}
      </div>

      {/* Maybe show user's reviews or recent activity here later */}
      {/* Example: <HorizontalMovieList title="My Recent Reviews" movies={getMoviesForList('Watch History').slice(0, 5)} /> */}
    </div>
  );
};

export default ProfileScreen;
