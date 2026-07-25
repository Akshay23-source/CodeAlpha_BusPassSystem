import React from 'react';
import { ProfileWidget } from './ProfileWidget';
import { InsightCard } from './InsightCard';
import { SupportCard } from './SupportCard';

export function RightSidebar({ user }) {
  return (
    <div className="space-y-6">
      {/* Rider profile statistics */}
      <ProfileWidget user={user} />

      {/* Dynamic travel insights */}
      <InsightCard />

      {/* S.O.S and Help Desk */}
      <SupportCard />
    </div>
  );
}
