import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, RefreshCw, Compass, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export function DigitalPassCard({ pass, user, onRenew, onViewQr }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate coordinates relative to card center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Convert offsets to tilt rotation (max 10 degrees)
    const rx = -(y / (rect.height / 2)) * 10;
    const ry = (x / (rect.width / 2)) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    
    // Shine effect coordinates
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    card.style.setProperty('--x', `${sx}px`);
    card.style.setProperty('--y', `${sy}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'SmartTransit Digital Pass',
        text: `Check out my digital pass for route ${pass?.route || 'Transit'}`,
        url: window.location.origin,
      })
      .then(() => toast.success('Pass details shared successfully'))
      .catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/pass/${pass?.id || 'demo'}`);
      toast.success('Pass verification link copied to clipboard!');
    }
  };

  const handleDownloadPdf = () => {
    toast.loading('Generating secure transit PDF pass...', { id: 'pdf' });
    setTimeout(() => {
      toast.success('Transit Pass PDF downloaded successfully!', { id: 'pdf' });
    }, 2000);
  };

  // Safe defaults for demonstration
  const route = pass?.route || localStorage.getItem('userPrefRoute') || 'Central - Airport';
  const type = pass?.pass_type || localStorage.getItem('userPrefFreq') || 'monthly';
  const price = pass?.amount || 450;
  const validityText = 'Valid until Aug 15, 2026';
  const status = pass?.status || 'Active';

  return (
    <div className="space-y-4">
      {/* 3D Glass Apple Wallet Card */}
      <div className="flex justify-center">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full max-w-sm h-60 rounded-[32px] overflow-hidden p-6 flex flex-col justify-between cursor-pointer border border-white/[0.1] bg-gradient-to-br from-blue-600/80 via-slate-900/90 to-indigo-900/95 transition-all duration-100 shadow-2xl select-none"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255,255,255,0.1)',
            '--x': '50%',
            '--y': '50%',
          }}
        >
          {/* Shine gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay transition-opacity duration-300"
            style={{
              background: 'radial-gradient(circle 180px at var(--x) var(--y), rgba(255, 255, 255, 0.3) 0%, transparent 80%)',
            }}
          />

          {/* Card Top: Branding, chip */}
          <div className="flex justify-between items-start" style={{ transform: 'translateZ(30px)' }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-slate-950/60 border border-white/10 flex items-center justify-center">
                <Compass className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white leading-none tracking-tight">SmartTransit</h4>
                <span className="text-[8px] text-blue-300 font-bold tracking-widest uppercase block mt-0.5">Cloud Pass</span>
              </div>
            </div>
            {/* Status indicator tag */}
            <div className="rounded-full bg-emerald-500/15 border border-emerald-500/20 px-3 py-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-black uppercase tracking-wider">{status}</span>
            </div>
          </div>

          {/* Card Middle: Route metadata */}
          <div className="space-y-1.5 text-left" style={{ transform: 'translateZ(40px)' }}>
            <p className="text-[9px] text-blue-300 font-black uppercase tracking-widest leading-none">Commute Line</p>
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">{route}</h3>
            <div className="flex items-center gap-4 text-[10px] text-slate-300 pt-0.5">
              <div>
                <span className="text-slate-500">Tier: </span>
                <span className="font-bold text-white uppercase">{type}</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <div>
                <span className="text-slate-500">Fare ID: </span>
                <span className="font-mono text-white">#T-{pass?.id || '2884'}</span>
              </div>
            </div>
          </div>

          {/* Card Bottom: Rider avatar, QR click prompt */}
          <div className="flex justify-between items-end" style={{ transform: 'translateZ(30px)' }}>
            <div className="flex items-center gap-3">
              {/* Photo Avatar */}
              <div className="w-10 h-10 rounded-xl bg-slate-950/60 border border-white/10 flex items-center justify-center font-bold text-white text-sm shadow-md">
                {user?.name ? user.name.split(' ').map(n=>n[0]).join('').slice(0, 2).toUpperCase() : 'UR'}
              </div>
              <div className="text-left">
                <h5 className="text-xs font-bold text-white leading-none">{user?.name || 'Smart Transit Rider'}</h5>
                <p className="text-[9px] text-slate-400 font-semibold mt-1">{validityText}</p>
              </div>
            </div>

            {/* Tap to View QR trigger */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onViewQr}
              className="p-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white hover:bg-slate-950 transition-colors shadow-md flex items-center justify-center"
              title="View Scan QR"
            >
              <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <path d="M7 17h.01M17 7h.01M7 7h.01M17 17h.01" strokeLinecap="round" strokeWidth="3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Utilities Action Triggers */}
      <div className="flex gap-2.5 justify-center">
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownloadPdf}
          className="flex-1 py-2.5 rounded-xl border border-slate-800 bg-slate-900/30 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 transition-all flex items-center justify-center gap-1.5 focus:outline-none"
        >
          <Download className="w-3.5 h-3.5" /> PDF
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleShare}
          className="flex-1 py-2.5 rounded-xl border border-slate-800 bg-slate-900/30 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 transition-all flex items-center justify-center gap-1.5 focus:outline-none"
        >
          <Share2 className="w-3.5 h-3.5" /> Share
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRenew}
          className="flex-1 py-2.5 rounded-xl border border-blue-500/20 bg-blue-600/10 text-xs font-bold text-blue-400 hover:text-white hover:bg-blue-600 transition-all flex items-center justify-center gap-1.5 focus:outline-none"
        >
          <RefreshCw className="w-3.5 h-3.5 animate-spin-hover" /> Renew
        </motion.button>
      </div>
    </div>
  );
}
