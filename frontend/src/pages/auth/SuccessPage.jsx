import React from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  
  // Custom success title/subtitle/link via query params
  const title = searchParams.get('title') || 'Action Successful';
  const message = searchParams.get('message') || 'Your request has been successfully executed.';
  const linkText = searchParams.get('linkText') || 'Return to login';
  const linkTo = searchParams.get('linkTo') || '/login';

  return (
    <AuthLayout showSidebar={false}>
      <AuthCard title={title} subtitle={message}>
        <div className="space-y-6 py-4 flex flex-col items-center justify-center">
          {/* Animated Success Check Circle */}
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute w-24 h-24 rounded-full bg-emerald-500/20 blur-xl"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white border border-white/10"
            >
              <CheckCircle className="w-8 h-8" />
            </motion.div>
          </div>

          <div className="w-full pt-4">
            <Link
              to={linkTo}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20 hover:shadow-indigo-500/30 transition-all hover:brightness-105 active:scale-[0.99] flex items-center justify-center text-sm"
            >
              {linkText}
            </Link>
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
