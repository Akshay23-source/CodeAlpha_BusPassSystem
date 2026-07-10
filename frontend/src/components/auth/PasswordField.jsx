import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

export function PasswordField({
  value,
  onChange,
  placeholder = 'Password',
  error,
  showStrength = false,
  strength = 0,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const getStrengthColor = () => {
    if (strength < 2) return 'bg-red-500';
    if (strength < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Fair';
    return 'Strong';
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <motion.input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-slate-900/50 backdrop-blur-sm placeholder-slate-500 focus:outline-none ${
            error
              ? 'border-red-500 focus:border-red-600'
              : 'border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
          } text-white`}
          {...props}
        />
        <motion.button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </motion.button>
      </div>

      {showStrength && strength > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full transition-all ${
                  i < strength ? getStrengthColor() : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-slate-400">
            Password strength: <span className="font-semibold">{getStrengthText()}</span>
          </p>
        </motion.div>
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
