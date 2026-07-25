import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageSquare, PlusSquare, Mail, Phone, LifeBuoy } from 'lucide-react';
import toast from 'react-hot-toast';

export function SupportCard() {
  const handleChat = () => {
    toast.success('Initiating live secure chat channel...');
  };

  const handleTicket = () => {
    toast.success('Ticket creation dashboard launched.');
  };

  return (
    <div className="space-y-4" id="support-section">
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none text-left">
        Support Desk
      </h4>

      <div className="p-5 rounded-3xl border border-white/[0.06] bg-slate-900/10 backdrop-blur-sm text-left relative overflow-hidden space-y-4">
        {/* Help icon header */}
        <div className="flex items-center gap-2">
          <LifeBuoy className="w-5 h-5 text-indigo-400" />
          <h5 className="font-bold text-white text-sm">Need Assistance?</h5>
        </div>
        
        <p className="text-slate-400 text-xs leading-relaxed">
          Have boarding issues, pass questions, or payment failures? Our transit assistance team is active 24/7.
        </p>

        {/* Support actions list */}
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleChat}
            className="p-3 rounded-xl border border-slate-800 bg-slate-950/40 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-all flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          >
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <span>Chat Support</span>
          </motion.button>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleTicket}
            className="p-3 rounded-xl border border-slate-800 bg-slate-950/40 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-all flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          >
            <PlusSquare className="w-4 h-4 text-indigo-400" />
            <span>Raise Ticket</span>
          </motion.button>
        </div>

        {/* Contacts */}
        <div className="pt-3.5 border-t border-white/[0.04] space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-600" /> Support Email
            </span>
            <span className="text-slate-300">help@smarttransit.cloud</span>
          </div>

          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-600" /> Emergency S.O.S
            </span>
            <span className="text-red-400 font-bold">+91 99999 88888</span>
          </div>
        </div>
      </div>
    </div>
  );
}
