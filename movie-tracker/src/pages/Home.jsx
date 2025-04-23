// src/pages/Home.jsx
import { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import MovieCarousel from '../components/MovieCarousel';
import { mockMovies } from '../data/mockData';
import StarRating from '../components/StarRating';

function Home() {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const searchQuery = location.state?.searchQuery || '';
  const searchResultsRef = useRef(null);

  useEffect(() => {
    if (searchQuery) {
      // Filter mock data based on search query
      const results = mockMovies.filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      
      // Scroll to search results
      setTimeout(() => {
        if (searchResultsRef.current) {
          searchResultsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Group movies by category - get more movies for carousels
  const recommendations = mockMovies.filter(movie => movie.categories.includes('recommended')).slice(0, 6);
  const watchLater = mockMovies.filter(movie => movie.categories.includes('watchLater')).slice(0, 6);
  const watchHistory = mockMovies.filter(movie => movie.categories.includes('watched')).slice(0, 6);

  return (
    <div>
      {searchQuery ? (
        <div ref={searchResultsRef}>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Search Results for "{searchQuery}"</h2>
          {searchResults.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {searchResults.map(movie => (
                <Link key={movie.id} to={`/movie/${movie.id}`} className="block">
                  <div className="flex border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                    {/* Movie poster */}
                    <div className="w-24 h-36 flex-shrink-0">
                      {movie.poster ? (
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-full h-full object-cover object-center"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gray-200">
                          <span className="text-gray-500 text-xs">No Image</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Movie details */}
                    <div className="flex-1 p-3 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{movie.title}</h3>
                        <div className="mt-1">
                          <StarRating rating={movie.rating} />
                        </div>
                      </div>
                      
                      {movie.streamingServices && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {movie.streamingServices.map(service => (
                            <span key={service} className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              {service}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No results found for "{searchQuery}"</p>
          )}
        </div>
      ) : (
        <div className="space-y-8 mt-2">
          {/* Recommendations Carousel */}
          <MovieCarousel 
            movies={recommendations} 
            title="Recommendations" 
            viewAllLink="/recommendations" 
          />

          {/* Watch Later Carousel */}
          <MovieCarousel 
            movies={watchLater} 
            title="Watch Later" 
            viewAllLink="/watch-later" 
          />

          {/* Watch History Carousel */}
          <MovieCarousel 
            movies={watchHistory} 
            title="Watch History" 
            viewAllLink="/watch-history" 
          />
        </div>
      )}
    </div>
  );
}

export default Home;