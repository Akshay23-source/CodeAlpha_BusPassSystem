import React from 'react';
import { motion } from 'framer-motion';

export function AuthCard({ children, title, subtitle, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`rounded-3xl border border-blue-500/20 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/80 backdrop-blur-xl p-8 sm:p-10 shadow-2xl ${className}`}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8 flex justify-center"
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-white font-black text-lg">✓</span>
        </div>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-black text-white mb-2">{title}</h1>
        {subtitle && <p className="text-slate-400">{subtitle}</p>}
      </motion.div>

      {/* Content */}
      {children}
    </motion.div>
  );
}
