// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { mockMovies } from '../data/mockData';

function Home() {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const searchQuery = location.state?.searchQuery || '';

  useEffect(() => {
    if (searchQuery) {
      // Filter mock data based on search query
      const results = mockMovies.filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Group movies by category
  const recommendations = mockMovies.filter(movie => movie.categories.includes('recommended')).slice(0, 4);
  const watchLater = mockMovies.filter(movie => movie.categories.includes('watchLater')).slice(0, 4);
  const watchHistory = mockMovies.filter(movie => movie.categories.includes('watched')).slice(0, 4);

  return (
    <div>
      {searchQuery ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Search Results for "{searchQuery}"</h2>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {searchResults.map(movie => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No results found for "{searchQuery}"</p>
          )}
        </div>
      ) : (
        <div className="space-y-10">
          {/* Recommendations Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Recommendations</h2>
              <Link to="/recommendations" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {recommendations.map(movie => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              ))}
            </div>
          </section>

          {/* Watch Later Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Watch Later</h2>
              <Link to="/watch-later" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {watchLater.map(movie => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              ))}
            </div>
          </section>

          {/* Watch History Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Watch History</h2>
              <Link to="/watch-history" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {watchHistory.map(movie => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Home;