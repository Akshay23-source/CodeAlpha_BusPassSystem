import React from 'react';
import { Compass, Download, Printer, ShieldCheck, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export function InvoicePreview({ invoiceId = 'INV-2026-091', pass, user, amount = 450 }) {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.loading('Compiling secure PDF invoice...', { id: 'invoice-pdf' });
    setTimeout(() => {
      toast.success('Invoice downloaded successfully!', { id: 'invoice-pdf' });
    }, 1500);
  };

  const handleEmail = () => {
    toast.success(`Invoice copy dispatched to ${user?.email || 'your account email'}!`);
  };

  const basePrice = amount / 1.05;
  const gst = amount - basePrice;

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 text-left space-y-6">
      
      {/* Brand logo header */}
      <div className="flex justify-between items-start pb-4 border-b border-white/[0.04]">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-white leading-none tracking-tight">SmartTransit Cloud</h4>
            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block mt-0.5">Official Invoice Receipt</span>
          </div>
        </div>
        <div className="text-right space-y-1">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400 font-bold uppercase tracking-wide">
            <ShieldCheck className="w-2.5 h-2.5" /> PAID
          </span>
          <p className="text-[9px] text-slate-500 font-mono">Invoice: {invoiceId}</p>
        </div>
      </div>

      {/* Invoice Details grid */}
      <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-400">
        <div className="space-y-1">
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Billed To</span>
          <p className="text-white mt-1 leading-none">{user?.name || 'Passenger Name'}</p>
          <p className="text-[9px] text-slate-500 mt-1 leading-none truncate">{user?.email || 'rider@smarttransit.cloud'}</p>
        </div>
        <div className="space-y-1 text-right">
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Date Issued</span>
          <p className="text-white mt-1 leading-none">{date}</p>
          <p className="text-[9px] text-slate-500 mt-1 leading-none">SGST/CGST: 5.0% Registered</p>
        </div>
      </div>

      {/* Commute parameters */}
      <div className="p-4 rounded-2xl border border-white/[0.04] bg-slate-950/40 text-xs font-semibold text-slate-400 space-y-3">
        <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none pb-2 border-b border-white/[0.03]">
          <span>Description / Commute route</span>
          <span>Amount</span>
        </div>

        <div className="flex justify-between items-start pt-1">
          <div>
            <p className="text-white font-bold">{pass?.pass_type || 'Monthly Pass'} Commute Subscription</p>
            <p className="text-[10px] text-slate-500 mt-1">{pass?.route || 'Central - Airport Line'}</p>
          </div>
          <span className="text-white font-bold">₹{basePrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center pt-2.5 border-t border-white/[0.03]">
          <span>Service Tax SGST/CGST (5%)</span>
          <span className="text-white">₹{gst.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-end pt-3 border-t border-white/[0.03]">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Grand Total Paid</span>
            <h3 className="text-xl font-black text-white mt-1.5 leading-none tracking-tight">₹{amount.toFixed(2)}</h3>
          </div>
          {/* Mock invoice check stamps */}
          <div className="p-2 bg-white rounded-lg border border-slate-800 shrink-0">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${encodeURIComponent(invoiceId)}`}
              alt="Invoice QR Verify"
              className="w-8 h-8 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Invoice triggers sub actions */}
      <div className="flex gap-2.5 pt-1">
        <button
          onClick={handleDownload}
          className="flex-1 py-2.5 rounded-xl border border-slate-800 bg-slate-950/40 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-colors flex items-center justify-center gap-1.5 focus:outline-none"
        >
          <Download className="w-3.5 h-3.5" /> Download PDF
        </button>

        <button
          onClick={handlePrint}
          className="flex-1 py-2.5 rounded-xl border border-slate-800 bg-slate-950/40 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-colors flex items-center justify-center gap-1.5 focus:outline-none"
        >
          <Printer className="w-3.5 h-3.5" /> Print Invoice
        </button>

        <button
          onClick={handleEmail}
          className="flex-1 py-2.5 rounded-xl border border-slate-800 bg-slate-950/40 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-colors flex items-center justify-center gap-1.5 focus:outline-none"
        >
          <Mail className="w-3.5 h-3.5" /> Email
        </button>
      </div>
    </div>
  );
}
export default InvoicePreview;
