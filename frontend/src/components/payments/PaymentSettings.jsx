import React, { useState } from 'react';
import { ShieldCheck, Plus, CreditCard, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export function PaymentSettings() {
  const [upiId, setUpiId] = useState('akshay@okhdfcbank');
  const [address, setAddress] = useState('12, University Road, West Sector, Bangalore, Karnataka - 560012');
  const [gstNo, setGstNo] = useState('29AAAAA0000A1Z5');

  const handleSave = () => {
    toast.success('Billing details updated successfully!');
  };

  return (
    <div className="space-y-5 text-left w-full">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-blue-400" />
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
          Billing Settings & Gateways
        </h4>
      </div>

      <div className="p-5 rounded-3xl border border-white/[0.06] bg-slate-900/10 backdrop-blur-sm space-y-4 text-xs font-semibold text-slate-400">
        
        {/* Masked cards selection list */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Saved Cards</label>
          
          <div className="p-3.5 rounded-2xl border border-white/[0.04] bg-slate-950/40 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-blue-400 shrink-0" />
              <div>
                <p className="text-white font-bold">Visa Debit Card</p>
                <p className="text-[9px] text-slate-500 font-mono mt-1">•••• •••• •••• 4882 · Exp: 09/28</p>
              </div>
            </div>
            <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/10">Default</span>
          </div>

          <button
            onClick={() => toast.success('Loading secure payment portal add-card form...')}
            className="w-full py-2.5 rounded-xl border border-dashed border-slate-800 bg-slate-900/10 hover:border-slate-700 transition-all flex items-center justify-center gap-1.5 focus:outline-none text-[10px] text-slate-400 font-bold uppercase tracking-wider"
          >
            <Plus className="w-3.5 h-3.5" /> Add New Card Verification
          </button>
        </div>

        {/* UPI defaults */}
        <div className="space-y-1 pt-2 border-t border-white/[0.03]">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Default UPI VPA ID</label>
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-950/40 border border-slate-800 focus:border-blue-500 focus:outline-none rounded-xl text-white font-mono"
          />
        </div>

        {/* Billing Addresses */}
        <div className="space-y-1 pt-2 border-t border-white/[0.03]">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Billing Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="2"
            className="w-full px-4 py-2.5 bg-slate-950/40 border border-slate-800 focus:border-blue-500 focus:outline-none rounded-xl text-white font-semibold leading-relaxed"
          />
        </div>

        {/* GST parameters */}
        <div className="space-y-1 pt-2 border-t border-white/[0.03]">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Corporate GSTIN Number (Optional)</label>
          <input
            type="text"
            value={gstNo}
            onChange={(e) => setGstNo(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-950/40 border border-slate-800 focus:border-blue-500 focus:outline-none rounded-xl text-white font-mono uppercase"
          />
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="w-full py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center justify-center gap-1.5 focus:outline-none mt-2"
        >
          <Lock className="w-3.5 h-3.5 text-blue-300" /> Save Billing Parameters
        </button>
      </div>
    </div>
  );
}
export default PaymentSettings;
