import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { signupSchema } from '../../validation/schemas';

import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';
import { AuthInputField } from '../../components/auth/AuthInputField';
import { PasswordField } from '../../components/auth/PasswordField';
import { PasswordStrength } from '../../components/auth/PasswordStrength';
import { SocialLoginButtons } from '../../components/auth/SocialLoginButtons';
import { LoadingOverlay } from '../../components/auth/LoadingOverlay';

export function SignupPage() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
      agreeToPrivacy: false,
    },
  });

  // Watch password field to display real-time strength feedback
  const passwordValue = watch('password', '');

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerUser(data.name, data.email, data.password);
      toast.success('Account created successfully!');
      setTimeout(() => {
        navigate('/verify-email', { replace: true });
      }, 800);
    } catch (error) {
      triggerShake();
      toast.error(error.message || 'Registration failed. Email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  const onInvalid = () => {
    triggerShake();
  };

  return (
    <AuthLayout showSidebar={true}>
      <AuthCard
        title="Create Account"
        subtitle="Join SmartTransit Cloud today"
        shake={shake}
      >
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-4 max-h-[calc(100vh-160px)] overflow-y-auto pr-1">
          {/* Full Name */}
          <AuthInputField
            {...register('name')}
            type="text"
            placeholder="Full name"
            error={errors.name?.message}
            icon={User}
            autoComplete="name"
          />

          {/* Email Address */}
          <AuthInputField
            {...register('email')}
            type="email"
            placeholder="Email address"
            error={errors.email?.message}
            icon={Mail}
            autoComplete="email"
          />

          {/* Password */}
          <PasswordField
            {...register('password')}
            placeholder="Password"
            error={errors.password?.message}
            autoComplete="new-password"
          />

          {/* Live Password Strength Meter */}
          {passwordValue && (
            <PasswordStrength password={passwordValue} />
          )}

          {/* Confirm Password */}
          <AuthInputField
            {...register('confirmPassword')}
            type="password"
            placeholder="Confirm password"
            error={errors.confirmPassword?.message}
            autoComplete="new-password"
          />

          {/* Checkboxes for Terms & Privacy */}
          <div className="space-y-2 pt-2">
            <label className="flex items-start gap-2.5 text-xs text-slate-400 hover:text-slate-300 transition-colors cursor-pointer select-none">
              <input
                {...register('agreeToTerms')}
                type="checkbox"
                className="mt-0.5 rounded accent-blue-600 border-slate-700 bg-slate-900"
              />
              <span>
                I agree to the{' '}
                <span className="text-blue-400 font-semibold hover:underline">terms of service</span>
              </span>
            </label>
            {errors.agreeToTerms && (
              <p className="text-[11px] text-red-400 font-semibold">✕ {errors.agreeToTerms.message}</p>
            )}

            <label className="flex items-start gap-2.5 text-xs text-slate-400 hover:text-slate-300 transition-colors cursor-pointer select-none">
              <input
                {...register('agreeToPrivacy')}
                type="checkbox"
                className="mt-0.5 rounded accent-blue-600 border-slate-700 bg-slate-900"
              />
              <span>
                I agree to the{' '}
                <span className="text-blue-400 font-semibold hover:underline">privacy policy</span>
              </span>
            </label>
            {errors.agreeToPrivacy && (
              <p className="text-[11px] text-red-400 font-semibold">✕ {errors.agreeToPrivacy.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20 hover:shadow-indigo-500/30 transition-all hover:brightness-105 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Account
          </button>

          {/* Socials Divider */}
          <SocialLoginButtons />

          {/* Link back to login */}
          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 font-bold transition-colors underline decoration-2 decoration-blue-500/20 hover:decoration-blue-400/60"
            >
              Sign in
            </Link>
          </p>
        </form>
      </AuthCard>

      <LoadingOverlay show={loading} message="Registering account credentials..." />
    </AuthLayout>
  );
}
