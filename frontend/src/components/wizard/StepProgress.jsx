import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function StepProgress({ steps, currentStep, onStepClick }) {
  return (
    <div className="w-full py-4 px-2 sm:px-6">
      {/* Stepper progress path layout */}
      <div className="flex items-center justify-between w-full max-w-2xl mx-auto relative">
        
        {/* Background track line */}
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[2px] bg-slate-800 pointer-events-none z-0" />

        {/* Active progress colored track line */}
        <motion.div
          className="absolute left-4 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 origin-left pointer-events-none z-0"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: currentStep / (steps.length - 1) }}
          transition={{ duration: 0.4 }}
          style={{ width: 'calc(100% - 32px)' }}
        />

        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;
          const isClickable = idx < currentStep;

          return (
            <div key={step} className="flex flex-col items-center relative z-10">
              {/* Stepper node circle button */}
              <motion.button
                type="button"
                disabled={!isClickable}
                onClick={() => onStepClick(idx)}
                whileHover={isClickable ? { scale: 1.1 } : {}}
                whileTap={isClickable ? { scale: 0.95 } : {}}
                animate={{
                  borderColor: isActive || isCompleted ? '#3b82f6' : '#1e293b',
                  backgroundColor: isCompleted ? '#2563eb' : '#020617',
                }}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs focus:outline-none transition-colors ${
                  isCompleted 
                    ? 'text-white cursor-pointer' 
                    : isActive 
                      ? 'text-blue-400 cursor-default' 
                      : 'text-slate-600 cursor-not-allowed'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                ) : (
                  idx + 1
                )}
              </motion.button>

              {/* Step Title (Desktop only) */}
              <span className={`hidden sm:block text-[9px] font-black uppercase tracking-wider mt-2.5 transition-colors ${
                isActive ? 'text-blue-400 font-black' : isCompleted ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
