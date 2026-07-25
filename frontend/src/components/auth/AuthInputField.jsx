import React from 'react';
import { motion } from 'framer-motion';

export const AuthInputField = React.forwardRef(({
  type = 'text',
  placeholder,
  error,
  icon: Icon,
  ...props
}, ref) => {
  return (
    <div className="space-y-1.5 w-full">
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors peer-focus:text-blue-500">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-slate-900/40 backdrop-blur-sm placeholder-slate-500 focus:outline-none text-white text-sm ${
            Icon ? 'pl-12' : ''
          } ${
            error
              ? 'border-red-500/80 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
              : 'border-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15'
          }`}
          {...props}
        />
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs text-red-400 flex items-center gap-1 font-medium pl-1"
        >
          <span>✕</span> {error}
        </motion.p>
      )}
    </div>
  );
});

AuthInputField.displayName = 'AuthInputField';
