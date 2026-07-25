import React from 'react';

export function SkeletonPulse() {
  return (
    <div className="animate-pulse bg-slate-800 rounded-xl w-full h-full" />
  );
}

export function StatSkeleton() {
  return (
    <div className="rounded-2xl border border-white/[0.04] bg-slate-900/20 p-5 h-24 flex items-center justify-between animate-pulse">
      <div className="space-y-2 flex-1 pr-4">
        <div className="h-2 bg-slate-800 rounded w-1/3" />
        <div className="h-5 bg-slate-800 rounded w-3/4" />
        <div className="h-2 bg-slate-800 rounded w-1/2" />
      </div>
      <div className="w-10 h-10 rounded-xl bg-slate-800 shrink-0" />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="space-y-3.5 w-full animate-pulse p-4 rounded-2xl border border-white/[0.04]">
      {/* Table header skeleton */}
      <div className="flex gap-4 border-b border-white/[0.04] pb-3">
        <div className="h-3 bg-slate-800 rounded w-1/4" />
        <div className="h-3 bg-slate-800 rounded w-1/4" />
        <div className="h-3 bg-slate-800 rounded w-1/4" />
        <div className="h-3 bg-slate-800 rounded w-1/4" />
      </div>
      
      {/* Table rows skeleton */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex gap-4 items-center py-2">
          <div className="w-8 h-8 rounded-lg bg-slate-800 shrink-0" />
          <div className="h-3 bg-slate-800 rounded flex-1" />
          <div className="h-3 bg-slate-800 rounded w-16" />
          <div className="h-3 bg-slate-800 rounded w-20" />
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-3xl border border-white/[0.04] bg-slate-900/20 p-6 space-y-4 animate-pulse">
      <div className="w-12 h-12 rounded-2xl bg-slate-800" />
      <div className="space-y-2">
        <div className="h-4 bg-slate-800 rounded w-1/3" />
        <div className="h-3 bg-slate-800 rounded w-3/4" />
      </div>
      <div className="h-10 bg-slate-800 rounded-xl w-full" />
    </div>
  );
}
