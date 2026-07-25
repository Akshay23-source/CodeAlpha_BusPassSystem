import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';
import { OTPInput } from '../../components/auth/OTPInput';
import { LoadingOverlay } from '../../components/auth/LoadingOverlay';

export function OTPVerificationPage() {
  const navigate = useNavigate();
  const { user, markEmailAsVerified, logout } = useAuth();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter all 6 digits');
      triggerShake();
      return;
    }

    setLoading(true);
    try {
      // Simulate verification api validation
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Let's accept any 6 digits for simulation
      markEmailAsVerified();
      toast.success('Security code verified successfully!');
      setTimeout(() => {
        navigate('/profile-completion', { replace: true });
      }, 800);
    } catch (err) {
      triggerShake();
      setError('Invalid OTP code. Please try again.');
      toast.error('Code verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setResendTimer(60);
      setCanResend(false);
      setOtp('');
      setError('');
      toast.success('New OTP security code sent to your email');
    } catch (err) {
      toast.error('Failed to dispatch code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout showSidebar={false}>
      <AuthCard
        title="Security Code"
        subtitle={`Enter the 6-digit verification code sent to ${user?.email || 'your email'}`}
        shake={shake}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Locked SVG Icon */}
          <div className="flex justify-center my-2">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400">
              <Lock className="w-5 h-5 text-indigo-400" />
            </div>
          </div>

          {/* OTP Input Grid */}
          <OTPInput
            value={otp}
            onChange={(val) => {
              setOtp(val);
              setError('');
            }}
            length={6}
            error={error}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20 hover:shadow-indigo-500/30 transition-all hover:brightness-105 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verify Security Code
          </button>

          {/* Countdown & Resend Option */}
          <div className="text-center">
            <button
              type="button"
              disabled={!canResend || loading}
              onClick={handleResend}
              className="text-sm font-semibold text-slate-400 hover:text-white disabled:text-slate-600 transition-colors"
            >
              {canResend ? (
                "Didn't receive the code? Resend code"
              ) : (
                `Resend security code in ${resendTimer}s`
              )}
            </button>
          </div>

          {/* Go back */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-800/80 text-xs">
            <Link
              to="/verify-email"
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to link verification
            </Link>
            
            <button
              type="button"
              onClick={logout}
              className="text-slate-500 hover:text-slate-400 font-semibold"
            >
              Sign out
            </button>
          </div>
        </form>
      </AuthCard>

      <LoadingOverlay show={loading} message="Verifying authentication code..." />
    </AuthLayout>
  );
}
