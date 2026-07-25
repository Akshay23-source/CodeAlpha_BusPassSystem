import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function CountUp({ value = 0, suffix = '', prefix = '' }) {
  const [displayVal, setDisplayVal] = useState(0);

  useEffect(() => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      setDisplayVal(value);
      return;
    }

    let start = 0;
    const duration = 1200; // 1.2 seconds count up duration
    const steps = 40;
    const stepTime = duration / steps;
    const increment = num / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= num) {
        clearInterval(timer);
        setDisplayVal(num);
      } else {
        setDisplayVal(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  const formatNumber = (val) => {
    if (typeof val === 'number') {
      return val.toLocaleString('en-IN');
    }
    return val;
  };

  return (
    <span>
      {prefix}
      {formatNumber(displayVal)}
      {suffix}
    </span>
  );
}

export function StatCard({ title, value, subtitle, icon: Icon, color = 'blue', tooltip = '' }) {
  const colorClasses = {
    blue: 'border-blue-500/10 shadow-blue-500/5 text-blue-400 focus:ring-blue-500/10 hover:border-blue-500/30',
    purple: 'border-purple-500/10 shadow-purple-500/5 text-purple-400 focus:ring-purple-500/10 hover:border-purple-500/30',
    pink: 'border-pink-500/10 shadow-pink-500/5 text-pink-400 focus:ring-pink-500/10 hover:border-pink-500/30',
    emerald: 'border-emerald-500/10 shadow-emerald-500/5 text-emerald-400 focus:ring-emerald-500/10 hover:border-emerald-500/30',
    amber: 'border-amber-500/10 shadow-amber-500/5 text-amber-400 focus:ring-amber-500/10 hover:border-amber-500/30',
  };

  // Extract prefix/suffix for currency etc.
  const hasRupee = typeof value === 'string' && value.includes('₹');
  const numericValue = hasRupee ? value.replace('₹', '') : value;
  const prefixValue = hasRupee ? '₹' : '';

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className={`rounded-2xl border bg-slate-900/30 backdrop-blur-md p-5 shadow-lg flex items-center justify-between transition-all duration-300 relative group overflow-hidden ${colorClasses[color] || colorClasses.blue}`}
      style={{
        boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.03)',
      }}
      title={tooltip}
    >
      {/* Glow highlight background */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/[0.01] pointer-events-none" />

      {/* Info fields */}
      <div className="space-y-1.5 z-10">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none">
          {title}
        </p>
        <h3 className="text-xl sm:text-2xl font-black text-white leading-none tracking-tight">
          {typeof numericValue === 'number' || !isNaN(parseFloat(numericValue)) ? (
            <CountUp value={numericValue} prefix={prefixValue} />
          ) : (
            value
          )}
        </h3>
        {subtitle && (
          <p className="text-[10px] text-slate-500 font-semibold leading-none pt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {/* Side icon */}
      {Icon && (
        <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 h-fit text-slate-400 group-hover:text-white transition-all duration-300 shadow-md">
          <Icon className="w-5 h-5" />
        </div>
      )}
    </motion.div>
  );
}
export { CountUp };
