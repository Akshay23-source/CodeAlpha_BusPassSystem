import React from 'react';

export function Divider({ children = 'or' }) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-slate-800/80" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-slate-950 px-3 text-slate-500 font-semibold tracking-wider">
          {children}
        </span>
      </div>
    </div>
  );
}
