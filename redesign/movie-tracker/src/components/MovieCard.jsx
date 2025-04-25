// src/components/MovieCard.jsx
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

function MovieCard({ movie }) {
  const cardStyle = {
    backgroundColor: 'var(--bsky-bg-secondary)',
    border: '1px solid var(--bsky-border)',
    borderRadius: '0.75rem',
    transition: 'all 0.2s',
    overflow: 'hidden',
  };

  const imgContainerStyle = {
    backgroundColor: 'var(--bsky-bg-tertiary)',
  };

  const titleStyle = {
    color: 'var(--bsky-text-primary)',
    fontWeight: '500',
  };

  const platformTagStyle = {
    backgroundColor: 'var(--bsky-bg-tertiary)',
    color: 'var(--bsky-text-secondary)',
  };

  return (
    <div style={cardStyle} className="group hover:border-[var(--bsky-accent-blue)] shadow-lg">
      <div style={imgContainerStyle} className="w-full aspect-[2/3] relative overflow-hidden">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span style={{ color: 'var(--bsky-text-muted)' }}>No Image</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 style={titleStyle} className="text-sm truncate">{movie.title}</h3>
        <div className="mt-1">
          <StarRating rating={movie.rating} />
        </div>
        {movie.streamingServices && (
          <div className="mt-2 flex flex-wrap gap-1">
            {movie.streamingServices.map(service => (
              <span 
                key={service} 
                style={platformTagStyle} 
                className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium"
              >
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