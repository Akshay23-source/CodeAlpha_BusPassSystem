import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, KeyRound } from 'lucide-react';
import { resetPasswordSchema } from '../../validation/schemas';

import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';
import { PasswordField } from '../../components/auth/PasswordField';
import { PasswordStrength } from '../../components/auth/PasswordStrength';
import { LoadingOverlay } from '../../components/auth/LoadingOverlay';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  // Retrieve reset token from query string (if applicable)
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const passwordValue = watch('password', '');

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Simulated API reset call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
      toast.success('Password updated successfully!');
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
    } catch (err) {
      triggerShake();
      toast.error('Failed to update password');
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
        title={success ? 'Success!' : 'Create New Password'}
        subtitle={
          success
            ? 'Your password has been changed. Redirecting to login...'
            : 'Enter and confirm your new password below'
        }
        shake={shake}
      >
        {success ? (
          <div className="space-y-6 py-4 flex flex-col items-center justify-center">
            {/* Animated Success Check */}
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center relative">
              <span className="text-3xl text-emerald-400">✓</span>
            </div>
            <p className="text-slate-400 text-sm text-center">
              You can now sign in using your new credentials.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-4">
            {/* New Password */}
            <PasswordField
              {...register('password')}
              placeholder="New password"
              error={errors.password?.message}
              autoComplete="new-password"
            />

            {/* Live Strength Checklist */}
            {passwordValue && (
              <PasswordStrength password={passwordValue} />
            )}

            {/* Confirm Password */}
            <PasswordField
              {...register('confirmPassword')}
              placeholder="Confirm new password"
              error={errors.confirmPassword?.message}
              autoComplete="new-password"
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20 hover:shadow-indigo-500/30 transition-all hover:brightness-105 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <KeyRound className="w-4 h-4" />
              Reset Password
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

      <LoadingOverlay show={loading} message="Updating credentials..." />
    </AuthLayout>
  );
}
