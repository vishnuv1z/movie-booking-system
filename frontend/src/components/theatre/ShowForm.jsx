import { useState, useEffect } from 'react';

export default function ShowForm({ show, theatreId, screens, movies, onSubmit, onClose }) {
  const [form, setForm] = useState({
    movie: '',
    screen: '',
    showDate: '',
    startTime: '',
    endTime: '',
    price: 200,
    premiumPrice: 350,
    theatre: theatreId || '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (show) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        movie: show.movie?._id || show.movie || '',
        screen: show.screen?._id || show.screen || '',
        showDate: show.showDate ? new Date(show.showDate).toISOString().split('T')[0] : '',
        startTime: show.startTime || '',
        endTime: show.endTime || '',
        price: show.price || 200,
        premiumPrice: show.premiumPrice || 350,
        theatre: show.theatre?._id || show.theatre || theatreId || '',
      });
    }
  }, [show, theatreId]);

  const validate = () => {
    const errs = {};
    if (!form.movie) errs.movie = 'Please select a movie';
    if (!form.screen) errs.screen = 'Please select a screen';
    if (!form.showDate) errs.showDate = 'Show date is required';
    if (!form.startTime) errs.startTime = 'Start time is required';
    if (form.price < 1) errs.price = 'Price must be positive';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSubmit(form);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Auto-calculate end time when movie and start time change
  useEffect(() => {
    if (form.movie && form.startTime) {
      const selectedMovie = movies.find((m) => m._id === form.movie);
      if (selectedMovie?.duration) {
        const [hours, minutes] = form.startTime.split(':').map(Number);
        const totalMin = hours * 60 + minutes + selectedMovie.duration;
        const endH = Math.floor(totalMin / 60) % 24;
        const endM = totalMin % 60;
        const endTime = `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setForm((prev) => ({ ...prev, endTime }));
      }
    }
  }, [form.movie, form.startTime, movies]);

  const selectedMovie = movies.find((m) => m._id === form.movie);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {show ? 'Edit Show' : 'Schedule New Show'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Movie Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Movie <span className="text-red-500">*</span>
            </label>
            <select
              name="movie"
              value={form.movie}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-2 transition-all focus:outline-none ${
                errors.movie ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-primary'
              }`}
            >
              <option value="">Select a movie</option>
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title} ({movie.language} • {movie.duration}min)
                </option>
              ))}
            </select>
            {errors.movie && <p className="mt-1 text-sm text-red-500">{errors.movie}</p>}
          </div>

          {/* Selected Movie Preview */}
          {selectedMovie && (
            <div className="flex items-center gap-3 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/20">
              {selectedMovie.poster && (
                <img
                  src={selectedMovie.poster}
                  alt={selectedMovie.title}
                  className="w-12 h-16 rounded object-cover"
                />
              )}
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedMovie.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {selectedMovie.language} • {selectedMovie.duration} min • {selectedMovie.genre}
                </p>
              </div>
            </div>
          )}

          {/* Screen Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Screen <span className="text-red-500">*</span>
            </label>
            <select
              name="screen"
              value={form.screen}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-2 transition-all focus:outline-none ${
                errors.screen ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-primary'
              }`}
            >
              <option value="">Select a screen</option>
              {screens.map((screen) => (
                <option key={screen._id} value={screen._id}>
                  {screen.name} ({screen.screenType} • {screen.totalSeats || screen.rows * screen.cols} seats)
                </option>
              ))}
            </select>
            {errors.screen && <p className="mt-1 text-sm text-red-500">{errors.screen}</p>}
            {screens.length === 0 && (
              <p className="mt-1 text-sm text-amber-500">No screens available. Add a screen first.</p>
            )}
          </div>

          {/* Show Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Show Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="showDate"
              value={form.showDate}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-2 transition-all focus:outline-none ${
                errors.showDate ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-primary'
              }`}
            />
            {errors.showDate && <p className="mt-1 text-sm text-red-500">{errors.showDate}</p>}
          </div>

          {/* Start Time & End Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Start Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-2 transition-all focus:outline-none ${
                  errors.startTime ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-primary'
                }`}
              />
              {errors.startTime && <p className="mt-1 text-sm text-red-500">{errors.startTime}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                End Time <span className="text-gray-400 text-xs">(auto-calculated)</span>
              </label>
              <input
                type="time"
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-600 focus:border-primary transition-all focus:outline-none"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Standard Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-2 transition-all focus:outline-none ${
                  errors.price ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-primary'
                }`}
              />
              {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Premium Price (₹)
              </label>
              <input
                type="number"
                name="premiumPrice"
                value={form.premiumPrice}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-600 focus:border-primary transition-all focus:outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              {show ? 'Save Changes' : 'Schedule Show'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
