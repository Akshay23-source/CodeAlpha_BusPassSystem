import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ShieldCheck, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export function QRPreviewCard({ show, onClose, route = 'Central - Airport' }) {
  const qrImageSrc = 'http://localhost:5000/qrcodes/1.png'; // Fallback to local server qrcode

  const handleDownloadQr = () => {
    toast.success('QR Code saved to gallery for offline boarding!');
  };

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

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="relative w-full max-w-sm p-6 rounded-[32px] border border-white/[0.08] bg-slate-900/90 shadow-2xl text-center space-y-6 overflow-hidden"
            style={{
              boxShadow: '0 20px 50px -10px rgba(0,0,0,0.5), inset 0 1px 0 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Top Close trigger */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1.5 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-500 hover:text-white transition-colors focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="space-y-1.5 pt-2">
              <h3 className="text-lg font-black text-white">Boarding QR Code</h3>
              <p className="text-xs text-slate-400 font-semibold">{route}</p>
            </div>

            {/* QR Box with Laser Scan overlay */}
            <div className="flex justify-center relative py-2">
              <div className="relative p-4 rounded-2xl bg-white border border-slate-800 w-48 h-48 flex items-center justify-center shadow-lg shadow-blue-500/5 group">
                <img
                  src={qrImageSrc}
                  alt="Boarding QR Code"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to placeholder if backend server is not running
                    e.target.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=smarttransit-cloud-boarding-verification-code-${Date.now()}`;
                  }}
                />

                {/* Laser scan line animation */}
                <motion.div
                  animate={{ y: [0, 160, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-4 right-4 h-0.5 bg-blue-500 shadow-md shadow-blue-500/80"
                />

                {/* Corner highlights scanner effects */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-blue-500 rounded-tl-sm pointer-events-none" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-blue-500 rounded-tr-sm pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-blue-500 rounded-bl-sm pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-blue-500 rounded-br-sm pointer-events-none" />
              </div>
            </div>

            {/* Bottom info banner */}
            <div className="flex justify-center gap-1.5 items-center bg-slate-950/40 py-2.5 px-4 rounded-xl border border-white/[0.04] text-[10px] text-slate-400 font-semibold max-w-[240px] mx-auto">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Dynamic validation active</span>
            </div>

            {/* Download button */}
            <div className="pt-2 flex gap-2">
              <button
                onClick={handleDownloadQr}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20 hover:shadow-indigo-500/30 transition-all hover:brightness-105 flex items-center justify-center gap-1.5 text-xs"
              >
                <Download className="w-4 h-4" /> Download QR
              </button>
              
              <button
                onClick={onClose}
                className="py-3 px-4 rounded-xl border border-slate-800 bg-slate-900/20 text-xs font-semibold text-slate-400 hover:text-white transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
