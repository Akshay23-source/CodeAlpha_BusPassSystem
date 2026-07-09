import { motion } from 'framer-motion';
import { Bell, Compass, Moon, Search, Settings, Sun, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';

export function Navbar({ isLoggedIn, onLogout, onToggleAuth }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="sticky top-0 z-20 mb-6 rounded-[28px] border border-slate-800/70 bg-slate-950/70 px-5 py-4 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-blue-300">Smart Bus Pass</p>
            <h1 className="text-lg font-semibold text-slate-100">Premium commuting</h1>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          <label className="hidden items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-400 md:flex">
            <Search className="h-4 w-4" />
            <input aria-label="Search routes" placeholder="Search routes" className="w-32 bg-transparent outline-none" />
          </label>
          <button aria-label="Notifications" className="rounded-full border border-slate-800 bg-slate-900/70 p-2.5 text-slate-300">
            <Bell className="h-4 w-4" />
          </button>
          <button aria-label="Settings" className="rounded-full border border-slate-800 bg-slate-900/70 p-2.5 text-slate-300">
            <Settings className="h-4 w-4" />
          </button>
          <button aria-label="Toggle color theme" onClick={toggleTheme} className="rounded-full border border-slate-800 bg-slate-900/70 p-2.5 text-slate-300">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-sm font-semibold text-slate-950">
              <User className="h-4 w-4" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-slate-100">Guest Rider</p>
              <p className="text-xs text-slate-400">Premium access</p>
            </div>
          </div>
          {isLoggedIn ? (
            <Button variant="ghost" onClick={onLogout}>Logout</Button>
          ) : (
            <Button onClick={onToggleAuth}>{isLoggedIn ? 'Logout' : 'Create account'}</Button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
