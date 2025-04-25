// src/pages/MovieDetail.jsx
import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeftIcon, PlusIcon, StarIcon, ShareIcon } from '@heroicons/react/24/outline';
import StarRating from '../components/StarRating';
import RateReviewModal from '../components/RateReviewModal';
import StreamingPlatformLogo from '../components/StreamingPlatformLogo';
import { mockMovies } from '../data/mockData';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [showRateModal, setShowRateModal] = useState(false);
  // Find movie in mock data
  const movie = mockMovies.find(m => m.id === parseInt(id));
  const isInWatchlist = movie?.categories?.includes('watchLater');
  
  // Check if we're coming from watch-later view
  const fromWatchLater = location.state?.from === 'watch-later';
  
  // Check if we're coming from watch-history view
  const fromWatchHistory = location.state?.from === 'watch-history';

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="pb-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-3 inline-flex items-center px-2 py-1 border border-transparent text-xs rounded-md bg-indigo-100 hover:bg-indigo-200 focus:outline-none"
      >
        <ArrowLeftIcon className="mr-1 h-3 w-3" aria-hidden="true" />
        Back
      </button>

      {/* Movie title at the top */}
      <h1 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{movie.title}</h1>
      
      {/* Rating */}
      <div className="flex items-center mb-4">
        <StarRating rating={movie.rating} />
        <span className="ml-1 text-xs text-gray-500">({movie.rating}/5)</span>
      </div>

      {/* Movie poster in landscape mode - 16:9 aspect ratio for video/trailer space */}
      <div className="w-full aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>

      {/* Action buttons row */}
      <div className="flex justify-between gap-2 mb-6">

        {/* Watchlist button */}
        <button
          type="button"
          className="flex-1 flex justify-center items-center py-2 px-3 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
        >
          {isInWatchlist ? (
        <>
          {/* Optional: Replace PlusIcon with CheckIcon */}
          {/* <CheckIcon className="mr-1 h-4 w-4" aria-hidden="true" /> */}
          Added to Watchlist
        </>
      ) : (
        <>
          <PlusIcon className="mr-1 h-4 w-4" aria-hidden="true" />
          Watchlist
        </>
      )}
        </button>
        
        {/* Rate button */}
        <button
          type="button"
          onClick={() => setShowRateModal(true)}
          className="flex-1 flex justify-center items-center py-2 px-3 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
        >
          <StarIcon className="mr-1 h-4 w-4" aria-hidden="true" />
          Rate
        </button>
        
        {/* Share button */}
        <button
          type="button"
          className="flex-1 flex justify-center items-center py-2 px-3 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          <ShareIcon className="mr-1 h-4 w-4" aria-hidden="true" />
          Share
        </button>
      </div>
      
      {/* Movie details in sections */}
      <div className="space-y-4">
        {/* Genres */}
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-1">Genres</h2>
          <div className="flex flex-wrap gap-1">
            {movie.genres.map(genre => (
              <span 
                key={genre} 
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
        
        {/* Available On */}
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-1">Available On</h2>
          <div className="grid grid-cols-5 gap-2">
            {movie.streamingServices.map(service => (
              <StreamingPlatformLogo
                key={service}
                platform={service}
                className="h-10"
              />
            ))}
          </div>
        </div>
        
        {/* Cast */}
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-1">Cast</h2>
          <p className="text-sm text-gray-900">{movie.cast.join(', ')}</p>
        </div>
        
        {/* Director */}
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-1">Director</h2>
          <p className="text-sm text-gray-900">{movie.director}</p>
        </div>
        
        {/* Writer */}
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-1">Writer</h2>
          <p className="text-sm text-gray-900">{movie.writer}</p>
        </div>
        
        {/* Release Date */}
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-1">Release Date</h2>
          <p className="text-sm text-gray-900">{movie.releaseDate}</p>
        </div>
        
        {/* IMDB Rating */}
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-1">IMDB Rating</h2>
          <p className="text-sm text-gray-900">{movie.imdbRating}/10</p>
        </div>
        
        {/* Recognition - only if exists */}
        {movie.recognition && (
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-1">Recognition</h2>
            <p className="text-sm text-gray-900">{movie.recognition}</p>
          </div>
        )}
        
        {/* Date Watched - only if from watch history */}
        {fromWatchHistory && movie.dateWatched && (
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-1">Date Watched</h2>
            <p className="text-sm text-gray-900">{movie.dateWatched}</p>
          </div>
        )}
      </div>
      
      {/* Rate and Review Modal */}
      {showRateModal && (
        <RateReviewModal
          movie={movie}
          onClose={() => setShowRateModal(false)}
        />
      )}
    </div>
  );
}

export default MovieDetail;