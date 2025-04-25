// src/components/MovieCarousel.jsx
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

function MovieCarousel({ movies, title, viewAllLink }) {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  // With exactly 3 items, we don't need scroll arrows
  useEffect(() => {
    // Always hide arrows when we have exactly 3 items
    setShowLeftArrow(false);
    setShowRightArrow(false);
  }, [movies]);
  
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      // Scroll by 6 items at once
      const containerWidth = scrollRef.current.clientWidth;
      const scrollAmount = direction === 'left' ? -containerWidth * 0.75 : containerWidth * 0.75;
      
      // Force scroll using direct manipulation
      const currentScroll = scrollRef.current.scrollLeft;
      const targetScroll = currentScroll + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      
      // Update arrow visibility
      setTimeout(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          setShowLeftArrow(scrollLeft > 10);
          setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
      }, 300);
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
      
      <div className="relative w-full overflow-hidden">
        {/* Left scroll button */}
        <button 
          onClick={() => scroll('left')}
          className={`absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-indigo-600 rounded-full p-1 shadow-md hover:bg-indigo-700 transition-all ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-label="Scroll left"
          type="button"
        >
          <ChevronLeftIcon className="h-4 w-4 text-white" />
        </button>
        
        {/* Fixed container for exactly 3 items */}
        <div 
          ref={scrollRef}
          className="grid grid-cols-3 gap-2"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none'
          }}
        >
          {movies.map(movie => (
            <Link 
              key={movie.id} 
              to={`/movie/${movie.id}`}
              className="" 
            >
              <div>
                {/* Poster */}
                <div className="overflow-hidden rounded-md">
                  {movie.poster ? (
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full aspect-[2/3] object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-[2/3] flex items-center justify-center bg-gray-200">
                      <span className="text-gray-500 text-xs">No Image</span>
                    </div>
                  )}
                </div>
                
                {/* Title */}
                <p className="mt-1 text-xs font-medium text-gray-900 truncate text-center">
                  {movie.title.length > 15 ? movie.title.substring(0, 15) + '...' : movie.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Right scroll button */}
        <button 
          onClick={() => scroll('right')}
          className={`absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-indigo-600 rounded-full p-1 shadow-md hover:bg-indigo-700 transition-all ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-label="Scroll right"
          type="button"
        >
          <ChevronRightIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    </section>
  );
}

export default MovieCarousel;