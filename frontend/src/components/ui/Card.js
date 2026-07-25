import { motion } from 'framer-motion';

export function Card({ children, className = '', hover = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={`rounded-3xl border border-slate-800/80 bg-white/5 p-5 shadow-soft backdrop-blur-xl dark:border-slate-700/80 ${className}`}
    >
      {children}
    </motion.div>
  );
}
