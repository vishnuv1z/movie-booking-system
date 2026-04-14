export default function ReviewCard({ review }) {
  const { userName, rating, comment, date, avatar } = review;

  // Generate star display
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Full star
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        // Half star
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path fill={`url(#half-${i})`} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      } else {
        // Empty star
        stars.push(
          <svg key={i} className="w-4 h-4 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      }
    }
    return stars;
  };

  // Get initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white dark:bg-gray-800/80 rounded-2xl p-5 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700/50 transition-all duration-300 group">
      {/* Header: Avatar + Name + Rating */}
      <div className="flex items-start gap-3.5 mb-3.5">
        {/* Avatar */}
        {avatar ? (
          <img
            src={avatar}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-600 flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-white text-sm font-bold">{getInitials(userName)}</span>
          </div>
        )}

        {/* Name + Date */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
            {userName}
          </h4>
          {date && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{date}</p>
          )}
        </div>

        {/* Rating */}
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <div className="flex items-center gap-0.5">
            {renderStars(rating)}
          </div>
          <span className="text-xs font-bold text-primary">{rating}/5</span>
        </div>
      </div>

      {/* Comment */}
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        {comment}
      </p>
    </div>
  );
}
