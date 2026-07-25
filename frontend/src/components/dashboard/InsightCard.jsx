import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, TrendingUp, ShieldAlert } from 'lucide-react';

export function InsightCard() {
  const insights = [
    {
      icon: <ShieldAlert className="w-4 h-4 text-amber-400" />,
      title: 'Pass expiring in 5 days',
      desc: 'Renew now to lock in early student pricing and prevent gaps.',
      color: 'border-amber-500/10 bg-amber-500/5',
    },
    {
      icon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
      title: 'You saved ₹480 this month',
      desc: 'Digital smart pass fares saved you 32% compared to paper passes.',
      color: 'border-emerald-500/10 bg-emerald-500/5',
    },
    {
      icon: <Sparkles className="w-4 h-4 text-blue-400" />,
      title: 'Peak travel time matches 08:30 AM',
      desc: 'Boarding Central Terminus line early gets you seats.',
      color: 'border-blue-500/10 bg-blue-500/5',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-blue-400" />
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
          Smart Travel Insights
        </h4>
      </div>

      <div className="space-y-3">
        {insights.map((ins, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`flex gap-3.5 p-4 rounded-2xl border transition-all ${ins.color}`}
          >
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5 h-fit shrink-0 shadow-sm">
              {ins.icon}
            </div>
            
            <div className="space-y-1 text-left">
              <h5 className="text-xs font-bold text-white leading-none">{ins.title}</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-1">{ins.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
