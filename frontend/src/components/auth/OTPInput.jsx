import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export function OTPInput({ value, onChange, length = 6, error }) {
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return; // Only allow digits

    const newValue = value.split('');
    newValue[index] = val;
    onChange(newValue.join(''));

    // Auto-focus next input
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    if (/^\d+$/.test(pastedData)) {
      onChange(pastedData);
      inputRefs.current[Math.min(pastedData.length, length - 1)]?.focus();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-3 justify-center">
        {[...Array(length)].map((_, index) => (
          <motion.input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength="1"
            value={value[index] || ''}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 text-center text-xl font-bold focus:outline-none transition-all duration-300 bg-slate-900/50 ${
              error
                ? 'border-red-500 focus:border-red-600'
                : 'border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
            } text-white`}
          />
        ))}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400 text-center"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
