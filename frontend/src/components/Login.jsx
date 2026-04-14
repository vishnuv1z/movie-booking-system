import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await login(email, password);
        navigate('/');
      } catch (err) {
        const msg = err.response?.data?.msg || 'Login failed. Please try again.';
        setServerError(msg);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-surface transition-colors duration-300 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle movie-themed background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-2xl transition-all duration-300">
          {/* Card Content */}
          <div className="p-8 md:p-10">
            {/* Logo Section */}
            <div className="flex justify-center mb-8">
              <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-dark rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xl">CB</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  CineBook
                </span>
              </Link>
            </div>

            {/* Header Text */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Sign in to continue booking your favorite movies
              </p>
            </div>

            {/* Server Error Banner */}
            {serverError && (
              <div className="mb-5 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{serverError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                    if (serverError) setServerError('');
                  }}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-2 transition-all focus:outline-none ${
                    errors.email
                      ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/30'
                      : 'border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/30'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: '' });
                      if (serverError) setServerError('');
                    }}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-2 transition-all focus:outline-none pr-12 ${
                      errors.password
                        ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/30'
                        : 'border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/30'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
              <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
            </div>

            {/* Social Login Options */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="py-2.5 px-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-primary dark:hover:border-primary text-gray-700 dark:text-gray-300 font-medium transition-all hover:bg-primary/5 dark:hover:bg-primary/10">
                <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15.545 6.558a9.42 9.42 0 01.139 1.626c0 2.449-.901 4.711-2.399 6.416m3.507-6.425a10.823 10.823 0 00-.891-2.704C13.474 1.917 10.866.858 7.877.858c-1.295 0-2.848.248-4.088.936-.577.333-1.15.748-1.697 1.184a10.02 10.02 0 002.905 16.93c1.25.512 2.8.863 4.422.863 3.12 0 5.821-1.365 7.831-3.718m-10.251-8.385h.008v.008h-.008V6.558z" />
                </svg>
              </button>
              <button className="py-2.5 px-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-primary dark:hover:border-primary text-gray-700 dark:text-gray-300 font-medium transition-all hover:bg-primary/5 dark:hover:bg-primary/10">
                <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                  <path d="M15 1.5v6M12 4.5h6" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-semibold text-primary hover:text-primary-dark transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          By signing in, you agree to our{' '}
          <a href="#" className="text-primary hover:text-primary-dark font-medium transition-colors">
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
}
