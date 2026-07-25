import React from 'react';
import { CloudRain, Wind, Droplets, Sun, HelpCircle } from 'lucide-react';

export function WeatherWidget() {
  const weather = {
    temp: 26,
    humidity: 78,
    wind: '14 km/h',
    rain: 'Cloudy (15% chance of rain)',
    suggestion: 'Pleasant temperature. Carry a light windcheater just in case.',
  };

  return (
    <div className="p-4 rounded-3xl border border-white/[0.06] bg-slate-900/10 backdrop-blur-sm flex justify-between items-center gap-4 text-left w-full">
      <div className="space-y-1.5 flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold uppercase tracking-wider">
          <Sun className="w-3.5 h-3.5 text-amber-400" /> Bengaluru Weather
        </div>
        <h3 className="text-xl font-black text-white font-mono leading-none tracking-tight">{weather.temp}°C</h3>
        <p className="text-[10px] text-slate-400 font-semibold leading-normal mt-1">{weather.suggestion}</p>
      </div>

      <div className="space-y-1 text-[9px] text-slate-500 font-bold uppercase shrink-0 border-l border-white/[0.03] pl-4 text-right">
        <p className="flex justify-between gap-3 leading-none">
          <span>Humid:</span> <span className="text-white font-mono font-black">{weather.humidity}%</span>
        </p>
        <p className="flex justify-between gap-3 leading-none mt-1">
          <span>Wind:</span> <span className="text-white font-mono font-black">{weather.wind}</span>
        </p>
        <p className="flex justify-between gap-3 leading-none mt-1">
          <span>Rain:</span> <span className="text-white font-mono font-black">15%</span>
        </p>
      </div>
    </div>
  );
}
export default WeatherWidget;
