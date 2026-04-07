import { useRef, useState, useEffect } from 'react';

export default function DateSelector({ selectedDate, onDateChange }) {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Generate next 7 days starting from today
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <div className="mb-6">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {dates.map((date, idx) => {
          const isSelected = selectedDate?.toDateString() === date.toDateString();
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dayNum = date.getDate();
          const monthName = date.toLocaleDateString('en-US', { month: 'short' });
          const isToday = new Date().toDateString() === date.toDateString();

          return (
            <button
              key={idx}
              onClick={() => onDateChange(date)}
              className={`flex flex-col items-center gap-1 px-4 py-3 rounded-lg whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                isSelected
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span className="text-xs font-semibold">{dayName}</span>
              <span className="text-sm font-bold">{dayNum}</span>
              <span className="text-xs opacity-70">{monthName}</span>
              {isToday && <span className="text-xs font-bold text-primary dark:text-primary">Today</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
