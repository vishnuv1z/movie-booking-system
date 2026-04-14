import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Format the member-since date from user's createdAt timestamp
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : 'N/A';

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <div className="min-h-screen bg-white dark:bg-dark-surface transition-colors duration-300">
        <Navbar />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            {/* Profile Header with Avatar */}
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">
                  {user?.name ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : '?'}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user?.name || 'User'}</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm capitalize">{user?.role || 'user'} account</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Profile Info */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      value={user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white capitalize"
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Account Stats */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Account Info</h2>
                <div className="space-y-4">
                  <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
                    <p className="text-xl font-bold text-primary">{memberSince}</p>
                  </div>
                  <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Account Type</p>
                    <p className="text-xl font-bold text-primary capitalize">{user?.role || 'User'}</p>
                  </div>
                  <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Email Verified</p>
                    <p className="text-xl font-bold text-primary">Yes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors">
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </main>
      </div>
    </Suspense>
  );
}
