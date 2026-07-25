import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, Users, Ticket, CreditCard, Compass, 
  Terminal, ShieldAlert, Cpu, LifeBuoy, Settings, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function AdminSidebar({ activeTab, onTabSelect, collapsed, onToggle }) {
  const { logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard Ops' },
    { id: 'users', icon: Users, label: 'Riders Database' },
    { id: 'passes', icon: Ticket, label: 'Pass Requests' },
    { id: 'payments', icon: CreditCard, label: 'Financial Audit' },
    { id: 'system', icon: Cpu, label: 'Cloud Monitor' },
    { id: 'support', icon: LifeBuoy, label: 'Help Tickets' },
    { id: 'settings', icon: Settings, label: 'Portal Config' },
  ];

  return (
    <motion.aside
      animate={{ width: collapsed ? '70px' : '260px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="hidden md:flex flex-col justify-between border-r border-white/[0.06] bg-slate-950/20 backdrop-blur-md min-h-[calc(100vh-65px)] overflow-x-hidden p-4 relative"
    >
      <div className="space-y-6">
        {/* Toggle Collapse */}
        <button
          onClick={onToggle}
          className="absolute right-[-12px] top-6 w-6 h-6 rounded-full border border-white/[0.08] bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white shadow-md z-30 focus:outline-none"
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>

        {/* Links */}
        <nav className="space-y-1.5 pt-4">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabSelect(item.id)}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all relative group text-xs font-semibold focus:outline-none ${
                  isActive 
                    ? 'text-white bg-slate-900 border border-white/[0.06]' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/30'
                }`}
              >
                {/* Active Indicator bar */}
                {isActive && (
                  <motion.div
                    layoutId="adminActiveIndicator"
                    className="absolute left-0 top-2 bottom-2 w-1.5 rounded-r bg-gradient-to-b from-indigo-500 to-pink-500 shadow-md shadow-pink-500/20"
                  />
                )}

                <item.icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-pink-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="truncate text-left"
                  >
                    {item.label}
                  </motion.span>
                )}

                {/* Tooltips */}
                {collapsed && (
                  <div className="absolute left-16 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-[10px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="pt-4 border-t border-white/[0.06]">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors group relative focus:outline-none"
        >
          <LogOut className="w-4 h-4 shrink-0 text-red-500" />
          {!collapsed && <span>Sign Out Admin</span>}
          {collapsed && (
            <div className="absolute left-16 px-2.5 py-1.5 rounded-lg border border-red-500/20 bg-slate-900 text-[10px] text-red-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl z-50">
              Sign Out
            </div>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
export default AdminSidebar;
