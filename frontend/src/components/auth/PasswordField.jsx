import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock } from 'lucide-react';

export const PasswordField = React.forwardRef(({
  placeholder = 'Password',
  error,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1.5 w-full">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
          <Lock className="w-5 h-5" />
        </div>
        
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-slate-900/40 backdrop-blur-sm placeholder-slate-500 focus:outline-none text-white text-sm pl-12 pr-12 ${
            error
              ? 'border-red-500/80 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
              : 'border-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15'
          }`}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-500 hover:text-white transition-colors focus:outline-none"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
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

PasswordField.displayName = 'PasswordField';
