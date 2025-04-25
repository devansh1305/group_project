// src/components/Layout.jsx
import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';

function Layout() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery || 'Harry Potter';
    setSearchQuery(query);
    navigate('/', { state: { searchQuery: query } });
  };

  return (
    <div className="min-h-screen">
      {/* Header with search bar */}
      <header style={{ backgroundColor: 'var(--bsky-bg-secondary)', borderBottom: '1px solid var(--bsky-border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold" style={{ color: 'var(--bsky-accent-blue)' }}>
            FilmJourney
          </Link>
          
          <form onSubmit={handleSearch} className="w-1/2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5" style={{ color: 'var(--bsky-text-muted)' }} aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 rounded-full"
                style={{ 
                  backgroundColor: 'var(--bsky-bg-tertiary)', 
                  color: 'var(--bsky-text-primary)',
                  border: '1px solid var(--bsky-border)'
                }}
                placeholder="Search for movies or shows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          
          <Link to="/profile" style={{ color: 'var(--bsky-text-primary)' }}>
            <UserCircleIcon className="h-8 w-8" aria-hidden="true" />
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;