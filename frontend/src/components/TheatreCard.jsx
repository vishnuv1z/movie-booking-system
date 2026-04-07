export default function TheatreCard({ theatre, onSelectShowtime }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-shadow">
      {/* Theatre Header */}
      <div className="mb-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{theatre.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{theatre.location}</p>
        {theatre.facilities && (
          <div className="flex flex-wrap gap-2 mt-3">
            {theatre.facilities.map((facility) => (
              <span key={facility} className="text-xs bg-primary/10 text-primary dark:text-primary px-2 py-1 rounded-full">
                {facility}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Showtimes - Horizontal Layout */}
      <div className="flex flex-wrap gap-2 items-center">
        {theatre.showtimes.map((showtime, idx) => (
          <div key={idx} className="relative group">
            <button
              onClick={() => onSelectShowtime(theatre, showtime)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm whitespace-nowrap ${
                showtime.available
                  ? 'border-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-primary'
                  : 'border-2 border-gray-300 text-gray-400 dark:border-gray-600 cursor-not-allowed opacity-50'
              }`}
              disabled={!showtime.available}
              title={[showtime.fastFilling && 'Fast Filling', showtime.nonCancellable && 'Non-cancellable']
                .filter(Boolean)
                .join(', ')}
            >
              {showtime.time}
            </button>

            {/* Tags Tooltip on Hover */}
            {(showtime.fastFilling || showtime.nonCancellable) && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex gap-1 flex-wrap justify-center bg-gray-900 dark:bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                {showtime.fastFilling && <span>Fast Filling</span>}
                {showtime.nonCancellable && <span>Non-cancellable</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
