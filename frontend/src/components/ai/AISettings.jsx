import React from 'react';
import { Settings, Shield, Volume2, Globe } from 'lucide-react';

export function AISettings({ 
  model, onModelChange, 
  temp, onTempChange, 
  ttsEnabled, onTtsToggle,
  lang, onLangChange 
}) {
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'Hindi (हिन्दी)' },
    { code: 'kn', label: 'Kannada (ಕನ್ನಡ)' },
    { code: 'ta', label: 'Tamil (தமிழ்)' },
    { code: 'te', label: 'Telugu (తెలుగు)' },
    { code: 'ml', label: 'Malayalam (മലയാളം)' },
  ];

  return (
    <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950 text-left space-y-4 text-xs font-semibold text-slate-400">
      
      {/* Title */}
      <div className="flex items-center gap-1.5 pb-2 border-b border-white/[0.04] text-white">
        <Settings className="w-3.5 h-3.5" />
        <span className="font-bold uppercase tracking-widest text-[9px]">AI Engine Preferences</span>
      </div>

      {/* Model Selector */}
      <div className="space-y-1">
        <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Active LLM Model</label>
        <select
          value={model}
          onChange={(e) => onModelChange(e.target.value)}
          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-pink-500 focus:outline-none rounded-xl text-white font-bold"
        >
          <option value="gemini">Google Gemini Pro (Active)</option>
          <option value="gpt" disabled>OpenAI GPT-4o (Soon)</option>
          <option value="claude" disabled>Anthropic Claude 3.5 (Soon)</option>
        </select>
      </div>

      {/* Language Selector */}
      <div className="space-y-1">
        <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Assistant Language</label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <select
            value={lang}
            onChange={(e) => onLangChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 focus:border-pink-500 focus:outline-none rounded-xl text-white font-bold"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Temperature Slider */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[9px] text-slate-500 font-bold uppercase">
          <span>Creativity (Temp)</span>
          <span className="text-white font-mono">{temp}</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="1.0"
          step="0.1"
          value={temp}
          onChange={(e) => onTempChange(parseFloat(e.target.value))}
          className="w-full accent-pink-500 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Voice Read Aloud Toggle */}
      <label className="flex items-center justify-between p-2.5 rounded-xl border border-white/[0.03] bg-slate-900/40 cursor-pointer select-none">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-pink-400" />
          <div>
            <span className="text-white font-bold block leading-none">Voice Read Aloud</span>
            <span className="text-[8px] text-slate-500 font-semibold block mt-1">Read replies using Text-to-Speech</span>
          </div>
        </div>
        <input
          type="checkbox"
          checked={ttsEnabled}
          onChange={(e) => onTtsToggle(e.target.checked)}
          className="rounded accent-pink-500 border-slate-800 bg-slate-900 w-4 h-4"
        />
      </label>

    </div>
  );
}
export default AISettings;
