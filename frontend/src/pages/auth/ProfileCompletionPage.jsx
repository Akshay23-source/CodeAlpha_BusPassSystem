import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Bus, Compass, Calendar, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { routeOptions } from '../../theme';

import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';
import { LoadingOverlay } from '../../components/auth/LoadingOverlay';

export function ProfileCompletionPage() {
  const navigate = useNavigate();
  const { user, markProfileAsCompleted } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [route, setRoute] = useState(routeOptions[0] || 'Central - Airport');
  const [frequency, setFrequency] = useState('daily');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate profile completion API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Store preferences locally or mock save
      localStorage.setItem('userPhone', phone);
      localStorage.setItem('userPrefRoute', route);
      localStorage.setItem('userPrefFreq', frequency);
      
      markProfileAsCompleted();
      toast.success('Transit profile configured successfully!');
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 800);
    } catch (err) {
      toast.error('Failed to configure profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout showSidebar={true}>
      <AuthCard
        title="Complete Profile"
        subtitle={`Welcome, ${user?.name || 'Rider'}! Let's tailor your smart transit cockpit`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone Number Field */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 pl-1">Phone Number (Optional)</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <span className="text-sm font-bold">+91</span>
              </div>
              <input
                type="tel"
                placeholder="98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 transition-all duration-300 bg-slate-900/40 backdrop-blur-sm text-white text-sm pl-14"
              />
            </div>
          </div>

          {/* Primary Route Selector */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 pl-1">Preferred Transit Route</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <Compass className="w-5 h-5" />
              </div>
              <select
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 transition-all duration-300 bg-slate-900/40 backdrop-blur-sm text-white text-sm pl-12 appearance-none cursor-pointer"
              >
                {routeOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-slate-950 text-white">
                    {opt}
                  </option>
                ))}
              </select>
              {/* Custom arrow decoration */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Commute Frequency Selector */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 pl-1">Travel Frequency</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'daily', label: 'Daily', icon: <Bus className="w-4 h-4" /> },
                { value: 'weekly', label: 'Weekly', icon: <Calendar className="w-4 h-4" /> },
                { value: 'occasional', label: 'Occasional', icon: <Compass className="w-4 h-4" /> },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFrequency(item.value)}
                  className={`py-2.5 px-2 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all ${
                    frequency === item.value
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-bold'
                      : 'border-slate-800 bg-slate-900/20 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {item.icon}
                  <span className="text-xs">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20 hover:shadow-indigo-500/30 transition-all hover:brightness-105 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            Enter Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </AuthCard>

      <LoadingOverlay show={loading} message="Building travel cockpit..." />
    </AuthLayout>
  );
}
