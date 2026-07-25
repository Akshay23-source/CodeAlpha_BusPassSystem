import React from 'react';
import { Compass, Users, User, ArrowRight } from 'lucide-react';

export function BusInfoCard({ busNo = 'KA-02F-8821', driver = 'Rajesh Kumar', occupancy = '64%', speed = '38 km/h' }) {
  return (
    <div className="p-4 rounded-3xl border border-white/[0.06] bg-slate-900/10 backdrop-blur-sm text-xs font-semibold text-slate-400 space-y-3 text-left w-full">
      <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none pb-2 border-b border-white/[0.03]">
        <span>Vehicle Parameters</span>
        <span className="text-white font-mono">{busNo}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-slate-500 font-bold">Driver Name</span>
        <span className="text-white font-bold">{driver}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-slate-500 font-bold">Current Speed</span>
        <span className="text-white font-bold font-mono">{speed}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-slate-500 font-bold">Occupancy Level</span>
        <span className="text-emerald-400 font-bold font-mono">{occupancy} (Low Crowding)</span>
      </div>
    </div>
  );
}
export default BusInfoCard;
