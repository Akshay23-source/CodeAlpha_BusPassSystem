import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, FileText, Download, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export function PaymentSummary() {
  const transactions = [
    {
      id: 'txn-001',
      date: 'Today · 11:24 AM',
      amount: '₹450.00',
      status: 'success',
      type: 'Monthly Pass',
      route: 'Central - Airport',
    },
    {
      id: 'txn-002',
      date: '08 Jun 2026',
      amount: '₹450.00',
      status: 'success',
      type: 'Monthly Pass',
      route: 'Central - Airport',
    },
    {
      id: 'txn-003',
      date: '12 May 2026',
      amount: '₹100.00',
      status: 'success',
      type: 'Wallet Top-up',
      route: 'Self Credit Add',
    },
  ];

  const handleDownloadInvoice = (txnId) => {
    toast.success(`Invoice statement for ${txnId} downloaded successfully.`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
          Payment Billing History
        </h4>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/[0.04] text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <th className="pb-3 pl-2">Description</th>
              <th className="pb-3">Date</th>
              <th className="pb-3 text-right">Amount</th>
              <th className="pb-3 text-center">Status</th>
              <th className="pb-3 pr-2 text-right">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, idx) => (
              <motion.tr
                key={txn.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="border-b border-white/[0.03] hover:bg-slate-900/10 transition-colors"
              >
                {/* Description */}
                <td className="py-3.5 pl-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-slate-950/60 border border-white/5 text-slate-400">
                      <CreditCard className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-bold text-white leading-none">{txn.type}</p>
                      <p className="text-[10px] text-slate-500 font-semibold mt-1">{txn.route}</p>
                    </div>
                  </div>
                </td>

                {/* Date */}
                <td className="py-3.5 text-slate-400 font-semibold">{txn.date}</td>

                {/* Amount */}
                <td className="py-3.5 text-right font-black text-white">{txn.amount}</td>

                {/* Status */}
                <td className="py-3.5 text-center">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400 font-bold uppercase tracking-wide">
                    <CheckCircle className="w-2.5 h-2.5" /> Paid
                  </span>
                </td>

                {/* Download */}
                <td className="py-3.5 pr-2 text-right">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDownloadInvoice(txn.id)}
                    className="p-1.5 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white hover:border-slate-700 transition-colors focus:outline-none"
                    title="Download PDF Invoice"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
