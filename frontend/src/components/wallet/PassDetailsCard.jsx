import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Download, Share2, Printer, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export function PassDetailsCard({ user, pass }) {
  const [expanded, setExpanded] = useState(false);

  const handleAction = (type) => {
    switch (type) {
      case 'download':
        toast.loading('Generating secure transit PDF...', { id: 'pdf' });
        setTimeout(() => toast.success('Smart Pass PDF downloaded successfully!', { id: 'pdf' }), 1500);
        break;
      case 'print':
        window.print();
        break;
      case 'share':
        navigator.clipboard.writeText(`${window.location.origin}/pass/verify/T-2884`);
        toast.success('Pass verification link copied to clipboard!');
        break;
      default:
        break;
    }
  };

  const issueDate = 'Jul 10, 2026';
  const expiryDate = 'Aug 15, 2026';

  return (
    <div className="w-full border border-white/[0.04] bg-slate-900/10 backdrop-blur-sm rounded-2xl overflow-hidden">
      {/* Header clickable drawer */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-4 flex items-center justify-between text-left text-xs font-bold text-white focus:outline-none"
      >
        <span className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-400" /> Expanded Pass Specifications
        </span>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-5 pb-5 pt-1 space-y-4 border-t border-white/[0.04] text-xs text-slate-400 font-semibold"
          >
            {/* Metadata fields */}
            <div className="grid grid-cols-2 gap-3.5 pt-2">
              <div className="space-y-1">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Authority</span>
                <p className="text-white mt-1">SmartTransit Cloud Board</p>
              </div>
              
              <div className="space-y-1">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Rider Category</span>
                <p className="text-white mt-1 uppercase">{pass?.pass_type || 'Monthly Pass'}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Issue Date</span>
                <p className="text-white mt-1">{issueDate}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Expiry Date</span>
                <p className="text-white mt-1">{expiryDate}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Verify Logs</span>
                <p className="text-white mt-1">38 Commutes Completed</p>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Student Roll ID</span>
                <p className="text-white mt-1">CS-2024-884</p>
              </div>
            </div>

            {/* Sub actions */}
            <div className="flex gap-2.5 pt-3 border-t border-white/[0.03]">
              <button
                onClick={() => handleAction('download')}
                className="flex-1 py-2 rounded-xl border border-slate-800 bg-slate-950/40 text-[10px] font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-colors flex items-center justify-center gap-1.5 focus:outline-none"
              >
                <Download className="w-3.5 h-3.5" /> PDF
              </button>

              <button
                onClick={() => handleAction('share')}
                className="flex-1 py-2 rounded-xl border border-slate-800 bg-slate-950/40 text-[10px] font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-colors flex items-center justify-center gap-1.5 focus:outline-none"
              >
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>

              <button
                onClick={() => handleAction('print')}
                className="flex-1 py-2 rounded-xl border border-slate-800 bg-slate-950/40 text-[10px] font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-colors flex items-center justify-center gap-1.5 focus:outline-none"
              >
                <Printer className="w-3.5 h-3.5" /> Print
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default PassDetailsCard;
