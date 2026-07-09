import { motion } from 'framer-motion';
import { Home, LayoutGrid, Map, ShieldCheck, Sparkles, Ticket, UserRound } from 'lucide-react';

const items = [
  { label: 'Overview', icon: Home, active: true },
  { label: 'Routes', icon: Map },
  { label: 'Passes', icon: Ticket },
  { label: 'Profile', icon: UserRound },
  { label: 'Security', icon: ShieldCheck },
];

export function Sidebar() {
  return (
    <motion.aside initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="hidden w-72 rounded-[28px] border border-slate-800/70 bg-slate-950/70 p-4 backdrop-blur-xl lg:block">
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
        <div className="rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-400 p-2 text-white">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-100">Bus Pass OS</p>
          <p className="text-xs text-slate-400">SaaS control center</p>
        </div>
      </div>

      <div className="space-y-2">
        {items.map(({ label, icon: Icon, active }) => (
          <button key={label} className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition ${active ? 'bg-blue-600/20 text-white shadow-lg shadow-blue-600/10' : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'}`}>
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-slate-800/70 bg-gradient-to-br from-blue-600/20 to-indigo-500/10 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-100">
          <LayoutGrid className="h-4 w-4" />
          Live insights
        </div>
        <p className="text-sm text-slate-400">Track usage, status, and rider engagement from one clean workspace.</p>
      </div>
    </motion.aside>
  );
}
