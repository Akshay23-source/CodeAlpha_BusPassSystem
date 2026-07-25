import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { forgotPasswordSchema } from '../../validation/schemas';

import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';
import { AuthInputField } from '../../components/auth/AuthInputField';
import { LoadingOverlay } from '../../components/auth/LoadingOverlay';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  const [shake, setShake] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setEmail(data.email);
    try {
      // Mock API call for password reset queue
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSent(true);
      toast.success('Recovery link sent successfully!');
    } catch (err) {
      triggerShake();
      toast.error('Failed to dispatch password recovery email');
    } finally {
      setLoading(false);
    }
  };

  const onInvalid = () => {
    triggerShake();
  };

  return (
    <AuthLayout showSidebar={false}>
      <AuthCard
        title={sent ? 'Check Your Email' : 'Reset Password'}
        subtitle={
          sent
            ? 'We have sent a secure recovery link to your inbox'
            : 'Enter your account email to receive a password reset link'
        }
        shake={shake}
      >
        {sent ? (
          <div className="space-y-6">
            <div className="text-center py-4 space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border border-blue-500/30">
                  <span className="text-3xl animate-bounce">✉️</span>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-sm">We sent a recovery email to:</p>
                <p className="text-white font-semibold break-all text-sm mt-1">{email}</p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 text-xs text-blue-300 leading-relaxed text-center">
              Click the link in the verification email to set a new password. The link will remain active for 24 hours.
            </div>

            <button
              onClick={() => setSent(false)}
              className="w-full py-3 rounded-xl font-semibold text-slate-300 border border-slate-800 bg-slate-900/20 hover:bg-slate-900/40 transition-all text-sm"
            >
              Didn't receive email? Try again
            </button>

            <Link
              to="/login"
              className="flex items-center justify-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-4">
            <AuthInputField
              {...register('email')}
              type="email"
              placeholder="Email address"
              error={errors.email?.message}
              icon={Mail}
              autoComplete="email"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20 hover:shadow-indigo-500/30 transition-all hover:brightness-105 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              Send Reset Link
            </button>

            <Link
              to="/login"
              className="flex items-center justify-center gap-1.5 text-slate-400 hover:text-slate-300 font-semibold transition-colors text-sm pt-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>
          </form>
        )}
      </AuthCard>

      <LoadingOverlay show={loading} message="Dispatching recovery email..." />
    </AuthLayout>
  );
}
