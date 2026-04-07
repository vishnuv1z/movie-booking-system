import Navbar from '../components/Navbar';
import BannerCarousel from '../components/BannerCarousel';
import MovieSection from '../components/MovieSection';

const movies = [
  {
    id: 1,
    title: "Dune: Part Two",
    language: "English",
    duration: "2h 46m",
    genre: "Sci-Fi",
    rating: "8.5",
    year: "2024",
    poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
  },
  {
    id: 2,
    title: "Oppenheimer",
    language: "English",
    duration: "3h 0m",
    genre: "Drama",
    rating: "8.9",
    year: "2023",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
  },
  {
    id: 3,
    title: "Kalki 2898 AD",
    language: "Telugu",
    duration: "3h 1m",
    genre: "Action",
    rating: "7.2",
    year: "2024",
    poster: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Kalki_2898_AD.jpg/250px-Kalki_2898_AD.jpg",
  },
  {
    id: 4,
    title: "Deadpool & Wolverine",
    language: "English",
    duration: "2h 7m",
    genre: "Action",
    rating: "7.8",
    year: "2024",
    poster: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
  },
  {
    id: 5,
    title: "Civil War",
    language: "English",
    duration: "1h 49m",
    genre: "Thriller",
    rating: "7.4",
    year: "2024",
    poster: "https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg",
  },
  {
    id: 6,
    title: "Alien: Romulus",
    language: "English",
    duration: "1h 59m",
    genre: "Horror",
    rating: "7.3",
    year: "2024",
    poster: "https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
  },
  {
    id: 7,
    title: "Inside Out 2",
    language: "English",
    duration: "1h 40m",
    genre: "Animation",
    rating: "7.8",
    year: "2024",
    poster: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
  },
  {
    id: 8,
    title: "Joker: Folie à Deux",
    language: "English",
    duration: "2h 18m",
    genre: "Drama",
    rating: "5.4",
    year: "2024",
    poster: "https://m.media-amazon.com/images/M/MV5BNTRlNmU1NzEtODNkNC00ZGM3LWFmNzQtMjBlMWRiYTcyMGRhXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 9,
    title: "The Brutalist",
    language: "English",
    duration: "3h 35m",
    genre: "Drama",
    rating: "8.3",
    year: "2024",
    poster: "https://m.media-amazon.com/images/I/91MIC1j6kaL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 10,
    title: "Wicked",
    language: "English",
    duration: "2h 40m",
    genre: "Musical",
    rating: "8.0",
    year: "2024",
    poster: "https://m.media-amazon.com/images/M/MV5BOWMwYjYzYmMtMWQ2Ni00NWUwLTg2MzAtYzkzMDBiZDIwOTMwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-surface text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Banner Carousel */}
        <section className="mb-12 md:mb-16">
          <BannerCarousel />
        </section>

        {/* Recommended Movies Section */}
        <section>
          <MovieSection 
            title="Recommended Movies" 
            movies={movies.slice(0, 8)} 
            showSeeAll={true}
          />
        </section>

        {/* Popular This Week Section */}
        <section className="mt-12 md:mt-16">
          <MovieSection 
            title="Popular This Week" 
            movies={movies.slice(2, 10)} 
            showSeeAll={true}
          />
        </section>

        {/* Upcoming Section */}
        <section className="mt-12 md:mt-16">
          <MovieSection 
            title="Coming Soon" 
            movies={movies.slice(4, 10)} 
            showSeeAll={true}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 mt-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-dark rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
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
