import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, CheckCircle } from 'lucide-react';

export function TravelTimeline() {
  const journeys = [
    {
      id: 1,
      route: 'Central - Airport',
      boarding: 'Central Terminus',
      destination: 'Airport Terminal 2',
      time: 'Today · 08:34 AM',
      duration: '42 mins',
      fare: '₹45',
      status: 'Verified',
    },
    {
      id: 2,
      route: 'Central - Airport',
      boarding: 'Airport Terminal 2',
      destination: 'Central Terminus',
      time: 'Yesterday · 05:15 PM',
      duration: '48 mins',
      fare: '₹45',
      status: 'Verified',
    },
    {
      id: 3,
      route: 'University - Tech Park',
      boarding: 'University Quad',
      destination: 'Tech Park Gate 1',
      time: '08 Jul · 09:12 AM',
      duration: '25 mins',
      fare: '₹30',
      status: 'Verified',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
          Recent Transit Activity
        </h4>
      </div>

      <div className="relative border-l border-slate-800 ml-4 pl-6 space-y-6 py-2">
        {journeys.map((j, idx) => (
          <motion.div
            key={j.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative flex justify-between items-start gap-4"
          >
            {/* Timeline node dot */}
            <span className="absolute left-[-31px] top-1.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500 border border-slate-950"></span>
            </span>

            <div className="space-y-1.5 text-left flex-1">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-black text-white">{j.route}</span>
                <span className="text-[10px] text-slate-500 font-semibold">{j.time}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  {j.boarding} → {j.destination}
                </span>
                <span className="hidden sm:inline text-slate-600">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  {j.duration}
                </span>
              </div>
            </div>

            {/* Price metadata */}
            <div className="text-right space-y-1 shrink-0">
              <p className="text-xs font-bold text-white leading-none">{j.fare}</p>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400 font-bold uppercase tracking-wide">
                <CheckCircle className="w-2.5 h-2.5" />
                {j.status}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
