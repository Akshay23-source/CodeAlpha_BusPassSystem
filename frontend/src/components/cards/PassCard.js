import { motion } from 'framer-motion';
import { ArrowRight, Ticket } from 'lucide-react';

export function PassCard({ pass }) {
  return (
    <motion.div whileHover={{ y: -3 }} className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/90 to-blue-950/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-100">
          <Ticket className="h-4 w-4 text-blue-400" />
          {pass.route || 'Route'}
        </div>
        <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-400">
          {pass.status || 'Active'}
        </span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-semibold text-slate-100">₹{pass.amount || 45}</p>
          <p className="mt-1 text-sm text-slate-400">Monthly access pass</p>
        </div>
        <button className="flex items-center gap-1 text-sm text-blue-300">
          Manage <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
