// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Recommendations from './pages/Recommendations';
import WatchLater from './pages/WatchLater';
import WatchHistory from './pages/WatchHistory';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="watch-later" element={<WatchLater />} />
          <Route path="watch-history" element={<WatchHistory />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;