import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, RefreshCw, QrCode, Wallet, HelpCircle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function QuickActions({ onViewQr, onRenew }) {
  const navigate = useNavigate();

  const actions = [
    {
      icon: <PlusCircle className="w-5 h-5 text-blue-400" />,
      label: 'Apply New Pass',
      desc: 'Start guided application',
      onClick: () => navigate('/apply-pass'),
      color: 'hover:border-blue-500/30 hover:bg-blue-500/5',
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-indigo-400" />,
      label: 'Renew Active Pass',
      desc: 'Extend current validity',
      onClick: onRenew,
      color: 'hover:border-indigo-500/30 hover:bg-indigo-500/5',
    },
    {
      icon: <QrCode className="w-5 h-5 text-emerald-400" />,
      label: 'View Boarding QR',
      desc: 'Scan QR at entry gate',
      onClick: onViewQr,
      color: 'hover:border-emerald-500/30 hover:bg-emerald-500/5',
    },
    {
      icon: <Wallet className="w-5 h-5 text-pink-400" />,
      label: 'Top-up Wallet',
      desc: 'Add travel credits',
      onClick: () => {
        toast.success('Wallet recharged with ₹500 credits (Simulation)');
      },
      color: 'hover:border-pink-500/30 hover:bg-pink-500/5',
    },
    {
      icon: <HelpCircle className="w-5 h-5 text-amber-400" />,
      label: 'Contact Support',
      desc: 'Open assistance ticket',
      onClick: () => {
        const element = document.getElementById('support-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          toast.success('Connecting to help desk (Simulation)...');
        }
      },
      color: 'hover:border-amber-500/30 hover:bg-amber-500/5',
    },
    {
      icon: <FileText className="w-5 h-5 text-sky-400" />,
      label: 'Download Invoice',
      desc: 'Fetch last billing statement',
      onClick: () => {
        toast.success('Invoice statement downloaded successfully!');
      },
      color: 'hover:border-sky-500/30 hover:bg-sky-500/5',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
          Quick Operations
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {actions.map((act, index) => (
          <motion.button
            key={act.label}
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={act.onClick}
            className={`flex items-start gap-4 p-4 rounded-2xl border border-slate-800/80 bg-slate-900/10 backdrop-blur-sm text-left transition-all duration-300 ${act.color} focus:outline-none`}
            style={{
              boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.02)',
            }}
          >
            {/* Icon box */}
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5 shadow-md">
              {act.icon}
            </div>
            
            {/* Meta */}
            <div className="space-y-0.5">
              <h5 className="text-xs font-bold text-white leading-tight">{act.label}</h5>
              <p className="text-[10px] text-slate-500 font-semibold leading-normal">{act.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
