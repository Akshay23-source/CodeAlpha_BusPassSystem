import React, { useState } from 'react';
import { Search, User, ShieldAlert, Key, Trash2, CheckCircle2, UserX } from 'lucide-react';
import toast from 'react-hot-toast';

export function UsersTable({ users = [], onDelete, onResetPassword }) {
  const [search, setSearch] = useState('');

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleResetPass = (email) => {
    toast.success(`Reset password link dispatched to ${email}!`);
  };

  const handleSuspend = (name) => {
    toast.success(`${name} account suspended successfully.`);
  };

  return (
    <div className="space-y-4 text-left w-full">
      {/* Search inputs */}
      <div className="relative w-full max-w-xs">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          placeholder="Search user name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs pl-9 pr-4 py-2 bg-slate-950/40 border border-slate-800/80 focus:border-pink-500 focus:outline-none rounded-xl text-white font-mono placeholder-slate-600"
        />
      </div>

      {/* Users table */}
      <div className="overflow-x-auto border border-white/[0.04] rounded-2xl bg-slate-900/10 backdrop-blur-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/[0.04] text-slate-500 font-bold uppercase tracking-wider text-[9px]">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Account Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((u) => (
                <tr key={u.id} className="border-b border-white/[0.03] hover:bg-slate-950/20 transition-all">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-950 border border-white/5 text-slate-400 flex items-center justify-center font-bold">
                        {u.name.slice(0,2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-white leading-none">{u.name}</p>
                        <p className="text-[9px] text-slate-500 font-mono mt-1.5">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                      u.role === 'admin' ? 'bg-pink-500/20 text-pink-400 border border-pink-500/10' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {u.role || 'rider'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400 font-bold uppercase tracking-wide">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Active
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex gap-1.5 justify-end">
                      <button
                        onClick={() => handleResetPass(u.email)}
                        className="p-1.5 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white hover:border-slate-700 transition-colors focus:outline-none"
                        title="Reset Password"
                      >
                        <Key className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleSuspend(u.name)}
                        className="p-1.5 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white hover:border-slate-700 transition-colors focus:outline-none"
                        title="Suspend Account"
                      >
                        <UserX className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(u.id)}
                        className="p-1.5 rounded-lg border border-red-500/10 bg-red-500/5 text-red-400 hover:text-red-300 hover:border-red-500/30 transition-colors focus:outline-none"
                        title="Archive User"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-8 text-center text-slate-500 italic">No riders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default UsersTable;
