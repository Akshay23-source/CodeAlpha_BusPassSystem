import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { User, Mail, Lock } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthCard } from '../components/auth/AuthCard';
import { AuthInputField } from '../components/auth/AuthInputField';
import { PasswordField } from '../components/auth/PasswordField';
import { PasswordStrength } from '../components/auth/PasswordStrength';
import { SocialLoginButtons } from '../components/auth/SocialLoginButtons';
import { LoadingOverlay } from '../components/auth/LoadingOverlay';
import { useAuthStore, authAPI } from '../services/authStore';

export function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
  });

  // Redirect if already logged in
  useEffect(() => {
    if (useAuthStore.isAuthenticated()) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    else if (formData.name.trim().split(' ').length < 2) {
      newErrors.name = 'Please enter your full name';
    }

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    else if (!/[A-Z]/.test(formData.password)) newErrors.password = 'Password needs an uppercase letter';
    else if (!/[a-z]/.test(formData.password)) newErrors.password = 'Password needs a lowercase letter';
    else if (!/\d/.test(formData.password)) newErrors.password = 'Password needs a number';
    else if (!/[^A-Za-z0-9]/.test(formData.password)) newErrors.password = 'Password needs a special character';

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) newErrors.terms = 'You must agree to the terms of service';
    if (!formData.agreeToPrivacy) newErrors.privacy = 'You must agree to the privacy policy';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await authAPI.register(
        formData.name,
        formData.email,
        formData.password
      );

      if (response.token) {
        useAuthStore.setToken(response.token);
        if (response.refreshToken) {
          useAuthStore.setRefreshToken(response.refreshToken);
        }
        if (response.user) {
          useAuthStore.setUser(response.user);
        }

        toast.success('Account created successfully!');
        setTimeout(() => {
          navigate('/email-verification', { replace: true });
        }, 500);
      }
    } catch (error) {
      setErrors({ submit: error.message });
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout showSidebar={true}>
      <AuthCard
        title="Create Account"
        subtitle="Join SmartTransit Cloud today"
        className="max-w-lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          {/* Full Name */}
          <AuthInputField
            type="text"
            placeholder="Full name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              setErrors({ ...errors, name: '' });
            }}
            error={errors.name}
            icon={User}
          />

          {/* Email */}
          <AuthInputField
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setErrors({ ...errors, email: '' });
            }}
            error={errors.email}
            icon={Mail}
          />

          {/* Password */}
          <PasswordField
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              setErrors({ ...errors, password: '' });
            }}
            error={errors.password}
            placeholder="Password"
          />

          {/* Password Strength */}
          {formData.password && (
            <PasswordStrength password={formData.password} />
          )}

          {/* Confirm Password */}
          <AuthInputField
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value });
              setErrors({ ...errors, confirmPassword: '' });
            }}
            error={errors.confirmPassword}
            icon={Lock}
          />

          {/* Checkboxes */}
          <div className="space-y-2 pt-2">
            <label className="flex items-start gap-3 text-sm text-slate-400 hover:text-slate-300 transition-colors cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => {
                  setFormData({ ...formData, agreeToTerms: e.target.checked });
                  setErrors({ ...errors, terms: '' });
                }}
                className="mt-1 rounded accent-blue-600"
              />
              <span>
                I agree to the{' '}
                <span className="text-blue-400 group-hover:text-blue-300">terms of service</span>
              </span>
            </label>
            {errors.terms && (
              <p className="text-xs text-red-400">✕ {errors.terms}</p>
            )}

            <label className="flex items-start gap-3 text-sm text-slate-400 hover:text-slate-300 transition-colors cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.agreeToPrivacy}
                onChange={(e) => {
                  setFormData({ ...formData, agreeToPrivacy: e.target.checked });
                  setErrors({ ...errors, privacy: '' });
                }}
                className="mt-1 rounded accent-blue-600"
              />
              <span>
                I agree to the{' '}
                <span className="text-blue-400 group-hover:text-blue-300">privacy policy</span>
              </span>
            </label>
            {errors.privacy && (
              <p className="text-xs text-red-400">✕ {errors.privacy}</p>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3"
            >
              {errors.submit}
            </motion.p>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </motion.button>

          {/* Social Login */}
          <SocialLoginButtons />

          {/* Login Link */}
          <p className="text-center text-slate-400 text-sm">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </form>
      </AuthCard>

      <LoadingOverlay show={loading} message="Creating your account..." />
    </AuthLayout>
  );
}
