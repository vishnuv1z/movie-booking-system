import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SeatSelectionTop from '../components/SeatSelectionTop';
import SeatGrid from '../components/SeatGrid';
import SeatLegend from '../components/SeatLegend';

export default function SeatSelectionPage() {
  const location = useLocation();
  const { movie, theatre, showtime, date } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!movie || !theatre || !showtime || !date) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-surface">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">Session expired. Please select a showtime again.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleProceedToPay = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    alert(`Proceeding to payment for seats: ${selectedSeats.join(', ')}\nMovie: ${movie.title}\nTheatre: ${theatre.name}\nTime: ${showtime.time}`);
    // In a real app, this would navigate to payment page
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-surface pb-32">
      <Navbar />
      <SeatSelectionTop movie={movie} theatre={theatre} showtime={showtime} date={date} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Seat Grid */}
        <div className="mb-8">
          <SeatGrid selectedSeats={selectedSeats} onSeatChange={setSelectedSeats} />
        </div>

        {/* Seat Legend */}
        <div className="mb-8">
          <SeatLegend />
        </div>
      </div>

      {/* Fixed Bottom Payment Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {selectedSeats.length === 0
                ? 'Select seats to proceed'
                : `${selectedSeats.length} seat${selectedSeats.length > 1 ? 's' : ''} selected`}
            </p>
            {selectedSeats.length > 0 && (
              <p className="font-bold text-lg text-primary">
                ₹{selectedSeats.reduce((sum) => sum + 200, 0)}
              </p>
            )}
          </div>

          <button
            onClick={handleProceedToPay}
            disabled={selectedSeats.length === 0}
            className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
}
