// src/data/fakeData.js

// Let's assume user ID 1 is the current user
const currentUser = {
  id: 1,
  name: "You",
  avatar: "https://via.placeholder.com/50/FFA500/000000?text=You",
};

const users = [
  currentUser,
  {
    id: 2,
    name: "Alice",
    avatar: "https://via.placeholder.com/50/87CEEB/000000?text=A",
  },
  {
    id: 3,
    name: "Bob",
    avatar: "https://via.placeholder.com/50/90EE90/000000?text=B",
  },
];

const movies = [
  {
    id: 101,
    title: "Inception",
    posterUrl:
      "https://via.placeholder.com/150x225/CCCCCC/000000?text=Inception",
    genres: ["Sci-Fi", "Action", "Thriller"],
  },
  {
    id: 102,
    title: "The Shawshank Redemption",
    posterUrl:
      "https://via.placeholder.com/150x225/CCCCCC/000000?text=Shawshank",
    genres: ["Drama"],
  },
  {
    id: 103,
    title: "Spirited Away",
    posterUrl:
      "https://via.placeholder.com/150x225/CCCCCC/000000?text=Spirited",
    genres: ["Animation", "Fantasy", "Adventure"],
  },
  {
    id: 104,
    title: "The Dark Knight",
    posterUrl:
      "https://via.placeholder.com/150x225/CCCCCC/000000?text=Dark+Knight",
    genres: ["Action", "Crime", "Drama"],
  },
  {
    id: 105,
    title: "Parasite",
    posterUrl:
      "https://via.placeholder.com/150x225/CCCCCC/000000?text=Parasite",
    genres: ["Comedy", "Drama", "Thriller"],
  },
  {
    id: 106,
    title: "Pulp Fiction",
    posterUrl:
      "https://via.placeholder.com/150x225/CCCCCC/000000?text=Pulp+Fiction",
    genres: ["Crime", "Drama"],
  },
  {
    id: 107,
    title: "Everything Everywhere All at Once",
    posterUrl: "https://via.placeholder.com/150x225/CCCCCC/000000?text=EEAAO",
    genres: ["Action", "Adventure", "Comedy", "Sci-Fi"],
  },
  {
    id: 108,
    title: "La La Land",
    posterUrl:
      "https://via.placeholder.com/150x225/CCCCCC/000000?text=La+La+Land",
    genres: ["Comedy", "Drama", "Music", "Romance"],
  },
];

// Status: 'watched', 'partial', 'rewatched'
// Emotion: 1 (hated) to 5 (masterpiece)
const watchedEntries = [
  {
    entryId: 1,
    userId: 1,
    movieId: 101,
    watchDate: "2025-03-15",
    rating: 4.5,
    emotion: 5,
    tags: ["Mind-bending", "Must Watch"],
    review: "Amazing concept!",
    status: "watched",
  },
  {
    entryId: 2,
    userId: 2,
    movieId: 102,
    watchDate: "2025-03-16",
    rating: 5,
    emotion: 5,
    tags: ["Classic", "Emotional"],
    review: "A masterpiece of storytelling.",
    status: "watched",
  },
  {
    entryId: 3,
    userId: 1,
    movieId: 103,
    watchDate: "2025-03-18",
    rating: 5,
    emotion: 4,
    tags: ["Beautiful", "Fantasy"],
    review: "",
    status: "rewatched",
  },
  {
    entryId: 4,
    userId: 3,
    movieId: 104,
    watchDate: "2025-03-20",
    rating: 4.5,
    emotion: 4,
    tags: ["Gritty", "Action"],
    review: "Heath Ledger was incredible.",
    status: "watched",
  },
  {
    entryId: 5,
    userId: 1,
    movieId: 105,
    watchDate: "2025-03-22",
    rating: 4,
    emotion: 3,
    tags: ["Suspenseful"],
    review: "Kept me guessing.",
    status: "watched",
  },
  {
    entryId: 6,
    userId: 2,
    movieId: 107,
    watchDate: "2025-03-25",
    rating: 5,
    emotion: 5,
    tags: ["Unique", "Action", "Emotional"],
    review: "Wow!",
    status: "watched",
  },
];

const following = [2, 3]; // Current user (ID 1) follows users 2 and 3

// Moods: 'Date Night', 'With Friends', 'Rainy Day', 'Need a Laugh', 'Deep Thought'
const watchlist = [
  { watchlistId: 1, userId: 1, movieId: 106, mood: "Date Night", priority: 3 }, // Higher priority = larger poster (visualized later)
  { watchlistId: 2, userId: 1, movieId: 108, mood: "Date Night", priority: 2 },
  { watchlistId: 3, userId: 1, movieId: 104, mood: "Rainy Day", priority: 1 },
];

const experts = [
  {
    id: 1001,
    name: "GenreGuru",
    topGenres: ["Sci-Fi", "Action"],
    avatar: "https://via.placeholder.com/60/0000FF/FFFFFF?text=GG",
  },
  {
    id: 1002,
    name: "DramaQueen",
    topGenres: ["Drama", "Romance"],
    avatar: "https://via.placeholder.com/60/FF00FF/FFFFFF?text=DQ",
  },
  {
    id: 1003,
    name: "ArthouseAnnie",
    topGenres: ["Indie", "Foreign"],
    avatar: "https://via.placeholder.com/60/FFFF00/000000?text=AA",
  },
];

const userExperts = {
  // userId: [expertId1, expertId2]
  1: [1001], // Current user follows GenreGuru
};

// Function to get movie details by ID
const getMovieById = (id) => movies.find((m) => m.id === id);

// Function to get user details by ID
const getUserById = (id) => users.find((u) => u.id === id);

export {
  currentUser,
  users,
  movies,
  watchedEntries,
  following,
  watchlist,
  experts,
  userExperts,
  getMovieById,
  getUserById,
};
