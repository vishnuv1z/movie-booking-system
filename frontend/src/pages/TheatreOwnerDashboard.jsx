import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import TheatreForm from '../components/theatre/TheatreForm';
import ScreenForm from '../components/theatre/ScreenForm';
import ShowForm from '../components/theatre/ShowForm';
import api from '../services/api';

const TABS = [
  { id: 'theatres', label: 'My Theatres', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { id: 'screens', label: 'Screens', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { id: 'shows', label: 'Shows', icon: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z' },
  { id: 'bookings', label: 'Bookings', icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' },
];

export default function TheatreOwnerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('theatres');
  const [stats, setStats] = useState({ totalTheatres: 0, totalScreens: 0, totalShows: 0, totalBookings: 0, totalRevenue: 0 });
  
  // Data states
  const [theatres, setTheatres] = useState([]);
  const [screens, setScreens] = useState([]);
  const [shows, setShows] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [movies, setMovies] = useState([]);
  
  // UI states
  const [loading, setLoading] = useState(true);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [showTheatreForm, setShowTheatreForm] = useState(false);
  const [editTheatre, setEditTheatre] = useState(null);
  const [showScreenForm, setShowScreenForm] = useState(false);
  const [editScreen, setEditScreen] = useState(null);
  const [showShowForm, setShowShowForm] = useState(false);
  const [editShow, setEditShow] = useState(null);
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Toast helper
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Fetch data
  const fetchStats = useCallback(async () => {
    try {
      const res = await api.get('/theatres/stats');
      setStats(res.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, []);

  const fetchTheatres = useCallback(async () => {
    try {
      const res = await api.get('/theatres/my');
      setTheatres(res.data);
      if (res.data.length > 0 && !selectedTheatre) {
        setSelectedTheatre(res.data[0]._id);
      }
    } catch (err) {
      console.error('Failed to fetch theatres:', err);
    }
  }, [selectedTheatre]);

  const fetchScreens = useCallback(async (theatreId) => {
    if (!theatreId) return;
    try {
      const res = await api.get(`/screens/theatre/${theatreId}`);
      setScreens(res.data);
    } catch (err) {
      console.error('Failed to fetch screens:', err);
    }
  }, []);

  const fetchShows = useCallback(async (theatreId) => {
    if (!theatreId) return;
    try {
      const res = await api.get(`/shows/theatre/${theatreId}`);
      setShows(res.data);
    } catch (err) {
      console.error('Failed to fetch shows:', err);
    }
  }, []);

  const fetchBookings = useCallback(async (theatreId) => {
    if (!theatreId) return;
    try {
      const res = await api.get(`/theatres/${theatreId}/bookings`);
      setBookings(res.data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    }
  }, []);

  const fetchMovies = useCallback(async () => {
    try {
      const res = await api.get('/movies');
      setMovies(res.data);
    } catch (err) {
      console.error('Failed to fetch movies:', err);
    }
  }, []);

  // Initial load
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchStats(), fetchTheatres(), fetchMovies()]);
      setLoading(false);
    };
    load();
  }, [fetchStats, fetchTheatres, fetchMovies]);

  // Load tab-specific data when tab or selected theatre changes
  useEffect(() => {
    if (selectedTheatre) {
      if (activeTab === 'screens') fetchScreens(selectedTheatre);
      if (activeTab === 'shows') {
        fetchScreens(selectedTheatre);
        fetchShows(selectedTheatre);
      }
      if (activeTab === 'bookings') fetchBookings(selectedTheatre);
    }
  }, [activeTab, selectedTheatre, fetchScreens, fetchShows, fetchBookings]);

  // CRUD handlers
  const handleTheatreSubmit = async (data) => {
    try {
      if (editTheatre) {
        await api.put(`/theatres/${editTheatre._id}`, data);
        showToast('Theatre updated successfully');
      } else {
        await api.post('/theatres', data);
        showToast('Theatre added successfully');
      }
      setShowTheatreForm(false);
      setEditTheatre(null);
      await fetchTheatres();
      await fetchStats();
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to save theatre', 'error');
    }
  };

  const handleDeleteTheatre = async (id) => {
    try {
      await api.delete(`/theatres/${id}`);
      showToast('Theatre deleted successfully');
      setDeleteConfirm(null);
      if (selectedTheatre === id) setSelectedTheatre(null);
      await fetchTheatres();
      await fetchStats();
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to delete theatre', 'error');
    }
  };

  const handleScreenSubmit = async (data) => {
    try {
      if (editScreen) {
        await api.put(`/screens/${editScreen._id}`, data);
        showToast('Screen updated successfully');
      } else {
        await api.post('/screens', { ...data, theatre: selectedTheatre });
        showToast('Screen added successfully');
      }
      setShowScreenForm(false);
      setEditScreen(null);
      await fetchScreens(selectedTheatre);
      await fetchStats();
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to save screen', 'error');
    }
  };

  const handleDeleteScreen = async (id) => {
    try {
      await api.delete(`/screens/${id}`);
      showToast('Screen deleted successfully');
      setDeleteConfirm(null);
      await fetchScreens(selectedTheatre);
      await fetchStats();
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to delete screen', 'error');
    }
  };

  const handleShowSubmit = async (data) => {
    try {
      if (editShow) {
        await api.put(`/shows/${editShow._id}`, data);
        showToast('Show updated successfully');
      } else {
        await api.post('/shows', { ...data, theatre: selectedTheatre });
        showToast('Show scheduled successfully');
      }
      setShowShowForm(false);
      setEditShow(null);
      await fetchShows(selectedTheatre);
      await fetchStats();
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to save show', 'error');
    }
  };

  const handleDeleteShow = async (id) => {
    try {
      await api.delete(`/shows/${id}`);
      showToast('Show deleted successfully');
      setDeleteConfirm(null);
      await fetchShows(selectedTheatre);
      await fetchStats();
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to delete show', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-surface transition-colors">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-3">
            <svg className="w-10 h-10 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-gray-500 dark:text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-surface transition-colors duration-300">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 dark:to-transparent border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                Theatre Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 ml-15">
                Welcome back, <span className="font-semibold text-primary">{user?.name}</span>
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
            {[
              { label: 'Theatres', value: stats.totalTheatres, color: 'from-emerald-500 to-emerald-600' },
              { label: 'Screens', value: stats.totalScreens, color: 'from-blue-500 to-blue-600' },
              { label: 'Active Shows', value: stats.totalShows, color: 'from-purple-500 to-purple-600' },
              { label: 'Bookings', value: stats.totalBookings, color: 'from-amber-500 to-amber-600' },
              { label: 'Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, color: 'from-rose-500 to-rose-600' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <p className={`text-2xl font-bold mt-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Theatre Selector (for tabs that need it) */}
      {activeTab !== 'theatres' && theatres.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Select Theatre:</span>
            <div className="flex gap-2 flex-wrap">
              {theatres.map((t) => (
                <button
                  key={t._id}
                  onClick={() => setSelectedTheatre(t._id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedTheatre === t._id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-primary'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Theatres Tab */}
        {activeTab === 'theatres' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Theatres</h2>
              <button
                onClick={() => { setEditTheatre(null); setShowTheatreForm(true); }}
                className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Theatre
              </button>
            </div>

            {theatres.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No theatres yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Start by adding your first theatre to get started.</p>
                <button
                  onClick={() => { setEditTheatre(null); setShowTheatreForm(true); }}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
                >
                  Add Your First Theatre
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {theatres.map((theatre) => (
                  <div
                    key={theatre._id}
                    className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 transition-all hover:shadow-md ${
                      selectedTheatre === theatre._id
                        ? 'border-primary'
                        : 'border-gray-100 dark:border-gray-700'
                    }`}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-dark rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{theatre.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{theatre.location}, {theatre.city}</p>
                          </div>
                        </div>
                      </div>

                      {/* Stats Row */}
                      <div className="flex gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-primary">{theatre.screenCount || 0}</p>
                          <p className="text-xs text-gray-500">Screens</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-blue-500">{theatre.showCount || 0}</p>
                          <p className="text-xs text-gray-500">Shows</p>
                        </div>
                      </div>

                      {/* Amenities */}
                      {theatre.amenities?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {theatre.amenities.slice(0, 3).map((a) => (
                            <span key={a} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400">
                              {a}
                            </span>
                          ))}
                          {theatre.amenities.length > 3 && (
                            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400">
                              +{theatre.amenities.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditTheatre(theatre); setShowTheatreForm(true); }}
                          className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ type: 'theatre', id: theatre._id, name: theatre.name })}
                          className="px-3 py-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Screens Tab */}
        {activeTab === 'screens' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Screens</h2>
              {selectedTheatre && (
                <button
                  onClick={() => { setEditScreen(null); setShowScreenForm(true); }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Screen
                </button>
              )}
            </div>

            {!selectedTheatre ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Please add a theatre first or select one above.</p>
              </div>
            ) : screens.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No screens yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Add screens to start scheduling shows.</p>
                <button
                  onClick={() => { setEditScreen(null); setShowScreenForm(true); }}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
                >
                  Add First Screen
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {screens.map((screen) => (
                  <div key={screen._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          screen.screenType === 'IMAX' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' :
                          screen.screenType === 'Premium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' :
                          screen.screenType === '4DX' ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600' :
                          'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                        }`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">{screen.name}</h3>
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                            screen.screenType === 'IMAX' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' :
                            screen.screenType === 'Premium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' :
                            screen.screenType === '4DX' ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600' :
                            'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                          }`}>
                            {screen.screenType}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Rows:</span>
                        <span className="ml-1 font-semibold text-gray-900 dark:text-white">{screen.rows}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Cols:</span>
                        <span className="ml-1 font-semibold text-gray-900 dark:text-white">{screen.cols}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Seats:</span>
                        <span className="ml-1 font-semibold text-primary">{screen.totalSeats || screen.rows * screen.cols}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => { setEditScreen(screen); setShowScreenForm(true); }}
                        className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ type: 'screen', id: screen._id, name: screen.name })}
                        className="px-3 py-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Shows Tab */}
        {activeTab === 'shows' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Shows</h2>
              {selectedTheatre && screens.length > 0 && (
                <button
                  onClick={() => { setEditShow(null); setShowShowForm(true); }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Schedule Show
                </button>
              )}
            </div>

            {!selectedTheatre ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Please select a theatre above.</p>
              </div>
            ) : shows.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="w-20 h-20 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No shows scheduled</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {screens.length === 0
                    ? 'Add screens before scheduling shows.'
                    : 'Schedule your first show to start selling tickets.'}
                </p>
                {screens.length > 0 && (
                  <button
                    onClick={() => { setEditShow(null); setShowShowForm(true); }}
                    className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
                  >
                    Schedule First Show
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {shows.map((show) => (
                  <div key={show._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Movie Poster & Info */}
                      <div className="flex items-center gap-3 flex-1">
                        {show.movie?.poster && (
                          <img
                            src={show.movie.poster}
                            alt={show.movie.title}
                            className="w-14 h-20 rounded-lg object-cover flex-shrink-0"
                          />
                        )}
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">{show.movie?.title || 'Unknown Movie'}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {show.movie?.language} • {show.movie?.duration}min • {show.movie?.genre}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded font-medium">
                              {show.screen?.name} ({show.screen?.screenType})
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                              show.status === 'scheduled' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' :
                              show.status === 'cancelled' ? 'bg-red-100 dark:bg-red-900/30 text-red-600' :
                              'bg-gray-100 dark:bg-gray-700 text-gray-600'
                            }`}>
                              {show.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Date & Time */}
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="text-gray-500 dark:text-gray-400 text-xs">Date</p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {new Date(show.showDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500 dark:text-gray-400 text-xs">Time</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{show.startTime}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500 dark:text-gray-400 text-xs">Price</p>
                          <p className="font-semibold text-primary">₹{show.price}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditShow(show); setShowShowForm(true); }}
                          className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ type: 'show', id: show._id, name: show.movie?.title })}
                          className="px-3 py-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Bookings</h2>
            </div>

            {!selectedTheatre ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Please select a theatre above.</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="w-20 h-20 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No bookings yet</h3>
                <p className="text-gray-500 dark:text-gray-400">Bookings will appear here once customers start booking seats.</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                        <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Movie</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Screen</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Seats</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Booked On</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {bookings.map((booking) => (
                        <tr key={booking._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                          <td className="px-5 py-4">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{booking.user?.name || 'N/A'}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{booking.user?.email || 'N/A'}</p>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              {booking.show?.movie?.poster && (
                                <img src={booking.show.movie.poster} alt="" className="w-8 h-10 rounded object-cover" />
                              )}
                              <span className="text-sm text-gray-900 dark:text-white">{booking.show?.movie?.title || 'N/A'}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
                            {booking.show?.screen?.name || 'N/A'}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex flex-wrap gap-1">
                              {booking.seats.map((seat) => (
                                <span key={seat} className="px-1.5 py-0.5 bg-primary/10 text-primary rounded text-xs font-medium">
                                  {seat}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                            ₹{booking.totalPrice}
                          </td>
                          <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {new Date(booking.createdAt).toLocaleDateString('en-US', {
                              month: 'short', day: 'numeric', year: 'numeric',
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showTheatreForm && (
        <TheatreForm
          theatre={editTheatre}
          onSubmit={handleTheatreSubmit}
          onClose={() => { setShowTheatreForm(false); setEditTheatre(null); }}
        />
      )}

      {showScreenForm && (
        <ScreenForm
          screen={editScreen}
          theatreId={selectedTheatre}
          onSubmit={handleScreenSubmit}
          onClose={() => { setShowScreenForm(false); setEditScreen(null); }}
        />
      )}

      {showShowForm && (
        <ShowForm
          show={editShow}
          theatreId={selectedTheatre}
          screens={screens}
          movies={movies}
          onSubmit={handleShowSubmit}
          onClose={() => { setShowShowForm(false); setEditShow(null); }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-2">
              Delete {deleteConfirm.type}?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
              Are you sure you want to delete <span className="font-semibold">{deleteConfirm.name}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteConfirm.type === 'theatre') handleDeleteTheatre(deleteConfirm.id);
                  else if (deleteConfirm.type === 'screen') handleDeleteScreen(deleteConfirm.id);
                  else if (deleteConfirm.type === 'show') handleDeleteShow(deleteConfirm.id);
                }}
                className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg border transition-all animate-slide-up ${
          toast.type === 'error'
            ? 'bg-red-50 dark:bg-red-900/80 border-red-200 dark:border-red-800 text-red-700 dark:text-red-200'
            : 'bg-green-50 dark:bg-green-900/80 border-green-200 dark:border-green-800 text-green-700 dark:text-green-200'
        }`}>
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {toast.type === 'error' ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            )}
          </svg>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
