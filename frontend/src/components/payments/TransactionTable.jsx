import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CreditCard, ArrowDown, ArrowUp, CheckCircle, Clock, AlertTriangle, FileText, X } from 'lucide-react';
import { InvoicePreview } from './InvoicePreview';

const defaultTransactions = [
  { id: 'TXN-2026-901', date: 'Jul 10, 2026', amount: 450, status: 'success', method: 'UPI (GPay)', desc: 'Monthly Bus Pass Renew' },
  { id: 'TXN-2026-902', date: 'Jul 08, 2026', amount: 150, status: 'success', method: 'Card (Visa)', desc: 'Wallet Credits Add' },
  { id: 'TXN-2026-903', date: 'Jul 05, 2026', amount: 250, status: 'failed', method: 'UPI (Paytm)', desc: 'Student Pass Purchase' },
  { id: 'TXN-2026-904', date: 'Jun 10, 2026', amount: 450, status: 'success', method: 'UPI (GPay)', desc: 'Monthly Bus Pass Renew' },
  { id: 'TXN-2026-905', date: 'Jun 05, 2026', amount: 100, status: 'success', method: 'Net Banking', desc: 'Wallet Credits Add' },
  { id: 'TXN-2026-906', date: 'May 10, 2026', amount: 450, status: 'success', method: 'Card (Master)', desc: 'Monthly Bus Pass Renew' },
];

export function TransactionTable({ user }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all -> success -> failed
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [selectedTxn, setSelectedTxn] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const processedData = useMemo(() => {
    let copy = [...defaultTransactions];
    
    // Search filter
    if (search.trim()) {
      copy = copy.filter(txn =>
        txn.id.toLowerCase().includes(search.toLowerCase()) ||
        txn.method.toLowerCase().includes(search.toLowerCase()) ||
        txn.desc.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Status filter
    if (filter !== 'all') {
      copy = copy.filter(txn => txn.status === filter);
    }

    // Sorting
    copy.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === 'date') {
        valA = new Date(a.date).getTime();
        valB = new Date(b.date).getTime();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return copy;
  }, [search, filter, sortField, sortOrder]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return processedData.slice(start, start + itemsPerPage);
  }, [processedData, page]);

  return (
    <div className="space-y-4 text-left w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Search bar */}
        <div className="relative w-full sm:max-w-xs">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search transaction ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 bg-slate-950/40 border border-slate-800/80 focus:border-blue-500 focus:outline-none rounded-xl text-white font-mono placeholder-slate-600"
          />
        </div>

        {/* Filter switches */}
        <div className="rounded-xl border border-white/[0.04] bg-slate-900/10 p-1 flex gap-1">
          {['all', 'success', 'failed'].map((item) => (
            <button
              key={item}
              onClick={() => { setFilter(item); setPage(1); }}
              className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all focus:outline-none ${
                filter === item
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto border border-white/[0.04] rounded-2xl bg-slate-900/10 backdrop-blur-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/[0.04] text-slate-500 font-bold uppercase tracking-wider text-[9px]">
              <th className="py-3 px-4 cursor-pointer select-none" onClick={() => handleSort('desc')}>
                Description {sortField === 'desc' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="py-3 px-4 cursor-pointer select-none" onClick={() => handleSort('date')}>
                Date {sortField === 'date' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="py-3 px-4">Method</th>
              <th className="py-3 px-4 text-right cursor-pointer select-none" onClick={() => handleSort('amount')}>
                Amount {sortField === 'amount' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-right">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((txn) => (
                <tr key={txn.id} className="border-b border-white/[0.03] hover:bg-slate-950/20 transition-all">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-slate-950 border border-white/5 text-slate-400">
                        <CreditCard className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="font-bold text-white leading-none">{txn.desc}</p>
                        <p className="text-[9px] text-slate-500 font-mono mt-1.5">{txn.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-semibold">{txn.date}</td>
                  <td className="py-3 px-4 text-slate-400 font-semibold">{txn.method}</td>
                  <td className="py-3 px-4 text-right font-black text-white">₹{txn.amount.toFixed(2)}</td>
                  <td className="py-3 px-4 text-center">
                    {txn.status === 'success' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400 font-bold uppercase tracking-wide">
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-[9px] text-red-400 font-bold uppercase tracking-wide">
                        Failed
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {txn.status === 'success' && (
                      <button
                        onClick={() => setSelectedTxn(txn)}
                        className="p-1.5 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white hover:border-slate-700 transition-colors focus:outline-none"
                        title="View Full Invoice"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-500 italic">No transactions found matching filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-1 text-slate-500 text-xs">
          <span>Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded-xl border border-slate-800 bg-slate-900/10 text-xs font-bold hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded-xl border border-slate-800 bg-slate-900/10 text-xs font-bold hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Invoice modal overlay */}
      <AnimatePresence>
        {selectedTxn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
              onClick={() => setSelectedTxn(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-lg"
            >
              <button
                onClick={() => setSelectedTxn(null)}
                className="absolute right-4 top-4 p-1.5 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-500 hover:text-white transition-colors focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
              <InvoicePreview
                invoiceId={selectedTxn.id.replace('TXN', 'INV')}
                pass={{ pass_type: selectedTxn.desc, route: selectedTxn.desc.includes('Wallet') ? 'Credits Addition' : 'Central - Airport' }}
                user={user}
                amount={selectedTxn.amount}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default TransactionTable;
