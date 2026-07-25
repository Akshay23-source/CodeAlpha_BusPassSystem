import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';
import { BarChart3, TrendingUp, Leaf } from 'lucide-react';

const tripData = [
  { name: 'Jan', trips: 15, saved: 320, carbon: 18 },
  { name: 'Feb', trips: 22, saved: 480, carbon: 26 },
  { name: 'Mar', trips: 28, saved: 610, carbon: 33 },
  { name: 'Apr', trips: 20, saved: 440, carbon: 24 },
  { name: 'May', trips: 32, saved: 710, carbon: 38 },
  { name: 'Jun', trips: 38, saved: 850, carbon: 45 },
];

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="p-3.5 rounded-2xl border border-white/[0.08] bg-slate-950/90 backdrop-blur-md shadow-xl text-left space-y-1">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{label}</p>
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

export function AnalyticsChart() {
  const [activeTab, setActiveTab] = useState('trips');

  return (
    <div className="space-y-4">
      {/* Header with Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5 text-left">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
            Travel Analytics Cockpit
          </h4>
        </div>

        {/* Tab switches */}
        <div className="rounded-xl border border-white/[0.06] bg-slate-900/30 p-1 flex self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('trips')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 focus:outline-none ${
              activeTab === 'trips'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Trips Volume
          </button>
          <button
            onClick={() => setActiveTab('savings')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 focus:outline-none ${
              activeTab === 'savings'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" /> Eco & Savings
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-56 w-full bg-slate-900/10 border border-white/[0.04] rounded-2xl p-4 overflow-hidden relative">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === 'trips' ? (
            <AreaChart data={tripData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(59, 130, 246, 0.2)', strokeWidth: 1.5 }} />
              <Area
                type="monotone"
                dataKey="trips"
                name="Trips Completed"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorTrips)"
              />
            </AreaChart>
          ) : (
            <BarChart data={tripData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.02)' }} />
              <Bar
                dataKey="saved"
                name="Money Saved (₹)"
                fill="#10b981"
                unit="₹"
                radius={[4, 4, 0, 0]}
                maxBarSize={16}
              />
              <Bar
                dataKey="carbon"
                name="CO2 Avoided (kg)"
                fill="#3b82f6"
                unit=" kg"
                radius={[4, 4, 0, 0]}
                maxBarSize={16}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Footer Metrics */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="p-3 bg-slate-900/10 border border-white/[0.03] rounded-xl text-left">
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Popular Commute Route</p>
          <p className="text-xs font-bold text-white mt-1">Central - Airport</p>
        </div>
        <div className="p-3 bg-slate-900/10 border border-white/[0.03] rounded-xl text-left">
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Total Carbon Saved</p>
          <p className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
            🌱 175 kg CO₂
          </p>
        </div>
      </div>
    </div>
  );
}
