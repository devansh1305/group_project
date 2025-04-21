// src/data.js

// Placeholder images - replace with actual paths or URLs if you have them
const placeholderImage = (id) =>
  `https://via.placeholder.com/150/0000FF/808080?text=Movie+${id}`;

export const movies = [
  {
    id: 1,
    title: "Action Movie 1",
    poster: placeholderImage(1),
    rating: 4.5,
    releaseDate: "2023-05-15",
    imdbRating: 8.2,
    genre: ["Action", "Sci-Fi"],
    platforms: ["Netflix", "Prime Video"],
    cast: ["Actor A", "Actress B"],
    director: "Director X",
    writer: "Writer Y",
    recognition: "Award for Stunts",
    dateWatched: null,
  },
  {
    id: 2,
    title: "Comedy Fun",
    poster: placeholderImage(2),
    rating: 3.8,
    releaseDate: "2022-11-04",
    imdbRating: 7.1,
    genre: ["Comedy"],
    platforms: ["Disney+", "Prime Video"],
    cast: ["Comedian C", "Actor D"],
    director: "Director Z",
    writer: "Writer W",
    recognition: null,
    dateWatched: "2025-01-26", // Example date watched
  },
  {
    id: 3,
    title: "Drama Hour",
    poster: placeholderImage(3),
    rating: 4.1,
    releaseDate: "2024-01-20",
    imdbRating: 7.9,
    genre: ["Drama"],
    platforms: ["Netflix"],
    cast: ["Actress E", "Actor F"],
    director: "Director V",
    writer: "Writer U",
    recognition: "Festival Favorite",
    dateWatched: null,
  },
  {
    id: 4,
    title: "Sci-Fi Adventure",
    poster: placeholderImage(4),
    rating: 4.8,
    releaseDate: "2023-10-01",
    imdbRating: 8.8,
    genre: ["Sci-Fi", "Adventure"],
    platforms: ["Prime Video"],
    cast: ["Actor G", "Actress H"],
    director: "Director X",
    writer: "Writer Y",
    recognition: "Best Visual Effects",
    dateWatched: null,
  },
  {
    id: 5,
    title: "Romantic Comedy",
    poster: placeholderImage(5),
    rating: 3.5,
    releaseDate: "2024-02-14",
    imdbRating: 6.5,
    genre: ["Comedy", "Romance"],
    platforms: ["Netflix", "Disney+"],
    cast: ["Actor I", "Actress J"],
    director: "Director Z",
    writer: "Writer W",
    recognition: null,
    dateWatched: "2024-03-10",
  },
  // Add more mock movies if desired
];

// Hardcoded lists (using movie IDs)
// In a real app, state management (useState, useReducer, Context, Redux etc.) would handle this
export const recommendations = [1, 4];
export const watchLater = [3, 4]; // Only this list can be modified (in a real app)
export const watchHistory = [2, 5];

// Helper to get movie details by ID
export const getMovieById = (id) =>
  movies.find((movie) => movie.id === parseInt(id));

// Helper to check if a movie is in the "Watch Later" list (for demo)
export const isInWatchLater = (id) => watchLater.includes(parseInt(id));

// Helper to get movies for a specific list
export const getMoviesForList = (listName) => {
  let ids;
  switch (listName) {
    case "Recommendations":
      ids = recommendations;
      break;
    case "Watch Later":
      ids = watchLater;
      break;
    case "Watch History":
      ids = watchHistory;
      break;
    default:
      ids = [];
  }
  // Ensure we return copies so original data isn't mutated directly if we add/remove later
  return ids.map((id) => getMovieById(id)).filter(Boolean);
};

// Mock User Profile Data
export const userProfile = {
  name: "Demo User",
  reviewsCount: watchHistory.length, // Dynamically count history for demo
  platforms: ["Netflix", "Prime Video", "Disney+"],
};

// Mock Search Function (returns all movies containing the query in title)
export const searchMovies = (query) => {
  if (!query) return [];
  const lowerCaseQuery = query.toLowerCase();
  // Return copies to prevent accidental mutation
  return movies
    .filter((movie) => movie.title.toLowerCase().includes(lowerCaseQuery))
    .map((movie) => ({ ...movie }));
};
