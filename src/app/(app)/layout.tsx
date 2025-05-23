import type { ReactNode } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';

// TODO: Add authentication check here. If not authenticated, redirect to /login.
// This can be done with a server component checking cookies/session or a client component with useEffect.

export default function ProtectedAppLayout({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
