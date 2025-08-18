import React, { useState } from 'react';
import { Lock, User, AlertCircle, Eye, EyeOff, Leaf, Mail, UserPlus } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { adminCredentials } from '../data/mockData';

interface LoginProps {
  onLogin: (success: boolean) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { login, signup } = useAuthStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (isSignUp) {
      if (!formData.username.trim()) {
        setError('Username is required');
        return false;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setError('Valid email is required');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    } else {
      if (!formData.username.trim() || !formData.password.trim()) {
        setError('Email and password are required');
        return false;
      }
      if (!formData.username.includes('@')) {
        setError('Please enter a valid email address');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        // For signup, use the auth store
        console.log('Signing up with:', {
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        
        await signup({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        
        // Clear form after successful signup
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        onLogin(true);
      } else {
        // For signin, check mock credentials first, then try auth store
        if (formData.username === adminCredentials.email && formData.password === adminCredentials.password) {
          // Mock login for demo - simulate successful authentication
          console.log('Mock login successful');
          onLogin(true);
        } else {
          // Try actual login through auth store
          console.log('Attempting login with:', {
            username: formData.username,
            password: formData.password
          });
          
          await login({
            username: formData.username,
            password: formData.password
          });
          
          // Clear form after successful login
          setFormData({ username: '', email: '', password: '', confirmPassword: '' });
          onLogin(true);
        }
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      
      // Better error handling
      let errorMessage = 'Authentication failed. Please try again.';
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.response.status === 400) {
          errorMessage = 'Invalid request format. Please check your input.';
        } else if (error.response.status === 401) {
          errorMessage = 'Invalid credentials. Please check your username and password.';
        } else if (error.response.status === 409) {
          errorMessage = 'User already exists. Please try a different username or email.';
        } else if (error.response.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'Unable to connect to server. Please check your internet connection.';
      }
      
      setError(errorMessage);
      onLogin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg mb-4">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CropScan AI</h1>
          <p className="text-gray-600 text-lg">Chilli Infestation Dashboard</p>
          <p className="text-sm text-gray-500 mt-2">Banaras Hindu University</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
              {isSignUp ? 'Create Account' : 'Admin Login'}
            </h2>
            <p className="text-gray-600 text-center">
              {isSignUp ? 'Sign up to access the dashboard' : 'Sign in to manage the dashboard'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 border border-red-200 p-3 rounded-xl animate-shake">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                {isSignUp ? 'Username' : 'Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {isSignUp ? <User className="h-5 w-5 text-gray-400" /> : <Mail className="h-5 w-5 text-gray-400" />}
                </div>
                <input
                  id="username"
                  name="username"
                  type={isSignUp ? "text" : "email"}
                  value={formData.username}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder={isSignUp ? "Enter your username" : "Enter your email"}
                  required
                />
              </div>
            </div>

            {/* Email Field (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
            )}

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isSignUp ? 'Creating Account...' : 'Signing in...'}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  {isSignUp ? <UserPlus className="h-5 w-5 mr-2" /> : <User className="h-5 w-5 mr-2" />}
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </div>
              )}
            </button>
          </form>

          {/* Toggle Between Sign In/Sign Up */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
            </button>
          </div>

          {/* Demo Credentials (Sign In Only) */}
          {!isSignUp && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</p>
              <p className="text-sm text-blue-700">Email: <span className="font-mono bg-blue-100 px-1 rounded">admin@example.com</span></p>
              <p className="text-sm text-blue-700">Password: <span className="font-mono bg-blue-100 px-1 rounded">admin123</span></p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2025 CropScan AI — A project by BHU Agriculture Department</p>
        </div>
      </div>
    </div>
  );
};
