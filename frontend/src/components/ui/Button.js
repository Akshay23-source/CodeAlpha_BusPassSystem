import { motion } from 'framer-motion';

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950';
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-600/20 hover:-translate-y-0.5',
    secondary: 'bg-slate-800/80 text-slate-100 hover:bg-slate-700',
    ghost: 'bg-white/10 text-slate-100 hover:bg-white/20',
  };

  return (
    <motion.button whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </motion.button>
  );
}
