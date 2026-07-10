import React from 'react';
import { motion } from 'framer-motion';

export function LoadingOverlay({ show, message = 'Loading...' }) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-900 border border-slate-700 rounded-2xl p-8 text-center"
      >
        {/* Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full mx-auto mb-4"
        />
        <p className="text-white font-semibold">{message}</p>
      </motion.div>
    </motion.div>
  );
}

export function SessionExpiredModal({ onReLogin }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.3 }}
        className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-yellow-500/30 rounded-2xl p-8 max-w-md"
      >
        <div className="text-center">
          <div className="text-5xl mb-4">⏰</div>
          <h2 className="text-2xl font-bold text-white mb-2">Session Expired</h2>
          <p className="text-slate-400 mb-6">Your session has timed out. Please log in again to continue.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReLogin}
            className="w-full px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all"
          >
            Log In Again
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
