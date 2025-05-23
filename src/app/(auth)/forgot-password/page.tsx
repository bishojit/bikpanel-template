
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { Logo } from '@/components/shared/Logo';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md space-y-6"> {/* space-y-8 to space-y-6 */}
      <Logo className="h-20 w-20" /> {/* h-24 w-24 to h-20 w-20 */}
      <div className="w-full p-6 space-y-4 rounded-lg shadow-xl bg-card border border-border"> {/* p-8 space-y-6 to p-6 space-y-4 */}
        <h1 className="text-xl font-bold text-center text-foreground">Forgot Your Password?</h1> {/* text-2xl to text-xl */}
        <p className="text-xs text-center text-muted-foreground"> {/* text-sm to text-xs */}
          No worries! Enter your email address below and we'll send you a link to reset your password.
        </p>
        <ForgotPasswordForm />
        <div className="text-xs text-center"> {/* text-sm to text-xs */}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
