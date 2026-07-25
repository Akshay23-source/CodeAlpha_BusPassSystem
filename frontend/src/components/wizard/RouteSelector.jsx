import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Compass, HelpCircle } from 'lucide-react';
import { routeOptions } from '../../theme';

const routeDetails = {
  'Central - Airport': {
    stops: ['Central Terminus', 'Sector 5 Crossing', 'Aero Square', 'Airport Terminal 2'],
    distance: '18.4 km',
    duration: '42 mins',
    fare: '₹45',
  },
  'North Gate - Market': {
    stops: ['North Gate Loop', 'Green Gardens', 'Station Chowk', 'Daily Market Bazaar'],
    distance: '12.2 km',
    duration: '30 mins',
    fare: '₹30',
  },
  'University - Tech Park': {
    stops: ['University Quad', 'Hostel Block C', 'Highway Link 2', 'Tech Park Gate 1'],
    distance: '9.6 km',
    duration: '22 mins',
    fare: '₹25',
  },
  'Harbor - Downtown': {
    stops: ['Harbor Shipyard', 'Coastal Plaza', 'Financial District', 'Downtown Square'],
    distance: '15.8 km',
    duration: '38 mins',
    fare: '₹40',
  },
};

export function RouteSelector({ value = '', onChange, error }) {
  const selectedDetails = routeDetails[value] || null;

  return (
    <div className="space-y-4 w-full">
      {/* Search Route Header Selector */}
      <div className="space-y-1 text-left">
        <label className="text-xs font-semibold text-slate-400 pl-1 block">
          Select Your Transit Commute Line
        </label>
        
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            <Compass className="w-5 h-5" />
          </div>
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-slate-900/40 backdrop-blur-sm text-white text-sm pl-12 appearance-none cursor-pointer ${
              error ? 'border-red-500/80' : 'border-slate-800 focus:border-blue-500'
            }`}
          >
            <option value="" disabled className="bg-slate-950 text-slate-500">Choose your travel route...</option>
            {routeOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-slate-950 text-white">
                {opt}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs">
            ▼
          </div>
        </div>
        {error && (
          <p className="text-xs text-red-400 font-semibold pl-1 pt-0.5">✕ {error}</p>
        )}
      </div>

      {/* Selected Route Info Panels */}
      {selectedDetails && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl border border-white/[0.04] bg-slate-900/10 backdrop-blur-sm text-left grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {/* Distance */}
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Est. Distance</p>
            <h4 className="text-sm font-black text-white">{selectedDetails.distance}</h4>
          </div>

          {/* Time Duration */}
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Travel Duration</p>
            <h4 className="text-sm font-black text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-400" />
              {selectedDetails.duration}
            </h4>
          </div>

          {/* Single Journey Fare */}
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Single Trip Fare</p>
            <h4 className="text-sm font-black text-blue-400">{selectedDetails.fare}</h4>
          </div>

          {/* Route stops timeline */}
          <div className="sm:col-span-3 pt-3.5 border-t border-white/[0.04]">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-3">Line Terminus & Stops</p>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 justify-between relative pl-3.5 sm:pl-0 sm:py-2">
              {/* Horizontal line connector for desktop */}
              <div className="hidden sm:block absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[1.5px] bg-slate-800 pointer-events-none z-0" />
              {/* Vertical line connector for mobile */}
              <div className="sm:hidden absolute left-[6px] top-2 bottom-2 w-[1.5px] bg-slate-800 pointer-events-none z-0" />

              {selectedDetails.stops.map((stop, index) => (
                <div key={stop} className="flex sm:flex-col items-center gap-3 sm:gap-2 relative z-10">
                  <span className="w-3 h-3 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  </span>
                  <span className="text-[10px] font-bold text-slate-300 sm:text-center max-w-[100px] leading-tight">
                    {stop}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
export { routeDetails };
