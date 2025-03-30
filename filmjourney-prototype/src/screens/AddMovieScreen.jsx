import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  movies,
  currentUser,
  watchedEntries as initialWatchedEntries,
  getMovieById,
} from "../data/fakeData";
import RatingComponent from "../components/RatingComponent";
import "./ScreenStyles.css";

// NOTE: This state update is temporary and will be lost on refresh.
// In a real app, this would involve API calls and likely better state management.
let watchedEntries = [...initialWatchedEntries]; // Make a mutable copy for this session
let nextEntryId = Math.max(...watchedEntries.map((e) => e.entryId), 0) + 1;

const AddMovieScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchDate, setWatchDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Today's date default
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term.length > 1) {
      setSearchResults(
        movies.filter((movie) =>
          movie.title.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setSearchResults([]);
    }
    setSelectedMovie(null); // Clear selection if search changes
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setSearchTerm(movie.title); // Fill search bar with selected title
    setSearchResults([]); // Hide results
  };

  const handleSaveEntry = ({ rating, emotion, review, tags }) => {
    if (!selectedMovie || !watchDate) {
      alert("Please select a movie and watch date.");
      return;
    }

    const newEntry = {
      entryId: nextEntryId++,
      userId: currentUser.id,
      movieId: selectedMovie.id,
      watchDate: watchDate,
      rating: rating,
      emotion: emotion,
      tags: tags,
      review: review,
      status: "watched", // Default to 'watched' for new entries
    };

    // Update the in-memory data (TEMPORARY)
    watchedEntries.push(newEntry);
    console.log("Added new entry (temporary):", newEntry);
    console.log("Updated watchedEntries:", watchedEntries); // Log the updated array

    alert(`${selectedMovie.title} added to your diary!`);
    navigate("/"); // Go back home after adding
  };

  return (
    <div className="screen-container add-movie-screen">
      <h2>Add Film to Diary</h2>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search for a film..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        {searchResults.length > 0 && (
          <ul className="search-results-list">
            {searchResults.map((movie) => (
              <li key={movie.id} onClick={() => handleSelectMovie(movie)}>
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  width="30"
                  height="45"
                  style={{ marginRight: "10px", verticalAlign: "middle" }}
                />
                {movie.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedMovie && (
        <div className="selected-movie-details">
          <h3>Selected: {selectedMovie.title}</h3>
          <img
            src={selectedMovie.posterUrl}
            alt={selectedMovie.title}
            width="100"
          />
          <div className="watch-date-section">
            <label htmlFor="watchDate">Watch Date: </label>
            <input
              type="date"
              id="watchDate"
              value={watchDate}
              onChange={(e) => setWatchDate(e.target.value)}
              required
            />
          </div>

          <RatingComponent onSave={handleSaveEntry} />
        </div>
      )}
    </div>
  );
};

export default AddMovieScreen;
