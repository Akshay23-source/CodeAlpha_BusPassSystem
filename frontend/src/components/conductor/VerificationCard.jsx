import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CheckCircle2, ShieldAlert, RefreshCw, Clock, User, Ticket } from 'lucide-react';
import toast from 'react-hot-toast';

export function VerificationCard({ user }) {
  const [scanState, setScanState] = useState('idle'); // idle -> scanning -> success -> error
  const [passenger, setPassenger] = useState(null);

  const startScanning = () => {
    setScanState('scanning');
    
    // Simulate camera feed lock on QR pass after 2 seconds
    setTimeout(() => {
      // Complete mock validation checks
      setPassenger({
        name: user?.name || 'Smart Rider',
        email: user?.email || 'rider@smarttransit.cloud',
        passId: 'T-2884',
        route: localStorage.getItem('userPrefRoute') || 'Central - Airport',
        status: 'Active',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      });
      setScanState('success');
      toast.success('Pass Validated! Journey logged successfully.');
    }, 2200);
  };

  const handleReset = () => {
    setScanState('idle');
    setPassenger(null);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-[32px] border border-white/[0.08] bg-slate-900/40 backdrop-blur-md shadow-2xl relative overflow-hidden space-y-6">
      <div className="absolute top-[-10%] left-[-10%] w-24 h-24 rounded-full bg-blue-500/5 blur-xl" />

      {/* Header */}
      <div className="space-y-1.5 text-left">
        <h3 className="text-base font-black text-white leading-none">Conductor Verification Terminal</h3>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Secure Boarding Validator</p>
      </div>

      <AnimatePresence mode="wait">
        
        {/* State 1: Idle (Ready to Scan) */}
        {scanState === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-8 space-y-5"
          >
            <div className="w-20 h-20 rounded-3xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Camera className="w-8 h-8 animate-pulse" />
            </div>
            <div className="space-y-1 text-center">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Device Ready</h4>
              <p className="text-[10px] text-slate-500 max-w-[200px] mx-auto mt-1 leading-normal">
                Point conductor validation camera frame at passenger secure QR boarding pass.
              </p>
            </div>
            <button
              onClick={startScanning}
              className="px-5 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all text-xs focus:outline-none shadow-lg shadow-blue-500/20 active:scale-[0.98]"
            >
              Launch Boarding Camera Scanner
            </button>
          </motion.div>
        )}

        {/* State 2: Scanning Viewport */}
        {scanState === 'scanning' && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center space-y-4"
          >
            {/* Simulated Camera Viewfinder */}
            <div className="relative w-64 h-64 rounded-3xl border-2 border-slate-700 bg-slate-950 overflow-hidden shadow-inner flex items-center justify-center">
              <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:12px_12px]" />
              
              {/* Spinning status spinner */}
              <div className="w-12 h-12 rounded-full border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin z-10" />

              {/* Scanning laser line */}
              <motion.div
                animate={{ y: [0, 230, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                className="absolute left-2 right-2 h-0.5 bg-emerald-500 shadow-md shadow-emerald-500/80 z-20"
              />

              {/* Viewfinder Target Corner Markers */}
              <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-emerald-500 rounded-tl-sm" />
              <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-emerald-500 rounded-tr-sm" />
              <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-emerald-500 rounded-bl-sm" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-emerald-500 rounded-br-sm" />
            </div>

            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest animate-pulse">Scanning QR Secure Barcode...</p>
          </motion.div>
        )}

        {/* State 3: Success Overlay details */}
        {scanState === 'success' && passenger && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Header Success result tag */}
            <div className="p-4 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 text-center flex flex-col items-center justify-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-bounce" />
              <div className="space-y-0.5">
                <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest">VALID TRANSIT TICKET</h4>
                <p className="text-[9px] text-slate-500 font-bold">BOARDING ALLOWED · COMMUTE INITIATED</p>
              </div>
            </div>

            {/* Passenger Data Lists */}
            <div className="p-4 rounded-2xl border border-white/[0.04] bg-slate-950/40 text-left space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white leading-none">{passenger.name}</h5>
                  <p className="text-[9px] text-slate-500 mt-1 leading-none">{passenger.email}</p>
                </div>
              </div>

              <div className="h-px bg-white/[0.04]" />

              <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-slate-400">
                <div className="space-y-1">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Pass ID</span>
                  <p className="text-white font-mono mt-1 leading-none">#T-{passenger.passId}</p>
                </div>
                
                <div className="space-y-1">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Route Match</span>
                  <p className="text-white mt-1 leading-none">{passenger.route}</p>
                </div>

                <div className="space-y-1 col-span-2">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Scanned Timestamp</span>
                  <p className="text-white font-mono mt-1 leading-none flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-600" />
                    Today · {passenger.timestamp}
                  </p>
                </div>
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl border border-slate-800 bg-slate-900/30 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-colors flex items-center justify-center gap-1.5 focus:outline-none"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" /> Scan Next Passenger Pass
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
