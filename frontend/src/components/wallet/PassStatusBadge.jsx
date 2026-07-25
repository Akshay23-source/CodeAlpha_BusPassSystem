import React from 'react';

export function PassStatusBadge({ status = 'Active' }) {
  const configs = {
    Active: {
      dot: 'bg-emerald-400',
      bg: 'bg-emerald-500/15 border-emerald-500/20 text-emerald-400',
    },
    'Renew Soon': {
      dot: 'bg-amber-400',
      bg: 'bg-amber-500/15 border-amber-500/20 text-amber-400',
    },
    Pending: {
      dot: 'bg-blue-400',
      bg: 'bg-blue-500/15 border-blue-500/20 text-blue-400',
    },
    Suspended: {
      dot: 'bg-red-400',
      bg: 'bg-red-500/15 border-red-500/20 text-red-400',
    },
    Expired: {
      dot: 'bg-slate-400',
      bg: 'bg-slate-800 border-slate-700 text-slate-400',
    },
  };

  const current = configs[status] || configs.Active;

  return (
    <div className={`rounded-full border px-2.5 py-0.5 flex items-center gap-1.5 w-fit ${current.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${current.dot}`} />
      <span className="text-[9px] font-black uppercase tracking-wider leading-none">
        {status}
      </span>
    </div>
  );
}
