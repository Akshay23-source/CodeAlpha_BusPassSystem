import React from 'react';
import { WifiOff, RefreshCcw } from 'lucide-react';

export function OfflineIndicator() {
  const lastSync = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex items-center justify-between px-4 py-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 text-amber-400 text-[10px] font-semibold w-full">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
        <span>Offline boarding pass cached & ready</span>
      </div>
      <div className="flex items-center gap-1 text-[9px] text-slate-500 font-bold uppercase tracking-wider">
        <RefreshCcw className="w-3 h-3 text-slate-600 animate-spin" style={{ animationDuration: '4s' }} />
        <span>Last synced: Today {lastSync}</span>
      </div>
    </div>
  );
}
