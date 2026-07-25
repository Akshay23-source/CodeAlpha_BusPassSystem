import React from 'react';
import { Check, X, ShieldCheck, Clock, Ticket } from 'lucide-react';

export function PassTable({ passes = [], onApprove, onReject }) {
  return (
    <div className="space-y-4 text-left w-full">
      <div className="overflow-x-auto border border-white/[0.04] rounded-2xl bg-slate-900/10 backdrop-blur-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/[0.04] text-slate-500 font-bold uppercase tracking-wider text-[9px]">
              <th className="py-3 px-4">Pass ID</th>
              <th className="py-3 px-4">Route Details</th>
              <th className="py-3 px-4">Pass Type</th>
              <th className="py-3 px-4 text-right">Fare Paid</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-right">Approval Actions</th>
            </tr>
          </thead>
          <tbody>
            {passes.length > 0 ? (
              passes.map((p) => (
                <tr key={p.id} className="border-b border-white/[0.03] hover:bg-slate-950/20 transition-all">
                  <td className="py-3 px-4 font-mono font-bold text-white">#T-{p.id}</td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-white leading-none">{p.route}</p>
                    <p className="text-[9px] text-slate-500 font-semibold mt-1.5">Smart Commute Line</p>
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-semibold uppercase">{p.pass_type || 'monthly'}</td>
                  <td className="py-3 px-4 text-right font-black text-white">₹{(p.amount || 450).toFixed(2)}</td>
                  <td className="py-3 px-4 text-center">
                    {p.status === 'approved' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400 font-bold uppercase tracking-wide">
                        Approved
                      </span>
                    ) : p.status === 'rejected' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-[9px] text-red-400 font-bold uppercase tracking-wide">
                        Rejected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] text-blue-400 font-bold uppercase tracking-wide animate-pulse">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {p.status === 'pending' && (
                      <div className="flex gap-1.5 justify-end">
                        <button
                          onClick={() => onApprove(p.id)}
                          className="p-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:text-white hover:bg-emerald-600 transition-colors focus:outline-none"
                          title="Approve Request"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onReject(p.id)}
                          className="p-1.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:text-white hover:bg-red-600 transition-colors focus:outline-none"
                          title="Reject Request"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-500 italic">No pass requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default PassTable;
