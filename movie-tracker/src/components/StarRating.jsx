// src/components/StarRating.jsx
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

function StarRating({ rating, interactive = false, onChange, size = 'normal' }) {
  const totalStars = 5;
  const starSize = size === 'small' ? 'h-3 w-3' : 'h-5 w-5';
  
  if (interactive) {
    return (
      <div className="flex">
        {[...Array(totalStars)].map((_, i) => (
          <button
            key={i}
            onClick={() => onChange(i + 1)}
            className="focus:outline-none"
          >
            {i < rating ? (
              <StarIcon className={`${starSize} text-yellow-400`} />
            ) : (
              <StarOutlineIcon className={`${starSize} text-yellow-400`} />
            )}
          </button>
        ))}
      </div>
    );
  }
  
  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, i) => (
        <span key={i}>
          {i < rating ? (
            <StarIcon className={`${starSize} text-yellow-400`} />
          ) : (
            <StarOutlineIcon className={`${starSize} text-gray-300`} />
          )}
        </span>
      ))}
    </div>
  );
}

export default StarRating;