import React from "react";
import { NavLink } from "react-router-dom";
import "./BottomNav.css";

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/discover"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Discover
      </NavLink>
      {/* Placeholder for Add Button */}
      {/* <button className="add-button-placeholder">+</button> */}
      <NavLink
        to="/social"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Social
      </NavLink>
      <NavLink
        to="/watchlist"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Watchlist
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Profile
      </NavLink>
    </nav>
  );
};

export default BottomNav;
