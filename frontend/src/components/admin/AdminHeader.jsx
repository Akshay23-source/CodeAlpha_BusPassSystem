import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Sun, Moon, LogOut, Settings, Menu, ShieldCheck, Compass } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export function AdminHeader({ onToggleSidebar, isSidebarCollapsed }) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 py-3 flex items-center justify-between">
      
      {/* Brand logo & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleSidebar}
          className="p-2 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 text-slate-400 hover:text-white transition-all focus:outline-none"
        >
          <Menu className="w-5 h-5" />
        </motion.button>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center shadow-md">
            <Compass className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block text-left">
            <span className="font-bold text-sm text-white tracking-tight">SmartTransit</span>
            <span className="text-[10px] text-pink-400 block -mt-1 font-bold">Operations</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>/</span>
          <span className="hover:text-slate-400 cursor-pointer">Admin Node</span>
          <span>/</span>
          <span className="text-slate-300 font-semibold bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800/80">Operations Center</span>
        </div>
      </div>

      {/* Global Admin Search */}
      <div className="flex-1 max-w-sm mx-4 hidden sm:block">
        <div className="relative">
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors ${searchFocused ? 'text-pink-500' : ''}`}>
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search users, passes, logs, routes, IPs..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full text-xs pl-10 pr-4 py-2 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/10 focus:outline-none text-white transition-all duration-300 placeholder-slate-600"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        
        {/* Theme */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-slate-800/80 bg-slate-900/30 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-900 transition-all focus:outline-none"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </motion.button>

        {/* System Alerts count */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2.5 rounded-xl border border-slate-800/80 bg-slate-900/30 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-900 transition-all relative focus:outline-none"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        </motion.button>

        <div className="h-6 w-px bg-slate-800" />

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <motion.button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 border border-white/10 flex items-center justify-center font-bold text-white text-xs shadow-md shadow-pink-500/10">
              AD
            </div>
            <div className="hidden lg:block">
              <p className="text-xs font-bold text-white leading-none">{user?.name || 'Operations Admin'}</p>
              <p className="text-[8px] text-pink-400 font-bold uppercase tracking-wider mt-1 block">Super Administrator</p>
            </div>
          </motion.button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-52 p-2 rounded-2xl border border-white/[0.08] bg-slate-900/95 backdrop-blur-md shadow-xl text-left z-50 text-xs space-y-1"
              >
                <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                  <p className="font-bold text-white leading-none">Admin Profile</p>
                  <p className="text-[10px] text-slate-500 mt-1 break-all">{user?.email || 'admin@smarttransit.cloud'}</p>
                </div>

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out Admin
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
}
export default AdminHeader;
