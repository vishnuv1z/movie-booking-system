import { Suspense } from 'react';
import Navbar from '../components/Navbar';

export default function BookingsPage() {
  const bookings = [
    {
      id: 1,
      movie: "Dune: Part Two",
      theater: "Cinéplex Downtown",
      date: "Apr 15, 2026",
      time: "7:30 PM",
      seats: "A5, A6",
      status: "Confirmed",
    },
    {
      id: 2,
      movie: "Oppenheimer",
      theater: "IMAX Cinema",
      date: "Apr 10, 2026",
      time: "6:00 PM",
      seats: "B12, B13",
      status: "Completed",
    },
  ];

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <div className="min-h-screen bg-white dark:bg-dark-surface transition-colors duration-300">
        <Navbar />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Bookings</h1>
          
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-primary"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {booking.movie}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                      <span className="font-medium">Theater:</span> {booking.theater}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                      <span className="font-medium">Date & Time:</span> {booking.date} at {booking.time}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Seats:</span> {booking.seats}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-4">
                    <div>
                      <span
                        className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                          booking.status === 'Confirmed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors text-sm">
                        View
                      </button>
                      <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors text-sm">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {bookings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No bookings yet</p>
              <a
                href="/"
                className="inline-block mt-4 px-6 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
              >
                Browse Movies
              </a>
            </div>
          )}
        </main>
      </div>
    </Suspense>
  );
}
