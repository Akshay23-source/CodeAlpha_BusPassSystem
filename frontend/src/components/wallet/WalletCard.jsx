import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Compass, CreditCard, GraduationCap, Percent, ShieldCheck, Wifi } from 'lucide-react';
import { PassStatusBadge } from './PassStatusBadge';

export function WalletCard({ cardType = 'bus', active, onSelect, user, pass }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !active) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rx = -(y / (rect.height / 2)) * 10;
    const ry = (x / (rect.width / 2)) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    
    // Shine effect
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    card.style.setProperty('--x', `${sx}px`);
    card.style.setProperty('--y', `${sy}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  const configs = {
    bus: {
      title: 'Smart Transit Pass',
      logo: <Compass className="w-5 h-5 text-blue-400" />,
      bg: 'from-blue-600 via-slate-900 to-indigo-950',
      glow: 'shadow-blue-500/10',
      label: 'Commute Line',
      value: pass?.route || 'Central - Airport',
      metaLabel: 'Pass Number',
      metaValue: `#T-${pass?.id || '2884'}`,
      badge: <PassStatusBadge status={pass?.status || 'Active'} />,
    },
    metro: {
      title: 'Metro Smart Card',
      logo: <CreditCard className="w-5 h-5 text-emerald-400" />,
      bg: 'from-emerald-600 via-slate-900 to-teal-950',
      glow: 'shadow-emerald-500/10',
      label: 'Available Credits',
      value: '₹380.00',
      metaLabel: 'Card UID',
      metaValue: 'MT-8849-0921',
      badge: <PassStatusBadge status="Active" />,
    },
    student: {
      title: 'Student Identity',
      logo: <GraduationCap className="w-5 h-5 text-pink-400" />,
      bg: 'from-pink-600 via-slate-900 to-purple-950',
      glow: 'shadow-pink-500/10',
      label: 'University Quad',
      value: 'L.N. College of Engineering',
      metaLabel: 'Enroll ID',
      metaValue: 'CS-2024-884',
      badge: <PassStatusBadge status="Active" />,
    },
    voucher: {
      title: 'Promo Ride Vouchers',
      logo: <Percent className="w-5 h-5 text-amber-400" />,
      bg: 'from-amber-600 via-slate-900 to-orange-950',
      glow: 'shadow-amber-500/10',
      label: 'Active Reward Coupon',
      value: '50% OFF Next Commute',
      metaLabel: 'Coupon Code',
      metaValue: 'TRANSIT50',
      badge: <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/20">READY</span>,
    },
  };

  const card = configs[cardType];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(cardType)}
      whileHover={active ? { scale: 1.01 } : { y: -2, scale: 0.98 }}
      className={`relative w-full max-w-sm h-56 rounded-[32px] overflow-hidden p-6 flex flex-col justify-between border cursor-pointer bg-gradient-to-br transition-all duration-100 select-none ${card.bg} ${card.glow} ${
        active 
          ? 'border-white/10 z-20 shadow-2xl scale-100' 
          : 'border-white/[0.04] opacity-50 z-10 scale-95 shadow-lg'
      }`}
      style={{
        transformStyle: 'preserve-3d',
        boxShadow: active ? '0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255,255,255,0.08)' : 'none',
        '--x': '50%',
        '--y': '50%',
      }}
    >
      {/* Shine overlay */}
      {active && (
        <div
          className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
          style={{
            background: 'radial-gradient(circle 180px at var(--x) var(--y), rgba(255,255,255,0.4) 0%, transparent 85%)',
          }}
        />
      )}

      {/* Header */}
      <div className="flex justify-between items-start" style={{ transform: 'translateZ(25px)' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-slate-950/60 border border-white/10 flex items-center justify-center shadow-md">
            {card.logo}
          </div>
          <div className="text-left">
            <h4 className="text-xs font-black text-white leading-none tracking-tight">{card.title}</h4>
            <span className="text-[7.5px] text-slate-500 font-bold uppercase tracking-wider block mt-0.5">Secure Transit Wallet</span>
          </div>
        </div>
        
        {/* Status indicator badge */}
        <div>{card.badge}</div>
      </div>

      {/* Middle */}
      <div className="space-y-1 text-left" style={{ transform: 'translateZ(35px)' }}>
        <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest leading-none">{card.label}</p>
        <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug truncate">{card.value}</h3>
      </div>

      {/* Bottom info */}
      <div className="flex justify-between items-end" style={{ transform: 'translateZ(25px)' }}>
        <div className="flex items-center gap-3">
          {cardType === 'voucher' ? (
            <div className="w-9 h-9 rounded-xl bg-slate-950/60 border border-white/10 flex items-center justify-center font-bold text-amber-400 text-lg shadow-md">
              %
            </div>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-slate-950/60 border border-white/10 flex items-center justify-center font-bold text-white text-xs shadow-md">
              {user?.name ? user.name.split(' ').map(n=>n[0]).join('').slice(0, 2).toUpperCase() : 'US'}
            </div>
          )}
          
          <div className="text-left">
            <h5 className="text-xs font-bold text-white leading-none">
              {cardType === 'voucher' ? 'Promo Code Coupon' : (user?.name || 'Rider Account')}
            </h5>
            <div className="flex items-center gap-2 text-[9px] text-slate-400 font-semibold mt-1">
              <span>{card.metaLabel}: </span>
              <span className="font-mono text-white">{card.metaValue}</span>
            </div>
          </div>
        </div>

        {/* NFC waves icon */}
        <div className="flex gap-0.5 items-end text-slate-500 pr-1 pb-1" title="Contactless Boarding Ready">
          <Wifi className="w-4 h-4 text-white/30 rotate-90 shrink-0" />
        </div>
      </div>
    </motion.div>
  );
}
