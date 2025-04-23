// src/components/MovieCard.jsx
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

function MovieCard({ movie }) {
  return (
    <div className="group">
      <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden relative">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-center object-cover group-hover:opacity-75"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-medium text-gray-900 truncate">{movie.title}</h3>
        <div className="mt-1">
          <StarRating rating={movie.rating} />
        </div>
        {movie.streamingServices && (
          <div className="mt-1 flex flex-wrap gap-1">
            {movie.streamingServices.map(service => (
              <span key={service} className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                {service}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;