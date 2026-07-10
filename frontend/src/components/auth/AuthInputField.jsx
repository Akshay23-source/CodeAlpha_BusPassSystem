import React from 'react';
import { motion } from 'framer-motion';

export function AuthInputField({
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  ...props
}) {
  return (
    <div className="space-y-1">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-slate-900/50 backdrop-blur-sm placeholder-slate-500 focus:outline-none ${
            Icon ? 'pl-12' : ''
          } ${
            error
              ? 'border-red-500 focus:border-red-600'
              : 'border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
          } text-white`}
          {...props}
        />
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs text-red-400 flex items-center gap-1"
        >
          ✕ {error}
        </motion.p>
      )}
    </div>
  );
}
