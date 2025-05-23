"use client"; // Required for useSearchParams

import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { Logo } from '@/components/shared/Logo';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react'; // Import Suspense


function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  // The token is now available here and can be passed to ResetPasswordForm or used directly.
  // For this example, we'll pass it as a prop, though ResetPasswordForm could also use useSearchParams.
  return <ResetPasswordForm token={token} />;
}


export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md space-y-8">
      <Logo className="h-24 w-24" />
      <div className="w-full p-8 space-y-6 rounded-lg shadow-xl bg-card border border-border">
        <h1 className="text-2xl font-bold text-center text-foreground">Reset Your Password</h1>
        <Suspense fallback={<div className="text-center text-muted-foreground">Loading form...</div>}>
          <ResetPasswordContent />
        </Suspense>
         <div className="text-sm text-center">
          <Link href="/login" className="font-medium text-primary hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
