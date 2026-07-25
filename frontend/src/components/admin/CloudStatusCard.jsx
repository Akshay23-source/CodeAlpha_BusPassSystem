import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, Database, Server, Radio, Network } from 'lucide-react';

export function CloudStatusCard() {
  const monitors = [
    { name: 'Core API Engine', status: 'online', latency: '4ms', icon: <Server className="w-4 h-4 text-emerald-400" /> },
    { name: 'PostgreSQL Database', status: 'online', latency: '12ms', icon: <Database className="w-4 h-4 text-emerald-400" /> },
    { name: 'Redis Cache Node', status: 'online', latency: '1ms', icon: <Radio className="w-4 h-4 text-emerald-400" /> },
    { name: 'Boarding WebSockets', status: 'online', latency: '8ms', icon: <Network className="w-4 h-4 text-emerald-400" /> },
  ];

  return (
    <div className="space-y-4 text-left w-full">
      <div className="flex items-center gap-2">
        <Cpu className="w-4 h-4 text-pink-400 animate-pulse" />
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
          System Infrastructure Monitor
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-4">
        
        {/* Core Resources indicators (CPU, Memory, Storage) */}
        <div className="p-5 rounded-3xl border border-white/[0.06] bg-slate-900/10 backdrop-blur-sm grid grid-cols-3 gap-4">
          {/* CPU */}
          <div className="space-y-2 text-center">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">CPU Load</span>
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <span className="text-xs font-black text-white">18%</span>
              <svg className="absolute w-full h-full -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.02)" strokeWidth="4" fill="none" />
                <motion.circle
                  cx="32" cy="32" r="28" stroke="#f43f5e" strokeWidth="4" fill="none"
                  strokeDasharray="175" strokeDashoffset={175 * (1 - 0.18)}
                  transition={{ duration: 1.5 }}
                />
              </svg>
            </div>
          </div>

          {/* Memory */}
          <div className="space-y-2 text-center">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">RAM Util</span>
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <span className="text-xs font-black text-white">42%</span>
              <svg className="absolute w-full h-full -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.02)" strokeWidth="4" fill="none" />
                <motion.circle
                  cx="32" cy="32" r="28" stroke="#a855f7" strokeWidth="4" fill="none"
                  strokeDasharray="175" strokeDashoffset={175 * (1 - 0.42)}
                  transition={{ duration: 1.5 }}
                />
              </svg>
            </div>
          </div>

          {/* Storage */}
          <div className="space-y-2 text-center">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Disk Util</span>
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <span className="text-xs font-black text-white">56%</span>
              <svg className="absolute w-full h-full -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.02)" strokeWidth="4" fill="none" />
                <motion.circle
                  cx="32" cy="32" r="28" stroke="#3b82f6" strokeWidth="4" fill="none"
                  strokeDasharray="175" strokeDashoffset={175 * (1 - 0.56)}
                  transition={{ duration: 1.5 }}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Cloud services indicators lists */}
        <div className="p-5 rounded-3xl border border-white/[0.06] bg-slate-900/10 backdrop-blur-sm space-y-3">
          {monitors.map((mon) => (
            <div key={mon.name} className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-slate-950/40 border border-white/5 shrink-0">
                  {mon.icon}
                </div>
                <span className="text-white font-bold">{mon.name}</span>
              </div>
              <span className="text-[9px] text-slate-500 font-mono">{mon.latency}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
export default CloudStatusCard;
