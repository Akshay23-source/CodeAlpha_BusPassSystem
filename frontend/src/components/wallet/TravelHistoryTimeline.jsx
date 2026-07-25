import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, CheckCircle2, TrendingUp, Navigation } from 'lucide-react';

export function TravelHistoryTimeline() {
  const histories = [
    {
      id: 1,
      date: 'Today · 08:34 AM',
      route: 'Central - Airport',
      stops: 'Central Terminus → Airport Terminal 2',
      duration: '42 mins',
      distance: '18.4 km',
      saved: '₹22 saved',
      status: 'Verified Scanned',
    },
    {
      id: 2,
      date: 'Yesterday · 05:15 PM',
      route: 'Central - Airport',
      stops: 'Airport Terminal 2 → Central Terminus',
      duration: '48 mins',
      distance: '18.4 km',
      saved: '₹22 saved',
      status: 'Verified Scanned',
    },
    {
      id: 3,
      date: '08 Jul · 09:12 AM',
      route: 'University - Tech Park',
      stops: 'University Quad → Tech Park Gate 1',
      duration: '22 mins',
      distance: '9.6 km',
      saved: '₹14 saved',
      status: 'Verified Scanned',
    },
    {
      id: 4,
      date: '06 Jul · 05:30 PM',
      route: 'University - Tech Park',
      stops: 'Tech Park Gate 1 → University Quad',
      duration: '25 mins',
      distance: '9.6 km',
      saved: '₹14 saved',
      status: 'Verified Scanned',
    },
  ];

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 pl-1">
        <span>Travel Commutes Timeline</span>
      </div>

      <div className="relative border-l border-white/[0.06] ml-4 pl-6 space-y-6 py-2 text-left">
        {histories.map((h, idx) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="relative flex justify-between items-start gap-4"
          >
            {/* Timeline pulsing dot */}
            <span className="absolute left-[-31px] top-1.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500 border-2 border-slate-950"></span>
            </span>

            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <h5 className="text-xs font-black text-white leading-none">{h.route}</h5>
                <span className="text-[9px] text-slate-500 font-bold whitespace-nowrap">{h.date}</span>
              </div>
              
              <p className="text-[11px] text-slate-400 leading-normal flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span className="truncate">{h.stops}</span>
              </p>

              <div className="flex items-center gap-3.5 text-[9px] text-slate-500 font-bold uppercase tracking-wider pt-0.5">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-600" /> {h.duration}</span>
                <span className="w-1 h-1 rounded-full bg-slate-800" />
                <span className="flex items-center gap-1"><Navigation className="w-3.5 h-3.5 text-slate-600" /> {h.distance}</span>
              </div>
            </div>

            {/* Savings & Validation Tags */}
            <div className="text-right space-y-1 shrink-0">
              <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-400 font-black leading-none bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                <TrendingUp className="w-3 h-3 text-emerald-400" /> {h.saved}
              </span>
              <div className="text-[9px] text-slate-500 font-semibold flex items-center justify-end gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {h.status}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
