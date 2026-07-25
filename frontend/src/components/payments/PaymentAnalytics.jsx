import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';
import { BarChart3, TrendingUp, DollarSign } from 'lucide-react';

const spendData = [
  { name: 'Feb', amount: 350, savings: 120 },
  { name: 'Mar', amount: 450, savings: 180 },
  { name: 'Apr', amount: 550, savings: 210 },
  { name: 'May', amount: 450, savings: 180 },
  { name: 'Jun', amount: 600, savings: 240 },
  { name: 'Jul', amount: 450, savings: 180 },
];

const methodData = [
  { name: 'UPI (GPay)', value: 58 },
  { name: 'Cards', value: 26 },
  { name: 'Net Banking', value: 10 },
  { name: 'Wallet', value: 6 },
];

function AnalyticsTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="p-3.5 rounded-2xl border border-white/[0.08] bg-slate-950/95 backdrop-blur-md shadow-xl text-left space-y-1">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
        {payload.map((item, idx) => (
          <p key={idx} className="text-xs font-bold text-white leading-normal">
            <span style={{ color: item.color }} className="mr-1.5">•</span>
            {item.name}: <span className="font-black">₹{item.value.toFixed(2)}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export function PaymentAnalytics() {
  const [metric, setMetric] = useState('spend'); // spend -> method

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
          Spending & Savings Analytics
        </h4>

        {/* Tab switches */}
        <div className="rounded-xl border border-white/[0.04] bg-slate-900/10 p-1 flex gap-1">
          <button
            onClick={() => setMetric('spend')}
            className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 focus:outline-none ${
              metric === 'spend'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Monthly Spends
          </button>
          <button
            onClick={() => setMetric('method')}
            className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 focus:outline-none ${
              metric === 'method'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> Methods Split
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-52 w-full bg-slate-900/10 border border-white/[0.04] rounded-2xl p-4 overflow-hidden relative">
        <ResponsiveContainer width="100%" height="100%">
          {metric === 'spend' ? (
            <AreaChart data={spendData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 9, fontWeight: 700 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 9, fontWeight: 700 }} />
              <Tooltip content={<AnalyticsTooltip />} />
              <Area type="monotone" dataKey="amount" name="Spends (₹)" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorSpend)" />
              <Area type="monotone" dataKey="savings" name="Savings (₹)" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorSavings)" />
            </AreaChart>
          ) : (
            <BarChart data={methodData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 9, fontWeight: 700 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 9, fontWeight: 700 }} />
              <Tooltip content={<CustomMethodTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.01)' }} />
              <Bar dataKey="value" name="Usage Share (%)" fill="#10b981" radius={[3, 3, 0, 0]} maxBarSize={14} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CustomMethodTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="p-3.5 rounded-2xl border border-white/[0.08] bg-slate-950/95 backdrop-blur-md shadow-xl text-left space-y-1">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
        {payload.map((item, idx) => (
          <p key={idx} className="text-xs font-bold text-white leading-normal">
            <span style={{ color: item.color }} className="mr-1.5">•</span>
            {item.name}: <span className="font-black">{item.value}%</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
}
export default PaymentAnalytics;
