import React, { useState } from "react";
import { experts, userExperts, currentUser } from "../data/fakeData";
import "./ScreenStyles.css";

const DiscoverScreen = () => {
  // Basic state to track followed experts (doesn't persist)
  const [followedExperts, setFollowedExperts] = useState(
    userExperts[currentUser.id] || []
  );

  const toggleFollowExpert = (expertId) => {
    setFollowedExperts((prev) =>
      prev.includes(expertId)
        ? prev.filter((id) => id !== expertId)
        : [...prev, expertId]
    );
    // In real app: API call to update followed experts
    console.log("Toggled follow for expert ID:", expertId);
  };

  return (
    <div className="screen-container discover-screen">
      <h2>Discover & Experts</h2>
      <p>Find recommendations and manage your experts.</p>

      <div className="expert-showcase">
        <h3>Expert Showcase</h3>
        {/* Simple list instead of carousel for prototype */}
        <div className="expert-list">
          {experts.map((expert) => (
            <div key={expert.id} className="expert-profile-card">
              <img
                src={expert.avatar}
                alt={expert.name}
                className="expert-avatar"
              />
              <div className="expert-info">
                <h4>{expert.name}</h4>
                <p>Top Genres: {expert.topGenres.join(", ")}</p>
                {/* Basic bar chart visualization - very simple */}
                <div className="genre-chart">
                  {expert.topGenres.map((genre) => (
                    <div key={genre} className="genre-bar" title={genre}></div>
                  ))}
                </div>
                <button
                  onClick={() => toggleFollowExpert(expert.id)}
                  className={`follow-button ${
                    followedExperts.includes(expert.id) ? "following" : ""
                  }`}
                >
                  {followedExperts.includes(expert.id)
                    ? "Following"
                    : "Add as Expert"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Placeholder for Manual Expert Assignment */}
      {/* <div className="expert-assignment">
           <h3>Assign Experts by Genre (Placeholder)</h3>
            <p>Drag and drop experts onto genres (Not implemented in prototype)</p>
       </div> */}
    </div>
  );
};

export default DiscoverScreen;
