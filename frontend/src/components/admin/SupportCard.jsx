import React from 'react';
import { LifeBuoy, AlertTriangle, ShieldCheck, Mail, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

export function SupportCard() {
  const tickets = [
    { id: 'TCK-202', user: 'Rohan Sharma', title: 'Payment failed but deducted', priority: 'High', date: '10 mins ago' },
    { id: 'TCK-203', user: 'Neha Gupta', title: 'Route 12 timetable query', priority: 'Low', date: '1 hour ago' },
    { id: 'TCK-204', user: 'Vikram Singh', title: 'Student card approval delay', priority: 'Medium', date: '3 hours ago' },
  ];

  const handleResolve = (tckId) => {
    toast.success(`Ticket ${tckId} marked as RESOLVED.`);
  };

  return (
    <div className="space-y-4 text-left w-full">
      <div className="flex items-center gap-2">
        <LifeBuoy className="w-4 h-4 text-indigo-400" />
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
          Support Queue
        </h4>
      </div>

      <div className="space-y-3">
        {tickets.map((tck) => (
          <div key={tck.id} className="p-4 rounded-2xl border border-white/[0.04] bg-slate-900/10 backdrop-blur-sm relative group flex justify-between items-start gap-4">
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-slate-500 font-mono">{tck.id}</span>
                <span className={`text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  tck.priority === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse' : tck.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tck.priority}
                </span>
                <span className="text-[9px] text-slate-500 font-semibold">{tck.date}</span>
              </div>
              <h5 className="text-xs font-bold text-white leading-none mt-1.5 truncate">{tck.title}</h5>
              <p className="text-[10px] text-slate-400 font-semibold leading-none mt-1.5">User: {tck.user}</p>
            </div>

            {/* Actions button */}
            <div className="flex gap-1 shrink-0 self-center">
              <button
                onClick={() => handleResolve(tck.id)}
                className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:text-white hover:bg-emerald-600 transition-colors text-[9px] font-bold uppercase tracking-wider focus:outline-none"
              >
                Resolve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SupportCard;
