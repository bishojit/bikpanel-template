import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { Logo } from '@/components/shared/Logo';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md space-y-8">
      <Logo className="h-24 w-24" />
      <div className="w-full p-8 space-y-6 rounded-lg shadow-xl bg-card border border-border">
        <h1 className="text-2xl font-bold text-center text-foreground">Forgot Your Password?</h1>
        <p className="text-sm text-center text-muted-foreground">
          No worries! Enter your email address below and we'll send you a link to reset your password.
        </p>
        <ForgotPasswordForm />
        <div className="text-sm text-center">
          <Link href="/login" className="font-medium text-primary hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
