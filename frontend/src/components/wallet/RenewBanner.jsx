import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function RenewBanner() {
  const navigate = useNavigate();

  return (
    <div className="w-full p-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
      <div className="flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
        <div>
          <p className="font-bold text-white leading-none">Your bus pass expires in 5 days</p>
          <p className="text-[10px] text-slate-400 font-semibold mt-1">Renew now to maintain discount rates and prevent service disruptions.</p>
        </div>
      </div>
      <button
        onClick={() => navigate('/apply-pass')}
        className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black uppercase text-[10px] tracking-wider hover:bg-amber-400 transition-colors flex items-center gap-1.5 shrink-0"
      >
        Renew Pass Now <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
export default RenewBanner;
