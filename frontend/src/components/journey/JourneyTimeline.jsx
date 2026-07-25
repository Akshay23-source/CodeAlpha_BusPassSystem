import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export function JourneyTimeline({ activeStage = 3 }) {
  const stages = [
    { label: 'Waiting at Boarding Stop', desc: 'Rider checks in at Central Station Terminal' },
    { label: 'Bus Arriving', desc: 'Vehicle #KA-02F-8821 approaching platform' },
    { label: 'Passenger Boarded', desc: 'QR code validation verified' },
    { label: 'In Transit', desc: 'Bus moving along Line 12 track' },
    { label: 'Destination Near', desc: 'Approaching Airport Passenger Terminal' },
    { label: 'Journey Completed', desc: 'Trip logged in travel ledger' },
  ];

  return (
    <div className="space-y-4 text-left w-full">
      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest pl-1">Live Commute Progression</span>
      
      <div className="space-y-4 relative pl-5 text-xs font-semibold text-slate-400 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/[0.04]">
        {stages.map((stage, idx) => {
          const isDone = idx < activeStage;
          const isActive = idx === activeStage;
          
          return (
            <div key={idx} className="relative space-y-1">
              {/* Dot Indicators */}
              <div className="absolute left-[-22px] top-0.5 z-10 bg-slate-950 rounded-full p-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : isActive ? (
                  <Clock className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-slate-700" />
                )}
              </div>

              <h5 className={`font-bold leading-none ${isActive ? 'text-white' : isDone ? 'text-slate-300' : 'text-slate-500'}`}>
                {stage.label}
              </h5>
              <p className="text-[9px] text-slate-500 font-semibold leading-normal mt-1">{stage.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default JourneyTimeline;
