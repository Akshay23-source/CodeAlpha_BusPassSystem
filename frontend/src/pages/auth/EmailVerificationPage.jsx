import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, ExternalLink, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';
import { LoadingOverlay } from '../../components/auth/LoadingOverlay';

export function EmailVerificationPage() {
  const navigate = useNavigate();
  const { user, markEmailAsVerified, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleResend = async () => {
    if (!canResend) return;
    setLoading(true);
    try {
      // Mock API trigger
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setResendTimer(60);
      setCanResend(false);
      toast.success('Verification link dispatched to your inbox');
    } catch (err) {
      toast.error('Failed to dispatch verification email');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySimulation = async () => {
    setLoading(true);
    try {
      // Simulate verifying email instantly
      await new Promise((resolve) => setTimeout(resolve, 1000));
      markEmailAsVerified();
      toast.success('Email verified successfully!');
      setTimeout(() => {
        navigate('/profile-completion', { replace: true });
      }, 800);
    } catch (err) {
      toast.error('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout showSidebar={false}>
      <AuthCard
        title="Verify Your Email"
        subtitle={`We sent a verification link to ${user?.email || 'your email'}`}
      >
        <div className="space-y-6">
          {/* Animated illustration */}
          <div className="flex justify-center py-2">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl"
              />
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center border border-white/10 shadow-lg text-white"
              >
                <Mail className="w-8 h-8" />
              </motion.div>
            </div>
          </div>

          <div className="text-center text-slate-400 text-sm leading-relaxed">
            Please check your inbox and click the verification link to activate your transit account.
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            {/* Verify Simulator (Primary Call-to-Action for Demo) */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleVerifySimulation}
              className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 hover:brightness-105"
            >
              <ShieldCheck className="w-5 h-5" />
              Simulate Verification Success
            </motion.button>

            {/* Deep link to Gmail */}
            <a
              href="https://mail.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl font-semibold text-slate-300 border border-slate-800 bg-slate-900/20 hover:bg-slate-900/40 hover:text-white transition-all text-sm flex items-center justify-center gap-2"
            >
              Open Gmail Inbox
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </a>
          </div>

          {/* Resend Verification */}
          <div className="text-center py-2">
            <p className="text-xs text-slate-500 mb-1">Didn't receive the link?</p>
            <button
              disabled={!canResend || loading}
              onClick={handleResend}
              className="text-sm font-bold text-blue-400 hover:text-blue-300 disabled:text-slate-600 transition-colors"
            >
              {canResend ? 'Resend verification email' : `Resend in ${resendTimer}s`}
            </button>
          </div>

          {/* Manually enter OTP code link */}
          <div className="bg-slate-950/40 rounded-2xl border border-white/[0.04] p-4 text-center space-y-2">
            <span className="text-xs text-slate-400">Prefer typing a verification code?</span>
            <Link
              to="/verify-otp"
              className="block text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Enter 6-digit OTP code manually
            </Link>
          </div>

          {/* Change email (Go back / log out) */}
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-1.5 text-slate-500 hover:text-slate-300 font-semibold transition-colors text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Use a different email address (Sign out)
          </button>
        </div>
      </AuthCard>

      <LoadingOverlay show={loading} message="Processing request..." />
    </AuthLayout>
  );
}
