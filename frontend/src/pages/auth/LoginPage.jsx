import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { loginSchema } from '../../validation/schemas';

import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';
import { AuthInputField } from '../../components/auth/AuthInputField';
import { PasswordField } from '../../components/auth/PasswordField';
import { SocialLoginButtons } from '../../components/auth/SocialLoginButtons';
import { RememberMe } from '../../components/auth/RememberMe';
import { LoadingOverlay } from '../../components/auth/LoadingOverlay';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [shake, setShake] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: localStorage.getItem('rememberedEmail') || '',
      password: '',
    },
  });

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      
      // Handle Remember Me email persistence
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', data.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      toast.success('Welcome back! Loading secure cockpit...');
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 800);
    } catch (error) {
      triggerShake();
      toast.error(error.message || 'Invalid email or password credentials');
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
        title="Welcome Back"
        subtitle="Sign in to your SmartTransit Cloud account"
        shake={shake}
      >
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-4">
          {/* Email Input */}
          <AuthInputField
            {...register('email')}
            type="email"
            placeholder="Email address"
            error={errors.email?.message}
            icon={Mail}
            autoComplete="email"
          />

          {/* Password Input */}
          <PasswordField
            {...register('password')}
            placeholder="Password"
            error={errors.password?.message}
            autoComplete="current-password"
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm pt-1">
            <RememberMe
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20 hover:shadow-indigo-500/30 transition-all hover:brightness-105 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign In
          </button>

          {/* Alternative Auth divider and socials */}
          <SocialLoginButtons />

          {/* Signup Page redirect link */}
          <p className="text-center text-slate-400 text-sm mt-6">
            New to SmartTransit?{' '}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-300 font-bold transition-colors underline decoration-2 decoration-blue-500/20 hover:decoration-blue-400/60"
            >
              Create an account
            </Link>
          </p>
        </form>
      </AuthCard>

      <LoadingOverlay show={loading} message="Authenticating credentials..." />
    </AuthLayout>
  );
}
