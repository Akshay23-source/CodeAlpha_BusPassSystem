import React from 'react';
import { motion } from 'framer-motion';

export function RememberMe({ checked, onChange, label = 'Remember me' }) {
  return (
    <label className="flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors cursor-pointer select-none">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-5 h-5 rounded-md border-2 transition-colors flex items-center justify-center ${
            checked
              ? 'border-blue-500 bg-blue-600'
              : 'border-slate-700 bg-slate-900/50'
          }`}
        >
          {checked && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-3.5 h-3.5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </motion.svg>
          )}
        </motion.div>
      </div>
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
}
