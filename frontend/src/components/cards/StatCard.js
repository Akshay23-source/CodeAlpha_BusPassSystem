import { motion } from 'framer-motion';

export function StatCard({ title, value, subtitle, icon: Icon }) {
  return (
    <motion.div whileHover={{ y: -3, scale: 1.01 }} className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-slate-400">{title}</p>
        {Icon ? <Icon className="h-4 w-4 text-blue-400" /> : null}
      </div>
      <p className="text-2xl font-semibold text-slate-100">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
    </motion.div>
  );
}
