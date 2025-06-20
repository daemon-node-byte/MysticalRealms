'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export default function DebugDashboard() {
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    console.log('Debug Dashboard - Auth state:', { user: !!user, profile, loading });
  }, [user, profile, loading]);

  if (loading) {
    return <div>Loading: {JSON.stringify({ user: !!user, profile: !!profile, loading })}</div>;
  }

  return (
    <div>
      <h1>Debug Dashboard</h1>
      <p>User: {user ? 'Authenticated' : 'Not authenticated'}</p>
      <p>Profile: {profile ? JSON.stringify(profile) : 'No profile'}</p>
      <p>Loading: {loading ? 'Yes' : 'No'}</p>
    </div>
  );
}
