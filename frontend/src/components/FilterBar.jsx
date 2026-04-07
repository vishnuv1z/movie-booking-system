import { useState } from 'react';

export default function FilterBar({ filters, onFilterChange }) {
  const [showFilters, setShowFilters] = useState(false);

  const languages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'];
  const formats = ['2D', '3D', 'IMAX', '4DX'];
  const timeRanges = ['Morning (6AM-12PM)', 'Afternoon (12PM-4PM)', 'Evening (4PM-8PM)', 'Night (8PM+)'];
  const priceRanges = ['₹150-₹250', '₹250-₹350', '₹350-₹500', '₹500+'];

  const handleLanguageChange = (lang) => {
    const updatedLangs = filters.languages.includes(lang)
      ? filters.languages.filter(l => l !== lang)
      : [...filters.languages, lang];
    onFilterChange({ ...filters, languages: updatedLangs });
  };

  const handleFormatChange = (format) => {
    const updatedFormats = filters.formats.includes(format)
      ? filters.formats.filter(f => f !== format)
      : [...filters.formats, format];
    onFilterChange({ ...filters, formats: updatedFormats });
  };

  const handleTimeChange = (time) => {
    const updatedTimes = filters.timeRanges.includes(time)
      ? filters.timeRanges.filter(t => t !== time)
      : [...filters.timeRanges, time];
    onFilterChange({ ...filters, timeRanges: updatedTimes });
  };

  const handlePriceChange = (price) => {
    const updatedPrices = filters.priceRanges.includes(price)
      ? filters.priceRanges.filter(p => p !== price)
      : [...filters.priceRanges, price];
    onFilterChange({ ...filters, priceRanges: updatedPrices });
  };

  return (
    <>
      {/* Filter Toggle Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="mb-6 w-full px-4 py-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-between hover:border-primary dark:hover:border-primary transition-colors"
      >
        <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters {filters.languages.length + filters.formats.length + filters.timeRanges.length + filters.priceRanges.length > 0 && `(${filters.languages.length + filters.formats.length + filters.timeRanges.length + filters.priceRanges.length})`}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {/* Filter Panels */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {/* Language Filter */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Language</h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    filters.languages.includes(lang)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Format Filter */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Format</h3>
            <div className="flex flex-wrap gap-2">
              {formats.map((format) => (
                <button
                  key={format}
                  onClick={() => handleFormatChange(format)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    filters.formats.includes(format)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>

          {/* Time Filter */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Time</h3>
            <div className="space-y-1">
              {timeRanges.map((time) => (
                <label key={time} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.timeRanges.includes(time)}
                    onChange={() => handleTimeChange(time)}
                    className="w-3 h-3 rounded border-gray-300 text-primary cursor-pointer"
                  />
                  <span className="text-xs text-gray-700 dark:text-gray-300">{time}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Price</h3>
            <div className="space-y-1">
              {priceRanges.map((price) => (
                <label key={price} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.priceRanges.includes(price)}
                    onChange={() => handlePriceChange(price)}
                    className="w-3 h-3 rounded border-gray-300 text-primary cursor-pointer"
                  />
                  <span className="text-xs text-gray-700 dark:text-gray-300">{price}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
