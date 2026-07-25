import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertCircle, Info, Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotificationPanel({ onClose }) {
  const notifications = [
    {
      id: 1,
      type: 'success',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      bg: 'bg-emerald-500/10 border-emerald-500/10',
      title: 'Pass Approved',
      desc: 'Your monthly pass for Central - Airport is active.',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'warning',
      icon: <AlertCircle className="w-4 h-4 text-amber-400" />,
      bg: 'bg-amber-500/10 border-amber-500/10',
      title: 'Upcoming Expiration',
      desc: 'Your student pass expires in 5 days. Renew now to avoid gaps.',
      time: '1 day ago',
      action: { text: 'Renew Pass', to: '/apply-pass' },
    },
    {
      id: 3,
      type: 'info',
      icon: <Info className="w-4 h-4 text-blue-400" />,
      bg: 'bg-blue-500/10 border-blue-500/10',
      title: 'New Stops Added',
      desc: 'Two new boarding stops added to Route North Gate - Market.',
      time: '3 days ago',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 mt-3 w-80 sm:w-96 p-4 rounded-3xl border border-white/[0.08] bg-slate-900/95 backdrop-blur-md shadow-2xl z-50 space-y-4"
      style={{
        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
        <h4 className="font-bold text-white text-sm">Notifications</h4>
        <button
          onClick={onClose}
          className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
        >
          Mark all as read
        </button>
      </div>

      {/* Notifications list */}
      <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex gap-3 p-3 rounded-2xl border transition-all ${notif.bg}`}
          >
            <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5 h-fit shrink-0">
              {notif.icon}
            </div>
            <div className="space-y-1 w-full text-left">
              <div className="flex justify-between items-start gap-2">
                <span className="font-bold text-white text-xs leading-none">{notif.title}</span>
                <span className="text-[9px] text-slate-500 font-semibold whitespace-nowrap">{notif.time}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">{notif.desc}</p>
              
              {notif.action && (
                <div className="pt-1.5">
                  <Link
                    to={notif.action.to}
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {notif.action.text} <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center pt-1 border-t border-white/[0.06]">
        <button
          onClick={onClose}
          className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          Close panel
        </button>
      </div>
    </motion.div>
  );
}
