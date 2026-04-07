import { useNavigate } from 'react-router-dom';

export default function SeatSelectionTop({ movie, theatre, showtime, date }) {
  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Movie Info */}
        <div className="flex-1 mx-4">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <h2 className="font-bold text-gray-900 dark:text-white">{movie?.title}</h2>
            <span className="text-gray-600 dark:text-gray-400">•</span>
            <span className="text-gray-600 dark:text-gray-400">{theatre?.name}</span>
            <span className="text-gray-600 dark:text-gray-400">•</span>
            <span className="text-gray-600 dark:text-gray-400">{formatDate(date)}</span>
            <span className="text-gray-600 dark:text-gray-400">•</span>
            <span className="font-semibold text-primary">{showtime?.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
