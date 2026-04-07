import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DateSelector from '../components/DateSelector';
import FilterBar from '../components/FilterBar';
import TheatreCard from '../components/TheatreCard';

export default function ShowtimesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filters, setFilters] = useState({
    languages: [],
    formats: [],
    timeRanges: [],
    priceRanges: [],
  });

  // Mock theatre data
  const theatres = [
    {
      id: 1,
      name: 'PVR Cinemas',
      location: 'Downtown Mall, City Center',
      facilities: ['IMAX', 'Dolby Atmos', 'Recliner Seats'],
      showtimes: [
        { time: '10:30 AM', available: true, fastFilling: false, nonCancellable: false },
        { time: '01:15 PM', available: true, fastFilling: true, nonCancellable: false },
        { time: '04:30 PM', available: true, fastFilling: false, nonCancellable: false },
        { time: '07:45 PM', available: true, fastFilling: true, nonCancellable: true },
        { time: '10:00 PM', available: false, fastFilling: false, nonCancellable: false },
      ],
    },
    {
      id: 2,
      name: 'INOX Entertainment',
      location: 'Westside Plaza',
      facilities: ['4DX', 'Premium Seating'],
      showtimes: [
        { time: '11:00 AM', available: true, fastFilling: false, nonCancellable: false },
        { time: '02:00 PM', available: true, fastFilling: false, nonCancellable: false },
        { time: '05:15 PM', available: true, fastFilling: true, nonCancellable: false },
        { time: '08:30 PM', available: true, fastFilling: true, nonCancellable: true },
      ],
    },
    {
      id: 3,
      name: 'Cinepolis Gold',
      location: 'East Point Shopping Center',
      facilities: ['Recliner Seats', 'Premium Snacks'],
      showtimes: [
        { time: '12:30 PM', available: true, fastFilling: false, nonCancellable: false },
        { time: '03:45 PM', available: true, fastFilling: false, nonCancellable: false },
        { time: '06:30 PM', available: true, fastFilling: true, nonCancellable: false },
        { time: '09:15 PM', available: true, fastFilling: false, nonCancellable: false },
      ],
    },
    {
      id: 4,
      name: 'Carnival Cinemas',
      location: 'North Square Mall',
      facilities: ['IMAX', 'Atmos'],
      showtimes: [
        { time: '11:45 AM', available: true, fastFilling: false, nonCancellable: false },
        { time: '02:30 PM', available: false, fastFilling: false, nonCancellable: false },
        { time: '05:45 PM', available: true, fastFilling: true, nonCancellable: true },
        { time: '08:00 PM', available: true, fastFilling: true, nonCancellable: false },
      ],
    },
  ];

  const handleSelectShowtime = (theatre, showtime) => {
    navigate('/seat-selection', {
      state: {
        movie,
        theatre,
        showtime,
        date: selectedDate.toISOString().split('T')[0],
      },
    });
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-surface">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">Movie not found. Please select a movie first.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-surface">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Movie Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{movie.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>{movie.language}</span>
            <span>•</span>
            <span>{movie.duration}</span>
            <span>•</span>
            <span>{movie.genre}</span>
          </div>
        </div>

        {/* Date Selector */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">Select Date</h2>
          <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </div>

        {/* Filter Bar */}
        <div className="mb-6">
          <FilterBar filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Theatres List */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">Available Theatres</h2>
          <div className="space-y-4">
            {theatres.map((theatre) => (
              <TheatreCard
                key={theatre.id}
                theatre={theatre}
                onSelectShowtime={handleSelectShowtime}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
