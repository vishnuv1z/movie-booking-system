import { useState, useEffect } from 'react';

const AMENITY_OPTIONS = [
  'Parking', 'Food Court', 'Wheelchair Access', 'Dolby Sound',
  'Recliner Seats', 'IMAX', '3D', 'Restrooms', 'WiFi', 'AC',
];

export default function TheatreForm({ theatre, onSubmit, onClose }) {
  const [form, setForm] = useState({
    name: '',
    location: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    amenities: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (theatre) {
      setForm({
        name: theatre.name || '',
        location: theatre.location || '',
        address: theatre.address || '',
        city: theatre.city || '',
        state: theatre.state || '',
        pincode: theatre.pincode || '',
        phone: theatre.phone || '',
        email: theatre.email || '',
        amenities: theatre.amenities || [],
      });
    }
  }, [theatre]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Theatre name is required';
    if (!form.location.trim()) errs.location = 'Location is required';
    if (!form.city.trim()) errs.city = 'City is required';
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

  const toggleAmenity = (amenity) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {theatre ? 'Edit Theatre' : 'Add New Theatre'}
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
          {/* Theatre Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Theatre Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Cinéplex Downtown"
              className={`w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 border-2 transition-all focus:outline-none ${
                errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-primary'
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Location & City (2 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Main Street"
                className={`w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 border-2 transition-all focus:outline-none ${
                  errors.location ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-primary'
                }`}
              />
              {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="e.g. New York"
                className={`w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 border-2 transition-all focus:outline-none ${
                  errors.city ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-primary'
                }`}
              />
              {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Full Address
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Complete address"
              className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 border-2 border-gray-200 dark:border-gray-600 focus:border-primary transition-all focus:outline-none"
            />
          </div>

          {/* State & Pincode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">State</label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="e.g. New York"
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 border-2 border-gray-200 dark:border-gray-600 focus:border-primary transition-all focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="e.g. 10001"
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 border-2 border-gray-200 dark:border-gray-600 focus:border-primary transition-all focus:outline-none"
              />
            </div>
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. +1 234 567 8900"
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 border-2 border-gray-200 dark:border-gray-600 focus:border-primary transition-all focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. info@theatre.com"
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 border-2 border-gray-200 dark:border-gray-600 focus:border-primary transition-all focus:outline-none"
              />
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amenities
            </label>
            <div className="flex flex-wrap gap-2">
              {AMENITY_OPTIONS.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    form.amenities.includes(amenity)
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {amenity}
                </button>
              ))}
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
              {theatre ? 'Save Changes' : 'Add Theatre'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
