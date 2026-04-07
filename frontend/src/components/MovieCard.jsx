import { useNavigate } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { title, language, duration, genre, rating, poster, year } = movie;

  const handleBookNow = () => {
    navigate('/showtimes', { state: { movie } });
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col flex-shrink-0 w-40 md:w-44 lg:w-48">

      {/* Poster */}
      <div className="relative overflow-hidden aspect-[2/3]">
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
          <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          {rating}
        </div>

        {/* Genre badge */}
        <div className="absolute top-3 left-3 bg-primary/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {genre}
        </div>

        {/* Year on bottom of poster */}
        <div className="absolute bottom-3 left-3 text-gray-300 text-xs font-medium bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
          {year}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 gap-3">

        {/* Title */}
        <h3 className="text-gray-900 dark:text-white font-bold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>

        {/* Meta info */}
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" clipRule="evenodd" />
            </svg>
            {language}
          </span>
          <span className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full" />
          <span className="flex items-center gap-1 line-clamp-1">
            <svg className="w-3.5 h-3.5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00-.447.894l1.006 5.035a1 1 0 01.952.841h.734a1 1 0 01.951-.841l1.007-5.035A1 1 0 0011 10V6z" clipRule="evenodd" />
            </svg>
            {duration}
          </span>
        </div>

        {/* Book Now button */}
        <button
          onClick={handleBookNow}
          className="mt-auto w-full py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg active:scale-95"
        >
          Book Now
        </button>

      </div>
    </div>
  );
}
