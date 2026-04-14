import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CastCard from '../components/CastCard';
import ReviewCard from '../components/ReviewCard';

// ─── Enriched Movie Details (mock — would come from API) ─────
const enrichedMovieDetails = {
  1: {
    certificate: "PG-13",
    banner: "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
  },
  2: {
    certificate: "R",
    banner: "https://image.tmdb.org/t/p/original/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg",
    description: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II, exploring the moral complexities and consequences of scientific discovery.",
  },
  3: {
    certificate: "UA",
    banner: "https://image.tmdb.org/t/p/original/kkrApCVJmNb3XlhYJPOosu3MNQ3.jpg",
    description: "Set in a futuristic world, Kalki 2898 AD blends mythology and science fiction as a modern avatar rises to protect the world from darkness in a spectacular visual saga.",
  },
  4: {
    certificate: "R",
    banner: "https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
    description: "Deadpool and Wolverine join forces in an irreverent, action-packed adventure that breaks the fourth wall and the boundaries between Marvel universes.",
  },
  5: {
    certificate: "R",
    banner: "https://image.tmdb.org/t/p/original/z21MiDzANhiCutVVIWVBfqJglHb.jpg",
    description: "In the near future, a team of journalists and soldiers races against time to survive as the United States fractures in a brutal civil war across its own territory.",
  },
  6: {
    certificate: "R",
    banner: "https://image.tmdb.org/t/p/original/9SSEUrSqhljBMzRe4aBTh17hYjd.jpg",
    description: "A group of young space colonists encounter the most terrifying life form in the universe while scavenging a derelict space station in this chilling new chapter of the Alien saga.",
  },
  7: {
    certificate: "PG",
    banner: "https://image.tmdb.org/t/p/original/xg27NrXi7VXCGUr7MN75UqLl6Vg.jpg",
    description: "Riley, now a teenager, faces a new set of complex emotions — Anxiety, Envy, Ennui, and Embarrassment — that reshape her sense of self during the turbulent journey of growing up.",
  },
  8: {
    certificate: "R",
    banner: "https://image.tmdb.org/t/p/original/op3cvf9MlCfSTjCIgfSxILqSjBe.jpg",
    description: "Arthur Fleck, now institutionalized at Arkham, finds unexpected love and is drawn into a musical madness that blurs the line between his dual identities.",
  },
  9: {
    certificate: "R",
    banner: "https://image.tmdb.org/t/p/original/aHa2OiJiJGMQMxThRr8M3w1CGHF.jpg",
    description: "A visionary architect escapes post-war Europe and arrives in America to rebuild his life and creative legacy, only to face the cost of ambition and survival.",
  },
  10: {
    certificate: "PG",
    banner: "https://image.tmdb.org/t/p/original/uKb22E0nlzr914bA9KyA5CVCOlV.jpg",
    description: "A young woman discovers she possesses extraordinary magical abilities and forms an unlikely bond before facing the forces that will make them the most famous figures in the Land of Oz.",
  },
};

// ─── Default enriched data fallback ──────────────────────────
const defaultEnriched = {
  certificate: "PG-13",
  banner: "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
  description: "An captivating cinematic experience that pushes the boundaries of storytelling and visual artistry. Discover the magic on the big screen.",
};

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
  const location = useLocation();
  const { id } = useParams();

  // Get movie from route state (passed by MovieCard click)
  const movie = location.state?.movie;

  // Merge with enriched details
  const enriched = enrichedMovieDetails[movie?.id || id] || defaultEnriched;
  const movieData = movie
    ? { ...movie, ...enriched }
    : { id: Number(id), title: "Movie", language: "English", duration: "2h 0m", genre: "Drama", rating: "7.0", year: "2024", poster: enriched.banner, ...enriched };

  // Fallback if no movie data at all
  if (!movie && !enrichedMovieDetails[id]) {
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

  const handleBookNow = () => {
    navigate('/showtimes', {
      state: {
        movie: {
          id: movieData.id,
          title: movieData.title,
          language: movieData.language,
          duration: movieData.duration,
          genre: movieData.genre,
          rating: movieData.rating,
          year: movieData.year,
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
            src={movieData.banner}
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
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300">
                    {movieData.certificate}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300">
                    {movieData.language}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300">
                    {movieData.duration}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300">
                    {movieData.genre}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300">
                    {movieData.year}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mb-6">
                  {movieData.description}
                </p>

                {/* Book Now */}
                <button
                  id="book-now-btn"
                  onClick={handleBookNow}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 active:scale-95"
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
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
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
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2026 CineBook. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
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
