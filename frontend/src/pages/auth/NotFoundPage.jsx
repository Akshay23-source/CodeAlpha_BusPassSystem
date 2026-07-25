import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';

export function NotFoundPage() {
  return (
    <AuthLayout showSidebar={false}>
      <AuthCard
        title="404 — Lost Route"
        subtitle="The transit destination you requested does not exist"
      >
        <div className="space-y-6 text-center">
          {/* Animated 404 Visual with glowing paths */}
          <div className="flex justify-center relative py-4">
            <div className="relative w-40 h-20 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute w-24 h-24 border border-dashed border-blue-500/20 rounded-full"
              />
              
              <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 tracking-wider">
                404
              </h1>

              {/* Glowing transit line node dots */}
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1 left-4 w-3.5 h-3.5 rounded-full bg-blue-500 shadow-md shadow-blue-500/50"
              />
              <motion.div
                animate={{ scale: [1.4, 1, 1.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-2 right-4 w-3 h-3 rounded-full bg-purple-500 shadow-md shadow-purple-500/50"
              />
            </div>
          </div>

          <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
            The page has been rerouted, decommissioned, or typed incorrectly. Let's redirect you back to active transit.
          </p>

          <Link
            to="/"
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20 hover:shadow-indigo-500/30 transition-all hover:brightness-105 active:scale-[0.99] flex items-center justify-center gap-2 text-sm"
          >
            <Compass className="w-4 h-4" />
            Navigate Back Home
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
