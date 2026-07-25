import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export function OTPInput({ value = '', onChange, length = 6, error }) {
  const inputRefs = useRef([]);

  // Clear inputs and focus on first box when mounted
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return; // Only allow digits

    const newValue = value.split('');
    newValue[index] = val.slice(-1); // Keep only last digit typed
    const updatedVal = newValue.join('');
    onChange(updatedVal);

    // Auto-focus next input
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0) {
        // Input is empty, go backward and clear preceding input
        const newValue = value.split('');
        newValue[index - 1] = '';
        onChange(newValue.join(''));
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newValue = value.split('');
        newValue[index] = '';
        onChange(newValue.join(''));
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().slice(0, length);
    if (/^\d+$/.test(pastedData)) {
      onChange(pastedData);
      // Focus on last entered digit or last box
      const targetIndex = Math.min(pastedData.length, length - 1);
      inputRefs.current[targetIndex]?.focus();
    }
  };

  return (
    <div className="space-y-3.5 w-full">
      <div className="flex gap-2.5 sm:gap-3 justify-center">
        {[...Array(length)].map((_, index) => (
          <motion.input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength="1"
            value={value[index] || ''}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            aria-label={`Digit ${index + 1} of verification code`}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.04, type: 'spring', stiffness: 120 }}
            className={`w-11 h-12 sm:w-14 sm:h-14 rounded-xl border-2 text-center text-lg sm:text-xl font-bold focus:outline-none transition-all duration-300 bg-slate-900/40 backdrop-blur-sm text-white ${
              error
                ? 'border-red-500/80 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                : 'border-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15'
            }`}
          />
        ))}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400 text-center font-medium pl-1"
        >
          ✕ {error}
        </motion.p>
      )}
    </div>
  );
}
