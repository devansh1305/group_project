// src/components/MovieCarousel.jsx
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

function MovieCarousel({ movies, title, viewAllLink }) {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <Link to={viewAllLink} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          View All
        </Link>
      </div>
      
      <div className="relative">
        {/* Left scroll button */}
        {showLeftArrow && (
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md hover:bg-white transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
          </button>
        )}
        
        {/* Movie carousel */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto pb-4 hide-scrollbar gap-3 px-1"
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map(movie => (
            <Link 
              key={movie.id} 
              to={`/movie/${movie.id}`}
              className="flex-shrink-0 w-[110px]"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Poster */}
                <div className="w-full aspect-[2/3] overflow-hidden">
                  {movie.poster ? (
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-200">
                      <span className="text-gray-500 text-xs">No Image</span>
                    </div>
                  )}
                </div>
                
                {/* Movie info */}
                <div className="p-2">
                  <h3 className="text-xs font-medium text-gray-900 truncate" title={movie.title}>
                    {movie.title}
                  </h3>
                  <div className="mt-1">
                    <StarRating rating={movie.rating} size="small" />
                  </div>
                  
                  {movie.streamingServices && movie.streamingServices.length > 0 && (
                    <div className="mt-1">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 truncate">
                        {movie.streamingServices[0]}
                        {movie.streamingServices.length > 1 && '+'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Right scroll button */}
        {showRightArrow && (
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md hover:bg-white transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-600" />
          </button>
        )}
      </div>
    </section>
  );
}

export default MovieCarousel;