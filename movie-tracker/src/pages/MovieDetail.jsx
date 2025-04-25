// src/pages/MovieDetail.jsx
import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeftIcon, PlusIcon, StarIcon as HeroIconStar, ShareIcon } from '@heroicons/react/24/outline';
import StarRating from '../components/StarRating';
import RateReviewModal from '../components/RateReviewModal';
import StreamingPlatformLogo from '../components/StreamingPlatformLogo';
import { mockMovies } from '../data/mockData'; // Ensure mockMovies includes 'review' and 'imdbreviews'

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [showRateModal, setShowRateModal] = useState(false);
  const movie = mockMovies.find(m => m.id === parseInt(id));
  const isInWatchlist = movie?.categories?.includes('watchLater');

  const fromWatchHistory = location.state?.from === 'watch-history';

  if (!movie) {
    return <div className="text-center py-10">Movie not found</div>;
  }

  const releaseYear = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A';

  return (
    // Reduced overall padding pb-12
    <div className="pb-12 bg-gradient-to-br from-gray-100 to-blue-50 min-h-screen font-sans">
       {/* Reduced container padding px-4 */}
      <div className="container mx-auto px-4">
        {/* Reduced margins mt-5 mb-3 */}
        <button
          onClick={() => navigate(-1)}
          className="mt-5 mb-3 inline-flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out group"
        >
          <ArrowLeftIcon className="mr-1.5 h-4 w-4 text-gray-400 group-hover:text-indigo-500" aria-hidden="true" />
          Back
        </button>

        {/* Main Content Area - Reduced gap-6 */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

          {/* Left Column: Poster & Actions */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
             {/* Removed hover scale effect for less movement */}
            <div className="aspect-[2/3] bg-gray-300 rounded-xl overflow-hidden shadow-xl">
              {movie.poster ? (
                <img
                  src={movie.poster}
                  alt={`Poster for ${movie.title}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
                  No Poster
                </div>
              )}
            </div>
             {/* Action buttons - Reduced margins mt-4, gap-2 */}
             <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-2">
                {/* Slightly smaller buttons px-4 py-2 */}
               <button
                 type="button"
                 className={`flex items-center justify-center px-4 py-2 border border-transparent text-xs sm:text-sm font-semibold rounded-full shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                   isInWatchlist
                     ? 'bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-500 cursor-default'
                     : 'text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:ring-indigo-500 transform hover:-translate-y-0.5'
                 }`}
                 disabled={isInWatchlist}
               >
                 <PlusIcon className={`-ml-0.5 mr-1.5 h-4 w-4 ${isInWatchlist ? 'text-gray-500' : ''}`} aria-hidden="true" />
                 {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
               </button>
               <button
                 type="button"
                 onClick={() => setShowRateModal(true)}
                 className="flex items-center justify-center px-4 py-2 border border-transparent text-xs sm:text-sm font-semibold rounded-full shadow-md text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transform hover:-translate-y-0.5 transition duration-200 ease-in-out"
               >
                 <HeroIconStar className="-ml-0.5 mr-1.5 h-4 w-4" aria-hidden="true" />
                 Rate / Review
               </button>
               <button
                 type="button"
                  className="flex items-center justify-center px-4 py-2 border border-transparent text-xs sm:text-sm font-semibold rounded-full shadow-md text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transform hover:-translate-y-0.5 transition duration-200 ease-in-out"
                >
                  <ShareIcon className="-ml-0.5 mr-1.5 h-4 w-4" aria-hidden="true" />
                  Share
                </button>
             </div>
          </div>

          {/* Right Column: Details & Reviews */}
          <div className="w-full lg:w-2/3">
            {/* Movie Title - Reduced margin mb-1 */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-0.5">
              {movie.title}
            </h1>
             {/* Reduced margin mb-3 */}
            <p className="text-lg text-gray-500 mb-3 font-light">({releaseYear})</p>

            {/* Details Section - Reduced padding p-4, mb-4, gap-y-3 */}
            <div className="bg-white shadow-lg rounded-xl p-4 mb-4 ring-1 ring-gray-200">
               {/* Reduced margin mb-3, pb-2 */}
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">Details</h2>
               {/* Reduced gaps gap-x-6 gap-y-3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                {/* Reduced margin mb-0.5 */}
                <div className="flex flex-col">
                  <dt className="font-semibold text-gray-500 text-xs mb-0.5">Genres</dt>
                  <dd className="text-gray-700 flex flex-wrap gap-1.5">
                    {movie.genres.map(genre => (
                      <span
                        key={genre}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {genre}
                      </span>
                    ))}
                  </dd>
                </div>
                 <div className="flex flex-col">
                   <dt className="font-semibold text-gray-500 text-xs mb-0.5">Director</dt>
                   <dd className="text-gray-700">{movie.director}</dd>
                 </div>
                 <div className="flex flex-col">
                   <dt className="font-semibold text-gray-500 text-xs mb-0.5">Cast</dt>
                   <dd className="text-gray-700 leading-snug">{movie.cast.join(', ')}</dd> {/* Added leading-snug */}
                 </div>
                 <div className="flex flex-col">
                   <dt className="font-semibold text-gray-500 text-xs mb-0.5">Writer</dt>
                   <dd className="text-gray-700">{movie.writer}</dd>
                 </div>
                 <div className="flex flex-col">
                  <dt className="font-semibold text-gray-500 text-xs mb-0.5">Release Date</dt>
                  <dd className="text-gray-700">{movie.releaseDate}</dd>
                 </div>
                {movie.recognition && (
                  <div className="flex flex-col">
                    <dt className="font-semibold text-gray-500 text-xs mb-0.5">Recognition</dt>
                    <dd className="text-gray-700">{movie.recognition}</dd>
                  </div>
                )}
                {fromWatchHistory && movie.dateWatched && (
                  <div className="flex flex-col">
                    <dt className="font-semibold text-gray-500 text-xs mb-0.5">Date Watched</dt>
                    <dd className="text-gray-700">{movie.dateWatched}</dd>
                  </div>
                )}
                 {/* Available On Section - Added flex-wrap and adjusted logo size */}
                 <div className="md:col-span-2 flex flex-col mt-1">
                   <dt className="font-semibold text-gray-500 text-xs mb-1">Available On</dt>
                   {/* Added flex-wrap to allow logos to wrap */}
                   <dd className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                     {movie.streamingServices.map(service => (
                       <StreamingPlatformLogo
                         key={service}
                         platform={service}
                         // Explicit height and width, adjust as needed. Removed transition.
                         className="h-10 w-20"
                       />
                     ))}
                   </dd>
                 </div>
              </div>
            </div>

            {/* Ratings & Reviews Section - Reduced padding p-4 */}
            <div className="bg-white shadow-lg rounded-xl p-4 ring-1 ring-gray-200">
               {/* Reduced margin mb-3, pb-2 */}
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">Ratings & Reviews</h2>

              {/* Combined Ratings - Reduced margin mb-3, gap-3 */}
              <div className="mb-3 flex items-center gap-3 flex-wrap">
                  <div className="flex items-center">
                     <span className="text-xs font-medium text-gray-600 mr-1.5">Your Rating:</span>
                      {/* Ensure StarRating component can handle size changes if needed */}
                     <StarRating rating={movie.rating} />
                     <span className="ml-1.5 text-xs text-gray-800 font-semibold">({movie.rating}/5)</span>
                  </div>
                 <div className="flex items-center">
                    <span className="text-xs font-medium text-gray-600 mr-1.5">IMDb:</span>
                    <span className="text-xs text-gray-800 font-semibold">{movie.imdbRating}/10</span>
                 </div>
              </div>

              {/* Combined Reviews - Reduced space-y-3 */}
              {(movie.review || (movie.imdbreviews && movie.imdbreviews.length > 0)) ? (
                <div className="space-y-3">
                  {movie.review && (
                    <div>
                       {/* Reduced margin mb-0.5 */}
                      <h3 className="text-xs font-semibold text-indigo-700 mb-0.5">Your Review:</h3>
                       {/* Reduced padding pl-3 py-1.5 */}
                      <blockquote className="border-l-4 border-indigo-300 pl-3 italic text-gray-700 text-xs bg-indigo-50 py-1.5 rounded-r-md">
                        "{movie.review}"
                      </blockquote>
                    </div>
                  )}
                  {movie.imdbreviews && movie.imdbreviews.length > 0 && (
                    <div>
                       {/* Reduced margin mb-1 */}
                      <h3 className="text-xs font-semibold text-teal-700 mb-1">IMDb User Reviews:</h3>
                       {/* Reduced space-y-2, padding pr-1, max-h-48 */}
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {movie.imdbreviews.map((review, index) => (
                           // Reduced padding pl-3 py-1.5
                          <blockquote key={index} className="border-l-4 border-teal-300 pl-3 italic text-gray-700 text-xs bg-teal-50 py-1.5 rounded-r-md">
                            "{review}"
                             {/* Reduced margin mt-0.5 */}
                            <p className="text-[11px] text-teal-600 mt-0.5 not-italic">- IMDb User</p>
                          </blockquote>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                  // Reduced margin mt-2
                 <p className="text-xs text-gray-500 italic mt-2">No reviews available yet.</p>
              )}
            </div>
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