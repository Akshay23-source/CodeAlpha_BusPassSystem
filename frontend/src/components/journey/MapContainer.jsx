import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, ZoomIn, ZoomOut, Eye, Layers, Compass, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function MapContainer({ 
  route = 'Central - Airport Line', 
  selectedStop, 
  onStopSelect,
  liveBusPos = { x: 50, y: 50 } 
}) {
  const [darkTheme, setDarkTheme] = useState(true);
  const [trafficShow, setTrafficShow] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [locating, setLocating] = useState(false);
  const [userPos, setUserPos] = useState({ x: 30, y: 70 });

  // Mock static stops lists
  const stops = [
    { id: 'stop-1', name: 'Central Station Terminal', x: 20, y: 30, lines: ['Line 12', 'Airport Express'], facilities: ['Shelter', 'Elevator', 'Wifi'] },
    { id: 'stop-2', name: 'West Gate University Stop', x: 45, y: 40, lines: ['Line 12', 'Campus Shuttle'], facilities: ['Shelter', 'Ramp Access'] },
    { id: 'stop-3', name: 'Tech Park Crossing', x: 65, y: 55, lines: ['Line 12', 'Metro Link'], facilities: ['Shelter', 'Ticket Kiosk'] },
    { id: 'stop-4', name: 'Airport Passenger Terminal', x: 85, y: 75, lines: ['Airport Express'], facilities: ['Elevator', 'Help Desk', 'Restrooms'] },
  ];

  const handleLocateMe = () => {
    setLocating(true);
    setTimeout(() => {
      setLocating(false);
      setUserPos({ x: 25, y: 65 });
      toast.success('Rider location synchronized on map grid.');
    }, 1200);
  };

  return (
    <div className="w-full h-[360px] rounded-3xl border border-white/[0.06] overflow-hidden relative shadow-2xl bg-slate-950 text-left">
      
      {/* Interactive Vector Map Grid (Simulating dark/light styling layers) */}
      <div 
        className={`w-full h-full relative transition-colors duration-500 overflow-hidden ${
          darkTheme ? 'bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] bg-[#020617]' : 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] bg-[#f8fafc]'
        }`}
      >
        <div 
          className="w-full h-full absolute transition-all duration-300 origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Simulated Transit roads / tracks (SVGs paths) */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Route track */}
            <motion.path
              d="M 150 110 Q 300 150 340 150 T 490 200 T 640 270"
              fill="none"
              stroke={trafficShow ? '#10b981' : '#3b82f6'}
              strokeWidth={trafficShow ? '4' : '3'}
              strokeLinecap="round"
              className="transition-colors duration-300"
            />
            {/* Traffic grids simulation */}
            {trafficShow && (
              <motion.path
                d="M 150 110 Q 300 150 340 150 T 490 200"
                fill="none"
                stroke="#ef4444"
                strokeWidth="4"
                strokeDasharray="8 8"
                animate={{ strokeDashoffset: -20 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </svg>

          {/* User Marker */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{ left: `${userPos.x}%`, top: `${userPos.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-blue-500 opacity-60"></span>
              <div className="w-3.5 h-3.5 rounded-full bg-blue-500 border border-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Animated Bus Node */}
          <motion.div
            animate={{
              x: [150, 280, 340, 480, 600],
              y: [110, 140, 150, 195, 260],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative flex items-center justify-center group">
              <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-pink-500 opacity-30"></span>
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-pink-600 to-rose-500 border-2 border-white shadow-lg flex items-center justify-center text-[8px] font-black text-white">
                B
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-6 bg-slate-900 border border-slate-800 text-[8px] font-bold text-white px-2 py-0.5 rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Speed: 42 km/h · Occupancy: 64%
              </div>
            </div>
          </motion.div>

          {/* Bus Stops Pulsing markers */}
          {stops.map((stop) => {
            const isSelected = selectedStop?.id === stop.id;
            return (
              <button
                key={stop.id}
                onClick={() => onStopSelect(stop)}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
              >
                <div className="relative flex items-center justify-center group">
                  <motion.span
                    animate={isSelected ? { scale: [1, 1.4, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`absolute inline-flex h-5 w-5 rounded-full opacity-40 ${
                      isSelected ? 'bg-emerald-400' : 'bg-slate-500'
                    }`}
                  />
                  <div className={`w-3.5 h-3.5 rounded-full border-2 transition-colors ${
                    isSelected ? 'bg-emerald-400 border-white' : 'bg-slate-800 border-slate-600'
                  }`} />
                  
                  {/* Hover titles */}
                  <div className="absolute top-5 bg-slate-950/90 border border-white/5 text-[8px] font-bold text-white px-2 py-0.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {stop.name}
                  </div>
                </div>
              </button>
            );
          })}

        </div>
      </div>

      {/* Floating control buttons (Locate me, Zoom, layers, dark theme) */}
      <div className="absolute bottom-4 right-4 z-30 flex flex-col gap-2">
        <button
          onClick={handleLocateMe}
          className="p-2 rounded-xl border border-slate-800 bg-slate-950/80 text-slate-400 hover:text-white transition-all shadow-md focus:outline-none"
          title="Locate Current Position"
        >
          {locating ? <Loader2 className="w-4 h-4 animate-spin text-blue-400" /> : <Navigation className="w-4 h-4" />}
        </button>

        <button
          onClick={() => setZoomLevel(z => Math.min(z + 0.25, 2))}
          className="p-2 rounded-xl border border-slate-800 bg-slate-950/80 text-slate-400 hover:text-white transition-all shadow-md focus:outline-none"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={() => setZoomLevel(z => Math.max(z - 0.25, 0.75))}
          className="p-2 rounded-xl border border-slate-800 bg-slate-950/80 text-slate-400 hover:text-white transition-all shadow-md focus:outline-none"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 z-30 flex gap-2">
        <button
          onClick={() => setDarkTheme(!darkTheme)}
          className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950/80 text-[9px] font-bold text-slate-400 hover:text-white transition-all shadow-md focus:outline-none uppercase tracking-wider"
        >
          {darkTheme ? 'Light Grid' : 'Dark Grid'}
        </button>

        <button
          onClick={() => setTrafficShow(!trafficShow)}
          className={`px-3 py-1.5 rounded-xl border text-[9px] font-bold transition-all shadow-md focus:outline-none uppercase tracking-wider ${
            trafficShow ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400' : 'border-slate-800 bg-slate-950/80 text-slate-400 hover:text-white'
          }`}
        >
          Traffic Feed
        </button>
      </div>

      {/* Expanse detail overlay drawer on selected stop click */}
      <AnimatePresence>
        {selectedStop && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80 z-30 p-4 rounded-2xl border border-slate-800 bg-slate-950/95 backdrop-blur-md shadow-2xl text-xs space-y-2.5"
          >
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-black text-white leading-none">{selectedStop.name}</h5>
                <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block mt-1">Bus Stop Station</span>
              </div>
              <button 
                onClick={() => onStopSelect(null)} 
                className="text-[9px] font-bold text-slate-400 hover:text-white border border-slate-800 px-1.5 py-0.5 rounded focus:outline-none"
              >
                Close
              </button>
            </div>

            <div className="space-y-1 text-slate-400 font-semibold">
              <p className="flex justify-between text-[10px]">
                <span className="text-slate-500 font-bold">Routes Serving:</span>
                <span className="text-white">{selectedStop.lines.join(', ')}</span>
              </p>
              <p className="flex justify-between text-[10px]">
                <span className="text-slate-500 font-bold">ETA:</span>
                <span className="text-emerald-400">Arriving in 3 mins</span>
              </p>
            </div>

            <div className="flex gap-1 flex-wrap pt-1 border-t border-white/[0.03]">
              {selectedStop.facilities.map((fac) => (
                <span key={fac} className="px-2 py-0.5 rounded bg-slate-800 text-[8px] text-slate-400 font-bold uppercase">
                  {fac}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
export default MapContainer;
