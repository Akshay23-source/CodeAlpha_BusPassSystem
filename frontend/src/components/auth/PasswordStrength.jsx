import React from 'react';
import { motion } from 'framer-motion';

export function PasswordStrength({ password }) {
  const calculateStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = calculateStrength();

  const requirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Number', met: /\d/.test(password) },
    { label: 'Special character', met: /[^A-Za-z0-9]/.test(password) },
  ];

  const getStrengthColor = () => {
    if (strength < 2) return 'bg-red-500';
    if (strength < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthLabel = () => {
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Fair';
    if (strength < 5) return 'Good';
    return 'Strong';
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
      className="space-y-3 p-4 rounded-xl bg-slate-900/50 border border-slate-700"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-300">Password strength</span>
          <span className={`text-xs font-bold ${
            strength < 2 ? 'text-red-400' : strength < 4 ? 'text-yellow-400' : 'text-green-400'
          }`}>
            {getStrengthLabel()}
          </span>
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`flex-1 h-1 rounded-full origin-bottom ${
                i < strength ? getStrengthColor() : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {requirements.map((req, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center gap-2 text-xs"
          >
            <motion.div
              animate={{ scale: req.met ? 1 : 0.8 }}
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                req.met ? 'border-green-500 bg-green-500/20' : 'border-slate-600 bg-slate-900/50'
              }`}
            >
              {req.met && <span className="text-green-400 font-bold">✓</span>}
            </motion.div>
            <span className={req.met ? 'text-slate-300' : 'text-slate-500'}>{req.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
