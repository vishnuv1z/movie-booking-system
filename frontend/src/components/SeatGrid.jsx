import { useState, useMemo } from 'react';

export default function SeatGrid({ selectedSeats, onSeatChange, theatreLayout = {} }) {
  // Generate seat layout: 10 rows (A-J) x 12 columns per row
  const ROWS = 10;
  const COLS = 12;
  const ROW_LABELS = Array.from({ length: ROWS }, (_, i) => String.fromCharCode(65 + i));

  // Default layout: mix of available and sold seats
  const defaultSeatState = {};
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const seatId = `${ROW_LABELS[row]}${col + 1}`;
      // Random sold seats and vary prices by row
      if (Math.random() > 0.85) {
        defaultSeatState[seatId] = 'sold';
      } else if (row >= 4 && row <= 6 && col >= 4 && col <= 7) {
        // Premium seats in middle section
        defaultSeatState[seatId] = 'available-premium';
      } else {
        defaultSeatState[seatId] = 'available';
      }
    }
  }

  const seatLayout = theatreLayout || defaultSeatState;

  const getSeatPrice = (seatId) => {
    const state = seatLayout[seatId] || 'available';
    if (state === 'available-premium') return 220;
    return 180;
  };

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((sum, seatId) => sum + getSeatPrice(seatId), 0);
  }, [selectedSeats]);

  const handleSeatClick = (seatId) => {
    const state = seatLayout[seatId];
    if (state === 'sold') return;

    if (selectedSeats.includes(seatId)) {
      onSeatChange(selectedSeats.filter(s => s !== seatId));
    } else {
      onSeatChange([...selectedSeats, seatId]);
    }
  };

  const getSeatClass = (seatId) => {
    const state = seatLayout[seatId];
    const isSelected = selectedSeats.includes(seatId);

    if (state === 'sold') {
      return 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-60';
    }

    if (isSelected) {
      return 'bg-primary text-white shadow-lg border-2 border-primary';
    }

    if (state === 'available-premium') {
      return 'border-2 border-yellow-500 dark:border-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 cursor-pointer';
    }

    return 'border-2 border-primary dark:border-primary hover:bg-primary/10 cursor-pointer';
  };

  return (
    <div className="space-y-8">
      {/* Seat Grid */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
        {/* Screen Indicator */}
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent w-full mb-2"></div>
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">SCREEN</p>
          </div>
        </div>

        {/* Seat Grid */}
        <div className="flex justify-center">
          <div className="space-y-3">
            {ROW_LABELS.map((row, rowIdx) => (
              <div key={row} className="flex items-center gap-4">
                {/* Row Label */}
                <span className="w-6 text-center font-bold text-gray-600 dark:text-gray-400 text-sm">
                  {row}
                </span>

                {/* Seats */}
                <div className="flex gap-2">
                  {Array.from({ length: COLS }, (_, colIdx) => {
                    const seatId = `${row}${colIdx + 1}`;
                    return (
                      <button
                        key={seatId}
                        onClick={() => handleSeatClick(seatId)}
                        className={`w-8 h-8 rounded-lg font-semibold text-xs transition-all transform hover:scale-110 ${getSeatClass(
                          seatId
                        )}`}
                        disabled={seatLayout[seatId] === 'sold'}
                        title={`${seatId} - ₹${getSeatPrice(seatId)}`}
                      >
                        {colIdx + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Row Label (Right) */}
                <span className="w-6 text-center font-bold text-gray-600 dark:text-gray-400 text-sm">
                  {row}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selection Summary */}
      {selectedSeats.length > 0 && (
        <div className="bg-gradient-to-r from-primary/10 to-primary-dark/10 dark:from-primary/20 dark:to-primary-dark/20 p-4 rounded-lg border border-primary/20 dark:border-primary/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Selected Seats</p>
              <p className="font-bold text-gray-900 dark:text-white text-lg">
                {selectedSeats.sort().join(', ')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total: {selectedSeats.length} seat(s)</p>
              <p className="font-bold text-xl text-primary">₹{totalPrice}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
