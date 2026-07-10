import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, ArrowLeft } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthCard } from '../components/auth/AuthCard';
import { AuthInputField } from '../components/auth/AuthInputField';
import { LoadingOverlay } from '../components/auth/LoadingOverlay';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    setLoading(true);
    try {
      // Simulated API call - replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSent(true);
      toast.success('Reset link sent to your email');
    } catch (err) {
      setError(err.message || 'Failed to send reset link');
      toast.error('Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout showSidebar={false}>
      <AuthCard
        title={sent ? 'Check Your Email' : 'Reset Password'}
        subtitle={
          sent
            ? 'We sent a reset link to your email'
            : 'Enter your email to receive a password reset link'
        }
      >
        {sent ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="text-center py-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-4"
              >
                ✉️
              </motion.div>
              <p className="text-slate-400 mb-2">Check your email at:</p>
              <p className="text-white font-semibold break-all">{email}</p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-sm text-blue-300">
              <p>
                Click the link in the email to reset your password. The link will expire in 24 hours.
              </p>
            </div>

            <button
              onClick={() => setSent(false)}
              className="w-full py-3 rounded-xl font-semibold text-slate-300 border-2 border-slate-700 hover:border-slate-600 transition-all"
            >
              Didn't receive email? Try again
            </button>

            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthInputField
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              error={error}
              icon={Mail}
            />

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </motion.button>

            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-slate-400 hover:text-slate-300 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>
          </form>
        )}
      </AuthCard>

      <LoadingOverlay show={loading} message="Sending reset link..." />
    </AuthLayout>
  );
}
