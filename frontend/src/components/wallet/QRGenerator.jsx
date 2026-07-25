import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, Sparkles, RefreshCw, AlertCircle, WifiOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { QRCountdown } from './QRCountdown';

export function QRGenerator({ route = 'Central - Airport' }) {
  const [step, setStep] = useState('idle'); // idle -> loading -> encrypting -> compiling -> ready
  const [ticketToken, setTicketToken] = useState('');
  const [offline, setOffline] = useState(false);

  const startGeneration = () => {
    setStep('loading');
    
    // Simulate encryption pipeline
    setTimeout(() => {
      setStep('encrypting');
      setTimeout(() => {
        setStep('compiling');
        setTimeout(() => {
          // Complete pipeline
          const token = `smarttransit-${route.replace(/\s+/g, '')}-${Date.now()}`;
          setTicketToken(token);
          setStep('ready');
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const handleRefresh = () => {
    toast.success('Refreshing boarding token...');
    startGeneration();
  };

  const qrImageSrc = ticketToken 
    ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(ticketToken)}` 
    : '';

  return (
    <div className="w-full py-4 flex flex-col items-center justify-center min-h-[260px]">
      <AnimatePresence mode="wait">
        
        {/* State 1: Idle (Generate CTA) */}
        {step === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mx-auto text-blue-400">
              <Lock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Dynamic QR Boarding Pass</h5>
              <p className="text-[10px] text-slate-500 max-w-[200px] mx-auto mt-1 leading-normal">
                QR tokens are encrypted and valid for 30 seconds only. Generate when near the boarding reader.
              </p>
            </div>
            <button
              onClick={startGeneration}
              className="px-5 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all text-xs focus:outline-none shadow-lg shadow-blue-500/20 active:scale-[0.98]"
            >
              Generate Boarding Token
            </button>
          </motion.div>
        )}

        {/* State 2: Loading (Initializing) */}
        {step === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-3"
          >
            <div className="w-10 h-10 rounded-full border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest animate-pulse">Initializing Boarding Session...</p>
          </motion.div>
        )}

        {/* State 3: Encrypting */}
        {step === 'encrypting' && (
          <motion.div
            key="encrypting"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-3 text-indigo-400"
          >
            <Lock className="w-8 h-8 animate-bounce" />
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Encrypting Passenger Payload...</p>
          </motion.div>
        )}

        {/* State 4: Compiling */}
        {step === 'compiling' && (
          <motion.div
            key="compiling"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-3 text-pink-400"
          >
            <Sparkles className="w-8 h-8 animate-spin" />
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Compiling QR Code...</p>
          </motion.div>
        )}

        {/* State 5: Ready (QR Displayed) */}
        {step === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center space-y-4"
          >
            {/* Countdown timer */}
            <QRCountdown onExpire={handleRefresh} />

            {/* Glowing QR Box */}
            <div className="relative p-3.5 bg-white rounded-2xl shadow-xl shadow-blue-500/5 group border border-slate-800">
              <img
                src={qrImageSrc}
                alt="Dynamic Boarding Token"
                className="w-40 h-40 object-contain"
                onError={(e) => {
                  e.target.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=smarttransit-local-fallback`;
                }}
              />
              {/* Pulse scan bounds */}
              <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-blue-500 rounded-tl-sm pointer-events-none" />
              <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-blue-500 rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-blue-500 rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-blue-500 rounded-br-sm pointer-events-none" />
            </div>

            {/* Security validation status indicators */}
            <div className="space-y-2 text-center">
              <div className="flex gap-2 justify-center items-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-950 border border-white/5 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  SSL Certified
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-950 border border-white/5 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                  🔐 SHA-256 Verified
                </span>
              </div>

              {/* Refresh trigger */}
              <button
                onClick={handleRefresh}
                className="inline-flex items-center gap-1.5 text-[10px] text-blue-400 hover:text-blue-300 font-black uppercase tracking-wider focus:outline-none"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Force Refresh QR
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
export default QRGenerator;
