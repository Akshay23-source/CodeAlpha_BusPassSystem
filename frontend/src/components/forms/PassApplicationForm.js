import { motion } from 'framer-motion';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { routeOptions } from '../../theme';

export function PassApplicationForm({ applyRoute, onRouteChange, onSubmit, onGenerateQr, loading }) {
  return (
    <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} className="rounded-[28px] border border-slate-800/70 bg-slate-900/70 p-5">
      <div className="mb-4">
        <p className="text-sm text-blue-300">Travel cockpit</p>
        <h3 className="text-xl font-semibold text-slate-100">Apply for your next pass</h3>
      </div>
      <form onSubmit={onSubmit} className="space-y-3">
        <label className="block text-sm text-slate-400">Choose a route</label>
        <select value={applyRoute} onChange={(event) => onRouteChange(event.target.value)} className="w-full rounded-2xl border border-slate-700/80 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none">
          {routeOptions.map((route) => (
            <option key={route} value={route}>{route}</option>
          ))}
        </select>
        <Input placeholder="Monthly or daily access" />
        <Button type="submit" className="w-full" disabled={loading}>Apply pass</Button>
        <Button type="button" variant="secondary" className="w-full" onClick={onGenerateQr}>Generate QR</Button>
      </form>
    </motion.div>
  );
}
