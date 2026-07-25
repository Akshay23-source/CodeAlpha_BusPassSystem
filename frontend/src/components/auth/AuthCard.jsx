import React from 'react';
import { motion } from 'framer-motion';
import { KeyRound } from 'lucide-react';

export function AuthCard({ children, title, subtitle, className = '', shake = false }) {
  // Shake variants for invalid validation attempts
  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, -5, 5, 0],
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
    idle: { x: 0 },
  };

  return (
    <motion.div
      variants={shakeVariants}
      animate={shake ? 'shake' : 'idle'}
      whileHover={{ y: -2 }}
      className={`rounded-3xl border border-white/[0.08] bg-slate-900/40 backdrop-blur-xl p-8 sm:p-10 shadow-2xl relative overflow-hidden group ${className}`}
      style={{
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Decorative top-right gradient blob inside the card */}
      <div className="absolute top-[-20%] right-[-20%] w-40 h-40 rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-500/0 blur-xl group-hover:from-blue-500/20 transition-colors duration-500" />

      {/* Brand logo at the top */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
        className="mb-6 flex justify-center"
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-white/10">
          <KeyRound className="w-6 h-6 text-white" />
        </div>
      </motion.div>

      {/* Title & Subtitle */}
      <div className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-2xl sm:text-3xl font-black text-white tracking-tight"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-slate-400 mt-1.5 leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
