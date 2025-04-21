// src/pages/MovieDetail.jsx
import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeftIcon, PlusIcon, ClockIcon, CheckIcon } from '@heroicons/react/24/outline';
import StarRating from '../components/StarRating';
import RateReviewModal from '../components/RateReviewModal';
import { mockMovies } from '../data/mockData';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [showRateModal, setShowRateModal] = useState(false);
  
  // Find movie in mock data
  const movie = mockMovies.find(m => m.id === parseInt(id));
  
  // Check if we're coming from watch-later view
  const fromWatchLater = location.state?.from === 'watch-later';
  
  // Check if we're coming from watch-history view
  const fromWatchHistory = location.state?.from === 'watch-history';

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div>
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" aria-hidden="true" />
        Back
      </button>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Movie poster */}
        <div className="lg:col-span-1">
          <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-200">
            {movie.poster ? (
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-center object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-200">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>
        </div>

        {/* Movie details */}
        <div className="mt-6 lg:mt-0 lg:col-span-2">
          <h1 className="text-3xl font-extrabold text-gray-900">{movie.title}</h1>
          
          <div className="mt-2 flex items-center">
            <StarRating rating={movie.rating} />
            <span className="ml-2 text-sm text-gray-500">({movie.rating}/5)</span>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Release Date</h2>
              <p className="mt-1 text-sm text-gray-900">{movie.releaseDate}</p>
            </div>
            
            <div>
              <h2 className="text-sm font-medium text-gray-500">IMDB Rating</h2>
              <p className="mt-1 text-sm text-gray-900">{movie.imdbRating}/10</p>
            </div>
            
            <div>
              <h2 className="text-sm font-medium text-gray-500">Genres</h2>
              <p className="mt-1 text-sm text-gray-900">{movie.genres.join(', ')}</p>
            </div>
            
            <div>
              <h2 className="text-sm font-medium text-gray-500">Available On</h2>
              <div className="mt-1 flex space-x-2">
                {movie.streamingServices.map(service => (
                  <span
                    key={service}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <h2 className="text-sm font-medium text-gray-500">Cast</h2>
              <p className="mt-1 text-sm text-gray-900">{movie.cast.join(', ')}</p>
            </div>
            
            <div>
              <h2 className="text-sm font-medium text-gray-500">Director</h2>
              <p className="mt-1 text-sm text-gray-900">{movie.director}</p>
            </div>
            
            <div>
              <h2 className="text-sm font-medium text-gray-500">Writer</h2>
              <p className="mt-1 text-sm text-gray-900">{movie.writer}</p>
            </div>
            
            {movie.recognition && (
              <div className="sm:col-span-2">
                <h2 className="text-sm font-medium text-gray-500">Recognition</h2>
                <p className="mt-1 text-sm text-gray-900">{movie.recognition}</p>
              </div>
            )}
            
            {fromWatchHistory && movie.dateWatched && (
              <div>
                <h2 className="text-sm font-medium text-gray-500">Date Watched</h2>
                <p className="mt-1 text-sm text-gray-900">{movie.dateWatched}</p>
              </div>
            )}
          </div>
          
          <div className="mt-8 flex space-x-4">
            {!movie.categories.includes('watchLater') && (
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                Add to Watch Later
              </button>
            )}
            
            {fromWatchLater && (
              <button
                type="button"
                onClick={() => setShowRateModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <ClockIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                Rate Movie
              </button>
            )}
            
            {!movie.categories.includes('watched') && movie.categories.includes('watchLater') && (
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <CheckIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                Mark as Watched
              </button>
            )}
          </div>
        </div>
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