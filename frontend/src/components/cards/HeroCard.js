import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export function HeroCard({ onPrimaryAction }) {
  return (
    <div className="rounded-[32px] border border-slate-800/70 bg-gradient-to-br from-slate-900 via-blue-950/80 to-slate-900 p-6 shadow-soft">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-200">
            <Sparkles className="h-4 w-4" />
            Premium commuting experience
          </div>
          <h2 className="text-3xl font-semibold text-slate-100 sm:text-4xl">Secure pass requests, faster boarding, and a polished commuter dashboard.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">Create an account, apply for a route, and manage your travel with the same elegance you expect from modern SaaS products.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={onPrimaryAction}>Create account</Button>
            <Button variant="secondary">Explore features</Button>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.01 }} className="rounded-[28px] border border-slate-800/80 bg-slate-950/70 p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-300">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Secure commuter badge
          </div>
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-800 to-slate-700 p-4">
            <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
              <span>Digital pass</span>
              <span>Live</span>
            </div>
            <div className="mb-4 h-28 rounded-2xl bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.4),_transparent_60%)]" />
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Route: Central - Airport</span>
              <button className="flex items-center gap-1 text-blue-300">
                Preview <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
