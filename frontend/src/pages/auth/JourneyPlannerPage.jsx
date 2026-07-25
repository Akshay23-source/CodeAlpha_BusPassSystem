import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, Navigation, CloudSun, MapPin, ChevronRight } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';

import { MapContainer } from '../../components/journey/MapContainer';
import { RoutePlanner } from '../../components/journey/RoutePlanner';
import { JourneyPanel } from '../../components/journey/JourneyPanel';
import { JourneyTimeline } from '../../components/journey/JourneyTimeline';
import { WeatherWidget } from '../../components/journey/WeatherWidget';
import { BusInfoCard } from '../../components/journey/BusInfoCard';
import { NearestStopCard } from '../../components/journey/NearestStopCard';

export function JourneyPlannerPage() {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedStop, setSelectedStop] = useState(null);

  return (
    <AuthLayout>
      <div className="w-full max-w-6xl mx-auto space-y-6">
        
        {/* Top Header details */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 pb-4 border-b border-white/[0.04] text-left">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">Smart Journey Console</h2>
            <p className="text-[10px] text-slate-500 font-bold tracking-widest mt-1">REAL-TIME GPS LOCATOR & ROUTE OPTIMIZATION</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-emerald-400">Live GPS Feeds Synchronized</span>
          </div>
        </div>

        {/* Core Layout split: Map vs inputs panels */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
          
          {/* Left panel options */}
          <div className="space-y-6">
            <WeatherWidget />

            <RoutePlanner 
              onRouteSelect={(routeDetails) => setSelectedRoute(routeDetails)} 
            />

            <AnimatePresence mode="wait">
              {selectedRoute ? (
                <motion.div
                  key="active-journey"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <JourneyPanel selectedRoute={selectedRoute.route} />
                  
                  <AuthCard
                    title="Commute Timeline"
                    subtitle="Track live boarding stops arrival stages"
                  >
                    <JourneyTimeline activeStage={3} />
                  </AuthCard>

                  <BusInfoCard 
                    busNo="KA-02F-8821" 
                    occupancy={selectedRoute.crowded === 'Low' ? '64%' : selectedRoute.crowded === 'Medium' ? '82%' : '94%'} 
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="no-journey"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <NearestStopCard />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Map Canvas */}
          <div className="space-y-4 lg:sticky lg:top-[85px]">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 pl-1 text-left">
              <span>Interactive Transit Map</span>
              {selectedRoute && (
                <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Tracking {selectedRoute.route}
                </span>
              )}
            </div>

            <MapContainer 
              route={selectedRoute?.route} 
              selectedStop={selectedStop}
              onStopSelect={(stop) => setSelectedStop(stop)}
            />
          </div>

        </div>

      </div>
    </AuthLayout>
  );
}
export default JourneyPlannerPage;
