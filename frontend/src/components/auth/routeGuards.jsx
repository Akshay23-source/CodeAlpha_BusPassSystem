import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Route guard for routes that require authentication
 */
export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, emailVerified, profileCompleted } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to email verification if not verified
  if (!emailVerified && location.pathname !== '/verify-email' && location.pathname !== '/verify-otp') {
    return <Navigate to="/verify-email" replace />;
  }

  // Redirect to profile completion if verified but profile incomplete
  if (emailVerified && !profileCompleted && location.pathname !== '/profile-completion' && location.pathname !== '/verify-email' && location.pathname !== '/verify-otp') {
    return <Navigate to="/profile-completion" replace />;
  }

  return children;
}

/**
 * Route guard for public-only pages (e.g. Login, Signup, Forgot Password)
 */
export function PublicRoute({ children }) {
  const { isAuthenticated, loading, emailVerified, profileCompleted } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    if (!emailVerified) {
      return <Navigate to="/verify-email" replace />;
    }
    if (!profileCompleted) {
      return <Navigate to="/profile-completion" replace />;
    }
    // Redirect back to original route or dashboard
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  return children;
}
