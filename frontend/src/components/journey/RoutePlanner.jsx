import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Navigation, Compass, Sparkles, AlertCircle, Bookmark } from 'lucide-react';
import toast from 'react-hot-toast';

export function RoutePlanner({ onRouteSelect }) {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handlePlan = () => {
    if (!source || !destination) {
      toast.error('Input source and destination stops.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuggestions([
        { id: 'suggest-1', type: 'Fastest', route: 'Line 12 Express', time: '14 mins', fare: '₹28.00', crowded: 'Low' },
        { id: 'suggest-2', type: 'Shortest Walk', route: 'Campus Shuttle B', time: '18 mins', fare: '₹18.00', crowded: 'Medium' },
        { id: 'suggest-3', type: 'Cheapest', route: 'Metro Shuttle C', time: '22 mins', fare: '₹12.00', crowded: 'High' },
      ]);
      toast.success('Itineraries compiled via AI suggestions!');
    }, 1500);
  };

  return (
    <div className="p-5 rounded-3xl border border-white/[0.06] bg-slate-900/10 backdrop-blur-sm space-y-4 text-left">
      
      {/* Sources Inputs */}
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Source Terminal</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              <Navigation className="w-3.5 h-3.5 rotate-45" />
            </div>
            <input
              type="text"
              placeholder="e.g. Central Terminal Station"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2 bg-slate-950/40 border border-slate-800 focus:border-blue-500 focus:outline-none rounded-xl text-white font-semibold placeholder-slate-700"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Destination Terminal</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="e.g. Airport Passenger Deck"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2 bg-slate-950/40 border border-slate-800 focus:border-blue-500 focus:outline-none rounded-xl text-white font-semibold placeholder-slate-700"
            />
          </div>
        </div>
      </div>

      {/* Plan journey button */}
      <button
        onClick={handlePlan}
        disabled={loading}
        className="w-full py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center justify-center gap-1.5 focus:outline-none text-xs active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? (
          <>Compiling AI suggestion routes...</>
        ) : (
          <>
            <Sparkles className="w-3.5 h-3.5 text-blue-300" /> Plan Journey Smartly
          </>
        )}
      </button>

      {/* Suggestions options display */}
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 pt-2 border-t border-white/[0.03] overflow-hidden"
          >
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest pl-1 block">AI Recommended Routes</span>
            {suggestions.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  onRouteSelect(s);
                  toast.success(`${s.type} route selection active.`);
                }}
                className="w-full p-3.5 rounded-2xl border border-white/[0.04] bg-slate-950/30 hover:border-slate-800 hover:bg-slate-950/60 transition-all flex items-start gap-3 text-left focus:outline-none"
              >
                <div className="p-2 rounded-xl bg-slate-950 border border-white/5 shrink-0 text-blue-400">
                  <Bookmark className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-xs">{s.route}</span>
                    <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[7px] font-black uppercase tracking-wider">{s.type}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold pt-1">
                    <span>ETA: {s.time}</span>
                    <span>Fare: {s.fare}</span>
                    <span className={s.crowded === 'Low' ? 'text-emerald-400' : s.crowded === 'Medium' ? 'text-amber-400' : 'text-rose-400'}>
                      Crowd: {s.crowded}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
export default RoutePlanner;
