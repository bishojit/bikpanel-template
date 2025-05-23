"use client"; // Required for useEffect and useRouter

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state

// This is a mock authentication check for the prototype.
// In a real application, this would involve checking a valid session/token.
const checkMockAuth = (): boolean => {
  // Simulate checking for an auth token in localStorage
  if (typeof window !== 'undefined') {
    return localStorage.getItem('mockAuthToken') === 'loggedIn';
  }
  return false; 
};

export default function ProtectedAppLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const authStatus = checkMockAuth();
    setIsAuthenticated(authStatus);
    if (!authStatus) {
      router.push('/login');
    }
  }, [router]);

  if (isAuthenticated === undefined) {
    // Show a loading state while checking auth to prevent flash of content
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-8 w-48 mt-4" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // This path should ideally not be reached if router.push works immediately,
    // but it's a fallback.
    return null; 
  }

  return <AppLayout>{children}</AppLayout>;
}
