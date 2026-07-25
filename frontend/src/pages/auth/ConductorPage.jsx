import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { VerificationCard } from '../../components/conductor/VerificationCard';

export function ConductorPage() {
  const { user } = useAuth();

  return (
    <AuthLayout>
      <div className="w-full max-w-2xl mx-auto space-y-6 pt-6">
        {/* Verification Viewport */}
        <VerificationCard user={user} />
      </div>
    </AuthLayout>
  );
}
export default ConductorPage;
