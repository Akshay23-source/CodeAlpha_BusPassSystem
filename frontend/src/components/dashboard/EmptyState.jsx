import React from 'react';
import { Compass, AlertCircle, Ticket, CreditCard } from 'lucide-react';

export function EmptyState({ type = 'no-pass', message = 'No entries found' }) {
  const configs = {
    'no-pass': {
      icon: <Ticket className="w-8 h-8 text-blue-500/60" />,
      title: 'No Active Pass',
      desc: "Configure route details and upload documents to issue your first smart pass.",
    },
    'no-trips': {
      icon: <Compass className="w-8 h-8 text-indigo-500/60" />,
      title: 'No Commutes Registered',
      desc: 'Scan your smart pass boarding code at entry readers to log travel details.',
    },
    'no-payments': {
      icon: <CreditCard className="w-8 h-8 text-pink-500/60" />,
      title: 'No Invoices Issued',
      desc: 'Transactions and bills will be listed once subscriptions are active.',
    },
  };

  const current = configs[type] || configs['no-pass'];

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-white/[0.04] rounded-2xl bg-slate-900/10 backdrop-blur-sm max-w-sm mx-auto">
      <div className="p-4 rounded-full bg-slate-950/60 border border-white/5 shadow-md mb-4 flex items-center justify-center">
        {current.icon}
      </div>
      <h5 className="text-xs font-bold text-white uppercase tracking-wider">{current.title}</h5>
      <p className="text-[11px] text-slate-400 font-semibold leading-relaxed mt-2 max-w-[240px]">
        {current.desc || message}
      </p>
    </div>
  );
}
