import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthCard } from '../components/auth/AuthCard';
import { OTPInput } from '../components/auth/OTPInput';
import { LoadingOverlay } from '../components/auth/LoadingOverlay';

export function OTPVerificationPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Timer for resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    try {
      // Simulated API call - replace with actual verification endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Email verified successfully!');
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 500);
    } catch (err) {
      setError('Invalid OTP. Please try again.');
      toast.error('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setResendTimer(60);
    setCanResend(false);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('OTP resent to your email');
    } catch (err) {
      toast.error('Failed to resend OTP');
    }
  };

  return (
    <AuthLayout showSidebar={false}>
      <AuthCard
        title="Verify Your Email"
        subtitle="Enter the 6-digit code sent to your email"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input */}
          <OTPInput
            value={otp}
            onChange={setOtp}
            length={6}
            error={error}
          />

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading || otp.length !== 6}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </motion.button>

          {/* Resend Button */}
          <button
            type="button"
            disabled={!canResend}
            onClick={handleResend}
            className="w-full py-2 text-sm text-slate-400 hover:text-slate-300 disabled:text-slate-600 transition-colors"
          >
            {canResend ? (
              "Didn't receive code? Resend"
            ) : (
              `Resend code in ${resendTimer}s`
            )}
          </button>

          {/* Help Text */}
          <p className="text-xs text-center text-slate-500">
            Check your spam folder if you don't see the email
          </p>
        </form>
      </AuthCard>

      <LoadingOverlay show={loading} message="Verifying your email..." />
    </AuthLayout>
  );
}
