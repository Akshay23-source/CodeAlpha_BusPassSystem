import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Compass, Building, ShieldCheck } from 'lucide-react';

const defaultOrganizations = [
  { name: 'Central Tech University', type: 'University', address: 'Tech Park Campus, Sector 5' },
  { name: 'L.N. College of Engineering', type: 'College', address: 'University Road, West Gate' },
  { name: 'Global Solutions Corporate', type: 'Company', address: 'IT Park Tower A, Block 3' },
  { name: 'City Science Institute', type: 'Institute', address: 'Science Museum Road, East Block' },
  { name: 'Metro Health Hospital', type: 'Hospital', address: 'Central Plaza Junction' },
];

export function OrganizationSelector({ value = '', onChange, error }) {
  const [searchTerm, setSearchTerm] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }
    const filtered = defaultOrganizations.filter((org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filtered);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (name) => {
    setSearchTerm(name);
    onChange(name);
    setShowDropdown(false);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'University':
      case 'College':
        return <BookOpen className="w-4 h-4 text-blue-400" />;
      case 'Company':
        return <Building className="w-4 h-4 text-indigo-400" />;
      default:
        return <Compass className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-1.5 w-full relative" ref={containerRef}>
      <label className="text-xs font-semibold text-slate-400 pl-1 block text-left">
        Associated Institute / Corporate Office
      </label>
      
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
          <Search className="w-5 h-5 text-slate-500" />
        </div>
        
        <input
          type="text"
          placeholder="Search and autocomplete college or company..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onChange(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-slate-900/40 backdrop-blur-sm placeholder-slate-500 focus:outline-none text-white text-sm pl-12 ${
            error
              ? 'border-red-500/80 focus:border-red-500'
              : 'border-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15'
          }`}
        />
      </div>

      {error && (
        <p className="text-xs text-red-400 font-semibold text-left pl-1 pt-0.5">✕ {error}</p>
      )}

      {/* Autocomplete Dropdown list */}
      <AnimatePresence>
        {showDropdown && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 right-0 mt-1.5 rounded-2xl border border-white/[0.08] bg-slate-950/95 backdrop-blur-md shadow-2xl z-50 overflow-hidden max-h-48 overflow-y-auto"
          >
            {suggestions.map((org) => (
              <button
                key={org.name}
                type="button"
                onClick={() => handleSelect(org.name)}
                className="w-full px-4 py-3 text-left hover:bg-slate-900/80 flex items-center gap-3 transition-colors border-b border-white/[0.03] last:border-0"
              >
                <div className="p-2 rounded-lg bg-slate-900 border border-white/5 shrink-0">
                  {getIcon(org.type)}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white leading-none">{org.name}</h5>
                  <p className="text-[10px] text-slate-500 mt-1 leading-none">{org.address}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
