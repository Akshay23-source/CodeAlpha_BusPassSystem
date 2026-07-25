import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingOverlay({ show, message = 'Loading security workspace...' }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/60 backdrop-blur-md"
        >
          {/* Glowing Dual Spinning Rings */}
          <div className="relative w-20 h-20 mb-6">
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-indigo-500 shadow-md shadow-blue-500/20"
            />
            {/* Inner ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 rounded-full border-4 border-transparent border-t-pink-500 border-r-purple-500 shadow-sm"
            />
            {/* Pulsing center dot */}
            <motion.div
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-[30px] rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 blur-[1px]"
            />
          </div>

          {/* Text Message */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <p className="text-sm font-bold text-white tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-100 via-white to-slate-200">
              {message}
            </p>
            <p className="text-xs text-slate-500 mt-1 font-semibold">
              Please secure your connection
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
