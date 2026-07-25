import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Navigation, Info, ShieldAlert } from 'lucide-react';
import { QRGenerator } from './QRGenerator';

export function JourneyModal({ show, onClose, route = 'Central - Airport' }) {
  const currentStop = 'Central Terminus';
  const nextStop = 'Sector 5 Crossing';
  const busNumber = 'BS-0941 (Line A)';
  const eta = '3 mins';

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="relative w-full max-w-sm p-6 rounded-[32px] border border-white/[0.08] bg-slate-900/90 shadow-2xl text-center space-y-5 overflow-hidden z-10"
            style={{
              boxShadow: '0 20px 50px -10px rgba(0,0,0,0.5), inset 0 1px 0 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1.5 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-500 hover:text-white transition-colors focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="space-y-1 pt-2">
              <h3 className="text-lg font-black text-white">Start Your Journey</h3>
              <p className="text-xs text-slate-400 font-semibold">{route}</p>
            </div>

            {/* Simulated Live Bus ETA Cards */}
            <div className="p-4 rounded-2xl border border-white/[0.04] bg-slate-950/40 text-left space-y-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Nearest Stop</span>
                  <p className="text-xs font-bold text-white mt-1 leading-none">{currentStop}</p>
                </div>
                <div className="px-2.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[9px] text-blue-400 font-bold uppercase tracking-wide">
                  ETA: {eta}
                </div>
              </div>

              <div className="h-px bg-white/[0.04]" />

              <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-slate-400">
                <div className="space-y-1">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Vehicle Line</span>
                  <p className="text-white font-mono mt-1 leading-none">{busNumber}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Next Stop</span>
                  <p className="text-white mt-1 leading-none">{nextStop}</p>
                </div>
              </div>
            </div>

            {/* Encryption dynamic QR Code generator */}
            <QRGenerator route={route} />

            {/* Footer warning */}
            <div className="flex gap-2 justify-center items-center text-[10px] text-slate-500 font-semibold pt-1 border-t border-white/[0.04]">
              <Info className="w-3.5 h-3.5 text-slate-600" />
              <span>Conductor must scan code within 30s.</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
export default JourneyModal;
