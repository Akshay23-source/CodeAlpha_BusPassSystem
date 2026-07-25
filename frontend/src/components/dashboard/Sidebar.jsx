import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, Ticket, History, CreditCard, Wallet, Camera,
  Bell, HelpCircle, Settings, LogOut, ChevronLeft, ChevronRight, Compass
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Sidebar({ collapsed, onToggle }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Dashboard', to: '/dashboard' },
    { icon: Ticket, label: 'Apply Pass', to: '/apply-pass' },
    { icon: Wallet, label: 'Wallet Deck', to: '/wallet' },
    { icon: Compass, label: 'Smart Journey', to: '/journey' },
    { icon: Camera, label: 'Conductor Terminal', to: '/conductor' },
    { icon: History, label: 'Travel History', to: '/wallet' },
    { icon: CreditCard, label: 'Payments', to: '/wallet' },
    { icon: Bell, label: 'Notifications', to: '/dashboard#notifications' },
    { icon: HelpCircle, label: 'Support', to: '/dashboard#support' },
    { icon: Settings, label: 'Settings', to: '/dashboard#settings' },
  ];

  return (
    <motion.aside
      animate={{ width: collapsed ? '70px' : '260px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="hidden md:flex flex-col justify-between border-r border-white/[0.06] bg-slate-950/20 backdrop-blur-md min-h-[calc(100vh-65px)] overflow-x-hidden p-4 relative"
    >
      <div className="space-y-6">
        {/* Toggle Collapse Trigger */}
        <button
          onClick={onToggle}
          className="absolute right-[-12px] top-6 w-6 h-6 rounded-full border border-white/[0.08] bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white shadow-md z-30 focus:outline-none"
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>

        {/* Navigation list */}
        <nav className="space-y-1.5 pt-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all relative group text-xs font-semibold ${
                  isActive 
                    ? 'text-white bg-slate-900 border border-white/[0.06]' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/30'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Left Side Active Indicator Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-2 bottom-2 w-1.5 rounded-r bg-gradient-to-b from-blue-500 to-indigo-500 shadow-md shadow-blue-500/20"
                    />
                  )}

                  <item.icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}

                  {/* Collapsed Tooltip menu overlay */}
                  {collapsed && (
                    <div className="absolute left-16 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-[10px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl z-50">
                      {item.label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout button at sidebar bottom */}
      <div className="pt-4 border-t border-white/[0.06]">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors group relative"
        >
          <LogOut className="w-4 h-4 shrink-0 text-red-500" />
          {!collapsed && <span>Sign Out</span>}
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
