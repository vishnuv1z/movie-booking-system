import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CastCard from '../components/CastCard';
import ReviewCard from '../components/ReviewCard';

const castData = [
  { id: 1, name: "Timothée Chalamet", role: "Actor", image: "https://image.tmdb.org/t/p/w200/BE2iGtFMbyZ0FBnYkgVMni7nnOB.jpg" },
  { id: 2, name: "Zendaya", role: "Actor", image: "https://image.tmdb.org/t/p/w200/tylFqbniPcZOcVgOGkDFPMd3CUp.jpg" },
  { id: 3, name: "Austin Butler", role: "Actor", image: "https://image.tmdb.org/t/p/w200/yU0MJRBgEFZROvUscoF1CaYmquo.jpg" },
  { id: 4, name: "Florence Pugh", role: "Actor", image: "https://image.tmdb.org/t/p/w200/6bBUwJnlFIddGONMbXP3MqFN2mg.jpg" },
  { id: 5, name: "Josh Brolin", role: "Actor", image: "https://image.tmdb.org/t/p/w200/sX2aySEpCMlSMSCelt7eO5HaXow.jpg" },
  { id: 6, name: "Javier Bardem", role: "Actor", image: "https://image.tmdb.org/t/p/w200/IShnFg6ijfE0FMil87lEIZKFUm.jpg" },
  { id: 7, name: "Denis Villeneuve", role: "Director", image: "https://image.tmdb.org/t/p/w200/zdDx9Xs93UIrJFWYApYR28J8M6b.jpg" },
  { id: 8, name: "Rebecca Ferguson", role: "Actor", image: "https://image.tmdb.org/t/p/w200/lJloTOheuQSirSLXlaNoVnqBNHf.jpg" },
];

const reviewsData = [
  { id: 1, userName: "Alex Johnson", rating: 5, comment: "An absolute masterpiece! The cinematography, score, and performances are all breathtaking. This is cinema at its finest.", date: "March 15, 2024" },
  { id: 2, userName: "Sarah Miller", rating: 4.5, comment: "Visually stunning and emotionally gripping. A powerhouse performance from the lead cast. The scale of this film is unmatched.", date: "March 10, 2024" },
  { id: 3, userName: "Raj Patel", rating: 4, comment: "A worthy addition that expands the story in every way. The score is haunting and beautiful. Only wish it was a bit longer!", date: "March 8, 2024" },
  { id: 4, userName: "Emily Chen", rating: 4.5, comment: "Worth every penny of the IMAX ticket price. Amazing chemistry between the leads. Can't wait for more!", date: "March 5, 2024" },
];

// ─── Component ───────────────────────────────────────────────
export default function MovieDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Scroll to top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`http://localhost:5000/api/movies/${id}`);
        if (!res.ok) throw new Error('Movie not found');
        const data = await res.json();
        setMovieData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-surface">
        <Navbar />
        <div className="relative h-[320px] sm:h-[400px] md:h-[480px] lg:h-[520px] bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-72 mb-4 animate-pulse" />
          <div className="flex gap-2 mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="h-7 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            ))}
          </div>
          <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-6 animate-pulse" />
          <div className="h-12 w-40 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  // Error / not found state
  if (error || !movieData) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-surface">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
          <p className="text-gray-600 dark:text-gray-400 text-lg">Movie not found. Please select a movie from the home page.</p>
          <Link to="/" className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  // Use coverPhoto for the banner, fall back to poster
  const bannerImage = movieData.coverPhoto || movieData.poster;

  // Format duration from minutes to "Xh Ym"
  const formatDuration = (minutes) => {
    if (!minutes) return '';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  // Extract year from releaseDate
  const movieYear = movieData.releaseDate
    ? new Date(movieData.releaseDate).getFullYear()
    : '';

  const handleBookNow = () => {
    navigate('/showtimes', {
      state: {
        movie: {
          id: movieData._id,
          title: movieData.title,
          language: movieData.language,
          duration: formatDuration(movieData.duration),
          genre: movieData.genre,
          rating: movieData.rating,
          year: movieYear,
          poster: movieData.poster,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-surface text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      {/* ─── Hero Banner ──────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden">
        {/* Banner Image */}
        <div className="relative h-[320px] sm:h-[400px] md:h-[480px] lg:h-[520px]">
          <img
            src={bannerImage}
            alt={movieData.title}
            className="w-full h-full object-cover object-top"
          />
          {/* Multi-layer gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent dark:from-dark-surface dark:via-dark-surface/30 dark:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-transparent to-transparent dark:from-dark-surface/70 dark:via-transparent dark:to-transparent" />
        </div>

        {/* ─── Movie Info Overlay ─────────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
              {/* Poster Card */}
              <div className="hidden md:block flex-shrink-0 w-44 lg:w-52 -mt-32 relative z-10">
                <div className="rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/20 dark:ring-gray-700/40">
                  <img
                    src={movieData.poster}
                    alt={movieData.title}
                    className="w-full aspect-[2/3] object-cover"
                  />
                </div>
              </div>

              {/* Text Details */}
              <div className="flex-1 min-w-0 pt-2">
                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 drop-shadow-sm">
                  {movieData.title}
                </h1>

                {/* Meta tags */}
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    {movieData.rating}
                  </span>
                  {movieData.certificate && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300">
                      {movieData.certificate}
                    </span>
                  )}
                  {movieData.language && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300">
                      {movieData.language}
                    </span>
                  )}
                  {movieData.duration && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300">
                      {formatDuration(movieData.duration)}
                    </span>
                  )}
                  {movieData.genre && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300">
                      {movieData.genre}
                    </span>
                  )}
                  {movieYear && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300">
                      {movieYear}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mb-6">
                  {movieData.description}
                </p>

                {/* Book Now */}
                <button
                  id="book-now-btn"
                  onClick={handleBookNow}
                  className="inline-flex justify-center items-center gap-2 w-full sm:w-auto px-8 py-3.5 sm:py-3 bg-primary hover:bg-primary-dark text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Content ─────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-12 md:space-y-16">

        {/* ─── Cast & Crew ────────────────────────────────────── */}
        <section id="cast-crew-section">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Cast & Crew
            </h2>
            <span className="text-sm text-primary font-medium cursor-pointer hover:underline">
              See All
            </span>
          </div>

          {/* Horizontal Scroll */}
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {castData.map((person) => (
              <CastCard key={person.id} person={person} />
            ))}
          </div>
        </section>

        {/* ─── Divider ────────────────────────────────────────── */}
        <hr className="border-gray-200 dark:border-gray-700/60" />

        {/* ─── Reviews ────────────────────────────────────────── */}
        <section id="reviews-section">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Reviews
              </h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light">
                {reviewsData.length}
              </span>
            </div>
            <button className="text-sm text-primary font-medium hover:underline">
              Write a Review
            </button>
          </div>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviewsData.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      </main>

      {/* ─── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300 mt-auto">
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
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Browse Movies</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">My Bookings</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Theaters</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">My Account</a></li>
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
