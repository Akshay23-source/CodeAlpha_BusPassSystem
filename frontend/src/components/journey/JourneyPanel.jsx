import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation, Compass, AlertCircle, ShieldCheck, User } from 'lucide-react';

export function JourneyPanel({ selectedRoute = 'Line 12 Express' }) {
  const [speed, setSpeed] = useState(38);
  const [eta, setEta] = useState(14);

  // Simulate real-time speed fluctuation micro-interactions
  useEffect(() => {
    const timer = setInterval(() => {
      setSpeed(prev => {
        const diff = Math.floor(Math.random() * 7) - 3;
        const newSpeed = Math.max(30, Math.min(prev + diff, 65));
        return newSpeed;
      });
      setEta(prev => {
        if (prev <= 1) return 14; // Reset loops
        return prev - 1;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-5 rounded-3xl border border-white/[0.06] bg-slate-900/10 backdrop-blur-sm space-y-4 text-left w-full">
      <div className="flex justify-between items-center pb-2 border-b border-white/[0.03]">
        <div>
          <h4 className="text-xs font-black text-white leading-none truncate">{selectedRoute}</h4>
          <span className="text-[8px] text-pink-400 font-bold uppercase tracking-wider block mt-1">Commute Session Active</span>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400 font-bold uppercase tracking-wide">
          <ShieldCheck className="w-2.5 h-2.5" /> In Transit
        </span>
      </div>

      {/* Grid metrics dials */}
      <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-slate-400">
        <div className="p-3.5 rounded-2xl border border-white/[0.04] bg-slate-950/40 space-y-1">
          <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block leading-none">Vehicle Speed</span>
          <span className="text-sm font-black text-white font-mono">{speed} km/h</span>
        </div>
        <div className="p-3.5 rounded-2xl border border-white/[0.04] bg-slate-950/40 space-y-1">
          <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block leading-none">Estimated ETA</span>
          <span className="text-sm font-black text-pink-400 font-mono">{eta} mins</span>
        </div>
      </div>

      {/* Driver metadata credentials */}
      <div className="p-3.5 rounded-2xl border border-white/[0.04] bg-slate-950/40 flex items-center justify-between gap-3 text-xs font-semibold text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400">
            <User className="w-4 h-4" />
          </div>
          <div>
            <p className="text-white font-bold leading-none">Rajesh Kumar</p>
            <p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mt-1.5">Rating: 4.8★ · Bus #KA-02F-8821</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[9px] text-slate-500 font-bold uppercase block leading-none">Occupancy</span>
          <span className="text-[10px] text-emerald-400 font-bold block mt-1.5">64% Capacity</span>
        </div>
      </div>
    </div>
  );
}
export default JourneyPanel;
