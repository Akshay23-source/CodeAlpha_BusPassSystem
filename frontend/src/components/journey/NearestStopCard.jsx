import React from 'react';
import { Compass, HelpCircle, ShieldCheck } from 'lucide-react';

export function NearestStopCard({ name = 'West Gate University Stop', distance = '250m away', lines = ['Line 12', 'Campus Shuttle'] }) {
  return (
    <div className="p-4 rounded-3xl border border-white/[0.06] bg-slate-900/10 backdrop-blur-sm text-xs font-semibold text-slate-400 space-y-3 text-left w-full">
      <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none pb-2 border-b border-white/[0.03]">
        <span>Nearest Terminal stop</span>
        <span className="text-emerald-400 font-bold">{distance}</span>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h5 className="font-bold text-white leading-none">{name}</h5>
          <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block mt-1.5">Active Transit Hub</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-1">
        <span className="text-slate-500 font-bold">Lines Serving</span>
        <span className="text-white font-mono font-bold text-[10px]">{lines.join(', ')}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-slate-500 font-bold">Amenities</span>
        <span className="text-white font-bold">Shelter, Ramp Access</span>
      </div>
    </div>
  );
}
export default NearestStopCard;
