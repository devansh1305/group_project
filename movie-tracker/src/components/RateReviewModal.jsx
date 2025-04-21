// src/components/RateReviewModal.jsx
import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import StarRating from './StarRating';

function RateReviewModal({ movie, onClose }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [dateWatched, setDateWatched] = useState('');

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = () => {
    // In a real app, this would update the movie data
    console.log({ movieId: movie.id, rating, review, dateWatched });
    onClose();
  };

  const handleBackdropClick = (e) => {
    // Close modal when clicking the backdrop, not the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium text-gray-900">Rate and Review</h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="mt-2">
            <p className="text-sm text-gray-500">{movie.title}</p>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
            <StarRating rating={rating} interactive={true} onChange={setRating} />
          </div>
          
          <div className="mt-6">
            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
              Your Review
            </label>
            <textarea
              id="review"
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Your Review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          
          <div className="mt-6">
            <label htmlFor="date-watched" className="block text-sm font-medium text-gray-700 mb-1">
              Date Watched
            </label>
            <input
              type="text"
              id="date-watched"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="MM/DD/YY"
              value={dateWatched}
              onChange={(e) => setDateWatched(e.target.value)}
            />
          </div>
          
          <div className="mt-8">
            <button
              type="button"
              className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleSubmit}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RateReviewModal;