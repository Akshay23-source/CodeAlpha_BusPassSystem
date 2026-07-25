import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, Key, CreditCard, ShieldCheck, RefreshCw } from 'lucide-react';

export function ActivityFeed() {
  const activities = [
    {
      id: 1,
      type: 'boarding',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />,
      title: 'QR Code Boarding Scanned',
      desc: 'Route Central - Airport · Boarded at Terminus',
      time: 'Today · 08:35 AM',
    },
    {
      id: 2,
      type: 'payment',
      icon: <CreditCard className="w-3.5 h-3.5 text-pink-400" />,
      title: 'Payment Successful',
      desc: 'Purchased Monthly Pass · ₹450.00',
      time: 'Today · 11:24 AM',
    },
    {
      id: 3,
      type: 'renew',
      icon: <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />,
      title: 'Pass Renewed Request',
      desc: 'Extended validity to Aug 15, 2026',
      time: 'Yesterday · 03:40 PM',
    },
    {
      id: 4,
      type: 'login',
      icon: <LogIn className="w-3.5 h-3.5 text-blue-400" />,
      title: 'Session Authenticated',
      desc: 'Chrome browser on Windows OS',
      time: 'Yesterday · 09:12 AM',
    },
  ];

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none text-left">
        Log Activity Feed
      </h4>

      <div className="relative border-l border-white/[0.06] ml-3 pl-4 space-y-4 py-1">
        {activities.map((act, idx) => (
          <motion.div
            key={act.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="relative flex justify-between items-start gap-3"
          >
            {/* Timeline node dot */}
            <span className="absolute left-[-22.5px] top-1.5 w-3 h-3 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            </span>

            <div className="space-y-0.5 text-left flex-1">
              <div className="flex items-center gap-1.5">
                <span className="p-1 rounded bg-slate-950/40 border border-white/5 h-fit text-slate-500 shrink-0">
                  {act.icon}
                </span>
                <span className="text-xs font-bold text-white leading-none">{act.title}</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-normal pl-6 mt-1">{act.desc}</p>
              <p className="text-[9px] text-slate-500 font-semibold pl-6 mt-0.5">{act.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
