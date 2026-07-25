import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function VerificationBanner() {
  const { emailVerified } = useAuth();

  if (emailVerified) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-b border-amber-500/20 text-amber-300 py-3 px-4 sm:px-6 lg:px-8 text-center text-sm font-medium flex items-center justify-center gap-2 relative z-40 backdrop-blur-md"
    >
      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
      <span>Your email is not verified. Some dashboard features may be limited.</span>
      <Link
        to="/verify-email"
        className="flex items-center gap-1 underline hover:text-amber-200 transition-colors ml-1"
      >
        Verify now <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </motion.div>
  );
}
