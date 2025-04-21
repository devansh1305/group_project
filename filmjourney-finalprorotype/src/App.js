// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
  useNavigate,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import MovieDetailScreen from "./screens/MovieDetailScreen";
import ListScreen from "./screens/ListScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen"; // Import SearchScreen
import { searchMovies } from "./data"; // Import search function
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // Track if search is active

  // Use a separate component for search handling to access useNavigate
  const SearchHandler = () => {
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
      const query = e.target.value;
      setSearchTerm(query);
      if (query.length > 0) {
        setSearchResults(searchMovies(query));
        setIsSearching(true); // Show search results component
      } else {
        setSearchResults([]);
        setIsSearching(false); // Go back to showing main content (e.g., home)
      }
    };

    // We might not need a separate search submit button if it searches as you type
    // const handleSearchSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("Searching for:", searchTerm);
    //     setSearchResults(searchMovies(searchTerm));
    //     setIsSearching(true);
    //     // Optionally navigate to a dedicated search results route
    //     // navigate('/search');
    // };

    return (
      <input
        type="text"
        placeholder="Search for movies/shows"
        className="search-bar"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    );
  };

  return (
    <Router>
      <div className="app">
        <header className="header">
          <SearchHandler />
          <Link to="/profile" className="profile-icon">
            👤
          </Link>{" "}
          {/* Simple Profile Icon Link */}
        </header>

        <main className="main-content">
          <Routes>
            {/* Conditionally render SearchScreen or HomeScreen based on isSearching */}
            <Route
              path="/"
              element={
                isSearching ? (
                  <SearchScreen results={searchResults} />
                ) : (
                  <HomeScreen />
                )
              }
            />
            <Route path="/movie/:movieId" element={<MovieDetailScreen />} />
            {/* Use a parameter for list name */}
            <Route path="/list/:listName" element={<ListScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            {/* Optional: Add a dedicated search route if needed later */}
            {/* <Route path="/search" element={<SearchScreen results={searchResults} />} /> */}

            {/* Fallback for unknown routes (optional) */}
            <Route
              path="*"
              element={
                isSearching ? (
                  <SearchScreen results={searchResults} />
                ) : (
                  <HomeScreen />
                )
              }
            />
          </Routes>
        </main>

        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive && !isSearching ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
          {/* Update NavLinks to point to the parameterized route */}
          <NavLink
            to="/list/Recommendations"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Recommendations
          </NavLink>
          <NavLink
            to="/list/Watch%20Later"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Watch Later
          </NavLink>
          <NavLink
            to="/list/Watch%20History"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            History
          </NavLink>
        </nav>
      </div>
    </Router>
  );
}

export default App;
