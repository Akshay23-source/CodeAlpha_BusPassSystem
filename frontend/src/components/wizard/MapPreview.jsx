import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, ZoomIn, ZoomOut, Navigation, MapPin } from 'lucide-react';

const pathsMap = {
  'Central - Airport': {
    d: 'M 40 180 Q 90 90 140 130 T 240 50',
    stops: [
      { name: 'Central Terminus', x: 40, y: 180 },
      { name: 'Sector 5 Crossing', x: 100, y: 135 },
      { name: 'Aero Square', x: 160, y: 120 },
      { name: 'Airport Terminal 2', x: 240, y: 50 },
    ],
    color: '#3b82f6',
  },
  'North Gate - Market': {
    d: 'M 50 50 L 110 90 L 170 140 L 230 180',
    stops: [
      { name: 'North Gate Loop', x: 50, y: 50 },
      { name: 'Green Gardens', x: 110, y: 90 },
      { name: 'Station Chowk', x: 170, y: 140 },
      { name: 'Daily Market Bazaar', x: 230, y: 180 },
    ],
    color: '#8b5cf6',
  },
  'University - Tech Park': {
    d: 'M 50 180 L 120 130 L 180 80 L 230 40',
    stops: [
      { name: 'University Quad', x: 50, y: 180 },
      { name: 'Hostel Block C', x: 120, y: 130 },
      { name: 'Highway Link 2', x: 180, y: 80 },
      { name: 'Tech Park Gate 1', x: 230, y: 40 },
    ],
    color: '#ec4899',
  },
  'Harbor - Downtown': {
    d: 'M 240 50 Q 170 120 120 140 T 40 200',
    stops: [
      { name: 'Harbor Shipyard', x: 240, y: 50 },
      { name: 'Coastal Plaza', x: 160, y: 115 },
      { name: 'Financial District', x: 100, y: 140 },
      { name: 'Downtown Square', x: 40, y: 200 },
    ],
    color: '#10b981',
  },
};

export function MapPreview({ route = 'Central - Airport' }) {
  const activePath = pathsMap[route] || pathsMap['Central - Airport'];
  const [zoom, setZoom] = useState(1);
  const [locationPulse, setLocationPulse] = useState(false);

  const handleCurrentLocation = () => {
    setLocationPulse(true);
    setTimeout(() => setLocationPulse(false), 3000);
  };

  return (
    <div className="space-y-3.5 w-full">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 pl-1">
        <span>Route Map Preview</span>
        <span className="flex items-center gap-1 text-[10px] text-blue-400 font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" /> Google Maps API Wrapper Active
        </span>
      </div>

      {/* Vector Dark-Theme Map Box */}
      <div className="relative h-60 w-full rounded-2xl border border-white/[0.05] bg-slate-950 overflow-hidden shadow-inner flex items-center justify-center">
        {/* Abstract vector grid lines map background */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />

        {/* Map elements Container with zoom scale */}
        <motion.div
          animate={{ scale: zoom }}
          transition={{ duration: 0.3 }}
          className="relative w-[300px] h-[220px]"
        >
          {/* Simulated Location Marker (Pulsing blue dot) */}
          <div className="absolute top-[80px] left-[70px] z-20 flex h-3.5 w-3.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60 ${locationPulse ? 'duration-500 scale-[2.5]' : ''}`}></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500 border-2 border-slate-950"></span>
          </div>

          <svg className="w-full h-full" viewBox="0 0 280 220" fill="none">
            {/* Draw road networks background grey lines */}
            <path d="M 20 40 L 260 40" stroke="rgba(255,255,255,0.03)" strokeWidth="2" />
            <path d="M 40 20 L 40 200" stroke="rgba(255,255,255,0.03)" strokeWidth="2" />
            <path d="M 240 20 L 240 200" stroke="rgba(255,255,255,0.03)" strokeWidth="2" />
            <path d="M 20 180 L 260 180" stroke="rgba(255,255,255,0.03)" strokeWidth="2" />

            {/* Dynamic Transit Route Line (Animated dashed stroke) */}
            <motion.path
              d={activePath.d}
              stroke={activePath.color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="8,8"
              animate={{ strokeDashoffset: [-80, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />

            {/* Glowing nodes stations */}
            {activePath.stops.map((stop, index) => {
              const isTerminus = index === 0 || index === activePath.stops.length - 1;
              return (
                <g key={stop.name}>
                  {/* Outer circle glow */}
                  <circle
                    cx={stop.x}
                    cy={stop.y}
                    r={isTerminus ? "7" : "5"}
                    fill={isTerminus ? `${activePath.color}20` : '#020617'}
                    stroke={activePath.color}
                    strokeWidth="1.5"
                  />
                  {/* Inner dot */}
                  <circle cx={stop.x} cy={stop.y} r="2.5" fill={activePath.color} />
                  
                  {/* Station Label */}
                  <text
                    x={stop.x}
                    y={stop.y - 10}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="7"
                    fontWeight="800"
                    className="font-bold tracking-tight"
                  >
                    {stop.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Map Control Utilities */}
        <div className="absolute right-3.5 bottom-3.5 flex flex-col gap-1.5 z-20">
          <button
            type="button"
            onClick={() => setZoom(prev => Math.min(prev + 0.2, 1.8))}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition-colors focus:outline-none"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.7))}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition-colors focus:outline-none"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleCurrentLocation}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition-colors focus:outline-none"
            title="Focus Current Location"
          >
            <Navigation className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
export { pathsMap };
