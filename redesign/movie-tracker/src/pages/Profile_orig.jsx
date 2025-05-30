// src/pages/Profile.jsx
import { PencilIcon, ShareIcon } from '@heroicons/react/24/outline';
import StreamingPlatformLogo from '../components/StreamingPlatformLogo';

function Profile() {
  // Mock user data
  const user = {
    name: 'Jane Smith',
    reviewCount: 42,
    preferredPlatforms: ['Netflix', 'Disney+', 'Prime Video', 'Hulu', 'HBO Max'],
    favoriteGenres: ['Sci-Fi', 'Drama', 'Comedy'],
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl text-nowrap font-bold text-gray-900">{user.name}</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{user.reviewCount} Reviews</p>
          </div>
          
        </div>
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PencilIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              Edit Profile
            </button>
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ShareIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              Share Profile
            </button>
          </div>
        
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Preferred Streaming Platforms</h2>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {user.preferredPlatforms.map(platform => (
              <StreamingPlatformLogo
                key={platform}
                platform={platform}
                className="aspect-square"
              />
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Favorite Genres</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {user.favoriteGenres.map(genre => (
              <span
                key={genre}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Activity</h2>
          <div className="mt-4">
            <p className="text-gray-500 text-sm">Recent activity will appear here...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;