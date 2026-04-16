import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import BannerCarousel from '../components/BannerCarousel';
import MovieSection from '../components/MovieSection';

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/movies');
        if (!res.ok) throw new Error('Failed to fetch movies');
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleAuthLink = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate('/login');
    }
  };

  // Create varied sections from the fetched movies
  const recommendedMovies = movies.slice(0, 8);
  const popularMovies = [...movies].sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0)).slice(0, 8);
  const comingSoon = [...movies].sort((a, b) => new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0)).slice(0, 8);

  // Loading skeleton for movie sections
  const MovieSkeleton = () => (
    <div className="py-8 md:py-12">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6 animate-pulse" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex-shrink-0 w-40 md:w-44 lg:w-48">
            <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-dark-surface text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Banner Carousel */}
        <section className="mb-12 md:mb-16">
          <BannerCarousel />
        </section>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <>
            <MovieSkeleton />
            <MovieSkeleton />
            <MovieSkeleton />
          </>
        )}

        {/* Movie Sections */}
        {!loading && !error && movies.length > 0 && (
          <>
            {/* Recommended Movies Section */}
            <section>
              <MovieSection 
                title="Recommended Movies" 
                movies={recommendedMovies} 
                showSeeAll={true}
              />
            </section>

            {/* Popular This Week Section */}
            <section className="mt-6 md:mt-8">
              <MovieSection 
                title="Popular This Week" 
                movies={popularMovies} 
                showSeeAll={true}
              />
            </section>

            {/* Upcoming Section */}
            <section className="mt-6 md:mt-8">
              <MovieSection 
                title="Coming Soon" 
                movies={comingSoon} 
                showSeeAll={true}
              />
            </section>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && movies.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-1">No movies available</h3>
            <p className="text-sm text-gray-500 dark:text-gray-500">Check back soon for new releases!</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 mt-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-center sm:text-left">
            {/* Brand */}
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-dark rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CB</span>
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">CineBook</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your gateway to premium cinema entertainment
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
              <ul className="flex flex-col items-center sm:items-start space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link to="/" className="hover:text-primary transition-colors">Browse Movies</Link></li>
                <li><button onClick={() => handleAuthLink('/bookings')} className="hover:text-primary transition-colors">My Bookings</button></li>
                <li><button onClick={() => handleAuthLink('/profile')} className="hover:text-primary transition-colors">My Account</button></li>
                {(!isAuthenticated || user?.role === 'theatreOwner' || user?.role === 'admin') && (
                <li className="w-full text-center sm:text-left">
                  <button
                    onClick={() => {
                      if (isAuthenticated && (user?.role === 'theatreOwner' || user?.role === 'admin')) {
                        navigate('/theatre-dashboard');
                      } else {
                        navigate('/theatre-login');
                      }
                    }}
                    className="hover:text-primary transition-colors flex items-center justify-center sm:justify-start gap-1 w-full"
                  >
                    List Your Theatre Shows
                  </button>
                </li>
                )}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Feedback</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2026 CineBook. All rights reserved.
            </p>
            <div className="flex gap-6 sm:gap-4 text-sm text-gray-600 dark:text-gray-400">
              <a href="#" className="hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="hover:text-primary transition-colors">Facebook</a>
              <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
