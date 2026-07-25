import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, AlertTriangle, TrendingUp, GraduationCap } from 'lucide-react';

export function AIInsightCard() {
  const insights = [
    {
      icon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
      title: 'Pass renewals rate is 93%',
      desc: 'Early student pricing incentives increased weekly retention by 6.4%.',
      color: 'border-emerald-500/10 bg-emerald-500/5',
    },
    {
      icon: <AlertTriangle className="w-4 h-4 text-red-400" />,
      title: 'Route 12 is overcrowded during 08:30 AM',
      desc: 'Passengers exceeded seating limits by 28%. Allocation of one helper bus is recommended.',
      color: 'border-red-500/10 bg-red-500/5',
    },
    {
      icon: <GraduationCap className="w-4 h-4 text-blue-400" />,
      title: 'Central Tech University has 142 active riders',
      desc: 'Remains the most active college node this semester, contributing 42% of total passes revenue.',
      color: 'border-blue-500/10 bg-blue-500/5',
    },
  ];

  return (
    <div className="space-y-4 text-left w-full">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
          AI Commute Insights
        </h4>
      </div>

      <div className="space-y-3">
        {insights.map((ins, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className={`flex gap-3.5 p-4 rounded-2xl border transition-all ${ins.color}`}
          >
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5 h-fit shrink-0 shadow-sm">
              {ins.icon}
            </div>
            
            <div className="space-y-1 text-left">
              <h5 className="text-xs font-bold text-white leading-none">{ins.title}</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-1.5">{ins.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
export default AIInsightCard;
