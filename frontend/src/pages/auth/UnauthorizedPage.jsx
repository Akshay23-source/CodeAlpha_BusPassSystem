import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowLeft, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';

export function UnauthorizedPage() {
  const { logout } = useAuth();

  return (
    <AuthLayout showSidebar={false}>
      <AuthCard
        title="Access Denied"
        subtitle="You are not authorized to view this resource"
      >
        <div className="space-y-6 text-center">
          {/* Animated Alert icon */}
          <div className="flex justify-center">
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-red-500/20 blur-md"
              />
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20 border border-white/5">
                <ShieldAlert className="w-8 h-8" />
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
            This workspace or cockpit requires administrative privileges. If you believe this is an error, please reach out to your administrator.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link
              to="/dashboard"
              className="py-3 rounded-xl font-semibold text-slate-300 border border-slate-800 bg-slate-900/20 hover:bg-slate-900/40 text-sm flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            
            <button
              onClick={logout}
              className="py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-red-600 to-orange-500 hover:brightness-105 active:scale-[0.99] transition-all text-sm flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
