import { useState, useEffect } from 'react';

const SCREEN_TYPES = ['Standard', 'Premium', 'IMAX', '4DX'];

export default function ScreenForm({ screen, theatreId, onSubmit, onClose }) {
  const [form, setForm] = useState({
    name: '',
    screenType: 'Standard',
    rows: 8,
    cols: 12,
    theatre: theatreId || '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (screen) {
      setForm({
        name: screen.name || '',
        screenType: screen.screenType || 'Standard',
        rows: screen.rows || 8,
        cols: screen.cols || 12,
        theatre: screen.theatre?._id || screen.theatre || theatreId || '',
      });
    }
  }, [screen, theatreId]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Screen name is required';
    if (form.rows < 1 || form.rows > 26) errs.rows = 'Rows must be 1-26';
    if (form.cols < 1 || form.cols > 30) errs.cols = 'Columns must be 1-30';
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
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const totalSeats = form.rows * form.cols;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {screen ? 'Edit Screen' : 'Add New Screen'}
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
          {/* Screen Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Screen Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Screen 1, IMAX Hall"
              className={`w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 border-2 transition-all focus:outline-none ${
                errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-primary'
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Screen Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Screen Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SCREEN_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, screenType: type }))}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    form.screenType === type
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Rows & Columns */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Rows <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="rows"
                value={form.rows}
                onChange={handleChange}
                min="1"
                max="26"
                className={`w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-2 transition-all focus:outline-none ${
                  errors.rows ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-primary'
                }`}
              />
              {errors.rows && <p className="mt-1 text-sm text-red-500">{errors.rows}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Columns <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="cols"
                value={form.cols}
                onChange={handleChange}
                min="1"
                max="30"
                className={`w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-2 transition-all focus:outline-none ${
                  errors.cols ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-primary'
                }`}
              />
              {errors.cols && <p className="mt-1 text-sm text-red-500">{errors.cols}</p>}
            </div>
          </div>

          {/* Seat Preview */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Seat Layout Preview</span>
              <span className="text-sm font-bold text-primary">{totalSeats} total seats</span>
            </div>
            <div className="flex justify-center mb-3">
              <div className="w-3/4 h-2 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 dark:from-gray-500 dark:via-gray-400 dark:to-gray-500 rounded-full" />
            </div>
            <p className="text-center text-xs text-gray-400 mb-3">SCREEN</p>
            <div className="flex flex-col items-center gap-0.5 max-h-32 overflow-y-auto">
              {Array.from({ length: Math.min(form.rows, 10) }, (_, r) => (
                <div key={r} className="flex gap-0.5">
                  <span className="w-4 text-xs text-gray-400 text-right mr-1">
                    {String.fromCharCode(65 + r)}
                  </span>
                  {Array.from({ length: Math.min(form.cols, 20) }, (_, c) => (
                    <div
                      key={c}
                      className="w-3 h-3 rounded-sm bg-primary/30 border border-primary/50"
                    />
                  ))}
                  {form.cols > 20 && <span className="text-xs text-gray-400 ml-1">+{form.cols - 20}</span>}
                </div>
              ))}
              {form.rows > 10 && (
                <p className="text-xs text-gray-400 mt-1">+{form.rows - 10} more rows</p>
              )}
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
              {screen ? 'Save Changes' : 'Add Screen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
