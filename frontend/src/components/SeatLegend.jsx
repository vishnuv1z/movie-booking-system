export default function SeatLegend() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Available */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg border-2 border-primary dark:border-primary"></div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Available</span>
      </div>

      {/* Selected */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary dark:bg-primary"></div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Selected</span>
      </div>

      {/* Sold */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gray-400 dark:bg-gray-600"></div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sold</span>
      </div>

      {/* Fast Filling */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg border-2 border-yellow-500 dark:border-yellow-400"></div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Fast Filling</span>
      </div>
    </div>
  );
}
