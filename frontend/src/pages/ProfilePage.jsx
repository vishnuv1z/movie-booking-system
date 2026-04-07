import { Suspense } from 'react';
import Navbar from '../components/Navbar';

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <div className="min-h-screen bg-white dark:bg-dark-surface transition-colors duration-300">
        <Navbar />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Profile</h1>
            
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
                      placeholder="Your Name"
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
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Account Stats */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Account Stats</h2>
                <div className="space-y-4">
                  <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
                    <p className="text-3xl font-bold text-primary">12</p>
                  </div>
                  <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Favorite Movies</p>
                    <p className="text-3xl font-bold text-primary">8</p>
                  </div>
                  <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
                    <p className="text-xl font-bold text-primary">Jan 2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <button className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors">
                Edit Profile
              </button>
              <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors">
                Change Password
              </button>
              <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors">
                Logout
              </button>
            </div>
          </div>
        </main>
      </div>
    </Suspense>
  );
}
