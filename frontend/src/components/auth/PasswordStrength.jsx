import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

export function PasswordStrength({ password = '' }) {
  const calculateStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const score = calculateStrength();

  const requirements = [
    { label: 'Minimum 8 characters', met: password.length >= 8 },
    { label: 'At least one uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'At least one lowercase letter', met: /[a-z]/.test(password) },
    { label: 'At least one number', met: /\d/.test(password) },
    { label: 'At least one special character', met: /[^A-Za-z0-9]/.test(password) },
  ];

  const getStrengthConfig = () => {
    switch (score) {
      case 0:
      case 1:
        return { label: 'Weak', color: 'bg-red-500', text: 'text-red-400' };
      case 2:
      case 3:
        return { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-400' };
      case 4:
        return { label: 'Good', color: 'bg-blue-500', text: 'text-blue-400' };
      case 5:
        return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-400' };
      default:
        return { label: 'Weak', color: 'bg-red-500', text: 'text-red-400' };
    }
  };

  const config = getStrengthConfig();

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-3 p-4 rounded-2xl border border-white/[0.04] bg-slate-950/40 backdrop-blur-sm"
    >
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-400">Password strength</span>
          <span className={`font-bold ${config.text} transition-colors duration-300`}>
            {config.label}
          </span>
        </div>
        
        {/* Progress Bar Grid */}
        <div className="flex gap-1.5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1 rounded-full bg-slate-800 overflow-hidden"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: i < score ? '100%' : '0%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`h-full ${config.color} transition-colors duration-300`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Checklist */}
      <div className="space-y-1.5 pt-1 border-t border-white/[0.04]">
        {requirements.map((req, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 text-[11px] select-none"
          >
            <motion.div
              animate={{
                scale: req.met ? [1, 1.2, 1] : 1,
                borderColor: req.met ? '#10b981' : '#334155',
                backgroundColor: req.met ? 'rgba(16, 185, 129, 0.15)' : 'rgba(0, 0, 0, 0)',
              }}
              className="w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0"
              style={{ borderWidth: '1.5px' }}
            >
              {req.met ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-emerald-400 font-bold"
                >
                  ✓
                </motion.span>
              ) : (
                <span className="text-slate-600 font-bold">•</span>
              )}
            </motion.div>
            <span className={req.met ? 'text-slate-300 transition-colors duration-300' : 'text-slate-500 transition-colors duration-300'}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
