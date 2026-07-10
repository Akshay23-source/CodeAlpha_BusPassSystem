import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthCard } from '../components/auth/AuthCard';
import { LoadingOverlay } from '../components/auth/LoadingOverlay';

export function EmailVerificationPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleContinue = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Welcome to SmartTransit Cloud!');
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 500);
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setResendTimer(30);
    setCanResend(false);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Verification email resent');
    } catch (err) {
      toast.error('Failed to resend email');
    }
  };

  return (
    <AuthLayout showSidebar={false}>
      <AuthCard
        title="Email Verified"
        subtitle="Your email has been successfully verified"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Success Animation */}
          <div className="flex justify-center py-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5, delay: 0.3 }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white text-4xl"
              >
                ✓
              </motion.span>
            </motion.div>
          </div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center space-y-2"
          >
            <p className="text-slate-400">
              Thank you for verifying your email. Your account is now fully activated.
            </p>
            <p className="text-sm text-slate-500">
              You can now access all features of SmartTransit Cloud.
            </p>
          </motion.div>

          {/* Continue Button */}
          <motion.button
            onClick={handleContinue}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Continuing...' : 'Go to Dashboard'}
          </motion.button>

          {/* Resend Option */}
          <div className="text-center">
            <p className="text-sm text-slate-500 mb-2">Didn't receive verification?</p>
            <button
              type="button"
              disabled={!canResend}
              onClick={handleResend}
              className="text-blue-400 hover:text-blue-300 disabled:text-slate-600 text-sm font-semibold transition-colors"
            >
              {canResend ? 'Resend email' : `Resend in ${resendTimer}s`}
            </button>
          </div>

          {/* Alternative Actions */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-700">
            <button className="text-sm text-slate-400 hover:text-slate-300 transition-colors py-2">
              Open Gmail
            </button>
            <button className="text-sm text-slate-400 hover:text-slate-300 transition-colors py-2">
              Change Email
            </button>
          </div>
        </motion.div>
      </AuthCard>

      <LoadingOverlay show={loading} message="Redirecting..." />
    </AuthLayout>
  );
}
