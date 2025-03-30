// src/App.jsx
import React from "react"; // <--- MAKE SURE THIS LINE IS HERE
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import HomeScreen from "./screens/HomeScreen";
import DiscoverScreen from "./screens/DiscoverScreen";
import SocialScreen from "./screens/SocialScreen";
import WatchlistScreen from "./screens/WatchlistScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AddMovieScreen from "./screens/AddMovieScreen";
import "./App.css"; // Optional global styles if needed

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Main Content Area */}
        <main className="content-area">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/discover" element={<DiscoverScreen />} />
            <Route path="/social" element={<SocialScreen />} />
            <Route path="/watchlist" element={<WatchlistScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/add" element={<AddMovieScreen />} />
            {/* Add other routes like movie details later */}
          </Routes>
        </main>

        {/* Navigation */}
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
