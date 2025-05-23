
"use client"; // Required for useSearchParams

import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { Logo } from '@/components/shared/Logo';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react'; // Import Suspense


function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  return <ResetPasswordForm token={token} />;
}


export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md space-y-6"> {/* space-y-8 to space-y-6 */}
      <Logo className="h-20 w-20" /> {/* h-24 w-24 to h-20 w-20 */}
      <div className="w-full p-6 space-y-4 rounded-lg shadow-xl bg-card border border-border"> {/* p-8 space-y-6 to p-6 space-y-4 */}
        <h1 className="text-xl font-bold text-center text-foreground">Reset Your Password</h1> {/* text-2xl to text-xl */}
        <Suspense fallback={<div className="text-center text-xs text-muted-foreground">Loading form...</div>}> {/* text-muted-foreground to text-xs text-muted-foreground */}
          <ResetPasswordContent />
        </Suspense>
         <div className="text-xs text-center"> {/* text-sm to text-xs */}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
