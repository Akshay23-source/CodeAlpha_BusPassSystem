import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';
import { BarChart3, Leaf, Coins, Zap } from 'lucide-react';

const weeklyData = [
  { name: 'Mon', trips: 2, saved: 44, carbon: 2.4 },
  { name: 'Tue', trips: 4, saved: 88, carbon: 4.8 },
  { name: 'Wed', trips: 3, saved: 66, carbon: 3.6 },
  { name: 'Thu', trips: 2, saved: 44, carbon: 2.4 },
  { name: 'Fri', trips: 5, saved: 110, carbon: 6.0 },
  { name: 'Sat', trips: 1, saved: 22, carbon: 1.2 },
  { name: 'Sun', trips: 0, saved: 0, carbon: 0 },
];

function AnalyticsTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="p-3.5 rounded-2xl border border-white/[0.08] bg-slate-950/95 backdrop-blur-md shadow-xl text-left space-y-1">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
        {payload.map((item, idx) => (
          <p key={idx} className="text-xs font-bold text-white leading-normal">
            <span style={{ color: item.color }} className="mr-1.5">•</span>
            {item.name}: <span className="font-black">{item.value} {item.unit || ''}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export function JourneyAnalytics() {
  const [metric, setMetric] = useState('trips'); // trips -> savings -> eco

  return (
    <div className="space-y-4 w-full">
      {/* Header Metric Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
          Weekly Commute Analytics
        </h4>
        
        {/* Tab switchers */}
        <div className="rounded-xl border border-white/[0.06] bg-slate-900/30 p-1 flex self-start sm:self-auto">
          <button
            onClick={() => setMetric('trips')}
            className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 focus:outline-none ${
              metric === 'trips'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3 h-3" /> Trips
          </button>
          <button
            onClick={() => setMetric('savings')}
            className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 focus:outline-none ${
              metric === 'savings'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Coins className="w-3 h-3" /> Savings
          </button>
          <button
            onClick={() => setMetric('eco')}
            className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 focus:outline-none ${
              metric === 'eco'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Leaf className="w-3 h-3" /> Eco
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-52 w-full bg-slate-900/10 border border-white/[0.04] rounded-2xl p-4 overflow-hidden relative">
        <ResponsiveContainer width="100%" height="100%">
          {metric === 'trips' ? (
            <BarChart data={weeklyData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 9, fontWeight: 700 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 9, fontWeight: 700 }} />
              <Tooltip content={<AnalyticsTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.01)' }} />
              <Bar dataKey="trips" name="Trips Completed" fill="#3b82f6" radius={[3, 3, 0, 0]} maxBarSize={14} />
            </BarChart>
          ) : metric === 'savings' ? (
            <AreaChart data={weeklyData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 9, fontWeight: 700 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 9, fontWeight: 700 }} />
              <Tooltip content={<AnalyticsTooltip />} />
              <Area type="monotone" dataKey="saved" name="Money Saved" unit="₹" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorSavings)" />
            </AreaChart>
          ) : (
            <BarChart data={weeklyData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 9, fontWeight: 700 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 9, fontWeight: 700 }} />
              <Tooltip content={<AnalyticsTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.01)' }} />
              <Bar dataKey="carbon" name="CO₂ Prevented" unit=" kg" fill="#6366f1" radius={[3, 3, 0, 0]} maxBarSize={14} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Summary insights grid */}
      <div className="grid grid-cols-3 gap-2.5 pt-1 text-left">
        <div className="p-3 bg-slate-900/10 border border-white/[0.03] rounded-xl">
          <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest leading-none">Weekly Trips</p>
          <p className="text-xs font-black text-white mt-1">17 Boardings</p>
        </div>
        <div className="p-3 bg-slate-900/10 border border-white/[0.03] rounded-xl">
          <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest leading-none">Weekly Saved</p>
          <p className="text-xs font-black text-emerald-400 mt-1">₹374.00</p>
        </div>
        <div className="p-3 bg-slate-900/10 border border-white/[0.03] rounded-xl">
          <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest leading-none">Route Saved</p>
          <p className="text-xs font-black text-indigo-400 mt-1">🍀 20.4 kg CO₂</p>
        </div>
      </div>
    </div>
  );
}
export default JourneyAnalytics;
