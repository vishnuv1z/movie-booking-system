import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import BookingsPage from './pages/BookingsPage';
import NotFoundPage from './pages/NotFoundPage';
import ShowtimesPage from './pages/ShowtimesPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import TheatreOwnerDashboard from './pages/TheatreOwnerDashboard';
import TheatreLoginPage from './pages/TheatreLoginPage';
import TheatreSignupPage from './pages/TheatreSignupPage';

// Route guard: redirects to /login if user is not authenticated
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-surface">
        <div className="flex flex-col items-center gap-3">
          <svg className="w-8 h-8 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-gray-500 dark:text-gray-400 text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Redirect authenticated users away from login/signup pages
function GuestRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-surface">
        <div className="flex flex-col items-center gap-3">
          <svg className="w-8 h-8 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-gray-500 dark:text-gray-400 text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Route guard: requires authentication + specific roles
function RoleProtectedRoute({ children, roles }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-surface">
        <div className="flex flex-col items-center gap-3">
          <svg className="w-8 h-8 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-gray-500 dark:text-gray-400 text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/theatre-login" replace />;
  }

  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />

          {/* Guest-only Routes (redirect to home if already logged in) */}
          <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path="/signup" element={<GuestRoute><SignupPage /></GuestRoute>} />
          
          {/* Theatre Owner Auth Routes */}
          <Route path="/theatre-login" element={<GuestRoute><TheatreLoginPage /></GuestRoute>} />
          <Route path="/theatre-signup" element={<GuestRoute><TheatreSignupPage /></GuestRoute>} />
          
          {/* Booking Flow Routes */}
          <Route path="/showtimes" element={<ShowtimesPage />} />
          <Route path="/seat-selection" element={<SeatSelectionPage />} />
          
          {/* Protected Routes */}
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><BookingsPage /></ProtectedRoute>} />
          <Route path="/theatre-dashboard" element={
            <RoleProtectedRoute roles={['theatreOwner', 'admin']}>
              <TheatreOwnerDashboard />
            </RoleProtectedRoute>
          } />
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
